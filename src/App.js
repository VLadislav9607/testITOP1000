import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrencyBlock from './components/CurrencyBlock';
import './scss/app.scss';

function App() {

  const [currencies, setCurrencies] = React.useState([]);
  const [valueInputFrom, setValueInputFrom] = React.useState();
  const [valueInputTo, setValueInputTo] = React.useState();
  const [selectCurrencyFrom, setSelectCurrencyFrom] = React.useState('UA');
  const [selectCurrencyTo, setSelectCurrencyTo] = React.useState('USD');

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const currencyUSD = data.filter(currency => currency.cc === 'USD');
        const currencyEUR = data.filter(currency => currency.cc === 'EUR');
        setCurrencies([...currencyUSD, ...currencyEUR]);

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, []);

  React.useEffect(() => {
  }, [selectCurrencyFrom, selectCurrencyTo])

  const findCurrencyFrom = currencies.filter(obj => obj.cc === selectCurrencyTo);
  const findCurrencyTo = currencies.filter(obj => obj.cc === selectCurrencyFrom);

  const onChangeInputFrom = (value) => {
    setValueInputFrom(value);

    if (selectCurrencyFrom === selectCurrencyTo) {
      return setValueInputTo(value);
    }

    if (findCurrencyFrom.length) {
      if (!findCurrencyTo.length) {
        return setValueInputTo(((1 / findCurrencyFrom[0].rate) * value).toFixed(3));
      }
      return setValueInputTo(((findCurrencyTo[0].rate / findCurrencyFrom[0].rate) * value).toFixed(3));
    }

    if (findCurrencyTo.length) {
      return setValueInputTo(((findCurrencyTo[0].rate / findCurrencyFrom[0].rate) * value).toFixed(3));
    }
  }

  const onChangeInputTo = ((value) => {
    setValueInputTo(value);

    if (selectCurrencyFrom === selectCurrencyTo) {
      return setValueInputFrom(value);
    }

    if (findCurrencyFrom.length) {
      if (!findCurrencyTo.length) {
        return setValueInputFrom(((value * findCurrencyFrom[0].rate)).toFixed(3));
      }
      return setValueInputFrom(((findCurrencyTo[0].rate / findCurrencyFrom[0].rate) * value).toFixed(3));
    }

    if (findCurrencyTo.length) {
      return setValueInputFrom(((1 / findCurrencyTo[0].rate) * value).toFixed(3));
    }
  })

  return (
    <div className="app">
      <Header currencies={currencies} />
      <div className="converter">
        <CurrencyBlock value={valueInputFrom} setSelectCurrency={setSelectCurrencyFrom} onChangeInput={onChangeInputFrom} selectCurrency={selectCurrencyFrom} />
        <CurrencyBlock value={valueInputTo} setSelectCurrency={setSelectCurrencyTo} onChangeInput={onChangeInputTo} selectCurrency={selectCurrencyTo} />
      </div>
    </div>
  );
}

export default App;
