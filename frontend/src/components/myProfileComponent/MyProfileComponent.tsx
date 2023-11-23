import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/ContextProvider';
import { Payment, Apartement, Residents } from '../../typescriptHelpers/apartements';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from '../loader/LoadSpinner';
import './MyProfileComponent.css';
import userLogo from '../img/imageConfirmApartement/userIcon.png'

const MyProfileComponent = () => {

  const { application, fetchApplication, user, userInfo, token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [residents, setResidents] = useState<Residents[]>([])
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      fetch('http://localhost:9998/api/payment/my-payment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Fetched payments:", data);
          setPayments(data.payments || []);
          setResidents(data.residents || []);
          setIsLoading(false);
        })

        .catch(error => {
          console.error("Error fetching payments:", error);
          setIsLoading(false);
        });
    }
  }, [token]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(userInfo?.createdDate);
  // const paymentDate = formatDate(payments[0]?.createdDate);



  return (
    <div className="my-profile-container">
      {isLoading ? (
        <LoadSpinner />
      ) : (


        <div className="my-profile-content">
          <h1>Min Profil</h1>
          <p className='content-p-tag-profile'>Här kan du se en översikt av din profil och eventuell lägenhet som du hyr ut samt dina senaste betalningar.</p>
          <div className="profile-info-container">
            <div className="left-profile-info">
              <div className="imageContainer">
                <img src={userLogo} alt="" />
              </div>
              <button className='empty-btn'>Redigera bild</button>
            </div>
            <div className="right-profile-info">
              <div className="right-container">
                <div className="left-box-info">
                  <div className="info-group">
                    <label>Förnamn</label>
                    <input type="text" value={userInfo?.firstName || ''} readOnly />
                  </div>
                  <div className="info-group">
                    <label>Efternamn</label>
                    <input type="text" value={userInfo?.lastName || ''} readOnly />
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <input type="text" value={userInfo?.email || ''} readOnly />
                  </div>
                </div>

                <div className="right-box-info">
                  <div className="info-group">
                    <label>Telefon</label>
                    <input type="text" />
                  </div>
                  <div className="info-group">
                    <label>Adress</label>
                    <input type="text" />
                  </div>
                  <div className="info-group member">
                    <label>Medlem sedan:</label>
                    <p className='date-member'>{formattedDate}</p>
                  </div>
                  <div className="btn-container">
                    <button className='empty-btn'>Uppdatera</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="resident-render-container">
            <h2 className=''>Din bostad:</h2>
            {residents && residents.length > 0 ? (
              residents.map((resident) => (
                <div key={resident._id} className="resident-item">
                  <div className="resident-details">
                    <div className="left-side-resident">
                      <div className="resident-group">
                        <span>Objektnummer:</span>
                        <p>{resident.apartement._id}</p>
                      </div>
                      <div className="resident-group">
                        <span>Adress:</span>
                        <p>{resident.apartement.street}</p>
                      </div>
                      <div className="resident-group">
                        <span>Postnummer:</span>
                        <p>{resident.apartement.zipcode}</p>
                      </div>
                      <div className="resident-group">
                        <span>Ort:</span>
                        <p>{resident.apartement.area}</p>
                      </div>
                    </div>
                    <div className="right-side-resident">
                      <div className="resident-group">
                        <span>Antal rum:</span>
                        <p>{resident.apartement.rooms} RoK</p>
                      </div>
                      <div className="resident-group">
                        <span>Storlek:</span>
                        <p>{resident.apartement.size}</p>
                      </div>
                      <div className="resident-group">
                        <span>Inflyttning:</span>
                        <p>{resident.apartement.available}</p>
                      </div>
                      <div className="resident-group">
                        <span>Kontrakt:</span>
                        <p>{resident.apartement.period}</p>
                      </div>
                    </div>
                  </div>
                  <div className="btn-container-resident">
                    <button className='btn-delete-resident'>Säg upp lägenheten</button>
                  </div>
                </div>
              ))
            ) : (
              <h2>Du har ännu ingen bostad hos oss</h2>
            )}
          </div>

        </div>



      )}
    </div>
  )
}

export default MyProfileComponent