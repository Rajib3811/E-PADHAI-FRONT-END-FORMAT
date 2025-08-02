import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

const CategoryGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from our diverse range of course categories and start your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/courses?category=${category.id}`}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div
                className={`relative bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 opacity-0 animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {category.description}
                  </p>
                  
                  {/* Technology Preview */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-cyan-400">Popular Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full border border-slate-600/50 group-hover:border-cyan-500/30 transition-colors duration-300"
                        >
                          {tech.icon} {tech.name}
                        </span>
                      ))}
                      {category.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-slate-700/50 text-gray-400 text-xs rounded-full border border-slate-600/50">
                          +{category.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Course Count */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {category.technologies.reduce((sum, tech) => sum + tech.courses, 0)} courses
                    </span>
                    <div className="flex items-center space-x-1 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Technology Tooltip */}
                {hoveredCategory === category.id && (
                  <div className="absolute top-4 right-4 w-64 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-2xl animate-fade-in z-10">
                    <h4 className="text-white font-bold mb-3">All Technologies</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {category.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center space-x-2 text-sm">
                          <span>{tech.icon}</span>
                          <div>
                            <div className="text-gray-300">{tech.name}</div>
                            <div className="text-cyan-400 text-xs">{tech.courses} courses</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span>View All Courses</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
