import Grid from '@mui/joy/Grid';

import List from '../components/List';
import Form from '../components/Form';
import { Container } from '@mui/joy';

function Root() {
  return (
    <Container sx={{ mt: 5 }}>
      <header>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>Pokédex</h1>
            <p>Search for Pokémon by name or using the National Pokédex number. Write up and wait for the result.</p>
            <Form />
          </Grid>
          <Grid xs={12}>
            <List />
          </Grid>
        </Grid>
      </header>
    </Container>
  );
}

export default Root;
