---
name: code-quality
description: Improve the CI workflow for better code quality and faster feedback
---

### 1. Code Quality and Best Practices
- **Current Issue:** The existing codebase should adhere to TypeScript best practices, including strict typing and proper module resolution.
- **Objective:** Getting zero errors or warning from SonarQube and when executing typecheck and linting processes (typecheck and lint).
- **Action:** Fix the type errors and linting warnings.

### 2. Modularization
- **Current Problem:** The code concentrates too many responsibilities in the same files or components, mixing business logic, data access, and presentation, making it difficult to locate, reuse, and maintain each part.
- **Objective:** Divide the system into small, cohesive modules with clear responsibilities to improve scalability, facilitate isolated changes, and reduce the impact between different parts of the code.
- **Action:** Strictly use TypeScript to build scalable, modular, and maintainable code. Separate responsibilities into small, cohesive modules, define clear types and interfaces, avoid duplicate logic, and reduce coupling between components. Prioritize readability, descriptive names, input validation, consistent error handling, and functions with a single responsibility. Design the code to be easy to test, extend, and refactor, maintaining a predictable structure and clear type contracts between layers.

### 3. Code Reuse
- **Current Issue:** There is repeated logic, scattered utilities, and components or functions that solve similar problems in different ways, which makes maintenance difficult and increases the risk of inconsistencies.
- **Objective:** Centralize reusable logic into well-defined modules, utilities, services, or components to reduce duplication, improve consistency, and facilitate code scalability.
- **Action:** Extract common logic into reusable functions, hooks, helpers, or services; define shared types and interfaces; avoid copying and pasting code; and establish a clear structure for reusing components without creating unnecessary coupling.

### 4. Performance Optimization
- **Current Problem:** Some parts of the code may have performance issues due to inefficient algorithms, unnecessary re-renders, or improper state management, which can lead to slow response times and a poor user experience.
- **Objective:** Identify and optimize performance bottlenecks to ensure a smooth and responsive user experience, especially in critical paths of the application.
- **Action:** Analyze the code for performance issues, optimize algorithms, use memoization or React's `useMemo` and `useCallback` to prevent unnecessary re-renders, and ensure efficient state management to minimize performance overhead.

### 5. No style
- **Current Issue:** ui-collection incorporates styles or themes that should be defined outside the library.
- **Objective:** To make the library visually agnostic and reusable in different contexts.
- **Action:** Avoid embedding styles in ui-collection and leave the theming and final appearance to the consumer project.

### 6. Testing
- **Current Problem:** The codebase may lack sufficient test coverage, which can lead to undetected bugs and regressions, making it harder to maintain and evolve the code with confidence.
- **Objective:** Increase test coverage to ensure that critical paths and edge cases are well-tested, improving the reliability and maintainability of the codebase.
- **Action:** Write unit tests for individual functions and components, integration tests for interactions between modules, and end-to-end tests for user flows. Use testing frameworks like Jest and React Testing Library to ensure comprehensive coverage and maintainable test suites. Focus on testing critical paths, edge cases, and potential failure points to catch bugs early and ensure the robustness of the application.

### 7. Documentation
- **Current Issue:** The codebase may lack sufficient documentation, making it difficult for developers to understand the purpose and usage of different modules, functions, and components, which can hinder collaboration and onboarding.
- **Objective:** Provide clear and comprehensive documentation to facilitate understanding, collaboration, and onboarding for current and future developers.
- **Action:** Document the purpose, inputs, outputs, and usage of functions, components, and modules using JSDoc comments or similar conventions. Create README files for modules or components that explain their functionality, usage examples, and any relevant details. Ensure that documentation is kept up-to-date with code changes to maintain its accuracy and usefulness for developers.