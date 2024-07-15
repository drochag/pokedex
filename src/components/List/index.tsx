import { useQuery } from "@tanstack/react-query"
import { Grid, Typography } from "@mui/joy"
import PokemonListItem from "../PokemonListItem"
import { pokemonClient } from "../../api"
import { NamedAPIResource } from "pokenode-ts"
import Pagination from '../Pagination'
import { useFavoritePokemon, useList } from "../../utils/stores"

const List = () => {
  const { currentPage, pages, setPages, onlyFavorites, setIsRefetching } = useList()
  const { favoritePokemon } = useFavoritePokemon()
  const { data, isRefetching } = useQuery({
    queryKey: ['pokemon', 'list', currentPage],
    queryFn: async () => {
      const response = await pokemonClient.listPokemons((currentPage - 1) * 20, 20)
      setPages(Math.ceil(response.count / 20))
      return response
    },
  })

  return <Grid container spacing={2} my={2}>
    <Grid xs={12}>
      <Typography level="h4">
        {currentPage} / {pages}
      </Typography>
    </Grid>
    <Pagination isRefetching={isRefetching} />
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
