import { createContext } from "react";
type ProfileContextType = {
  isOwner: boolean;
  userId: string;
};
export const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType,
);
