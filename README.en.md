# WorkHome — home services prototype

[Español](README.md) · [Demo](https://work-home-xi.vercel.app)

A frontend prototype exploring how a customer requests home services and how a professional views jobs and quotes. Screens and interactions use demonstration data.

## Implemented scope

- Customer and professional views.
- Service categories and navigation between screens.
- Request form with description, date and time; requests stay in memory.
- Local chat with a simulated automatic reply.
- Status, quote, receipt and review screens.
- Responsive interface built with React components.

Role selection controls navigation. There is no authentication, backend or database. Reloading clears requests and messages. Payment, identity verification, photo upload and receipt screens illustrate a workflow; those services are not implemented.

## Stack

React 19, JavaScript, Vite 8, Tailwind CSS 4 and Lucide React. ESLint is configured for code checks.

## Run locally

Requirements: Git, npm and Node.js 22.13 or later within the 22.x line, compatible with the declared Vite and ESLint dependencies.

```bash
git clone https://github.com/fabrizzio2901/WorkHome.git
cd WorkHome
npm install --package-lock=false
npm run dev
```

Open the address printed by Vite, usually `http://localhost:5173`. No `.env` file is required.

**Installation status:** during the September 11, 2026 review, `npm ci` failed because the lockfile did not match the resolved dependencies. The command above leaves the lockfile unchanged, but does not guarantee identical dependency versions. Repairing the lockfile remains pending.

Available commands:

```bash
npm run build
npm run preview
npm run lint
```

The build produces `dist/`; preview serves that build locally.

## Example walkthrough

1. Select **Propietario / Cliente** and click **Continuar**.
2. Browse services or start a request from a professional card.
3. Enter a fictional problem and choose a date and time.
4. Open **Mensajes**, send a test message and observe the simulated reply.
5. Reload to see that state is temporary.

Do not enter identity documents or personal information into this demonstration.

## Structure and status

`src/App.jsx` contains components, screens, React context and view switching. `src/main.jsx` mounts the application; `src/index.css` and `vite.config.js` configure styling and development tooling.

The linked demo loaded and allowed navigation to the service catalog during review. It is not an operational booking service. Next steps include a reproducible installation, separating responsibilities in `App.jsx`, completing visual controls, and defining persistence, authentication and tests before implementing a real service.

## Technical check

The alternative installation and `npm run build` completed. `npm run lint` failed with three `no-unused-vars` errors in `src/App.jsx`. The build used dependencies resolved without changing the lockfile; it does not show that `npm ci` works.
