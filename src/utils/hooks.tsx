import { useQuery } from "@tanstack/react-query";
import { getPokemon, getSpecies, getList, getEvolutionChain } from "../api";
import { Pokemon, PokemonSpecies } from "pokenode-ts";

type UsePokemonAndSpeciesHook = { id?: number, url?: string, pokemon?: Pokemon, name?: string };

type UsePokemonAndSpeciesProps = {
  pokemon?: Pokemon;
  species?: PokemonSpecies;
  isLoading: boolean;
  isLoadingPokemon: boolean;
  isLoadingSpecies: boolean;
};

export const useApiList = ({ currentPage, setPages }: { currentPage: number, setPages: (pages: number) => void }) => useQuery({
  queryKey: ['pokemon', 'list', currentPage],
  queryFn: () => getList({ currentPage, setPages }),
})

export const usePokemonAndSpecies = ({ id, name, url, pokemon: pokemonProp }: UsePokemonAndSpeciesHook): UsePokemonAndSpeciesProps => {
  const pokemonId = pokemonProp?.id || id || parseInt(url?.split(/\/pokemon\//)[1].replace(/\//g, '') || '')

  if (!pokemonId && !name) {
    throw new Error('id, name or url is required')
  }

  const { data: pokemon, isLoading: isLoadingPokemon, isError: isPokemonError } = useQuery({
    queryKey: ['pokemon', pokemonId!],
    queryFn: () => getPokemon({ id: pokemonId, name }),
    enabled: !pokemonProp,
  });

  const speciesId = parseInt(pokemon?.species.url.split('pokemon-species\/')[1].replace(/\//g, '')!)

  const { data: species, isLoading: isLoadingSpecies, isError: isSpeciesError } = useQuery({
    queryKey: ['species', speciesId],
    queryFn: () => getSpecies(speciesId),
    enabled: !!speciesId,
  });

  if (isPokemonError || isSpeciesError) {
    throw new Error('Failed to fetch Pokemon or Species')
  }

  return { pokemon, species, isLoading: isLoadingPokemon || isLoadingSpecies, isLoadingPokemon, isLoadingSpecies };
};

export const useEvolutionChain = ({ id }: { id?: number }) => useQuery({
  queryKey: ['pokemon', 'evolution-chain', id],
  queryFn: async () => getEvolutionChain(id!),
  enabled: !!id,
})