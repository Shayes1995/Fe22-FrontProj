import { useState, useEffect } from 'react';
import { DetailshouseProps } from '../../typescriptHelpers/apartements';
import './Detailshouse.css'
import StudyStayLogo from '../img/imgDetailshouse/descriptionLogo.png';
import StarGrade from '../img/imgDetailshouse/StarGrades.png';
import { AiOutlineWifi } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { IoBedOutline } from 'react-icons/io5';
import { LuBox } from 'react-icons/lu';
import { IoTodayOutline } from 'react-icons/io5';
import { BsBuildings } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { BsDoorOpen } from 'react-icons/bs';
import { PiUsersThreeLight } from 'react-icons/pi';
import { BiSolidWasher } from 'react-icons/bi';
import { MdBalcony } from 'react-icons/md';
import { PiElevatorLight } from 'react-icons/pi';
import { FcElectricity } from 'react-icons/fc';
import { PiCookingPot } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import LoaderSpinner from '../loader/LoadSpinner';
import NotFound from '../../pages/NotFound';

const Detailshouse: React.FC<DetailshouseProps> = ({ apartement }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);


  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [apartement]);



  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!apartement || !apartement.imgURL || !apartement.includes) {
    return <div>
      <NotFound />
    </div>;
  }



  const getImageUrl = (name: string) => {
    if (!apartement || !apartement.imgURL) {
      return '';
    }
    const imageObject = apartement.imgURL.find(img => img.name === name);
    return imageObject ? imageObject.url : '';
  }



  const imgOneUrl = getImageUrl('imgOne');
  const imgTwoUrl = getImageUrl('imgTwo');
  const imgThreeUrl = getImageUrl('imgThree');
  const imgFourUrl = getImageUrl('imgFour');
  const imgFiveUrl = getImageUrl('imgFive');

  const getUnitTypeImage = (unitType: string) => {
    switch (unitType) {
      case 'unitApartement':
        return <BsBuildings className='icon-logs-details' />;
      case 'unitRoom':
        return <BsDoorOpen className='icon-logs-details' />;
      case 'unitCollective':
        return <PiUsersThreeLight className='icon-logs-details' />;
      case 'unitHouse':
        return <AiOutlineHome className='icon-logs-details' />;
      default:
        return unitType;
    }
  }

  const UnitIcon = getUnitTypeImage(apartement.unitType);




  const getUnitTypeDisplayName = (unitType: string) => {
    switch (unitType) {
      case 'unitApartement':
        return 'Lägenhet';
      case 'unitRoom':
        return 'Rum';
      case 'unitCollective':
        return 'Kollektiv';
      case 'unitHouse':
        return 'Hus';
      default:
        return unitType;
    }
  }

  const getUnitIncludeDisplay = (includes: string) => {
    switch (includes) {
      case 'Kitchen':
        return 'Kök';
      case 'Wifi':
        return 'Wi-Fi';
      case 'Dishwasher':
        return 'Tvättmaskin';
      case 'Balcony':
        return 'Balkong';
      case 'Electricity':
        return 'El';
      case 'Elevator':
        return 'Hiss';
      default:
        return includes;
    }
  }
  const getUnitIncludeImage = (includes: string) => {
    switch (includes) {
      case 'Kitchen':
        return <PiCookingPot className='icon-logs-details' />;
      case 'Wifi':
        return <AiOutlineWifi className='icon-logs-details' />;
      case 'Dishwasher':
        return <BiSolidWasher className='icon-logs-details' />;
      case 'Balcony':
        return <MdBalcony className='icon-logs-details' />;
      case 'Electricity':
        return <FcElectricity className='icon-logs-details' />;
      case 'Elevator':
        return <PiElevatorLight className='icon-logs-details' />;
      default:
        return includes;
    }
  }

  const showGrades = () => {
    switch (apartement.grades) {
      case '1':
        return <span><img key={1} src={StarGrade} alt="Star" /></span>;
      case '2':
        return (
          <span className='star-container'>
            <img className='starLog' key={1} src={StarGrade} alt="Star" />
            <img key={2} src={StarGrade} alt="Star" />
          </span>
        );
      case '3':
        return (
          <span className='star-container'>
            <img className='starLog' key={1} src={StarGrade} alt="Star" />
            <img className='starLog' key={2} src={StarGrade} alt="Star" />
            <img className='starLog' key={3} src={StarGrade} alt="Star" />
          </span>
        );
      case '4':
        return (
          <span className='star-container'>
            <img className='starLog' key={1} src={StarGrade} alt="Star" />
            <img className='starLog' key={2} src={StarGrade} alt="Star" />
            <img className='starLog' key={3} src={StarGrade} alt="Star" />
            <img className='starLog' key={4} src={StarGrade} alt="Star" />
          </span>
        );
      case '5':
        return (
          <span className='star-container'>
            <img className='starLog' key={1} src={StarGrade} alt="Star" />
            <img className='starLog' key={2} src={StarGrade} alt="Star" />
            <img className='starLog' key={3} src={StarGrade} alt="Star" />
            <img className='starLog' key={4} src={StarGrade} alt="Star" />
            <img className='starLog' key={5} src={StarGrade} alt="Star" />
          </span>
        );
      default:
        return <span></span>;
    }
  }





  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className='details-container'>
      <div className='details-column'>
        <div className="details-row-one">
          <div className="details-carousel">
            {apartement.imgURL.map((img, index) => (
              <div key={img.name} className={`carousel-slide ${index === activeImageIndex ? 'active' : ''}`}>
                <img src={img.url} alt={img.name} />
              </div>
            ))}
            <div className="carousel-dots">
              {apartement.imgURL.map((_, index) => (
                <span key={index} onClick={() => handleDotClick(index)} className={index === activeImageIndex ? 'active-dot' : ''}></span>
              ))}
            </div>
          </div>
          <div className="details-img">
            <div className="leftside-img">
              <div className="image-box-one">
                <img className='big-img' src={imgOneUrl} alt="imgOne" />
              </div>
              <div className="image-box-one">
                <img className='big-img' src={imgTwoUrl} alt="imgTwo" />
              </div>
            </div>
            <div className="rightside-img">
              <div className="mid-img">
                <img className='vertical-img' src={imgFiveUrl} alt="imgTwo" />
              </div>
              <div className="mid-img">
                <img className='vertical-img' src={imgFourUrl} alt="imgTwo" />
              </div>
            </div>
          </div>
        </div>
        <div className="details-house">
          <div className="box-container">

            <div className="box-details">
              <div className="img-box">
                <BiMap className='icon-logs-details' />
              </div>
              <p>{apartement.street}</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <GrMoney className='icon-logs-details' />
              </div>
              <p>{apartement.rent}kr</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <IoBedOutline className='icon-logs-details' />
              </div>
              <p>{apartement.rooms} RoK</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <LuBox className='icon-logs-details' />
              </div>
              <p>{apartement.size}</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <IoTodayOutline className='icon-logs-details' />
              </div>
              <p>{apartement.available}</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                {UnitIcon}
              </div>
              <p>{getUnitTypeDisplayName(apartement.unitType)}</p>

            </div>

          </div>

        </div>
        <div className="details-row-second-images">
          <div className="div-for-second-row">
            <div className="image-box-two">
              <img className='second-big-img' src={imgOneUrl} alt="imgOne" />
            </div>
            <div className="image-box-two">
              <img className='second-big-img' src={imgFourUrl} alt="imgOne" />
            </div>
            <div className="image-box-two">
              <img className='second-big-img' src={imgThreeUrl} alt="imgOne" />
            </div>
            <div className="image-box-two">
              <img className='second-big-img' src={imgTwoUrl} alt="imgOne" />
            </div>
          </div>
        </div>
        <div className="details-description-flex-row">
          <div className="details-description-left">
            <h2>{apartement.street}</h2>
            <div className="short-info">
              <p>{apartement.rent}kr/mån</p>
              <div className="divider-info"></div>
              <p>{apartement.rooms}RoK</p>
              <div className="divider-info"></div>
              <p>{apartement.size}</p>
            </div>
            <div className="description-p-tag">
              <p>{apartement.title}</p>
              <p>Här finns nu en ljus och välplanerad lägenhet i fastighet som stod klar för inflyttning i lutet av 2018. I nära anslutning till porten finns allmänna kommunikationer som tar dig till city på några minuter. Från Redbergsplatsen går även flera spårvagnar in till centrum eller vidare österut. För dig som hellre väljer cykel och inte är rädd för backar är cykelbanorna väl utbyggda. Härliga naturreservatet Delsjön ligger alldeles runt knuten med möjlighet till en mängd naturupplevelser i form av bad, kanotpaddling, friluftsliv eller ridning. </p>
              <p>Här finns nu en ljus och välplanerad lägenhet i fastighet som stod klar för inflyttning i lutet av 2018. I nära anslutning till porten finns allmänna kommunikationer som tar dig till city på några minuter. Från Redbergsplatsen går även flera spårvagnar in till centrum eller vidare österut. För dig som hellre väljer cykel och inte är rädd för backar är cykelbanorna väl utbyggda. Härliga naturreservatet Delsjön ligger alldeles runt knuten med möjlighet till en mängd naturupplevelser i form av bad, kanotpaddling, friluftsliv eller ridning. </p>
              <p>Här finns nu en ljus och välplanerad lägenhet i fastighet som stod klar för inflyttning i lutet av 2018. I nära anslutning till porten finns allmänna kommunikationer som tar dig till city på några minuter. Från Redbergsplatsen går även flera spårvagnar in till centrum eller vidare österut. För dig som hellre väljer cykel och inte är rädd för backar är cykelbanorna väl utbyggda. Härliga naturreservatet Delsjön ligger alldeles runt knuten med möjlighet till en mängd naturupplevelser i form av bad, kanotpaddling, friluftsliv eller ridning. </p>
              <p>Här finns nu en ljus och välplanerad lägenhet i fastighet som stod klar för inflyttning i lutet av 2018. I nära anslutning till porten finns allmänna kommunikationer som tar dig till city på några minuter. Från Redbergsplatsen går även flera spårvagnar in till centrum eller vidare österut. För dig som hellre väljer cykel och inte är rädd för backar är cykelbanorna väl utbyggda. Härliga naturreservatet Delsjön ligger alldeles runt knuten med möjlighet till en mängd naturupplevelser i form av bad, kanotpaddling, friluftsliv eller ridning. </p>
            </div>
          </div>
          <div className="wrap-container-include">
            <div className="includes-apartement-two">
              {apartement.includes.map((include, index) => (
                <div className="include-item-two" key={index}>
                  <div className="includes-box-two">
                    {getUnitIncludeImage(include.name)}
                    <p>{getUnitIncludeDisplay(include.name)}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="details-description-right">
            <div className="description-logo">
              <img className='logo-desc' src={StudyStayLogo} alt="logo" />
            </div>
            <div className="description-apartement-info">
              <div className="apartement-info-container">
                <h5>Översikt</h5>
                <div className="row-apartementinfo">
                  <div className="apartement-info-box">
                    <p className='info-p-one'>Område:</p>
                    <p className='info-p-one'>Våning:</p>
                    <p className='info-p-one'>Inflytt:</p>
                    <p className='info-p-one'>Ansök senast:</p>
                    <p className='info-p-one'>Hyresvärd:</p>
                    <p className='info-p-one'>Betyg:</p>
                  </div>
                  <div className="apartement-info-box">
                    <p className='info-p-two'>{apartement.area}</p>
                    <p className='info-p-two'>{apartement.floor}</p>
                    <p className='info-p-two'>{apartement.available}</p>
                    <p className='info-p-two'>{apartement.apply}</p>
                    <p className='info-p-two'>{apartement.landLord}</p>
                    <p className='info-p-two'>{showGrades()}</p>
                  </div>
                </div>
                <p className='apply-p'>Ansökan är öppen och görs via vår bostadskö.</p>
              </div>
              <div className="btn-apply-container">
                <NavLink to={`/apply/${apartement._id}`}>
                  <button className='apply-btn'>TILL ANSÖKAN</button>
                </NavLink>
              </div>


            </div>
            <div className="includes-apartement">
              {apartement.includes.map((include, index) => (
                <div className="include-item" key={index}>
                  <div className="includes-box">
                    {getUnitIncludeImage(include.name)}
                    <p>{getUnitIncludeDisplay(include.name)}</p>
                  </div>
                </div>
              ))}

            </div>


          </div>
        </div>
      </div>
    </div>
  );
}



export default Detailshouse;
