import React, { useEffect, useState } from "react";
import "../styles/OverViewBox.css";
import { useAlchemyCore } from "../App";

const OverViewBox = () => {
  const alchemyCore = useAlchemyCore();
  const [rate, setRate] = useState({});
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      setRate(data);
    })();
    async function getOviewViewData() {
      setBlockNumber(await alchemyCore.getBlockNumber());
    }

    getOviewViewData();
  }, [alchemyCore]);

  return (
    <div className="overviewBox">
      <div className="glass">
        <h4>
          ETHER PRICE
          <span className="subInHeader"> ${rate?.USD ?? "No info"}</span>
        </h4>
      </div>
      <div className="glass">
        <h4>
          CURRENT BLOCK
          <span className="subInHeader"> {blockNumber}</span>
        </h4>
      </div>
    </div>
  );
};

export default OverViewBox;
