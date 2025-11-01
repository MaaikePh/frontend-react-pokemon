import './PokemonCard.css';
import {useEffect, useState} from 'react';

function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchPokemon() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const data = await response.json();
                console.log(data)
                setPokemon(data)
            } catch (error) {
                console.error(error)
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchPokemon()
    }, [])


    return (
        <>
            {error && <p>er ging iets mis bij het ophalen van de pokemon</p>}
            {loading && <p>pokemon aan het laden...</p>}

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