# Portfolio Developer - Next.js 15 Portfolio with Admin Dashboard

A modern, dynamic portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and a comprehensive admin dashboard for content management. Features Supabase PostgreSQL database integration, Clerk authentication, and real-time data synchronization.

## 🚀 Features

### Frontend Portfolio

- **Modern Design**: Clean, responsive design with dark/light theme support
- **Dynamic Content**: All sections fetch data from API with loading states
- **Rich Text Support**: Simple textarea for content editing
- **Tech Stack Display**: Interactive tech stack with categorized skills
- **Project Showcase**: Featured projects with live demos and GitHub links
- **Experience Timeline**: Work experience with company logos and positions
- **Education Section**: Academic background and certifications
- **Awards & Recognition**: Professional achievements and awards
- **Social Integration**: Social media links with custom icons
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### Admin Dashboard

- **Secure Authentication**: Clerk integration with role-based access
- **Full CRUD Operations**: Create, read, update, delete for all sections
- **Rich Text Editor**: Simple textarea for content editing
- **Form Validation**: Zod schemas with react-hook-form
- **Responsive Design**: Mobile-first dashboard with sidebar navigation
- **Real-time Updates**: Live data synchronization
- **File Management**: Image upload and management
- **Data Export/Import**: Backup and restore functionality

### Backend & Database

- **Supabase Integration**: PostgreSQL database with real-time features
- **Prisma ORM**: Type-safe database operations
- **RESTful API**: Complete CRUD endpoints for all models
- **Authentication**: Secure API routes with Clerk
- **File Storage**: Supabase Storage for images and assets
- **Real-time Subscriptions**: Live updates across clients

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Framer Motion** - Animation library
- **Textarea** - Simple text editor
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend

- **Supabase** - PostgreSQL database and backend services
- **Prisma** - Type-safe database ORM
- **Clerk** - Authentication and user management
- **Next.js API Routes** - Serverless API endpoints

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Clerk account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-develop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🔐 Authentication Setup

### Clerk Configuration

1. **Create Clerk Account**

   - Go to [clerk.com](https://clerk.com)
   - Sign up and create a new application

2. **Get API Keys**

   - In Clerk Dashboard → API Keys
   - Copy `Publishable Key` and `Secret Key`

3. **Configure Sign-in Methods**

   - Go to User & Authentication → Email, Phone, Username
   - Enable desired sign-in methods (Email recommended)

4. **Set Up Redirect URLs**
   - Go to Paths & URLs
   - Add redirect URLs:
     - `http://localhost:3000/sign-in`
     - `http://localhost:3000/dashboard`
     - `http://localhost:3000/`

### Testing Authentication

1. Visit `http://localhost:3000/dashboard`
2. Should redirect to `/sign-in`
3. Sign up/sign in with Clerk
4. Should redirect back to dashboard

## 🗄️ Database Schema

### Models Overview

- **About**: Portfolio about section with rich text content
- **Project**: Portfolio projects with technologies and links
- **Skill**: Technical skills with categories and levels
- **SocialLink**: Social media links with platform icons
- **Experience**: Work experience with company positions
- **Education**: Educational background and institutions
- **Award**: Awards and recognitions
- **Certification**: Professional certifications
- **Settings**: Site configuration and SEO settings

### Key Features

- **Rich Text Content**: Simple text storage for content
- **Image Management**: URL-based image storage with fallbacks
- **Ordering System**: Sortable content with order fields
- **Timestamps**: Automatic created/updated tracking
- **Relationships**: Experience has many positions
- **Unique Constraints**: Skills and social links have unique names/platforms

## 🔌 API Endpoints

### Core Endpoints

- `GET/POST /api/about` - About section management
- `GET/POST /api/projects` - Projects CRUD operations
- `GET/POST /api/skills` - Skills management
- `GET/POST /api/social-links` - Social links management
- `GET/POST /api/experiences` - Work experience management
- `GET/POST /api/education` - Education management
- `GET/POST /api/awards` - Awards management
- `GET/POST /api/certifications` - Certifications management
- `GET/POST /api/settings` - Site settings

### Individual Item Endpoints

- `PUT/DELETE /api/projects/[id]` - Individual project operations
- `PUT/DELETE /api/skills/[id]` - Individual skill operations
- `PUT/DELETE /api/social-links/[id]` - Individual social link operations
- `PUT/DELETE /api/experiences/[id]` - Individual experience operations
- `PUT/DELETE /api/education/[id]` - Individual education operations
- `PUT/DELETE /api/awards/[id]` - Individual award operations
- `PUT/DELETE /api/certifications/[id]` - Individual certification operations

## 🎨 Customization

### Styling

The project uses Tailwind CSS with shadcn/ui components:

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: Customize shadcn/ui components in `src/components/ui/`
- **Layout**: Adjust dashboard layout in `src/app/(admin)/layout.tsx`

### Content Management

1. **Add New Sections**: Create new pages in `src/app/(admin)/dashboard/`
2. **Form Validation**: Use Zod schemas with react-hook-form
3. **Rich Text**: Use simple textarea for content editing
4. **Image Upload**: Use Supabase Storage for file management

### Data Structure

All data follows consistent patterns:

```typescript
interface BaseModel {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface ContentModel extends BaseModel {
  title: string;
  description: string;
  content: string; // Rich text JSON
  imageUrl?: string;
  order: number;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
# Database
DATABASE_URL="postgresql://postgres:[PROD-PASSWORD]@db.[PROD-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROD-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[PROD-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[PROD-SERVICE-ROLE-KEY]"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
```

### Database Migration

```bash
# Push schema to production
npm run db:push

# Seed production data (if needed)
npm run db:seed
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

### Project Structure

```
src/
├── app/
│   ├── (admin)/           # Admin dashboard routes
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── _components/   # Dashboard components
│   │   └── layout.tsx     # Dashboard layout
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Sign-in pages
│   │   └── layout.tsx     # Auth layout
│   ├── api/               # API routes
│   │   ├── about/         # About API
│   │   ├── projects/      # Projects API
│   │   ├── skills/        # Skills API
│   │   └── ...            # Other API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── About/             # About section components
│   ├── Projects/          # Project components
│   ├── Skills/            # Skills components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Other components
├── data/                  # Static data (legacy)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
└── middleware.ts          # Next.js middleware
```

### Adding New Features

1. **New Section**: Create API route, dashboard page, and frontend component
2. **Form Validation**: Define Zod schema and use react-hook-form
3. **Database**: Add model to Prisma schema and run migration
4. **Styling**: Use Tailwind CSS and shadcn/ui components

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check DATABASE_URL format
   - Verify Supabase project is active
   - Ensure API keys are correct

2. **Authentication Issues**

   - Verify Clerk environment variables
   - Check redirect URLs in Clerk dashboard
   - Restart development server after env changes

3. **Build Errors**

   - Clear Next.js cache: `rm -rf .next`
   - Regenerate Prisma client: `npm run db:generate`
   - Check TypeScript errors: `npm run lint`

4. **Image Loading Issues**
   - Verify image URLs in database
   - Check Next.js image configuration
   - Ensure images are in public directory

### Debug Commands

```bash
# Check environment variables
echo $DATABASE_URL

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# View database in browser
npx prisma studio

# Check Prisma schema
npx prisma validate
```

## 📱 Mobile Support

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Touch-friendly**: Proper touch targets and gestures
- **Mobile Sidebar**: Collapsible navigation for mobile devices
- **Optimized Images**: Next.js Image optimization for all devices

## 🔒 Security

### Implemented Security Features

- **Authentication**: Clerk integration with secure sessions
- **Route Protection**: Middleware-based route protection
- **API Security**: Protected API routes with authentication
- **Input Validation**: Zod schemas for all form inputs
- **Environment Variables**: Secure storage of sensitive data

### Production Security Checklist

- [ ] Enable Clerk authentication
- [ ] Configure proper redirect URLs
- [ ] Set up Row Level Security (RLS) in Supabase
- [ ] Validate all API inputs
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:

1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

## 🗺️ Roadmap

### Phase 1 (Completed)

- ✅ Basic portfolio structure
- ✅ Admin dashboard
- ✅ Database integration
- ✅ Authentication
- ✅ CRUD operations

### Phase 2 (In Progress)

- 🔄 Enhanced rich text editing
- 🔄 File upload system
- 🔄 Real-time updates
- 🔄 Advanced analytics

### Phase 3 (Planned)

- 📋 Multi-language support
- 📋 Advanced SEO features
- 📋 Performance optimization
- 📋 Advanced customization options

---

**Status**: 🟢 **Production Ready**

The portfolio is fully functional with authentication, database integration, and a complete admin dashboard. Ready for deployment and customization!
