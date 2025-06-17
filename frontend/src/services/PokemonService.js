// frontend/src/services/PokemonService.js
import API from "../api/api";

const PokemonService = {
  async getAllPokemons() {
    const response = await API.get("/pokemons");
    return response.data;
  },

  async markAsSeen(id) {
    return API.post(`/pokemons/${id}/seen`);
  },

  async toggleDeck(id, inDeck) {
    const method = inDeck ? "delete" : "post";
    return API[method](`/pokemons/${id}/deck`);
  }
};

export default PokemonService;