// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon
} from '../pokemon'

const PokeError = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function PokemonInfo({pokemonName}) {
  const [pokeState, setPokeState] = useState({
    pokemon: null,
    error: null,
    status: 'idle',
  });

  const { pokemon, error, status } = pokeState;

  useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setPokeState({status: 'pending' });
    fetchPokemon(pokemonName)
    .then(
      pokemonData => {
        setPokeState({status: 'resolved', pokemon: pokemonData});
      }
    ).catch(err => {
      setPokeState({error: err, status: 'rejected'});
    });
  }, [pokemonName]);

  switch(status) {
    case 'idle' :
      return 'Submit a pokemon!';

    case 'rejected' :
      throw error;

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

  function handleErrorReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={PokeError} onReset={handleErrorReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
