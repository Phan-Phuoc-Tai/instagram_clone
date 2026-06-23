type Props = {
  className: string;
};

export default function CreateIcon({ className }: Props) {
  return (
    <div className={className}>
      <svg
        aria-label="New post"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path>
      </svg>
    </div>
  );
}
