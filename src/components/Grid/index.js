import React from 'react';
import Title from '../Title';
import Button from '../Button';
import './grid.css';

const Grid = ({title, src, onClick, buttonText}) => {
  return (
    <div className="grid">
        <div className="grid__title">
            <Title title={title}/>
        </div>
        <img className="grid__image" src={src} alt="imagen" />
        <Button onClick={onClick} text={buttonText}/>
    </div>
  )
}

export default Grid