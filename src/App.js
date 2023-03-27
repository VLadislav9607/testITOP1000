import React from 'react';
import CurrencyBlock from './components/CurrencyBlock';
import useCurrencyServices from './services/useCurrencyServices';
import './scss/app.scss';

function App() {
  const [currencies, setCurrencies] = React.useState([]);
  const [valueInputFrom, setValueInputFrom] = React.useState();
  const [valueInputTo, setValueInputTo] = React.useState();
  const [selectCurrencyFrom, setSelectCurrencyFrom] = React.useState('UA');
  const [selectCurrencyTo, setSelectCurrencyTo] = React.useState('USD');

  const { getCurrency } = useCurrencyServices();
  const availableCurrency = {...currencies[1]};

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getCurrency();
        setCurrencies(data);

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, [selectCurrencyFrom, selectCurrencyTo]);


  const onChangeInputFrom = (value, selectCurrency) => {
    setValueInputFrom(value);

    const priceFrom = availableCurrency[selectCurrency]
    const priceTo = availableCurrency[selectCurrencyTo]

    if (selectCurrency === selectCurrencyTo) {
      return setValueInputTo(value);
    }

    if (selectCurrency === 'UA') {
      return setValueInputTo((value / priceTo).toFixed(3));
    }

    if (selectCurrencyTo === 'UA') {
      return setValueInputTo((value * priceFrom).toFixed(3));
    }

    return setValueInputTo(((priceFrom / priceTo) * value).toFixed(3));
  }

  const onChangeInputTo = (value, selectCurrency) => {
    setValueInputTo(value);

    const priceFrom = availableCurrency[selectCurrencyFrom]
    const priceTo = availableCurrency[selectCurrency]

    if (selectCurrency === selectCurrencyFrom) {
      return setValueInputFrom(value);
    }

    if (selectCurrency === 'UA') {
      return setValueInputFrom((value / priceFrom).toFixed(3));
    }

    if (selectCurrencyFrom === 'UA') {
      return setValueInputFrom((value * priceTo).toFixed(3));
    }

    return setValueInputFrom(((priceTo / priceFrom) * value).toFixed(3));
  }

  return (
    <div className="app">
      <header className='header'>
        <div className="currencies">
          {currencies[0]?.map(currency => (
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
      <div className="converter">
        <CurrencyBlock
          value={valueInputFrom}
          setSelectCurrency={setSelectCurrencyFrom}
          onChangeInput={onChangeInputFrom}
          selectCurrency={selectCurrencyFrom} />
        <CurrencyBlock
          value={valueInputTo}
          setSelectCurrency={setSelectCurrencyTo}
          onChangeInput={onChangeInputTo}
          selectCurrency={selectCurrencyTo} />
      </div>
    </div>
  );
}

export default App;
