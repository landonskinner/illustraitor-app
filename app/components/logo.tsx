import { Sparkles } from "lucide-react";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "900"] });

const Logo = ({ className }) => {
  return (
    <div
      className={`text-center text-[#ea90fb] tracking-tighter leading-[200%] text-3xl font-black ${nunito.className} ${className}`}
    >
      illustr
      <span className="text-loading animate-border-loader text-transparent text-4xl relative mr-0.5 inline-flex">
        AI
        <Sparkles className="size-4 absolute -top-1 left-full icon-loading" />
      </span>
      tor
    </div>
  );
};

export default Logo;
