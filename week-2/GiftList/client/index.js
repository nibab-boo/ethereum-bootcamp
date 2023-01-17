const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {

  readline.question("Wanna check your gift?? Give me your name.. \n> ", async name => {
    if (!name) {readline.close(); return;};
    name = name.trim();
    const index = niceList.indexOf(name);
    const proof = merkleTree.getProof(index);
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name, proof});
      
      console.log({ gift });
      readline.close();
  })
}

main();