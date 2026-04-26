import { Header } from "@/components/Header";
import { HeroWithCollage } from "@/components/HeroCollage";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-black text-zinc-100">
      <Header />

      <main>
        <HeroWithCollage>
          <p className="max-w-2xl text-center text-base font-medium tracking-[0.32em] text-white/45 uppercase sm:text-lg">
            Stone &amp; surfaces
          </p>
          <h1 className="mt-6 max-w-[min(92vw,56rem)] text-center text-5xl font-semibold tracking-tight text-white sm:mt-7 sm:text-6xl lg:mt-8 lg:text-7xl lg:leading-[1.05]">
            Kitchens, materials, and spaces—reimagined.
          </h1>
        </HeroWithCollage>

        <section id="about" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">About Us</h2>
          <p className="mt-4 max-w-2xl text-white/55">
            Placeholder section—replace with Stone Spaces story, team, and showroom details.
          </p>
        </section>

        <section id="products" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="mt-4 max-w-2xl text-white/55">Surfaces, slabs, and finishes will live here.</p>
        </section>

        <section id="cabinets" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-copper">Cabinets</h2>
          <p className="mt-4 max-w-2xl text-white/55">Custom cabinetry for kitchens and baths.</p>
        </section>

        <section id="turnkey" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Turn Key Projects</h2>
          <p className="mt-4 max-w-2xl text-white/55">End-to-end project stories and timelines.</p>
        </section>

        <section id="services" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
          <p className="mt-4 max-w-2xl text-white/55">Design, fabrication, install, and care.</p>
        </section>

        <section id="reference" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Reference</h2>
          <p className="mt-4 max-w-2xl text-white/55">Selected installations and partners.</p>
        </section>

        <section id="catalogue" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Catalogue</h2>
          <p className="mt-4 max-w-2xl text-white/55">Downloadable or browsable product catalogue.</p>
        </section>

        <section id="blog" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-24 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Blog</h2>
          <p className="mt-4 max-w-2xl text-white/55">Ideas, trends, and project spotlights.</p>
        </section>

        <section id="contact" className="scroll-mt-64 border-t border-white/[0.06] px-6 py-28 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight">Contact Us</h2>
          <p className="mt-4 max-w-2xl text-white/55">
            Form and map can go here. Phone is also in the header for quick access.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Stone Spaces. All rights reserved.
      </footer>
    </div>
  );
}
