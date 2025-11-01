import './App.css'
import PokemonCard from './components/PokemonCard.jsx';

function App() {

    return (
        <>
            <h1>Gotta catch em all!</h1>
            <div className='pokemon-cards'>
                <PokemonCard name='jigglypuff'/>
                <PokemonCard name='ditto' />
            </div>

        </>
    )
}

export default App
