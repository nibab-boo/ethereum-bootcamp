import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAlchemyCore } from "../App";

const BlockPage = () => {
  const alchemyCore = useAlchemyCore();
  const { blockHash } = useParams();
  const [blockInfo, setBlockInfo] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBlockInfo(await alchemyCore.getBlock(blockHash));
        setError(false);
      } catch (error) {
        setError(true);
      }
    })();
  }, [alchemyCore, blockHash]);

  if (error) return <div>Error Found</div>;

  if (!blockInfo?.hash) return <div>Block Not Found</div>;
  console.log("Block info :---: ", blockInfo);

  return (
    // <div>{JSON.stringify(blockInfo)}</div>
    <div>
      <h3>
        Block: <strong className="subInHeader">{blockInfo.number}</strong>
      </h3>
      <div
        style={{
          padding: "16px 24px",
          border: "2px solid brown",
          marginTop: "16px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: ".6rem",
        }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Block hash:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.hash}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Timestamp:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {new Date(blockInfo.timestamp * 1e3).toLocaleString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Transactions:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.transactions.length} transactions
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Gas limit:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.gasLimit.toString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Gas used:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.gasUsed.toString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Miner:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.miner}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Extra data:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.extraData.toString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Base fee per gas:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {blockInfo.baseFeePerGas.toString() + " wei"}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h4>Latest Blocks</h4>
        {blockInfo?.transactions?.map((transaction, i) => (
          <Link to={`/transaction/${transaction}`}>
            <div
              key={transaction}
              className="overviewBox"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>{i + 1}</div>
              <div>{transaction}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlockPage;
