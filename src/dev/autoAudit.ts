import runAudit from '../utils/consistencyAudit';

/**
 * Automatic Development-Only Consistency Audit
 * Guarded by import.meta.env.DEV to ensure it NEVER executes or burdens production builds.
 */
if (import.meta.env.DEV) {
  const executeAudit = () => {
    setTimeout(() => {
      console.log('%c=== SITEPILOT CONSISTENCY AUDIT ===', 'color: #FFC72C; font-weight: bold; font-size: 14px;');
      const findings = runAudit();

      const errors = findings.filter((f) => f.level === 'error');
      const warnings = findings.filter((f) => f.level === 'warning');

      if (errors.length > 0) {
        console.log('%c❌ CONSISTENCY ERRORS FOUND — fix before deploy.', 'color: #ef4444; font-weight: bold; font-size: 13px;');
      } else if (warnings.length === 0) {
        console.log('%c✅ Consistency audit passed.', 'color: #10b981; font-weight: bold; font-size: 13px;');
      }
    }, 1500);
  };

  if (document.readyState === 'complete') {
    executeAudit();
  } else {
    window.addEventListener('DOMContentLoaded', executeAudit);
  }

  // Expose developer handle
  if (typeof window !== 'undefined') {
    (window as any).__sitePilotAudit = runAudit;
  }
}

export {};
