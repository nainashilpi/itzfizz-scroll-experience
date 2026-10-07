// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const stats = [
//   {
//     value: "58%",
//     title: "Increase",
//     description: "in digital engagement",
//   },
//   {
//     value: "23%",
//     title: "Decrease",
//     description: "in customer phone calls",
//   },
//   {
//     value: "27%",
//     title: "Growth",
//     description: "in user retention",
//   },
//   {
//     value: "40%",
//     title: "Faster",
//     description: "website experiences",
//   },
// ];

// function Stats() {
//   const statsRef = useRef(null);

//   useGSAP(
//     () => {
//       const items = gsap.utils.toArray(".stat-item");

//       items.forEach((item, index) => {
//         gsap.fromTo(
//           item,
//           {
//             opacity: 0,
//             y: 30,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             ease: "power2.out",

//             scrollTrigger: {
//               trigger: statsRef.current,
//               start: `top+=${index * 180} top`,
//               end: `top+=${index * 180 + 180} top`,
//               scrub: 1,
//             },
//           }
//         );
//       });
//     },
//     {
//       scope: statsRef,
//     }
//   );

//   return (
//     <div
//       ref={statsRef}
//       className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0"
//     >
//       {stats.map((stat, index) => (
//         <div
//           key={index}
//           className="stat-item border-l border-black/15 pl-5 opacity-0"
//         >
//           <p className="text-3xl font-medium tracking-tight md:text-5xl">
//             {stat.value}
//           </p>

//           <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] md:text-xs">
//             {stat.title}
//           </p>

//           <p className="mt-2 max-w-[170px] text-xs leading-relaxed text-black/45 md:text-sm">
//             {stat.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Stats;