function Modal({ isOpen, onClose, pokemon }) {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{pokemon.original_name}</h2>
        <img src={pokemon.image} alt={pokemon.original_name} className="w-24 h-24 mx-auto mb-2" />
        <p><strong>HP:</strong> {pokemon.hp}</p>
        <p><strong>Skill:</strong> {pokemon.skill}</p>
        <p><strong>Type:</strong> {pokemon.type}</p>
        <p className="text-sm mt-2">{pokemon.description}</p>
      </div>
    </div>
  );
}

export default Modal;