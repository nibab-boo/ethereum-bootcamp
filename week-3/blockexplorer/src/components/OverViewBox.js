import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/OverViewBox.css";

const OverViewBox = ({blockNumber = "No info"}) => {
  const [rate, setRate] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      )
      const data = await res.json();
      console.log("I am inside the call");
      setRate(data);
    })();

  }, []); 
  return (
    <div className="overviewBox">
      <div>
        <h3>ETHER PRICE $ {rate?.USD ?? "No info"}</h3>
      </div>
      <div>
        <h3>CURRENT BLOCK {blockNumber}</h3>
      </div>
    </div>
  );
};

export default OverViewBox;
