# React List Web

A todo/list management application built with React and Redux, featuring user authentication and persistent list storage.

## Quick Start

### Prerequisites
- Node.js (18+)
- Backend API server running on `localhost:3001`

### Development
```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will reload as you edit files.

### Production Build
```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Testing
```bash
npm test
```

Launches jest in interactive watch mode.

## Architecture

This app uses Redux for state management with redux-thunk for async operations. The main component renders based on a state matrix that maps Redux state to screens:

- **Login** — User authentication
- **Lists** — View and manage lists
- **Items** — View and manage items within a list
- **Edit screens** — Create/update lists and items
- **Confirmation dialogs** — Delete confirmations and resets

See [CLAUDE.md](CLAUDE.md) for detailed architecture documentation.

## Deployment

### Docker
```bash
docker build . -t react-list-web:latest
docker run -p 80:3000 react-list-web:latest
```

### CI/CD
GitHub Actions automatically builds and pushes Docker images to AWS ECR on push to the main branch.

## License

See the [LICENSE](LICENSE) file for licensing information.
