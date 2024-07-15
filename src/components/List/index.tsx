import { Grid, Typography } from "@mui/joy"
import PokemonListItem from "../PokemonListItem"
import { NamedAPIResource } from "pokenode-ts"
import Pagination from '../Pagination'
import { useFavoritePokemon, useList } from "../../utils/stores"
import { useApiList } from "../../utils/hooks"

const List = () => {
  const { currentPage, pages, setPages, onlyFavorites } = useList()
  const { favoritePokemon } = useFavoritePokemon()
  const { data, isRefetching } = useApiList({ currentPage, setPages })

  return <Grid container spacing={2} my={2}>
    <Grid xs={12}>
      <Typography level="h4">
        {!onlyFavorites && <>{currentPage} / {pages}</>}{onlyFavorites && favoritePokemon.length} {onlyFavorites ? 'Favorites' : 'Pages'}
      </Typography>
    </Grid>
    {!onlyFavorites && <Pagination isRefetching={isRefetching} />}
    {!onlyFavorites && data?.results.map(({ url }: NamedAPIResource) => {
      const pokemonId = parseInt(url.split(/\/pokemon\//)[1].replace(/\//g, ''))
      return (
        <Grid xs={6} md={4} lg={3} key={pokemonId}><PokemonListItem url={url} id={pokemonId} /></Grid>
      )
    })}
    {onlyFavorites && !favoritePokemon.length && <p>There are no favorite Pokémon</p>}
    {onlyFavorites && favoritePokemon.map((id: number) => (
      <Grid xs={6} md={4} lg={3} key={id}><PokemonListItem id={id} /></Grid>
    ))}
  </Grid>
}

export default List
