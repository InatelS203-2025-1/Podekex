import imgPokemon from "../../assets/pokemon-desconhecido-icon.png";

function PokemonCard({ id, original_name, name, viewed, on_deck, image, onClick, toggleDeck, showUnknown, showIdOption }) {
  if (!viewed && !showUnknown) return null;

  const showId = (showIdOption === "all") || (showIdOption === "viewed" && viewed);

  return (
    <div
      className={`relative rounded-lg shadow p-4 flex flex-col items-center cursor-pointer transition hover:scale-105 ${
        viewed ? "bg-white" : "bg-gray-200"
      } ${on_deck ? "ring-4 ring-yellow-400" : ""}`}
      onClick={onClick}
      title={viewed ? `Clique para ver ${original_name}` : "Pokémon ainda não visto"}
    >
      {showId && (
        <span className="absolute top-1 left-1 text-xs font-semibold text-gray-400">
          #{id}
        </span>
      )}
      <div className="w-20 h-20 mb-2">
        {viewed ? (
          <img src={image} alt={name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full animate-pulse rounded-full">
            <img src={imgPokemon} alt="pokemon desconhecido" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-center">
        {viewed ? original_name : "Desconhecido"}
      </p>
      {viewed && (
        <button
          className={`mt-2 text-xs px-2 py-1 rounded ${on_deck ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDeck();
          }}
        >
          {on_deck ? "Remover do Baralho" : "Adicionar ao Baralho"}
        </button>
      )}
    </div>
  );
}

export default PokemonCard;