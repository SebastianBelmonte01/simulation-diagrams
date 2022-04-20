import React from 'react';
import './button.css';

const Button = ({text, onClick}) => {
  return (
    <div>
        <button className="__button" onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button