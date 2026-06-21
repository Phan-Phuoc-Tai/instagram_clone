import { useUserStore } from "@/stores/user.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/components/icons/AvatarDefault";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/schemas/editProfile.schema";
import type { EditProfileData } from "@/types/profile.type";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { PROFILE_CONFIG } from "@/constants/profile.constant";
export default function EditProfile() {
  const { refetchUser } = useUserStore();
  const { user } = useUserStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [countCharacter, setCountCharacter] = useState(0);
  const maxCharacter = 150;
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const previewUrl = URL.createObjectURL(file);
    setFile(file);
    setPreviewUrl(previewUrl);
  };
  const handleChangePhoto = () => {
    inputRef.current?.click();
  };
  const handleChangeBio = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setCountCharacter(value.length);
  };
  const { register, handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(editProfileSchema),
  });
  const onSubmit = (data: Partial<EditProfileData>) => {
    toast.promise(userService.editProfile(file!, data), {
      loading: PROFILE_CONFIG.LOADING,
      error: PROFILE_CONFIG.ERROR,
      success() {
        refetchUser();
        return PROFILE_CONFIG.SUCCESS;
      },
    });
  };
  useEffect(() => {
    setValue("bio", user.bio);
    setValue("fullName", user.fullName);
    setValue(
      "gender",
      user.gender as
        | "male"
        | "female"
        | "other"
        | "prefer_not_to_say"
        | undefined,
    );
    setValue("website", user.website);
  }, [user, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-178 mx-auto capitalize text-(--ig-primary-text) py-9"
      >
        <h2 className="text-xl font-bold py-3 mb-4">Edit profile</h2>
        <div className="flex items-center justify-between gap-4 bg-[#f3f5f7] p-4 rounded-2xl my-4">
          <Avatar className="flex items-center justify-center size-14">
            <AvatarImage src={previewUrl ? previewUrl : user.profilePicture!} />
            <AvatarFallback asChild>
              <div className="p-1 border bg-white">
                <AvatarDefault width="24px" height="24px" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-(--ig-primary-text)">
            <p className="text-base font-bold leading-5">{user.username}</p>
            <p className="text-sm font-normal text-(--ig-secondary-text) leading-4.5">
              {user.fullName}
            </p>
            <Input
              type="file"
              ref={inputRef}
              onChange={handleChangeFile}
              hidden
            />
          </div>
          <Button
            type="button"
            onClick={handleChangePhoto}
            className="focus-visible:ring-0 bg-(--primary-bg-button) hover:bg-blue-500 cursor-pointer"
          >
            Change photo
          </Button>
        </div>
        <label className="text-base font-bold py-4 block">Full name</label>
        <div className="py-2.5 px-4 block rounded-2xl border">
          <Input
            autoComplete="off"
            autoCorrect="off"
            className="focus-visible:ring-0 border-0 outline-0 flex-1 appearance-none max-h-20 max-w-full overflow-auto min-h-4.5 px-0 py-0 rounded-none placeholder:text-base text-base"
            placeholder="Full name"
            {...register("fullName")}
          />
        </div>
        <label className="text-base font-bold py-4 block">Website</label>
        <div className="py-2.5 px-4 block rounded-2xl border">
          <Input
            autoComplete="off"
            autoCorrect="off"
            className="focus-visible:ring-0 border-0 outline-0 flex-1 appearance-none max-h-20 max-w-full overflow-auto min-h-4.5 px-0 py-0 rounded-none placeholder:text-base text-base"
            placeholder="Website"
            {...register("website")}
          />
        </div>
        <label className="text-base font-bold py-4 block">Bio</label>
        <div className="relative">
          <Textarea
            autoComplete="off"
            autoCorrect="off"
            className="py-2.5 px-4 pr-20 block rounded-2xl border focus-visible:ring-0 outline-0 flex-1 appearance-none max-h-20 max-w-full  min-h-15 placeholder:text-base text-base"
            placeholder="Bio"
            onInput={handleChangeBio}
            {...register("bio")}
          />
          <div className="absolute bottom-2.5 right-4 text-(--ig-secondary-text) text-xs">
            <span>{countCharacter}</span>
            <span> / </span>
            <span>{maxCharacter}</span>
          </div>
        </div>
        <label className="text-base font-bold py-4 block">Gender</label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select value={user.gender} onValueChange={field.onChange}>
              <SelectTrigger
                size="default"
                className="w-full p-4 data-[size=default]:h-auto text-base leading-5 focus-visible:ring-0"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <p className="text-(--ig-secondary-text) text-xs font-normal mt-2">
          This won't be part of your public profile.
        </p>
        <p className="text-(--ig-secondary-text) text-xs font-normal py-4">
          <span>
            Certain profile info, such as your name, bio and links, is visible
            to everyone.
          </span>
          <span className="text-(--ig-colors-link-text) ml-0.5 hover:underline cursor-pointer">
            See what profile info is visible
          </span>
        </p>
        <Button className="focus-visible:ring-0 bg-(--primary-bg-button) hover:bg-blue-500 cursor-pointer w-full mt-4">
          Submit
        </Button>
      </form>
    </>
  );
}
