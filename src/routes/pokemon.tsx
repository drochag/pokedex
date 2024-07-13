import { useQuery } from "@tanstack/react-query";
import { Pokemon as PokemonType } from "pokenode-ts";
import { useParams } from "react-router-dom";
import { evolutionClient, pokemonClient } from "../api";
import PokemonDetail from "../components/PokemonDetail";
import EvolutionChain, { EvolutionChainOuterContainer } from "../components/EvolutionChain";

const Pokemon = () => {
  const { name } = useParams();
  const isName = isNaN(parseInt(name!));

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery<PokemonType>({
    queryKey: ['pokemon', 'item', name],
    queryFn: async () => isName ? await pokemonClient.getPokemonByName(name!) :
      await pokemonClient.getPokemonById(parseInt(name!)),
    enabled: !!name,
  })

  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['pokemon', 'evolution-chain', name],
    queryFn: async () => isName ? await pokemonClient.getPokemonSpeciesByName(name!) :
      await pokemonClient.getPokemonSpeciesById(parseInt(name!)),
    enabled: isName ? !!name : !!pokemon?.id,
  })

  const chainId = species?.evolution_chain.url.split(/\/evolution-chain\//)[1].replace(/\//g, '')

  const { data: evolutionChain, isLoading: isLoadingEvolutionChain, isFetched } = useQuery({
    queryKey: ['pokemon', 'evolution-chain', chainId],
    queryFn: async () => await evolutionClient.getEvolutionChainById(parseInt(
      chainId!
    )),
    enabled: !!chainId,
  })

  if (!pokemon) {
    return null
  }

  return (
    <PokemonDetail pokemon={pokemon} isLoading={isLoadingPokemon}>
      <EvolutionChain
        refName={pokemon.name}
        evolutionChain={evolutionChain}
        isLoading={isLoadingSpecies || isLoadingEvolutionChain}
      />
    </PokemonDetail>
  )
}

export default Pokemon
