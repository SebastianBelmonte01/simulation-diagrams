import React from 'react';
import './input.css';

const Input = ({message, onChange}) => {
  return (
    <div className="container__input">
        <label htmlFor="input" className="--bold">{message}</label>
        <input type="number" placeholder={message} onChange={onChange} className="__input"/>
    </div>
  )
}

export default Input