import { useQuery } from "@tanstack/react-query";
import { getPokemon, getSpecies } from "../api";
import { Pokemon, PokemonSpecies } from "pokenode-ts";

type UsePokemonAndSpeciesHook = { id?: number, url?: string, pokemon?: Pokemon };

type UsePokemonAndSpeciesProps = {
  pokemon?: Pokemon;
  species?: PokemonSpecies;
  isLoading: boolean;
};

export const usePokemonAndSpecies = ({ id, url, pokemon: pokemonProp }: UsePokemonAndSpeciesHook): UsePokemonAndSpeciesProps => {
  const pokemonId = pokemonProp?.id || id || parseInt(url?.split(/\/pokemon\//)[1].replace(/\//g, '') || '')

  if (!pokemonId) {
    throw new Error('id or url is required')
  }

  const { data: pokemon, isLoading: isLoadingPokemon, isError: isPokemonError } = useQuery({
    queryKey: ['pokemon', pokemonId!],
    queryFn: () => getPokemon(pokemonId),
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

  return { pokemon, species, isLoading: isLoadingPokemon || isLoadingSpecies };
};