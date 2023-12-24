import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(7);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkhmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (specialCharAllowed) str += "~!@#$%^&*()_+`[]{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, specialCharAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    //showing on UI on copy to clipboard select whole text
    passwordRef.current?.select();
    //optionally pass the range you wanted to select
    //passwordRef.current?.setSelectionRange(0, 7);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-700 bg-gray-700 text mt-40">
        <h1 className="text-white text-center my-3">
          React Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Passowrd"
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-red-700"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={7}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length : ({length})</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Numbers {numAllowed}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={specialCharAllowed}
              id="charInput"
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Special Char {specialCharAllowed}</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
