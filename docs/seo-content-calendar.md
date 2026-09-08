# Calendario editorial SEO de Regalazo

Este calendario convierte el contenido SEO en un proceso continuo, barato y revisable. La web sigue siendo estática: cada página se publica con un commit en GitHub y Netlify la despliega automáticamente. No se generan páginas en masa ni se inventan precios, stock, entregas o productos.

## Arquitectura de clusters

La página `/guias-de-regalos/` es el hub. Desde ahí se enlazan tres tipos de intención:

- **Persona:** madre, padre, amiga, amigo, hermana y hermano.
- **Situación:** última hora, alguien que tiene de todo y presupuestos bajos.
- **Afición:** café, viajes y regalos originales.

Cada guía debe responder a la consulta en el primer bloque, aportar criterios para decidir, incluir ejemplos adaptables por presupuesto y terminar con una acción útil hacia el selector. Las FAQs deben coincidir con el texto visible y mantenerse sencillas para que también puedan reutilizarse como respuestas de búsqueda y de asistentes.

## Primer ciclo de publicación

| Semana | Cluster | Página o acción | Aporte que debe ser útil | CTA principal | Medición |
| --- | --- | --- | --- | --- | --- |
| 1 | Hub | Revisar `/guias-de-regalos/` | Explica cómo elegir por persona, situación y afición | Selector en 8 toques | Impresiones, clics al selector |
| 2 | Persona | Madre y padre | Separar rituales, aficiones y mejoras de algo que ya usan | Afinar el regalo | Clics orgánicos, inicio del quiz |
| 3 | Persona | Amiga y amigo | Relación, complicidad y señales observables, sin clichés | Encontrar una idea | Scroll, quiz completado |
| 4 | Persona | Hermana y hermano | Estilo actual, hobbies y planes compartidos | Afinar el regalo | CTR hacia el selector |
| 5 | Situación | Última hora | Proceso rápido y comprobaciones de entrega, formato y vendedor | Ideas en 8 toques | Entradas, salida a tienda |
| 6 | Situación | Tiene de todo | Consumo, mejora, recuerdo o tiempo compartido | Idea con sentido | Compartidos, retorno |
| 7 | Afición | Amantes del café | Diferenciar grano, método, ritual y portabilidad | Regalo cafetero | CTR, modo de compra |
| 8 | Afición | Viajeros | Elegir por tipo de viaje, volumen y necesidad real | Regalo para viajar | CTR, quiz iniciado |
| 9 | Presupuesto | Actualizar baratos y menos de 30 € | Añadir ejemplos por debajo de varios límites sin prometer precio vigente | Ideas económicas | Consultas, clics |
| 10 | Intención | Actualizar regalos originales | Nuevos formatos: kits, mejoras, experiencias y recuerdos | Ver ideas originales | CTR y compartidos |
| 11 | Ocasión | Cumpleaños | Diferenciar edad aproximada, relación, ocasión y tono | Empezar el selector | Posición y finalización |
| 12 | Comparativa | Revisar enlaces internos del cluster | Resolver páginas huérfanas y mejorar el siguiente paso | Guía o selector según intención | Enlaces internos, rebote |

## Cadencia después de las 12 semanas

Cada semana se hace una sola acción editorial con una persona responsable:

1. Revisar consultas reales de Search Console y preguntas que llegan por el producto.
2. Elegir una página existente para mejorar o una intención claramente nueva.
3. Añadir una respuesta directa, ejemplos concretos y una comprobación que evite malas compras.
4. Enlazar desde el hub y desde una guía relacionada; comprobar que no se canibaliza otra URL.
5. Actualizar `sitemap.xml`, `llms.txt` y la fecha de revisión cuando el cambio sea sustancial.
6. Publicar mediante GitHub y comprobar la URL en producción en móvil.

La publicación puede ser semanal, quincenal o pausarse. El calendario es una guía de operación, no una promesa de que los buscadores indexen una página en una fecha concreta.

## Reglas de calidad

- Una página nueva necesita una intención diferente, no solo cambiar “madre” por “padre”.
- La respuesta inicial debe poder leerse sin usar JavaScript.
- No se afirman precios, disponibilidad, entrega, valoración o tendencia actual si no se han comprobado.
- Los ejemplos son categorías e ideas, no fichas de producto disfrazadas.
- Se mantiene la divulgación de afiliación y el enlace a la guía principal.
- Si dos páginas responden a la misma búsqueda, se consolida una y se redirige o enlaza la otra en vez de crear una tercera.
- Antes de activar analítica, se respetan consentimiento, privacidad y la cola de eventos ya preparada en `app.js`.

## Señales para decidir qué publicar

Prioridad alta: consulta con impresiones y CTR bajo cuya respuesta podamos mejorar, página que inicia sesiones pero no lleva al selector, y pregunta repetida que aún no tiene una guía propia.

Prioridad media: actualización de un cluster que ya recibe tráfico pero tiene ejemplos repetidos, enlaces rotos o una respuesta demasiado genérica.

Prioridad baja: una nueva combinación de palabras sin intención diferenciada, contenido que solo rellena longitud o páginas basadas en supuestas tendencias sin una fuente verificable.

## Checklist de cada publicación

- [ ] Title, descripción, canonical y `lang` revisados.
- [ ] Respuesta rápida visible y específica.
- [ ] FAQ visible y `FAQPage` consistente.
- [ ] `BreadcrumbList` e indicación de hub.
- [ ] Dos enlaces internos útiles como mínimo.
- [ ] CTA al selector sin interrumpir la lectura.
- [ ] Footer legal y disclosure de afiliación.
- [ ] Prueba a 320–414 px sin overflow horizontal.
- [ ] URL añadida al sitemap y al índice de `llms.txt` si procede.
- [ ] Comprobación de la página publicada y de la fecha de actualización.
