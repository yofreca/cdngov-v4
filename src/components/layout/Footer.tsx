import logoArnImg from '@assets/images/logo-arn.png'
import headerGovcoImg from '@assets/images/header_govco.png'
import colombiaSvg from '@assets/images/CO.svg'

/**
 * Componente Footer siguiendo el diseño Gov.co/ARN
 * - Información completa de la entidad
 * - Sede principal y contacto
 * - Servicios a la ciudadanía
 * - Redes sociales
 * - Enlaces de interés
 * - Banner GOV.CO inferior
 */
export function Footer() {
  return (
    <footer id="footer" className="gov-co-footer mt-auto bg-gray-50">
      <div className="container-govco">
        <div
          className="bg-white p-6 md:p-8 rounded-lg shadow-sm my-4"
          style={{
            borderLeft: '30px solid var(--color-govco-marino)',
            borderRight: '30px solid var(--color-govco-marino)'
          }}
        >
          {/* Logo y Título */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-grow">
                <h3
                  className="text-xl md:text-2xl font-semibold mb-2"
                  style={{ color: 'var(--color-govco-azul-oscuro)' }}
                >
                  Agencia para la Reincorporación y la Normalización - ARN
                </h3>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={logoArnImg}
                  alt="Agencia para la Reincorporación y la Normalización - ARN"
                  className="w-32 md:w-40 h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sede Principal */}
            <div>
              <h4
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Sede Principal
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Dirección:</strong> Carrera 9 No. 11 - 66 - Bogotá,
                  Colombia
                </p>
                <p>
                  <strong>Código Postal:</strong> 110221
                </p>
                <p>
                  <a
                    href="tel:+576014430020"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    <strong>PBX:</strong> +57 601 4430020
                  </a>
                </p>
                <p>
                  <strong>Horario de Atención Call Center:</strong>
                </p>
                <p>Lunes a viernes de 8:00 a.m. a 6:00 p.m.</p>
                <p>Sábados de 8:00 a.m. a 1:00 p.m.</p>
                <p>
                  <strong>Correspondencia:</strong> Lunes a viernes de 8:00
                  a.m. a 4:00 p.m., Piso 2
                </p>
                <p>Fax +57 601 4430020 - Opción 5</p>
                <p className="mt-4">
                  <strong>Línea anticorrupción:</strong>{' '}
                  <a
                    href="tel:018000911516"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    01-800-091-1516
                  </a>
                </p>
                <p>
                  <strong>Línea nacional gratuita:</strong>{' '}
                  <a
                    href="tel:018000911516"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    01-800-091-1516
                  </a>
                </p>
                <p>
                  <strong>Celular:</strong>{' '}
                  <a
                    href="tel:#516"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    #516
                  </a>
                  , Claro y Movistar
                </p>
              </div>
            </div>

            {/* Servicios a la Ciudadanía */}
            <div>
              <h4
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Servicios a la Ciudadanía
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <a
                    href="http://www.reincorporacion.gov.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    Transparencia y acceso a la información pública
                  </a>
                </p>
                <p>
                  <a
                    href="http://www.reincorporacion.gov.co/es/atencion/Paginas/pqrsd.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    Peticiones, Quejas, Reclamos, Sugerencias y Denuncias
                    (PQRS-D)
                  </a>
                </p>
                <p>
                  <a
                    href="http://www.reincorporacion.gov.co/es/atencion/Paginas/sedes.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    Sedes Regionales ARN
                  </a>
                </p>
                <p>
                  <a
                    href="http://www.reincorporacion.gov.co/es/atencion/Paginas/faqs.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    Preguntas Frecuentes
                  </a>
                </p>
                <p className="mt-4">
                  <strong>Correo electrónico:</strong>{' '}
                  <a
                    href="mailto:atencion@reincorporacion.gov.co"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    atencion@reincorporacion.gov.co
                  </a>
                </p>
                <p>
                  <strong>Notificaciones judiciales:</strong>{' '}
                  <a
                    href="mailto:buzondenotificacionesjudiciales@reincorporacion.gov.co"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    buzondenotificacionesjudiciales@reincorporacion.gov.co
                  </a>
                </p>
                <p>
                  <strong>Correo anticorrupción:</strong>{' '}
                  <a
                    href="mailto:soytransparente@reincorporacion.gov.co"
                    className="hover:underline"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    soytransparente@reincorporacion.gov.co
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/ARNColombia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                style={{ color: 'var(--color-govco-marino)' }}
                title="Facebook ARN Colombia"
              >
                <span>📘</span>
                <span>@ARNColombia</span>
              </a>
              <a
                href="https://twitter.com/ARNColombia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                style={{ color: 'var(--color-govco-marino)' }}
                title="Twitter ARN Colombia"
              >
                <span>🐦</span>
                <span>@ARNColombia</span>
              </a>
              <a
                href="https://www.instagram.com/arncolombia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                style={{ color: 'var(--color-govco-marino)' }}
                title="Instagram ARN Colombia"
              >
                <span>📷</span>
                <span>@ARNColombia</span>
              </a>
              <a
                href="http://www.youtube.com/user/ReintegracionACR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                style={{ color: 'var(--color-govco-marino)' }}
                title="YouTube ARN Colombia"
              >
                <span>📹</span>
                <span>@ARNColombia</span>
              </a>
            </div>
          </div>

          {/* Enlaces de Interés */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h5
              className="text-center text-base font-semibold mb-4"
              style={{ color: 'var(--color-govco-azul-oscuro)' }}
            >
              Enlaces de interés
            </h5>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <a
                href="https://www.reincorporacion.gov.co/es/atencion/Paginas/Terminos-y-condiciones.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Términos y Condiciones
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://www.reincorporacion.gov.co/es/atencion/Paginas/politica-de-privacidad.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Política de Privacidad
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://www.reincorporacion.gov.co/es/atencion/Paginas/politica-cookies.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Política de Cookies
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="https://www.reincorporacion.gov.co/es/Paginas/Map.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Mapa del sitio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Banner GOV.CO Inferior */}
      <div
        style={{ backgroundColor: 'var(--color-govco-azul-oscuro)' }}
        className="py-4 mt-4"
      >
        <div className="container-govco">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://www.colombia.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Página Colombia"
            >
              <img
                src={colombiaSvg}
                alt="Colombia.co"
                className="h-10 md:h-12"
              />
            </a>
            <span className="hidden md:inline text-white/30">|</span>
            <a
              href="https://www.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Página Gov.co"
            >
              <img
                src={headerGovcoImg}
                alt="GOV.CO"
                className="h-6 md:h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
