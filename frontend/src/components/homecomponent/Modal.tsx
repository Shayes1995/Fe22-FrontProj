import React from 'react';
import { useState } from 'react';
import searchLogo from '../img/imgHome/search-solid.png'
import { Apartement, BuildingType, QuickFilterType } from '../../typescriptHelpers/apartements';

type ModalProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setMinPriceInput: (value: string) => void;
  setMaxPriceInput: (value: string) => void;
  setSearchArea: (value: string) => void;
  setAmountRooms: (value: string | null) => void;
  setApartementTypeBuilding: (value: string | null) => void;
  setWhatIncludes: (value: string[]) => void;
  apartments: Apartement[];
  filterApartments: () => void;
  onFilterSubmit: (filteredResults: Apartement[]) => void;
};



const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, setSearchArea, filterApartments, onFilterSubmit, apartments }) => {

  const [minPriceInput, setMinPriceInput] = useState<number | ''>('');
  const [maxPriceInput, setMaxPriceInput] = useState<number | ''>('');
  const [searchAreaInput, setSearchAreaInput] = useState('');
  const [apartementTypeBuilding, setApartementTypeBuilding] = useState<string | null>(null);
  const [amountRooms, setAmountRooms] = useState<string | null>(null);
  const [whatIncludes, setWhatIncludes] = useState<string[]>([]);
  const roomCounts = [null, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // below we have apartementTypes, leftAmenityTypes and rightAmenityTypes
  // these are the types of apartements and amenities that i have in my database
  // why we have these is because in my db the langue is in swedish and i want to show the user the options in english
  //and because the computer cant read å-ä-ö i have to write them like this
  const apartmentTypes = [
    { type: "unitApartement", label: "Lägenhet" },
    { type: "unitHouse", label: "Hus" },
    { type: "unitCollective", label: "Kollektivt" },
    { type: "unitRoom", label: "Rum" }
  ];
  const leftAmenityTypes = [
    { type: "Wifi", label: "Wifi" },
    { type: "WashingMachine", label: "Tvättmaskin" },
    { type: "DedicatedWorkspace", label: "Dedikerad arbetsyta" },
    { type: "Balcony", label: "Balkong" }
  ];

  const rightAmenityTypes = [
    { type: "Kitchen", label: "Kök" },
    { type: "TV", label: "Tv" },
    { type: "Parking", label: "Parkering" },
    { type: "Elevator", label: "Hiss" }
  ];
  // handler for my price input minimum
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceInput(Number(e.target.value));
  };

  // handler for my price input maximum
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceInput(Number(e.target.value));
  };

  const handleSearchAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAreaInput(e.target.value);
  };

// handler for my room count
  const handleRoomCountClick = (roomCount: string | null) => {
    setAmountRooms(roomCount);
  };


  // my submit handler for my form in the modal
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected Building Type:", apartementTypeBuilding);

    let filteredResults = apartments;

    // doing if statements for all my filters so i can filter out the apartments
    // when and if they are selected
    if (apartementTypeBuilding) {
      filteredResults = filteredResults.filter(apartment =>
        apartment.unitType === apartementTypeBuilding
      );
    }

    // checking if the amount of rooms is selected
    if (amountRooms) {
      filteredResults = filteredResults.filter(apartment =>
        apartment.rooms === amountRooms
      );
    }

    // checking if the min and max price has a value
    if (minPriceInput !== '' && maxPriceInput !== '') {
      filteredResults = filteredResults.filter(apartment =>
        apartment.rent >= minPriceInput && apartment.rent <= maxPriceInput
      );
    }
    // checking if the amenities are selected
    if (whatIncludes.length > 0) {
      filteredResults = filteredResults.filter(apartment =>
        whatIncludes.every(amenity =>
          apartment.includes.some(include => include.name === amenity)
        )
      );
    }
    // checking if the search area has a value
    if (searchAreaInput) {
      filteredResults = filteredResults.filter(apartment =>
        apartment.area === searchAreaInput
      );
    }

    console.log("Search Area Input:", searchAreaInput);
    console.log("Filtered Results:", filteredResults);

    onFilterSubmit(filteredResults);
    setShowModal(false);
  };



  // this handleChange is for my includes for when i click the modal checkboxes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.name is targeting the specific value of the checkbox
    const amenity = e.target.name;
    setWhatIncludes(prevIncludes => {
      if (e.target.checked) {
        return [...prevIncludes, amenity];
      } else {
        return prevIncludes.filter((include: string) => include !== amenity);
      }
    });
  };

  // my resetFilter will reset all my filters and show all my apartments
  const resetFilters = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setApartementTypeBuilding(null);
    setAmountRooms(null);
    setWhatIncludes([]);
    setSearchAreaInput('');

    onFilterSubmit(apartments);
  };



  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className="top-header-modal">
          <button className='modal-close' onClick={() => setShowModal(false)}>X</button>
          <h3 className='modal-header'>Filter</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="living-type-modal">
            <h2 className='modal-small-header'>Boendetyp</h2>
            <p className='modal-p-tag'>Sök efter rum, hela lägenheter eller andra typer av boenden.</p>
            <div className="chose-living-type">
              {apartmentTypes.map(apartment => (
                <button key={apartment.type} type="button" className={`btn-type-house ${apartementTypeBuilding === apartment.type ? 'selected' : ''}`}
                  onClick={() => setApartementTypeBuilding(apartment.type)}>
                  {apartment.label}
                </button>
              ))}
            </div>

          </div>
          <div className="price-modal">
            <h2 className='modal-small-header'>Prisintervall</h2>
            <p className='modal-p-tag'>Månadshyra</p>
            <div className="price-group">
              <input type="number" className='input-price' placeholder='KR 3000' value={minPriceInput} onChange={handleMinPriceChange} />
              <span className="from-to-slice"></span>
              <input type="number" className='input-price' placeholder='KR 15000' value={maxPriceInput} onChange={handleMaxPriceChange} />
            </div>
          </div>
          <div className="search-area">
            <div className="search-group">
              <input className='search-input' type="text" name="" id="" placeholder='Skriv in ett område eller adress...' onChange={e => setSearchAreaInput(e.target.value)} />
              <div className="img-search-container">
                <img className='search-logo' src={searchLogo} alt="" />
              </div>
            </div>
          </div>
          <div className="amount-rooms">
            <h2 className='modal-small-header'>Antal Rum</h2>
            <div className="amount-rooms-container">
              {roomCounts.map(roomCount => (
                <button key={roomCount} type="button" className={`btn-rooms ${amountRooms === roomCount ? 'selected' : ''}`} onClick={() => handleRoomCountClick(roomCount)}> {roomCount || "Alla"}
                </button>
              ))}
            </div>

          </div>
          <div className="chose-includes">
            <h2 className='modal-small-header'>Bekvämligheter</h2>
            <p className='modal-p-tag'>Välj alternativ</p>
            <div className="checkboxes">
              <div className="checkbox-container">
                {leftAmenityTypes.map(amenity => (
                  <div key={amenity.type} className="checkbox-group">
                    <input className='checkbox-includes' type="checkbox" name={amenity.type} id={amenity.type} checked={whatIncludes.includes(amenity.type)} onChange={handleChange} />
                    <label className='checkbox-label' htmlFor={amenity.type}>{amenity.label}</label>
                  </div>
                ))}
              </div>
              <div className="checkbox-container">
                {rightAmenityTypes.map(amenity => (
                  <div key={amenity.type} className="checkbox-group">
                    <input className='checkbox-includes' type="checkbox" name={amenity.type} id={amenity.type} checked={whatIncludes.includes(amenity.type)} onChange={handleChange} />
                    <label className='checkbox-label' htmlFor={amenity.type}>{amenity.label}</label>
                  </div>
                ))}
              </div>

            </div>
          </div>
          <div className="result-modal">
            <button className='cleaner-btn' onClick={resetFilters}>Rensa alla</button>
            <button type='submit' className='result-btn'>VISA RESULTAT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
