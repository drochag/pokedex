import { IconButton } from "@mui/joy"
import { Star } from '@phosphor-icons/react'
import { useFavoritePokemon } from "../../utils"
import styled from "@emotion/styled"

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  '&:hover': {
    backgroundColor: 'var(--solitude)',
  },
})

const FavoriteButton = ({ name }: { name: string }) => {
  const { favoritePokemon, setFavoritePokemon } = useFavoritePokemon()

  const isFavorite = favoritePokemon.includes(name)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      setFavoritePokemon(favoritePokemon.filter(n => n !== name))
    } else {
      setFavoritePokemon([...favoritePokemon, name])
    }
  }

  return (
    <StyledIconButton onClick={handleClick}>
      <Star size={32} weight={isFavorite ? 'fill' : 'regular'} fill="gold" />
    </StyledIconButton>
  )
}

export default FavoriteButton
