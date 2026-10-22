/**
 * QuarryIQ Runtime Consistency Audit Utility
 * Validates that all displayed production rates, targets, quotas, and financial run-rates
 * strictly conform to the single source of truth defined in src/config/baseline.ts.
 */

import { BASELINE } from '../config/baseline';

export type AuditFinding = {
  level: 'error' | 'warning' | 'info';
  message: string;
  value?: string;
  context?: string;
  element?: HTMLElement;
};

// Store elements that received visual audit highlights so they can be cleaned up cleanly
const highlightedElements: Array<{ el: HTMLElement; originalOutline: string; originalBg: string }> = [];

/**
 * Checks if an element is visually rendered and not hidden
 */
function isElementVisible(el: HTMLElement): boolean {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'template') return false;

  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;

  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/**
 * Traverses up ancestors (up to 6 levels) to check if context mentions 24-hour shift potential or automation
 */
function has24hOrAutomationContext(el: HTMLElement): boolean {
  let current: HTMLElement | null = el;
  let depth = 0;
  while (current && depth < 6) {
    const text = (current.textContent || '').toLowerCase();
    if (
      text.includes('24-hour') ||
      text.includes('24h') ||
      text.includes('24 hours') ||
      text.includes('potential') ||
      text.includes('after automation') ||
      text.includes('full automation') ||
      text.includes('proposed')
    ) {
      return true;
    }
    current = current.parentElement;
    depth++;
  }
  return false;
}

/**
 * Traverses up ancestors to check if context mentions unautomated/legacy baseline
 */
function hasLegacyOrBeforeContext(el: HTMLElement): boolean {
  let current: HTMLElement | null = el;
  let depth = 0;
  while (current && depth < 6) {
    const text = (current.textContent || '').toLowerCase();
    if (
      text.includes('before automation') ||
      text.includes('baseline state') ||
      text.includes('legacy')
    ) {
      return true;
    }
    current = current.parentElement;
    depth++;
  }
  return false;
}

/**
 * Audits the DOM for production rate and quota consistency
 */
export function auditProductionConsistency(rootSelector?: string): AuditFinding[] {
  const findings: AuditFinding[] = [];

  if (typeof document === 'undefined') {
    return findings;
  }

  const root = rootSelector ? document.querySelector(rootSelector) as HTMLElement : document.body;
  if (!root) {
    findings.push({
      level: 'error',
      message: `Root element for selector "${rootSelector}" not found in DOM.`
    });
    return findings;
  }

  const fullPageText = (root.textContent || '').toLowerCase();
  const has9hOrAssumptionsOnPage =
    fullPageText.includes('9-hour') ||
    fullPageText.includes('9h') ||
    fullPageText.includes('9 hour') ||
    fullPageText.includes('assumptions');

  // Walk through visible leaf elements (or small elements)
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      const el = node as HTMLElement;
      if (!isElementVisible(el)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const leafElements: HTMLElement[] = [];
  let currentNode = walker.nextNode();
  while (currentNode) {
    const el = currentNode as HTMLElement;
    // We treat as leaf if it has no visible child elements, or only text/svg children
    const childElements = Array.from(el.children).filter(c => isElementVisible(c as HTMLElement));
    if (childElements.length === 0) {
      leafElements.push(el);
    }
    currentNode = walker.nextNode();
  }

  // Legacy numbers to flag as WARNING unless 24-hour potential or before-automation context is present
  const legacyWarningTerms = [
    { term: '416', label: 'Legacy 416 rate' },
    { term: '421', label: 'Legacy 421 rate' },
    { term: '405', label: 'Legacy 405 rate' },
    { term: '4,858', label: 'Legacy 4,858 tonnage' },
    { term: '4858', label: 'Legacy 4858 tonnage' },
    { term: '400 t/h', label: 'Legacy 400 t/h throughput' },
    { term: '420 t/h', label: 'Legacy 420 t/h throughput' },
  ];

  // Baseline values to flag as INFO
  const baselineInfoTerms = [
    `${BASELINE.TARGET_TPH}`,
    `${BASELINE.LIVE_TPH_EXAMPLE}`,
    `${BASELINE.DAILY_QUOTA_TONNES}`,
    BASELINE.MONTHLY_TARGET_TONNES.toLocaleString(),
    `${BASELINE.CURRENT_BLENDED_COST_PER_TONNE.toFixed(2)}`,
    `${BASELINE.TARGET_BLENDED_COST_PER_TONNE.toFixed(2)}`,
    `$${BASELINE.SELLING_PRICE_PER_TONNE_USD}`,
  ];

  leafElements.forEach((el) => {
    const text = el.textContent?.trim() || '';
    if (!text) return;

    const is24h = has24hOrAutomationContext(el);
    const isLegacy = hasLegacyOrBeforeContext(el);

    // 1. Check for legacy numbers
    legacyWarningTerms.forEach(({ term, label }) => {
      // Use regex with boundary or exact phrase check
      const regex = new RegExp(`(^|\\s|\\(|>)${term.replace(/,/g, ',?')}($|\\s|\\)|<|t|\\/|USD)`, 'i');
      if (regex.test(text)) {
        // Exclude legitimate unautomated baseline comparison or 24h potential
        if (!is24h && !isLegacy) {
          findings.push({
            level: 'warning',
            message: `Found potentially outdated legacy production figure "${term}" (${label}) without 24h potential or baseline qualification.`,
            value: term,
            context: text.slice(0, 100),
            element: el,
          });
        }
      }
    });

    // 2. Check for missing 9-hour / assumptions context when 24,000 / 24000 appears
    if ((text.includes('24,000') || text.includes('24000')) && !text.includes('24,000 m')) {
      if (!has9hOrAssumptionsOnPage) {
        findings.push({
          level: 'error',
          message: `Monthly quota "24,000 tonnes" displayed but page lacks 9-hour shift or assumptions banner context.`,
          value: '24,000',
          context: text.slice(0, 100),
          element: el,
        });
      }
    }

    // 3. Parse daily revenue figures and verify against daily quota (900 tonnes @ $60 = $54,000)
    // Matches $xx,xxx USD / revenue / run
    const revMatch = text.match(/\$([0-9,]+)\s*(?:USD|revenue|run)/i);
    if (revMatch && revMatch[1]) {
      const numStr = revMatch[1].replace(/,/g, '');
      const num = parseFloat(numStr);
      // If it looks like a daily revenue figure (between $10,000 and $200,000)
      if (num >= 10000 && num <= 200000) {
        const impliedTonnes = num / BASELINE.SELLING_PRICE_PER_TONNE_USD;
        // If implied daily tonnes exceeds 900 on a page not labeled as 24-hour potential
        if (impliedTonnes > BASELINE.DAILY_QUOTA_TONNES * 1.05 && !is24h && !fullPageText.includes('total stockyard') && !fullPageText.includes('stockpile')) {
          findings.push({
            level: 'warning',
            message: `Revenue figure $${num.toLocaleString()} implies ${Math.round(impliedTonnes)} tonnes @ $${BASELINE.SELLING_PRICE_PER_TONNE_USD}/t, exceeding 900t daily quota on a 9h shift.`,
            value: `$${num.toLocaleString()}`,
            context: text.slice(0, 100),
            element: el,
          });
        }
      }
    }

    // 4. Record baseline values as INFO
    baselineInfoTerms.forEach((val) => {
      if (text.includes(val)) {
        // avoid duplicate spam: check if we already flagged this value in this element
        findings.push({
          level: 'info',
          message: `Verified active baseline constant in view: "${val}"`,
          value: val,
          context: text.slice(0, 60),
          element: el,
        });
      }
    });
  });

  return findings;
}

/**
 * Outlines every offending leaf element in red (3px solid #ff0000) with a subtle red background
 */
export function highlightInconsistencies(findings: AuditFinding[]): void {
  findings.forEach((finding) => {
    if ((finding.level === 'error' || finding.level === 'warning') && finding.element) {
      const el = finding.element;
      highlightedElements.push({
        el,
        originalOutline: el.style.outline,
        originalBg: el.style.backgroundColor,
      });

      el.style.outline = '3px solid #ff0000';
      el.style.backgroundColor = 'rgba(255, 0, 0, 0.12)';
      el.setAttribute('data-audit-flag', finding.level);
    }
  });
}

/**
 * Removes all added visual highlights and restores original styling
 */
export function clearHighlights(): void {
  while (highlightedElements.length > 0) {
    const item = highlightedElements.pop();
    if (item && item.el) {
      item.el.style.outline = item.originalOutline;
      item.el.style.backgroundColor = item.originalBg;
      item.el.removeAttribute('data-audit-flag');
    }
  }

  // Also query any leftover elements marked with data-audit-flag
  if (typeof document !== 'undefined') {
    const marked = document.querySelectorAll('[data-audit-flag]');
    marked.forEach((node) => {
      const el = node as HTMLElement;
      el.style.outline = '';
      el.style.backgroundColor = '';
      el.removeAttribute('data-audit-flag');
    });
  }
}

/**
 * Master convenience runner for console or automated invocation
 */
export default function runAudit(rootSelector?: string): AuditFinding[] {
  clearHighlights();
  const findings = auditProductionConsistency(rootSelector);
  highlightInconsistencies(findings);

  if (typeof console !== 'undefined' && console.group) {
    const errors = findings.filter((f) => f.level === 'error');
    const warnings = findings.filter((f) => f.level === 'warning');
    const infos = findings.filter((f) => f.level === 'info');

    console.group(`🔍 [QuarryIQ Consistency Audit] — ${errors.length} Errors, ${warnings.length} Warnings, ${infos.length} Baseline Match(es)`);
    
    if (errors.length > 0) {
      console.group(`❌ Errors (${errors.length})`);
      errors.forEach((e) => console.error(e.message, { context: e.context, element: e.element }));
      console.groupEnd();
    } else {
      console.log('%c✅ Zero Errors: Page conforms to baseline assumptions.', 'color: #10b981; font-weight: bold;');
    }

    if (warnings.length > 0) {
      console.group(`⚠️ Warnings (${warnings.length})`);
      warnings.forEach((w) => console.warn(w.message, { context: w.context, element: w.element }));
      console.groupEnd();
    } else {
      console.log('%c✅ Zero Warnings: No unflagged legacy figures detected.', 'color: #10b981;');
    }

    if (infos.length > 0) {
      console.groupCollapsed(`ℹ️ Verified Baseline Constants (${infos.length})`);
      infos.slice(0, 15).forEach((i) => console.info(i.message, { context: i.context }));
      if (infos.length > 15) {
        console.info(`...and ${infos.length - 15} more verified baseline occurrences.`);
      }
      console.groupEnd();
    }

    console.groupEnd();
  }

  return findings;
}

// Bind to window for direct browser console access
if (typeof window !== 'undefined') {
  (window as any).runAudit = runAudit;
  (window as any).auditProductionConsistency = auditProductionConsistency;
  (window as any).highlightInconsistencies = highlightInconsistencies;
  (window as any).clearHighlights = clearHighlights;
  (window as any).BASELINE = BASELINE;
}
