/*
http://localhost:3000/references/_build
*/
import React from 'react';

const triplePrice = (price: number): number => {
  return price * 3;
};

enum FruitPrices {
  applePrice = 10,
  peachPrice = 5 * applePrice,
  bananaPrice = triplePrice(2)
}
const Example: React.FC = () => {

  const fruitOne = FruitPrices.applePrice;
  const fruitTwo = FruitPrices.peachPrice;

  let pageContent;

  return (
    <>
      <div style={{ padding: '10px;' }}>
        <h1>ENum</h1>
        {pageContent}
        {fruitOne}<br/>
        {fruitTwo}<br/>
        {FruitPrices.bananaPrice}<br/>
        {FruitPrices.peachPrice}<br/>
      </div>
    </>
  );
};

export default Example;
