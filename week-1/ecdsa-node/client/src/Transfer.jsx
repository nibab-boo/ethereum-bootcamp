import { useEffect } from "react";
import { useState } from "react";
import server from "./server";

function Transfer({
  address,
  setBalance,
  hashedMsg,
  signature,
  setHashMsg,
  setSignature,
}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recoveryBit, setRecoveryKey] = useState("");
  const [sign, setSign] = useState("");

  useEffect(() => {
    setRecoveryKey(signature?.[1] ?? "");
    setSign(signature?.[0] ?? "");
  }, signature);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        recoveryBit,
        sign,
        hashedMsg,
      });
      setBalance(balance);
    } catch (ex) {
      console.log("error :---: ", ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      {/* Add Signature, recovery bit and hashed message fields */}
      <label>
        Message hash
        <input
          defaultValue={hashedMsg}
          placeholder="Generated info will be displayed here."
          onChange={setValue(setHashMsg)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          defaultValue={recoveryBit}
          placeholder="Generated info will be displayed here."
          onChange={setValue(setRecoveryKey)}
        ></input>
      </label>
      <label>
        Signature
        <input
          defaultValue={sign}
          placeholder="Generated info will be displayed here."
          onChange={setValue(setSign)}
        ></input>
      </label>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
