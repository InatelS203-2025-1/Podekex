import imgPokemon from "../../assets/pokemon-desconhecido-icon.png"

function PokemonCard({ id, original_name, name, viewed, on_deck, image, onClick, showUnknown }) {
  if (!viewed && !showUnknown) return null;

  return (
    <div
      className={`rounded-lg shadow p-4 flex flex-col items-center cursor-pointer transition hover:scale-105 ${
        viewed ? "bg-white" :  "bg-gray-200"
      } ${on_deck ? "ring-4 ring-yellow-400" : ""}`}
      onClick={() => viewed && onClick?.()}
      title={viewed ? `Clique para ver ${original_name}` : "Pokémon ainda não visto"}
    >
      <div className="w-20 h-20 mb-2">
        {viewed ? (
          <img src={image} alt={name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full  animate-pulse rounded-full">
            <img src={imgPokemon} alt="pokemon desconhecido" className="w-full h-full object-contain"/>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-center"> {viewed ? original_name : "Desconhecido"} </p>
    </div>
  );
}

export default PokemonCard;
