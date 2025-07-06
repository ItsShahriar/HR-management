import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getBaseUrl } from "../utils/baseURL";

const ProfileCard = () => {
  // Sample data, you can replace with dynamic values later
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const token = localStorage.getItem("user");
              console.log(token)
              
              
              // Retrieve the JWT token from local storage
              const response = await axios.get(
                `${getBaseUrl()}/api/user/profile/`,
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                  },
                }
              );
              setProfile(response.data);
          } catch (err) {
              setError('Failed to fetch profile');
              console.error(err);
          }
      };

      fetchProfile();
  }, []);

  if (error) {
      return <div>{error}</div>;
  }

  if (!profile) {
      return <div>Loading...</div>;
  }
  return (
    <section className="content py-6">
    <section className="container mx-auto">
      {/* Back Link */}
      

      {/* Profile Section */}
      <section className="row mt-6">
        <section className="col col-lg-12 text-center">
          <h3>
            <span className="employee-name-title">User Name - {profile.username}</span>
          </h3>
        </section>
        <section className="col col-lg-12 text-center">
          <h3>
            <span className="employee-name-title">Email - {profile.email}</span>
          </h3>
        </section>
      </section>

    
    </section>
  </section>
  );
};

export default ProfileCard;
