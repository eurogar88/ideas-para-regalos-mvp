# Regalazo

MVP público y mobile-first de recomendaciones de regalos. La experiencia funciona casi sin escribir: se responde con toques y devuelve 10 ideas contextualizadas con búsquedas de salida hacia la tienda de Amazon elegida.

## Estado actual

- Asistente de 8 pasos: relación, género, edad aproximada, ocasión, presupuesto, gusto principal, estilo y país del comprador.
- Motor determinista local con catálogo editorial y ranking por coincidencias.
- Capa de composición con 7 enfoques editoriales —encaje, toque personal, plan, pack, giro inesperado, descubrimiento y pequeño lujo— que amplía las 360 ideas base hasta 2.055 composiciones compatibles.
- Tres modos de resultado: Mejor encaje, Más sorprendentes y Novedades. El historial anónimo local evita repetir composiciones para el mismo perfil.
- Diez recomendaciones con título, motivo, precio orientativo y enlace de búsqueda relevante.
- Cada resultado puede compartirse con sus respuestas codificadas en la URL, para convertir la selección en un pequeño reto entre amigos o pareja. La persona que recibe el enlace puede marcar su elección, comparar si coincide y compartirlo de nuevo.
- El resultado incluye canales rápidos de WhatsApp y Telegram, y permite generar una tarjeta PNG para compartir en redes o mensajería.
- Responsive endurecido para móvil estrecho: panel de compartir contenido dentro de la tarjeta, controles que pueden envolver texto largo y cero overflow horizontal.
- PWA instalable: manifest, icono, service worker de shell y aviso de instalación solo cuando el navegador lo permite. Esto deja el producto listo para empaquetarlo más adelante como Android/TWA sin mantener una app nativa desde el día uno.
- El aviso PWA es compacto, aparece con retraso para no tapar el selector y se controla desde `APP_CONFIG.installPromptEnabled` y `APP_CONFIG.installPromptDelayMs` en `app.js`; basta con cambiar el primer valor a `false` cuando haya que ocultarlo.
- El idioma inicial respeta una preferencia guardada por el usuario; si no existe, usa el idioma del navegador o del sistema cuando está disponible y cae a inglés. Elegir otro idioma lo deja como preferencia persistente.
- En resultados, el “Giro de chispa” ofrece una transición corta y opcional para reordenar la siguiente tanda sin perder el filtro de relevancia. Respeta `prefers-reduced-motion`.
- Bloque de descubrimiento semanal para renovar el motivo de vuelta sin añadir un feed ni una base de datos.
- Dominios de Amazon localizados para España, Estados Unidos, Reino Unido, Alemania, Francia, Italia y Canadá.
- Etiqueta de afiliación heredada de la configuración del GPT: lamamihacker-21. Debe verificarse en la cuenta de Amazon Associates antes de considerarla operativa.
- Sin registro, sin nombres y sin datos enviados a un servidor.
- Sin runtime de OpenClaw y sin llamadas a modelos de IA en esta primera versión. La IA queda como extensión opcional para más adelante, no como coste fijo del MVP.
- Novedades no significa inventario en tiempo real: prioriza composiciones de descubrimiento y añade ordenación por incorporaciones recientes a la búsqueda de Amazon cuando el marketplace la admite. La página lo comunica y pide comprobar fecha, precio y disponibilidad.

## URLs

- Web pública: https://ideas-para-regalos-mvp.netlify.app/
- Repositorio: https://github.com/eurogar88/ideas-para-regalos-mvp
- Panel de Netlify: https://app.netlify.com/projects/ideas-para-regalos-mvp

## GPT recuperado

La base funcional procede del GPT público Ideas Para Regalos GPT 🎁 Haz el Regalo Perfecto:

- GPT ID: g-681e4e889c888191aad9c3eb7fc11b30
- URL pública: https://chatgpt.com/g/g-681e4e889c888191aad9c3eb7fc11b30-ideas-para-regalos-gpt-haz-el-regalo-perfecto
- Configuración recuperada desde su editor: 10 ideas personalizadas, mezcla de opciones prácticas y originales, enlaces de búsqueda de Amazon por país y etiqueta de afiliación.

El GPT pedía originalmente, en una línea y separadas por comas: edad y género, relación, cosas que le gustan, presupuesto máximo, ocasión, estilo o vibra y país del comprador. El MVP conserva esas señales, añade género y las convierte en una secuencia guiada de pulsaciones para reducir la escritura. Cada elección avanza automáticamente; el paso de gustos recoge un gusto principal para mantener el flujo de un toque por pregunta.

La auditoría completa, incluida la versión inglesa relacionada y lo que todavía falta confirmar, está en docs/gpt-recovery.md.

## Arquitectura

Es una web estática sin dependencias externas:

- index.html: estructura, copy, accesibilidad y wizard.
- styles.css: diseño responsive mobile-first.
- app.js: catálogo, ranking, generación de resultados y enlaces de salida.
- netlify.toml: publicación desde la raíz y cabeceras básicas.
- manifest.webmanifest, sw.js, icon.svg y og-image.svg: instalación, caché del shell, identidad y preview social.
- docs/gpt-recovery.md: recuperación y límites de la configuración del GPT.
- docs/growth-playbook.md: acciones priorizadas para SEO, AEO, viralidad, PWA, medición y monetización responsable.
- aviso-legal/, terminos-de-uso/, privacidad/ y cookies/: textos legales de lanzamiento enlazados desde el footer.

La aplicación usa rutas relativas y no acopla el dominio actual, por lo que puede pasar a un dominio propio más adelante sin reescribir la lógica. Si se añade IA, la interfaz debería enviar un GiftBrief a una función server-side; el modelo solo podrá devolver IDs de productos del catálogo permitido y motivos de recomendación. Nunca debe inventar fichas ni URLs de afiliación. La composición actual mantiene la relevancia y la trazabilidad sin consumir API.

## Despliegue

La rama main está conectada al proyecto de Netlify. Cada cambio publicado en GitHub dispara un deploy. La configuración actual es: proyecto estático, directorio de publicación ., sin comando de build.

Para una prueba local, sirve la raíz con cualquier servidor estático, por ejemplo: python3 -m http.server 4173. Después abre http://localhost:4173/.

## Antes de activar IA (si algún día compensa)

Si algún día se prueba IA, primero habrá que confirmar con el propietario del GPT ejemplos reales de 2–5 conversaciones que representen el criterio deseado, preferencias editoriales y exclusiones, estado real de la etiqueta y marketplaces de Amazon, fuente y actualización de precios/productos, y un presupuesto explícito. No se activa ahora porque el objetivo del MVP es mantener el coste en cero.

## Afiliación y transparencia

Los enlaces se generan como búsquedas relevantes y llevan rel=sponsored. Amazon puede mostrar productos, precios o disponibilidad distintos. El sitio muestra la divulgación de posible comisión; la pertenencia efectiva a un programa de afiliados y el cumplimiento de sus requisitos deben validarse antes de promocionarlo ampliamente.

## SEO y rendimiento

La web prioriza SEO técnico y carga rápida sin añadir dependencias ni coste variable:

- La portada tiene title, meta description, canonical, robots, Open Graph, Twitter metadata y datos estructurados WebSite/WebApplication.
- El primer contenido del selector está presente en HTML desde la respuesta inicial; JavaScript solo mejora la interacción.
- Hay contenido editorial rastreable y páginas específicas para [regalos de cumpleaños](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos/), [regalos baratos](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-baratos/), [regalos por menos de 30 euros](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-por-menos-de-30-euros/), [regalos originales](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-originales/), [regalos para pareja](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-para-pareja/), [regalos para novia](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-para-novia/) y [regalos para novio](https://ideas-para-regalos-mvp.netlify.app/regalos-de-cumpleanos-para-novio/).
- Las guías empiezan con una respuesta directa, usan preguntas completas como subtítulos y publican FAQPage + BreadcrumbList JSON-LD. `llms.txt` resume el producto, sus respuestas útiles y sus límites para facilitar el descubrimiento por sistemas de IA; no se considera una garantía de indexación.
- robots.txt y sitemap.xml están publicados en la raíz y enlazan la versión actual de Netlify.
- No se cargan fuentes externas, imágenes pesadas, librerías ni analytics; app.js usa defer y Netlify sirve los estáticos desde CDN.
- Las páginas HTML se revalidan y CSS/JS usan caché con stale-while-revalidate para mejorar visitas repetidas.

Cuando se conecte un dominio propio, hay que sustituir la URL de Netlify en los canonical, Open Graph, JSON-LD, robots.txt y sitemap.xml; después conviene verificar el dominio en Google Search Console y enviar el sitemap. Las páginas SEO deben seguir creciendo con contenido útil y original, no con copias cambiando solo una palabra clave.

## Mixpanel (preparado, no activo)

La versión pública no carga un SDK externo ni envía analítica por defecto. app.js expone window.RegalazoAnalytics y mantiene una cola local de eventos durante la sesión; ANALYTICS_CONFIG está desactivado y el token está vacío.

Eventos v1: quiz_started, quiz_answered (questionId, value, step), recommendations_viewed (resultCount, variant, mode), recommendations_refreshed (variant, mode), recommendations_mode_changed (mode, variant), spark_spin_started (mode), spark_spin_completed (variant, mode), gift_outbound_clicked (giftId, position, country), language_changed (from, to), share_clicked, share_channel_clicked (method, mode), share_completed (method, mode), shared_result_opened (mode, hasPick, challenge), challenge_started, challenge_pick_made (giftId, position, hasIncomingPick), share_card_created (method), weekly_discovery_viewed (giftId), weekly_discovery_clicked, pwa_ready, pwa_install_prompt_viewed, pwa_install_prompted, pwa_install_choice, pwa_installed, pwa_install_dismissed y quiz_reset. Todos incluyen app, language, version y marca temporal.

Para activarlo habrá que definir consentimiento y privacidad, cargar el SDK o un endpoint propio después de ese consentimiento, proporcionar el token mediante el proceso de despliegue y validar primero en desarrollo. No se guardan nombres, emails ni texto libre.

## Licencia

MVP privado de producto. No se concede licencia de reutilización del catálogo ni de la marca por este README.
