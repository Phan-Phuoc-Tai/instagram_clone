import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CreateMyStory from "@/components/home/CreateMyStory";
import AvatarDefault from "@/components/icons/AvatarDefault";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center gap-16">
      <div className="max-w-160 w-full mt-4 h-screen">
        <div className="mb-6">
          <CreateMyStory />
        </div>
        <div className="flex flex-col items-center justify-start">
          <article className="max-w-117.5 w-full ">
            <div className="flex items-center justify-between gap-3 pl-3.5 pr-2.5 pb-3">
              <div>
                <Avatar className="flex items-center justify-center size-10.25">
                  <AvatarImage src="https://scontent.cdninstagram.com/v/t51.82787-19/642496430_18506062711074241_4461016099240121005_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=UR8Uxmk-YEwQ7kNvwHMl_sX&_nc_oc=Adr1o9hpXSF8CBoxeQYa2YeEkx7jXOHllDSffM1w-krHg5IvORMgO0dUa5FKIbuQUyM&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=FRFmOYYj9am11ySTIe9F_A&_nc_ss=7b6a8&oh=00_Af4qXXEaaB9RXAjodD60aNmxe4ZqDTS-sEJokExVwvvmew&oe=6A1C82E4" />
                  <AvatarFallback asChild>
                    <div className="p-1 border bg-white">
                      <AvatarDefault width="32px" height="32px" />
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-1 mr-auto text-sm">
                <span className="text-(--ig-primary-text) font-semibold ">
                  pt_701
                </span>
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
                <span className="text-(--ig-secondary-text) font-normal">
                  1 w
                </span>
              </div>
              <div className="w-5 h-5 flex items-center justify-center gap-0.5">
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
              </div>
            </div>
            <div className="w-117 ">
              <img
                src="https://img.uhdpaper.com/wallpaper/dragon-fist-lee…chroma-skin-lol-splash-art-222@0@i-preview.jpg?dl"
                className="w-full object-cover rounded-sm"
              />
            </div>
            <div></div>
          </article>
        </div>
      </div>
      <div>Suggest users</div>
    </div>
  );
}
