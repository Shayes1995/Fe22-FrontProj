import { useState, useEffect } from 'react'
import './ConfirmPayment.css'
import logoPayment from '../img/imgPayment/logo-payment.png';
import { useAuth } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import LoaderSpinner from '../loader/LoadSpinner';

const ConfirmPayment = () => {
  const navigate = useNavigate();
  const { token, application } = useAuth();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCVC: "",
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }







  const rentAmount = application?.apartement.rent || 0;
  const deposition = 5000;
  const total = rentAmount + deposition;



  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onlyLettersRegex = /^[a-zA-ZåäöÅÄÖ ]+$/;
    const numberRegex = /^[0-9]{16}$/;
    const cvcRegex = /^\d{3,4}$/;
    const expiryDateRegex = /^\d{4}$/;

    const newErrors = {
      cardName: !cardName ? "Vänligen fyll i namn på bankkortet" :
        cardName.length < 3 ? "Namnet måste vara minst 3 tecken" : 
        !onlyLettersRegex.test(cardName) ? "Namnet får bara innehålla bokstäver" : "",
      cardNumber: !cardNumber ? "Vänligen fyll i kortnummer" :
        cardNumber.length < 16 ? "Kortnumret måste vara minst 16 tecken" :
          cardNumber.length > 16 ? "Kortnumret får inte vara mer än 16 tecken" :
            !numberRegex.test(cardNumber) ? "Kortnumret får bara innehålla siffror"
              : "",
      cardDate: !expiryDate ? "Vänligen fyll i utgångsdatum" :
        expiryDate.length < 4 ? "Utgångsdatumet måste vara minst 4 tecken" :
          expiryDate.length > 4 ? "Utgångsdatumet får inte vara mer än 4 tecken" :
            !expiryDateRegex.test(expiryDate) ? "Utgångsdatumet får bara innehålla siffror" : "",
      cardCVC: !cvc ? "Vänligen fyll i säkerhetskod" :
        cvc.length < 3 ? "Säkerhetskoden måste vara minst 3 tecken" :
          cvc.length > 3 ? "Säkerhetskoden får inte vara mer än 3 tecken" :
            !cvcRegex.test(cvc) ? "Säkerhetskoden får bara innehålla siffror" : "",
    };
    setErrors(newErrors);

    if (!cardName || !cardNumber || !expiryDate || !cvc) {
      console.log('must fill in all fields');
      return;
    } else if (newErrors.cardName || newErrors.cardNumber || newErrors.cardDate || newErrors.cardCVC) {
      console.log('error in form');
      return;
    } else {
      console.log('payment success');

    }

    const applicationId = application?._id;

    if (!token) {
      console.log('no token')
      return;
    }

    const totalFormatted = total.toFixed(2);

    try {
      const response = await fetch('http://localhost:9998/api/payment/pay-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          applicationId,
          amount: totalFormatted,
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Payment success:", data);
        navigate('/my-apartement', { state: { apartment: application?.apartement } });
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };



  return (
    <div className='confirm-payment-container'>
      <div className="intro-container-payment">
        <h1>Betalning</h1>
        <p>Registrera ditt kort för att slutföra godkännandet av bostaden.
          Depositionen kommer att dras omgående och återbetalas när du flyttar ut.
          Hyran kommer att dras från ditt konto den sista dagen varje månad.</p>
      </div>
      <div className="container-payment-form">
        <div className="img-container-payment">
          <img src={logoPayment} alt="logo-payment" />
        </div>
        <div className="to-pay-container">
          <div className="top-to-pay">
            <h3>Att betala</h3>
          </div>
          <div className="bottom-to-pay">
            <div className="left-to-pay">
              <p className='bottom-to-pay-p align-left-pay '>Hyra:</p>
              <p className='bottom-to-pay-p align-left-pay'>Deposition:</p>
              <p className='to-pay-bold align-left-pay'>Totalt:</p>
            </div>
            <div className="right-to-pay">
              <p className='bottom-to-pay-p align-right-pay '> {rentAmount} kr</p>
              <p className='bottom-to-pay-p align-right-pay'>5000 kr</p>
              <p className='to-pay-bold align-right-pay'>{total} kr</p>
            </div>
          </div>
        </div>
        <form className='form-payment' action="" onSubmit={handlePayment}>
          <h4>Betalning</h4>
          <div className="input-group">

            <input className='input-long-payment' type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Namn på bankkortet' />

            <input type="text" className='input-long-payment' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Kortnummer' />
          </div>
          <div className="input-group-row">
            <div className='for-group-row-left'>
              <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder='Utgångsdatum' />

            </div>
            <div className='for-group-row-right'>
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder='Säkerhetskod' />

            </div>
          </div>
          <div className="payment-btn-container">
            {errors.cardName && <p className="error-message">*{errors.cardName}*</p>}
            {errors.cardNumber && <p className="error-message">*{errors.cardNumber}*</p>}
            {errors.cardDate && <p className="error-message">*{errors.cardDate}*</p>}
            {errors.cardCVC && <p className="error-message">*{errors.cardCVC}*</p>}
            <button className='pay-now-btn'>BETALA</button>

          </div>
        </form>
      </div>

    </div>
  )
}

export default ConfirmPayment