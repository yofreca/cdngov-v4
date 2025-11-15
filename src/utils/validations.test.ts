/**
 * Tests para validaciones con Zod
 * Verifica seguridad OWASP y validaciones colombianas
 */

import { describe, it, expect } from 'vitest'
import {
  nombreSchema,
  emailSchema,
  passwordSchema,
  cedulaSchema,
  telefonoMovilSchema,
  telefonoFijoSchema,
  direccionSchema,
  urlSchema,
  fechaSchema,
  fechaNoFuturaSchema,
  fechaMayoriaEdadSchema,
  sanitizeString,
  containsMaliciousCode,
} from './validations'

describe('Validaciones Básicas', () => {
  describe('nombreSchema', () => {
    it('debe aceptar nombres válidos', () => {
      expect(() => nombreSchema.parse('Juan Pérez')).not.toThrow()
      expect(() => nombreSchema.parse('María José Rodríguez')).not.toThrow()
      expect(() => nombreSchema.parse('José')).not.toThrow()
    })

    it('debe rechazar nombres muy cortos', () => {
      expect(() => nombreSchema.parse('Jo')).toThrow()
    })

    it('debe rechazar nombres muy largos', () => {
      const longName = 'a'.repeat(101)
      expect(() => nombreSchema.parse(longName)).toThrow()
    })

    it('debe rechazar nombres con números', () => {
      expect(() => nombreSchema.parse('Juan123')).toThrow()
    })

    it('debe rechazar nombres con caracteres especiales', () => {
      expect(() => nombreSchema.parse('Juan@Pérez')).toThrow()
      expect(() => nombreSchema.parse('Juan#Test')).toThrow()
    })

    it('debe eliminar espacios al inicio y final', () => {
      const result = nombreSchema.parse('  Juan Pérez  ')
      expect(result).toBe('Juan Pérez')
    })

    it('debe aceptar caracteres latinos', () => {
      expect(() => nombreSchema.parse('José María Ñoño')).not.toThrow()
      expect(() => nombreSchema.parse('Úrsula Pérez')).not.toThrow()
    })
  })

  describe('emailSchema', () => {
    it('debe aceptar emails válidos', () => {
      expect(() => emailSchema.parse('usuario@example.com')).not.toThrow()
      expect(() => emailSchema.parse('test.user+tag@domain.co')).not.toThrow()
    })

    it('debe rechazar emails inválidos', () => {
      expect(() => emailSchema.parse('notanemail')).toThrow()
      expect(() => emailSchema.parse('@example.com')).toThrow()
      expect(() => emailSchema.parse('user@')).toThrow()
    })

    it('debe convertir a minúsculas', () => {
      const result = emailSchema.parse('USER@EXAMPLE.COM')
      expect(result).toBe('user@example.com')
    })

    it('debe eliminar espacios', () => {
      const result = emailSchema.parse('  user@example.com  ')
      expect(result).toBe('user@example.com')
    })

    it('debe rechazar emails muy largos', () => {
      const longEmail = 'a'.repeat(250) + '@example.com'
      expect(() => emailSchema.parse(longEmail)).toThrow()
    })
  })

  describe('passwordSchema', () => {
    it('debe aceptar contraseñas seguras', () => {
      expect(() => passwordSchema.parse('Password123!')).not.toThrow()
      expect(() => passwordSchema.parse('MyP@ssw0rd')).not.toThrow()
      expect(() => passwordSchema.parse('Secure#Pass99')).not.toThrow()
    })

    it('debe rechazar contraseñas cortas', () => {
      expect(() => passwordSchema.parse('Short1!')).toThrow()
    })

    it('debe rechazar contraseñas sin mayúsculas', () => {
      expect(() => passwordSchema.parse('password123!')).toThrow()
    })

    it('debe rechazar contraseñas sin minúsculas', () => {
      expect(() => passwordSchema.parse('PASSWORD123!')).toThrow()
    })

    it('debe rechazar contraseñas sin números', () => {
      expect(() => passwordSchema.parse('Password!')).toThrow()
    })

    it('debe rechazar contraseñas sin caracteres especiales', () => {
      expect(() => passwordSchema.parse('Password123')).toThrow()
    })

    it('debe rechazar contraseñas muy largas', () => {
      const longPassword = 'A1!' + 'a'.repeat(130)
      expect(() => passwordSchema.parse(longPassword)).toThrow()
    })
  })
})

describe('Validaciones Colombia', () => {
  describe('cedulaSchema', () => {
    it('debe aceptar cédulas válidas', () => {
      expect(() => cedulaSchema.parse('12345678')).not.toThrow()
      expect(() => cedulaSchema.parse('1234567890')).not.toThrow()
      expect(() => cedulaSchema.parse('123456')).not.toThrow()
    })

    it('debe rechazar cédulas muy cortas', () => {
      expect(() => cedulaSchema.parse('12345')).toThrow()
    })

    it('debe rechazar cédulas muy largas', () => {
      expect(() => cedulaSchema.parse('12345678901')).toThrow()
    })

    it('debe rechazar cédulas con letras', () => {
      expect(() => cedulaSchema.parse('12345ABC')).toThrow()
    })

    it('debe eliminar espacios', () => {
      const result = cedulaSchema.parse('  12345678  ')
      expect(result).toBe('12345678')
    })
  })

  describe('telefonoMovilSchema', () => {
    it('debe aceptar teléfonos móviles válidos', () => {
      expect(() => telefonoMovilSchema.parse('3001234567')).not.toThrow()
      expect(() => telefonoMovilSchema.parse('3209876543')).not.toThrow()
      expect(() => telefonoMovilSchema.parse('3501234567')).not.toThrow()
    })

    it('debe rechazar teléfonos que no empiecen con 3', () => {
      expect(() => telefonoMovilSchema.parse('2001234567')).toThrow()
      expect(() => telefonoMovilSchema.parse('4001234567')).toThrow()
    })

    it('debe rechazar teléfonos con longitud incorrecta', () => {
      expect(() => telefonoMovilSchema.parse('300123456')).toThrow()
      expect(() => telefonoMovilSchema.parse('30012345678')).toThrow()
    })

    it('debe rechazar teléfonos con letras', () => {
      expect(() => telefonoMovilSchema.parse('300ABC4567')).toThrow()
    })
  })

  describe('telefonoFijoSchema', () => {
    it('debe aceptar teléfonos fijos con indicativo', () => {
      expect(() => telefonoFijoSchema.parse('6011234567')).not.toThrow()
      expect(() => telefonoFijoSchema.parse('6021234567')).not.toThrow()
      expect(() => telefonoFijoSchema.parse('6051234567')).not.toThrow()
    })

    it('debe aceptar teléfonos fijos sin indicativo (7 dígitos)', () => {
      expect(() => telefonoFijoSchema.parse('1234567')).not.toThrow()
    })

    it('debe rechazar formatos inválidos', () => {
      expect(() => telefonoFijoSchema.parse('123456')).toThrow()
      expect(() => telefonoFijoSchema.parse('12345678')).toThrow()
      expect(() => telefonoFijoSchema.parse('6091234567')).toThrow() // indicativo 609 no válido
    })
  })

  describe('direccionSchema', () => {
    it('debe aceptar direcciones válidas', () => {
      expect(() => direccionSchema.parse('Calle 123 # 45-67')).not.toThrow()
      expect(() => direccionSchema.parse('Carrera 10 No. 20-30 Apto 401')).not.toThrow()
    })

    it('debe rechazar direcciones muy cortas', () => {
      expect(() => direccionSchema.parse('Calle 1')).toThrow()
    })

    it('debe rechazar direcciones muy largas', () => {
      const longAddress = 'Calle ' + 'A'.repeat(200)
      expect(() => direccionSchema.parse(longAddress)).toThrow()
    })

    it('debe rechazar direcciones con caracteres especiales no permitidos', () => {
      expect(() => direccionSchema.parse('Calle 123 @ Invalid')).toThrow()
      expect(() => direccionSchema.parse('Calle 123 < script >')).toThrow()
    })
  })
})

describe('Validaciones Avanzadas', () => {
  describe('urlSchema', () => {
    it('debe aceptar URLs válidas en desarrollo', () => {
      expect(() => urlSchema.parse('http://localhost:3000')).not.toThrow()
      expect(() => urlSchema.parse('https://example.com')).not.toThrow()
    })

    it('debe rechazar URLs inválidas', () => {
      expect(() => urlSchema.parse('not-a-url')).toThrow()
      expect(() => urlSchema.parse('ftp://example.com')).toThrow()
    })

    // Nota: el test de HTTPS en producción requeriría cambiar import.meta.env.PROD
  })

  describe('fechaSchema', () => {
    it('debe aceptar fechas válidas', () => {
      expect(() => fechaSchema.parse('2023-01-15')).not.toThrow()
      expect(() => fechaSchema.parse('1990-12-31')).not.toThrow()
    })

    it('debe rechazar formatos de fecha inválidos', () => {
      expect(() => fechaSchema.parse('15-01-2023')).toThrow()
      expect(() => fechaSchema.parse('2023/01/15')).toThrow()
      expect(() => fechaSchema.parse('not-a-date')).toThrow()
    })

    it('debe rechazar fechas inválidas', () => {
      expect(() => fechaSchema.parse('2023-13-01')).toThrow() // mes 13
      expect(() => fechaSchema.parse('2023-02-30')).toThrow() // 30 de febrero
    })
  })

  describe('fechaNoFuturaSchema', () => {
    it('debe aceptar fechas pasadas', () => {
      expect(() => fechaNoFuturaSchema.parse('2020-01-01')).not.toThrow()
      expect(() => fechaNoFuturaSchema.parse('1990-05-15')).not.toThrow()
    })

    it('debe rechazar fechas futuras', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const futureDateStr = futureDate.toISOString().split('T')[0]
      expect(() => fechaNoFuturaSchema.parse(futureDateStr)).toThrow()
    })

    it('debe aceptar la fecha de hoy', () => {
      const today = new Date().toISOString().split('T')[0]
      expect(() => fechaNoFuturaSchema.parse(today)).not.toThrow()
    })
  })

  describe('fechaMayoriaEdadSchema', () => {
    it('debe aceptar fechas de personas mayores de 18 años', () => {
      const date20YearsAgo = new Date()
      date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20)
      const dateStr = date20YearsAgo.toISOString().split('T')[0]
      expect(() => fechaMayoriaEdadSchema.parse(dateStr)).not.toThrow()
    })

    it('debe rechazar fechas de personas menores de 18 años', () => {
      const date15YearsAgo = new Date()
      date15YearsAgo.setFullYear(date15YearsAgo.getFullYear() - 15)
      const dateStr = date15YearsAgo.toISOString().split('T')[0]
      expect(() => fechaMayoriaEdadSchema.parse(dateStr)).toThrow()
    })

    it('debe aceptar exactamente 18 años', () => {
      const date18YearsAgo = new Date()
      date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18)
      const dateStr = date18YearsAgo.toISOString().split('T')[0]
      expect(() => fechaMayoriaEdadSchema.parse(dateStr)).not.toThrow()
    })
  })
})

describe('Seguridad - OWASP', () => {
  describe('sanitizeString', () => {
    it('debe eliminar etiquetas HTML', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
      expect(sanitizeString('Test <b>bold</b>')).toBe('Test bbold/b')
    })

    it('debe eliminar javascript: protocol', () => {
      expect(sanitizeString('javascript:alert(1)')).toBe('alert(1)')
      expect(sanitizeString('JAVASCRIPT:alert(1)')).toBe('alert(1)')
    })

    it('debe eliminar event handlers', () => {
      expect(sanitizeString('onclick=alert(1)')).toBe('')
      expect(sanitizeString('onload=bad()')).toBe('')
      expect(sanitizeString('ONMOUSEOVER=alert(1)')).toBe('')
    })

    it('debe eliminar espacios al inicio y final', () => {
      expect(sanitizeString('  test  ')).toBe('test')
    })

    it('debe preservar texto seguro', () => {
      expect(sanitizeString('Juan Pérez')).toBe('Juan Pérez')
      expect(sanitizeString('test@example.com')).toBe('test@example.com')
    })
  })

  describe('containsMaliciousCode', () => {
    it('debe detectar etiquetas script', () => {
      expect(containsMaliciousCode('<script>alert(1)</script>')).toBe(true)
      expect(containsMaliciousCode('<SCRIPT>alert(1)</SCRIPT>')).toBe(true)
    })

    it('debe detectar javascript: protocol', () => {
      expect(containsMaliciousCode('javascript:alert(1)')).toBe(true)
      expect(containsMaliciousCode('JAVASCRIPT:void(0)')).toBe(true)
    })

    it('debe detectar event handlers', () => {
      expect(containsMaliciousCode('onclick=alert(1)')).toBe(true)
      expect(containsMaliciousCode('onload=bad()')).toBe(true)
      expect(containsMaliciousCode('ONMOUSEOVER=evil()')).toBe(true)
    })

    it('debe detectar iframes', () => {
      expect(containsMaliciousCode('<iframe src="evil.com"></iframe>')).toBe(true)
      expect(containsMaliciousCode('<IFRAME>')).toBe(true)
    })

    it('debe detectar object y embed', () => {
      expect(containsMaliciousCode('<object data="evil"></object>')).toBe(true)
      expect(containsMaliciousCode('<embed src="bad">')).toBe(true)
    })

    it('debe detectar eval', () => {
      expect(containsMaliciousCode('eval(malicious)')).toBe(true)
      expect(containsMaliciousCode('EVAL(code)')).toBe(true)
    })

    it('debe detectar expression', () => {
      expect(containsMaliciousCode('expression(alert(1))')).toBe(true)
      expect(containsMaliciousCode('EXPRESSION(bad)')).toBe(true)
    })

    it('no debe detectar texto seguro como malicioso', () => {
      expect(containsMaliciousCode('Juan Pérez')).toBe(false)
      expect(containsMaliciousCode('email@example.com')).toBe(false)
      expect(containsMaliciousCode('Calle 123 # 45-67')).toBe(false)
    })

    it('debe manejar strings vacíos', () => {
      expect(containsMaliciousCode('')).toBe(false)
    })
  })
})
