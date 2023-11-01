import React from 'react'
import ApplyComponent from '../components/applyComponent/ApplyComponent'
import { useParams } from 'react-router';
import { useState } from 'react';
import { Apartement } from '../typescriptHelpers/apartements';
import { useEffect } from 'react';

const Apply = () => {
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
      <ApplyComponent apartement={apartement} />
    </div>
  )
}

export default Apply