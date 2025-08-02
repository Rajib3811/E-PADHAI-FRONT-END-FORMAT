import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  Star,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { courseContent } from '../data/courseContent';
import { purchasedCourses } from '../data/purchasedCourses';

const CourseOverview = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const course = courseContent[courseId];
  const purchasedCourse = purchasedCourses.find(c => c.courseId === parseInt(courseId));
  
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    );
  }

  const calculateProgress = () => {
    const totalSubtopics = course.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
    const completedSubtopics = course.topics.reduce((acc, topic) => 
      acc + topic.subtopics.filter(subtopic => subtopic.completed).length, 0
    );
    return totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
  };

  const getNextLesson = () => {
    for (const topic of course.topics) {
      const nextSubtopic = topic.subtopics.find(subtopic => !subtopic.completed && subtopic.type === 'video');
      if (nextSubtopic) {
        return { topic, subtopic: nextSubtopic };
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const progress = calculateProgress();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-gray-400 mb-6">
                <span className="flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>{course.instructor}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.totalDuration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.totalLessons} lessons</span>
                </span>
                {purchasedCourse && (
                  <span className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span>{purchasedCourse.rating}</span>
                  </span>
                )}
              </div>
              
              {/* Progress Bar */}
              {purchasedCourse && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Your Progress</span>
                    <span className="text-cyan-400 font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <motion.div 
                      className="h-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                {nextLesson ? (
                  <Link
                    to={`/learn/${courseId}/lesson/${nextLesson.subtopic.id}`}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    {progress === 0 ? 'Start Learning' : 'Continue Learning'}
                  </Link>
                ) : (
                  <Link
                    to={`/learn/${courseId}`}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Review Course
                  </Link>
                )}
                
                <Link
                  to={`/learn/${courseId}`}
                  className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  Course Player
                </Link>
              </div>
            </div>

            {/* Course Thumbnail */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    to={`/learn/${courseId}`}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                  >
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-xl mb-8">
          {[
            { key: 'overview', label: 'Course Overview' },
            { key: 'curriculum', label: 'Curriculum' },
            { key: 'instructor', label: 'Instructor' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'curriculum' && (
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {course.topics.map((topic, topicIndex) => (
                <motion.div 
                  key={topic.id} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{topicIndex + 1}. {topic.title}</h3>
                        <p className="text-gray-400">{topic.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-semibold">{topic.duration}</div>
                        <div className="text-sm text-gray-500">{topic.subtopics.length} lessons</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <div key={subtopic.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            {subtopic.type === 'video' && (
                              <Play className="w-5 h-5 text-cyan-400" />
                            )}
                            {subtopic.type === 'quiz' && (
                              <Award className="w-5 h-5 text-yellow-400" />
                            )}
                            {subtopic.type === 'project' && (
                              <BookOpen className="w-5 h-5 text-green-400" />
                            )}
                            <span className="text-white">{subtopicIndex + 1}. {subtopic.title}</span>
                            {subtopic.completed && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <span className="text-gray-400 text-sm">{subtopic.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Master advanced React patterns and best practices</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Build scalable and maintainable React applications</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Optimize React performance for production</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Implement comprehensive testing strategies</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Course Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{course.topics.length}</div>
                    <div className="text-sm text-gray-400">Topics</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{course.totalLessons}</div>
                    <div className="text-sm text-gray-400">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {course.topics.reduce((acc, topic) => acc + topic.subtopics.filter(s => s.type === 'project').length, 0)}
                    </div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {course.topics.reduce((acc, topic) => acc + topic.subtopics.filter(s => s.type === 'quiz').length, 0)}
                    </div>
                    <div className="text-sm text-gray-400">Quizzes</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'instructor' && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-6xl mb-4">👨‍💻</div>
              <h3 className="text-2xl font-bold text-white mb-4">{course.instructor}</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Expert instructor with years of experience in React development. 
                Passionate about teaching and helping students master modern web development.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseOverview;
