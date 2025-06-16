import { useState } from "react";

import PokemonList from "./components/PokemonList";
import KalosFrame from "./components/KalosFrame";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState(1);

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-1/2 flex items-center justify-center">
        <KalosFrame
          selectedPokemon={selectedPokemon}
          setSelectedGeneration={setSelectedGeneration}
        />
      </div>
      <div className="w-1/2 p-4 overflow-y-scroll">
        <PokemonList
          onSelect={setSelectedPokemon}
          selectedGeneration={selectedGeneration}
        />
      </div>
    </div>
  );
}

export default App;
