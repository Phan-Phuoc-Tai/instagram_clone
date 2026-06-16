import { useInfiniteFollowers } from "@/hooks/follows/useInfiniteFollowers";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, type Dispatch, type SetStateAction } from "react";
import Follower from "./Follower";
import UserLoading from "../loading/UserLoading";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../ui/spinner";
type Props = {
  userId: string;
  setFollowingCount: Dispatch<SetStateAction<number>>;
};
export default function Followers({ userId, setFollowingCount }: Props) {
  const {
    pages: followerPages,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFollowers(userId);
  const { ref, inView } = useInView({});
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      <ScrollArea className="border-t -mx-4 px-4 max-h-86  ">
        {status === "pending" &&
          Array.from({ length: 7 }).map((_, index) => (
            <div className="my-2" key={index}>
              <UserLoading />
            </div>
          ))}
        {followerPages.map((page, index) => (
          <React.Fragment key={index}>
            {page.followers.map((follower) => (
              <Follower
                follower={follower}
                key={follower._id}
                setFollowingCount={setFollowingCount}
              />
            ))}
          </React.Fragment>
        ))}
        <div ref={ref}>
          {isFetchingNextPage && (
            <div className="w-max mx-auto text-(--ig-secondary-text)">
              <Spinner
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
