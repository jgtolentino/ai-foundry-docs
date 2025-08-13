# Suqi Analytics Platform

Enterprise Analytics and Intelligence Platform

## Overview

Suqi is a comprehensive analytics platform that provides real-time insights, AI-powered analysis, and data visualization capabilities for enterprise organizations.

## Features

- 📊 **Advanced Analytics Dashboard** - Real-time KPIs and metrics visualization
- 🤖 **Ask Suqi** - Natural language query interface powered by AI
- 📈 **Data Visualization** - Interactive charts and reports
- 🔄 **Data Lineage** - Track data flow from source to insights
- 🔐 **Enterprise Security** - Role-based access control and data governance
- 📱 **Responsive Design** - Works seamlessly across all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Tabler UI Kit (customized)
- **Charts**: Recharts with ChartVision registry
- **Backend**: Supabase (PostgreSQL, Edge Functions)
- **AI/ML**: WrenAI for natural language to SQL
- **Deployment**: Vercel

## Project Structure

```
suqi/
├─ apps/
│  ├─ web/          # Next.js dashboard application
│  ├─ docs/         # Documentation site (11ty)
│  └─ edge/         # Edge function development
├─ packages/
│  ├─ ui/           # Shared UI components
│  ├─ charts/       # Chart components and registry
│  ├─ core/         # Core utilities and auth
│  ├─ data/         # Data layer and types
│  └─ config/       # Shared configurations
└─ supabase/        # Database migrations and functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+
- Supabase CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/suqi.git
cd suqi

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development

```bash
# Start development servers
pnpm dev

# Run specific app
pnpm --filter @suqi/web dev
pnpm --filter @suqi/docs dev
```

### Building

```bash
# Build all apps and packages
pnpm build

# Build specific app
pnpm --filter @suqi/web build
```

## Deployment

The platform is configured for deployment on Vercel:

- **Web App**: Deployed at `suqi-web.vercel.app`
- **Documentation**: Deployed at `suqi-docs.vercel.app`

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the Tabler UI Kit
- Powered by Supabase
- Deployed on Vercel