export const purchasedCourses = [
  {
    id: 1,
    courseId: 1,
    title: "Advanced React Development",
    instructor: "Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    progress: 35,
    status: "in_progress", // not_started, in_progress, completed
    completedLessons: 7,
    totalLessons: 45,
    duration: "24 hours",
    rating: 4.8,
    purchaseDate: "2024-01-15",
    lastAccessed: "2024-01-28",
    estimatedTimeLeft: "16 hours",
    currentLesson: {
      id: 3,
      title: "Props and Context",
      topic: "React Fundamentals Review"
    },
    certificateEarned: false,
    recentActivities: [
      { type: "lesson_completed", lesson: "State Management Basics", date: "2024-01-28" },
      { type: "quiz_completed", quiz: "Fundamentals Quiz", score: 85, date: "2024-01-27" },
      { type: "lesson_completed", lesson: "Component Lifecycle", date: "2024-01-26" }
    ]
  },
  {
    id: 2,
    courseId: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Alex Kumar",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    progress: 15,
    status: "in_progress",
    completedLessons: 3,
    totalLessons: 62,
    duration: "36 hours",
    rating: 4.9,
    purchaseDate: "2024-01-20",
    lastAccessed: "2024-01-29",
    estimatedTimeLeft: "31 hours",
    currentLesson: {
      id: 2,
      title: "Types of Machine Learning",
      topic: "Introduction to Machine Learning"
    },
    certificateEarned: false,
    recentActivities: [
      { type: "lesson_completed", lesson: "What is Machine Learning?", date: "2024-01-29" },
      { type: "course_started", date: "2024-01-20" }
    ]
  },
  {
    id: 3,
    courseId: 3,
    title: "React Native Mobile Apps",
    instructor: "Michael Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    progress: 0,
    status: "not_started",
    completedLessons: 0,
    totalLessons: 58,
    duration: "48 hours",
    rating: 4.7,
    purchaseDate: "2024-01-25",
    lastAccessed: null,
    estimatedTimeLeft: "48 hours",
    currentLesson: null,
    certificateEarned: false,
    recentActivities: [
      { type: "course_purchased", date: "2024-01-25" }
    ]
  }
];
