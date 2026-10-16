
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// PORTADA - GUSTAVO & SHARON
// ==========================================

export default function Portada() {
  return (
    <section
      className="
        relative
        h-screen
        min-h-[600px]
        w-full
        overflow-hidden
      "
    >

      {/* ======================================
          FOTOGRAFÍA DE PORTADA
      ====================================== */}

      <motion.img
        src="/portada.jpg"
        alt="Gustavo y Sharon"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[center_35%]
        "
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />

      {/* ======================================
          DEGRADADO PARA LEGIBILIDAD
      ====================================== */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/75
          via-black/15
          to-transparent
        "
      />

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <div
        className="
          relative z-10
          flex h-full
          flex-col
          items-center
          justify-end
          px-5
          pb-24
          text-center
          sm:px-8
          sm:pb-28
          md:pb-32
        "
      >

        {/* ======================================
            NOMBRES DE LOS NOVIOS
        ====================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="
            w-full
            text-white
            text-[clamp(3.5rem,10vw,8rem)]
            leading-[1.35]
            font-normal
            drop-shadow-[0_5px_18px_rgba(0,0,0,0.45)]
          "
          style={{
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Gustavo & Sharon
        </motion.h1>

        {/* ======================================
            LÍNEA DECORATIVA
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className="
            my-6
            h-px
            w-28
            bg-white/80
            sm:my-8
            sm:w-36
          "
        />

        {/* ======================================
            FECHA DE LA BODA
        ====================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="
            text-white
            text-xs
            uppercase
            tracking-[0.18em]
            sm:text-base
            sm:tracking-[0.3em]
            md:text-lg
            drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]
          "
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
          }}
        >
          11 · Diciembre · 2026
        </motion.p>

      </div>
    </section>
  );
}
