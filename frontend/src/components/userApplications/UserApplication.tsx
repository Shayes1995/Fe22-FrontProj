import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ContextProvider';
import { Apartement, Application } from '../../typescriptHelpers/apartements';
import { useNavigate } from 'react-router';
import './UserApplication.css'
import { NavLink } from 'react-router-dom';




const UserApplication = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const navigate = useNavigate();
  const { setApplication } = useAuth();


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
          setApplications(data.applications);
        })
        .catch(error => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [token]);

  const switchCaseStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Obehandlad';
      case 'approved':
        return 'Godkänd';
      case 'rejected':
        return 'Avslagen';
    }
  }

  const handleNavigateToPayment = (applicationItem: any) => {
    setApplication(applicationItem);
    navigate(`/mina-ansokningar/${applicationItem._id}/`); 
  };


  const deleteApplication = async (id: string) => {


    try {
      const response = await fetch(`http://localhost:9998/api/application/delete-application/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });


      // if the delete was done, filter out the deleted application
      setApplications(currentApplications =>
        currentApplications.filter(application => application._id !== id)
      );
      console.log(response)

    } catch (error) {
      console.error('Error deleting the application:', error);

    }
  }







  return (
    <div className="user-applications-container">
      <div className="intro-user-applications">
        <h1>Mina ansökningar</h1>
        <p>Välkommen till översikten av dina lägenhetsansökningar.  Här kan du enkelt hålla koll på alla de bostäder du har visat intresse för.  För varje ansökan kan du se aktuell status, vilket ger dig en tydlig uppfattning om var i processen din ansökan befinner sig.  Vi uppdaterar informationen löpande så att du alltid har den senaste informationen till hands.</p>
      </div>
      <div className="applications-render-container">
        {applications && applications.length > 0 ? (
          applications.map((applicationItem) => {
            const imgOne = applicationItem.apartement.imgURL.find(image => image.name === 'imgOne');

            return (
              <div key={applicationItem._id} className="application-item">
                {imgOne && (
                  <div className="image-container-my-app">
                    <img src={imgOne.url} alt="Apartement View" />
                  </div>
                )}

                <div className="info-container-my-app">
                  <div className="info-my-app-left">

                    <section className='section-residental'>
                      <p className='residental-name-my-app-short'>{applicationItem.apartement.street}</p>
                      <p className='residental-name-my-app-short'>{applicationItem.apartement.zipcode}</p>
                      <p className='residental-name-my-app-short'>{applicationItem.apartement.area}</p>
                    </section>
                  </div>
                  <div className="info-my-app-right">
                    {applicationItem.status === 'pending' && (
                      <>
                        <div className="status-group">
                          <span className='circle-span-status pending-status'></span>
                          <p className="status-my-app">{switchCaseStatus(applicationItem.status)}</p>
                        </div>
                        <button className='my-app-btn' onClick={() => deleteApplication(applicationItem._id)}>Ta Bort</button>
                      </>
                    )}
                    {applicationItem.status === 'approved' && (
                      <>
                        <div className="status-group">
                          <span className='circle-span-status approved-status'></span>
                          <p className="status-my-app">{switchCaseStatus(applicationItem.status)}</p>
                        </div>
                        <button
                          className='my-app-btn'
                          onClick={() => handleNavigateToPayment(applicationItem)}>
                          Gå Vidare
                        </button>
                      </>
                    )}
                    {applicationItem.status === 'rejected' && (
                      <>
                        <div className="status-group">
                          <span className='circle-span-status rejected-status'></span>
                          <p className="status-my-app">{switchCaseStatus(applicationItem.status)}</p>
                        </div>
                        <button className='my-app-btn' onClick={() => deleteApplication(applicationItem._id)}>Ta Bort</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Du har inte gjort någon ansökan ännu klicka <li>
            <NavLink to='/'>här för att komma till våra bostäder</NavLink>
          </li>

          </h2>
        )}
      </div>
    </div>
  );
}

export default UserApplication;
