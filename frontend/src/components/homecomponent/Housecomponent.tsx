import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Housecomponent.css';
import searchLogo from '../img/imgHome/search-solid.png'
import { Apartement, BuildingType, QuickFilterType } from '../../typescriptHelpers/apartements';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsDoorOpen } from 'react-icons/bs';
import { BsBuildings } from 'react-icons/bs';
import { PiUsersThreeLight } from 'react-icons/pi';
import { HiAdjustments } from 'react-icons/hi';


const Housecomponent = () => {
  const [apartements, setApartements] = useState<Apartement[]>([]);
  const [activeImageName, setActiveImageName] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false)
  const [amountRooms, setAmountRooms] = useState<string | null>(null);
  const [apartementTypeBuilding, setApartementTypeBuilding] = useState<string | null>(null);
  const [whatIncludes, setWhatIncludes] = useState<string[]>([]);
  const [searchArea, setSearchArea] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filteredApartments, setFilteredApartments] = useState<Apartement[]>([]);
  const [quickFilterType, setQuickFilterType] = useState<BuildingType | null>(null);


  const roomCounts = [null, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const apartmentTypes = [
    { type: "unitApartement", label: "Lägenhet" },
    { type: "unitHouse", label: "Hus" },
    { type: "unitCollective", label: "Kollektivt" },
    { type: "unitRoom", label: "Rum" }
  ];

  useEffect(() => {
    fetch('http://localhost:9998/api/apartement')
      .then(response => response.json())
      .then(data => {
        setApartements(data);
        setFilteredApartments(data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const handleDotClick = (apartementId: string, imageName: string) => {
    setActiveImageName(prevState => ({ ...prevState, [apartementId]: imageName }));
  };

  const handleFilterToggle = (type: BuildingType) => {
    if (quickFilterType === type) {
      setQuickFilterType(null);
    } else {
      setApartementTypeBuilding(null);
      setQuickFilterType(type);
    }
  };


  const filterApartments = () => {
    const results = apartements.filter(apartement => {
      return (quickFilterType ? apartement.unitType === quickFilterType : true) &&
        (amountRooms ? apartement.rooms === amountRooms : true) &&
        (apartementTypeBuilding ? apartement.unitType === apartementTypeBuilding : true) &&
        (searchArea ? apartement.area.includes(searchArea) : true) &&
        (minPrice ? parseInt(apartement.rent, 10) >= minPrice : true) &&
        (maxPrice ? parseInt(apartement.rent, 10) <= maxPrice : true) &&
        (whatIncludes.length > 0 ? whatIncludes.every(include => apartement.includes.some(inc => inc.name === include)) : true);
    });

    setFilteredApartments(results);
  };


  useEffect(() => {
    filterApartments();
  }, [quickFilterType]);

  const resetFilters = () => {
    // close modal first
    setShowModal(false);

    // then reset the filters
    setTimeout(() => {
      setAmountRooms(null);
      setApartementTypeBuilding(null);
      setSearchArea("");
      setMinPrice(null);
      setMaxPrice(null);
      setWhatIncludes([]);

      filterApartments();
    }, 0);
  }


  const Modal = () => {
    return (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <div className="top-header-modal">
            <button className='modal-close' onClick={() => setShowModal(false)}>X</button>
            <h3 className='modal-header'>Filter</h3>
          </div>
          <div className="living-type-modal">
            <h2 className='modal-small-header'>Boendetyp</h2>
            <p className='modal-p-tag'>Sök efter rum, hela lägenheter eller andra typer av boenden.</p>
            <div className="chose-living-type">
              {apartmentTypes.map(apartment => (
                <button
                  key={apartment.type}
                  className={`btn-type-house ${apartementTypeBuilding === apartment.type ? 'selected' : ''}`}
                  onClick={() => setApartementTypeBuilding(apartment.type)}
                >
                  {apartment.label}
                </button>
              ))}
            </div>


          </div>
          <div className="price-modal">
            <h2 className='modal-small-header'>Prisintervall</h2>
            <p className='modal-p-tag'>Månadshyra</p>
            <div className="price-group">
              <input type="number" className='input-price' placeholder='KR 3000' />
              <span className="from-to-slice"></span>
              <input type="number" className='input-price' placeholder='KR 7000' />
            </div>
          </div>
          <div className="search-area">
            <div className="search-group">
              <input className='search-input' type="text" name="" id="" placeholder='Skriv in ett område eller adress...' onChange={e => setSearchArea(e.target.value)} />
              <div className="img-search-container">
                <img className='search-logo' src={searchLogo} alt="" />
              </div>
            </div>
          </div>
          <div className="amount-rooms">
            <h2 className='modal-small-header'>Antal Rum</h2>
            <div className="amount-rooms-container">
              {roomCounts.map(roomCount => (
                <button
                  key={roomCount}
                  className='btn-rooms'
                  onClick={() => setAmountRooms(roomCount)}>
                  {roomCount || "All"}
                </button>
              ))}
            </div>

          </div>
          <div className="chose-includes">
            <h2 className='modal-small-header'>Bekvämligheter</h2>
            <p className='modal-p-tag'>Välj alternativ</p>
            <div className="checkboxes">
              <div className="checkbox-container">
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Wifi</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Tvättmaskin</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Dedikerad arbetsyta</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Balkong</label>
                </div>
              </div>
              <div className="checkbox-container">
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Kök</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Tv</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Parkering</label>
                </div>
                <div className="checkbox-group">
                  <input className='checkbox-includes' type="checkbox" name="" id="" />
                  <label className='checkbox-label' htmlFor="">Hiss</label>
                </div>
              </div>

            </div>
          </div>
          <div className="result-modal">
            <button className='cleaner-btn' onClick={resetFilters}>Rensa alla</button>
            <button className='result-btn' onClick={filterApartments}>VISA RESULTAT</button>
          </div>
        </div>
      </div>
    );
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
        <div className="box-filter" onClick={() => handleFilterToggle(BuildingType.HOUSE)}>
          <AiOutlineHome className='icon-logs' />
          <p>Hus</p>
        </div>
        <div className="box-filter" onClick={() => handleFilterToggle(BuildingType.APARTMENT)}>
          <BsBuildings className='icon-logs' />
          <p>Lägenhet</p>
        </div>
        <div className="box-filter" onClick={() => handleFilterToggle(BuildingType.ROOM)}>
          <BsDoorOpen className='icon-logs' />
          <p>Rum</p>
        </div>
        <div className="box-filter">
          <PiUsersThreeLight className='icon-logs' onClick={() => handleFilterToggle(BuildingType.COLLECTIVE)} />
          <p>Kollektivt</p>
        </div>
        <div className="box-filter" onClick={() => setShowModal(true)}>
          <HiAdjustments className='icon-logs' />
          <p>Filter</p>
        </div>
      </div>

      <div className="house-listing">
        {filteredApartments.map((apartement) => (
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


      {showModal && <Modal />}
    </div>
  );
}

export default Housecomponent