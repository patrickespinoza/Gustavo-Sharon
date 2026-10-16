
import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  Flower2,
  MapPin,
  Heart,
  Clock3,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const EVENTOS = [
  {
    id: 1,
    tipo: "Ceremonia",
    hora: "03:00 PM",
    lugar: "Iglesia Getsemaní",
    direccion: "Huamantla, Tlaxcala",
    ubicacion:
      "https://maps.app.goo.gl/2TqJ5EnPAR5ijZrG9",
    icono: Church,
  },
  {
    id: 2,
    tipo: "Boda Civil y Recepción",
    hora: "05:00 PM",
    lugar: "Salón Jardín San Francisco",
    direccion:
      "Insurgentes 219, Centro, 90501 Huamantla, Tlax.",
    ubicacion:
      "https://maps.app.goo.gl/1oZuqiFeXyJm41KR7",
    icono: Flower2,
  },
];

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
// TARJETA DE UBICACIÓN
// ==========================================

const TarjetaEvento = ({ evento }) => {
  const Icono = evento.icono;

  return (
    <motion.article
      variants={animacionTarjeta}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      className="
        relative flex
        h-full w-full
        flex-col items-center
        overflow-hidden
        rounded-t-[110px]
        rounded-b-[16px]
        border
        px-5 pb-10 pt-14
        text-center
        sm:rounded-t-[150px]
        sm:px-9 sm:pb-12 sm:pt-16
      "
      style={{
        backgroundColor: COLORES.champagne,
        borderColor: COLORES.cafe,
      }}
    >

      {/* ======================================
          ÍCONO PRINCIPAL
      ====================================== */}

      <div
        className="
          mb-7 flex
          h-16 w-16
          items-center justify-center
          rounded-full border
        "
        style={{
          backgroundColor: COLORES.marfil,
          borderColor: COLORES.cafe,
        }}
      >
        <Icono
          size={30}
          strokeWidth={1.2}
          style={{
            color: COLORES.cafe,
          }}
        />
      </div>

      {/* ======================================
          TIPO DE EVENTO
      ====================================== */}

      <p
        className="
          min-h-[40px]
          text-xs uppercase
          tracking-[0.2em]
          leading-relaxed
          sm:text-sm
        "
        style={{
          fontFamily: "'Playfair Display', serif",
          color: COLORES.cafe,
        }}
      >
        {evento.tipo}
      </p>

      {/* ======================================
          HORA
      ====================================== */}

      <div
        className="
          mt-5 flex
          items-center justify-center
          gap-2
        "
      >
        <Clock3
          size={17}
          strokeWidth={1.3}
          style={{
            color: COLORES.naranja,
          }}
        />

        <p
          className="
            text-2xl
            sm:text-3xl
          "
          style={{
            fontFamily: "'Playfair Display', serif",
            color: COLORES.cafeOscuro,
          }}
        >
          {evento.hora}
        </p>
      </div>

      {/* ======================================
          DIVISOR DECORATIVO
      ====================================== */}

      <div
        className="
          my-7 flex
          items-center justify-center
          gap-3
        "
      >
        <span
          className="h-px w-12"
          style={{
            backgroundColor: COLORES.cafe,
          }}
        />

        <Heart
          size={14}
          strokeWidth={1.3}
          style={{
            color: COLORES.naranja,
          }}
        />

        <span
          className="h-px w-12"
          style={{
            backgroundColor: COLORES.cafe,
          }}
        />
      </div>

      {/* ======================================
          NOMBRE DEL LUGAR
      ====================================== */}

      <h3
        className="
          max-w-[350px]
          text-2xl
          leading-snug
          sm:text-[1.8rem]
        "
        style={{
          fontFamily: "'Playfair Display', serif",
          color: COLORES.cafeOscuro,
          fontWeight: 500,
        }}
      >
        {evento.lugar}
      </h3>

      {/* ======================================
          DIRECCIÓN
      ====================================== */}

      <div
        className="
          mt-5 flex
          max-w-[350px]
          items-start justify-center
          gap-2
        "
      >
        <MapPin
          size={18}
          strokeWidth={1.4}
          className="mt-1 shrink-0"
          style={{
            color: COLORES.naranja,
          }}
        />

        <p
          className="
            text-sm leading-7
            sm:text-base
          "
          style={{
            fontFamily: "'Playfair Display', serif",
            color: COLORES.cafe,
          }}
        >
          {evento.direccion}
        </p>
      </div>

      {/* ESPACIO FLEXIBLE */}
      <div className="flex-1 min-h-8" />

      {/* ======================================
          BOTÓN GOOGLE MAPS
      ====================================== */}

      <motion.a
        href={evento.ubicacion}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ubicación de ${evento.lugar}`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="
          inline-flex
          min-h-[50px]
          w-full max-w-[260px]
          items-center justify-center
          gap-3
          rounded-full
          px-5 py-4
          text-xs uppercase
          tracking-[0.15em]
          transition-colors
          duration-300
          hover:bg-[#8A4827]
          sm:text-sm
        "
        style={{
          backgroundColor: COLORES.cafe,
          color: COLORES.blanco,
        }}
      >
        <MapPin
          size={17}
          strokeWidth={1.5}
        />
        Ver ubicación
      </motion.a>

    </motion.article>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Celebracion = ({
  titulo = "Celebración",
  fecha = "11 de diciembre de 2026",
}) => {
  return (
    <section
      className="
        relative w-full
        overflow-hidden
        px-5 py-20
        sm:px-6 sm:py-28
      "
      style={{
        backgroundColor: COLORES.naranja,
      }}
    >

      <div className="relative mx-auto max-w-6xl">

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
          transition={{
            duration: 0.9,
          }}
          className="
            mb-14 text-center
            sm:mb-16
          "
        >

          {/* FECHA */}
          <p
            className="
              text-xs uppercase
              tracking-[0.3em]
              sm:text-sm
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.blanco,
            }}
          >
            {fecha}
          </p>

          {/* TÍTULO GREAT VIBES */}
          <h2
            className="
              mt-5 pb-5
              text-[75px]
              leading-[1.25]
              sm:text-[100px]
              md:text-[120px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.blanco,
              fontWeight: 400,
            }}
          >
            {titulo}
          </h2>

          {/* DIVISOR */}
          <div
            className="
              my-5 flex
              items-center justify-center
              gap-4
            "
          >
            <span className="h-px w-16 bg-white" />

            <Heart
              size={18}
              strokeWidth={1.3}
              className="text-white"
            />

            <span className="h-px w-16 bg-white" />
          </div>

        
        </motion.div>

        {/* ======================================
            TARJETAS DE LOS EVENTOS
        ====================================== */}

        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            staggerChildren: 0.2,
          }}
          className="
            mx-auto grid
            max-w-[1000px]
            grid-cols-1
            items-stretch
            gap-8
            md:grid-cols-2
            md:gap-10
          "
        >
          {EVENTOS.map((evento) => (
            <TarjetaEvento
              key={evento.id}
              evento={evento}
            />
          ))}
        </motion.div>

        {/* ======================================
            FRASE INFERIOR
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
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-16 text-center
          "
        >
          <Flower2
            size={28}
            strokeWidth={1.1}
            className="mx-auto mb-5 text-white"
          />

          <p
            className="
              mx-auto max-w-xl
              text-lg italic
              leading-relaxed
              sm:text-xl
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.blanco,
            }}
          >
            ¡Será un honor compartir contigo
            cada momento de nuestro gran día!
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Celebracion;
