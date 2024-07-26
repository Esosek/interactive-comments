import { User } from "@/types/user";

const initialUser = {
  image: {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};

export type UserSliceType = {
  loggedUser: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type SetState = (
  partial: Partial<UserSliceType> | ((state: UserSliceType) => UserSliceType),
  replace?: boolean
) => void;

export const createUserSlice = (set: SetState): UserSliceType => ({
  // TODO: Implement userSlice methods
  loggedUser: initialUser,
  login: (user: User) => {},
  logout: () => {},
});
