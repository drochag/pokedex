import { Pokemon as PokemonType } from "pokenode-ts";
import { PokemonImageContainer } from "../PokemonImage";
import { Container, Typography } from "@mui/joy";
import styled from "@emotion/styled";
import { capitalize } from "../../utils";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { FC, PropsWithChildren } from "react";

export interface PokemonProps {
  pokemon: PokemonType;
  isLoading?: boolean;
  types?: JSX.Element | JSX.Element[] | null;
  favoriteButton: JSX.Element;
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

const PokemonDetail: FC<PropsWithChildren<PokemonProps>> = ({ pokemon, children, types, favoriteButton }) => {
  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', pt: 5 }}>
      <Name>
        <StyledLink to={'/'}><ArrowLeft size={32} /></StyledLink>
        {capitalize(pokemon.name)}
      </Name>
      <Typography level="h4" color="neutral" mb={2} mt={0}>{String(pokemon.id).padStart(3, '0')}</Typography>
      <ImageContainer>
        {favoriteButton}
        <PokemonImageContainer id={pokemon.id} />
        {types}
      </ImageContainer>
      {children}
    </Container>
  )
}

export default PokemonDetail