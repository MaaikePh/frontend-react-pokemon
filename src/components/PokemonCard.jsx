import './PokemonCard.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchPokemon() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {signal,})
                setPokemon(response.data)
            } catch (error) {
                if (axios.isCancel(error) || error.name === 'CanceledError') return;
                console.error(error)
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchPokemon()

        return () => {
            controller.abort();
        }

    }, [name])


    return (
        <>
            {error && <p>er ging iets mis bij het ophalen van de Pokémon</p>}
            {loading && <p>Pokémon aan het laden...</p>}

            {pokemon?.name && (
                <article>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                        <p>moves: {pokemon.moves.length}</p>
                        <p>weight: {pokemon.weight}</p>
                        <p>Abilities:</p>
                    <ul>
                        {pokemon.abilities?.map((abilities) => (
                            <li key={abilities.ability.name}>
                                {abilities.ability.name}
                            </li>
                        ))}
                    </ul>
                </article>
            )}
        </>
    )
}

export default PokemonCard;