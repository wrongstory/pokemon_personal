import { useState } from "react";
import "./App.css";

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
