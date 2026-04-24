import { motion } from "framer-motion";

export function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#000000]">
      {/* 1. Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,191,0,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,191,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* 2. Vibrant Mesh Lights */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left Spotlight */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
        />

        {/* Bottom Right Warmth */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 70%)' }}
        />

        {/* Center Glow for Depth */}
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 60%)' }}
        />
      </div>

      {/* 3. Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
    </div>
  );
}
