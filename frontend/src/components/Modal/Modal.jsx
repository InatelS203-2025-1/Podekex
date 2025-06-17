// frontend/src/components/Modal/Modal.jsx
function Modal({ isOpen, onClose, pokemon }) {
  if (!isOpen || !pokemon) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{pokemon.original_name}</h2>
        <img src={pokemon.image} alt={pokemon.original_name} className="w-32 h-32 mx-auto mb-2" />
        <p><strong>HP:</strong> {pokemon.hp}</p>
        <p><strong>Skill:</strong> {pokemon.skill}</p>
        <div className="mt-2">
          <strong>Type:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {pokemon.type.map((t) => (
              <span
                key={t}
                className={`text-white text-xs font-semibold px-2 py-1 rounded ${typeColors[t] || "bg-gray-400"}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm mt-2">{pokemon.description}</p>
      </div>
    </div>
  );
}

export default Modal;