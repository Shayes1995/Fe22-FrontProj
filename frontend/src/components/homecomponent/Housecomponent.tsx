import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react';
import './Housecomponent.css';
import houseLogo from '../img/imgHome/House.png'
import bigHouseLogo from '../img/imgHome/Groupbighouse.png'
import doorLogo from '../img/imgHome/Door.png'
import filterLogo from '../img/imgHome/Filter.png'
import collectiveLogo from '../img/imgHome/Collective.png'
import { Apartement } from '../../typescriptHelpers/apartements';
import { NavLink } from 'react-router-dom';

const Housecomponent = () => {
  const [apartements, setApartements] = useState<Apartement[]>([]);
  const [activeImageName, setActiveImageName] = useState<{ [key: string]: string }>({});


  useEffect(() => {
    fetch('http://localhost:9998/api/apartement')
      .then(response => response.json())
      .then(data => {
        setApartements(data);
        console.log(data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleDotClick = (apartementId: string, imageName: string) => {
    setActiveImageName(prevState => ({ ...prevState, [apartementId]: imageName }));
  };


  return (
    <div className='home-column'>
      <div className="home-imgBanner">
        <div className="img-home-container">
          <h1>Hitta din nya studentbostad</h1>
          <h1>Ansök idag</h1>
        </div>
      </div>
      <div className="box-row">
        <div className="box-filter">

          <img className='image-logs' src={houseLogo} alt="" />
          <p>Hus</p>
        </div>

        <div className="box-filter">
          <img className='image-logs' src={bigHouseLogo} alt="" />
          <p>Lägenhet</p>
        </div>
        <div className="box-filter">
          <img className='image-logs' src={doorLogo} alt="" />
          <p>Rum</p>
        </div>
        <div className="box-filter">
          <img className='image-logs' src={collectiveLogo} alt="" />
          <p>Kollektivt</p>
        </div>
        <div className="box-filter">
          <img className='image-logs' src={filterLogo} alt="" />
          <p>Filter</p>
        </div>
      </div>
      <div className="house-listing">
        {apartements.map((apartement) => (
          <div key={apartement._id} className="apartement-item">
            <div className="apartement-images">
              <NavLink to={`/${apartement._id}`}>
                {apartement.imgURL.filter(img => img.name === (activeImageName[apartement._id] || 'imgOne')).map(img => (
                  <div key={img.name} className="apartement-image">
                    <img src={img.url} alt={img.name} />
                    <div className="carousel-dots">
                      <span onClick={() => handleDotClick(apartement._id, 'imgOne')} className={activeImageName[apartement._id] === 'imgOne' ? 'active-dot' : ''}></span>
                      <span onClick={() => handleDotClick(apartement._id, 'imgTwo')} className={activeImageName[apartement._id] === 'imgTwo' ? 'active-dot' : ''}></span>
                      <span onClick={() => handleDotClick(apartement._id, 'imgThree')} className={activeImageName[apartement._id] === 'imgThree' ? 'active-dot' : ''}></span>
                      <span onClick={() => handleDotClick(apartement._id, 'imgFour')} className={activeImageName[apartement._id] === 'imgFour' ? 'active-dot' : ''}></span>
                      <span onClick={() => handleDotClick(apartement._id, 'imgFive')} className={activeImageName[apartement._id] === 'imgFive' ? 'active-dot' : ''}></span>
                    </div>
                  </div>
                ))}
              </NavLink>
            </div>
            <h3>{apartement.street}, {apartement.zipcode}</h3>
            <p>{apartement.area}</p>
            <p>{apartement.rent}kr/månad</p>
            <p>{apartement.rooms} RoK</p>
          </div>
        ))}
      </div>



    </div>
  );
}

export default Housecomponent