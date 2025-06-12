function PokedexView({ pokemon }) {
  if (!pokemon) return <p>포켓몬을 선택하세요.</p>;

  return (
    <div className="text-center">
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-48" />
      <h2 className="text-2xl mt-4">{pokemon.name}</h2>
      <p>번호: #{pokemon.id}</p>
      <p>타입: {pokemon.types.join(", ")}</p>
    </div>
  );
}

export default PokedexView;
