
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Users,
  Check,
  X,
  Send,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// GUSTAVO & SHARON
// ==========================================

const WHATSAPP_NOVIA = "522471097100";
const WHATSAPP_NOVIO = "522293159316";

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

const Confirmacion = () => {
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // GENERAR MENSAJE PARA WHATSAPP
  // ==========================================

  const generarMensaje = () => {
    const cantidad =
      asistencia === "Sí asistiré"
        ? invitados
        : "0";

    let mensaje =
      "💍 *CONFIRMACIÓN DE ASISTENCIA*\n" +
      "Gustavo & Sharon\n\n" +
      `👤 *Nombre:* ${nombreInvitado.trim()}\n` +
      `💌 *Asistencia:* ${asistencia}\n` +
      `👥 *Número de invitados:* ${cantidad}\n\n`;

    if (mensajeInvitado.trim()) {
      mensaje +=
        `💬 *Mensaje para los novios:*\n` +
        `${mensajeInvitado.trim()}\n\n`;
    }

    mensaje +=
      "✨ ¡Gracias por la invitación!";

    return mensaje;
  };

  // ==========================================
  // VALIDAR Y ABRIR WHATSAPP
  // ==========================================

  const confirmarPorWhatsApp = (numero) => {
    if (!nombreInvitado.trim() || !asistencia) {
      setError(
        "Por favor, escribe tu nombre y confirma si asistirás."
      );
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (
        !invitados ||
        !Number.isInteger(Number(invitados)) ||
        Number(invitados) < 1
      )
    ) {
      setError(
        "Indica el número de personas que asistirán."
      );
      return;
    }

    setError("");

    const mensaje = generarMensaje();

    const enlace =
      `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(
      enlace,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================
  // ESTILO DE LOS CAMPOS
  // ==========================================

  const estiloCampo = `
    w-full
    rounded-2xl
    border
    px-5 py-4
    text-base
    outline-none
    transition-colors
    duration-300
    focus:border-[#B9471B]
  `;

  const estiloCampoInline = {
    backgroundColor: COLORES.marfil,
    borderColor: COLORES.cafe,
    color: COLORES.cafeOscuro,
    fontFamily: "'Playfair Display', serif",
  };

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
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative mx-auto
          w-full max-w-3xl
          overflow-hidden
          rounded-t-[100px]
          rounded-b-[18px]
          border
          px-6 pb-14 pt-16
          sm:rounded-t-[150px]
          sm:px-12
          sm:pb-16
          sm:pt-20
        "
        style={{
          backgroundColor: COLORES.champagne,
          borderColor: COLORES.cafe,
        }}
      >

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <div className="text-center">

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
            RSVP
          </p>

          <h2
            className="
              mt-5 pb-5
              text-[65px]
              leading-[1.3]
              sm:text-[90px]
              md:text-[105px]
            "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: COLORES.cafeOscuro,
              fontWeight: 400,
            }}
          >
            Confirmación
          </h2>

          {/* SEPARADOR */}

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

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto mt-8
              max-w-xl
              text-base
              leading-relaxed
              sm:text-lg
            "
            style={{
              fontFamily: "'Playfair Display', serif",
              color: COLORES.cafeOscuro,
            }}
          >
            Nos llenará de alegría compartir
            este día tan especial contigo.

            <br />
            <br />

            Por favor, confirma tu asistencia
            a través de WhatsApp.
          </p>

        </div>

        {/* ======================================
            FORMULARIO
        ====================================== */}

        <div
          className="
            mx-auto mt-12
            max-w-xl
            space-y-7
          "
        >

          {/* ======================================
              NOMBRE DEL INVITADO
          ====================================== */}

          <div>
            <label
              htmlFor="nombreInvitado"
              className="
                mb-3 block
                text-sm
              "
              style={{
                color: COLORES.cafeOscuro,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Nombre y apellido
            </label>

            <input
              id="nombreInvitado"
              type="text"
              autoComplete="name"
              placeholder="Escribe tu nombre completo"
              value={nombreInvitado}
              onChange={(e) => {
                setNombreInvitado(e.target.value);
                setError("");
              }}
              className={estiloCampo}
              style={estiloCampoInline}
            />
          </div>

          {/* ======================================
              SELECCIÓN DE ASISTENCIA
          ====================================== */}

          <div>
            <p
              className="mb-4 text-sm"
              style={{
                color: COLORES.cafeOscuro,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              ¿Nos acompañarás?
            </p>

            <div
              className="
                grid grid-cols-1
                gap-4 sm:grid-cols-2
              "
            >

              {/* SÍ ASISTIRÉ */}

              <motion.button
                type="button"
                onClick={() => {
                  setAsistencia("Sí asistiré");
                  setError("");
                }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={asistencia === "Sí asistiré"}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-2xl border
                  px-5 py-4
                  text-base
                  transition-colors
                  duration-300
                "
                style={{
                  backgroundColor:
                    asistencia === "Sí asistiré"
                      ? COLORES.cafe
                      : COLORES.marfil,
                  borderColor: COLORES.cafe,
                  color:
                    asistencia === "Sí asistiré"
                      ? COLORES.blanco
                      : COLORES.cafeOscuro,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                <Check
                  size={19}
                  strokeWidth={1.6}
                />

                Sí asistiré
              </motion.button>

              {/* NO ASISTIRÉ */}

              <motion.button
                type="button"
                onClick={() => {
                  setAsistencia("No podré asistir");
                  setInvitados("");
                  setError("");
                }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={
                  asistencia === "No podré asistir"
                }
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-2xl border
                  px-5 py-4
                  text-base
                  transition-colors
                  duration-300
                "
                style={{
                  backgroundColor:
                    asistencia === "No podré asistir"
                      ? COLORES.cafe
                      : COLORES.marfil,
                  borderColor: COLORES.cafe,
                  color:
                    asistencia === "No podré asistir"
                      ? COLORES.blanco
                      : COLORES.cafeOscuro,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                <X
                  size={19}
                  strokeWidth={1.6}
                />

                No asistiré
              </motion.button>

            </div>
          </div>

          {/* ======================================
              NÚMERO DE INVITADOS
          ====================================== */}

          <AnimatePresence>
            {asistencia === "Sí asistiré" && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="overflow-hidden"
              >
                <label
                  htmlFor="numeroInvitados"
                  className="
                    mb-3 flex
                    items-center gap-2
                    text-sm
                  "
                  style={{
                    color: COLORES.cafeOscuro,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  <Users
                    size={17}
                    strokeWidth={1.5}
                  />

                  Número de invitados
                </label>

                <input
                  id="numeroInvitados"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  placeholder="¿Cuántas personas asistirán?"
                  value={invitados}
                  onChange={(e) => {
                    setInvitados(e.target.value);
                    setError("");
                  }}
                  className={estiloCampo}
                  style={estiloCampoInline}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================================
              MENSAJE OPCIONAL
          ====================================== */}

          <div>
            <label
              htmlFor="mensajeInvitado"
              className="
                mb-3 block
                text-sm
              "
              style={{
                color: COLORES.cafeOscuro,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Mensaje para los novios
              <span className="ml-2 text-xs">
                (Opcional)
              </span>
            </label>

            <textarea
              id="mensajeInvitado"
              placeholder="Déjanos unas palabras bonitas..."
              value={mensajeInvitado}
              onChange={(e) =>
                setMensajeInvitado(e.target.value)
              }
              rows={4}
              className={`${estiloCampo} resize-none`}
              style={estiloCampoInline}
            />
          </div>

          {/* ======================================
              MENSAJE DE ERROR
          ====================================== */}

          <AnimatePresence>
            {error && (
              <motion.p
                role="alert"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  rounded-xl border
                  px-4 py-3
                  text-center text-sm
                "
                style={{
                  backgroundColor: COLORES.marfil,
                  borderColor: COLORES.naranja,
                  color: COLORES.naranja,
                }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* ======================================
              SEPARADOR
          ====================================== */}

          <div
            className="
              mx-auto h-px w-32
            "
            style={{
              backgroundColor: COLORES.cafe,
            }}
          />

          {/* ======================================
              TEXTO DE WHATSAPP
          ====================================== */}

          <div className="text-center">
            <MessageCircle
              size={30}
              strokeWidth={1.4}
              className="mx-auto"
              style={{
                color: COLORES.naranja,
              }}
            />

            <p
              className="
                mt-4 text-base
                leading-relaxed
              "
              style={{
                fontFamily: "'Playfair Display', serif",
                color: COLORES.cafeOscuro,
              }}
            >
              Elige con quién deseas confirmar
              tu asistencia.
            </p>
          </div>

          {/* ======================================
              BOTONES DE WHATSAPP
          ====================================== */}

          <div
            className="
              grid grid-cols-1
              gap-4 sm:grid-cols-2
            "
          >

            {/* WHATSAPP DE SHARON */}

            <motion.button
              type="button"
              onClick={() =>
                confirmarPorWhatsApp(WHATSAPP_NOVIA)
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                flex min-h-[68px]
                items-center justify-center
                gap-3 rounded-full
                px-5 py-4
                text-base
              "
              style={{
                backgroundColor: COLORES.cafe,
                color: COLORES.blanco,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <MessageCircle
                size={21}
                strokeWidth={1.6}
              />

              Confirmar con Sharon
            </motion.button>

            {/* WHATSAPP DE GUSTAVO */}

            <motion.button
              type="button"
              onClick={() =>
                confirmarPorWhatsApp(WHATSAPP_NOVIO)
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                flex min-h-[68px]
                items-center justify-center
                gap-3 rounded-full
                px-5 py-4
                text-base
              "
              style={{
                backgroundColor: COLORES.naranja,
                color: COLORES.blanco,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <MessageCircle
                size={21}
                strokeWidth={1.6}
              />

              Confirmar con Gustavo
            </motion.button>

          </div>

          {/* ======================================
              NOTA FINAL
          ====================================== */}

          <p
            className="
              mx-auto max-w-md
              text-center
              text-xs leading-relaxed
              sm:text-sm
            "
            style={{
              color: COLORES.cafe,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Al seleccionar uno de los botones,
            se abrirá WhatsApp con tu mensaje
            preparado. Solo tendrás que enviarlo.
          </p>

        </div>

        {/* ======================================
            DETALLE DECORATIVO INFERIOR
        ====================================== */}

        <div
          className="
            mx-auto mt-12
            flex items-center
            justify-center gap-3
          "
        >
          <Heart
            size={13}
            strokeWidth={1.3}
            style={{
              color: COLORES.naranja,
            }}
          />

          <p
            className="
              text-xs tracking-[0.15em]
            "
            style={{
              color: COLORES.cafe,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            GUSTAVO & SHARON
          </p>

          <Heart
            size={13}
            strokeWidth={1.3}
            style={{
              color: COLORES.naranja,
            }}
          />
        </div>

      </motion.div>
    </section>
  );
};

export default Confirmacion;
