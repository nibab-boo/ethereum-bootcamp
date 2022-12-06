import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Signature from "./Signature";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [hashedMsg, setHashMsg] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Signature hashedMsg={hashedMsg} setHashMsg={setHashMsg} signature={signature} setSignature={setSignature} />
      <Transfer setBalance={setBalance} address={address} hashedMsg={hashedMsg} setHashMsg={setHashMsg} signature={signature} setSignature={setSignature} />
    </div>
  );
}

export default App;
