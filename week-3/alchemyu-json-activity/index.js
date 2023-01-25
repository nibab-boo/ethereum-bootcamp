import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ALCHEMY_URL = process.env.ALCHEMY_URL;

// axios.post(ALCHEMY_URL, {
//   jsonrpc: "2.0",
//   id: 0,
//   method: "eth_getBlockByNumber",
//   params: [
//     "0xb443",
//     true
//   ]
// }).then(response => console.log(response.data.result));


axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_blockNumber",
}).then(res => console.log(parseInt(res.data.result, 16)));

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "alchemy_getTransactionReceipts",
  params: [
    {
      blockNumber: "0xb443"
    }
  ]
}).then(res => console.log(res.data))