import styled from '@emotion/styled'
import { Skeleton, Typography } from '@mui/joy'
import { capitalize, getImageFromSprites } from '../../utils'
import { Link, LinkProps } from 'react-router-dom'
import PokemonImage from '../PokemonImage'
import FavoriteButton from '../FavoriteButton'
import { usePokemonAndSpecies } from '../../utils/hooks'

const Card = styled(({ color, ...props }: { color: string } & LinkProps) => <Link {...props} />)(props => ({
  minHeight: '14rem',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  overflow: 'hidden',
  borderRadius: '1rem',
  padding: '1rem',
  textAlign: 'center',
  textDecoration: 'none',
  height: '100%',
  boxSizing: 'border-box',
  border: '2px solid var(--main-background)',
  color: 'var(--text-primary)',
  '&:hover': {
    border: `2px solid ${props.color}`,
  },
}))

const TextContainer = styled.div({
  zIndex: 2,
})

const PokemonListItem = ({ id, url }: { id: number, url?: string }) => {
  if (!id && !url) {
    throw new Error('id or url is required')
  }

  const { isLoading, pokemon, species } = usePokemonAndSpecies({ id, url })

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" height="14rem" />
    )
  }

  if (!pokemon || !species) {
    return null
  }

  let bgColor = 'var(--solitude)'
  if (species) {
    bgColor = `var(--pokemon-color-${species.color.name})`
  }

  const name = capitalize(pokemon.name || '')
  const idPad = String(pokemon.id).padStart(3, '0')

  return (
    <Card to={`/pokemon/${pokemon.id}`} color={bgColor}>
      <PokemonImage color={bgColor} id={pokemon.id} name={name} src={getImageFromSprites(pokemon.sprites)}>
        <FavoriteButton id={pokemon.id} />
      </PokemonImage>
      <TextContainer>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-md">{idPad}</Typography>
      </TextContainer>
    </Card>
  )
}

export default PokemonListItem