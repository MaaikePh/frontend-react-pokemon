import './App.css'
import PokemonCard from './components/PokemonCard.jsx';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [pokemonlist, setPokemonList] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const limit = 20;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchPokemonList(limit = 20, offset = 0) {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                    params: {
                        limit: limit,
                        offset: offset,
                    },
                    signal,
                });
                setPokemonList(response.data.results);
                setHasNext(response.data.next !== null);
            } catch (error) {
                if (axios.isCancel(error) || error.name === 'CanceledError') return;
                console.log(error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchPokemonList(limit, offset);

        return () => {
            controller.abort();
        }
    }, [offset]);

    return (
        <>
            <h1>Gotta catch em all!</h1>

            <div className='buttons'>
                <button onClick={() => setOffset(offset - limit)} disabled={offset === 0}>
                    Vorige
                </button>
                <button onClick={() => setOffset(offset + limit)} disabled={!hasNext}>
                    Volgende
                </button>
            </div>

            {loading && <p>Loading Pokémon...</p>}
            {error && <p>Er ging iets mis bij het laden van de lijst van Pokémon.</p>}

            <div className='pokemon-cards'>
                {pokemonlist.map((pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}
            </div>

        </>
    )
}

export default App