project-root/
├── public/               # Static files (served directly without processing)
│   ├── favicon.ico
│   └── robots.txt
├── src/                  # Application source code
│   ├── assets/           # Static assets (images, fonts, icons, etc.)
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   ├── components/       # Reusable components
│   │   ├── common/       # Small reusable components (e.g., buttons, inputs)
│   │   ├── layout/       # Layout components (e.g., header, footer, sidebar)
│   │   └── specific/     # Feature-specific components
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout templates (e.g., AdminLayout, AuthLayout)
│   ├── pages/            # Pages of the application
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.module.css
│   │   └── About/
│   │       ├── About.tsx
│   │       └── About.module.css
│   ├── providers/        # Context and providers (e.g., AuthProvider, ThemeProvider)
│   ├── routes/           # Application routing setup
│   │   ├── index.tsx
│   │   └── ProtectedRoute.tsx
│   ├── services/         # API service calls (Axios, Fetch, etc.)
│   │   ├── api.ts        # API instance (e.g., Axios configuration)
│   │   └── userService.ts
│   ├── store/            # State management (e.g., Redux, Zustand, Context)
│   │   ├── slices/       # Redux slices or Zustand stores
│   │   └── index.ts      # Store configuration
│   ├── types/            # TypeScript type definitions
│   │   ├── api.d.ts      # API response types
│   │   ├── components.d.ts
│   │   └── global.d.ts   # Global TypeScript declarations
│   ├── utils/            # Utility functions (e.g., formatters, validators)
│   │   └── index.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite environment variables type declaration
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation


Thư mục components/specific giúp tổ chức các component theo chức năng hoặc module cụ thể, làm cho dự án dễ duy trì và phát triển. Nó tách biệt khỏi các component dùng chung (common) để tránh sự lộn xộn.