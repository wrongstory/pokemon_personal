import { useEffect, useState } from "react";
import PokedexView from "./components/PokedexView";
import PokemonList from "./components/PokemonList";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-1/2 p-4 border-r border-gray-600 flex items-center justify-center">
        <PokedexView pokemon={selectedPokemon} />
      </div>
      <div className="w-1/2 p-4 overflow-y-scroll">
        <PokemonList onSelect={setSelectedPokemon} />
      </div>
    </div>
  );
}

export default App;
