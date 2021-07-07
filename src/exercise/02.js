// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useState, useEffect } from 'react'

function useLocalStorageState(key, defaultValue = '') {
  const loadValue = () => window.localStorage.getItem(key) || defaultValue;
  const [initialValue, setInitialValue] = useState(loadValue);

  useEffect(() => {
    window.localStorage.setItem(key, initialValue);
  }, [key, initialValue]);

  return [initialValue, setInitialValue];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Bjork" />
}

export default App
