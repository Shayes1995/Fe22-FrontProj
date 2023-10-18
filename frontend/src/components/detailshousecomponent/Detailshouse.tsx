import React from 'react';
import { DetailshouseProps } from '../../typescriptHelpers/apartements';
import './Detailshouse.css'
import Date from '../img/imgDetailshouse/Date.png'
import Pin from '../img/imgDetailshouse/Pin.png'
import Size from '../img/imgDetailshouse/Size.png'
import Squaremeter from '../img/imgDetailshouse/Squaremeter.png'
import bigApartement from '../img/imgDetailshouse/bigApartement.png';
import unitRoomImg from '../img/imgDetailshouse/unitRoom.png';
import unitCollectiveImg from '../img/imgDetailshouse/unitCollective.png';
import unitHouseImg from '../img/imgDetailshouse/unitHouse.png';
import StudyStayLogo from '../img/imgDetailshouse/descriptionLogo.png';
import ElImage from '../img/imgDetailshouse/El.png';
import BalconyImg from '../img/imgDetailshouse/BalconyImg.png';
import ElevatorImg from '../img/imgDetailshouse/ElevatorImg.png';
import WifiImg from '../img/imgDetailshouse/WifiImg.png';
import KitchenImg from '../img/imgDetailshouse/KitchenImg.png';
import DishwasherImg from '../img/imgDetailshouse/DishwasherImg.png';

const Detailshouse: React.FC<DetailshouseProps> = ({ apartement }) => {

  if (!apartement) return <div>Loading...</div>;
  const getImageUrl = (name: string) => {
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
        return bigApartement;
      case 'unitRoom':
        return unitRoomImg;
      case 'unitCollective':
        return unitCollectiveImg;
      case 'unitHouse':
        return unitHouseImg;
      default:
        return Date;
    }
  }

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
        return KitchenImg;
      case 'Wifi':
        return WifiImg;
      case 'Dishwasher':
        return DishwasherImg;
      case 'Balcony':
        return BalconyImg;
      case 'Electricity':
        return ElImage;
      case 'Elevator':
        return ElevatorImg;
      default:
        return includes;
    }
  }


  return (
    <div className='details-container'>
      <div className='details-column'>
        <div className="details-row-one">
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
                <img className='details-icon' src={Pin} alt="" />
              </div>
              <p>{apartement.street}</p>
            </div>
            <div className="box-details">

              <h4>Hyra</h4>
              <p>{apartement.rent}kr</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <img className='details-icon' src={Size} alt="" />
              </div>
              <p>{apartement.rooms} RoK</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <img className='details-icon' src={Squaremeter} alt="" />
              </div>
              <p>{apartement.size}</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <img className='details-icon' src={Date} alt="" />
              </div>
              <p>{apartement.available}</p>
            </div>
            <div className="box-details">
              <div className="img-box">
                <img className='details-icon' src={getUnitTypeImage(apartement.unitType)} alt={apartement.unitType} />
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
                  </div>
                  <div className="apartement-info-box">
                    <p className='info-p-two'>{apartement.area}</p>
                    <p className='info-p-two'>{apartement.floor}</p>
                    <p className='info-p-two'>{apartement.available}</p>
                    <p className='info-p-two'>{apartement.apply}</p>
                  </div>
                </div>
                <p className='apply-p'>Ansökan är öppen och görs via vår bostadskö.</p>
              </div>
              <button className='apply-btn'>TILL ANSÖKAN</button>
            </div>
            <div className="includes-apartement">
              {apartement.includes.map((include, index) => (
                <div className="include-item" key={index}>
                  <div className="includes-box">
                    <img src={getUnitIncludeImage(include.name)} alt={include.name} />
                  </div>
                  <p>{getUnitIncludeDisplay(include.name)}</p>
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
