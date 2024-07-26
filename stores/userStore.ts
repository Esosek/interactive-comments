import { User } from "@/types/user";

const initialUser = {
  image: {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};

export type UserStoreType = {
  loggedUser: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type SetState = (
  partial: Partial<UserStoreType> | ((state: UserStoreType) => UserStoreType),
  replace?: boolean
) => void;

export const createUserStore = (set: SetState): UserStoreType => ({
  // TODO: Implement userSlice methods
  loggedUser: initialUser,
  login: (user: User) => {},
  logout: () => {},
});
