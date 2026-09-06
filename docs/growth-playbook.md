# Playbook de crecimiento orgánico de Regalazo

Este documento convierte el producto en un sistema de descubrimiento y recomendación que pueda crecer sin depender de anuncios ni de llamadas de IA de pago. No hay garantía de viralidad: cada iniciativa debe medirse y conservarse solo si mejora la experiencia y la proporción de usuarios que terminan compartiendo o haciendo clic en una recomendación.

## 1. El bucle que merece la pena optimizar

El mejor bucle para Regalazo no es pedir que alguien “comparta la web”, sino darle una pequeña historia que compartir:

1. Una persona completa el radar en menos de un minuto.
2. Recibe diez ideas y elige una como su favorita.
3. Comparte el reto por WhatsApp, Telegram o una tarjeta visual.
4. La otra persona elige sin ver la primera elección.
5. El resultado revela si han coincidido y ofrece volver a enviar el reto.
6. La persona que recibe el reto entra en un radar propio y puede repetir el ciclo.

La llamada a la acción principal debe ser “Comparte el reto”, no “Comparte Regalazo”. Es más concreta, tiene curiosidad y da un motivo para abrir el enlace.

## 2. Mejoras de producto con mayor potencial

### Prioridad inmediata

- Mantener el resultado en diez opciones, con una primera recomendación muy clara, precio orientativo, motivo de encaje y salida relevante a Amazon.
- Mantener tres modos: mejor encaje, más sorprendente y novedades. El “Giro de chispa” debe ser voluntario, corto y respetar `prefers-reduced-motion`.
- Hacer visible el porcentaje de encaje como señal orientativa, no como precisión científica.
- Aumentar el valor de compartir: tarjeta PNG con el regalo elegido, resumen del perfil sin datos identificativos y CTA para abrir el reto.
- No forzar registro, notificaciones, instalación ni cookies no esenciales.

### Próxima capa

- Añadir un selector “¿Qué quieres provocar?”: que se ría, que lo use mucho, que recuerde un momento, que descubra algo o que disfrutéis juntos.
- Añadir un filtro “lo necesito esta semana” para priorizar ideas fáciles de localizar, sin prometer stock.
- Permitir ocultar una idea con “no es para esta persona” y usar esa señal solo durante la sesión.
- Crear una vista de comparación: “mis tres finalistas” para compartir una encuesta rápida.
- Ofrecer una frase lista para acompañar el regalo, generada a partir del tono elegido y sin IA.

## 3. SEO que también sirve a personas

### Arquitectura de contenidos

Crear páginas solo cuando tengan una respuesta propia, ejemplos y una ruta clara hacia el radar. Los clusters iniciales son:

- regalos de cumpleaños para pareja, novia, novio, madre, padre, amigo, hermana, hermano y compañero;
- regalos baratos, por menos de 20 €, por menos de 30 €, entre 30 y 50 € y de última hora;
- regalos originales, útiles, emotivos, divertidos, tecnológicos y para alguien que ya tiene de todo;
- regalos según interés: café, cocina, deporte, viajes, lectura, música, gaming, plantas, autocuidado y fotografía;
- regalos por edad aproximada, sin convertir la edad en una etiqueta rígida.

Cada página debe incluir una respuesta rápida al principio, criterios de elección, ejemplos concretos, límites de presupuesto, preguntas frecuentes reales, enlaces internos y una CTA hacia el selector. Evitar páginas programáticas que solo cambien “novia” por “novio”.

### AEO y buscadores con IA

- Responder con frases directas a preguntas naturales: “¿qué regalo hago con 20 euros?”, “¿qué regalar a alguien que tiene de todo?” y “¿cómo elegir un regalo útil?”.
- Usar subtítulos interrogativos, listas cortas, definiciones claras y ejemplos verificables.
- Mantener `FAQPage`, `BreadcrumbList`, `WebSite` y `WebApplication` coherentes con el contenido visible.
- Mantener `llms.txt` como orientación, sin presentarlo como garantía de aparición en un motor.
- Publicar contenido que aporte criterio y experiencia editorial, no texto creado solo para incluir palabras clave.
- Añadir autoría, fecha de actualización, criterios editoriales y una explicación sencilla de la afiliación.

### Distribución técnica

- Enviar sitemap a Google Search Console y Bing Webmaster Tools cuando el dominio propio esté listo.
- Medir indexación, consultas, CTR, páginas de entrada y consultas sin respuesta.
- Usar URLs estables, canonical correcto, enlaces internos y redirecciones solo cuando exista una equivalencia real.
- Mantener HTML útil en la respuesta inicial, cero dependencias externas y caché de estáticos.

## 4. Contenido social reutilizable

El producto puede producir una pieza por recomendación sin crear un panel editorial complejo:

- “Le he pasado el radar a mi pareja: ¿elegiremos lo mismo?”
- “Diez regalos para alguien que ya tiene de todo; este fue el que más encajó.”
- “Regalos útiles por menos de 20 € que no parecen comprados con prisa.”
- “El radar eligió entre práctico, original y pequeño lujo.”
- “Tres regalos para una persona cafetera, sin regalarle otra taza genérica.”

Formatos que merecen prueba:

- tarjeta vertical para historias, con una sola idea y el porcentaje orientativo;
- carrusel con “perfil → tres pistas → idea final”;
- vídeo corto mostrando los ocho toques y el reveal de resultados;
- pins de Pinterest enlazados a una guía específica, no solo a la portada;
- plantilla de reto para que la persona publique “elige sin mirar mi elección”.

La publicación debe hacerse de forma manual o con herramientas autorizadas por cada red. No conviene automatizar respuestas o crear falsas recomendaciones.

## 5. PWA y futuro Android

El aviso de instalación debe ser discreto y aparecer después de que el usuario haya entendido el valor. La PWA es el siguiente paso de menor coste: permite volver al radar desde la pantalla de inicio y sirve para validar recurrencia.

Solo después de observar uso recurrente tendría sentido empaquetarla como TWA o aplicación Android. Antes de publicar en una app store habría que añadir contenido y valor específicos de app, política de privacidad accesible, soporte, screenshots, clasificación por edades y un proceso de actualización. Subir una simple web sin distribución ni retención no crea alcance por sí solo.

## 6. Mixpanel: embudo mínimo

Eventos ya preparados o recomendados:

| Etapa | Evento | Métrica |
| --- | --- | --- |
| Entrada | `quiz_started` | Inicio por landing, idioma y dispositivo |
| Intención | `quiz_answered` | Abandono por paso |
| Valor | `recommendations_viewed` | Finalización y modo elegido |
| Monetización | `gift_outbound_clicked` | CTR por posición, país y categoría |
| Viralidad | `share_clicked`, `share_completed` | Inicio y finalización de compartir |
| Reto | `challenge_started`, `challenge_pick_made` | Conversión de receptor |
| Retorno | `weekly_discovery_clicked`, `pwa_installed` | Recurrencia e instalación |

Antes de activar Mixpanel: consentimiento y política actualizada si aplica, token solo en variables de despliegue, exclusión de respuestas que puedan identificar a alguien y una prueba de retención de 7/30 días. El objetivo no es acumular datos; es saber qué combinación produce un buen regalo y qué parte del bucle se rompe.

## 7. Experimentos concretos

Probar uno cada vez durante un periodo suficiente:

1. “Comparte el reto” frente a “Envía estas ideas”.
2. Tarjeta con una idea frente a tarjeta con tres finalistas.
3. CTA de compartir inmediatamente después de resultados frente a después de elegir una favorita.
4. Landing centrada en “regalos de cumpleaños” frente a “encuentra un regalo en 8 toques”.
5. Instalación PWA tras resultados frente a instalación tras volver por segunda vez.
6. Bloque “por menos de X” frente a “para esta persona” en las páginas SEO.

Registrar hipótesis, fecha, muestra, métrica primaria y decisión. No interpretar un pico aislado como crecimiento sostenible.

## 8. Monetización responsable

- Mantener enlaces de búsqueda relevantes y el presupuesto como límite visible.
- No mostrar precios exactos ni disponibilidad como si fueran datos en tiempo real si no existe una fuente actualizada.
- No introducir productos por comisión si empeoran claramente el encaje.
- Verificar la etiqueta y las condiciones de Amazon antes de promocionar a escala.
- No colocar interstitials, pop-ups de urgencia ni anuncios que interrumpan el cuestionario.
- Si más adelante se añaden otros comercios, explicar la independencia y conservar un ranking editorial neutral.

La confianza es parte del ingreso: más clics cualificados y repetidos valen más que forzar clics en una idea irrelevante.

## 9. Hoja de ruta de 30 días

### Semana 1

- Verificar Search Console/Bing y enviar sitemap.
- Revisar las diez búsquedas con más impresiones y mejorar esas páginas.
- Probar el bucle de reto con cinco parejas o amigos.
- Medir el ratio de finalización en móvil estrecho.

### Semana 2

- Publicar cuatro páginas con intención distinta y ejemplos reales.
- Crear diez tarjetas o vídeos cortos reutilizables.
- Medir el clic a Amazon por posición y modo.

### Semana 3

- Probar dos versiones de CTA y dos diseños de tarjeta.
- Añadir “ocultar esta idea” o “quiero algo más inesperado” si el feedback lo pide.
- Revisar términos, privacidad, cookies y afiliación antes de activar analítica.

### Semana 4

- Conservar solo los cambios que mejoren finalización, compartir o clic cualificado.
- Decidir si la PWA genera retornos suficientes para invertir en TWA/Android.
- Priorizar el siguiente cluster SEO a partir de consultas reales, no de intuición.
