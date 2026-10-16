
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const FOTO_FINAL = {
  src: "/final.jpg",
  alt: "Fotografía final de Gustavo y Sharon",

  // ========================================
  // AJUSTAR POSICIÓN DE LA FOTOGRAFÍA
  // ========================================

  // Ejemplos:
  // "center center" = Centrada
  // "center 20%"    = Mostrar más la parte superior
  // "center 70%"    = Mostrar más la parte inferior
  // "left center"   = Mover el encuadre a la izquierda
  // "right center"  = Mover el encuadre a la derecha

  position: "center 30%",
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
  blanco: "#FFFFFF",
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const FinalBoda = () => {
  return (
    <section
      className="
        relative w-full
        overflow-hidden
      "
      style={{
        backgroundColor: COLORES.marfil,
      }}
    >

      {/* ======================================
          FOTOGRAFÍA FINAL
          SIN TEXTOS ENCIMA
      ====================================== */}

      <div
        className="
          relative w-full
          h-[85vh]
          min-h-[580px]
          sm:h-[95vh]
          md:h-screen
          overflow-hidden
        "
        style={{
          backgroundColor: COLORES.champagne,
        }}
      >
        <img
          src={FOTO_FINAL.src}
          alt={FOTO_FINAL.alt}
          className="
            absolute inset-0
            h-full w-full
            object-cover
          "
          style={{
            objectPosition: FOTO_FINAL.position,
          }}
          draggable={false}
        />
      </div>

      {/* ======================================
          MENSAJE FINAL DEBAJO DE LA FOTO
      ====================================== */}

      <div
        className="
          relative w-full
          px-6 py-20
          sm:px-8 sm:py-28
        "
        style={{
          backgroundColor: COLORES.marfil,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            flex max-w-3xl
            flex-col items-center
            text-center
          "
        >

          {/* ======================================
              ADORNO SUPERIOR
          ====================================== */}

          <div
            className="
              mb-10
              flex items-center
              justify-center gap-4
            "
          >
            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
              }}
            />

            <Heart
              size={18}
              strokeWidth={1.3}
              style={{
                color: COLORES.naranja,
              }}
            />

            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
              }}
            />
          </div>

          {/* ======================================
              PRIMER PÁRRAFO
          ====================================== */}

          <p
            className="
              max-w-2xl
              text-lg
              leading-[2]
              sm:text-xl
              sm:leading-[2.1]
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafeOscuro,
            }}
          >
            Nuestro sueño de amor se convierte
            en promesa delante de Dios.
            Jesús será el centro de nuestro hogar
            y su presencia, nuestra mayor bendición.
          </p>

          {/* ======================================
              SEGUNDO PÁRRAFO
          ====================================== */}

          <p
            className="
              mt-9 max-w-2xl
              text-lg
              leading-[2]
              sm:text-xl
              sm:leading-[2.1]
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            Con el corazón lleno de gratitud
            y alegría, te esperamos para compartir
            el inicio de nuestra historia más bonita.
          </p>

          {/* ======================================
              FRASE FINAL DESTACADA
          ====================================== */}

          <motion.h2
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
              mt-12
              pb-5
              text-[49px]
              leading-[1.35]
              sm:text-[68px]
              md:text-[78px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
              color: COLORES.naranja,
            }}
          >
            ¡Te esperamos en
            nuestro para siempre!
          </motion.h2>

          {/* ======================================
              ADORNO INFERIOR
          ====================================== */}

          <div
            className="
              mt-5
              flex items-center
              justify-center gap-4
            "
          >
            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
              }}
            />

            <Heart
              size={18}
              strokeWidth={1.3}
              style={{
                color: COLORES.naranja,
              }}
            />

            <span
              className="h-px w-16"
              style={{
                backgroundColor: COLORES.cafe,
              }}
            />
          </div>

          {/* ======================================
              NOMBRES DE LOS NOVIOS
          ====================================== */}

          <p
            className="
              mt-10
              text-sm
              uppercase
              tracking-[0.2em]
              sm:text-base
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            Gustavo & Sharon
          </p>



        </motion.div>
      </div>

    </section>
  );
};

export default FinalBoda;
