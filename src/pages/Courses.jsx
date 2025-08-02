import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { categories, extendedCourses } from '../data/categories';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredCourses, setFilteredCourses] = useState(extendedCourses);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique technologies from selected category
  const availableTechnologies = selectedCategory === 'all' 
    ? categories.flatMap(cat => cat.technologies)
    : categories.find(cat => cat.id === parseInt(selectedCategory))?.technologies || [];

  useEffect(() => {
    let filtered = [...extendedCourses];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.categoryId === parseInt(selectedCategory));
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Filter by technology
    if (selectedTechnology !== 'all') {
      filtered = filtered.filter(course => course.technology === selectedTechnology);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, selectedLevel, selectedTechnology, searchTerm, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedTechnology('all');
    setSearchTerm('');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Explore All Courses
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover thousands of courses across multiple categories. Learn from industry experts and advance your career.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search courses, instructors, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full mb-4 px-4 py-3 bg-slate-800 text-white rounded-xl border border-slate-700 flex items-center justify-between"
              >
                <span>Filters</span>
                <svg className={`w-5 h-5 transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Filter Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-300"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-cyan-500 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">All Categories</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id.toString()}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-cyan-500 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {category.icon} {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technology Filter */}
                {availableTechnologies.length > 0 && (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                    <h4 className="text-lg font-semibold text-white mb-3">Technology</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="technology"
                          value="all"
                          checked={selectedTechnology === 'all'}
                          onChange={(e) => setSelectedTechnology(e.target.value)}
                          className="w-4 h-4 text-cyan-500 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">All Technologies</span>
                      </label>
                      {availableTechnologies.slice(0, 8).map((tech) => (
                        <label key={tech.name} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="technology"
                            value={tech.name}
                            checked={selectedTechnology === tech.name}
                            onChange={(e) => setSelectedTechnology(e.target.value)}
                            className="w-4 h-4 text-cyan-500 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                          />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {tech.icon} {tech.name} ({tech.courses})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Level Filter */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Level</h4>
                  <div className="space-y-2">
                    {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <label key={level} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={selectedLevel === level}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="w-4 h-4 text-cyan-500 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {level === 'all' ? 'All Levels' : level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-gray-400">
                  {selectedCategory !== 'all' && `in ${categories.find(cat => cat.id === parseInt(selectedCategory))?.name}`}
                  {selectedLevel !== 'all' && ` • ${selectedLevel} level`}
                  {selectedTechnology !== 'all' && ` • ${selectedTechnology}`}
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-3">
                <label className="text-gray-400 text-sm font-medium">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors duration-300"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-3xl font-bold text-gray-400 mb-4">No courses found</h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your filters or search terms to find the perfect course for you.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button (if needed for pagination) */}
            {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  Load More Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
