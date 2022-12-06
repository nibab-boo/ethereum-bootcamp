import React, { memo, useState } from "react";
import { signMessage } from "../services/cryptography";

const Signature = ({setHashMsg, hashedMsg, signature, setSignature}) => {
  const [privateKey, setPrivateKey] = useState("");
  const [msg, setMsg] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const sign = async (e) => {
    e.preventDefault();
    if (!msg || !privateKey) return;
    const { hashedMsg, signInfo } = await signMessage(msg, privateKey);
    setSignature(signInfo);
    setHashMsg(hashedMsg);
  };
  return (
    <form className="container transfer" onSubmit={sign}>
      <h1>Sign Your Signature.</h1>
      <label>
        Message
        <input
          placeholder="Write your message..."
          value={msg}
          onChange={setValue(setMsg)}
        ></input>
      </label>

      <label>
        Private Key
        <input
          placeholder="Enter your private key. (We don't record it)"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Sign the message" />
      <label>
        Message hash
        <input
          disabled
          defaultValue={hashedMsg}
          placeholder="Generated info will be displayed here."
          // value={recoveryBit}
          // onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          disabled
          defaultValue={signature?.[1] ?? ''}
          placeholder="Generated info will be displayed here."
        ></input>
      </label>
      <label>
        Signature
        <input
          disabled
          defaultValue={(signature?.[0]) ?? ''}
          placeholder="Generated info will be displayed here."
        ></input>
      </label>
    </form>
  );
};

export default memo(Signature);
