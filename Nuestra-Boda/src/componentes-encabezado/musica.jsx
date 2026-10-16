
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const MUSICA_URL = "/musica.mp3";
const VOLUMEN_INICIAL = 0.45;

// Paleta Gustavo & Sharon
const COLORES = {
  naranja: "#B9471B",
  naranjaOscuro: "#963713",
  champagne: "#F1D5BF",
  marfil: "#FFF8F0",
  cafe: "#713819",
  cafeOscuro: "#422314",
  blanco: "#FFFFFF",
};

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);

  // ==========================================
  // CONFIGURACIÓN DEL AUDIO
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUMEN_INICIAL;

    const alReproducir = () => {
      setReproduciendo(true);
      setCargando(false);
    };

    const alPausar = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const alTerminarCarga = () => {
      setCargando(false);
    };

    audio.addEventListener("playing", alReproducir);
    audio.addEventListener("pause", alPausar);
    audio.addEventListener("canplay", alTerminarCarga);
    audio.addEventListener("error", alTerminarCarga);

    return () => {
      audio.removeEventListener("playing", alReproducir);
      audio.removeEventListener("pause", alPausar);
      audio.removeEventListener("canplay", alTerminarCarga);
      audio.removeEventListener("error", alTerminarCarga);
    };
  }, []);

  // ==========================================
  // REPRODUCIR DESDE EL MODAL
  // ==========================================

  const reproducirMusica = async () => {
    const audio = audioRef.current;
    if (!audio || cargando) return;

    try {
      setCargando(true);
      audio.muted = false;
      setSilenciado(false);

      await audio.play();
      setMostrarModal(false);
    } catch (error) {
      console.error("No se pudo reproducir:", error);
      setCargando(false);
      setMostrarModal(false);
    }
  };

  // ==========================================
  // CONTINUAR SIN MÚSICA
  // ==========================================

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setReproduciendo(false);
    setCargando(false);
    setMostrarModal(false);
  };

  // ==========================================
  // REPRODUCIR / PAUSAR
  // ==========================================

  const alternarReproduccion = async () => {
    const audio = audioRef.current;
    if (!audio || cargando) return;

    if (audio.paused) {
      try {
        setCargando(true);
        await audio.play();
      } catch (error) {
        console.error("Error al reproducir:", error);
        setCargando(false);
      }
    } else {
      audio.pause();
    }
  };

  // ==========================================
  // SILENCIAR / ACTIVAR
  // ==========================================

  const alternarSilencio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  };

  return (
    <>
      {/* AUDIO PRINCIPAL */}
      <audio
        ref={audioRef}
        src={MUSICA_URL}
        loop
        preload="auto"
      />

      {/* ======================================
          MODAL DE BIENVENIDA
      ====================================== */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              overflow-y-auto
              px-5 py-6
              backdrop-blur-md
            "
            style={{
              backgroundColor: "rgba(32, 17, 10, 0.82)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              className="
                relative my-auto
                w-full max-w-[420px]
                overflow-hidden
                rounded-t-[150px]
                rounded-b-[20px]
                border
                px-7 pb-9 pt-14
                text-center
                shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                sm:px-10
              "
              style={{
                backgroundColor: COLORES.marfil,
                borderColor: COLORES.champagne,
              }}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
            >
              {/* DECORACIÓN SUPERIOR */}
              <div
                className="
                  pointer-events-none
                  absolute left-1/2 top-0
                  h-32 w-64
                  -translate-x-1/2
                  rounded-b-full
                  opacity-40
                "
                style={{
                  background: `radial-gradient(
                    ellipse at top,
                    ${COLORES.champagne},
                    transparent 75%
                  )`,
                }}
              />

              {/* BOTÓN CERRAR */}
              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Cerrar ventana de música"
                className="
                  absolute right-5 top-5 z-10
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full border
                  transition duration-300
                  hover:scale-105
                "
                style={{
                  borderColor: COLORES.champagne,
                  color: COLORES.cafe,
                  backgroundColor: COLORES.marfil,
                }}
              >
                <X size={17} strokeWidth={1.5} />
              </button>

              {/* ICONO MUSICAL */}
              <motion.div
                className="
                  relative mx-auto mb-7
                  flex h-20 w-20
                  items-center justify-center
                  rounded-full border
                  shadow-sm
                "
                style={{
                  backgroundColor: COLORES.champagne,
                  borderColor: COLORES.cafe,
                  color: COLORES.cafe,
                }}
                animate={{
                  rotate: reproduciendo ? 360 : 0,
                }}
                transition={{
                  duration: 10,
                  repeat: reproduciendo ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <Music size={30} strokeWidth={1.2} />
              </motion.div>

              {/* SUBTÍTULO */}
              <p
                className="
                  mb-2 text-[10px]
                  uppercase tracking-[0.35em]
                  sm:text-xs
                "
                style={{
                  color: COLORES.cafe,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Nuestra
              </p>

              {/* ======================================
    TÍTULO PRINCIPAL - GREAT VIBES
====================================== */}

<h2
  className="
    mb-3 pb-4
    text-[75px]
    leading-[1.3]
    sm:text-[95px]
  "
  style={{
    fontFamily: "'Great Vibes', cursive",
    color: COLORES.naranja,
    fontWeight: 400,
  }}
>
  Música
</h2>

              {/* DIVISOR */}
              <div className="mb-6 flex items-center justify-center gap-3">
                <span
                  className="h-px w-12"
                  style={{ backgroundColor: COLORES.cafe }}
                />
                <span
                  className="text-lg"
                  style={{ color: COLORES.naranja }}
                >
                  ♥
                </span>
                <span
                  className="h-px w-12"
                  style={{ backgroundColor: COLORES.cafe }}
                />
              </div>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  mx-auto mb-8 max-w-[290px]
                  text-sm leading-7
                  sm:text-base
                "
                style={{
                  color: COLORES.cafeOscuro,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Esta canción hace aún más especial
                nuestro gran día.
                <br />
                ¿Deseas escucharla?
              </p>

              {/* NOMBRES */}
              <p
                className="
                  mb-8 text-[11px]
                  uppercase tracking-[0.2em]
                "
                style={{
                  color: COLORES.cafe,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Gustavo & Sharon
              </p>

              {/* BOTONES */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={reproducirMusica}
                  disabled={cargando}
                  className="
                    flex w-full
                    items-center justify-center
                    gap-3 rounded-full
                    px-5 py-4
                    text-xs uppercase
                    tracking-[0.17em]
                    shadow-md
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:brightness-110
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                  style={{
                    backgroundColor: COLORES.naranja,
                    color: COLORES.blanco,
                  }}
                >
                  {cargando ? (
                    <>
                      <span
                        className="
                          h-4 w-4 animate-spin
                          rounded-full
                          border-2 border-white/40
                          border-t-white
                        "
                      />
                      Cargando
                    </>
                  ) : (
                    <>
                      <Play
                        size={16}
                        fill="currentColor"
                      />
                      Escuchar música
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={continuarSinMusica}
                  className="
                    w-full rounded-full
                    border px-5 py-4
                    text-xs uppercase
                    tracking-[0.15em]
                    transition-all duration-300
                    hover:brightness-95
                  "
                  style={{
                    borderColor: COLORES.cafe,
                    backgroundColor: COLORES.champagne,
                    color: COLORES.cafeOscuro,
                  }}
                >
                  Continuar sin música
                </button>
              </div>

              {/* DETALLE INFERIOR */}
              <div
                className="
                  mx-auto mt-8
                  h-px w-20
                "
                style={{
                  backgroundColor: COLORES.cafe,
                  opacity: 0.4,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================
          CONTROLES FLOTANTES
      ====================================== */}

      <AnimatePresence>
        {!mostrarModal && (
          <motion.div
            className="
              fixed bottom-5 right-5
              z-[9998]
              flex items-center gap-2
              rounded-full border
              p-2
              shadow-[0_12px_35px_rgba(0,0,0,0.2)]
              backdrop-blur-md
            "
            style={{
              backgroundColor: COLORES.marfil,
              borderColor: COLORES.champagne,
            }}
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{ duration: 0.45 }}
          >
            {/* REPRODUCIR / PAUSAR */}
            <button
              type="button"
              onClick={alternarReproduccion}
              disabled={cargando}
              aria-label={
                reproduciendo
                  ? "Pausar música"
                  : "Reproducir música"
              }
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full
                transition duration-300
                hover:scale-105
                disabled:opacity-70
              "
              style={{
                backgroundColor: COLORES.naranja,
                color: COLORES.blanco,
              }}
            >
              {cargando ? (
                <span
                  className="
                    h-4 w-4 animate-spin
                    rounded-full
                    border-2 border-white/40
                    border-t-white
                  "
                />
              ) : reproduciendo ? (
                <Pause
                  size={18}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={18}
                  fill="currentColor"
                />
              )}
            </button>

            {/* SILENCIAR / ACTIVAR */}
            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={
                silenciado
                  ? "Activar sonido"
                  : "Silenciar música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                transition duration-300
                hover:scale-105
              "
              style={{
                color: COLORES.cafe,
              }}
            >
              {silenciado ? (
                <VolumeX size={19} strokeWidth={1.5} />
              ) : (
                <Volume2 size={19} strokeWidth={1.5} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;
