# AI-Powered E-Learning Marketplace

A modern, responsive frontend application for an AI-integrated educational commerce platform that enables users to discover, explore, and curate educational products and courses with intelligent recommendations.

## 🚀 Project Overview

This e-learning marketplace provides an intuitive interface for users to browse educational content including online courses, curricula, and learning materials. The platform leverages AI-driven recommendations to enhance user experience and facilitate personalized learning path discovery.

### Key Features

- **Product Catalog**: Comprehensive listing of educational products with rich metadata
- **Smart Search & Filtering**: Advanced search functionality with price-based filters
- **AI-Powered Recommendations**: Intelligent product suggestions based on user behavior
- **Product Details Modal**: Detailed product information with interactive overlay
- **Wishlist Management**: Personal curation system for favorite educational content
- **Responsive Design**: Optimized for all device types and screen sizes

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.5 with TypeScript
- **Styling**: Tailwind CSS 4.0 with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **HTTP Client**: Axios for API communication
- **Development**: ESLint for code quality

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🏗️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

## 🚀 Development

### Running the Development Server

Start the development server with Turbopack for enhanced performance:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## 🏛️ Project Structure

```
my-app/
├── public/             # Static assets
├── src/                # Source code directory
│   ├── app/            # Next.js 13+ App Router
│   │   ├── cart/       # Shopping cart page
│   │   ├── favorites/  # Wishlist/favorites page
│   │   ├── recently-viewed/ # Recently viewed products
│   │   ├── favicon.ico # Application favicon
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout component
│   │   ├── not_found.tsx # 404 error page
│   │   └── page.tsx    # Home page component
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   └── SearchFilters.tsx
│   └── lib/            # Utility functions and configurations
│       ├── api.ts      # API service functions
│       ├── mock-data.ts # Mock data for development
│       ├── types.ts    # TypeScript type definitions
│       └── utils.ts    # Utility functions
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
├── README.md          # Project documentation
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🎯 Core Functionality

### 1. Product Catalog Display
- Renders educational products with essential information (name, price, image, description)
- Supports both mock data and API integration
- Includes "View Details" action for each product

### 2. Search and Filtering System
- Real-time search by product name
- Price-based filtering options:
  - Under 500K VND
  - 500K - 1M VND
  - Over 1M VND

### 3. AI-Powered Recommendations
- Intelligent product suggestions via `/api/suggestions` endpoint
- Personalized recommendations based on user behavior patterns
- Considers user viewing history and preferences

### 4. Product Details Modal
- Comprehensive product information display
- High-resolution product imagery
- Detailed descriptions and user reviews
- Interactive overlay interface

### 5. Wishlist Management
- Add/remove products from personal wishlist
- Dedicated wishlist page for saved items
- Persistent storage across sessions

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom animations. Configuration can be found in `tailwind.config.js`.

### TypeScript
Full TypeScript support with strict type checking enabled. Type definitions are located in the `types/` directory.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Starting Production Server
```bash
npm run start
```

### Deployment Platforms
This Next.js application can be deployed on:
- Vercel (recommended)
- Netlify
- AWS
- Google Cloud Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or open an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
