import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ContextProvider';

interface Application {
  _id: string;
  applications: {
    apartment: string;
    user: string;
    status: string;
    _id: string;
  }[];
  __v: number;
}

const UserApplication = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:9998/api/application/all-applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Fetched applications:", data); 
          if (data && data.applications) {
            setApplications(data.applications);
          }
        })
        .catch(error => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [token]);

  return (
    <div>
      <h1>Applications</h1>
      {applications.map((application, index) => (
        <h1 key={application._id}>Application ID: {application._id}</h1>
      ))}
    </div>
  );
}

export default UserApplication;
