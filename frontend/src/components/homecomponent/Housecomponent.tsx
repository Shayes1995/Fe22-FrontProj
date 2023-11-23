import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Housecomponent.css';
import { Apartement, BuildingType, QuickFilterType } from '../../typescriptHelpers/apartements';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsDoorOpen } from 'react-icons/bs';
import { BsBuildings } from 'react-icons/bs';
import { PiUsersThreeLight } from 'react-icons/pi';
import { HiAdjustments } from 'react-icons/hi';
import LoadSpinner from '../loader/LoadSpinner'
import Modal from './Modal'


const Housecomponent = () => {
  const [apartements, setApartements] = useState<Apartement[]>([]);
  const [activeImageName, setActiveImageName] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false)
  const [filteredApartments, setFilteredApartments] = useState<Apartement[]>([]);
  const [quickFilterType, setQuickFilterType] = useState<BuildingType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedApartments, setDisplayedApartments] = useState<Apartement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [searchArea, setSearchArea] = useState('')
  const [amountRooms, setAmountRooms] = useState<string | null>(null);
  const [apartementTypeBuilding, setApartementTypeBuilding] = useState<string | null>(null);
  const [whatIncludes, setWhatIncludes] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<BuildingType | null>(null);

  const apartmentsPerPage = 6;



  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:9998/api/apartement')
      .then(response => response.json())
      .then(data => {
        setApartements(data);
        setFilteredApartments(data);
        setDisplayedApartments(data.slice(0, apartmentsPerPage));
        setTimeout(() => setIsLoading(false), 1500);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);




  const handleDotClick = (e: React.MouseEvent<HTMLSpanElement>, apartementId: string, imageName: string) => {
    e.preventDefault();
    setActiveImageName(prevState => ({ ...prevState, [apartementId]: imageName }));
  };

  const filterApartments = (): Apartement[] => {
    return apartements; // apartement is holding all the apartments in a array so i return that array
  };

  const applyQuickFilter = (type: BuildingType | null) => {
    const filtered = apartements.filter(apartment => {
      // if no quikc filter type is selected then i show all apartements from my array
      if (!type) return true;

      // returning the selected type of apartement
      return apartment.unitType === type;
    });

    setFilteredApartments(filtered);
    setCurrentPage(1);
    setDisplayedApartments(filtered.slice(0, apartmentsPerPage));
  };


  const handleFilterToggle = (type: BuildingType) => {
    // here im checking if the clicked filter type is already active
    if (quickFilterType === type) {
      // Reset the filter
      setQuickFilterType(null);
      applyQuickFilter(null); //setting the quick filter to null
      setActiveFilter(null); // setting the active filter to null
    } else {
      // Set the filter
      setQuickFilterType(type);
      applyQuickFilter(type);
      setActiveFilter(type);
    }
  };



  useEffect(() => {
    setCurrentPage(1);
    setDisplayedApartments(filteredApartments.slice(0, apartmentsPerPage));
  }, [filteredApartments]);

  const handleFilterSubmit = (filteredResults: Apartement[]) => {
    setFilteredApartments(filteredResults);
  };

  // Load more apartments, when user clicks "Visa fler", apartementsPerPage is set to 6 and when user clicks "Visa fler" again, it will be set to 12 and so on.
  // counting from 0 to 5, 6 to 11, 12 to 17 and so on.
  const loadMoreApartments = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const newApartments = filteredApartments.slice(0, nextPage * apartmentsPerPage);
    setDisplayedApartments(newApartments);
  };


  useEffect(() => {
    filterApartments();
  }, [quickFilterType]);



  return (
    <div className='home-column'>
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <>

          <div className="home-imgBanner">
            <div className="img-home-container">
              <h1>Hitta din nya studentbostad</h1>
              <h1>Ansök idag</h1>
            </div>
          </div>
          <div className="box-row">
            <div className={`box-filter ${activeFilter === BuildingType.HOUSE ? 'active-filter-home' : ''}`} onClick={() => handleFilterToggle(BuildingType.HOUSE)}>
              <AiOutlineHome className='icon-logs' />
              <p>Hus</p>
            </div>
            <div className={`box-filter ${activeFilter === BuildingType.APARTMENT ? 'active-filter-home' : ''}`} onClick={() => handleFilterToggle(BuildingType.APARTMENT)}>
              <BsBuildings className='icon-logs' />
              <p>Lägenhet</p>
            </div>
            <div className={`box-filter ${activeFilter === BuildingType.ROOM ? 'active-filter-home' : ''}`} onClick={() => handleFilterToggle(BuildingType.ROOM)}>
              <BsDoorOpen className='icon-logs' />
              <p>Rum</p>
            </div>
            <div className={`box-filter ${activeFilter === BuildingType.COLLECTIVE ? 'active-filter-home' : ''}`} onClick={() => handleFilterToggle(BuildingType.COLLECTIVE)}>
              <PiUsersThreeLight className='icon-logs' />
              <p>Kollektivt</p>
            </div>
            <div className="box-filter" onClick={() => setShowModal(true)}>
              <HiAdjustments className='icon-logs' />
              <p>Filter</p>
            </div>
          </div>

          <div className="house-listing">
            {displayedApartments.map((apartement) => (
              <div key={apartement._id} className="apartement-item">
                <div className="apartement-images">
                  <NavLink to={`/${apartement._id}`}>
                    {apartement.imgURL.filter(img => img.name === (activeImageName[apartement._id] || 'imgOne')).map(img => (
                      <div key={img.name} className="apartement-image">
                        <img src={img.url} alt={img.name} />
                        <div className="carousel-dots">
                          <span onClick={(e) => handleDotClick(e, apartement._id, 'imgOne')} className={activeImageName[apartement._id] === 'imgOne' ? 'active-dot' : ''}></span>
                          <span onClick={(e) => handleDotClick(e, apartement._id, 'imgTwo')} className={activeImageName[apartement._id] === 'imgTwo' ? 'active-dot' : ''}></span>
                          <span onClick={(e) => handleDotClick(e, apartement._id, 'imgThree')} className={activeImageName[apartement._id] === 'imgThree' ? 'active-dot' : ''}></span>
                          <span onClick={(e) => handleDotClick(e, apartement._id, 'imgFour')} className={activeImageName[apartement._id] === 'imgFour' ? 'active-dot' : ''}></span>
                          <span onClick={(e) => handleDotClick(e, apartement._id, 'imgFive')} className={activeImageName[apartement._id] === 'imgFive' ? 'active-dot' : ''}></span>
                        </div>

                      </div>
                    ))}
                  </NavLink>
                </div>
                <div className='quick-info-display'>
                  <div className='quick-info-display-container'>
                    <h3 className='left-side-h3'>{apartement.street}</h3>
                    <p>{apartement.rent}kr/månad</p>
                    <p>{apartement.rooms} RoK</p>
                  </div>
                  <div className='quick-info-display-container right-align-container'>
                    <h3 className='right-side-h3'>{apartement.area}</h3>
                    <p>{apartement.landLord}</p>
                    <p>{apartement.size}</p>
                  </div>
                </div>
              </div>

            ))}
          </div>
          <button className='load-more-btn' onClick={loadMoreApartments}>Visa fler</button>

        </>
      )}
      {showModal && <Modal showModal={showModal}
        setShowModal={setShowModal}
        setMinPriceInput={setMinPriceInput}
        setMaxPriceInput={setMaxPriceInput}
        setSearchArea={setSearchArea}
        setAmountRooms={setAmountRooms}
        setApartementTypeBuilding={setApartementTypeBuilding}
        setWhatIncludes={setWhatIncludes}
        filterApartments={filterApartments}
        onFilterSubmit={handleFilterSubmit}
        apartments={apartements}
      />}
    </div>
  );
}

export default Housecomponent