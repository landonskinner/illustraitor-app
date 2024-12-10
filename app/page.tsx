import Canvas from "@/app/components/drawing-canvas";
export default function Home() {
  return (
    <div
      className="p-4 h-screen w-screen font-[family-name:var(--font-geist-sans)] bg-[url('/background.svg')] bg-cover bg-center"
      style={
        {
          // background:
          //   "linear-gradient(90deg, rgba(255,182,193,0.7) 0%, rgba(255,218,185,0.7) 10%, rgba(255,255,204,1) 20%, rgba(204,255,204,1) 30%, rgba(204,255,255,1) 40%, rgba(204,229,255,1) 50%, rgba(204,204,255,1) 60%, rgba(229,204,255,1) 70%, rgba(255,204,229,1) 80%, rgba(255,182,193,0.7) 90%, rgba(255,182,193,0.7) 100%)",
          // backgroundSize: "1000%",
          // backgroundPositionX: "100%",
          // background:
          //   "linear-gradient(90deg, #81cae3 0%, #FFDAB9 25%, #FFB6C1 50%, #EA90FB 75%, #81cae3 100%)",
        }
      }
    >
      <main className="h-full" style={{ touchAction: "none" }}>
        <Canvas />
      </main>
    </div>
  );
}

// 41BEF8 blue -> ADD8E6 light blue
// F9AA2E orange -> FFDAB9 peach puff
// FE376D pink/red -> FFB6C1 light pink
// EA90FB purple -> DDA0DD plum
// background: "linear-gradient(90deg, #41BEF8 0%, #F9AA2E 25%, #FE376D 50%, #EA90FB 75%, #41BEF8 100%)",
// backgroundSize: "1000%",
// backgroundPositionX: "100%",
