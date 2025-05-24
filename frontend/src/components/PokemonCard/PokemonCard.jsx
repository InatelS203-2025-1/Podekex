import imgPokemon from "../../assets/pokemon-desconhecido-icon.png";

const typeColors = {
  Normal: "bg-gray-400",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
  Ice: "bg-cyan-400",
  Fighting: "bg-red-700",
  Poison: "bg-purple-500",
  Ground: "bg-yellow-600",
  Flying: "bg-blue-300",
  Psychic: "bg-pink-400",
  Bug: "bg-lime-500",
  Rock: "bg-yellow-800",
  Ghost: "bg-indigo-700",
  Dragon: "bg-indigo-500",
  Dark: "bg-stone-700",
  Steel: "bg-gray-500",
  Fairy: "bg-pink-300"
};

function PokemonCard({
  id,
  original_name,
  name,
  viewed,
  on_deck,
  image,
  onClick,
  toggleDeck,
  showUnknown,
  showIdOption,
  type
}) {
  if (!viewed && !showUnknown) return null;

  const showId = (showIdOption === "all") || (showIdOption === "viewed" && viewed);

  return (
    <div
      className={`relative rounded-lg shadow p-4 flex flex-col items-center cursor-pointer transition hover:scale-105 ${
        viewed ? "bg-white" : "bg-gray-200"
      } ${on_deck ? "ring-4 ring-yellow-400" : ""}`}
      onClick={onClick}
      title={viewed ? `Clique para ver ${original_name}` : "Pokémon ainda não visto" }
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {showId && (
        <span className="absolute top-1 left-1 text-xs font-semibold text-gray-400">
          #{id}
        </span>
      )}

      {viewed && (
        <button
          className={`text-xs px-1 py-1 rounded ${on_deck ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDeck();
          }}
        >
          {on_deck ? "Remover do Baralho" : "Adicionar ao Baralho"}
        </button>
      )}

      <div className="w-56 h-56 mb-1" style={{ transform: 'translateZ(0)' }}>
        {viewed ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
            style={{
              imageRendering: 'auto',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform'
            }}
          />
        ) : (
          <div className="w-full h-full animate-pulse rounded-full">
            <img
              src={imgPokemon}
              alt="pokemon desconhecido"
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'auto',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
            />
          </div>
        )}
      </div>

      <p className={`text-lg font-semibold ${viewed ? "text-center" : "w-full text-center mt-8"}`}>
        {viewed ? original_name : "Desconhecido"}
      </p>

      {viewed && type && (
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {type.map((t) => (
            <span
              key={t}
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.9)' }}
              className={`text-white text-[15px] font-semibold px-2 py-1 rounded ${typeColors[t] || "bg-gray-400"}`}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonCard;