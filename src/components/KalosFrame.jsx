import PokedexView from "./PokedexView";

function KalosFrame({ selectedPokemon, setSelectedGeneration }) {
  return (
    <div className="relative w-[460px] h-[760px] bg-[#c62828] rounded-[30px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_10px_25px_rgba(0,0,0,0.5)] border-[6px] border-[#7f0000] p-5 flex flex-col justify-between">
      {/* 상단: 도감명 + 찜 버튼 */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white tracking-widest">
          Kalos Pokédex
        </h2>
        <button
          className="w-10 h-10 bg-white rounded-full text-red-600 font-bold shadow-lg hover:scale-105 transition"
          onClick={() => alert("찜 기능은 추후 추가됩니다")}
        >
          ♥
        </button>
      </div>

      {/* 화면 테두리 + 내부 디스플레이 */}
      <div className="relative flex-1 bg-gradient-to-br from-gray-900 to-black rounded-2xl border-4 border-gray-600 shadow-inner overflow-hidden">
        <div className="absolute inset-0 p-4 overflow-auto">
          <PokedexView pokemon={selectedPokemon} />
        </div>
      </div>

      {/* 하단 버튼 패널 */}
      <div className="mt-5 flex justify-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full shadow-md hover:bg-yellow-300 hover:scale-105 transition"
            onClick={() => setSelectedGeneration(gen)}
          >
            {gen}세대
          </button>
        ))}
      </div>
    </div>
  );
}

export default KalosFrame;
