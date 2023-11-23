import { useEffect, useState } from 'react'
import './ApplyComponent.css'
import { DetailshouseProps } from '../../typescriptHelpers/apartements'
import { useAuth } from '../../context/ContextProvider'
import LoaderSpinner from '../loader/LoadSpinner'
import StarGrade from '../img/imgDetailshouse/StarGrades.png';
import { useNavigate } from 'react-router'

const ApplyComponent: React.FC<DetailshouseProps> = ({ apartement }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [apartement]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!apartement) {
    return null;
  }

  const getImageUrl = (name: string) => {
    const imageObject = apartement.imgURL.find(img => img.name === name);
    return imageObject ? imageObject.url : '';
  }

  const handleTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
  };


  const imgOneUrl = getImageUrl('imgOne');

  const handleApplicationSubmit = () => {

    if (!acceptTerms) {
      console.log('Terms not accepted');
      return;
    }
    const applicationData = {
      apartementId: apartement._id,
    };

    fetch('http://localhost:9998/api/application/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(applicationData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Unknown error');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        navigate('/mina-ansokningar');
      })
      .catch(error => {
        console.error(error);
      });
    console.log(token);
  };

  const showGrades = () => {
    switch (apartement.grades) {
      case '1':
        return <div><img key={1} src={StarGrade} alt="Star" /></div>;
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
        return <div></div>;
    }
  }


  return (
    <div className='apply-main'>
      <div className="apply-container">
        <div className="header-application">
          <h1>Ansök till {apartement.street}</h1>
        </div>
        <div className="apply-content">
          <div className="apply-content-left-side">
            <div className="apply-content-left-top">
              <div className="box-image-apply">
                <img className='image-box-apply-one' src={imgOneUrl} alt="" />
              </div>
            </div>

            <div className="apply-content-left-bottom">
              <div className="over-view-container">
                <div className="overview-info-container">
                  <h5>Översikt</h5>
                  <div className="over-view-row-apartement-info">
                    <div className="over-view-apartement-info-box">
                      <p className='over-view-info-p-one'>Hyra:</p>
                      <p className='over-view-info-p-one'>Område:</p>
                      <p className='over-view-info-p-one'>Våning:</p>
                      <p className='over-view-info-p-one'>Inflytt:</p>
                      <p className='over-view-info-p-one'>Ansök senast:</p>
                      <p className='over-view-info-p-one'>Hyresvärd:</p>
                      <p className='over-view-info-p-one'>Betyg:</p>
                    </div>
                    <div className="over-view-apartement-info-box">
                      <p className='over-view-info-p-two'>{apartement.rent}</p>
                      <p className='over-view-info-p-two'>{apartement.area}</p>
                      <p className='over-view-info-p-two'>{apartement.floor}</p>
                      <p className='over-view-info-p-two'>{apartement.available}</p>
                      <p className='over-view-info-p-two'>{apartement.apply}</p>
                      <p className='over-view-info-p-two'>{apartement.landLord}</p>
                      <p className='over-view-info-p-two'>{showGrades()}</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="apply-content-right-side">
            <div className="apply-content-right-top">
              <p className='demand-p'>Viktiga krav och villkor från hyresföreningen:</p>
              <ol className='ordered-list'>
                <li className='li-demands'><span>Deposition:</span> En deposition om 5 000 kr måste betalas inom 7 dagar från acceptdatumet. Denna summa återbetalas när du flyttar ut, förutsatt att bostaden lämnas i ursprungligt skick.</li>
                <li className='li-demands'><span>Husdjur:</span> Husdjur är tillåtna, men en särskild avgift om 200 kr/månad tillkommer.</li>
                <li className='li-demands'><span>Rökning:</span> Rökning är strikt förbjuden inom bostadens område, inklusive balkonger och gemensamma utrymmen.</li>
                <li className='li-demands'><span>Inflyttningsdatum:</span> Om inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet första vardagen på kommande vecka. Var god se till att koordinera med fastighetsskötaren för att undvika kollisioner.</li>
                <li className='li-demands'><span>Uppsägningstid:</span> Uppsägningstiden är tre månader från och med den första i nästa månad efter att uppsägning har gjorts.</li>
              </ol>
              <p className='read-p'>Vänligen läs igenom alla villkor noga. Om du har några frågor eller funderingar, kontakta hyresföreningen innan du tackar ja.</p>
            </div>
            <div className="apply-content-right-botton">
              <div className="group-apply">
                <input className='checkbox-apply' type="radio" name="" id="" checked={acceptTerms} onChange={handleTerms} />
                <p>Jag godkänner villkoren</p>
              </div>
              <button className='apply-btn-apartement' onClick={handleApplicationSubmit}>ANSÖK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ApplyComponent