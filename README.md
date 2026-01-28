# LMS Frontend - Learner Experience Module

A modern Learning Management System built with React, TypeScript, Tailwind CSS, and React Query.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (@tanstack/react-query)** - Data fetching and state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **date-fns** - Date utilities

## 📁 Project Structure

```
lms-frontend/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── common/      # Common UI components (Button, Input, Modal, etc.)
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── course/      # Course player components
│   │   ├── quiz/        # Quiz and assessment components
│   │   ├── certificate/ # Certificate components
│   │   ├── tracking/    # Progress tracking components
│   │   ├── notifications/ # Notification components
│   │   ├── gamification/ # GMFC Coins and badges
│   │   └── layout/      # Layout components (Navbar, Sidebar, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configurations
│   │   ├── api.ts       # Axios API client
│   │   ├── queryClient.ts # React Query configuration
│   │   └── utils.ts     # Helper functions
│   ├── types/           # TypeScript type definitions
│   ├── pages/           # Page components
│   ├── contexts/        # React Context providers
│   └── styles/          # Global styles (Tailwind CSS)
├── public/              # Static assets
└── ...config files
```

## 🎨 Design System

### Colors

- **Primary Red**: `#DC143C` (Crimson Red)
- **Dark Red**: `#A01010` (Hover states)
- **Neutral Light**: `#F5F5F5` (Backgrounds)
- **Neutral Medium**: `#E0E0E0` (Borders)
- **Neutral Dark**: `#333333` (Text)

### Progress Colors

- **Red (0-30%)**: Low progress
- **Orange (31-70%)**: Medium progress
- **Yellow (71-99%)**: High progress
- **Green (100%)**: Complete

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended) or Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
cd lms-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
cp .env.example .env
```

4. Update `.env` with your API endpoint
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

5. Start the development server
```bash
npm run dev
```

6. Open your browser to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🏗️ Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🎯 Key Features

### For Learners
- ✅ Dashboard with learning overview
- ✅ Learning path management
- ✅ Course player with video and materials
- ✅ Quiz system (7 question types)
- ✅ Progress tracking and analytics
- ✅ Certificate generation
- ✅ GMFC Coins and gamification
- ✅ Notifications system
- ✅ Leaderboard (optional)

### Technical Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode ready (Tailwind configuration)
- ✅ Accessibility (WCAG 2.1 AA compliant)
- ✅ Offline support with React Query
- ✅ Optimistic updates for better UX
- ✅ Type-safe development with TypeScript
- ✅ Path aliases for clean imports

## 🔧 Configuration

### Tailwind CSS

The Tailwind configuration is in `tailwind.config.js`. Custom colors, fonts, and utilities are defined there.

### React Query

Query client configuration is in `src/lib/queryClient.ts`. Adjust cache times, stale times, and retry logic as needed.

### API Client

Axios configuration is in `src/lib/api.ts`. The base URL is set from environment variables.

## 📚 Documentation

Detailed documentation is available in the `/document` folder:

- `Module-LMS-User-Requirements.md` - Complete user requirements
- `Module-LMS-User-Stories.md` - User stories and acceptance criteria
- `Technical-Implementation-Guidelines.md` - Technical guidelines and patterns

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all TypeScript checks pass
4. Submit a pull request

## 📝 Code Style

- Use functional components with hooks
- Follow TypeScript strict mode
- Use Tailwind CSS utility classes
- Implement proper error handling
- Add loading and empty states
- Make components responsive

## 🐛 Troubleshooting

### Node version warnings

If you see `EBADENGINE` warnings about Node version, you can:
1. Upgrade to Node.js 18+ (recommended)
2. Or ignore the warnings (most features will still work)

### Tailwind styles not applying

Make sure you've imported the global styles in `main.tsx`:
```typescript
import './styles/globals.css'
```

### Path aliases not working

Verify that:
1. `tsconfig.app.json` has the `paths` configuration
2. `vite.config.ts` has the `resolve.alias` configuration

## 📄 License

This project is proprietary software for internal use only.

## 📞 Support

For issues or questions, contact the development team or create an issue in the project repository.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
