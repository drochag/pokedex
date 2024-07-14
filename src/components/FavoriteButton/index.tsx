import { IconButton } from "@mui/joy"
import { Star } from '@phosphor-icons/react'
import { useFavoritePokemon } from "../../utils/stores"
import styled from "@emotion/styled"

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  transition: 'background-color 0.15s',
  '&:hover': {
    backgroundColor: 'var(--solitude)',
  },
})

const FavoriteButton = ({ name }: { name: string }) => {
  const favoritePokemon = useFavoritePokemon(state => state.favoritePokemon)
  const toggleFavorite = useFavoritePokemon(state => state.toggleFavorite)

  const isFavorite = favoritePokemon.includes(name)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(name)
  }

  return (
    <StyledIconButton onClick={handleClick}>
      <Star size={32} weight={isFavorite ? 'fill' : 'regular'} fill="gold" />
    </StyledIconButton>
  )
}

export default FavoriteButton
