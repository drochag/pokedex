import styled from "@emotion/styled"
import { ChainLink, EvolutionChain as EvolutionChainType, NamedAPIResource } from "pokenode-ts"
import PokemonImage from "../PokemonImage"
import { getImageFromSprites } from "../../utils"
import { Link } from "react-router-dom"
import { Skeleton } from "@mui/joy"

const flattenChain = (chain: ChainLink, refName: string): NamedAPIResource[] => {
  const result = []

  result.push(chain.species)
  chain.evolves_to.forEach(e => result.push(...flattenChain(e, refName)))

  return result
}

const EvolutionImageContainer = styled(Link)({
  display: 'inline-flex',
  height: '5rem',
  width: '5rem',
  marginRight: '0.5rem',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '1rem',
  padding: '0.5rem',
  justifyContent: 'center',
})

const EvolutionChainContainer = styled.div<{ evolutions: number }>(props => ({
  width: `${props.evolutions * 6.5}rem`,
  textAlign: 'left',
}))

export const EvolutionChainOuterContainer = styled.div({
  padding: '1rem',
  maxWidth: '30rem',
  overflow: 'auto',
  margin: '0 auto',
})

type EvolutionChainProps = {
  evolutionChain?: EvolutionChainType
  refName: string
  isLoading?: boolean
}

const StyledPokemonImage = styled(PokemonImage)<{ isCurrent: boolean }>(props => ({
  width: '3rem',
  opacity: props.isCurrent ? 1 : 0.5,
  maxHeight: '100%',
  margin: '0 auto',
  maxWidth: '100%',
}))

const StyledSkeleton = styled(Skeleton)({
  width: '6rem',
  height: '6rem',
  display: 'inline-flex',
  borderRadius: '1rem',
  opacity: 0.4,
  marginRight: '0.5rem',
  verticalAlign: 'bottom',
})

const EvolutionChain = ({ evolutionChain, refName, isLoading }: EvolutionChainProps) => {
  if (isLoading || !evolutionChain) {
    return (
      <EvolutionChainOuterContainer>
        <EvolutionChainContainer evolutions={4}>
          {Array.from(Array(4), (_, i) => (
            <StyledSkeleton key={i} variant="rectangular" animation="wave" width="4rem" height="4rem" />
          ))}
        </EvolutionChainContainer>
      </EvolutionChainOuterContainer>
    )
  }

  const chain = flattenChain(evolutionChain.chain, refName)

  return (
    <EvolutionChainOuterContainer>
      <EvolutionChainContainer evolutions={chain.length + 1}>
        {chain.map(pokemon => (
          <EvolutionImageContainer key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
            <StyledPokemonImage isCurrent={pokemon.name === refName} size="small" name={pokemon.name} />
          </EvolutionImageContainer>
        ))}
      </EvolutionChainContainer>
    </EvolutionChainOuterContainer>
  )
}

export default EvolutionChain
