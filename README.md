# Regalazo

MVP público y mobile-first de recomendaciones de regalos. La experiencia funciona casi sin escribir: se responde con toques y devuelve 10 ideas contextualizadas con búsquedas de salida hacia la tienda de Amazon elegida.

## Estado actual

- Asistente de 8 pasos: relación, género, edad aproximada, ocasión, presupuesto, gusto principal, estilo y país del comprador.
- Motor determinista local con catálogo editorial y ranking por coincidencias.
- Catálogo editorial de 360 ideas base únicas y más de 300 búsquedas de producto diferenciadas; la capa de 7 enfoques —encaje, toque personal, plan, pack, giro inesperado, descubrimiento y pequeño lujo— permite recorrer hasta 2.055 composiciones compatibles.
- Un único modo de resultado: Mejor encaje. “Ver otras ideas” genera otra tanda relevante y el historial anónimo local evita repetir composiciones para el mismo perfil.
- Diez recomendaciones con título, motivo, precio orientativo, pista de compra y enlace de búsqueda relevante. “Ya lo tiene” y “No me encaja” sustituyen solo la tarjeta descartada, conservando el resto de la selección.
- La selección completa puede compartirse con sus respuestas y las mismas 10 ideas codificadas en la URL para que otra persona vea exactamente el mismo resultado, sin cuenta ni datos identificativos.
- Responsive endurecido para móvil estrecho: panel de compartir contenido dentro de la tarjeta, controles que pueden envolver texto largo y cero overflow horizontal.
- PWA instalable: manifest, icono, service worker de shell y aviso de instalación solo cuando el navegador lo permite. Esto deja el producto listo para empaquetarlo más adelante como Android/TWA sin mantener una app nativa desde el día uno.
- El aviso PWA es compacto, aparece con retraso para no tapar el selector y se controla desde `APP_CONFIG.installPromptEnabled` y `APP_CONFIG.installPromptDelayMs` en `app.js`; basta con cambiar el primer valor a `false` cuando haya que ocultarlo.
- El idioma inicial respeta una preferencia guardada por el usuario; si no existe, usa el idioma del navegador o del sistema cuando está disponible y cae a inglés. Elegir otro idioma lo deja como preferencia persistente.
- Modo oscuro alternable con un solo icono en todas las páginas; respeta la preferencia del sistema en la primera visita, recuerda la elección localmente y evita el destello claro gracias a un preloader inline.
- En resultados, “Ver otras ideas” ofrece una nueva tanda relevante con una transición suave. Respeta `prefers-reduced-motion`.
- Bloque de descubrimiento semanal para renovar el motivo de vuelta sin añadir un feed ni una base de datos.
- Dominios de Amazon localizados para España, Estados Unidos, Reino Unido, Alemania, Francia, Italia y Canadá.
- La etiqueta de afiliación actualmente configurada y pendiente de validación operativa es `lamamihacker-21` para España. Los demás marketplaces abren enlaces sin etiqueta hasta configurar y verificar un tracking ID propio; nunca se reutiliza una etiqueta de otro país.
- Sin registro, sin nombres y sin datos enviados a un servidor.
- Sin runtime de OpenClaw y sin llamadas a modelos de IA en esta primera versión. La IA queda como extensión opcional para más adelante, no como coste fijo del MVP.
- El bloque “Descubrimiento de la semana” no representa inventario en tiempo real: es una idea editorial que enlaza directamente con una búsqueda de Amazon. Amazon puede mostrar otros productos, precios y disponibilidades.

## URLs

- Web pública: https://regalazo.xyz/
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
- theme.js: alternancia de tema claro/oscuro, preferencia persistente y sincronización del color de la barra del navegador.
- netlify.toml: publicación desde la raíz y cabeceras básicas.
- manifest.webmanifest, sw.js, icon.svg y og-image.svg: instalación, caché del shell, identidad y preview social.
- docs/gpt-recovery.md: recuperación y límites de la configuración del GPT.
- docs/growth-playbook.md: acciones priorizadas para SEO, AEO, viralidad, PWA, medición y monetización responsable.
- docs/seo-content-calendar.md: clusters editoriales, cadencia de publicación, reglas de calidad y checklist de cada URL.
- docs/catalog-operations.md: reglas para mantener las 360 ideas, ampliar variedad y pasar más adelante a fichas de producto reales.
- aviso-legal/, terminos-de-uso/, privacidad/ y cookies/: textos legales de lanzamiento enlazados desde el footer.

La aplicación usa rutas relativas y no acopla la lógica al dominio, por lo que el cambio a `regalazo.xyz` no requiere reescribir la experiencia. Si se añade IA, la interfaz debería enviar un GiftBrief a una función server-side; el modelo solo podrá devolver IDs de productos del catálogo permitido y motivos de recomendación. Nunca debe inventar fichas ni URLs de afiliación. La composición actual mantiene la relevancia y la trazabilidad sin consumir API.

## Despliegue

La rama main está conectada al proyecto de Netlify. Cada cambio publicado en GitHub dispara un deploy. La configuración actual es: proyecto estático, directorio de publicación ., sin comando de build.

El badge flotante “Powered by Netlify” está desactivado en la configuración del proyecto. No depende de tener o no un dominio propio: se puede quitar desde Netlify en cualquier momento y un cambio de dominio no lo desactiva automáticamente.

Para una prueba local, sirve la raíz con cualquier servidor estático, por ejemplo: python3 -m http.server 4173. Después abre http://localhost:4173/.

## Antes de activar IA (si algún día compensa)

Si algún día se prueba IA, primero habrá que confirmar con el propietario del GPT ejemplos reales de 2–5 conversaciones que representen el criterio deseado, preferencias editoriales y exclusiones, estado real de la etiqueta y marketplaces de Amazon, fuente y actualización de precios/productos, y un presupuesto explícito. No se activa ahora porque el objetivo del MVP es mantener el coste en cero.

## Afiliación y transparencia

Los enlaces se generan como búsquedas relevantes y llevan rel=sponsored. Amazon puede mostrar productos, precios o disponibilidad distintos. El sitio muestra la divulgación de posible comisión; la pertenencia efectiva a un programa de afiliados y el cumplimiento de sus requisitos deben validarse antes de promocionarlo ampliamente.

## SEO y rendimiento

La web prioriza SEO técnico y carga rápida sin añadir dependencias ni coste variable:

- La portada tiene title, meta description, canonical, robots, Open Graph, Twitter metadata y datos estructurados WebSite/WebApplication.
- El primer contenido del selector está presente en HTML desde la respuesta inicial; JavaScript solo mejora la interacción.
- Hay contenido editorial rastreable y páginas específicas para [regalos de cumpleaños](https://regalazo.xyz/regalos-de-cumpleanos/), [regalos baratos](https://regalazo.xyz/regalos-de-cumpleanos-baratos/), [regalos por menos de 30 euros](https://regalazo.xyz/regalos-de-cumpleanos-por-menos-de-30-euros/), [regalos originales](https://regalazo.xyz/regalos-de-cumpleanos-originales/), [regalos para pareja](https://regalazo.xyz/regalos-de-cumpleanos-para-pareja/), [regalos para novia](https://regalazo.xyz/regalos-de-cumpleanos-para-novia/) y [regalos para novio](https://regalazo.xyz/regalos-de-cumpleanos-para-novio/).
- Las guías empiezan con una respuesta directa, usan preguntas completas como subtítulos y publican FAQPage + BreadcrumbList JSON-LD. El [hub de guías](https://regalazo.xyz/guias-de-regalos/) organiza clusters por persona, situación y afición, y el [calendario editorial](docs/seo-content-calendar.md) define cómo publicar y refrescar contenido útil sin páginas clonadas. `llms.txt` resume el producto, sus respuestas útiles y sus límites para facilitar el descubrimiento por sistemas de IA; no se considera una garantía de indexación.
- robots.txt y sitemap.xml están publicados en la raíz y usan `https://regalazo.xyz` como dominio canónico.
- No se cargan fuentes externas, imágenes pesadas ni librerías de UI; app.js usa defer y Netlify sirve los estáticos desde CDN. Mixpanel solo carga su SDK después de un consentimiento explícito.
- Las páginas HTML se revalidan en cada visita; CSS y JavaScript llevan versiones explícitas y se sirven con caché inmutable, de modo que una publicación nueva no queda atrapada en el shell anterior.

El dominio propio está conectado en Netlify y la propiedad `sc-domain:regalazo.xyz` ya está verificada en Google Search Console; el sitemap se ha enviado y deberá revisarse de nuevo cuando el certificado HTTPS esté activo. Las páginas SEO deben seguir creciendo con contenido útil y original, no con copias cambiando solo una palabra clave.

## Mixpanel (opt-in)

La versión pública muestra un aviso breve y no carga el SDK ni envía eventos hasta que la persona acepta la analítica. Si acepta, el SDK oficial se carga de forma dinámica contra el proyecto europeo de Mixpanel. Si rechaza o retira el consentimiento, no se envían eventos y puede volver a abrir sus preferencias desde el pie de página.

Los eventos están filtrados por una lista de propiedades permitidas: se excluyen las respuestas concretas del cuestionario (relación, género, edad, presupuesto, intereses, estilo y país), nombres, emails, texto libre y URLs compartidas. Solo se conservan métricas agregadas de uso, ruta sin parámetros, idioma, variante, posición y método de interacción necesarios para mejorar el producto.

Eventos growth-v4: page_viewed (path), quiz_started, quiz_answered (questionId, step), quiz_completed (genderProvided, interestCount), recommendations_viewed (resultCount, variant, mode), recommendations_refreshed (variant, mode), gift_outbound_clicked (giftId, position, store, mode), language_changed (from, to), share_clicked (mode, ideaCount), share_completed (method, mode), shared_result_opened (mode), weekly_discovery_viewed (giftId), weekly_discovery_clicked (giftId, store), pwa_ready, pwa_install_prompt_viewed, pwa_install_prompted, pwa_install_choice (outcome), pwa_installed, pwa_install_dismissed, quiz_reset, analytics_loaded y gift_feedback (giftId, feedback). Todos incluyen app, language, versión, ruta de entrada, campaña permitida y marca temporal. No se envían respuestas concretas, nombres, emails ni URLs compartidas; además, el SDK no conserva la URL completa en sus propiedades automáticas. El historial local de clics solo se guarda después de aceptar la analítica, y volver a aceptar después de retirarla reactiva correctamente el SDK.

La política de privacidad y la política de cookies describen el consentimiento, la carga diferida y la retirada. El token de cliente de Mixpanel vive en el bundle público, como está previsto para el SDK web; no es un secreto de servidor.

## Licencia

MVP privado de producto. No se concede licencia de reutilización del catálogo ni de la marca por este README.
