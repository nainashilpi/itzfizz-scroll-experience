import Hero from "./components/Hero";

function App() {
  return (
    <main className="bg-black">
      <Hero />

      {/* NEXT SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] text-white">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        <div className="relative text-center">
          <p className="mb-5 text-[9px] uppercase tracking-[0.4em] text-white/30">
            ITZFIZZ DIGITAL
          </p>

          <h2 className="text-5xl font-medium tracking-[-0.05em] md:text-8xl">
            BUILD
            <br />
            <span className="text-white/20">
              BETTER.
            </span>
          </h2>

          <div className="mx-auto mt-8 h-px w-12 bg-white/20" />
        </div>
      </section>
    </main>
  );
}

export default App;