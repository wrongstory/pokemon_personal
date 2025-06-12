import { useEffect, useState } from "react";

function PokemonList({ onSelect }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const pokemonList = await Promise.all(
        data.results.map(async (p, index) => {
          const id = index + 1;

          // 한글 이름으로 교체
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const speciesData = await speciesRes.json();
          const koreanNameObj = speciesData.names.find(
            (e) => e.language.name === "ko"
          );
          return {
            id,
            name: koreanNameObj ? koreanNameObj.name : p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        })
      );
      setList(pokemonList);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {list.map((p) => (
        <button
          key={p.id}
          className="flex flex-col items-center bg-gray-700 p-2 rounded hover:bg-gray-600"
          onClick={() =>
            onSelect({
              id: p.id,
              name: p.name,
              image: p.image,
              types: ["???"], // 추후 상세 fetch로 변경 가능
            })
          }
        >
          <img src={p.image} className="w-16" />
          <span className="text-sm">#{p.id}</span>
          <span className="capitalize">{p.name}</span>
        </button>
      ))}
    </div>
  );
}

export default PokemonList;
