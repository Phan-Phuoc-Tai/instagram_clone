import Button from "../components/form/Button";
import Input from "../components/form/Input";
import MetaLogo from "../components/icons/MetaLogo";

export default function LoginPage() {
  return (
    <div className="flex items-center">
      <div className="py-10 px-5 border-r-2 border-(--divider) flex-1">
        <img
          src="/images/instagram-colorful.svg"
          alt="ins_logo"
          className="w-24 h-24 object-center ml-5"
        />
        <p className="mt-7 text-[40px] text-(--primary-text) text-center">
          See everyday moments from your <br />
          <span className="bg-[linear-gradient(90deg,#ff5c00,#ff0069,#d300c5)] bg-clip-text text-transparent text-wrap">
            close friends
          </span>
          .
        </p>
        <div className="flex items-center justify-center">
          <img
            src="/images/ins_image.webp"
            alt="ins image"
            className="object-center"
          />
        </div>
      </div>

      <div className="px-13">
        <h1 className="mb-7 font-semibold text-(--primary-text) text-[17px]">
          Log in to Instagram
        </h1>
        <form className="w-[546px] flex flex-col gap-4">
          <Input
            type={"email"}
            label={"Mobile number, username or email address"}
            focus={true}
          />
          <Input type={"password"} label={"Password"} showPassword={true} />
          <div className="mt-2 flex flex-col gap-3">
            <Button content={"Log in"} type={0} />
            <Button content={"Forgotten password?"} type={1} />
          </div>
          <div className="pt-7.5 flex flex-col gap-3">
            <Button content={"Log in with Facebook"} type={2} />
            <Button content={"Create new account"} type={3} />
          </div>
          <MetaLogo />
        </form>
      </div>
    </div>
  );
}
