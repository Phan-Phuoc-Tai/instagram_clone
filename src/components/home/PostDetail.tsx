import { usePostById } from "@/hooks/posts/usePostById";

type Props = {
  postId: string;
};
export default function PostDetail({ postId }: Props) {
  const { post } = usePostById(postId);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(`${BASE_URL}${post.image}`);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <img
          src={post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/null`}
        />
      </div>
    </div>
  );
}
