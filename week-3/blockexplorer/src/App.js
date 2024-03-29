import { Alchemy, Network } from "alchemy-sdk";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createContext, useContext } from "react";

import "./App.css";
import Home from "./components/Home";
import BlockPage from "./components/BlockPage";
import TransactionPage from "./components/TransactionPage";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

/* ------- Context API -------- */
const AlchemyCore = createContext();
export const useAlchemyCore = () => useContext(AlchemyCore);

function App() {
  return (
    <AlchemyCore.Provider value={alchemy.core}>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/block/:blockHash" exact>
              <BlockPage />
            </Route>
            <Route path="/transaction/:transactionHash" exact>
              <TransactionPage />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AlchemyCore.Provider>
  );
}

export default App;
