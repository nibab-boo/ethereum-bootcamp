import { useEffect, useState, useCallback } from "react";
import OverViewBox from "./OverViewBox";
import SearchBox from "./SearchBox";
import { useAlchemyCore } from "../App";
import { Link } from "react-router-dom";

const Home = () => {
  const alchemyCore = useAlchemyCore();
  const [blockList, setBlockList] = useState([]);
  const [baseBlock, setBaseBlock] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);

  const fetchBlock = useCallback(
    async (currentBlock) => {
      let i = 0;
      let list = [];
      while (i < 3) {
        list.push(await alchemyCore.getBlock(currentBlock - i));
        i++;
      }
      setBlockList(list);
    },
    [alchemyCore]
  );

  useEffect(() => {
    (async () => {
      const base = await alchemyCore.getBlockNumber();
      setBaseBlock(base);
      setCurrentBlock(base);
      await fetchBlock(base);
      console.log("Here in a call")
    })();
  }, [alchemyCore, fetchBlock]);

  const changeBase = (num) => {
    setBaseBlock(baseBlock + num);
    // fetchBlock(baseBlock + num);
  };

  return (
    <div>
      <OverViewBox />
      <SearchBox />
      <div style={{ marginTop: "2rem" }}>
        <h4>Latest Blocks</h4>
        <button onClick={() => changeBase(3)} disabled={currentBlock === blockList?.[0]?.number || !blockList.length}>&#708;</button>
        {blockList.map((block) => {
          return block?.hash ? (
            <Link to={`/block/${block?.hash}`}>
              <div
                key={block?.number}
                className="overviewBox"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>{block?.number}</div>
                <div>{block?.transactions.length} Txs</div>
              </div>
            </Link>
          ): <></>
        })}
      </div>
      <br />
      <button onClick={() => changeBase(-3)} disabled={currentBlock === blockList?.[2]?.number || !blockList.length}>&#709;</button>
    </div>
  );
};

export default Home;
