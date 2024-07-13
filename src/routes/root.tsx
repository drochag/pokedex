import Grid from '@mui/joy/Grid';
import { createContext, useState } from 'react';

import List from '../components/List';
import Form from '../components/Form';
import { Container } from '@mui/joy';

interface RootContext {
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  pages?: number;
  setPages?: (pages: number) => void;
}
export const RootContext = createContext<RootContext>({ currentPage: 0 });

function Root() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);

  return (
    <RootContext.Provider value={{ currentPage, setCurrentPage, pages, setPages }}>
      <Container sx={{ mt: 5 }}>
        <header>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <h1>Pokédex</h1>
              <p>Search for Pokémon by name or using the National Pokédex number.</p>
              <Form />
            </Grid>
            <Grid xs={12}>
              <List />
            </Grid>
          </Grid>
        </header>
      </Container>
    </RootContext.Provider>
  );
}

export default Root;
