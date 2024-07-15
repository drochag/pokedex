import { useQuery } from "@tanstack/react-query";
import { Pokemon as PokemonType } from "pokenode-ts";
import { useParams } from "react-router-dom";
import { evolutionClient, pokemonClient } from "../api";
import PokemonDetail from "../components/PokemonDetail";
import EvolutionChain from "../components/EvolutionChain";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/joy";
import TypeBullet from "../components/TypeBullet";
import FavoriteButton from "../components/FavoriteButton";
import { useEvolutionChain, usePokemonAndSpecies } from "../utils/hooks";
import Varieties from "../components/Varieties";

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

  const { pokemon, species, isLoadingPokemon, isLoadingSpecies } = usePokemonAndSpecies({
    ...isName ? { name } : { id: parseInt(name!) },
  })

  const chainId = species?.evolution_chain.url.split(/\/evolution-chain\//)[1].replace(/\//g, '')

  const { data: evolutionChain, isLoading: isLoadingEvolutionChain } = useEvolutionChain({
    ...chainId && { id: parseInt(chainId) }
  })

  if (!pokemon) {
    return null
  }

  console.log(species?.varieties)

  return (
    <PokemonDetail
      pokemon={pokemon}
      isLoading={isLoadingPokemon}
      favoriteButton={(
        <FavoriteButton id={pokemon.id} />
      )}
      types={(
        <TypeBulletsContainer>
          {pokemon.types.map(({ type }) => <TypeBullet key={type.name} type={type.name} />)}
        </TypeBulletsContainer>
      )}
    >
      <EvolutionChain
        refName={pokemon.name}
        evolutionChain={evolutionChain}
        isLoading={isLoadingSpecies || isLoadingEvolutionChain}
      />
      <Varieties varieties={species?.varieties} isLoading={isLoadingSpecies} refName={pokemon.name} />
    </PokemonDetail>
  )
}

export default Pokemon
