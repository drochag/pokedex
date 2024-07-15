import { PokemonClient, EvolutionClient } from 'pokenode-ts';

export const pokemonClient = new PokemonClient();
export const evolutionClient = new EvolutionClient();

export const getPokemon = async (id: number) => {
  return await pokemonClient.getPokemonById(id);
}

export const getSpecies = async (id: number) => {
  return await pokemonClient.getPokemonSpeciesById(id);
}
