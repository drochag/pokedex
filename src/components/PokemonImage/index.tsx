import styled from "@emotion/styled"
import { pokemonClient } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { Pokemon } from "pokenode-ts"
import { getImageFromSprites } from "../../utils"
import { PropsWithChildren } from "react"

const ImageContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const BgImage = styled.div<{ src: string }>(props => ({
  background: Array(2).fill(`url(${props.src})`).join(', '),
  backgroundSize: 'cover',
  filter: 'blur(60px)',
  transform: 'scale(2)',
  position: 'absolute',
  inset: 0,
  backgroundPosition: '25% 25%, 75% 75%',
  backgroundRepeat: 'space',
  zIndex: -1,
  opacity: 0.6
}))

const Image = styled.img<{ size: PokemonImageProps['size'] }>(({ size }) => ({
  maxWidth: size === 'large' ? '20rem' : size === 'small' ? '3rem' : '6rem',
  maxHeight: size === 'large' ? '20rem' : size === 'small' ? '3rem' : '6rem',
  zIndex: 1,
  width: '100%',
  height: '100%',
}))

export type PokemonImageProps = {
  name: string
  src?: string | null
  size?: 'small' | 'normal' | 'large'
  style?: React.CSSProperties
  className?: string
}

const PokemonImage = ({ name, src, size = 'normal', style = {}, className, children }: PropsWithChildren<PokemonImageProps>) => {
  const { data: pokemon, isLoading } = useQuery<Pokemon>({
    queryKey: ['pokemon', 'item', name],
    queryFn: async () => await pokemonClient.getPokemonByName(name.toLocaleLowerCase()),
    enabled: !!name && !src,
  })

  if ((isLoading || !src) && !pokemon) {
    return null
  }

  return (
    <ImageContainer style={style} className={className}>
      {children}
      <BgImage src={src || getImageFromSprites(pokemon!.sprites)} />
      <Image src={src || getImageFromSprites(pokemon!.sprites)} alt={name} size={size} />
    </ImageContainer>
  )
}

export default PokemonImage
