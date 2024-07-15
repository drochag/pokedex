import styled from "@emotion/styled"
import { ChainLink, EvolutionChain as EvolutionChainType, NamedAPIResource } from "pokenode-ts"
import PokemonImage from "../PokemonImage"
import { Link } from "react-router-dom"
import { Skeleton } from "@mui/joy"
import { getImageFromSprites } from "../../utils"
import { usePokemonAndSpecies } from "../../utils/hooks"

const flattenChain = (chain: ChainLink): NamedAPIResource[] => {
  const result = []

  result.push(chain.species)
  chain.evolves_to.forEach(e => result.push(...flattenChain(e)))

  return result
}

const EvolutionImageContainer = styled(Link)((props) => ({
  display: 'inline-flex',
  height: '5rem',
  width: '5rem',
  marginRight: '0.5rem',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '1rem',
  padding: '0.5rem',
  justifyContent: 'center',
  border: `2px solid rgb(from ${props.color} r g b / 30%)`,
}))

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

const EvolutionImageWithInfo = ({ id, isCurrent }: { id: number, name: string, isCurrent: boolean }) => {
  const { pokemon, isLoading, species } = usePokemonAndSpecies({ id })

  if (isLoading) {
    return (
      <EvolutionImageContainer to={`/pokemon/${id}`}>
        <StyledSkeleton variant="rectangular" animation="wave" width="4rem" height="4rem" />
      </EvolutionImageContainer>
    )
  }

  const src = getImageFromSprites(pokemon!.sprites)
  const color = species!.color.name
  return (
    <EvolutionImageContainer to={`/pokemon/${id}`} color={color}>
      {isLoading ? (
        <StyledSkeleton variant="rectangular" animation="wave" width="4rem" height="4rem" />
      ) : (
        <StyledPokemonImage name={pokemon!.name} isCurrent={isCurrent} size="small" id={pokemon!.id} src={src} color={color} />
      )}
    </EvolutionImageContainer>
  )
}

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

  const chain = flattenChain(evolutionChain.chain)

  return (
    <EvolutionChainOuterContainer>
      <EvolutionChainContainer evolutions={chain.length + 1}>
        {chain.map(pokemon => (
          <EvolutionImageWithInfo
            key={pokemon.name}
            id={parseInt(pokemon.url.split(/\/pokemon-species\//)[1].replace(/\//g, ''))}
            name={pokemon.name}
            isCurrent={pokemon.name === refName} />
        ))}
      </EvolutionChainContainer>
    </EvolutionChainOuterContainer>
  )
}

export default EvolutionChain
