import styled from '@emotion/styled'
import { Typography } from '@mui/joy'
import { NamedAPIResource, Pokemon } from 'pokenode-ts'
import { capitalize, getImageFromSprites } from '../../utils'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pokemonClient } from '../../api';
import PokemonImage from '../PokemonImage'
import FavoriteButton from '../FavoriteButton'

const Card = styled(Link)({
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
    border: '2px solid var(--gull-gray)',
  },
})

const TextContainer = styled.div({
  zIndex: 2,
})

const PokemonListItem = ({ pokemon }: { pokemon: NamedAPIResource | { name: string } }) => {
  const { data } = useQuery<Pokemon>({
    queryKey: ['pokemon', 'item', pokemon.name],
    queryFn: async () => await pokemonClient.getPokemonByName(pokemon.name)
  })

  if (!data) {
    return null
  }

  const name = capitalize(data.name)
  const idPad = String(data.id).padStart(3, '0')

  return (
    <Card to={`/pokemon/${data.name}`}>
      <PokemonImage name={name} src={getImageFromSprites(data.sprites)}>
        <FavoriteButton name={data.name} />
      </PokemonImage>
      <TextContainer>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-md">{idPad}</Typography>
      </TextContainer>
    </Card>
  )
}

export default PokemonListItem