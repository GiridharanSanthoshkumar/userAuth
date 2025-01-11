import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To redirect if unauthenticated

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://userauthserver-liard.vercel.app/profile", {
          withCredentials: true, // Include session cookie
        });
        setProfileData(response.data.data); // Set profile data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          
            navigate("/login");
          
        } else {
          setErrorMessage("Failed to fetch profile data.");
        }
      }
    };

    fetchProfile();
  }, []);
    
  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await axios.post(
        "https://userauthserver-liard.vercel.app/auth/logout",
        {},
        { withCredentials: true } // Include session cookie
      );
      console.log(response.data.message);

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>User Profile</h2>
      
      {profileData ? (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.usermail}</p>
             <button onClick={handleLogout}>Logout</button>
              </div>
              
      ) : (
        !errorMessage && <p>Loading profile data...</p>
          )}
          
    </div>
  );
};

export default Profile;
