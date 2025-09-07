import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Action from './components/Action';
import Footer from './components/Footer';
import AddReminder from './components/AddRemainder';
import Reminder from './components/Remainder';
import MedicineSearch from './components/openai';
import LoginPage from './components/login';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './components/signup';
import { useState } from 'react';
import DetailWrapper from './components/DetailWrapper';
import MedicineList from './components/MedicineList ';
import PatientReportUpload from './components/PatientReportUpload';
import AboutApp from './components/AboutApp';
import Settings from './components/Settings';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {!isLoginPage && !isSignupPage && (
        <NavBar onToggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
      )}

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Action />
              <DetailWrapper/>
            </>
          } />
          
          <Route path="/add" element={
            <ProtectedRoute>
              <AddReminder />
            </ProtectedRoute>
          } />
          
          <Route path="/reminders" element={<Reminder />} />
          <Route path="/medicine-cabinet" element={<MedicineList />} />
          <Route path="/reports" element={<PatientReportUpload />} />
          <Route path="/medicine-detail" element={<MedicineSearch />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutApp/>} />
           <Route path="/settings" element={<Settings/>} />

        </Routes>
      </main>

      {/* Footer */}
      {!isLoginPage && !isSignupPage && <Footer />}
    </div>
  );
}

export default App;