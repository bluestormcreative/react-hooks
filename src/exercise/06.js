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
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI\
      return <PokeError error={this.state.error} />;
    }

    return this.props.children;
  }
}

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

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
