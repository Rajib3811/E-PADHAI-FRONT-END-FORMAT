import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Globe, 
  Edit3, 
  Save, 
  X,
  Camera,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Target,
  Star
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'www.example.com',
    bio: 'Passionate learner exploring the world of technology and innovation. Always eager to take on new challenges and expand my knowledge.',
    joinedDate: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'January 2024'
  });

  const [stats] = useState({
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 156,
    certificates: 8,
    streak: 23,
    rank: 'Advanced'
  });

  const [achievements] = useState([
    { id: 1, title: 'First Course Completed', description: 'Completed your first course', icon: BookOpen, color: 'text-blue-400' },
    { id: 2, title: 'Speed Learner', description: 'Completed 5 courses in a month', icon: TrendingUp, color: 'text-green-400' },
    { id: 3, title: 'Consistent Learner', description: '30-day learning streak', icon: Target, color: 'text-purple-400' },
    { id: 4, title: 'Top Performer', description: 'Scored 95%+ in 3 courses', icon: Star, color: 'text-yellow-400' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'www.example.com',
      bio: 'Passionate learner exploring the world of technology and innovation. Always eager to take on new challenges and expand my knowledge.',
      joinedDate: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'January 2024'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-cyan-500/30"
              />
              <motion.button
                className="absolute bottom-2 right-2 p-2 bg-cyan-500 rounded-full text-white hover:bg-cyan-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                  <p className="text-cyan-400 font-medium">{stats.rank} Learner</p>
                </div>
                <motion.button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span className="text-white">Edit Profile</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Joined {profileData.joinedDate}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{stats.certificates} Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Personal Information */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                {isEditing && (
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/30 rounded-lg">
                      <User className="w-5 h-5 text-cyan-400" />
                      <span className="text-white">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/30 rounded-lg">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-400">{profileData.email}</span>
                    <span className="text-xs bg-slate-600 px-2 py-1 rounded text-gray-300">Verified</span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/30 rounded-lg">
                      <Phone className="w-5 h-5 text-cyan-400" />
                      <span className="text-white">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-white">{profileData.location}</span>
                    </div>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/30 rounded-lg">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">{profileData.website}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 rounded-lg">
                      <p className="text-white leading-relaxed">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className={`p-2 rounded-lg bg-slate-600/50 ${achievement.color}`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{achievement.title}</h3>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Learning Stats */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Learning Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    <span className="text-white">Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{stats.coursesCompleted}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-white">In Progress</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{stats.coursesInProgress}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Total Hours</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{stats.totalHours}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-orange-400" />
                    <span className="text-white">Day Streak</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-400">{stats.streak}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Continue Learning</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-medium hover:bg-slate-600/50 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Award className="w-5 h-5" />
                  <span>View Certificates</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-medium hover:bg-slate-600/50 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Learning Progress</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
