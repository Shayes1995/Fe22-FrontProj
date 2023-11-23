import { useState, useEffect } from 'react'
import './ConfirmApartement.css'
import { useLocation } from 'react-router'
import { Apartement } from '../../typescriptHelpers/apartements'
import { useNavigate } from 'react-router'
import LoaderSpinner from '../loader/LoadSpinner';

const ConfirmApartement = () => {
  const location = useLocation();
  const apartement = location.state?.apartment;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const navigateHome = () => {
    navigate('/')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }




  return (
    <div className='confirm-apartement-container'>
      <div className="confirmed-apartement-hero"></div>
      <div className="confirmed-content">
        <div className="left-confirmed">
          <div className="confirmed-carousel-container">
            {apartement && apartement.imgURL.map((img: Apartement['imgURL'][number], index: number) => (
              <div key={img.name} className={`confirm-carousel-slide ${index === activeImageIndex ? 'active' : ''}`}>
                <img src={img.url} alt={img.name} />
                <div className="confirm-carousel-dots">
                  {apartement.imgURL.map((_: any, dotIndex: number) => (
                    <span key={dotIndex} onClick={() => handleDotClick(dotIndex)} className={dotIndex === activeImageIndex ? 'active-dot' : ''}></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="content-confirm">
            <h2>{apartement.street}, {apartement.zipcode}</h2>
            <h2>Hyresvärd: {apartement.landLord}</h2>
            <section className='section-confirm'>
              <p>{apartement.size}</p>
              <p>{apartement.rooms} RoK</p>
              <p>{apartement.rent}kr/månad</p>
              <p>{apartement.area}</p>
            </section>
          </div>
        </div>
        <div className="right-confirmed">
          <h1>Grattis! Här är ditt nya boende.</h1>
          <p>Säkerställ noggrant att all information nedan är korrekt innan du bekräftar din bostad. Vi önskar dig all lycka med ditt nya boende och dina studier!</p>
          <div className="btn-container-confirmed">
            <button className='btn-confirmed' onClick={navigateHome}>Startsida</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmApartement