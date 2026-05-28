import { Skeleton } from "../ui/skeleton";

export default function PostLoading() {
  return (
    <article className="max-w-117.5 w-full pb-4 mb-5">
      <div className="info flex items-center  gap-3 pl-3.5 pr-2.5 pb-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="w-full">
          <Skeleton className=" h-3 w-[45%] mb-1" />
          <Skeleton className=" h-3 w-[30%]" />
        </div>
      </div>
      <Skeleton className="image h-68 w-full" />
    </article>
  );
}
