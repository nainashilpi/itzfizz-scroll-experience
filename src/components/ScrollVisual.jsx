// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function ScrollVisual() {
//   const wrapperRef = useRef(null);
//   const carRef = useRef(null);
//   const trailRef = useRef(null);

//   useGSAP(
//     () => {
//       const car = carRef.current;
//       const trail = trailRef.current;

//       const getCarEndPosition = () => {
//         const carWidth = car.offsetWidth;

//         return window.innerWidth - carWidth - 40;
//       };

//       /*
//        * IMPORTANT:
//        * Animation is now based on the FULL 220vh Hero section.
//        * Not the sticky viewport.
//        */

//       gsap.set(car, {
//         x: -380,
//       });

//       gsap.to(car, {
//         x: getCarEndPosition(),

//         ease: "none",

//         scrollTrigger: {
//           trigger: wrapperRef.current.closest("section"),
//           start: "top top",
//           end: "bottom top",
//           scrub: 1.2,

//           invalidateOnRefresh: true,
//         },
//       });

//       gsap.to(trail, {
//         scaleX: 1,

//         transformOrigin: "left center",

//         ease: "none",

//         scrollTrigger: {
//           trigger: wrapperRef.current.closest("section"),
//           start: "top top",
//           end: "bottom top",
//           scrub: 1.2,

//           invalidateOnRefresh: true,
//         },
//       });

//       // Small natural tilt while moving
//       gsap.to(car, {
//         rotate: 1.5,

//         ease: "none",

//         scrollTrigger: {
//           trigger: wrapperRef.current.closest("section"),
//           start: "top top",
//           end: "35% top",
//           scrub: 1,
//         },
//       });

//       ScrollTrigger.refresh();
//     },
//     {
//       scope: wrapperRef,
//     }
//   );

//   return (
//     <div
//       ref={wrapperRef}
//       className="pointer-events-none absolute inset-0 z-10"
//     >
//       {/* Ambient glow */}
//       <div
//         className="
//           absolute
//           left-1/2
//           top-[58%]
//           h-[450px]
//           w-[450px]
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//           bg-[#e8a65d]/15
//           blur-[120px]
//         "
//       />

//       {/* Road */}
//       <div
//         className="
//           absolute
//           left-0
//           top-[58%]
//           h-[2px]
//           w-full
//           bg-black/10
//         "
//       >
//         {/* Animated trail */}
//         <div
//           ref={trailRef}
//           className="
//             absolute
//             left-0
//             top-0
//             h-full
//             w-full
//             origin-left
//             scale-x-0
//             bg-black/20
//           "
//         />

//         {/* Road markers */}
//         <div
//           className="
//             absolute
//             left-0
//             top-1/2
//             flex
//             w-full
//             -translate-y-1/2
//             justify-between
//             px-4
//             opacity-30
//           "
//         >
//           {Array.from({ length: 18 }).map((_, index) => (
//             <span
//               key={index}
//               className="h-px w-8 bg-black/30 md:w-14"
//             />
//           ))}
//         </div>
//       </div>

//       {/* CAR */}
//       <div
//         ref={carRef}
//         className="
//           absolute
//           left-0
//           top-[58%]
//           -translate-y-1/2
//         "
//       >
//         <div
//           className="
//             relative
//             h-[145px]
//             w-[300px]
//             md:h-[175px]
//             md:w-[360px]
//           "
//         >
//           {/* Shadow */}
//           <div
//             className="
//               absolute
//               bottom-[6px]
//               left-[30px]
//               h-[25px]
//               w-[235px]
//               rounded-full
//               bg-black/20
//               blur-xl
//               md:left-[45px]
//               md:w-[275px]
//             "
//           />

//           {/* Main body */}
//           <div
//             className="
//               absolute
//               bottom-[25px]
//               left-[10px]
//               h-[78px]
//               w-[275px]
//               rounded-[38px]
//               bg-[#111]
//               shadow-[0_25px_45px_rgba(0,0,0,0.3)]
//               md:left-[15px]
//               md:h-[92px]
//               md:w-[330px]
//             "
//           >
//             {/* Roof */}
//             <div
//               className="
//                 absolute
//                 left-[65px]
//                 top-[-42px]
//                 h-[55px]
//                 w-[150px]
//                 rounded-t-[70px]
//                 bg-[#151515]
//                 md:left-[78px]
//                 md:top-[-52px]
//                 md:h-[65px]
//                 md:w-[180px]
//               "
//             />

//             {/* Windshield */}
//             <div
//               className="
//                 absolute
//                 left-[82px]
//                 top-[-35px]
//                 h-[37px]
//                 w-[110px]
//                 skew-x-[-18deg]
//                 rounded-t-[30px]
//                 bg-gradient-to-br
//                 from-white/20
//                 to-white/5
//                 md:left-[98px]
//                 md:top-[-43px]
//                 md:h-[44px]
//                 md:w-[135px]
//               "
//             />

//             {/* Body highlight */}
//             <div
//               className="
//                 absolute
//                 left-[30px]
//                 top-[17px]
//                 h-[4px]
//                 w-[110px]
//                 rounded-full
//                 bg-white/10
//                 md:left-[38px]
//                 md:w-[140px]
//               "
//             />

//             {/* Front light */}
//             <div
//               className="
//                 absolute
//                 right-[14px]
//                 top-[28px]
//                 h-[9px]
//                 w-[25px]
//                 rounded-full
//                 bg-white/80
//                 blur-[1px]
//               "
//             />

//             {/* Rear light */}
//             <div
//               className="
//                 absolute
//                 left-[12px]
//                 top-[28px]
//                 h-[9px]
//                 w-[14px]
//                 rounded-full
//                 bg-red-500/70
//               "
//             />

//             {/* Side detail */}
//             <div
//               className="
//                 absolute
//                 bottom-[18px]
//                 left-[50px]
//                 h-[2px]
//                 w-[170px]
//                 bg-white/5
//                 md:left-[60px]
//                 md:w-[205px]
//               "
//             />
//           </div>

//           {/* Back wheel */}
//           <div
//             className="
//               absolute
//               bottom-[4px]
//               left-[48px]
//               h-[58px]
//               w-[58px]
//               rounded-full
//               border-[10px]
//               border-[#0b0b0b]
//               bg-[#888]
//               shadow-lg
//               md:left-[60px]
//               md:h-[68px]
//               md:w-[68px]
//             "
//           >
//             <div className="absolute inset-[10px] rounded-full bg-[#222]" />
//           </div>

//           {/* Front wheel */}
//           <div
//             className="
//               absolute
//               bottom-[4px]
//               right-[38px]
//               h-[58px]
//               w-[58px]
//               rounded-full
//               border-[10px]
//               border-[#0b0b0b]
//               bg-[#888]
//               shadow-lg
//               md:right-[48px]
//               md:h-[68px]
//               md:w-[68px]
//             "
//           >
//             <div className="absolute inset-[10px] rounded-full bg-[#222]" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ScrollVisual;