import logoArnImg from '@assets/images/logo-arn.png'
import headerGovcoImg from '@assets/images/header_govco.png'
import colombiaSvg from '@assets/images/CO.svg'

// Iconos SVG inline para redes sociales (sin dependencias externas)
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
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
