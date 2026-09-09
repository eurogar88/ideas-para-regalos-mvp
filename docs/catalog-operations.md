# Catálogo y calidad de recomendaciones

## Alcance actual

Regalazo mantiene un catálogo local de 360 ideas base únicas. Cada idea tiene un identificador estable, una intención de búsqueda de Amazon, una franja de precio orientativa, intereses, estilos, relaciones, edades, ocasiones y una explicación editorial. El motor combina esas ideas con 19 enfoques editoriales, por lo que una persona puede recorrer más de 6.000 composiciones compatibles sin que el modelo invente productos ni enlaces.

Esto no equivale a 360 SKU en tiempo real. La web ahora puede consultar Amazon Creators API server-side para resolver cada una de las diez intenciones visibles a un producto concreto con ficha, imagen y precio de oferta. Si una consulta no devuelve una ficha válida, esa tarjeta conserva la búsqueda editorial como fallback. “Ver similares” es siempre la salida de búsqueda para comparar alternativas.

No se persigue una lista estática de 5.000 ASIN. Una cifra grande de productos sin revisión se queda vieja y empeora la confianza. La combinación correcta es: muchas intenciones editoriales bien diferenciadas, 19 enfoques de búsqueda, consultas live de Amazon, deduplicación por ASIN, una ficha principal por idea y búsqueda de similares para ampliar la elección. Así el inventario potencial puede superar 5.000 sin convertir el repositorio en una base de precios/stock caducada.

## Regla para añadir una idea

Una idea nueva solo entra si aporta una intención de compra distinta. Antes de añadirla:

1. Debe tener un `id` nuevo y una búsqueda de Amazon que no sea una copia de otra.
2. Debe funcionar en al menos un presupuesto, edad, relación u ocasión concreta.
3. Debe explicar por qué encaja y qué conviene comprobar antes de comprar.
4. No debe afirmar precio, stock, calidad o experiencia personal que no se hayan verificado.
5. Debe poder convivir con el filtro de edad y de contexto sin producir recomendaciones incómodas.

## Cómo mantener variedad

La primera pasada prioriza familias de producto que aún no se han mostrado para ese perfil. Cuando ya han aparecido todas las familias compatibles, el motor puede volver a ellas con otra composición editorial, pero no repite la misma combinación exacta. La memoria se guarda únicamente en el navegador y se limita al tamaño del catálogo compuesto.

Los botones “Ya lo tiene” y “No me encaja” descartan la familia de la tarjeta pulsada y sustituyen esa tarjeta individualmente. No se debe cambiar este comportamiento por una regeneración completa: conservar las opciones que ya interesaban es parte de la confianza del recomendador.

## Rotación editorial sin deploy diario

La portada rota automáticamente una idea de descubrimiento cada siete días a partir del catálogo editorial. La rotación es determinista por fecha, así que no requiere una base de datos ni una publicación manual cada mañana y evita presentar como “producto nuevo” una ficha cuyo precio o stock no se haya comprobado. Las diez ideas del selector se vuelven a consultar bajo demanda cuando la capa de Amazon está disponible; la ficha concreta, el precio y la imagen deben seguir viniendo de esa fuente autorizada.

La cadencia semanal es deliberada: da tiempo a que una idea se vea, se comparta y se mida. Si los datos demuestran que la gente vuelve con frecuencia, se puede bajar a una rotación diaria cambiando `discoveryRotationDays` en `app.js`, sin duplicar productos ni generar páginas SEO de baja calidad.

## Camino para fichas reales

La ficha concreta se obtiene bajo demanda desde `netlify/functions/amazon-products.mjs`. La función no expone credenciales, restringe el marketplace, valida el dominio del enlace y solo devuelve resultados con título, precio y URL de ficha. Las imágenes se aceptan únicamente desde hosts CDN conocidos de Amazon. El navegador muestra la hora de consulta para no presentar la información como permanente.

Si en el futuro se necesita una capa editorial persistente, se deben seleccionar primero 60–100 intenciones de alto tráfico y revisar productos reales con una fecha de revisión y una fuente autorizada para imagen, precio y disponibilidad. No se debe copiar un listado masivo sin mantenimiento.
