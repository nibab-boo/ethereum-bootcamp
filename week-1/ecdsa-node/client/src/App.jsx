import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Signature from "./Signature";
import { useEffect } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState(['', '']);
  const [hashedMsg, setHashMsg] = useState("");

  useEffect(() => console.log("Signature from APP :---: ", signature), signature)

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
