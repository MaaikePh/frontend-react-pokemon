import './App.css'
import PokemonCard from './components/PokemonCard.jsx';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [pokemonlist, setPokemonList] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemonList() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                setPokemonList(response.data.results);
            } catch (error) {
                console.log(error);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchPokemonList();
    }, [])


    return (
        <>
            <h1>Gotta catch em all!</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het laden van de lijst.</p>}

            <div className='pokemon-cards'>
                {pokemonlist.map((pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}


                {/*<PokemonCard name='jigglypuff'/>*/}
                {/*<PokemonCard name='ditto' />*/}
            </div>

        </>
    )
}

export default App
