# ConyBeautiful - Documento Maestro de Requerimientos

**Objetivo General\
**Crear una página web que funcione como catálogo digital, cotizador y
capturador de solicitudes de reserva para ConyBeautiful. El cliente
realiza todo el proceso en la web y, al finalizar, envía una solicitud
estructurada por WhatsApp. Recién en ese momento interviene el agente de
IA.

## Arquitectura General

Cliente → Página Web → Formulario/Catálogo → Botón WhatsApp → WhatsApp
Oficial → Agente IA → Cony.\
\
La web concentra toda la información. El agente responde mensajes
recibidos en WhatsApp y ayuda a gestionar solicitudes.

## Objetivos del Sistema

\- Centralizar servicios y precios.\
- Reducir preguntas repetitivas.\
- Cotizar uñas personalizadas.\
- Capturar datos de reserva.\
- Mostrar políticas antes de reservar.\
- Generar solicitudes estructuradas para Cony.

## Servicios Registrados

Pestañas:\
- Efecto Rímel: \$28.000\
- Volumen Light: \$32.000\
- Volumen Tecnológico: \$34.000\
\
Uñas:\
- Permanente\
- Kapping\
- Soft Gel\
- Polygel\
- Acrílicas\
\
Las uñas utilizan precio base + extras + complejidad.

## Reglas de Cotización de Uñas

Solicitar siempre imagen de referencia.\
Extras por diseños, stickers, encapsulados y decoración general.\
Valor referencial: \$500 a \$1.000 por uña decorada.\
La complejidad afecta tanto el precio como la duración del servicio.

## Políticas Oficiales

\- Edad mínima: 15 años.\
- Abono obligatorio: \$10.000.\
- El abono se descuenta del valor final.\
- El abono no es reembolsable.\
- Si el servicio cuesta menos de \$10.000 se paga el total.\
- Confirmar cita el día anterior antes de las 19:00.\
- Hasta 5 minutos de retraso sin penalización.\
- Entre 6 y 10 minutos: multa de \$5.000.\
- Más de 10 minutos: cita cancelada.\
- Inasistencia sin aviso de 24 horas: pérdida del abono.\
- Aviso con 24 horas: abono válido para reagendar.\
- No se reservan horas sin abono.\
- Si no se paga inmediatamente, debe volver a consultarse
disponibilidad.\
- Informar alergias, embarazo o condiciones médicas antes de reservar.

## Flujo Web

1\. Cliente ingresa.\
2. Revisa catálogo.\
3. Selecciona servicio.\
4. Si es uñas, envía referencia.\
5. Visualiza precio o cotización.\
6. Acepta políticas.\
7. Completa formulario.\
8. Presiona botón WhatsApp.\
9. Se genera mensaje estructurado.\
10. El mensaje llega al WhatsApp oficial.

## Datos a Solicitar

\- Nombre\
- Teléfono\
- Correo (opcional)\
- Servicio\
- Fecha deseada\
- Horario preferido\
- Imagen de referencia (uñas)\
- Observaciones médicas relevantes

## Formato de Solicitud

📋 NUEVA SOLICITUD CONYBEAUTIFUL\
\
Nombre:\
Servicio:\
Teléfono:\
Correo:\
Fecha Deseada:\
Horario Preferido:\
Observaciones:\
Políticas Aceptadas: Sí\
\
Estado: Pendiente de confirmación.

## Funciones del Agente IA

\- Responder consultas.\
- Explicar servicios.\
- Informar precios.\
- Resolver dudas.\
- Interpretar solicitudes recibidas.\
- Confirmar recepción.\
- Generar resúmenes para Cony.\
\
No debe:\
- Inventar horarios.\
- Asignar reservas automáticamente.\
- Prometer disponibilidad.

## Futuras Mejoras

\- Integración con Google Calendar.\
- Agenda automática.\
- Base de datos de clientes.\
- Recordatorios automáticos.\
- Confirmación de citas por WhatsApp.
