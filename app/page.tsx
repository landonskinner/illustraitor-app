import Canvas from "@/app/components/drawing-canvas";
export default function Home() {
  return (
    <div className="p-4 h-screen w-screen font-[family-name:var(--font-nunito)] bg-cover bg-center">
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
