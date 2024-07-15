import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
// import Upload from "./components/segments/Upload";
// import Download from "./components/segments/Download";
import Profile from "./components/Profile"; // Import Profile component

const menuItems = [
  { label: "Dashboard", link: "/dashboard" },
  // { label: "Upload Segment", link: "/upload" },
  // { label: "Download Segment", link: "/download" },
];

function AppRoutes({ isLoggedIn, setIsLoggedIn, activeMenuItem, setActiveMenuItem }) {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.link === currentPath);
    if (currentItem) {
      setActiveMenuItem(currentItem.label);
    } else if (currentPath === '/') {
      setActiveMenuItem('Dashboard'); // Or any default you prefer
    }
  }, [location, setActiveMenuItem]);

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setActiveMenuItem={setActiveMenuItem} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          {/* <Route path="/download" element={<Download />} /> */}
          <Route path="/profile" element={<Profile />} /> 
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]?.label || "Dashboard");

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
        <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
