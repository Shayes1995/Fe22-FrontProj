import { useEffect, useState } from 'react'
import './AboutUsComponent.css'
import LoaderSpinner from '../loader/LoadSpinner'

const AboutUsComponent = () => {
  const [isLoading, setIsLoading] = useState(true)

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
    <div className='about-us-container'>
      <div className="about-us-hero"></div>
      <div className='about-us-info'>
        <h1>Om oss</h1>
        <p> Studystay är inte bara ett företag som förmedlar bostäder, det är en del av vårt engagemang i att stödja studenter i deras akademiska resa. Vi förstår att boendesituationen kan vara en av de mest stressande aspekterna av studentlivet, och vi strävar efter att göra den processen så smidig som möjligt. Vårt team arbetar hårt för att matcha studenter med bostäder som passar deras behov och budget.</p>
        <p> Vi tror på att skapa ett nära samarbete med både hyresvärdar och hyresgäster för att säkerställa en positiv upplevelse för alla parter. Genom att erbjuda prisvärda alternativ och en enkel ansökningsprocess försöker vi minska den ekonomiska bördan för studenter och ge dem mer tid att fokusera på sina studier och personliga mål.</p>
        <p> Vår vision sträcker sig bortom bara Stockholm. Vi har en stark önskan att växa och utvidga vår närvaro till hela Sverige. Det innebär att vi kommer att kunna stödja studenter från alla delar av landet och göra det möjligt för dem att hitta en bekväm och prisvärd plats att bo oavsett var de studerar.</p>
        <p> Hos Studystay är vi övertygade om att boendefrågan inte bara handlar om att hitta tak över huvudet, utan också om att skapa en hemliknande atmosfär där studenter kan känna sig trygga och trivas. Vi strävar efter att erbjuda bostäder som känns som ett andra hem, där studenter kan bygga minnen och skapa starka band med sina grannar och kamrater.</p>
        <p> Vi är stolta över att vara en del av studenters liv och vi ser fram emot att fortsätta växa och utvecklas för att möta deras behov på bästa möjliga sätt. Välkommen till Studystay - ditt val för prisvärda och bekväma studentbostäder i Stockholm och förhoppningsvis snart i hela Sverige!</p>
      </div>
    </div>
  )
}

export default AboutUsComponent