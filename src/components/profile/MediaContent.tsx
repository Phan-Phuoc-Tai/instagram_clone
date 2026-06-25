import { ProfileContext } from "@/contexts/profile.context";
import { usePostsByUserId } from "@/hooks/posts/usePostsByUserId";
import { use } from "react";
import Post from "./Post";
import CameraIcon from "../icons/CameraIcon";
import PostLoading from "../loading/PostLoading";
type Props = {
  filter: string;
};
export default function MediaContent({ filter }: Props) {
  const { userId } = use(ProfileContext);
  const { data: posts, isLoading } = usePostsByUserId(userId, filter);

  return (
    <div className="grid grid-cols-12 gap-0.5 rounded-md overflow-hidden">
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <div className="col-span-3 h-[40vh]" key={index}>
            <PostLoading isShowUser={false} />
          </div>
        ))}
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {posts?.length === 0 && (
        <div className="text-center col-span-12 my-15 text-(--ig-primary-text)">
          <div className="w-max mx-auto">
            <CameraIcon />
          </div>
          <p className="my-6 font-bold text-3xl">
            Share {filter === "all" ? "post" : filter}s
          </p>
          <p className="mb-6 text-sm">
            When you share {filter === "all" ? "post" : filter}s, they will
            appear on your profile.
          </p>
          <p className="text-(--ig-colors-link-text) font-medium">
            Share your first {filter === "all" ? "post" : filter}s
          </p>
        </div>
      )}
    </div>
  );
}
