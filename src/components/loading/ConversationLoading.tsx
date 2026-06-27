import { Skeleton } from "../ui/skeleton";

export default function ConversationLoading() {
  return (
    <div className=" flex items-center gap-3">
      <Skeleton className="h-14 w-18 rounded-full" />
      <div className="w-full">
        <Skeleton className=" h-4 w-[90%] mb-1" />
        <Skeleton className=" h-4 w-[70%]" />
      </div>
    </div>
  );
}
