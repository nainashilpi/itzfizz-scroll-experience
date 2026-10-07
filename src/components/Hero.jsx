import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "WELCOME ITZFIZZ";

const metrics = [
  { number: "58%", label: "Engagement" },
  { number: "23%", label: "Efficiency" },
  { number: "27%", label: "Growth" },
  { number: "40%", label: "Performance" },
];

function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const darkBgRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const darkBg = darkBgRef.current;

    if (!section || !stage || !road || !car || !trail || !darkBg) {
      return;
    }

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".road-letter");
      const cards = gsap.utils.toArray(".metric-card");

      let letterPositions = [];

      /*
       * CAR END
       *
       * Car reaches the extreme right side,
       * while remaining completely visible.
       */
      const getCarEnd = () => {
        return road.clientWidth - car.offsetWidth - 8;
      };

      /*
       * Measure every letter inside the road.
       */
      const calculateLetterPositions = () => {
        const roadRect = road.getBoundingClientRect();

        letterPositions = letters.map((letter) => {
          const rect = letter.getBoundingClientRect();

          return (
            rect.left -
            roadRect.left +
            rect.width / 2
          );
        });
      };

      /*
       * Initial states
       */
      gsap.set(car, {
        x: -car.offsetWidth - 40,
      });

      gsap.set(trail, {
        width: 0,
      });

      gsap.set(letters, {
        opacity: 0,
        y: 8,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 25,
        scale: 0.97,
      });

      gsap.set(darkBg, {
        opacity: 0,
      });

      calculateLetterPositions();

      /*
       * Small first-load entrance
       */
      const intro = gsap.timeline();

      intro
        .from(".top-brand", {
          opacity: 0,
          y: -12,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".hero-kicker",
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .from(
          ".hero-line",
          {
            scaleX: 0,
            transformOrigin: "center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );

      /*
       * ============================================
       * MASTER SCROLL TIMELINE
       * ============================================
       *
       * The complete stage is pinned.
       *
       * Car:
       * 0% → 72%
       *
       * Dark background:
       * 72% → 92%
       *
       * Road remains pinned throughout.
       */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,

          pin: stage,
          pinSpacing: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,

          onRefresh: () => {
            calculateLetterPositions();
          },
        },
      });

      /*
       * ============================================
       * CAR MOVEMENT
       * ============================================
       */
      master.to(
        car,
        {
          x: getCarEnd,
          duration: 0.72,
          ease: "none",

          onUpdate: () => {
            const carX = Number(
              gsap.getProperty(car, "x")
            );

            /*
             * Front/center of car
             */
            const carFront =
              carX + car.offsetWidth;

            const carCenter =
              carX + car.offsetWidth / 2;

            /*
             * Green trail
             */
            gsap.set(trail, {
              width: Math.max(0, carCenter),
            });

            /*
             * Reveal letters as the CAR PASSES them.
             *
             * We use the front of the car so that
             * the complete word is visible BEFORE
             * the car reaches the final position.
             */
            letters.forEach((letter, index) => {
              if (!letterPositions[index]) return;

              if (carFront >= letterPositions[index]) {
                gsap.set(letter, {
                  opacity: 1,
                  y: 0,
                });
              } else {
                gsap.set(letter, {
                  opacity: 0,
                  y: 8,
                });
              }
            });

            /*
             * Once the car is near the end,
             * force every letter visible.
             */
            if (carX >= getCarEnd() - 10) {
              gsap.set(letters, {
                opacity: 1,
                y: 0,
              });
            }
          },
        },
        0
      );

      /*
       * ============================================
       * METRICS
       * ============================================
       */

      master.to(
        ".metric-card-0",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.08,
          ease: "power3.out",
        },
        0.15
      );

      master.to(
        ".metric-card-1",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.08,
          ease: "power3.out",
        },
        0.30
      );

      master.to(
        ".metric-card-2",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.08,
          ease: "power3.out",
        },
        0.45
      );

      master.to(
        ".metric-card-3",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.08,
          ease: "power3.out",
        },
        0.60
      );

      /*
       * ============================================
       * LIGHT → BLACK TRANSITION
       * ============================================
       *
       * Car has already reached the end.
       *
       * Road DOES NOT MOVE.
       *
       * Only the background changes.
       */
      master.to(
        darkBg,
        {
          opacity: 1,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.72
      );

      /*
       * Fade metrics into black background.
       * Road remains visible.
       */
      master.to(
        cards,
        {
          opacity: 0,
          y: -10,
          duration: 0.12,
          ease: "power2.out",
        },
        0.75
      );

      /*
       * Hide top UI during final dark phase.
       * Road itself stays.
       */
      master.to(
        ".top-ui",
        {
          opacity: 0,
          duration: 0.1,
        },
        0.78
      );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-black"
    >
      {/* ========================================= */}
      {/* STICKY STAGE                              */}
      {/* ========================================= */}

      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* ========================================= */}
        {/* LIGHT BACKGROUND                         */}
        {/* ========================================= */}

        <div className="absolute inset-0 bg-[#ebe9e3]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c99a5b]/10 blur-[150px]" />

        {/* ========================================= */}
        {/* DARK BACKGROUND                          */}
        {/* ========================================= */}

        <div
          ref={darkBgRef}
          className="absolute inset-0 z-[2] bg-[#080808]"
        />

        {/* subtle dark grid */}
        <div
          className="absolute inset-0 z-[3] opacity-0"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        {/* ========================================= */}
        {/* TOP BRAND                                */}
        {/* ========================================= */}

        <header className="top-ui top-brand absolute left-6 right-6 top-7 z-[100] flex items-center justify-between md:left-10 md:right-10 md:top-9">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-black" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] md:text-xs">
              ITZFIZZ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[9px] uppercase tracking-[0.3em] text-black/35 md:block">
              Digital Studio
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-black/25" />

            <span className="text-[9px] uppercase tracking-[0.3em] text-black/40">
              2026
            </span>
          </div>
        </header>

        {/* ========================================= */}
        {/* INTRO                                     */}
        {/* ========================================= */}

        <div className="top-ui absolute left-1/2 top-[13%] z-10 -translate-x-1/2 text-center">
          <div className="hero-kicker flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-black/20" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-black/40">
              Digital Experiences
            </span>

            <span className="h-px w-7 bg-black/20" />
          </div>

          <div className="hero-line mx-auto mt-5 h-px w-14 bg-black/20" />
        </div>

        {/* ========================================= */}
        {/* ROAD                                     */}
        {/* ========================================= */}

        <div
          ref={roadRef}
          className="absolute left-1/2 top-1/2 z-30 h-[220px] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#111]"
        >
          {/* Road gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-[#101010] to-[#171717]" />

          {/* Texture */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "radial-gradient(#fff 0.7px, transparent 0.7px)",
              backgroundSize: "15px 15px",
            }}
          />

          {/* Road edges */}
          <div className="absolute left-0 right-0 top-0 h-px bg-white/[0.08]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />

          {/* ========================================= */}
          {/* TRAIL                                   */}
          {/* ========================================= */}

          <div
            ref={trailRef}
            className="absolute left-0 top-0 z-[2] h-full bg-gradient-to-r from-[#bfff22] via-[#d9ff52] to-[#baff20]"
          >
            <div className="absolute right-0 top-0 h-full w-20 bg-white/20 blur-2xl" />

            <div className="absolute right-0 top-0 h-full w-px bg-white/70" />
          </div>

          {/* Road markings */}
          <div className="absolute left-0 right-0 top-1/2 z-[3] flex -translate-y-1/2 justify-between px-6 opacity-[0.15]">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="h-[2px] w-10 rounded-full bg-white md:w-20"
              />
            ))}
          </div>

          {/* ========================================= */}
          {/* TITLE                                   */}
          {/* ========================================= */}

          <div className="absolute inset-0 z-[5] flex items-center overflow-hidden">
            <div className="ml-[5vw] flex w-[67%] items-center whitespace-nowrap">
              {TITLE.split("").map((letter, index) => (
                <span
                  key={index}
                  className="road-letter inline-block text-[clamp(2.1rem,4.8vw,5.4rem)] font-semibold uppercase leading-none tracking-[0.055em] text-[#070707]"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          </div>

          {/* ========================================= */}
          {/* CAR                                     */}
          {/* ========================================= */}

          <div
            ref={carRef}
            className="absolute left-0 top-1/2 z-40 -translate-y-1/2"
          >
            <div className="relative h-[145px] w-[290px] md:h-[175px] md:w-[370px]">

              {/* Shadow */}
              <div className="absolute bottom-[4px] left-[22px] h-[24px] w-[245px] rounded-full bg-black/80 blur-xl md:left-[32px] md:w-[305px]" />

              {/* Body */}
              <div className="absolute bottom-[28px] left-[4px] h-[72px] w-[270px] rounded-[42px] bg-gradient-to-b from-[#292929] via-[#111] to-[#050505] shadow-[0_25px_50px_rgba(0,0,0,0.55)] md:left-[9px] md:h-[90px] md:w-[340px]">

                {/* Roof */}
                <div className="absolute left-[58px] top-[-39px] h-[55px] w-[150px] rounded-t-[65px] bg-gradient-to-b from-[#303030] to-[#111] md:left-[76px] md:top-[-51px] md:h-[68px] md:w-[188px]" />

                {/* Glass */}
                <div className="absolute left-[73px] top-[-32px] h-[35px] w-[112px] -skew-x-[15deg] rounded-t-[28px] bg-gradient-to-br from-white/20 via-white/[0.05] to-transparent md:left-[95px] md:top-[-42px] md:h-[45px] md:w-[140px]" />

                {/* Body highlight */}
                <div className="absolute left-[25px] top-[16px] h-[2px] w-[105px] rounded-full bg-white/[0.12] md:left-[35px] md:w-[135px]" />

                {/* Headlight */}
                <div className="absolute right-[10px] top-[27px] h-2.5 w-7 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

                {/* Tail light */}
                <div className="absolute left-[9px] top-[27px] h-2.5 w-4 rounded-full bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.5)]" />
              </div>

              {/* Wheel */}
              <div className="absolute bottom-[4px] left-[42px] h-[58px] w-[58px] rounded-full border-[9px] border-[#050505] bg-[#777] shadow-lg md:left-[56px] md:h-[68px] md:w-[68px]">
                <div className="absolute inset-[8px] rounded-full bg-[#242424]" />
              </div>

              {/* Wheel */}
              <div className="absolute bottom-[4px] right-[38px] h-[58px] w-[58px] rounded-full border-[9px] border-[#050505] bg-[#777] shadow-lg md:right-[50px] md:h-[68px] md:w-[68px]">
                <div className="absolute inset-[8px] rounded-full bg-[#242424]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* METRICS                                  */}
        {/* ========================================= */}

        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`metric-card metric-card-${index} top-ui absolute z-50 w-[145px] rounded-2xl border border-black/[0.08] bg-white/70 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.07)] backdrop-blur-xl md:w-[175px] ${
              index === 0
                ? "left-5 top-[25%] md:left-[8%]"
                : index === 1
                ? "right-5 top-[25%] md:right-[8%]"
                : index === 2
                ? "bottom-[22%] left-5 md:left-[8%]"
                : "bottom-[22%] right-5 md:right-[8%]"
            }`}
          >
            <span className="text-[8px] uppercase tracking-[0.25em] text-black/35">
              0{index + 1} / Impact
            </span>

            <p className="mt-3 text-3xl font-medium tracking-tight">
              {metric.number}
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em]">
              {metric.label}
            </p>
          </div>
        ))}

        {/* ========================================= */}
        {/* BOTTOM                                  */}
        {/* ========================================= */}

        <div className="top-ui absolute bottom-7 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3">
          <span className="text-[8px] uppercase tracking-[0.35em] text-black/35">
            Scroll
          </span>

          <span className="h-px w-10 bg-black/20" />

          <span className="text-[8px] uppercase tracking-[0.35em] text-black/35">
            Explore
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;