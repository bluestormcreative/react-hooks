// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'

import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon
} from '../pokemon'

const PokeError = ({ error }) => (
  <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  </div>
);

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('idle')
    if (!pokemonName) {
      return;
    }
    setPokemon(null);

    setStatus('pending');
    fetchPokemon(pokemonName)
    .then(
      pokemonData => {
        setPokemon(pokemonData);
        setStatus('resolved');
      }
    ).catch(err => {
      setError(err);
      setStatus('rejected');
    });
  }, [pokemonName]);

  // if (error !== null) {
  //   return <PokeError error={error} />
  // }

  // if (! pokemonName) {
  //   return 'Submit a pokemon!';
  // }

  // if (pokemonName && pokemon === null) {
  //   return <PokemonInfoFallback name={pokemonName} />
  // }

  // if (pokemon !== null) {
  //   return <PokemonDataView pokemon={pokemon} />
  // }

  switch(status) {
    case 'idle' :
      return 'Submit a pokemon!';

    case 'rejected' :
      return <PokeError error={error} />;

    case 'pending' :
      return <PokemonInfoFallback name={pokemonName} />;

    case 'resolved' :
      return <PokemonDataView pokemon={pokemon} />;

    default :
      return 'Submit a pokemon!';
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
