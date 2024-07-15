import { create } from "zustand";

interface ListStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pages: number;
  setPages: (pages: number) => void;
  onlyFavorites?: boolean;
  setOnlyFavorites: (onlyFavorites: boolean) => void;
  isRefetching?: boolean;
  setIsRefetching: (isRefetching: boolean) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

type FavoriteStore = {
  favoritePokemon: number[]
  toggleFavorite: (id: number) => void
}

const getFavoritePokemon = (): number[] => {
  const favoritePokemon = localStorage.getItem('favoritePokemon')
  return favoritePokemon ? JSON.parse(favoritePokemon) : []
}

export const useList = create<ListStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 20,
  setItemsPerPage: (itemsPerPage: number) => set({ itemsPerPage }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  pages: 0,
  setPages: (pages: number) => set({ pages }),
  onlyFavorites: false,
  setOnlyFavorites: (onlyFavorites: boolean) => set({ onlyFavorites }),
  isRefetching: false,
  setIsRefetching: (isRefetching: boolean) => set({ isRefetching }),
}))

export const useFavoritePokemon = create<FavoriteStore>((set) => ({
  favoritePokemon: getFavoritePokemon(),
  toggleFavorite: (id: number) => set(state => {
    const idx = state.favoritePokemon.indexOf(id)
    const favoritePokemon = idx === -1 ?
      [...state.favoritePokemon, id] :
      [
        ...state.favoritePokemon.slice(0, idx),
        ...state.favoritePokemon.slice(idx + 1)
      ]

    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon))
    return { favoritePokemon }
  }),
}))
