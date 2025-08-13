# Rollback Strategy for Suqi Platform

This document outlines the rollback procedures for the Suqi Analytics Platform in case of deployment issues.

## Quick Rollback Commands

### Vercel Rollback (Web App)
```bash
# List recent deployments
vercel list --scope=suqi-platform

# Rollback to specific deployment
vercel rollback [deployment-url] --scope=suqi-platform

# Or use Vercel Dashboard
# https://vercel.com/suqi-platform/suqi-web/deployments
```

### Database Rollback (Supabase)
```bash
# Rollback last migration
supabase db reset --db-url $DATABASE_URL

# Rollback to specific migration
supabase migration list
supabase db reset --version [migration-version]
```

## Rollback Scenarios

### 1. Frontend Issues (Dashboard/UI)

**Symptoms:**
- White screen of death
- Console errors in production
- Missing features or broken UI

**Rollback Steps:**
1. Go to Vercel Dashboard
2. Navigate to Deployments tab
3. Find last known good deployment
4. Click "..." menu → "Promote to Production"
5. Verify rollback at production URL

**Alternative (CLI):**
```bash
# Find good deployment
vercel list --scope=suqi-platform | grep Ready

# Rollback
vercel rollback dpl_xxxxx --scope=suqi-platform
```

### 2. API/Backend Issues

**Symptoms:**
- 500 errors from API routes
- Database connection errors
- Edge function failures

**Rollback Steps:**
1. Check Supabase Functions logs
2. Identify problematic function
3. Rollback function deployment:
```bash
# List function versions
supabase functions list

# Deploy previous version
git checkout [previous-commit]
supabase functions deploy [function-name]
```

### 3. Database Schema Issues

**Symptoms:**
- SQL errors in application
- Missing tables/columns
- RLS policy failures

**Rollback Steps:**
1. **Immediate Mitigation:**
```sql
-- Disable problematic RLS policies
ALTER TABLE affected_table DISABLE ROW LEVEL SECURITY;

-- Or revert specific changes
DROP TABLE IF EXISTS new_problematic_table;
ALTER TABLE affected_table DROP COLUMN IF EXISTS new_column;
```

2. **Full Rollback:**
```bash
# Connect to production database
supabase db remote commit

# Create rollback migration
supabase migration new rollback_[issue_name]

# Edit migration file with rollback SQL
# Then apply
supabase db push
```

### 4. Configuration Issues

**Symptoms:**
- Environment variable errors
- Feature flags not working
- Third-party integration failures

**Rollback Steps:**
1. Access Vercel Environment Variables
2. Revert to previous values (check deployment logs)
3. Redeploy if needed

## Monitoring During Rollback

### Health Checks
```bash
# Check application health
curl https://suqi-web.vercel.app/api/health

# Check database
curl https://[project-ref].supabase.co/rest/v1/

# Check edge functions
curl https://[project-ref].supabase.co/functions/v1/health
```

### Log Monitoring
- **Vercel Logs:** `vercel logs --scope=suqi-platform`
- **Supabase Logs:** Dashboard → Logs → Functions/Database
- **Browser Console:** Check for client-side errors

## Post-Rollback Checklist

- [ ] Verify application is accessible
- [ ] Test critical user flows
- [ ] Check database connectivity
- [ ] Verify API endpoints
- [ ] Monitor error rates
- [ ] Communicate status to team
- [ ] Document issue for postmortem

## Rollback Communication Template

```markdown
## 🔄 Rollback Notice

**Status:** In Progress / Complete
**Affected Service:** Web App / API / Database
**Start Time:** [timestamp]
**Expected Resolution:** [time]

**Issue:**
Brief description of the issue requiring rollback

**Impact:**
- What users are experiencing
- Which features are affected

**Actions Taken:**
- Rolled back to deployment [ID]
- Reverted database migration [version]
- Updated configuration

**Next Steps:**
- Root cause analysis
- Fix development
- Planned re-deployment

**Contact:** [responsible-team]
```

## Prevention Strategies

### Before Deployment
1. Run full test suite: `pnpm test:all`
2. Test on staging environment
3. Review database migrations carefully
4. Check environment variables
5. Verify build output

### Gradual Rollout
1. Deploy to preview branch first
2. Test with internal users
3. Monitor metrics for 30 minutes
4. Proceed to full production

### Automated Checks
```yaml
# .github/workflows/pre-deploy.yml
- name: Pre-deployment Checks
  run: |
    pnpm test
    pnpm build
    pnpm test:smoke
```

## Emergency Contacts

- **Platform Lead:** @platform-lead
- **DevOps Team:** @suqi-platform/devops-team
- **On-Call Engineer:** Check PagerDuty

## Related Documentation

- [Deployment Guide](./docs/deployment.md)
- [Monitoring Setup](./docs/monitoring.md)
- [Incident Response](./docs/incident-response.md)

---

Remember: It's better to rollback quickly and investigate than to leave users with a broken experience. When in doubt, rollback!