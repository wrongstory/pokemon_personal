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

          // 포켓몬 상세 정보 가져오기
          const detailRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const detailData = await detailRes.json();

          // 포켓몬 이름 한글로 가져오기
          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const speciesData = await speciesRes.json();
          const koreanNameObj = speciesData.names.find(
            (e) => e.language.name === "ko"
          );

          // 타입 이름들
          const types = await Promise.all(
            detailData.types.map(async (typeInfo) => {
              try {
                const typeRes = await fetch(typeInfo.type.url);
                const typeData = await typeRes.json();
                const koreanType = typeData.names.find(
                  (n) => n.language.name === "ko"
                );
                return koreanType?.name ?? "???";
              } catch (e) {
                console.error("타입 가져오기 실패:", e);
                return "???";
              }
            })
          );

          return {
            id,
            name: koreanNameObj ? koreanNameObj.name : p.name,
            image: detailData.sprites.front_default,
            types,
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
              types: p.types, // 추후 상세 fetch로 변경 가능
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
