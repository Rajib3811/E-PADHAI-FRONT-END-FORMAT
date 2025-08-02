import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Clock, Award, TrendingUp, Book, CheckCircle2 } from 'lucide-react';
import { purchasedCourses } from '../data/purchasedCourses';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('my-courses');

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in_progress':
        return 'from-cyan-500 to-blue-500';
      case 'not_started':
        return 'from-gray-500 to-slate-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'not_started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const stats = {
    totalCourses: purchasedCourses.length,
    completedCourses: purchasedCourses.filter(c => c.status === 'completed').length,
    inProgressCourses: purchasedCourses.filter(c => c.status === 'in_progress').length,
    totalHours: purchasedCourses.reduce((acc, course) => {
      const hours = parseInt(course.duration.split(' ')[0]);
      return acc + hours;
    }, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm py-12 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Learning Dashboard
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Continue your journey to mastery
            </p>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg mx-auto mb-3">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.totalCourses}</div>
                <div className="text-sm text-gray-400">Total Courses</div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.completedCourses}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.inProgressCourses}</div>
                <div className="text-sm text-gray-400">In Progress</div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.totalHours}h</div>
                <div className="text-sm text-gray-400">Total Hours</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('my-courses')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'my-courses'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Achievements
          </button>
        </div>

        {/* Courses Grid */}
        {activeTab === 'my-courses' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {purchasedCourses.map((course) => (
              <motion.div
                key={course.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  
                  {/* Progress Bar Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-900/50">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${getStatusColor(course.status)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/learn/${course.courseId}`}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      <Play className="w-6 h-6 text-white ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm">by {course.instructor}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(course.status)} text-white`}>
                      {getStatusText(course.status)}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold text-cyan-400">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div 
                        className={`h-2 bg-gradient-to-r ${getStatusColor(course.status)} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                      ></motion.div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      {course.estimatedTimeLeft && (
                        <span>{course.estimatedTimeLeft} left</span>
                      )}
                    </div>
                  </div>

                  {/* Current Lesson */}
                  {course.currentLesson && (
                    <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="text-xs text-cyan-400 font-medium mb-1">CONTINUE LEARNING</div>
                      <div className="text-sm font-medium text-white">{course.currentLesson.title}</div>
                      <div className="text-xs text-gray-400">{course.currentLesson.topic}</div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/course/${course.courseId}`}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg text-center transition-colors duration-300"
                    >
                      View Details
                    </Link>
                    
                    <Link
                      to={`/learn/${course.courseId}`}
                      className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium rounded-lg text-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                      {course.status === 'not_started' ? 'Start Learning' : 
                       course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                    </Link>
                    
                    <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors duration-300">
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Achievements Coming Soon</h3>
            <p className="text-gray-500">Your learning achievements and certificates will be displayed here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
