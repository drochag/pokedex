import { PokemonClient, EvolutionClient } from 'pokenode-ts';

export const pokemonClient = new PokemonClient();
export const evolutionClient = new EvolutionClient();

export const getPokemon = async ({ id, name }: { id: number, name?: string }) => {
  return name && isNaN(name as unknown as number) ?
    await pokemonClient.getPokemonByName(name) :
    await pokemonClient.getPokemonById(id);
}

export const getSpecies = async (id: number) => {
  return await pokemonClient.getPokemonSpeciesById(id);
}

export const getList = async ({ currentPage, setPages }: { currentPage: number, setPages: (pages: number) => void }) => {
  const response = await pokemonClient.listPokemons((currentPage - 1) * 20, 20)
  setPages(Math.ceil(response.count / 20))
  return response
}

export const getEvolutionChain = async (id: number) => await evolutionClient.getEvolutionChainById(id)