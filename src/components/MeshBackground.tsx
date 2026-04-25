import { motion } from "framer-motion";

export function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-black">
      {/* 1. Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,191,0,0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,191,0,0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Vibrant Mesh Lights */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left Spotlight - Amber */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[100px] bg-primary/20"
        />

        {/* Bottom Right Warmth - Gold/Orange */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-amber-600/15"
        />

        {/* Center Glow for Depth */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[160px] bg-primary/10"
        />
      </div>

      {/* 3. Global Vignette for high-end look */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_90%)]" />
    </div>
  );
}
