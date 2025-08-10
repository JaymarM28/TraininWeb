import { Header } from "@/presentation/layouts/header";
import { Footer } from "@/presentation/layouts/footer";
import { SparkleParticles } from "@/presentation/styles/sparkle-particles";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <SparkleParticles
        className="pointer-events-none fixed inset-0"
        baseDensity={64}
        maxParticleSize={1.4}
        maxSpeed={0.8}
        maxOpacity={0.5}
        enableHoverGrab={false}
        clickEffect={false}
        backgroundColor="transparent"
        particleColor="#ffffff"
      />

      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}