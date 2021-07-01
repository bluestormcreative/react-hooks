// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useState, useEffect } from 'react'

function useLocalStorageState(defaultName = '') {
  const loadName = () => window.localStorage.getItem('name') || defaultName;
  const [initialName, setInitialName] = useState(loadName);
  setInitialName(window.localStorage.setItem('name', initialName));

  useEffect(() => {
    window.localStorage.setItem('name', initialName);
  }, [initialName]);

  return [initialName, setInitialName];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName);

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
