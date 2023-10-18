import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Detailshouse from '../components/detailshousecomponent/Detailshouse';
import { Apartement } from '../typescriptHelpers/apartements';

const Housedetails = () => {
  const { id } = useParams(); // to get id from the URL

  const [apartement, setApartement] = useState<Apartement | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9998/api/apartement/${id}`)
      .then(response => response.json())
      .then(data => {
        setApartement(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div>
      <Detailshouse apartement={apartement} />
    </div>
  );
}

export default Housedetails;
