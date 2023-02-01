import React from "react";
import "./../styles/SearchBox.css";

const SearchBox = () => {

  const searchAction = (e) => {
    e.preventDefault();
    const target = e.target;
    const input = target.hashId.value;
    const type = target.type.value;
    console.log(input, type); 
  }

  return (
    <form onSubmit={searchAction} className="search-box">
      <div>
        <input
          type="text"
          name="hashId"
          id="inputField"
          placeholder="Enter a Txn hash/Block no."
        />
        <input type="submit" value="Search" />
      </div>
      <div className="search-option">
        <div>
          <input
            type="radio"
            name="type"
            id="transaction"
            checked
            value="transaction"
          />
          <label htmlFor="transaction">Transaction</label>
        </div>
        <div>
          <input type="radio" name="type" id="block" value="block" />
          <label htmlFor="block">Block</label>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
