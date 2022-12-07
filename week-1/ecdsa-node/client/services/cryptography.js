import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import {sign} from "ethereum-cryptography/secp256k1";

const signMessage = async (message, privateKey) => {
  const hashedMsg = keccak256(utf8ToBytes(message));
  // { recoverd: true } returns [Signature, RecoveryBit]
  const signInfo = await sign(hashedMsg, privateKey, { recovered: true });
  return { hashedMsg, signInfo };
};

export { signMessage };
