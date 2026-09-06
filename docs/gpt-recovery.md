# Auditoría de recuperación del GPT de regalos

Fecha de auditoría: 6 de septiembre de 2026

## Resultado

El GPT antiguo sí sigue disponible en la cuenta de ChatGPT y se puede abrir desde Mis GPT. Se encontraron dos versiones de regalos y dos versiones de recetas. La versión española es la referencia principal para este MVP porque coincide con el objetivo de cumpleaños y está alineada con el idioma de la web.

## GPTs localizados

### Referencia principal

- Nombre: Ideas Para Regalos GPT 🎁 Haz el Regalo Perfecto
- ID: g-681e4e889c888191aad9c3eb7fc11b30
- URL: https://chatgpt.com/g/g-681e4e889c888191aad9c3eb7fc11b30-ideas-para-regalos-gpt-haz-el-regalo-perfecto
- Estado observado: Publicado para todos
- Última edición observada: 20 de junio de 2025
- Descripción: ideas originales y personalizadas para cumpleaños, aniversarios y cualquier ocasión; 10 sugerencias según gustos, presupuesto y estilo.

### Versión inglesa relacionada

- Nombre: Gift Genius 🎁 Personalized Gift Ideas Generator
- ID: g-681b96f73ec88191becadac4951c4433
- URL: https://chatgpt.com/g/g-681b96f73ec88191becadac4951c4433-gift-genius-personalized-gift-ideas-generator
- Estado observado: Publicado para todos
- Última edición observada: 9 de julio de 2025
- Descripción: ideas de regalo a partir de unos pocos datos rápidos, especialmente para cumpleaños.

## Comportamiento recuperado

La configuración de la versión española pedía una única línea con siete datos (el género iba unido a la edad); la interfaz actual los presenta como ocho pasos para facilitar el flujo, en este orden:

1. Edad y género de la persona.
2. Relación con quien regala.
3. Cosas que le gustan.
4. Presupuesto máximo.
5. Ocasión.
6. Estilo o vibra deseados.
7. País del comprador.

A partir de esa línea, el GPT debía producir 10 ideas personalizadas. Cada idea llevaba un título corto y creativo, un enlace clicable a una búsqueda de Amazon y una explicación breve de por qué encajaba. Pedía mezclar regalos prácticos, reflexivos, clásicos y sorprendentes, evitando el relleno genérico.

El prompt definía estas tiendas: España, Estados Unidos, Reino Unido, Alemania, Francia, Canadá e Italia. Si el país no quedaba claro, usaba amazon.com. El formato de búsqueda incluía la consulta del regalo, un límite de precio y el tag lamamihacker-21.

También definía un cierre para pedir datos de otra persona y un bloque de promoción del propio GPT. Ese bloque promocional no se ha trasladado al MVP: la web tendrá identidad y distribución propias.

## Configuración técnica observada

- No había archivos de Conocimiento cargados.
- No había Acciones configuradas.
- Estaban activadas Búsqueda en Internet, Lienzo, Generación de imágenes e Intérprete de código y análisis de datos.
- No había modelo recomendado fijo.
- El GPT tenía conversaciones visibles en Mis GPT: más de 30 en la versión española y más de 10 en la inglesa.

La auditoría recuperó la configuración desde el editor del GPT. No se exportaron las conversaciones antiguas ni se modificó el GPT.

## Qué se reconstruye ahora

La interfaz convierte los siete campos originales en ocho pasos de tarjetas tocables: separa género de edad y hace que cada elección avance automáticamente. El paso de gustos recoge un gusto principal (una sola opción) para conservar el flujo de un toque por pregunta. La salida conserva 10 ideas, el orden de afinación por país y el enlace de búsqueda de Amazon, pero añade una separación explícita entre catálogo y motor.

El catálogo local es la fuente de verdad de títulos, consultas, categorías y precios orientativos. El motor puntúa esos registros por presupuesto, relación, edad, ocasión, gusto principal y estilo; el género se conserva como contexto visible para futuras mejoras, sin aplicar filtros estereotipados por defecto. La salida nunca crea una URL de producto desde cero ni afirma que el precio o el stock sean actuales.

## Información que falta antes de introducir IA

La configuración ya es suficiente para reconstruir el flujo, pero no para afirmar que conocemos toda la magia editorial del GPT. Antes de activar IA conviene recuperar o decidir:

- Dos a cinco conversaciones que representen la calidad que se quiere conservar.
- Reglas editoriales implícitas: humor, marcas que evitar, regalos repetidos, límites por edad y sensibilidad cultural.
- Si el tag lamamihacker-21 sigue activo y en qué cuentas de Amazon Associates.
- Marketplaces, divisa y criterio de precios por país.
- Catálogo real, fuentes de producto, periodicidad de actualización y tratamiento de productos retirados.
- Modelo, presupuesto mensual, límites y política de fallback para la futura llamada de IA.

## Decisión de coste del MVP

No se activa IA en esta publicación. La versión determinista no usa OpenClaw, claves ni llamadas a modelos y mantiene el producto público sin coste variable de inferencia. La IA futura solo se probará si los datos de uso muestran una mejora clara y existe un presupuesto explícito; si se incorpora, será opcional y con fallback determinista.

## Contrato recomendado para la IA futura

Entrada: GiftBrief con relation, gender, age, occasion, budget, primaryInterest, style y country.

Salida: una lista de ids existentes del catálogo, con una explicación breve y una puntuación de encaje.

Validación: cada id debe existir en el catálogo y la URL debe ser construida por el generador de enlaces. Si la IA devuelve un id desconocido, el resultado se descarta y se usa el ranking determinista.

Este diseño conserva el comportamiento útil del GPT sin trasladar OpenClaw, sus credenciales ni su runtime a la web pública.
