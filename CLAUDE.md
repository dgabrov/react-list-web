# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React todo/list management application built with Create React App (CRA). It provides user authentication and allows users to manage lists and list items with persistence via a backend API at `localhost:3001`.

## Development Commands

### Setup & Running
- **Start dev server:** `npm start` — opens [http://localhost:3000](http://localhost:3000), proxies API calls to `localhost:3001`
- **Build for production:** `npm run build` — outputs to `build/` directory, optimized for minification
- **Run tests:** `npm test` — launches jest in interactive watch mode

### Deployment
- **Docker build:** `docker build . -t react-list-web:latest` — creates nginx-based container serving the built app on port 80
- **CI/CD:** GitHub Actions workflow in `.github/workflows/build.yml` builds and pushes Docker images to AWS ECR on push to main branch

## Architecture

### State Management (Redux)
The app uses Redux with redux-thunk for async operations. The state flow:

1. **Store initialization** (`src/index.js`): Creates Redux store with thunk middleware, wraps app with Provider
2. **Initial state** (`src/store.js`): Defines all state shape (lists, items, user, UI state flags like `STATE_LOGIN`, `STATE_LISTS`, etc.)
3. **Reducer** (`src/reducer/reducer.js`): Central dispatcher that maps action types to action-specific reducers in `src/reducer/actions/`
4. **Effects** (`src/reducer/effects/`): Thunk functions that handle async operations (API calls) and dispatch actions
5. **Components**: Connect to Redux via `react-redux` and render based on state

### State-Driven Rendering
The main `App` component (`src/app.js`) uses a state matrix pattern: the `state` property in Redux determines which component is rendered. For example:
- `STATE_LOGIN` → `<Login/>` 
- `STATE_LISTS` → `<Lists/>`
- `STATE_EDIT_ITEM` → `<EditItem/>`

This keeps navigation logic in Redux rather than React Router.

### Component Structure
- **Components** (`src/components/`): Functional and class components for rendering different screens
- **Services** (`src/services/service.js`): API client that makes HTTP calls to backend
- **Utils** (`src/util/`): Helper functions for caching, constants, and store utilities

### Action & Effect Pattern
Each business operation follows this pattern:
1. Component dispatches an effect (e.g., `getEffectLogin(login, password)`)
2. Effect function makes API call via service
3. On success: dispatches an "after" action that updates state
4. On error: dispatches error action that adds to error message queue

Example: `src/reducer/effects/effectLogin.js` → calls `service.login()` → dispatches `ACTION_AFTER_LOGIN` or `ACTION_ERROR`

## Key Dependencies
- **react** (18.3.1) & **react-dom**: UI library
- **redux** (5.0.1), **react-redux** (9.1.2), **redux-thunk** (3.1.0): State management
- **underscore** (1.13.7): Utility functions (used for lodash-like helpers)
- **uuid** (10.0.0): ID generation for lists/items

## Important Configuration
- **Proxy**: `localhost:3001` — backend API server for development
- **Homepage**: `/reacttodo` — public path for deployment
- **ESLint**: Uses CRA's default eslint config (`"extends": "react-app"`)

## Testing & Linting
- **Jest**: Run via `npm test` (CRA's react-scripts handles configuration)
- **No explicit lint command**: ESLint is available via CRA's internals; breaking changes caught in tests

## Git Workflow
- Main branch is `master`
- Recent changes: GitHub Actions CI/CD (replaced CircleCI), accessibility improvements for font sizing
