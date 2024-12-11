import { Sparkles } from "lucide-react";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={`text-center text-ai-pink tracking-tighter leading-[200%] text-3xl font-black ${className}`}
    >
      illustr
      <span className="text-loading animate-text-loader text-transparent text-4xl relative mr-0.5 inline-flex">
        AI
        <Sparkles className="size-4 absolute -top-1 left-full icon-loading" />
      </span>
      tor
    </div>
  );
};

export default Logo;
