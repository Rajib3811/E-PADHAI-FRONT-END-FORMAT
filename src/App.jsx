
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CourseOverview from './pages/CourseOverview';
import CourseLearning from './pages/CourseLearning';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  // This is the main application component that sets up the routing and context providers.
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/course/:courseId" element={
            <ProtectedRoute>
              <CourseOverview />
            </ProtectedRoute>
          } />
          <Route path="/learn/:courseId" element={
            <ProtectedRoute>
              <CourseLearning />
            </ProtectedRoute>
          } />
          <Route path="/learn/:courseId/lesson/:lessonId" element={
            <ProtectedRoute>
              <CourseLearning />
            </ProtectedRoute>
          } />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
