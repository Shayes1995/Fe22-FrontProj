import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/ContextProvider';
import './ConfirmApplication.css'
import { Application, Apartement } from '../../typescriptHelpers/apartements';
import { useNavigate } from 'react-router-dom';

const ConfirmApplication: React.FC = () => {
  const { application, fetchApplication, user } = useAuth();
  const { id } = useParams<{ id: string }>(); // this will get 'id' 
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id && !application) {
      fetchApplication(id);
    }
  }, [id, application, fetchApplication]);

  const handleDotClick = (index: any) => {
    setActiveImageIndex(index);
  };

  return (
    <div className='confirm-application-container'>
      <div className="confirm-application">
        <h1>Grattis {user?.firstName}!</h1>
        <p>Din ansökan har blivit godkänd! Kontrollera informationen nedan noggrant innan du tackar ja till bostaden. Det är viktigt att all information stämmer och att du känner till alla villkor och krav innan du fortsätter.</p>
      </div>
      <div className="container-for-specific-application">
        <div className='card-big-screen'>
          {application?.apartement && (
            <div className='card-specific-application'>
              <div className="application-carousel-container">
                {application.apartement.imgURL.map((img, index) => (
                  <div key={img.name} className={`application-carousel-slide ${index === activeImageIndex ? 'active-slide' : ''}`}>
                    <img className='image-app-approve' src={img.url} alt={img.name} />
                    {index === activeImageIndex && (
                      <div className="application-carousel-dots">
                        {application.apartement.imgURL.map((_, dotIndex) => (
                          <span key={dotIndex} onClick={() => handleDotClick(dotIndex)} className={dotIndex === activeImageIndex ? 'active-dot' : ''}></span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p>{application.apartement.street}, {application.apartement.zipcode}</p>
              <p>Hyresvärd: BRF Lingon</p>
            </div>
          )}


        </div>
        <div className='terms-application-specific'>
          <p className='demand-p'>Viktiga krav och villkor från hyresföreningen:</p>
          <ol className='ordered-list'>
            <li className='li-demands'><span>Deposition:</span> En deposition om 5 000 kr måste betalas inom 7 dagar från acceptdatumet. Denna summa återbetalas när du flyttar ut, förutsatt att bostaden lämnas i ursprungligt skick.</li>
            <li className='li-demands'><span>Husdjur:</span> Husdjur är tillåtna, men en särskild avgift om 200 kr/månad tillkommer.</li>
            <li className='li-demands'><span>Rökning:</span> Rökning är strikt förbjuden inom bostadens område, inklusive balkonger och gemensamma utrymmen.</li>
            <li className='li-demands'><span>Inflyttningsdatum:</span> Om inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet första vardagen på kommande vecka. Var god se till att koordinera med fastighetsskötaren för att undvika kollisioner.</li>
            <li className='li-demands'><span>Uppsägningstid:</span> Uppsägningstiden är tre månader från och med den första i nästa månad efter att uppsägning har gjorts.</li>
          </ol>
          <p className='p-mobile-remove'>Vänligen läs igenom alla villkor noga. Om du har några frågor eller funderingar, kontakta hyresföreningen innan du tackar ja.</p>
          {application?.apartement && (
            <div className="carousel-card">
              <div className="carousel-top">
                <div className="confirm-carousel">
                  {application.apartement.imgURL.map((img, index) => (
                    <div key={img.name} className={`confirm-carousel-slide ${index === activeImageIndex ? 'active' : ''}`}>
                      <img src={img.url} alt={img.name} />
                      <div className="confirm-carousel-dots">
                        {application.apartement.imgURL.map((_, dotIndex) => (
                          <span key={dotIndex} onClick={() => handleDotClick(dotIndex)} className={dotIndex === activeImageIndex ? 'active-dot' : ''}></span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-bottom">
                <div className='quick-info-display'>
                  <div className='quick-info-display-container'>
                    <h3 className='left-side-h3'>{application.apartement.street}</h3>
                    <p className='p-small-info'>{application.apartement.rent}kr/månad</p>
                    <p className='p-small-info'>{application.apartement.rooms} RoK</p>
                  </div>
                  <div className='quick-info-display-container right-align-container'>
                    <h3 className='right-side-h3'>{application.apartement.area}</h3>
                    <p className='p-small-info'>BRF Lingon</p>
                    <p className='p-small-info'>{application.apartement.size}</p>
                  </div>
                </div>
              </div>
            </div>
          )}


          <div className="button-container">
            <button className='application-term-btn btn-denied-app'>TACKA NEJ</button>
            <button className='application-term-btn btn-go-pay' onClick={() => navigate(`/mina-ansokningar/${id}/betalning/${user}`)}>TILL BETALNING</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ConfirmApplication;