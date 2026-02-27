# Contributing to AI-Powered Email Marketing Tool

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes thoroughly
6. Commit and push to your fork
7. Open a Pull Request

## Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your environment variables (see `.env.example`)

3. Run the development server:
```bash
pnpm dev
```

## Code Style

- Use TypeScript for all new files
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Component Guidelines

- Place reusable UI components in `/src/app/components/ui/`
- Place page-specific components in `/src/app/components/`
- Place page components in `/src/app/pages/`
- Use proper TypeScript types and interfaces
- Follow React best practices (hooks, functional components)

## Commit Messages

- Use clear and descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Add detailed description if needed

Example:
```
Add email preview feature

- Added preview modal component
- Implemented real-time preview updates
- Added responsive design for mobile
```

## Pull Request Process

1. Update the README.md if you're adding new features
2. Ensure all tests pass and the build succeeds
3. Update documentation as needed
4. Request review from maintainers
5. Address any feedback or requested changes

## Testing

- Test your changes in both development and production builds
- Test on different screen sizes (desktop, tablet, mobile)
- Test with different user scenarios
- Ensure no console errors or warnings

## Reporting Issues

When reporting issues, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser and OS information

## Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists or is planned
- Provide a clear description of the feature
- Explain the use case and benefits
- Consider implementation details if possible

## Questions?

Feel free to open an issue for any questions or clarifications.

Thank you for contributing! 🎉
