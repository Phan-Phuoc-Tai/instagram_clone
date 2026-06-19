import { Skeleton } from "../ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className=" flex items-center gap-7">
      <Skeleton className="h-37.5 w-50 rounded-full" />
      <div className="w-full">
        <Skeleton className=" h-5 w-[45%] " />
        <Skeleton className=" h-4 w-[30%] my-2" />
        <Skeleton className=" h-4 w-[40%]" />
      </div>
    </div>
  );
}
