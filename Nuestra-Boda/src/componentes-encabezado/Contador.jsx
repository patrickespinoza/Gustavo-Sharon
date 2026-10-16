
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN - GUSTAVO & SHARON
// ==========================================

const COLORES = {
  naranja: "#B9471B",
  naranjaOscuro: "#A8431E",
  champagne: "#F1D5BF",
  marfil: "#FFF8F0",
  cafe: "#713819",
  cafeOscuro: "#422314",
  blanco: "#FFFFFF",
};

// ==========================================
// COMPONENTE CONTADOR
// ==========================================

const Contador = ({
  titulo = "Faltan",
  texto = "PARA NUESTRO GRAN DÍA",
  frase = "11 de diciembre de 2026",
  fecha = "2026-12-11T00:00:00",
}) => {

  // ==========================================
  // CALCULAR TIEMPO RESTANTE
  // ==========================================

  const calculateTime = () => {
    const difference = new Date(fecha).getTime() - Date.now();

    if (difference > 0) {
      return {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / (1000 * 60)) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return {
      Días: 0,
      Horas: 0,
      Minutos: 0,
      Segundos: 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [fecha]);

  const tiempoTerminado = Object.values(timeLeft).every(
    (valor) => valor === 0
  );

  return (
    <section
      className="
        relative w-full
        overflow-hidden
        px-4 py-20
        sm:px-6 sm:py-28
      "
      style={{
        backgroundColor: COLORES.marfil,
      }}
    >

      {/* ======================================
          DECORACIÓN SUPERIOR
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute -left-20 -top-20
          h-64 w-64 rounded-full
          opacity-30 blur-3xl
        "
        style={{
          backgroundColor: COLORES.champagne,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute -bottom-20 -right-20
          h-72 w-72 rounded-full
          opacity-30 blur-3xl
        "
        style={{
          backgroundColor: COLORES.champagne,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center"
        >

          {/* SUBTÍTULO SUPERIOR */}
          <p
            className="
              mb-5 text-xs
              uppercase tracking-[0.4em]
              sm:text-sm
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            {titulo}
          </p>

          {/* TÍTULO CURSIVO */}
          <h2
            className="
              pb-5 text-[78px]
              leading-[1.2]
              sm:text-[105px]
              md:text-[125px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.cafeOscuro,
              fontWeight: 400,
            }}
          >
            Días
          </h2>

          {/* DESCRIPCIÓN */}
          <p
            className="
              mt-1 text-[11px]
              uppercase tracking-[0.25em]
              sm:text-sm
              sm:tracking-[0.35em]
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            {texto}
          </p>

        </motion.div>

        {/* ======================================
            CONTADOR EN ARCOS
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mx-auto mt-12
            grid max-w-[750px]
            grid-cols-4
            gap-2
            sm:mt-16 sm:gap-4
            md:gap-6
          "
        >

          {Object.entries(timeLeft).map(([item, valor], index) => (

            <motion.div
              key={item}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="
                relative flex
                min-w-0 flex-col
                items-center justify-center
                rounded-t-full
                px-1 pb-5 pt-8
                shadow-[0_10px_25px_rgba(113,56,25,0.06)]
                sm:pb-8 sm:pt-12
                md:pb-10 md:pt-14
              "
              style={{
                backgroundColor: COLORES.champagne,
                backgroundImage: `
                  linear-gradient(
                    180deg,
                    rgba(255,255,255,0.25),
                    rgba(255,255,255,0.02)
                  )
                `,
              }}
            >

              {/* NÚMERO */}
              <span
                className="
                  text-[30px]
                  leading-none
                  tabular-nums
                  sm:text-5xl
                  md:text-6xl
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  color: COLORES.cafeOscuro,
                }}
              >
                {String(valor).padStart(2, "0")}
              </span>

              {/* ETIQUETA */}
              <span
                className="
                  mt-4 text-[8px]
                  uppercase tracking-[0.06em]
                  sm:mt-6 sm:text-xs
                  sm:tracking-[0.16em]
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: COLORES.cafe,
                }}
              >
                {item}
              </span>

            </motion.div>

          ))}

        </motion.div>

        {/* ======================================
            DECORACIÓN INFERIOR
        ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          viewport={{ once: true }}
          className="
            mt-12 flex
            items-center justify-center
            gap-4
            sm:mt-16
          "
        >

          <div
            className="h-px w-16 sm:w-24"
            style={{
              backgroundColor: COLORES.cafe,
              opacity: 0.5,
            }}
          />

          <span
            className="text-xl"
            style={{
              color: COLORES.naranja,
            }}
          >
            ♥
          </span>

          <div
            className="h-px w-16 sm:w-24"
            style={{
              backgroundColor: COLORES.cafe,
              opacity: 0.5,
            }}
          />

        </motion.div>

        {/* MENSAJE CUANDO LLEGUE EL DÍA */}
        {tiempoTerminado && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-6 text-center
              text-2xl sm:text-3xl
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.naranja,
            }}
          >
            ¡Llegó nuestro gran día!
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default Contador;
