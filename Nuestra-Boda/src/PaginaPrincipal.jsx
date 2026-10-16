import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import Padres from "./componentes-encabezado/PadresPadrinos";
import FinalBoda from "./componentes-encabezado/Final";
import Carrusel from "./componentes-encabezado/Carrusel";

export default function PaginaPrincipal() {
  return (
    <div>

      <Musica/>

      <Portada />

      <Contador />

      <Padres/>

      <Celebracion />

      <Carrusel/>

      <Regalos />

      <Confirmacion />

      <FinalBoda/>
    </div>
  );
}