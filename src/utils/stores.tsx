import { create } from "zustand";

interface ListStore {
  currentPage: number;
  setCurrentPage?: (page: number) => void;
  pages?: number;
  setPages?: (pages: number) => void;
  onlyFavorites?: boolean;
  setOnlyFavorites?: (onlyFavorites: boolean) => void;
}

type FavoriteStore = {
  favoritePokemon: string[]
  toggleFavorite: (name: string) => void
}

const getFavoritePokemon = (): string[] => {
  const favoritePokemon = localStorage.getItem('favoritePokemon')
  return favoritePokemon ? JSON.parse(favoritePokemon) : []
}

export const useList = create<ListStore>((set) => ({
  currentPage: 0,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  pages: 0,
  setPages: (pages: number) => set({ pages }),
  onlyFavorites: false,
  setOnlyFavorites: (onlyFavorites: boolean) => set({ onlyFavorites }),
}))

export const useFavoritePokemon = create<FavoriteStore>((set) => ({
  favoritePokemon: getFavoritePokemon(),
  toggleFavorite: (name: string) => set(state => {
    const favoritePokemon = state.favoritePokemon.includes(name) ?
      state.favoritePokemon.filter(pokemon => pokemon !== name) :
      [...state.favoritePokemon, name]

    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon))
    return { favoritePokemon }
  }),
}))
