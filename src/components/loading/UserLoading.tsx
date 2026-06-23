import { Skeleton } from "../ui/skeleton";

export default function UserLoading() {
  return (
    <div className=" flex items-center gap-3">
      <Skeleton className="h-11 w-11 rounded-full" />
      <div className="w-full">
        <Skeleton className=" h-4 w-[45%] mb-1" />
        <Skeleton className=" h-4 w-[30%]" />
      </div>
    </div>
  );
}
