export const USER = {
    firstName: "Manny",
    lastName: "Singh",
    displayName: "Manny Singh",
    username: "manny",
    gender: "male",
    bio: "Creating with code, driven by passion.",
    flipSentences: [
      "Front End Developer",
      "Software Developer",
      "React Developer",
    ],
    address: "Dallas, Texas (USA)",
    phoneNumber: "309 204 7800", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
    email: "er.manvirsingh98@gmail.com", // base64 encoded
    // email: "dai[at]chanhdai[dot]com",
    website: "https://amazingDeveloper.com",
    otherWebsites: [
      // "https://dai.ng",
      // "https://dai.so",
      // "https://d.io.vn",
      // "https://d.id.vn",
      // "https://dai.io.vn",
      // "https://dai.id.vn",
      // "https://dai.is-a.dev",
      // "https://chanhdai.io.vn",
      // "https://chanhdai.id.vn",
    ],
    dateOfBirth: "2000-08-14", // YYYY-MM-DD
    jobTitle: "Software Developer & UI/UX Designer",
    jobs: [
      {
        title: "Senior Frontend Developer",
        company: "Vacation Express",
        website: "https://simplamo.com?ref=IN-926722",
      },
      {
        title: "Developer",
        company: "Freelance",
        website: "https://quaric.com",
      },
    ],
    about: `
  Hello, I am Manny, a Frontend Developer passionate about building high-performance, user-centric software with intuitive and engaging designs.\n
  With over 7 years of experience, I specialize in creating modern web applications using React, Next.js, TypeScript, and related technologies. I have extensive experience with React.js and its ecosystem, including state management (Redux), React Router, and React Hooks. My goal is to build scalable, reusable components that deliver seamless user experiences across all devices.\n
  A significant part of my work involves integrating headless CMS platforms like Contentful to power dynamic and content-driven web applications. I also write migration scripts to manage content structure changes, ensuring smooth data transitions and system upgrades. Additionally, I develop custom extensions for Contentful to extend its functionality and tailor it to specific project needs.\n
  Let's connect and collaborate!
    `,
    avatar: "/images/chanhdai-avatar-ghibli.jpeg",
    ogImage: "/images/chanhdai-og-image.png",
    keywords:
      "ncdai, nguyenchanhdai, nguyen chanh dai, chanhdai, chanh dai, iamncdai, quaric, zadark, nguyễn chánh đại, chánh đại",
    dateCreated: "2023-10-20", // YYYY-MM-DD
  };
  

  // import { Award } from "../types/awards";

export const AWARDS: any = [
  {
    id: "a144bd19-3706-4e4c-ba22-0e0d8302642a",
    prize: "MVP",
    title: "Most Valuable Player Award",
    date: "2023-09",
    description:
      "> Recognized for outstanding performance, collaboration, and contributions to key projects, demonstrating exceptional dedication and impact within the team.",
    current: true,
    },
  
 
];


// import { Certification } from "../types/certifications";

export const CERTIFICATIONS: any = [
  {
    title: "Mobile Application Design & Development",
    issuer: "Lambton College Toronto",
    issueDate: "2017-12-17"
  },
  {
    title: "The Ultimate Docker Course Certification",
    issuer: "Udemy",
    issueDate: "2022-08-28",
    credentialID: "YV5VQ5MXZ5YH",
    credentialURL: "https://coursera.org/verify/YV5VQ5MXZ5YH",
  },
  {
    title: "E-commerce React Website Certification",
    issuer: "Udemy",
    issueDate: "2022-08-28",
    credentialID: "YV5VQ5MXZ5YH",
    credentialURL: "https://coursera.org/verify/YV5VQ5MXZ5YH",
  },

];



// import { Experience } from "../types/experiences";

export const EXPERIENCES: any = [
  {
    company: "Vacation Express by Sunwing",
    companyLogo: "/images/companies/vc.jpg",
    positions: [
      {
        id: "20f8bfe5-b6a3-4b0d-ac2f-6fccd50d417e",
        title: "Senior Frontend Developer",
        year: "10.2021 - present",
        employmentType: "Full-time",
        icon: "code",
        description:"- Redeveloped, maintained components and new features across multiple e-commerce platforms, including [sunwing.ca](sunwing.ca), [selloffvacation.com](selloffvacation.com), and [vwq.com](vwq.com) leading to profitability and increase in overall sales.\n- Designed and built a custom dashboard to sync content between two Contentful spaces, ensuring data consistency and reducing server load by 80% .\n - Architected modular, high-performance front-end systems, ensuring long-term adaptability and maintainability.\n - Led a team of junior developers by participating in code reviews, and merging PRs. \n- Collaborated cross-functionally with ***Product Managers***, ***Designers***, ***BAs***, and ***QA engineers*** to deliver high-quality, user-focused features.\n - Created and maintained a reusable component library with Storybook for consistent UI development and testing.\n  - Write migration scripts and custom extensions for Contentful CMS, automating data workflows and enhancing editorial efficiency.\n - Implementing GraphQL queries to fetch structured data from Contentful for dynamic content rendering.\n - Migrated a large-scale application from Angular 3.4 to Angular 14, modernizing the tech stack and improving maintainability.\n - Optimized performance using caching, lazy loading, and best practices to reduce load times and enhance user experience.\n - Integrated REST and GraphQL APIs, collaborating closely with the backend team for performance tuning and scalability.\n - Led API validation, error handling, and data integrity measures to ensure robust client-side data flow.\n - Continuously seek out challenges and opportunities to learn new technologies, staying adaptable in a fast-paced environment.\n - Regularly presented tech demos or knowledge-sharing sessions, fostering a culture of continuous learning.",
        skills: [
          "Gatsby.js",
          "React.js",
          "TypeScript",
          "SCSS",
          "Contentful",
          "Graphql",
          "Azure functions"
        ],
        expanded: true,
      },
    ],
    current: true,
  },
  {
    company: "Public Health And Safety Association",
    companyLogo: "/images/companies/pshsa.jpg",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Full Stack Web Developer",
        year: "11.2018 - 09-2021",
        employmentType: "Full-time",
        icon: "code",
        description: "- Designed and developed new features for pshsa.ca, enhancing digital tools and user experience to better support health and safety training and resources.\n- Collaborated cross-functionally to create an interactive risk assessment tool for Ontario workplaces, transforming complex regulatory requirements into a user-friendly digital solution.\n- Integrated a Learning Management System (LMS) into the website to streamline online training, user tracking, and certification workflows.\n- Architected scalable full-stack solutions using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Apostrophe CMS to support evolving organizational needs.\n- Led front-end development with React.js and Sass to deliver responsive, accessible, and cross-browser-compatible interfaces aligned with WCAG standards.\n- Maintained and enhanced internal web applications, ensuring performance, stability, and alignment with internal workflows and organizational goals.\n- Developed and maintained features in a React Native mobile app, expanding accessibility and functionality for users across platforms.\n- Optimized performance and UX, reducing load times and improving responsiveness through architectural improvements and best practices.\n- Deployed and maintained websites on AWS EC2 instances, ensuring high availability, security, and seamless performance.\n- Wrote a cron job to automate daily backups of the database and save them to an S3 bucket for reliable data storage and recovery.\n- Collaborated with vendors to deliver new features, ensuring timely implementation and alignment with project requirements.\n",
        skills: [
          "React.js",
          "Apostrophe CMS",
          "MERN Stack",
          "Javascript",
          "AWS",
          "React Native",
          "Project management"
        ],
        expanded: true,
      },
      
    ],
    current: false,
  },
  {
    company: "Logiic",
    companyLogo: "/images/companies/logific.png",
    positions: [
      {
        id: "3e831244-8d8c-41e2-b2ce-7f3946956afd",
        title: "Front End Developer",
        year: "08.2018 - 11.2020",
        employmentType: "Contract",
        description:
          "- Created and maintained dynamic React components, converting designs into functional, interactive UIs, improving usability and performance.\n - Applied advanced CSS techniques, including Media Queries, for responsive design, ensuring optimal user experience across devices.\n - Built responsive web apps with ReactJS and Bootstrap, ensuring consistency across various screen sizes and devices.\n - Developed interactive UIs with React and Angular, focusing on performance optimization and user engagement using reusable components and efficient state management.\n - Streamlined styling with modern CSS methodologies and preprocessors, ensuring consistency and maintainability, while using frameworks like Bootstrap for faster development and responsive design.",
        icon: "code",
        skills: [
          "React.js",
          "Javascript",
          "CSS",
          "Bootstrap",
          "Responsive",
        ],
      },

      
    ],
  },
  {
    company: "Mike Agency",
    companyLogo: "/images/companies/mike.png",
    positions: [
      {
        id: "3e831244-8d8c-41e2-b2ce-7f394695rrtr",
        title: "Full Stack Web Developer",
        year: "01.2018 - 07.2018",
        employmentType: "Full-time",
        description:
          "- Translated UX wireframes and mock-ups into highly responsive and interactive front-end features using HTML5, CSS3, Bootstrap, JavaScript, jQuery, and Ajax, ensuring a seamless, user-centric digital experience.\n - Collaborated with graphic design, back-end development, and marketing teams, fostering alignment with project objectives and timelines for cohesive project delivery.\n - Led the development and maintenance of WordPress websites, customizing child themes to meet project requirements, client specifications, and branding guidelines.\n - Spearheaded full-stack website launches with a focus on front-end features, ensuring seamless user experiences across platforms and devices.\n - Conducted extensive browser testing and debugging to identify and resolve compatibility and usability issues, optimizing performance across browsers and platforms.",
        icon: "code",
        skills: [
          "React",
          "HTML",
          "CSS",
          "Javascript",
          "JQuery",
          "UI libraries",
          "Workdpress",
          "PHP",
        ],
      },

      
    ],
  },
  {
    company: "PasSportme",
    companyLogo: "/images/companies/tungtung.webp",
    positions: [
      {
        id: "3e831244-8d8c-41e2-b2ce-7f39469fdfd",
        title: "Full Stack Web Developer",
        year: "07.2017 - 01.2018",
        employmentType: "Full-time",
        description:
          "- Led UI modernization with React.js, creating reusable components that improved scalability and user experience.\n - Created various UI templates, integrating them with the same backend database for consistent data handling and user interaction.\n - Utilized a tech stack (ASP, HTML5, Bootstrap 4, CSS3, JavaScript/Angular) to build dynamic, responsive interfaces while ensuring maintainability.\n - Performed cross-browser testing, optimizing for consistent rendering and functionality across devices.\n - Optimized SQL queries, reducing load times and enhancing site performance and responsiveness.\n - Integrated backend with frontend through APIs, ensuring seamless data flow and improving overall functionality.",
        icon: "code",
        skills: [
          "React",
          "HTML",
          "CSS",
          "Javascript",
          "Jquery",
          "ASP.Net",
          "SQL",
        ],
      },

      
    ],
  },
  // {
  //   company: "Additional Experience",
  //   positions: [
  //     {
  //       id: "f0becfba-057d-40db-b252-739e1654faa1",
  //       title: "Front End Developer",
  //       year: "10.2016 - 01.2017",
  //       employmentType: "Internship",
  //       description:
  //         "- Built an order management website with real-time delivery tracking.\n- Developed an e-commerce site for bird's nest products.\n- Created a map to display monitoring station data.\n- Designed a customizable WordPress landing page.",
  //       icon: "code",
  //       skills: [
  //         "Laravel",
  //         "React",
  //         "Express.js",
  //         "Socket.IO",
  //         "MongoDB",
  //         "Firebase",
  //         "Docker",
  //         "NGINX",
  //       ],
  //     },
  //     {
  //       id: "0eecdfcb-028d-41f4-93e9-1269ba7eff7e",
  //       title: "Graphic & UI/UX Designer",
  //       year: "2018-2019",
  //       employmentType: "Part-time",
  //       description: "Designed logos, posters, ads, and UI.",
  //       icon: "design",
  //       skills: [
  //         "Creativity",
  //         "UI/UX Design",
  //         "Graphic Design",
  //         "Sketch",
  //         "Adobe Photoshop",
  //         "Adobe Illustrator",
  //       ],
  //     },
  //   ],
  // },
  {
    company: "Education",
    companyLogo: "/images/companies/education.webp",
    positions: [
      {
        id: "c47f5903-88ae-4512-8a50-0b91b0cf99b6",
        title: "Lambton College - Toronto",
        year: "05.2016 - 12.2017",
        icon: "education",
        description:
          " > I completed a Post-Graduation Diploma in Mobile and Web Application Design and Development from Lambton College, where I gained comprehensive knowledge and practical experience in building and optimizing applications for both mobile and web platforms. This certification equipped me with advanced technical skills in full-stack development, allowing me to deliver high-quality solutions across different devices and environments.",
        skills: [
          "React.js",
          "React Native",
          "Web Application",
          "Frontend Development"
        ],
      },
      {
        id: "70131ed8-36d9-4e54-8c78-eaed18240eca",
        title: "Punjab Technical University - India",
        year: "05.2011 - 05.2015",
        icon: "education",
        description:
          "> Graduated with a focus on software development, algorithms, data structures, computer networks, databases, and operating systems. Gained hands-on experience in programming languages (C, C++, Java), web development, and problem-solving, while developing strong analytical and technical skills for software engineering.",
        skills: [
          "Data Structure",
          "C++",
          "PHP",
          "MySQL",
          "PHP",
          "Node.js",
          "Java",
          "Self-learning",
        ],
      },
      
    ],
  },
];


export const PROJECTS: any = [
  {
    id: "Questify",
    title: "questify-portal.netlify.app",
    time: "03.2024 - present",
    link: "https://questify-portal.netlify.app/",
    tags: [
      "Personal Project",
      "Next.js 15",
      "Tailwind CSS v3",
      "shadcn/ui",
      "Strapi 5",
      "VNPAY-QR",
      "Docker",
      "Docker Compose",
      "NGINX",
    ],
    // description:
    //   "chanhdai.com is my portfolio website, showcasing my work and experience as a Software Developer & UI/UX Designer.\n- Elegant & Minimalistic UI: Clean and modern design\n- Dark Mode: Supports light and dark themes for a better user experience\n- vCard Integration: Digital business card with contact details\n- SEO Optimization: JSON-LD schema, sitemap, robots\n- Email Protection: Obfuscation to prevent spam\n- Installable PWA\n- [Next.js 15](https://nextjs.org/): Latest React framework for optimized performance and scalability\n- [Tailwind CSS v4](https://tailwindcss.com/): Modern utility-first CSS framework for styling\n\nBlog Features:\n- MDX & Markdown support\n- [Syntax Highlighting](https://chanhdai.com/blog/writing-effect-inspired-by-apple) for better readability\n - [RSS Feed](https://chanhdai.com/rss) for easy content distribution\n- Dynamic OG Images for rich previews",
  }
];


// import { SocialLink } from "../types/social-links";

export const SOCIAL_LINKS: any = [
  
  {
    icon: "/images/link-icons/linkedin.webp",
    title: "LinkedIn",
    description: "manvirsingh98",
    href: "https://www.linkedin.com/in/manvirsingh98/",
  },
  {
    icon: "/images/link-icons/github.webp",
    title: "GitHub",
    description: "ermanvirsingh98",
    href: "https://github.com/ermanvirsingh98",
  },
  // {
  //   icon: "/images/link-icons/dailydev.webp",
  //   title: "daily.dev",
  //   description: "@ncdai",
  //   href: "https://app.daily.dev/ncdai",
  // },
  // {
  //   icon: "/images/link-icons/youtube.webp",
  //   title: "YouTube",
  //   description: "@ncdai",
  //   href: "https://www.youtube.com/@ncdai",
  // },
  // {
  //   icon: "/images/link-icons/zalo.webp",
  //   title: "Zalo",
  //   description: "Quaric",
  //   href: "https://zalo.me/2353934240045322830",
  // },
  // {
  //   icon: "/images/link-icons/telegram.webp",
  //   title: "Telegram",
  //   description: "@ncdai",
  //   href: "https://t.me/ncdai",
  // },
];


// import { TECH_STACK } from "../../data/tech-stack";

export const TECH_STACK: any = [
  {
    key: "js",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["Language"],
  },
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    categories: ["Language"],
  },
  {
    key: "react",
    title: "React",
    href: "https://react.dev/",
    categories: ["Library", "UI Library"],
  },
  {
    key: "react-navigation",
    title: "React Navigation",
    href: "https://reactnavigation.org/",
    categories: ["Library", "Navigation"],
  },
  {
    key: "nextjs2",
    title: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  
 
 
  {
    key: "nodejs",
    title: "Node.js",
    href: "https://nodejs.org/",
    categories: ["Runtime Environment"],
  },
 
  {
    key: "mui",
    title: "MUI",
    href: "https://tailwindcss.com/",
    categories: ["Library"],
  },
 
  {
    key: "tailwindcss",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    categories: ["Framework"],
  },
  {
    key: "shadcn-ui",
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    categories: ["Library", "Component Library"],
    theme: true,
  },
  {
    key: "radixui",
    title: "Radix UI",
    href: "https://www.radix-ui.com/",
    categories: ["Library", "Component Library"],
    theme: true,
  },
  {
    key: "motion",
    title: "Motion",
    href: "https://motion.dev/",
    categories: ["Library", "Animation"],
  },
  
  {
    key: "redux",
    title: "Redux",
    href: "https://redux.js.org/",
    categories: ["State Management"],
  },

  {
    key: "react-router",
    title: "React Router",
    href: "https://reactrouter.com/",
    categories: ["Library", "Navigation"],
  },
 
 
  
  {
    key: "git",
    title: "Git",
    href: "https://git-scm.com/",
    categories: ["Version Control"],
  },
  
  {
    key: "mongodb",
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    categories: ["Database"],
  },

 
 
  {
    key: "chatgpt",
    title: "ChatGPT",
    href: "https://chatgpt.com/",
    categories: ["Tools", "AI"],
    theme: true,
  },
  {
    key: "aws",
    title: "AWS",
    href: "https://aws.com/",
    categories: ["Tools", "AI"],
    // theme: true,
  },
  {
    key: "azure",
    title: "Azure#",
    href: "https://aws.com/",
    categories: ["Tools", "AI"],
    // theme: true,
  },
  {
    key: "graphql",
    title: "GraphQL",
    href: "https://aws.com/",
    categories: ["Framework"],
    // theme: true,
  },
  {
    key: "chartjs",
    title: "Chartjs",
    href: "https://aws.com/",
    categories: ["Library"],
    // theme: true,
  },
  {
    key: "reactquery",
    title: "React Query",
    href: "https://aws.com/",
    categories: ["Library"],
    // theme: true,
  },
  {
    key: "react-hook-form",
    title: "React Hook Form",
    href: "https://aws.com/",
    categories: ["Library"],
    // theme: true,
  },
  {
    key: "c-sharp",
    title: "c#",
    href: "https://aws.com/",
    categories: ["Language"],
    // theme: true,
  },
  {
    key: "postman",
    title: "Postman",
    href: "https://aws.com/",
    categories: ["Tool"],
    // theme: true,
  },
  
];
