// Course content with topics, subtopics and video lessons
export const courseContent = {
  1: {
    id: 1,
    title: "Advanced React Development",
    description: "Master advanced React concepts including hooks, context, and performance optimization.",
    instructor: "Sarah Chen",
    totalDuration: "24 hours",
    totalLessons: 45,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    topics: [
      {
        id: 1,
        title: "React Fundamentals Review",
        description: "Quick review of React basics before diving into advanced concepts",
        duration: "3 hours",
        subtopics: [
          {
            id: 1,
            title: "Component Lifecycle",
            duration: "45 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: true,
            description: "Understanding React component lifecycle methods and hooks"
          },
          {
            id: 2,
            title: "State Management Basics",
            duration: "40 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: true,
            description: "Local state management with useState and useReducer"
          },
          {
            id: 3,
            title: "Props and Context",
            duration: "35 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false,
            description: "Passing data between components effectively"
          },
          {
            id: 4,
            title: "Fundamentals Quiz",
            duration: "20 min",
            type: "quiz",
            completed: false,
            description: "Test your understanding of React fundamentals"
          }
        ]
      },
      {
        id: 2,
        title: "Advanced Hooks",
        description: "Deep dive into custom hooks and advanced hook patterns",
        duration: "5 hours",
        subtopics: [
          {
            id: 5,
            title: "Custom Hooks Creation",
            duration: "60 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false,
            description: "Building reusable custom hooks for common patterns"
          },
          {
            id: 6,
            title: "useCallback and useMemo",
            duration: "50 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            completed: false,
            description: "Performance optimization with memoization hooks"
          },
          {
            id: 7,
            title: "useRef Advanced Patterns",
            duration: "45 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            completed: false,
            description: "Advanced useRef patterns for DOM manipulation and values"
          },
          {
            id: 8,
            title: "Hook Composition Project",
            duration: "2 hours",
            type: "project",
            completed: false,
            description: "Build a data fetching hook with caching and error handling"
          }
        ]
      },
      {
        id: 3,
        title: "Performance Optimization",
        description: "Optimize React applications for production",
        duration: "4 hours",
        subtopics: [
          {
            id: 9,
            title: "React.memo and PureComponent",
            duration: "40 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            completed: false,
            description: "Preventing unnecessary re-renders"
          },
          {
            id: 10,
            title: "Code Splitting with Suspense",
            duration: "55 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            completed: false,
            description: "Lazy loading components and route-based splitting"
          },
          {
            id: 11,
            title: "Bundle Analysis",
            duration: "30 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            completed: false,
            description: "Analyzing and optimizing bundle size"
          }
        ]
      },
      {
        id: 4,
        title: "Advanced State Management",
        description: "Context API, Zustand, and state management patterns",
        duration: "6 hours",
        subtopics: [
          {
            id: 12,
            title: "Context API Deep Dive",
            duration: "70 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            completed: false,
            description: "Advanced Context API patterns and optimization"
          },
          {
            id: 13,
            title: "Zustand State Management",
            duration: "60 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            completed: false,
            description: "Modern state management with Zustand"
          },
          {
            id: 14,
            title: "State Management Project",
            duration: "3 hours",
            type: "project",
            completed: false,
            description: "Build a shopping cart with complex state management"
          }
        ]
      },
      {
        id: 5,
        title: "Testing Advanced Components",
        description: "Testing strategies for complex React applications",
        duration: "3 hours",
        subtopics: [
          {
            id: 15,
            title: "Testing Custom Hooks",
            duration: "45 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            completed: false,
            description: "Unit testing custom hooks with React Testing Library"
          },
          {
            id: 16,
            title: "Integration Testing",
            duration: "50 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: false,
            description: "Testing component interactions and user flows"
          },
          {
            id: 17,
            title: "Testing Quiz",
            duration: "25 min",
            type: "quiz",
            completed: false,
            description: "Assess your testing knowledge"
          }
        ]
      },
      {
        id: 6,
        title: "Production Deployment",
        description: "Deploy React applications to production",
        duration: "3 hours",
        subtopics: [
          {
            id: 18,
            title: "Build Optimization",
            duration: "40 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false,
            description: "Optimizing builds for production deployment"
          },
          {
            id: 19,
            title: "CI/CD Pipeline",
            duration: "55 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false,
            description: "Setting up automated deployment pipelines"
          },
          {
            id: 20,
            title: "Final Project",
            duration: "2 hours",
            type: "project",
            completed: false,
            description: "Deploy a complete React application with all optimizations"
          }
        ]
      }
    ]
  },
  
  2: {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Learn the fundamentals of machine learning with hands-on projects.",
    instructor: "Dr. Alex Kumar",
    totalDuration: "36 hours",
    totalLessons: 62,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    topics: [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        description: "Fundamental concepts and types of machine learning",
        duration: "4 hours",
        subtopics: [
          {
            id: 1,
            title: "What is Machine Learning?",
            duration: "30 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: true,
            description: "Introduction to ML concepts and applications"
          },
          {
            id: 2,
            title: "Types of Machine Learning",
            duration: "45 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false,
            description: "Supervised, unsupervised, and reinforcement learning"
          }
        ]
      }
    ]
  },

  3: {
    id: 3,
    title: "React Native Mobile Apps",
    description: "Build cross-platform mobile applications with React Native.",
    instructor: "Michael Rodriguez",
    totalDuration: "48 hours",
    totalLessons: 58,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
    topics: [
      {
        id: 1,
        title: "React Native Basics",
        description: "Getting started with React Native development",
        duration: "6 hours",
        subtopics: [
          {
            id: 1,
            title: "Setting up Development Environment",
            duration: "40 min",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false,
            description: "Install and configure React Native development tools"
          }
        ]
      }
    ]
  }
};
