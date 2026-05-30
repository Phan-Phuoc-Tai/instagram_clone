import React from "react";
import { useSuggestedUsers } from "@/hooks/users/useSuggestedUsers";
import UserLoading from "../loading/UserLoading";
import SuggestedUserCard from "./SuggestedUserCard";
export default function SuggestedUsers() {
  const { suggestedUsers, isLoading } = useSuggestedUsers(5);

  return (
    <>
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div className="py-2" key={index}>
            <UserLoading />
          </div>
        ))}
      {suggestedUsers.map((suggestedUser) => (
        <React.Fragment key={suggestedUser._id}>
          <SuggestedUserCard suggestedUser={suggestedUser} />
        </React.Fragment>
      ))}
    </>
  );
}
