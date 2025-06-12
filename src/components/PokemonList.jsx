import { useEffect, useState } from "react";

const generationRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 898],
  9: [899, 1010],
};

function PokemonList({ onSelect, selectedGeneration }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const [start, end] = generationRanges[selectedGeneration];

    async function fetchData() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${end - start + 1}&offset=${start - 1}`
      );
      const data = await res.json();

      const pokemonList = await Promise.all(
        data.results.map(async (p, index) => {
          const id = start + index;

          const detailRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const detailData = await detailRes.json();

          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const speciesData = await speciesRes.json();
          const koreanNameObj = speciesData.names.find(
            (n) => n.language.name === "ko"
          );

          const types = await Promise.all(
            detailData.types.map(async (typeInfo) => {
              const typeRes = await fetch(typeInfo.type.url);
              const typeData = await typeRes.json();
              const koreanType = typeData.names.find(
                (n) => n.language.name === "ko"
              );
              return koreanType?.name ?? typeInfo.type.name;
            })
          );

          const abilities = await Promise.all(
            detailData.abilities.map(async (a) => {
              const res = await fetch(a.ability.url);
              const data = await res.json();
              const ko = data.names.find((n) => n.language.name === "ko");
              return ko?.name ?? a.ability.name;
            })
          );

          const flavor = (() => {
            const entry = speciesData.flavor_text_entries.find(
              (f) => f.language.name === "ko"
            );
            return entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "";
          })();

          return {
            id,
            name: koreanNameObj?.name ?? p.name,
            image: detailData.sprites.front_default,
            types,
            height: detailData.height,
            weight: detailData.weight,
            stats: detailData.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
            abilities,
            flavor,
          };
        })
      );

      setList(pokemonList);
    }

    fetchData();
  }, [selectedGeneration]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {list.map((p) => (
        <button
          key={p.id}
          className="flex flex-col items-center bg-gray-700 p-2 rounded hover:bg-gray-600"
          onClick={() => onSelect(p)}
        >
          <img src={p.image} className="w-16" alt={p.name} />
          <span className="text-sm">#{p.id}</span>
          <span className="capitalize">{p.name}</span>
        </button>
      ))}
    </div>
  );
}

export default PokemonList;
