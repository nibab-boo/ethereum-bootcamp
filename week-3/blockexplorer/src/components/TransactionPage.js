import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAlchemyCore } from "../App";

const TransactionPage = () => {
  const alchemyCore = useAlchemyCore();
  const { transactionHash } = useParams();
  const [transactionInfo, setTransactionInfo] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setTransactionInfo(
          await alchemyCore.getTransactionReceipt(transactionHash)
        );
        setError(false);
      } catch {
        setError(true);
      }
    })();
  }, [alchemyCore, transactionHash]);

  if (error) return <div>Error Found</div>;

  if (!transactionInfo?.transactionHash) return <div>Block Not Found</div>;

  return (
    <div>
      <h3>
        Transaction Page:{" "}
        <strong className="subInHeader">
          {transactionInfo.transactionHash}
        </strong>
        ({transactionInfo.transactionIndex}) in block{" "}
        <em>
          <Link to={`/block/${transactionInfo.blockHash}`}>
            {transactionInfo.blockHash}
          </Link>
        </em>
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
            From:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {transactionInfo.from}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            To:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {transactionInfo.to}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
          Contract Address:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {transactionInfo.contractAddress ?? 'null'}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
            Gas used:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {transactionInfo.gasUsed.toString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ width: "300px", maxWidth: "30%", textAlign: "left" }}>
          Effective Gas Price:
          </div>
          <div style={{ width: "auto", maxWidth: "100%" }}>
            {transactionInfo.effectiveGasPrice.toString() + " wei"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
