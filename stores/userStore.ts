import { create } from 'zustand'

import { User } from '@/types/user'

const initialUser = {
  image: {
    png: './images/avatars/image-juliusomo.png',
    webp: './images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
}

type UserStoreType = {
  loggedUser: User | null
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStoreType>((set) => ({
  // TODO: Implement userSlice methods
  loggedUser: initialUser,
  login: (user: User) => {},
  logout: () => {},
}))
