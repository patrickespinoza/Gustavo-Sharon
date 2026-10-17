
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Gift,
  Copy,
  Check,
  X,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const DATOS_BANCARIOS = {
  banco: "Banco Azteca",
  cuenta: "2057 0160 9346 24",
  titular: "Gustavo Amilcar Sánchez López",
  concepto: "G & S",
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

const Regalos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [errorCopia, setErrorCopia] = useState(false);

  // ==========================================
  // COPIAR NÚMERO DE CUENTA
  // ==========================================

  const copiarCuenta = async () => {
    try {
      // Copiamos solamente los números,
      // sin espacios, para facilitar la transferencia.
      const cuentaSinEspacios =
        DATOS_BANCARIOS.cuenta.replace(/\s/g, "");

      await navigator.clipboard.writeText(
        cuentaSinEspacios
      );

      setCopiado(true);
      setErrorCopia(false);

      setTimeout(() => {
        setCopiado(false);
      }, 2500);
    } catch (error) {
      setCopiado(false);
      setErrorCopia(true);

      setTimeout(() => {
        setErrorCopia(false);
      }, 3000);
    }
  };

  // ==========================================
  // CERRAR MODAL CON ESCAPE
  // Y BLOQUEAR SCROLL
  // ==========================================

  useEffect(() => {
    if (!mostrarModal) return;

    const scrollAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        setMostrarModal(false);
      }
    };

    document.addEventListener(
      "keydown",
      cerrarConEscape
    );

    return () => {
      document.body.style.overflow = scrollAnterior;

      document.removeEventListener(
        "keydown",
        cerrarConEscape
      );
    };
  }, [mostrarModal]);

  return (
    <section
      className="
        relative w-full
        overflow-hidden
        px-5 py-20
        sm:px-6 sm:py-28
      "
      style={{
        backgroundColor: COLORES.marfil,
      }}
    >
      {/* ======================================
          TARJETA PRINCIPAL
      ====================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 45,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-t-[110px]
          rounded-b-[18px]
          border
          sm:rounded-t-[160px]
        "
        style={{
          backgroundColor: COLORES.champagne,
          borderColor: COLORES.cafe,
        }}
      >
        <div
          className="
            px-6 pb-16 pt-16
            text-center
            sm:px-14
            sm:pb-20
            sm:pt-20
          "
        >

          {/* ======================================
              SUBTÍTULO
          ====================================== */}

          <p
            className="
              text-xs uppercase
              tracking-[0.3em]
              sm:text-sm
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            Con cariño
          </p>

          {/* ======================================
              TÍTULO GREAT VIBES
          ====================================== */}

          <h2
            className="
              mt-5 pb-5
              text-[75px]
              leading-[1.25]
              sm:text-[100px]
              md:text-[115px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.cafeOscuro,
              fontWeight: 400,
            }}
          >
            Regalos
          </h2>

          {/* ======================================
              SEPARADOR DECORATIVO
          ====================================== */}

          <div
            className="
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
              size={17}
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
    ÍCONO DECORATIVO DE REGALO
====================================== */}

<motion.div
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="
    mx-auto mt-10
    flex h-28 w-28
    items-center justify-center
    rounded-full border
    sm:h-32 sm:w-32
  "
  style={{
    backgroundColor: COLORES.marfil,
    borderColor: COLORES.cafe,
  }}
>
  <Gift
    size={54}
    strokeWidth={1.2}
    style={{
      color: COLORES.naranja,
    }}
  />
</motion.div>

          {/* ======================================
              MENSAJE
          ====================================== */}

          <p
            className="
              mx-auto mt-10
              max-w-2xl
              text-lg
              leading-9
              sm:text-xl
              sm:leading-10
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafeOscuro,
            }}
          >
            El mejor regalo será compartir
            este día contigo.

            <br />
            <br />

            Si deseas tener un detalle adicional con nosotros, puedes hacerlo mediante un regalo físico o una transferencia bancaria. ¡Agradecemos de corazón tus muestras de cariño!
          </p>

          {/* ======================================
              BOTÓN VER DATOS
          ====================================== */}

          <motion.button
            type="button"
            onClick={() => setMostrarModal(true)}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              mt-12
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-full
              px-8 py-4
              text-sm
              tracking-wide
              transition-colors
              duration-300
              sm:px-10
              sm:text-base
            "
            style={{
              backgroundColor: COLORES.cafe,
              color: COLORES.blanco,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <Gift
              size={19}
              strokeWidth={1.5}
            />

            Ver datos bancarios
          </motion.button>

        </div>
      </motion.div>

      {/* ======================================
          MODAL DATOS BANCARIOS
      ====================================== */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={() => setMostrarModal(false)}
            className="
              fixed inset-0
              z-[9999]
              flex items-center
              justify-center
              overflow-y-auto
              px-5 py-8
            "
            style={{
              // Fondo sólido sin blur.
              backgroundColor: COLORES.cafeOscuro,
            }}
          >

            {/* ======================================
                TARJETA DEL MODAL
            ====================================== */}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-datos-bancarios"
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 35,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                my-auto
                w-full
                max-w-[420px]
                rounded-t-[90px]
                rounded-b-[18px]
                border
                px-6
                pb-9
                pt-16
                text-center
                sm:px-9
              "
              style={{
                backgroundColor: COLORES.champagne,
                borderColor: COLORES.cafe,
              }}
            >

              {/* ======================================
                  CERRAR MODAL
              ====================================== */}

              <button
                type="button"
                onClick={() => setMostrarModal(false)}
                aria-label="Cerrar datos bancarios"
                className="
                  absolute
                  right-5 top-5
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: COLORES.cafe,
                  color: COLORES.blanco,
                }}
              >
                <X
                  size={19}
                  strokeWidth={1.5}
                />
              </button>

              {/* ======================================
                  ÍCONO DECORATIVO
              ====================================== */}

              <div
                className="
                  mx-auto mb-5
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full border
                "
                style={{
                  backgroundColor: COLORES.marfil,
                  borderColor: COLORES.cafe,
                }}
              >
                <Gift
                  size={26}
                  strokeWidth={1.3}
                  style={{
                    color: COLORES.naranja,
                  }}
                />
              </div>

              {/* ======================================
                  TÍTULO
              ====================================== */}

              <h3
                id="titulo-datos-bancarios"
                className="
                  pb-3
                  text-[48px]
                  leading-[1.3]
                  sm:text-[58px]
                "
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: COLORES.cafeOscuro,
                }}
              >
                Transferencia
              </h3>

              <p
                className="
                  text-xs uppercase
                  tracking-[0.2em]
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: COLORES.cafe,
                }}
              >
                Datos bancarios
              </p>

              {/* ======================================
                  SEPARADOR
              ====================================== */}

              <div
                className="
                  mx-auto my-7
                  h-px w-24
                "
                style={{
                  backgroundColor: COLORES.cafe,
                }}
              />

              {/* ======================================
                  BANCO
              ====================================== */}

              <p
                className="
                  text-xs uppercase
                  tracking-[0.2em]
                "
                style={{
                  color: COLORES.cafe,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Banco
              </p>

              <h4
                className="
                  mt-2 text-2xl
                  sm:text-3xl
                "
                style={{
                  color: COLORES.cafeOscuro,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {DATOS_BANCARIOS.banco}
              </h4>

              {/* ======================================
                  NÚMERO DE CUENTA
              ====================================== */}

              <div
                className="
                  mt-7 rounded-2xl
                  border px-3 py-5
                "
                style={{
                  backgroundColor: COLORES.marfil,
                  borderColor: COLORES.cafe,
                }}
              >
                <p
                  className="
                    text-xs uppercase
                    tracking-[0.15em]
                  "
                  style={{
                    color: COLORES.cafe,
                  }}
                >
                  Número de cuenta
                </p>

                <p
                  className="
                    mt-3
                    break-words
                    text-lg
                    tracking-[0.08em]
                    sm:text-xl
                  "
                  style={{
                    color: COLORES.cafeOscuro,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {DATOS_BANCARIOS.cuenta}
                </p>
              </div>

              {/* ======================================
                  TITULAR
              ====================================== */}

              <div className="mt-7">
                <p
                  className="
                    text-xs uppercase
                    tracking-[0.18em]
                  "
                  style={{
                    color: COLORES.cafe,
                  }}
                >
                  Titular de la cuenta
                </p>

                <p
                  className="
                    mt-2 text-base
                    leading-relaxed
                    sm:text-lg
                  "
                  style={{
                    color: COLORES.cafeOscuro,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {DATOS_BANCARIOS.titular}
                </p>
              </div>

              {/* ======================================
                  CONCEPTO
              ====================================== */}

              <div className="mt-6">
                <p
                  className="
                    text-xs uppercase
                    tracking-[0.18em]
                  "
                  style={{
                    color: COLORES.cafe,
                  }}
                >
                  Concepto de transferencia
                </p>

                <p
                  className="
                    mt-2 text-xl
                  "
                  style={{
                    color: COLORES.cafeOscuro,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {DATOS_BANCARIOS.concepto}
                </p>
              </div>

              {/* ======================================
                  BOTÓN COPIAR CUENTA
              ====================================== */}

              <motion.button
                type="button"
                onClick={copiarCuenta}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  mt-9
                  flex w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  px-5 py-4
                  text-sm
                  sm:text-base
                "
                style={{
                  backgroundColor: COLORES.cafe,
                  color: COLORES.blanco,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {copiado ? (
                  <>
                    <Check size={19} />
                    Número copiado
                  </>
                ) : (
                  <>
                    <Copy
                      size={18}
                      strokeWidth={1.5}
                    />
                    Copiar número de cuenta
                  </>
                )}
              </motion.button>

              {/* ======================================
                  CONFIRMACIÓN DE COPIA
              ====================================== */}

              {copiado && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 text-sm"
                  style={{
                    color: COLORES.cafe,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  ¡Número copiado correctamente!
                </motion.p>
              )}

              {errorCopia && (
                <p
                  className="mt-4 text-sm"
                  style={{
                    color: COLORES.naranja,
                  }}
                >
                  No se pudo copiar automáticamente.
                  Puedes seleccionar el número de cuenta.
                </p>
              )}

              {/* ======================================
                  MENSAJE FINAL
              ====================================== */}

              <p
                className="
                  mt-8
                  text-sm italic
                  leading-relaxed
                "
                style={{
                  color: COLORES.cafe,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Gracias por ser parte
                de nuestra historia.
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Regalos;
