import React from 'react';
import { useHttp } from '../hooks/useHttp';

const useCurrencyServices = () => {
  const { dataCurrency } = useHttp();
  const _ApiCurrency = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  const getCurrency = async () => {
    const res = await dataCurrency(_ApiCurrency);
    const currencyUSD = res.filter(currency => currency.cc === 'USD');
    const currencyEUR = res.filter(currency => currency.cc === 'EUR');

    return [[...currencyUSD, ...currencyEUR], {USD: currencyUSD[0].rate, EUR: currencyEUR[0].rate}];
  }


  return { getCurrency }
}

export default useCurrencyServices
