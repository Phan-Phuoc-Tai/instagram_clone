import { Button } from "../ui/button";

type Props = {
  email: string;
  onClose: () => void;
};
export default function NotifySentEmail({ email, onClose }: Props) {
  const handleCloseNotify = () => {
    onClose();
  };
  return (
    <div>
      <p className="my-4 text-(--primary-text) text-base">
        We've sent an email to {email} with a link to get back into your
        account.
      </p>
      <Button
        className="bg-(--primary-bg-button)/90 hover:bg-(--primary-bg-button) cursor-pointer text-white w-full rounded-3xl"
        onClick={handleCloseNotify}
      >
        OK
      </Button>
    </div>
  );
}
