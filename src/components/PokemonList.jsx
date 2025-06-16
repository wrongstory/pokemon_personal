import { useEffect, useRef, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const cache = useRef({}); // generation → list 캐시

  useEffect(() => {
    const [start, end] = generationRanges[selectedGeneration];

    async function fetchData() {
      if (cache.current[selectedGeneration]) {
        setList(cache.current[selectedGeneration]);
        return;
      }

      setLoading(true);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${end - start + 1}&offset=${start - 1}`
      );
      const data = await res.json();

      const pokemonList = await Promise.all(
        data.results.map(async (p, index) => {
          const id = start + index;

          const [detailRes, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) =>
              r.json()
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((r) =>
              r.json()
            ),
          ]);

          const koreanName =
            speciesRes.names.find((n) => n.language.name === "ko")?.name ??
            p.name;
          const types = await Promise.all(
            detailRes.types.map(async (t) => {
              const typeData = await fetch(t.type.url).then((r) => r.json());
              return (
                typeData.names.find((n) => n.language.name === "ko")?.name ??
                t.type.name
              );
            })
          );

          const abilities = await Promise.all(
            detailRes.abilities.map(async (a) => {
              const abilityData = await fetch(a.ability.url).then((r) =>
                r.json()
              );
              return (
                abilityData.names.find((n) => n.language.name === "ko")?.name ??
                a.ability.name
              );
            })
          );

          const flavor =
            speciesRes.flavor_text_entries
              .find((f) => f.language.name === "ko")
              ?.flavor_text?.replace(/\n|\f/g, " ") ?? "";

          return {
            id,
            name: koreanName,
            image: detailRes.sprites.front_default,
            types,
            height: detailRes.height,
            weight: detailRes.weight,
            stats: detailRes.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
            abilities,
            flavor,
          };
        })
      );

      cache.current[selectedGeneration] = pokemonList;
      setList(pokemonList);
      setLoading(false);
    }

    fetchData();
  }, [selectedGeneration]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-700 h-24 rounded" />
          ))
        : list.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="flex flex-col items-center bg-gray-700 p-2 rounded hover:bg-gray-600"
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
