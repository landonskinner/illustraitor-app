import Canvas from "@/app/components/drawing-canvas";
export default function Home() {
  return (
    <div className="p-4 h-[100dvh] w-screen font-[family-name:var(--font-nunito)] bg-cover bg-center">
      <main className="h-full" style={{ touchAction: "none" }}>
        <Canvas />
      </main>
    </div>
  );
}
