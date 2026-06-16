import { useUserById } from "@/hooks/users/useUserById";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bookmark, Camera, SquarePlay } from "lucide-react";
import Information from "@/components/profile/Information";
import Footer from "@/components/footer/Footer";

export default function ProfilePage() {
  const { pathname } = useLocation(); // userId
  const userIdUrl = pathname.slice(pathname.lastIndexOf("/") + 1);
  const { user } = useUserById(userIdUrl);
  const { user: myProfile } = useUserStore();
  const isOwner = user._id === myProfile._id;
  const [postsCount, setPostsCount] = useState(0);
  return (
    <>
      <div className="pt-7.5 px-5 mx-auto max-w-272.5">
        <Information
          userIdUrl={userIdUrl}
          postsCount={postsCount}
          isOwner={isOwner}
        />
        <div className="mt-8">
          <Tabs defaultValue="posts">
            <TabsList
              variant="line"
              className="w-full group-data-horizontal/tabs:h-auto border-b"
            >
              <div className="max-w-48.25 flex-1 text-center">
                <TabsTrigger value="posts" className="h-11 px-5 cursor-pointer">
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
                  value="videos"
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
              <div className="max-w-48.25 flex-1 text-center">
                <TabsTrigger value="saves" className="h-11 px-5 cursor-pointer">
                  <Bookmark
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="posts">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="videos">
              Make changes to your account here.
            </TabsContent>
            {isOwner && (
              <TabsContent value="saves">
                Make changes to your account here.
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
      <Footer showBorder={false} />
    </>
  );
}
