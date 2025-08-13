# Contributing to Suqi Analytics Platform

We're thrilled that you're interested in contributing to Suqi! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Package Ownership](#package-ownership)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful, inclusive, and considerate in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- Supabase CLI
- Git

### Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/suqi-platform.git
   cd suqi-platform
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start development servers:
   ```bash
   pnpm dev
   ```

## Project Structure

```
suqi-platform/
├── apps/
│   ├── web/          # Next.js dashboard application
│   ├── docs/         # Documentation site (11ty)
│   └── edge/         # Edge functions
├── packages/
│   ├── ui/           # Shared UI components
│   ├── charts/       # Chart components
│   ├── core/         # Core utilities
│   ├── data/         # Data types and utilities
│   └── config/       # Shared configuration
├── supabase/         # Database migrations and functions
└── tools/            # Build and development tools
```

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use issue templates when available
3. Provide clear reproduction steps
4. Include relevant system information

### Suggesting Features

1. Open a discussion first for major features
2. Clearly describe the problem being solved
3. Provide use cases and examples
4. Consider implementation complexity

### Submitting Code

1. Create a feature branch from `main`
2. Make your changes following our coding standards
3. Write/update tests as needed
4. Update documentation
5. Submit a pull request

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define explicit types (avoid `any`)
- Use interfaces over types when possible

### React Components

```typescript
// Good
export function MyComponent({ title, data }: MyComponentProps) {
  // Component logic
}

// Avoid
export default function MyComponent(props: any) {
  // Component logic
}
```

### Database Queries

- Always use parameterized queries
- Target `scout.*` schema (not `suqi.*`)
- Include error handling
- Add query comments for complex operations

### Styling

- Use Tabler CSS classes when available
- Follow mobile-first responsive design
- Ensure accessibility (WCAG 2.1 AA)
- Test dark mode compatibility

## Testing Guidelines

### Unit Tests

```bash
pnpm test
```

### Integration Tests

```bash
pnpm test:integration
```

### Accessibility Tests

```bash
pnpm test:a11y
```

### E2E Tests

```bash
pnpm test:e2e
```

### Test Coverage

- Aim for 80%+ coverage on new code
- Focus on critical paths
- Test error scenarios
- Include edge cases

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include examples in comments
- Document complex algorithms
- Update README files

### User Documentation

- Update docs site for user-facing changes
- Include screenshots when relevant
- Provide migration guides
- Keep changelog updated

## Pull Request Process

### Before Submitting

1. Run all tests: `pnpm test:all`
2. Run linting: `pnpm lint`
3. Run type checking: `pnpm typecheck`
4. Update documentation
5. Add changeset if needed: `pnpm changeset`

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process

1. Automated checks must pass
2. Code review from maintainers
3. Address feedback
4. Squash and merge when approved

## Package Ownership

Each package has designated owners responsible for:
- Reviewing PRs
- Maintaining quality
- Planning features
- Handling issues

### Package Responsibilities

#### `@suqi/web`
- **Team**: Frontend Team
- **Focus**: Dashboard UI, routing, state management
- **Contact**: @suqi-platform/frontend-team

#### `@suqi/ui`
- **Team**: Design System Team
- **Focus**: Shared components, Tabler integration
- **Contact**: @suqi-platform/design-system-team

#### `@suqi/charts`
- **Team**: Data Visualization Team
- **Focus**: Chart components, data visualization
- **Contact**: @suqi-platform/data-viz-team

#### `@suqi/core`
- **Team**: Core Team
- **Focus**: Authentication, routing, telemetry
- **Contact**: @suqi-platform/core-team

#### `@suqi/data`
- **Team**: Data Team & AI Team
- **Focus**: Types, SQL utilities, WrenAI integration
- **Contact**: @suqi-platform/data-team

#### `@suqi/config`
- **Team**: DevOps Team
- **Focus**: Build configuration, linting, formatting
- **Contact**: @suqi-platform/devops-team

## Release Process

1. Create changeset: `pnpm changeset`
2. Version packages: `pnpm changeset version`
3. Build all packages: `pnpm build`
4. Publish: `pnpm changeset publish`
5. Create GitHub release

## Getting Help

- Join our Discord community
- Check documentation at [docs.suqi.ai](https://docs.suqi.ai)
- Open a discussion for questions
- Email: support@suqi.ai

## Recognition

Contributors will be:
- Added to our contributors list
- Mentioned in release notes
- Invited to contributor meetings
- Eligible for swag and rewards

Thank you for contributing to Suqi! 🎉