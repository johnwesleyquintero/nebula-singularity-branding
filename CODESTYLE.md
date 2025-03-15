# Nebula Code Commandments

For implementation details see:
- [ONBOARDING.md](./ONBOARDING.md) - Setup and configuration
- [detailedConfig.md](./detailedConfig.md) - Technical implementation guides


## Commit Standards
```
# Commit message format
[feat|fix|docs|style|refactor|test|chore]/scope: description
# Example
git commit -m "feat/ui: add cosmic card component"

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance
```

## Architecture Decision Records
- ADR-001: TypeScript Migration Strategy
- ADR-002: CI/CD Pipeline Implementation
- ADR-003: Containerization Approach

## Component Rules
```tsx
// Required prop structure
type ComponentProps = {
  className?: string
  variant?: 'primary' | 'secondary'
  // Add custom props below
}

// Mandatory utility
import { cn } from "@/lib/utils"

// Forbidden!
❌ Any use of `!important` in CSS
❌ Class components
❌ Prop drilling beyond 2 levels
```

## API Response Standard
```ts
interface NebulaResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}
```

## Git Hygiene
```bash
# Commit message format
[feat|fix|docs]/scope: description
# Example
git commit -m "feat/ui: add cosmic card component"
