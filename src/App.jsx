import { useState } from "react";
import PokedexView from "./components/PokedexView";
import PokemonList from "./components/PokemonList";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div>
      <div>
        <PokedexView pokemon={selectedPokemon} />
      </div>
      <div>
        <PokemonList onSelect={setSelectedPokemon} />
      </div>
    </div>
  );
}

export default App;
