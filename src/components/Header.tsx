import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="h-20 bg-black text-white">
      <div className="relative mx-auto flex h-full w-screen max-w-screen-2xl items-center">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          CHATTER
        </h2>
        <div className="ml-auto">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
