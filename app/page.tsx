import Canvas from "@/app/components/drawing-canvas";
export default function Home() {
  return (
    <div
      className="h-screen w-screen p-4 font-[family-name:var(--font-geist-sans)] animate-rainbow-wheel"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,182,193,0.7) 0%, rgba(255,218,185,0.7) 10%, rgba(255,255,204,1) 20%, rgba(204,255,204,1) 30%, rgba(204,255,255,1) 40%, rgba(204,229,255,1) 50%, rgba(204,204,255,1) 60%, rgba(229,204,255,1) 70%, rgba(255,204,229,1) 80%, rgba(255,182,193,0.7) 90%, rgba(255,182,193,0.7) 100%)",
        backgroundSize: "1000%",
        backgroundPositionX: "100%",
      }}
    >
      <main className="h-full" style={{ touchAction: "none" }}>
        <Canvas />
      </main>
    </div>
  );
}
