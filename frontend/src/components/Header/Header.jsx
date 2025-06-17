// frontend/src/components/Header/Header.jsx
function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-center sm:text-left mb-2 sm:mb-0">
          Podékex
        </h1>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="px-4 py-2 rounded text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;