import React from 'react'
import './header.scss';

const Header = ({ currencies }) => {
  return (
    <header className='header'>
      <div className="currencies">
        {currencies.map(currency => (
          <div key={currency.cc} className="currency" >
            <div className="currency__body">
              <h3 className="currency__body__name">{`${currency.cc}/UA`}</h3>
              <p className="currency__body__price">{currency.rate}</p>
            </div>
            <span>{`${currency.txt}/гривня`}</span>
          </div>
        ))}
      </div>
    </header >
  )
}

export default Header
