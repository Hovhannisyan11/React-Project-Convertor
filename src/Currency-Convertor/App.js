import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [rates,setRates] = useState({});
  const [fromCurrency,setFromCurrency] = useState('AMD');
  const [fromPrice,setFromPrice] = useState(0);
  const [toCurrency,setToCurrency] = useState('USD');
  const [toPrice,setToPrice] = useState(0)


  useEffect(()=>{
   fetch(`https://www.cbr-xml-daily.ru/latest.js`)
   .then((res)=>res.json())
   .then((json)=>{
    setRates(json.rates);
    console.log(json.rates);
   }).catch((err)=>{
     console.warn(err);
     alert('Не удалось получить информацию')
   })

  },[]);



  const onChangeFromPrice = (value)=>{
     
    const price = (value / rates[fromCurrency])
    const result = price * rates[toCurrency]

   setToPrice(result.toFixed(2));
   setFromPrice(value);
   
  };


  const onChangeToPrice = (value)=>{
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setToPrice(value)
    setFromPrice(result.toFixed(2))
  };


  useEffect(()=>{
    onChangeFromPrice(fromPrice);
  },[fromCurrency])



  // useEffect(()=>{
  //   onChangeToPrice(toPrice)
  // },[toCurrency])


  return (
    <div className="App">
      <Block onChangeValue={onChangeFromPrice} value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block onChangeValue = {onChangeToPrice}  value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
