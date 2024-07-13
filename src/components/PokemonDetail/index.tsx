import { Pokemon as PokemonType } from "pokenode-ts";
import PokemonImage from "../PokemonImage";
import { Container, Skeleton, Typography } from "@mui/joy";
import styled from "@emotion/styled";
import { capitalize, getImageFromSprites } from "../../utils";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FC, PropsWithChildren } from "react";

export interface PokemonProps {
  pokemon: PokemonType;
  isLoading?: boolean;
}

const ImageContainer = styled.div({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '1rem',
  maxWidth: '30rem',
  maxHeight: '30rem',
  width: '100%',
  margin: '0 auto',
  padding: '3rem',
  boxSizing: 'border-box',
})

const Name = styled.h1({
  position: 'relative',
  marginBottom: 0,
})

const StyledLink = styled(Link)({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  textDecoration: 'none',
  color: 'var(--neutral)',
  borderRadius: '0.75rem',
  padding: '0.5rem',
  height: '2rem',
  lineHeight: '2rem',
  width: 'fit-content',
  transition: 'background-color 0.15s',
  '&:hover': {
    backgroundColor: 'var(--solitude)',
  },
})

const StyledSkeleton = styled(Skeleton)({
  maxWidth: '20rem',
  maxHeight: '20rem',
  zIndex: 1,
  width: '100%',
  height: '100%',
})

const PokemonDetail: FC<PropsWithChildren<PokemonProps>> = ({ pokemon, isLoading, children }) => {
  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', pt: 5 }}>
      <Name>
        <StyledLink to={'/'}><PiArrowLeft size={32} /></StyledLink>
        {capitalize(pokemon.name)}
      </Name>
      <Typography level="h4" color="neutral" mb={2} mt={0}>{String(pokemon.id).padStart(3, '0')}</Typography>
      <ImageContainer>
        {!isLoading && <PokemonImage size="large" src={getImageFromSprites(pokemon.sprites)} name={pokemon.name} />}
        {isLoading && <StyledSkeleton variant="rectangular" animation="wave" width="3rem" height="3rem" />}
      </ImageContainer>
      {children}
    </Container>
  )
}

export default PokemonDetail