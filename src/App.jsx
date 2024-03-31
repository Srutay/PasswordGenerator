import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const passRef = useRef(null);

  const passgen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*(){}[]';
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passRef.current.select();
    document.execCommand('copy');
    setCopySuccess(true);
  }, []);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false); // Reset copy success after 2 seconds
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  useEffect(() => {
    passgen();
  }, [passgen]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-14  text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password OP Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}
          />
          <button
            className={`outline-none px-3 py-0.5 shrink-0 ${copySuccess ? 'bg-green-700' : 'bg-blue-700'} text-white`}
            onClick={copyPassToClipboard}
          >
          {copySuccess ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Special symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
