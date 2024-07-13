import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Upload from "./components/segments/Upload";
import Download from "./components/segments/Download";
import Profile from "./components/Profile"; // Import Profile component

const menuItems = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Upload Segment", link: "/upload" },
  { label: "Download Segment", link: "/download" },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setActiveMenuItem={setActiveMenuItem} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/download" element={<Download />} />
                <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
