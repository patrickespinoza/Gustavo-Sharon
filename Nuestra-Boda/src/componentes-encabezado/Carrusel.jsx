
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const IMAGENES = [
  {
    src: "/Carrusel01.jpg",
    alt: "Gustavo y Sharon - Fotografía 1",
    position: "center 40%",
  },
  {
    src: "/Carrusel02.jpg",
    alt: "Gustavo y Sharon - Fotografía 2",
    position: "center 35%",
  },
  {
    src: "/Carrusel03.jpg",
    alt: "Gustavo y Sharon - Fotografía 3",
    position: "center 50%",
  },
  {
    src: "/Carrusel04.jpg",
    alt: "Gustavo y Sharon - Fotografía 4",
    position: "center 40%",
  },
  {
    src: "/Carrusel05.jpg",
    alt: "Gustavo y Sharon - Fotografía 5",
    position: "center 35%",
  },
  {
    src: "/Carrusel06.jpg",
    alt: "Gustavo y Sharon - Fotografía 6",
    position: "center 50%",
  },
];

// ==========================================
// CONFIGURACIÓN
// ==========================================

const CAMBIO_AUTOMATICO = 5000;
const DURACION_TRANSICION = 0.65;

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

const Carrusel = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [indiceSolicitado, setIndiceSolicitado] = useState(0);
  const [imagenesCargadas, setImagenesCargadas] = useState({});
  const [imagenesConError, setImagenesConError] = useState({});

  const imagenesRef = useRef({});
  const ultimoCambioRef = useRef(0);

  const totalImagenes = IMAGENES.length;

  // ==========================================
  // PRECARGAR Y DECODIFICAR LAS FOTOGRAFÍAS
  // ==========================================

  useEffect(() => {
    let activo = true;

    const precargarImagen = async (imagen, index) => {
      const img = new Image();

      imagenesRef.current[index] = img;

      try {
        // Esperamos la descarga completa.
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imagen.src;

          if (img.complete) {
            if (img.naturalWidth > 0) {
              resolve();
            } else {
              reject(new Error("Imagen no disponible"));
            }
          }
        });

        // Esperamos la decodificación cuando sea compatible.
        if (typeof img.decode === "function") {
          try {
            await img.decode();
          } catch {
            // La imagen ya cargó y puede mostrarse.
          }
        }

        if (activo) {
          setImagenesCargadas((prev) => ({
            ...prev,
            [index]: true,
          }));
        }
      } catch {
        if (activo) {
          setImagenesConError((prev) => ({
            ...prev,
            [index]: true,
          }));
        }
      }
    };

    // Se inicia la precarga de todas las fotografías.
    IMAGENES.forEach((imagen, index) => {
      precargarImagen(imagen, index);
    });

    return () => {
      activo = false;
      imagenesRef.current = {};
    };
  }, []);

  // ==========================================
  // NAVEGACIÓN SIN MOSTRAR FONDOS VACÍOS
  // ==========================================

  const cambiarImagen = (nuevoIndice) => {
    if (totalImagenes === 0) return;

    const indice =
      (nuevoIndice + totalImagenes) % totalImagenes;

    if (imagenesConError[indice]) return;

    // Si todavía no está lista, conservamos la foto actual.
    setIndiceSolicitado(indice);
    ultimoCambioRef.current = Date.now();
  };

  // Solo cambiamos cuando la nueva foto está lista.
  useEffect(() => {
    if (imagenesCargadas[indiceSolicitado]) {
      setIndiceActual(indiceSolicitado);
    }
  }, [indiceSolicitado, imagenesCargadas]);

  const siguienteImagen = () => {
    cambiarImagen(indiceSolicitado + 1);
  };

  const anteriorImagen = () => {
    cambiarImagen(indiceSolicitado - 1);
  };

  // ==========================================
  // CAMBIO AUTOMÁTICO
  // ==========================================

  useEffect(() => {
    if (totalImagenes <= 1) return;

    const intervalo = setInterval(() => {
      const siguiente =
        (indiceSolicitado + 1) % totalImagenes;

      if (imagenesConError[siguiente]) return;

      // No iniciar otro cambio si la foto
      // solicitada todavía está cargando.
      if (!imagenesCargadas[indiceSolicitado]) return;

      // Evitar cambios automáticos inmediatamente
      // después de una navegación manual.
      if (
        Date.now() - ultimoCambioRef.current <
        CAMBIO_AUTOMATICO
      ) {
        return;
      }

      cambiarImagen(siguiente);
    }, CAMBIO_AUTOMATICO);

    return () => clearInterval(intervalo);
  }, [
    indiceSolicitado,
    totalImagenes,
    imagenesCargadas,
    imagenesConError,
  ]);

  // ==========================================
  // ESTADO DE CARGA INICIAL
  // ==========================================

  const primeraImagenLista = imagenesCargadas[0];

  return (
    <section
      className="
        relative w-full
        overflow-hidden
        px-5 py-20
        sm:px-6 sm:py-28
      "
      style={{
        backgroundColor: COLORES.champagne,
      }}
    >
      <div className="relative mx-auto max-w-6xl">

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12 text-center"
        >
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
            Nuestros momentos
          </p>

          <h2
            className="
              mt-5 pb-5
              text-[70px]
              leading-[1.3]
              sm:text-[95px]
              md:text-[115px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.cafeOscuro,
              fontWeight: 400,
            }}
          >
            Nuestra Historia
          </h2>

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

          <p
            className="
              mx-auto mt-7
              max-w-xl
              text-base leading-relaxed
              sm:text-lg
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafe,
            }}
          >
            Cada instante juntos nos ha llevado
            hasta este hermoso momento.
          </p>
        </motion.div>

        {/* ======================================
            CONTENEDOR DEL CARRUSEL
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          className="
            mx-auto
            w-full max-w-[980px]
          "
        >

          {/* ======================================
              MARCO DE FOTOGRAFÍAS
          ====================================== */}

          <div
            className="
              relative w-full
              overflow-hidden
              rounded-t-[140px]
              rounded-b-[18px]
              border-[5px]
              sm:rounded-t-[220px]
              sm:border-[8px]
            "
            style={{
              borderColor: COLORES.marfil,
              backgroundColor: COLORES.marfil,
            }}
          >

            {/* ======================================
                ÁREA VERTICAL DE FOTOGRAFÍAS
            ====================================== */}

            <div
              className="
                relative w-full
                aspect-[3/5]
                sm:aspect-[3/4]
                md:aspect-[4/5]
                overflow-hidden
              "
              style={{
                backgroundColor: COLORES.champagne,
              }}
            >

              {/* CARGA INICIAL */}
              {!primeraImagenLista && (
                <div
                  className="
                    absolute inset-0
                    flex flex-col
                    items-center justify-center
                    gap-4
                  "
                  style={{
                    backgroundColor: COLORES.champagne,
                  }}
                >
                  <Heart
                    size={30}
                    strokeWidth={1.2}
                    className="animate-pulse"
                    style={{
                      color: COLORES.naranja,
                    }}
                  />

                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: COLORES.cafe,
                    }}
                  >
                    {imagenesConError[0]
                      ? "No se pudo cargar la fotografía"
                      : "Preparando nuestros recuerdos..."}
                  </p>
                </div>
              )}

              {/* ======================================
                  TODAS LAS IMÁGENES PRECARGADAS
                  SUPERPUESTAS ENTRE SÍ
              ====================================== */}

              {IMAGENES.map((imagen, index) => {
                if (!imagenesCargadas[index]) return null;

                return (
                  <motion.img
                    key={imagen.src}
                    src={imagen.src}
                    alt={imagen.alt}
                    initial={false}
                    animate={{
                      opacity:
                        indiceActual === index ? 1 : 0,
                    }}
                    transition={{
                      duration: DURACION_TRANSICION,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute inset-0
                      h-full w-full
                      object-cover
                    "
                    style={{
                      objectPosition: imagen.position,
                      zIndex:
                        indiceActual === index ? 2 : 1,
                      pointerEvents: "none",
                    }}
                    draggable={false}
                    decoding="async"
                  />
                );
              })}

            </div>
          </div>

          {/* ======================================
              CONTROLES INFERIORES
          ====================================== */}

          <div
            className="
              mt-8 flex
              items-center
              justify-center
              gap-6
              sm:gap-10
            "
          >

            {/* BOTÓN ANTERIOR */}
            <motion.button
              type="button"
              onClick={anteriorImagen}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Fotografía anterior"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full border
                transition-colors
                duration-300
                sm:h-14 sm:w-14
              "
              style={{
                borderColor: COLORES.cafe,
                color: COLORES.cafe,
              }}
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.5}
              />
            </motion.button>

            {/* CONTADOR */}
            <div
              className="
                min-w-[65px]
                text-center
                text-sm tracking-[0.15em]
                sm:text-base
              "
              style={{
                fontFamily: "'Playfair Display', serif",
                color: COLORES.cafeOscuro,
              }}
            >
              {String(indiceActual + 1).padStart(2, "0")}
              <span className="mx-2">/</span>
              {String(totalImagenes).padStart(2, "0")}
            </div>

            {/* BOTÓN SIGUIENTE */}
            <motion.button
              type="button"
              onClick={siguienteImagen}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Siguiente fotografía"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full border
                transition-colors
                duration-300
                sm:h-14 sm:w-14
              "
              style={{
                borderColor: COLORES.cafe,
                color: COLORES.cafe,
              }}
            >
              <ChevronRight
                size={24}
                strokeWidth={1.5}
              />
            </motion.button>

          </div>

          {/* ======================================
              INDICADORES INFERIORES
          ====================================== */}

          <div
            className="
              mt-6 flex
              items-center justify-center
              gap-2
            "
          >
            {IMAGENES.map((imagen, index) => (
              <button
                key={imagen.src}
                type="button"
                onClick={() => cambiarImagen(index)}
                aria-label={`Ver fotografía ${index + 1}`}
                aria-current={
                  indiceActual === index
                    ? "true"
                    : undefined
                }
                className="
                  flex h-7 w-7
                  items-center justify-center
                "
              >
                <span
                  className="
                    block h-2
                    rounded-full
                    transition-all duration-300
                  "
                  style={{
                    width:
                      indiceActual === index
                        ? "24px"
                        : "8px",
                    backgroundColor:
                      indiceActual === index
                        ? COLORES.naranja
                        : COLORES.cafe,
                  }}
                />
              </button>
            ))}
          </div>

        </motion.div>

        {/* ======================================
            FRASE FINAL
        ====================================== */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mx-auto mt-14
            max-w-xl
            text-center
            text-lg italic
            leading-relaxed
            sm:text-xl
          "
          style={{
            fontFamily: "'Playfair Display', serif",
            color: COLORES.cafe,
          }}
        >
          Y lo mejor de nuestra historia
          está por comenzar...
        </motion.p>

      </div>
    </section>
  );
};

export default Carrusel;
