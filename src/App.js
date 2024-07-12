import { useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

const menuItems = [
  { label: "Home", link: "/" },
  { label: "Upload Segment", link: "/upload" },
  { label: "Download Segment", link: "/download" },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize to false initially

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          menuItems={menuItems}
        />
        <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
          {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        </main>
      </div>
    </div>
  );
}

export default App;
