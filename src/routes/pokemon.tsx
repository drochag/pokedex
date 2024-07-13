import { useQuery } from "@tanstack/react-query";
import { Pokemon as PokemonType } from "pokenode-ts";
import { useParams } from "react-router-dom";
import { evolutionClient, pokemonClient } from "../api";
import PokemonDetail from "../components/PokemonDetail";
import EvolutionChain from "../components/EvolutionChain";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/joy";
import TypeBullet from "../components/TypeBullet";

const StyledSkeleton = styled(Skeleton)({
  width: '2rem',
  height: '0.5rem',
})

const TypeBulletsContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
})

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

  const { data: evolutionChain, isLoading: isLoadingEvolutionChain } = useQuery({
    queryKey: ['pokemon', 'evolution-chain', chainId],
    queryFn: async () => await evolutionClient.getEvolutionChainById(parseInt(
      chainId!
    )),
    enabled: !!chainId,
  })

  const { data: form, isLoading: isLoadingForm } = useQuery({
    queryKey: ['pokemon', 'form', name],
    queryFn: async () => isName ? await pokemonClient.getPokemonFormByName(name!) :
      await pokemonClient.getPokemonFormById(parseInt(name!)),
    enabled: isName ? !!name : !!pokemon?.id,
  })

  if (!pokemon) {
    return null
  }


  return (
    <PokemonDetail
      pokemon={pokemon}
      isLoading={isLoadingPokemon}
      types={(
        <TypeBulletsContainer>
          {isLoadingForm ? <StyledSkeleton variant="text" /> : (
            form?.types.map(({ type }) => <TypeBullet key={type.name} type={type.name} />)
          )}
        </TypeBulletsContainer>
      )}
    >
      <EvolutionChain
        refName={pokemon.name}
        evolutionChain={evolutionChain}
        isLoading={isLoadingSpecies || isLoadingEvolutionChain}
      />
    </PokemonDetail>
  )
}

export default Pokemon
