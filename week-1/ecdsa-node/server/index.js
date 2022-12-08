const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  bee5d9798de9367e0981e5e4a59d6b0623e89a1d: 100,
  aee98f24fdf778f5833e8f4577f44792625bf8d7: 50,
  "7d2aed07a64da55121eff201e4d7553c0821d4d2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, recoveryBit, sign, hashedMsg } = req.body;

  console.log({ hashedMsg, sign, recoveryBit });

  const publicKey = await secp.recoverPublicKey(hexToBytes(hashedMsg), hexToBytes(sign), recoveryBit);
  const address = toHex(keccak256(publicKey.slice(1)).slice(-20));

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (address !== sender) {
    res.status(400).send({ message: "Access Denied!" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
