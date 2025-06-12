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
    <div className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-lg border-2 border-gray-600 min-h-[700px]">
      {/* 이미지 */}
      <div className="bg-gray-800 rounded-lg p-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="mx-auto w-56 drop-shadow-lg"
        />
      </div>

      {/* 이름 + 번호 */}
      <h2 className="text-3xl font-bold mt-4">
        {pokemon.name} <span className="text-gray-400">#{pokemon.id}</span>
      </h2>

      {/* 타입 뱃지 */}
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm rounded-full font-semibold text-white border shadow-sm"
            style={{
              backgroundColor: typeColorMap[type] || "#666",
              borderColor: "#222",
            }}
          >
            {type}
          </span>
        ))}
      </div>

      {/* 키/몸무게 */}
      {(pokemon.height || pokemon.weight) && (
        <p className="mt-2 text-gray-300 text-sm">
          키: {(pokemon.height / 10).toFixed(1)} m · 몸무게:{" "}
          {(pokemon.weight / 10).toFixed(1)} kg
        </p>
      )}

      {/* 능력치 */}
      <div className="mt-4 space-y-2 text-left">
        {pokemon.stats.map((s, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm text-gray-300">
              <span>{statNameMap[s.name] || s.name}</span>
              <span>{s.value}</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded">
              <div
                className="h-full rounded bg-green-500"
                style={{ width: `${Math.min(s.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* 특성 */}
      {pokemon.abilities?.length > 0 && (
        <p className="mt-4 text-sm text-gray-200">
          <span className="font-semibold">특성:</span>{" "}
          {pokemon.abilities.join(", ")}
        </p>
      )}

      {/* 설명문 */}
      {pokemon.flavor && (
        <p className="mt-4 text-base text-gray-300 italic border-t border-gray-700 pt-3 leading-relaxed">
          {pokemon.flavor}
        </p>
      )}
    </div>
  );
}

export default PokedexView;
