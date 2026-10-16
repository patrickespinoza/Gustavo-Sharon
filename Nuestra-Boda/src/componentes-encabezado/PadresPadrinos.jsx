
import React from "react";
import { motion } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const mamaNovio = {
  titulo: "Mamá del novio",
  nombre: "Martha Alicia López Velázquez",
};

const mamaNovia = {
  titulo: "Mamá de la novia",
  nombre: "Ana Fermín Rodríguez",
};

const textos = {
  subtitulo: "Con amor y gratitud",
  titulo: "Nuestras Mamás",
  descripcion:
    "En compañía de las mamás de los novios.",
  fraseFinal:
    "Con su amor y bendición, comenzamos este nuevo capítulo de nuestras vidas.",
};

// ==========================================
// PALETA DE COLORES
// ==========================================

const COLORES = {
  naranja: "#B9471B",
  champagne: "#F1D5BF",
  marfil: "#FFF8F0",
  cafe: "#713819",
  cafeOscuro: "#422314",
};

// ==========================================
// ANIMACIONES
// ==========================================

const animacionTarjeta = {
  oculto: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// COMPONENTE PARA CADA MAMÁ
// ==========================================

const TarjetaMama = ({ titulo, nombre }) => {
  return (
    <motion.div
      variants={animacionTarjeta}
      className="
        relative
        flex w-full max-w-[440px]
        flex-col items-center
        justify-center
        px-5 py-10
        text-center
        sm:px-10 sm:py-12
      "
    >

      {/* DECORACIÓN SUPERIOR */}
      <div
        className="
          mb-7
          flex h-16 w-16
          items-center justify-center
          rounded-full
          border
        "
        style={{
          borderColor: COLORES.champagne,
          backgroundColor: COLORES.champagne,
        }}
      >
        <Flower2
          size={29}
          strokeWidth={1.2}
          style={{ color: COLORES.cafe }}
        />
      </div>

      {/* TÍTULO */}
      <h3
        className="
          mb-6
          text-xs uppercase
          tracking-[0.22em]
          sm:text-sm
        "
        style={{
          fontFamily: "'Playfair Display', serif",
          color: COLORES.cafe,
        }}
      >
        {titulo}
      </h3>

      {/* NOMBRE */}
      <p
        className="
          max-w-[360px]
          text-[23px]
          leading-relaxed
          sm:text-[29px]
        "
        style={{
          fontFamily: "'Playfair Display', serif",
          color: COLORES.cafeOscuro,
        }}
      >
        {nombre}
      </p>

      {/* SEPARADOR INFERIOR */}
      <div
        className="
          mt-8
          flex items-center
          justify-center gap-3
        "
      >
        <span
          className="h-px w-12"
          style={{
            backgroundColor: COLORES.cafe,
            opacity: 0.45,
          }}
        />

        <Heart
          size={14}
          strokeWidth={1.4}
          style={{ color: COLORES.naranja }}
        />

        <span
          className="h-px w-12"
          style={{
            backgroundColor: COLORES.cafe,
            opacity: 0.45,
          }}
        />
      </div>

    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Padres = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        px-5
        py-20
        sm:py-28
      "
      style={{
        backgroundColor: COLORES.marfil,
      }}
    >

      {/* ======================================
          DECORACIONES DE FONDO
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute -left-32 -top-32
          h-80 w-80
          rounded-full
          opacity-30
          blur-3xl
        "
        style={{
          backgroundColor: COLORES.champagne,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-32 -right-32
          h-80 w-80
          rounded-full
          opacity-30
          blur-3xl
        "
        style={{
          backgroundColor: COLORES.champagne,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >

          {/* SUBTÍTULO */}
          <p
            className="
              mb-4
              text-xs uppercase
              tracking-[0.3em]
              sm:text-sm
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            {textos.subtitulo}
          </p>

          {/* TÍTULO CURSIVO */}
          <h2
            className="
              px-2 pb-5
              text-[64px]
              leading-[1.3]
              sm:text-[85px]
              md:text-[105px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
              color: COLORES.cafeOscuro,
            }}
          >
            {textos.titulo}
          </h2>

          {/* DESCRIPCIÓN */}
          <p
            className="
              mx-auto mt-2
              max-w-xl
              text-base
              leading-relaxed
              sm:text-lg
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            {textos.descripcion}
          </p>

          {/* SEPARADOR */}
          <div
            className="
              mt-8
              flex items-center
              justify-center gap-4
            "
          >
            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
                opacity: 0.5,
              }}
            />

            <Heart
              size={16}
              strokeWidth={1.3}
              style={{ color: COLORES.naranja }}
            />

            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
                opacity: 0.5,
              }}
            />
          </div>

        </motion.div>

        {/* ======================================
            NOMBRES DE LAS MAMÁS
        ====================================== */}

        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            staggerChildren: 0.2,
          }}
          className="
            relative
            mx-auto mt-12
            grid max-w-5xl
            grid-cols-1
            items-center
            justify-items-center
            md:mt-16
            md:grid-cols-2
          "
        >

          {/* DIVISOR CENTRAL - ESCRITORIO */}
          <div
            className="
              pointer-events-none
              absolute left-1/2 top-1/2
              hidden h-44 w-px
              -translate-x-1/2
              -translate-y-1/2
              md:block
            "
            style={{
              backgroundColor: COLORES.cafe,
              opacity: 0.35,
            }}
          />

          {/* MAMÁ DEL NOVIO */}
          <TarjetaMama {...mamaNovio} />

          {/* MAMÁ DE LA NOVIA */}
          <TarjetaMama {...mamaNovia} />

        </motion.div>

        {/* ======================================
            FRASE FINAL
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          className="
            mx-auto mt-10
            max-w-2xl
            text-center
            sm:mt-16
          "
        >

          <Flower2
            size={25}
            strokeWidth={1.1}
            className="mx-auto mb-6"
            style={{
              color: COLORES.naranja,
            }}
          />

          <p
            className="
              text-base
              italic
              leading-loose
              sm:text-xl
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            {textos.fraseFinal}
          </p>

        </motion.div>

      </div>
    </section>
  );
};

export default Padres;
