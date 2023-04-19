import React, { useState, forwardRef, useImperativeHandle } from "react";

const WordList = forwardRef((props, _ref) => {
  const [wordlist, setWordList] = useState({});
  const handleInput = (e, index) => {
    setWordList((prevState) => ({
      ...prevState,
      [index]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  useImperativeHandle(_ref, () => ({
    getWordList: () => {
      //return Object.keys(wordlist).length == 12 ? wordlist : "Invalid Mnemonic";
      return wordlist;
    },
  }));
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 1);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 2);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 3);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 4);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 5);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 6);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 7);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 8);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 9);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 10);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 11);
          }}
        />
        <input
          type="text"
          onInput={(e) => {
            handleInput(e, 12);
          }}
        />
        <button type="submit" disabled={!props.submit}>
          Clear
        </button>
      </form>
    </div>
  );
});

export default WordList;
