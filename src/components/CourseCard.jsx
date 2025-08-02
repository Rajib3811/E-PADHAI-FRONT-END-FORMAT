import { useState } from 'react';
import { categories } from '../data/categories';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);
  const [showTechnologyTooltip, setShowTechnologyTooltip] = useState(false);

  const discountPercentage = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  const category = categories.find(cat => cat.id === course.categoryId);
  const technology = category?.technologies.find(tech => tech.name === course.technology);

  return (
    <div
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {discountPercentage > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discountPercentage}%
          </div>
        )}
        {course.bestseller && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            Bestseller
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.5 5.5a1 1 0 011.5-.866l5 3a1 1 0 010 1.732l-5 3A1 1 0 018.5 11.5v-6z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <button
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${
                category ? `bg-gradient-to-r ${category.color} text-white` : 'bg-slate-700 text-gray-300'
              }`}
              onMouseEnter={() => setShowCategoryTooltip(true)}
              onMouseLeave={() => setShowCategoryTooltip(false)}
            >
              {category?.icon} {course.category}
            </button>
            
            {/* Category Tooltip */}
            {showCategoryTooltip && category && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 z-20 shadow-2xl animate-fade-in">
                <h4 className="text-white font-bold mb-2">{category.name}</h4>
                <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                <div className="space-y-2">
                  <p className="text-cyan-400 text-xs font-semibold">Technologies:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {category.technologies.slice(0, 4).map((tech, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs text-gray-400">
                        <span>{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1 text-yellow-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-gray-400 text-sm mb-3">by {course.instructor}</p>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Technology Tag with Hover */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative">
            <button
              className="px-2 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setShowTechnologyTooltip(true)}
              onMouseLeave={() => setShowTechnologyTooltip(false)}
            >
              {technology?.icon} {course.technology}
            </button>
            
            {/* Technology Tooltip */}
            {showTechnologyTooltip && technology && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-3 z-20 shadow-2xl animate-fade-in">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{technology.icon}</span>
                  <h4 className="text-white font-bold">{technology.name}</h4>
                </div>
                <p className="text-cyan-400 text-sm">{technology.courses} courses available</p>
              </div>
            )}
          </div>
          
          {course.tags.slice(1, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700/50 text-gray-400 text-xs rounded-md border border-slate-600/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration}</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{course.lessons} lessons</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>{course.students.toLocaleString()}</span>
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-cyan-400">${course.price}</span>
            {course.originalPrice > course.price && (
              <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
            Enroll Now
          </button>
        </div>

        {/* Certificate Badge */}
        {course.certificate && (
          <div className="mt-3 flex items-center space-x-1 text-xs text-yellow-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Certificate included</span>
          </div>
        )}
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default CourseCard;
