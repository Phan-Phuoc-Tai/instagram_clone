import { useInView } from "react-intersection-observer";
import Post from "@/components/posts/Post";
import Story from "@/components/home/story&profile/Story";
import React, { useEffect } from "react";
import { POST_CONFIG } from "@/constants/post.constant";
import PostLoading from "@/components/loading/PostLoading";
import { useInfinitePosts } from "@/hooks/posts/useInfinitePosts";
import Footer from "@/components/footer/Footer";
import Profile from "@/components/home/story&profile/Profile";
import SuggestedUsers from "@/components/home/suggestedUsers/SuggestedUsers";
import CopyRight from "@/components/footer/CopyRight";

export default function HomePage() {
  const { pages, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();
  const { ref, inView } = useInView({});
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="grow flex items-start justify-center gap-16">
          <div className="max-w-160 w-full mt-4 ">
            <Story />
            <div className="flex flex-col items-center justify-start">
              {status === "pending" &&
                Array.from({ length: 3 }).map((_, index) => (
                  <PostLoading key={index} isShowUser={true} />
                ))}
              {pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.posts?.map((post) => (
                    <Post key={post._id} postId={post._id} />
                  ))}
                </React.Fragment>
              ))}
              <div
                ref={ref}
                className="text-center py-6 max-w-117.5 w-full pb-4 mb-5  text-gray-500 text-base"
              >
                {isFetchingNextPage ? (
                  <div className=" w-full">
                    <PostLoading isShowUser={true} />
                  </div>
                ) : hasNextPage ? (
                  <p>{POST_CONFIG.SCROLL_DOWN}</p>
                ) : (
                  <p className="bg-[linear-gradient(90deg,#ff5c00,#ff0069,#d300c5)] bg-clip-text text-transparent text-wrap">
                    {POST_CONFIG.VIEWED_ALL}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 w-80">
            <div className="px-4">
              <Profile />
            </div>
            <div className="mt-6 px-4">
              <div className="flex items-center justify-between py-1 text-(--ig-primary-color) text-sm font-semibold">
                <h4>Suggested for you</h4>
                <p className="text-xs font-medium">See all</p>
              </div>
              <SuggestedUsers />
            </div>
            <div className="mt-3 flex justify-center text-(--ig-secondary-text)">
              <CopyRight />
            </div>
          </div>
        </div>
        {!hasNextPage && !isFetchingNextPage && <Footer />}
      </div>
    </>
  );
}
