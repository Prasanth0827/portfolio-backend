# Contributing to Portfolio Backend

Thank you for your interest in contributing to the Portfolio Backend project! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)
- Any relevant logs or screenshots

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been suggested
- Provide a clear use case
- Explain why this feature would be useful
- Consider potential implementation approaches

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed
   - Ensure all tests pass

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Explain the changes and why they're needed

## 📋 Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Follow ESLint rules (run `npm run lint`)
- Write meaningful variable and function names
- Add comments for complex logic

### Testing

- Write tests for all new features
- Ensure all existing tests pass
- Aim for high test coverage
- Use descriptive test names

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update API endpoint documentation
- Include examples where helpful

### Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(auth): add password reset functionality

Implemented password reset via email with JWT tokens
that expire after 1 hour. Added new routes and controllers.

Closes #123
```

## 🧪 Testing Your Changes

Before submitting a PR:

```bash
# Install dependencies
npm install

# Set up environment
cp env.example .env
# Edit .env with test database credentials

# Run linter
npm run lint

# Run tests
npm test

# Test the application
npm run dev
```

## 📝 Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## 🎯 Priority Areas

We're particularly interested in contributions for:

- Performance improvements
- Security enhancements
- Better error handling
- Additional test coverage
- Documentation improvements
- Bug fixes

## ❓ Questions?

If you have questions:
- Check existing issues and discussions
- Open a new issue with the "question" label
- Reach out to maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

