import { useUserById } from "@/hooks/users/useUserById";
import { useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import Information from "@/components/profile/Information";
import Footer from "@/components/footer/Footer";
import { ProfileContext } from "@/contexts/profile.context";
import MediaTag from "@/components/profile/MediaTag";

export default function ProfilePage() {
  const { pathname } = useLocation();
  const userIdUrl = pathname.slice(pathname.lastIndexOf("/") + 1);
  const { user } = useUserById(userIdUrl);
  const { user: myProfile } = useUserStore();
  const isOwner = user._id === myProfile._id;

  return (
    <>
      <div className="pt-7.5 px-5 mx-auto max-w-272.5">
        <ProfileContext
          value={{
            isOwner,
            userId: userIdUrl,
          }}
        >
          <Information userIdUrl={userIdUrl} />
          <MediaTag />
        </ProfileContext>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer showBorder={false} />
      </div>
    </>
  );
}
