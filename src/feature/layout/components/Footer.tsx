import logoArnImg from '@assets/images/logo-arn.png'
import headerGovcoImg from '@assets/images/header_govco.png'
import colombiaSvg from '@assets/images/CO.svg'

// Iconos Unicode para redes sociales (sin dependencias externas)
const FacebookIcon = () => (
  <span aria-hidden="true" className="fs-5 fw-bold">f</span>
)

const TwitterIcon = () => (
  <span aria-hidden="true" className="fs-5 fw-bold">𝕏</span>
)

const InstagramIcon = () => (
  <span aria-hidden="true" className="fs-6 fw-bold">IG</span>
)

const YouTubeIcon = () => (
  <span aria-hidden="true" className="fs-5">▶</span>
)

/**
 * Componente Footer siguiendo el diseno Gov.co/ARN
 */
export function Footer() {
  return (
    <footer id="footer" className="gov-co-footer mt-auto bg-light">
      {/* Seccion con fondo azul que contiene la caja blanca */}
      <div className="py-4 py-md-5 px-4 bg-primary">
        <div className="container" style={{ maxWidth: '80rem' }}>
          <div className="bg-white shadow rounded-3 p-4 p-md-5" style={{ marginTop: '-5rem' }}>
            {/* Logo y Titulo */}
            <div className="mb-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h3 className="h4 fw-semibold mb-2 text-govco-azul-oscuro">
                    Agencia para la Reincorporacion y la Normalizacion - ARN
                  </h3>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <img
                    src={logoArnImg}
                    alt="Agencia para la Reincorporacion y la Normalizacion - ARN"
                    className="img-fluid"
                    style={{ maxWidth: '10rem' }}
                  />
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Sede Principal */}
              <div className="col-md-6">
                <h4 className="h6 fw-semibold mb-3 text-primary">
                  Sede Principal
                </h4>
                <div className="small text-secondary">
                  <p className="mb-2">
                    <strong>Direccion:</strong> Carrera 9 No. 11 - 66 - Bogota, Colombia
                  </p>
                  <p className="mb-2">
                    <strong>Codigo Postal:</strong> 110221
                  </p>
                  <p className="mb-2">
                    <a href="tel:+576014430020" className="text-decoration-none text-primary">
                      <strong>PBX:</strong> +57 601 4430020
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Horario de Atencion Call Center:</strong>
                  </p>
                  <p className="mb-1">Lunes a viernes de 8:00 a.m. a 6:00 p.m.</p>
                  <p className="mb-2">Sabados de 8:00 a.m. a 1:00 p.m.</p>
                  <p className="mb-2">
                    <strong>Correspondencia:</strong> Lunes a viernes de 8:00 a.m. a 4:00 p.m., Piso 2
                  </p>
                  <p className="mb-3">Fax +57 601 4430020 - Opcion 5</p>
                  <p className="mb-2">
                    <strong>Linea anticorrupcion:</strong>{' '}
                    <a href="tel:018000911516" className="text-decoration-none text-primary">
                      01-800-091-1516
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Linea nacional gratuita:</strong>{' '}
                    <a href="tel:018000911516" className="text-decoration-none text-primary">
                      01-800-091-1516
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Celular:</strong>{' '}
                    <a href="tel:#516" className="text-decoration-none text-primary">
                      #516
                    </a>
                    , Claro y Movistar
                  </p>
                </div>
              </div>

              {/* Servicios a la Ciudadania */}
              <div className="col-md-6">
                <h4 className="h6 fw-semibold mb-3 text-primary">
                  Servicios a la Ciudadania
                </h4>
                <div className="sm">
                  <p className="mb-2">
                    <a
                      href="http://www.reincorporacion.gov.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-primary"
                    >
                      Transparencia y acceso a la informacion publica
                    </a>
                  </p>
                  <p className="mb-2">
                    <a
                      href="http://www.reincorporacion.gov.co/es/atencion/Paginas/pqrsd.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-primary"
                    >
                      Peticiones, Quejas, Reclamos, Sugerencias y Denuncias (PQRS-D)
                    </a>
                  </p>
                  <p className="mb-2">
                    <a
                      href="http://www.reincorporacion.gov.co/es/atencion/Paginas/sedes.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-primary"
                    >
                      Sedes Regionales ARN
                    </a>
                  </p>
                  <p className="mb-3">
                    <a
                      href="http://www.reincorporacion.gov.co/es/atencion/Paginas/faqs.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-primary"
                    >
                      Preguntas Frecuentes
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Correo electronico:</strong>{' '}
                    <a
                      href="mailto:atencion@reincorporacion.gov.co"
                      className="text-decoration-none text-primary"
                    >
                      atencion@reincorporacion.gov.co
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Notificaciones judiciales:</strong>{' '}
                    <a
                      href="mailto:buzondenotificacionesjudiciales@reincorporacion.gov.co"
                      className="text-decoration-none text-primary"
                    >
                      buzondenotificacionesjudiciales@reincorporacion.gov.co
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Correo anticorrupcion:</strong>{' '}
                    <a
                      href="mailto:soytransparente@reincorporacion.gov.co"
                      className="text-decoration-none text-primary"
                    >
                      soytransparente@reincorporacion.gov.co
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="mt-4 pt-4 border-top">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a
                  href="https://www.facebook.com/ARNColombia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  title="Facebook ARN Colombia"
                  aria-label="Facebook ARN Colombia"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://twitter.com/ARNColombia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  title="Twitter ARN Colombia"
                  aria-label="Twitter ARN Colombia"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com/arncolombia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  title="Instagram ARN Colombia"
                  aria-label="Instagram ARN Colombia"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="http://www.youtube.com/user/ReintegracionACR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  title="YouTube ARN Colombia"
                  aria-label="YouTube ARN Colombia"
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>

            {/* Enlaces de Interes */}
            <div className="mt-4 pt-4 border-top">
              <h5 className="text-center small fw-semibold mb-3 text-govco-azul-oscuro">
                Enlaces de interes
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 small">
                <a
                  href="https://www.reincorporacion.gov.co/es/atencion/Paginas/Terminos-y-condiciones.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                >
                  Terminos y Condiciones
                </a>
                <span className="text-muted">|</span>
                <a
                  href="https://www.reincorporacion.gov.co/es/atencion/Paginas/politica-de-privacidad.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                >
                  Politica de Privacidad
                </a>
                <span className="text-muted">|</span>
                <a
                  href="https://www.reincorporacion.gov.co/es/atencion/Paginas/politica-cookies.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                >
                  Politica de Cookies
                </a>
                <span className="text-muted">|</span>
                <a
                  href="https://www.reincorporacion.gov.co/es/Paginas/Map.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary"
                >
                  Mapa del sitio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner GOV.CO Inferior */}
      <div className="py-4 bg-primary">
        <div className="container-govco">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-3">
            <a
              href="https://www.colombia.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75-hover"
              title="Pagina Colombia"
            >
              <img
                src={colombiaSvg}
                alt="Colombia.co"
                style={{ height: '3rem' }}
              />
            </a>
            <span className="d-none d-md-inline text-white opacity-25">|</span>
            <a
              href="https://www.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75-hover"
              title="Pagina Gov.co"
            >
              <img
                src={headerGovcoImg}
                alt="GOV.CO"
                style={{ height: '2rem' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
