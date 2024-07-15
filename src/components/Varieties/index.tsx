import { PokemonSpeciesVariety } from "pokenode-ts"
import { EvolutionChainContainer, EvolutionChainOuterContainer, EvolutionImageWithInfo, StyledSkeleton } from "../EvolutionChain"
import { Typography } from "@mui/joy"

interface VarietiesProps {
  varieties?: PokemonSpeciesVariety[]
  refName: string
  isLoading: boolean
}

const Varieties = ({ varieties, refName, isLoading }: VarietiesProps) => {
  if (isLoading || !varieties) {
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

  if (!isLoading && !varieties.length) {
    return null
  }

  return (
    <>
      <Typography level="h3" component="h2" sx={{ textAlign: 'left', marginTop: 3 }}>Varieties</Typography>
      <EvolutionChainOuterContainer>
        <EvolutionChainContainer evolutions={varieties.length + 1}>
          {varieties.map(({ is_default, pokemon }) => (
            <EvolutionImageWithInfo
              key={pokemon.name}
              id={parseInt(pokemon.url.split(/\/pokemon\//)[1].replace(/\//g, ''))}
              name={pokemon.name}
              isCurrent={pokemon.name === refName} />
          ))}
        </EvolutionChainContainer>
      </EvolutionChainOuterContainer>
    </>
  )
}

export default Varieties
