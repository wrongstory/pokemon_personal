const typeColorMap = {
  노말: "#A8A77A",
  불꽃: "#EE8130",
  물: "#6390F0",
  풀: "#7AC74C",
  전기: "#F7D02C",
  얼음: "#96D9D6",
  격투: "#C22E28",
  독: "#A33EA1",
  땅: "#E2BF65",
  비행: "#A98FF3",
  에스퍼: "#F95587",
  벌레: "#A6B91A",
  바위: "#B6A136",
  고스트: "#735797",
  드래곤: "#6F35FC",
  악: "#705746",
  강철: "#B7B7CE",
  페어리: "#D685AD",
};

const statNameMap = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

function PokedexView({ pokemon }) {
  if (!pokemon) return <p className="text-center mt-8">포켓몬을 선택하세요.</p>;

  return (
    <div className="text-center text-sm">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-40 h-40 object-contain drop-shadow"
      />
      <h2 className="text-xl font-bold mt-2">
        {pokemon.name} <span className="text-gray-400">#{pokemon.id}</span>
      </h2>

      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs rounded-full font-semibold text-white border shadow-sm"
            style={{ backgroundColor: typeColorMap[type] || "#999" }}
          >
            {type}
          </span>
        ))}
      </div>

      {(pokemon.height || pokemon.weight) && (
        <p className="mt-2 text-gray-300 text-xs">
          키: {(pokemon.height / 10).toFixed(1)} m · 몸무게:{" "}
          {(pokemon.weight / 10).toFixed(1)} kg
        </p>
      )}

      <div className="mt-2 space-y-1 text-left">
        {pokemon.stats.map((s, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs text-gray-300">
              <span>{statNameMap[s.name] || s.name}</span>
              <span>{s.value}</span>
            </div>
            <div className="w-full h-1 bg-gray-700 rounded">
              <div
                className="h-full rounded bg-green-500"
                style={{ width: `${Math.min(s.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {pokemon.abilities?.length > 0 && (
        <p className="mt-2 text-xs text-gray-200">
          <span className="font-semibold">특성:</span>{" "}
          {pokemon.abilities.join(", ")}
        </p>
      )}

      {pokemon.flavor && (
        <p className="mt-2 text-[13px] text-gray-100 font-medium leading-snug">
          {pokemon.flavor}
        </p>
      )}
    </div>
  );
}

export default PokedexView;
