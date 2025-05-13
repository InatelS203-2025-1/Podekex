import React, { useState } from "react";
import Header from "../components/Header/Header";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import Modal from "../components/Modal/Modal";
import pokemonsData from "../data/pokemons.json";

const FILTERS = {
  ALL: "todos",
  VIEWED: "vistos",
  DECK: "baralho",
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const pokemons = pokemonsData.map((pokemon) => ({
    ...pokemon,
    image: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name.toLowerCase()}.png`,
  }));

  const filtered = pokemons.filter((pokemon) => {
      const matchName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchId = pokemon.id.toString().includes(searchTerm);
      const matchesSearch = matchName || matchId;

      // filtro principal
      if (filter === FILTERS.VIEWED && !pokemon.viewed) return false;
      if (filter === FILTERS.DECK && !pokemon.on_deck) return false;

      return matchesSearch;
    }).sort((a, b) => a.id - b.id); // ordenação por ID

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Filtros */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === FILTERS.ALL ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter(FILTERS.ALL)}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === FILTERS.VIEWED ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter(FILTERS.VIEWED)}
        >
          Vistos
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === FILTERS.DECK ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter(FILTERS.DECK)}
        >
          No Baralho
        </button>
      </div>

      {/* Cards */}
      <main className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            {...pokemon}
            onClick={() => pokemon.viewed && setSelectedPokemon(pokemon)}
            showUnknown={filter === FILTERS.ALL}
          />
        ))}
      </main>

      {/* Modal */}
      <Modal
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />
    </>
  );
}

export default Home;
