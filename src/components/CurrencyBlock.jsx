import React from 'react'

const currencyData = ['UA', 'USD', 'EUR'];

const CurrencyBlock = ({ value, selectCurrency, setSelectCurrency, onChangeInput }) => {

  const onSelectCurrency = (cur) => {
    setSelectCurrency(cur);
    onChangeInput(value, cur);
  }

  return (
    <div className="converter__item">
      <select
        value={selectCurrency}
        onChange={(e) => onSelectCurrency(e.target.value)}
        className="converter__item__select">
        {currencyData.map(obj => (
          <option
            key={obj}
          >
            {obj}
          </option>
        ))}
      </select>
      <input
        className='converter__item__input'
        type="number"
        value={value}
        onChange={(e) => onChangeInput(e.target.value, selectCurrency)}
        placeholder={0}
      />
    </div>
  )
}

export default CurrencyBlock
