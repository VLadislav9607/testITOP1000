import React, { FC } from 'react';
import CurrencyBlock from './components/CurrencyBlock';
import { useSelector, useDispatch } from 'react-redux'
import { setValueInputFrom, setValueInputTo, setSelectCurrencyFrom, setSelectCurrencyTo } from './redux/slices/converterSlice'
import { setCurrencies } from './redux/slices/currenciesSlice'
import useCurrencyServices from './services/useCurrencyServices';
import { RootState } from './redux/store';
import { CurrencyType } from './@types/types';
import './scss/app.scss';

const App: FC = () => {
  const dispatch = useDispatch();
  const { valueInputFrom, valueInputTo, selectCurrencyFrom, selectCurrencyTo } = useSelector((state: RootState) => state.converter);

  const { currencies } = useSelector((state: RootState) => state.currencies);
  const availableCurrency = { ...currencies[1] };
  const { getCurrency } = useCurrencyServices();


  React.useEffect(() => {
    (async function () {
      const data = await getCurrency();
      dispatch(setCurrencies(data));
    })()
  }, []);

  const onChangeInputFrom = (value: any, selectCurrency: string) => {
    dispatch(setValueInputFrom(value));

    const priceFrom = availableCurrency[selectCurrency]
    const priceTo = availableCurrency[selectCurrencyTo]

    if (selectCurrency === selectCurrencyTo) {
      return dispatch(setValueInputTo(value));
    }

    if (selectCurrency === 'UA') {
      return dispatch(setValueInputTo(+(value / priceTo).toFixed(3)));
    }

    if (selectCurrencyTo === 'UA') {      
      return dispatch(setValueInputTo(+(value * priceFrom).toFixed(3)));
    }

    return dispatch(setValueInputTo(+((priceFrom / priceTo) * value).toFixed(3)));
  }

  const onChangeInputTo = (value: any, selectCurrency: string) => {
    setValueInputTo(value);

    const priceFrom = availableCurrency[selectCurrencyFrom]
    const priceTo = availableCurrency[selectCurrency]

    if (selectCurrency === selectCurrencyFrom) {
      return dispatch(setValueInputFrom(value));
    }

    if (selectCurrency === 'UA') {
      return dispatch(setValueInputFrom(+(value / priceFrom).toFixed(3)));
    }

    if (selectCurrencyFrom === 'UA') {
      return dispatch(setValueInputFrom(+(value * priceTo).toFixed(3)));
    }

    return dispatch(setValueInputFrom(+((priceTo / priceFrom) * value).toFixed(3)));
  }

  return (
    <div className="app" >
      <header className='header' >
        <div className="currencies" >
          {currencies[0]?.map((currency: CurrencyType) => (
            <div key={currency.cc} className="currency" >
              <div className="currency__body" >
                <h3 className="currency__body__name" > {`${currency.cc}/UA`} </h3>
                <p className="currency__body__price" > {currency.rate} </p>
              </div>
              < span > {`${currency.txt}/гривня`
              } </span>
            </div>
          ))}
        </div>
      </header >
      < div className="converter" >
        <CurrencyBlock
          value={valueInputFrom}
          setValueInput={setValueInputFrom}
          setSelectCurrency={setSelectCurrencyFrom}
          onChangeInput={onChangeInputFrom}
          selectCurrency={selectCurrencyFrom} />
        <CurrencyBlock
          value={valueInputTo}
          setValueInput={setValueInputTo}
          setSelectCurrency={setSelectCurrencyTo}
          onChangeInput={onChangeInputTo}
          selectCurrency={selectCurrencyTo} />
      </div>
    </div>
  );
}

export default App;
