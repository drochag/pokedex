import styled from "@emotion/styled"
import { Pokemon } from "pokenode-ts"
import { getImageFromSprites } from "../../utils"
import { PropsWithChildren } from "react"
import { usePokemonAndSpecies } from "../../utils/hooks"
import { Skeleton } from "@mui/joy"

const StyledSkeleton = styled(Skeleton)({
  maxWidth: '20rem',
  maxHeight: '20rem',
  zIndex: 1,
  width: '100%',
  height: '100%',
})

const ImageContainer = styled('div')<{ color?: string }>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px solid ${props.color}`,
}))

const BgImage = styled(({ color, src, ...props }: { color: string, src: string }) => <div {...props} />)(
  (props) => ({
    background: `rgb(from ${props.color} r g b / 50%) url(${props.src})`,
    backgroundSize: 'cover',
    filter: 'blur(50px)',
    transform: 'scale(2)',
    position: 'absolute',
    inset: 0,
    backgroundPosition: 'center',
    zIndex: -1,
    opacity: 0.6
  })
)

const Image = styled.img<{ size: PokemonImageProps['size'] }>(({ size }) => ({
  maxWidth: size === 'large' ? '20rem' : size === 'small' ? '3rem' : '6rem',
  maxHeight: size === 'large' ? '20rem' : size === 'small' ? '3rem' : '6rem',
  zIndex: 1,
  width: '100%',
  height: '100%',
}))

export type PokemonImageProps = {
  name: string
  id: number
  src: string
  color: string
  size?: 'small' | 'normal' | 'large'
  style?: React.CSSProperties
  className?: string
}

const PokemonImage = ({
  color,
  name,
  src,
  size = 'normal',
  style = {},
  className,
  children
}: PropsWithChildren<PokemonImageProps>) => (
  <ImageContainer style={style} className={className}>
    {children}
    <BgImage color={color} src={src} />
    <Image src={src} alt={name} size={size} />
  </ImageContainer>
)

export const PokemonImageContainer = ({ pokemon: pokemonArg, id }: { pokemon?: Pokemon, id?: number }) => {
  const { pokemon, species, isLoading } = usePokemonAndSpecies({ pokemon: pokemonArg, id })

  if (isLoading) {
    return <StyledSkeleton variant="rectangular" animation="wave" width="3rem" height="3rem" />
  }

  if (!pokemon) {
    throw new Error('Pokemon not found')
  }

  if (!species) {
    throw new Error('Species not found')
  }

  return (
    <ImageContainer>
      <PokemonImage
        name={pokemon.name}
        size="large"
        src={getImageFromSprites(pokemon!.sprites)}
        id={pokemon!.id}
        color={species.color.name} />
    </ImageContainer>
  )
}

export default PokemonImage
