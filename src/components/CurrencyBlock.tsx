import React, { FC } from 'react';
import { useDispatch } from 'react-redux'

interface ICurrencyBlockProps {
  value: any,
  selectCurrency: string,
  setSelectCurrency: (currencyName: string) => any,
  onChangeInput: (value: any, cur: string) => void,
  setValueInput: (value: any) => any
}

const CurrencyBlock: FC<ICurrencyBlockProps> = ({ value, selectCurrency, setSelectCurrency, onChangeInput, setValueInput }) => {
  const dispatch = useDispatch();
  const currencyData = ['UA', 'USD', 'EUR'];

  const onSelectCurrency = (cur: string) => {
    dispatch(setSelectCurrency(cur));
    onChangeInput(value, cur);
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    dispatch(setValueInput(value));
    onChangeInput(value, selectCurrency)
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
        type="text"
        value={value}
        onChange={(e) => changeInput(e)}
        placeholder='0'
      />
    </div>
  )
}

export default CurrencyBlock
