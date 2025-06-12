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

function PokedexView({ pokemon }) {
  if (!pokemon) return <p className="text-center mt-8">포켓몬을 선택하세요.</p>;

  return (
    <div className="text-center">
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-48" />
      <h2 className="text-2xl mt-4">{pokemon.name}</h2>
      <p>번호: #{pokemon.id}</p>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types?.map((type, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm rounded-full font-bold text-white shadow"
            style={{ backgroundColor: typeColorMap[type] || "#999" }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokedexView;
