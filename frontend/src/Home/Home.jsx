import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import Modal from "../components/Modal/Modal";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import API from "../api/api";

const FILTERS = {
  ALL: "todos",
  VIEWED: "vistos",
  DECK: "baralho",
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showIdOption, setShowIdOption] = useState("all");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    API.get("/pokemons")
      .then(res => setPokemons(res.data.map(p => ({
        ...p,
        image: `https://img.pokemondb.net/sprites/home/normal/${p.name.toLowerCase()}.png`
      }))))
      .catch(err => console.error("Erro ao carregar pokémons", err));
  }, []);

  const filtered = pokemons
    .filter(pokemon => {
      const matchName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchId = pokemon.id.toString().includes(searchTerm);
      const matchesSearch = matchName || matchId;

      if (filter === FILTERS.VIEWED && !pokemon.viewed) return false;
      if (filter === FILTERS.DECK && !pokemon.on_deck) return false;

      return matchesSearch;
    })
    .sort((a, b) => a.id - b.id);

  const markAsSeen = (id) => {
    API.post(`/pokemons/${id}/seen`)
      .then(() => {
        setPokemons(prev => prev.map(p => p.id === id ? { ...p, viewed: true } : p));
      })
      .catch(err => console.error("Erro ao marcar como visto", err));
  };

  const toggleDeck = (id, inDeck) => {
    const method = inDeck ? "delete" : "post";
    API[method](`/pokemons/${id}/deck`)
      .then(() => {
        setPokemons(prev => prev.map(p => p.id === id ? { ...p, on_deck: !inDeck } : p));
      })
      .catch(err => console.error("Erro ao atualizar baralho", err));
  };

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex justify-end mt-1.5 mb-4 px-8">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex justify-center items-center px-3 py-1 bg-gray-100 text-sm font-medium text-gray-700 rounded shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Exibir ID
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
            {[
              { label: "Nenhum", value: "none" },
              { label: "Somente Vistos", value: "viewed" },
              { label: "Todos", value: "all" },
            ].map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-yellow-100" : ""} ${showIdOption === option.value ? "font-bold text-yellow-600" : ""}`}
                    onClick={() => setShowIdOption(option.value)}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>

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
          Baralho
        </button>
      </div>

      <main className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            {...pokemon}
            onClick={() => {
              if (!pokemon.viewed) {
                markAsSeen(pokemon.id);
              }
              setSelectedPokemon(pokemon);
            }}
            toggleDeck={() => toggleDeck(pokemon.id, pokemon.on_deck)}
            showUnknown={filter === FILTERS.ALL}
            showIdOption={showIdOption}
          />
        ))}
      </main>

      <Modal
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />
    </>
  );
}

export default Home;