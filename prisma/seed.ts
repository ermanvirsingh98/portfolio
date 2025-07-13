import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.settings.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.award.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experiencePosition.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.about.deleteMany();
  await prisma.overview.deleteMany();

  // Create default overview
  await prisma.overview.create({
    data: {
      firstName: "Manny",
      lastName: "Singh",
      displayName: "Manny Singh",
      username: "manny",
      gender: "male",
      bio: "Creating with code, driven by passion.",
      flipSentences: [
        "Front End Developer",
        "React Developer",
        "Software Developer",
      ],
      address: "Dallas, Texas (USA)",
      phoneNumber: "309 204 7800",
      email: "er.manvirsingh98@gmail.com",
      website: "https://amazingDeveloper.com",
      avatar: "/images/chanhdai-avatar-ghibli.jpeg",
      ogImage: "/images/chanhdai-og-image.png",

      dateCreated: "2023-10-20",
    },
  });

  // Create default settings
  await prisma.settings.create({
    data: {
      siteTitle: "My Creative Portfolio",
      siteDescription:
        "A showcase of my work, skills, and experience in software development",
      theme: "system",
    },
  });

  // Create default about
  await prisma.about.create({
    data: {
      title: "About Me",
      description:
        "Passionate software developer with expertise in modern web technologies",
      content:
        "I'm a dedicated software developer with a passion for creating innovative solutions. With years of experience in full-stack development, I specialize in building scalable web applications using modern technologies like React, Node.js, and cloud platforms.",
      imageUrl: "/images/avatar.jpg",
    },
  });

  // Create sample skills
  const skills = [
    {
      name: "React",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/react.svg",
      level: 5,
    },
    {
      name: "TypeScript",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/typescript.svg",
      level: 5,
    },
    {
      name: "Next.js",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/nextjs2-light.svg",
      level: 5,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/tailwindcss.svg",
      level: 5,
    },
    {
      name: "Shadcn UI",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/shadcn-ui-light.svg",
      level: 4,
    },
    {
      name: "Material-UI",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/mui.svg",
      level: 4,
    },
    {
      name: "Node.js",
      category: "Backend",
      iconUrl: "/images/tech-stack-icons/nodejs.svg",
      level: 4,
    },
    {
      name: "Prisma",
      category: "Database",
      iconUrl: "/images/tech-stack-icons/graphql.svg",
      level: 4,
    },
    {
      name: "Supabase",
      category: "Backend",
      iconUrl: "/images/tech-stack-icons/aws.svg",
      level: 4,
    },
    {
      name: "Clerk",
      category: "Backend",
      iconUrl: "/images/tech-stack-icons/git.svg",
      level: 4,
    },
    {
      name: "PostgreSQL",
      category: "Database",
      iconUrl: "/images/tech-stack-icons/mysql.svg",
      level: 4,
    },
    {
      name: "Docker",
      category: "DevOps",
      iconUrl: "/images/tech-stack-icons/docker.svg",
      level: 3,
    },
    {
      name: "AWS",
      category: "Cloud",
      iconUrl: "/images/tech-stack-icons/aws.svg",
      level: 3,
    },
    {
      name: "Git",
      category: "Tools",
      iconUrl: "/images/tech-stack-icons/git.svg",
      level: 5,
    },
    {
      name: "JavaScript",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/js.svg",
      level: 5,
    },
    {
      name: "HTML/CSS",
      category: "Frontend",
      iconUrl: "/images/tech-stack-icons/ps.svg",
      level: 5,
    },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Create sample social links
  const socialLinks = [
    {
      platform: "github",
      url: "https://github.com/yourusername",
      iconUrl: "/images/link-icons/github.webp",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/yourusername",
      iconUrl: "/images/link-icons/linkedin.webp",
    },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }

  // Create sample projects
  const projects = [
    {
      title: "Questify - Task Management App",
      description:
        "A comprehensive task management application with real-time collaboration features.",
      content: `## Project Overview
Questify is a full-stack task management application designed for teams and individuals who need powerful project tracking capabilities.

## Key Features
- **Real-time Collaboration**: Multiple users can work on tasks simultaneously
- **Advanced Project Tracking**: Kanban boards, timelines, and progress analytics
- **User Authentication**: Secure login with role-based access control
- **File Management**: Upload and organize project files
- **Notifications**: Real-time updates and email notifications

## Technical Implementation
The application is built with a modern tech stack including Next.js 15 for the frontend, Prisma for database management, and Supabase for backend services. The real-time features are powered by WebSockets, and the UI is built with Tailwind CSS and Shadcn UI components.

## Challenges & Solutions
- **Real-time Updates**: Implemented WebSocket connections for live collaboration
- **Performance**: Used React Query for efficient data fetching and caching
- **Scalability**: Designed with microservices architecture for future growth

## Results
- 500+ active users within 3 months of launch
- 95% user satisfaction rating
- Reduced project completion time by 30%`,
      imageUrl: "/images/blog/welcome-1.webp",
      githubUrl: "https://github.com/yourusername/questify",
      liveUrl: "https://questify-portal.netlify.app/",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Prisma",
        "Supabase",
        "Clerk",
        "Docker",
      ],
      featured: true,
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      content: `## Project Overview
A complete e-commerce platform built from scratch with modern web technologies and best practices.

## Key Features
- **Product Management**: Comprehensive catalog with categories and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Payment Integration**: Secure payment processing with Stripe
- **Order Management**: Complete order lifecycle tracking
- **Admin Dashboard**: Full administrative interface for store management

## Technical Stack
- **Frontend**: React with TypeScript and Material-UI
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe integration for secure transactions
- **Deployment**: Docker containers on AWS

## Performance Optimizations
- Implemented lazy loading for product images
- Used React.memo for component optimization
- Database query optimization with proper indexing
- CDN integration for static assets

## Business Impact
- Processed $50K+ in transactions
- 99.9% uptime reliability
- 40% faster page load times compared to competitors`,
      imageUrl: "/images/blog/awesome-terminal-1.webp",
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      technologies: [
        "React",
        "TypeScript",
        "Material-UI",
        "Node.js",
        "PostgreSQL",
        "Stripe",
      ],
      featured: false,
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website with admin dashboard",
      content: `## Project Overview
A dynamic portfolio website with a comprehensive admin dashboard for content management, featuring real-time updates and modern UI components.

## Key Features
- **Dynamic Content Management**: Full CRUD operations for all portfolio sections
- **Rich Text Editor**: Simple textarea for content creation
- **Real-time Preview**: Live preview of changes before publishing
- **Responsive Design**: Mobile-first approach with modern UI
- **SEO Optimization**: Built-in SEO tools and meta management
- **Resume Builder**: Integrated resume creation with multiple templates

## Technical Architecture
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **UI Components**: Shadcn UI for consistent design system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk for secure user management
- **Rich Text**: Simple textarea for content editing
- **Deployment**: Vercel with automatic deployments

## Development Process
- **Version Control**: Git with feature branch workflow
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Testing**: Unit tests with Jest and React Testing Library
- **Documentation**: Comprehensive README and inline documentation

## Performance Metrics
- Lighthouse score: 95+ across all categories
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Core Web Vitals: All green`,
      imageUrl: "/images/blog/uptime-kuma-1.webp",
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://myportfolio.com",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Prisma",
        "Supabase",
        "Clerk",
        "Textarea",
      ],
      featured: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Create sample experience
  const experience = await prisma.experience.create({
    data: {
      company: "Vacation Express by Sunwing",
      location: "Toronto, ON",
      description:
        "Leading development of scalable web applications and mentoring junior developers.",
      logoUrl: "/images/companies/vc.jpg",
    },
  });

  // Create sample positions for the experience
  await prisma.experiencePosition.create({
    data: {
      title: "Senior Frontend Developer",
      startDate: new Date("2021-10-01"),
      isCurrent: true,
      year: "10.2021 - present",
      employmentType: "Full-time",
      icon: "code",
      description: `## Key Responsibilities
- **Lead Frontend Development**: Spearheaded development of scalable web applications across multiple e-commerce platforms
- **Component Architecture**: Redesigned and maintained reusable component libraries for improved development efficiency
- **Content Management**: Built custom dashboard to synchronize content between two Contentful spaces, reducing manual work by 60%
- **Performance Optimization**: Architected modular, high-performance front-end systems with 40% faster load times
- **Team Leadership**: Led a team of 4 junior developers through code reviews, mentoring, and technical guidance

## Technical Achievements
- **Platform Migration**: Successfully migrated legacy jQuery applications to modern React/TypeScript stack
- **API Integration**: Implemented GraphQL APIs for efficient data fetching and real-time updates
- **Design System**: Established comprehensive design system with Material-UI and custom components
- **Testing Strategy**: Introduced comprehensive testing with Jest and React Testing Library (90%+ coverage)

## Business Impact
- Reduced development time by 30% through component reusability
- Improved user experience scores by 25% through performance optimizations
- Mentored 4 developers who advanced to mid-level positions
- Delivered 15+ major features on time and within budget`,
      skills: [
        "React.js",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Material-UI",
        "Gatsby.js",
        "Contentful",
        "GraphQL",
      ],
      experienceId: experience.id,
    },
  });

  // Create another experience
  const experience2 = await prisma.experience.create({
    data: {
      company: "Public Health And Safety Association",
      location: "Toronto, ON",
      description:
        "Designed and developed new features for pshsa.ca, enhancing digital tools and user experience.",
      logoUrl: "/images/companies/pshsa.jpg",
    },
  });

  await prisma.experiencePosition.create({
    data: {
      title: "Full Stack Web Developer",
      startDate: new Date("2018-11-01"),
      endDate: new Date("2021-09-30"),
      isCurrent: false,
      year: "11.2018 - 09.2021",
      employmentType: "Full-time",
      icon: "code",
      description: `## Key Responsibilities
- **Full Stack Development**: Designed and developed new features for pshsa.ca using modern web technologies
- **Learning Management System**: Successfully integrated a comprehensive LMS into the website, serving 10,000+ users
- **System Architecture**: Architected scalable full-stack solutions using the MERN stack with microservices approach
- **Frontend Leadership**: Led front-end development initiatives with React.js and Sass, improving code maintainability

## Technical Achievements
- **Database Design**: Designed and optimized MongoDB schemas for complex data relationships
- **API Development**: Built RESTful APIs and GraphQL endpoints for seamless data integration
- **Cloud Infrastructure**: Deployed and managed applications on AWS with CI/CD pipelines
- **Mobile Development**: Developed React Native applications for cross-platform mobile solutions

## Business Impact
- Increased website traffic by 45% through improved user experience
- Reduced system downtime by 80% through robust architecture
- Successfully launched LMS platform serving 10,000+ healthcare professionals
- Improved development workflow efficiency by 35% through modern tooling`,
      skills: [
        "React.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "AWS",
        "React Native",
        "Prisma",
      ],
      experienceId: experience2.id,
    },
  });

  // Create sample education
  await prisma.education.create({
    data: {
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "San Francisco, CA",
      startDate: new Date("2018-09-01"),
      endDate: new Date("2022-05-01"),
      isCurrent: false,
      description:
        "Graduated with honors. Focused on software engineering and web development.",
      logoUrl: "/images/companies/education.webp",
    },
  });

  // Create sample awards
  await prisma.award.create({
    data: {
      title: "Most Valuable Player Award",
      issuer: "Tech Conference 2023",
      date: new Date("2023-09-15"),
      description:
        "Recognized for outstanding performance, collaboration, and contributions to key projects, demonstrating exceptional dedication and impact within the team.",
      imageUrl: "/images/blog/uptime-kuma-1.webp",
    },
  });

  // Create sample certifications
  await prisma.certification.create({
    data: {
      title: "Mobile Application Design & Development",
      issuer: "Lambton College Toronto",
      issueDate: new Date("2017-12-17"),
      expiryDate: null,
      credentialId: "LAMBTON-MAD-2017",
      description:
        "Completed a comprehensive program covering mobile and web application design and development, including React.js, React Native, and modern web technologies.",
      imageUrl: "/images/tech-stack-icons/react.svg",
    },
  });

  await prisma.certification.create({
    data: {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      issueDate: new Date("2023-03-01"),
      expiryDate: new Date("2026-03-01"),
      credentialId: "AWS-DEV-123456",
      description:
        "Certified in developing and maintaining applications on the AWS platform, including serverless architectures and cloud-native development.",
      imageUrl: "/images/tech-stack-icons/aws.svg",
    },
  });

  // Create sample resumes
  const sampleResume = await prisma.resume.create({
    data: {
      title: "Software Developer Resume",
      template: "modern",
      theme: "light",
      fontFamily: "inter",
      fontSize: "medium",
      spacing: "normal",
      sections: {
        create: [
          {
            type: "personal",
            title: "Personal Information",
            content: JSON.stringify({
              name: "Manny Singh",
              title: "Software Developer & UI/UX Designer",
              email: "er.manvirsingh98@gmail.com",
              phone: "309 204 7800",
              website: "https://amazingDeveloper.com",
              location: "Dallas, Texas (USA)",
              bio: "Creating with code, driven by passion.",
            }),
            order: 0,
            isVisible: true,
          },
          {
            type: "experience",
            title: "Work Experience",
            content: JSON.stringify([
              {
                company: "Tech Company",
                position: "Senior Software Developer",
                location: "Dallas, TX",
                startDate: "2023-01-01",
                endDate: null,
                isCurrent: true,
                description:
                  "Led development of multiple web applications using React, TypeScript, and Node.js. Mentored junior developers and implemented best practices.",
              },
              {
                company: "Startup Inc",
                position: "Full Stack Developer",
                location: "Remote",
                startDate: "2022-01-01",
                endDate: "2022-12-31",
                isCurrent: false,
                description:
                  "Built and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality products.",
              },
            ]),
            order: 1,
            isVisible: true,
          },
          {
            type: "education",
            title: "Education",
            content: JSON.stringify([
              {
                institution: "University of Technology",
                degree: "Bachelor of Science",
                field: "Computer Science",
                location: "Dallas, TX",
                startDate: "2018-09-01",
                endDate: "2022-05-01",
                isCurrent: false,
                description:
                  "Graduated with honors. Focused on software engineering and web development.",
              },
            ]),
            order: 2,
            isVisible: true,
          },
          {
            type: "skills",
            title: "Technical Skills",
            content: JSON.stringify([
              { name: "React", category: "Frontend", level: 5 },
              { name: "TypeScript", category: "Frontend", level: 5 },
              { name: "Next.js", category: "Frontend", level: 5 },
              { name: "Node.js", category: "Backend", level: 4 },
              { name: "PostgreSQL", category: "Database", level: 4 },
              { name: "Docker", category: "DevOps", level: 3 },
            ]),
            order: 3,
            isVisible: true,
          },
        ],
      },
    },
  });

  console.log("Sample resume created:", sampleResume.id);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
