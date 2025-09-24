project-root/
│── public/                # Static files (index.html, favicon, etc.)
│── src/
│   ├── assets/            # Images, fonts, icons, videos
│   ├── components/        # Reusable UI components (buttons, modals, forms)
│   │   └── ui/            # Smaller UI atoms (Button, Input, Card)
│   ├── features/          # Feature-specific components & logic
│   │   └── auth/          # Example feature (Auth forms, hooks, services)
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components (Navbar, Sidebar, DashboardLayout)
│   ├── pages/             # Page-level components (Home, About, Dashboard)
│   ├── routes/            # Centralized route definitions
│   ├── services/          # API calls, external services
│   ├── store/             # State management (Redux, Zustand, Context, etc.)
│   ├── styles/            # Global styles, Tailwind configs, SCSS, CSS
│   ├── utils/             # Helper functions, formatters, validators
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point (ReactDOM.createRoot)
│── .gitignore
│── package.json
│── tailwind.config.js     # (if using Tailwind)
│── vite.config.js / webpack.config.js