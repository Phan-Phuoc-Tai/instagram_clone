import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchIcon from "../icons/SearchIcon";
import { Input } from "../ui/input";
import SearchItem from "./SearchItem";
import { useQuery } from "@tanstack/react-query";
import { CACHE } from "@/constants/cache.constant";
import { searchHistoryService } from "@/services/searchHistory.service";
import { useState, type ChangeEvent } from "react";
import type { User } from "@/types/user.type";
import { userService } from "@/services/user.service";
import { ScrollArea } from "../ui/scroll-area";
export default function Search() {
  const { data: searchHistory } = useQuery({
    queryKey: CACHE.SEARCH_HISTORY,
    queryFn: searchHistoryService.getSearchHistory,
  });
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [keyword, setKeyWord] = useState("");

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    const result = await userService.searchUser(keyword);
    setSearchResult([...result]);
    setKeyWord(keyword);
  };
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <li
          className={
            "flex items-center gap-4 p-3 my-1 hover:bg-black/5 cursor-pointer rounded-lg overflow-hidden"
          }
        >
          <SearchIcon className="w-6 h-6" />
          <span
            className={
              "opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-transform ease-in-out duration-300"
            }
          >
            Search
          </span>
        </li>
      </SheetTrigger>
      <SheetContent side="left" className="data-[side=left]:sm:max-w-lg p-4">
        <div className=" text-(--ig-primary-text)">
          <SheetTitle className="text-3xl">Search</SheetTitle>
          <div>
            <Input
              className="focus-visible:ring-0 px-4 py-2.5 my-3 h-auto rounded-full text-base bg-[#eee] "
              placeholder="Search user"
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center justify-between text-base font-medium">
            <span>Recent</span>
            <span className="text-(--ig-colors-link-text) hover:underline cursor-pointer">
              Delete all
            </span>
          </div>
        </div>
        <div>
          <ScrollArea className="-mx-4 px-4 flex-1 max-h-196.5 h-full">
            {searchResult.length > 0
              ? searchResult.map((searchItem) => (
                  <SearchItem
                    user={searchItem}
                    key={searchItem._id}
                    showCloseBtn={false}
                    keyword={keyword}
                  />
                ))
              : searchHistory?.map((searchItem) => (
                  <SearchItem
                    user={searchItem.searchedUserId}
                    key={searchItem._id}
                    showCloseBtn={true}
                  />
                ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
