import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileContext } from "@/contexts/profile.context";
import { Bookmark, Camera, SquarePlay } from "lucide-react";
import { use } from "react";
import MediaContent from "./MediaContent";
export default function MediaTag() {
  const { isOwner } = use(ProfileContext);
  const tags = {
    all: "all",
    video: "video",
    saved: "saved",
  };
  return (
    <>
      <div className="mt-8">
        <Tabs defaultValue={tags.all} className="gap-0">
          <TabsList
            variant="line"
            className="w-full group-data-horizontal/tabs:h-auto border-b"
          >
            <div className="max-w-48.25 flex-1 text-center">
              <TabsTrigger
                value={tags.all}
                className="h-11 px-5 cursor-pointer"
              >
                <Camera
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TabsTrigger>
            </div>
            <div className="max-w-48.25 flex-1 text-center">
              <TabsTrigger
                value={tags.video}
                className="h-11 px-5 cursor-pointer"
              >
                <SquarePlay
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TabsTrigger>
            </div>
            {isOwner && (
              <div className="max-w-48.25 flex-1 text-center">
                <TabsTrigger
                  value={tags.saved}
                  className="h-11 px-5 cursor-pointer"
                >
                  <Bookmark
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TabsTrigger>
              </div>
            )}
          </TabsList>
          <TabsContent value={tags.all}>
            <MediaContent filter={tags.all} />
          </TabsContent>
          <TabsContent value={tags.video}>
            <MediaContent filter={tags.video} />
          </TabsContent>
          {isOwner && (
            <TabsContent value={tags.saved}>
              <MediaContent filter={tags.saved} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
}
