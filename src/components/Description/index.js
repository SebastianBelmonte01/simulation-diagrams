import React from 'react';
import './description.css';

const Description = ({text}) => {
  return (
    <div>
        <p className="description">
            <span className="--bold">Problema: </span>{text}
        </p>
    </div>
  )
}

export default Description