'use strict';

/*
 * The first MVP is intentionally deterministic. The catalog is the source of truth;
 * a future AI layer may rank catalog ids, but it must never invent products or URLs.
 */
var APP_CONFIG = Object.freeze({
  affiliateTag: 'lamamihacker-21',
  defaultCountry: 'ES',
  clickStorageKey: 'regalazo-clicks-v1',
  installPromptEnabled: true,
  installPromptDelayMs: 5200
});

var QUESTIONS = [
  {
    id: 'relation',
    kicker: '1 · Para quién',
    title: '¿Qué relación tienes con esta persona?',
    subtitle: 'El vínculo ayuda a encontrar el tono adecuado.',
    options: [
      { value: 'partner', label: 'Pareja', icon: '💞', detail: 'algo con intención' },
      { value: 'parent', label: 'Madre o padre', icon: '🏡', detail: 'un detalle especial' },
      { value: 'sibling', label: 'Hermano/a', icon: '🫶', detail: 'con complicidad' },
      { value: 'friend', label: 'Amigo/a', icon: '🥂', detail: 'para sorprenderle' },
      { value: 'child', label: 'Hijo/a', icon: '🌟', detail: 'según su etapa' },
      { value: 'coworker', label: 'Compañero/a', icon: '🎉', detail: 'acierto sin complicarse' },
      { value: 'other', label: 'Otra persona', icon: '✨', detail: 'lo afinamos después' }
    ]
  },
  {
    id: 'gender',
    kicker: '2 · Género',
    title: '¿Qué género describe mejor a esa persona?',
    subtitle: 'Si no lo sabes o prefieres no decirlo, puedes elegir esa opción.',
    options: [
      { value: 'woman', label: 'Mujer', icon: '♀️' },
      { value: 'man', label: 'Hombre', icon: '♂️' },
      { value: 'nonbinary', label: 'Persona no binaria', icon: '✨' },
      { value: 'other', label: 'Otra identidad', icon: '🌈' },
      { value: 'prefer-not', label: 'Prefiero no decirlo', icon: '🤍' },
      { value: 'unknown', label: 'No lo sé', icon: '🤷' }
    ]
  },
  {
    id: 'age',
    kicker: '3 · Edad',
    title: '¿En qué rango de edad está?',
    subtitle: 'Aproximada es perfecto. No necesitas saber el número exacto.',
    options: [
      { value: 'child', label: 'Menos de 12', icon: '🧸' },
      { value: 'teen', label: '12–17', icon: '🛹' },
      { value: 'young-adult', label: '18–24', icon: '🎧' },
      { value: 'adult', label: '25–34', icon: '🪩' },
      { value: 'midlife', label: '35–49', icon: '🌿' },
      { value: '50plus', label: '50 o más', icon: '🥰' },
      { value: 'unknown', label: 'No lo sé', icon: '🤷' }
    ]
  },
  {
    id: 'occasion',
    kicker: '4 · Momento',
    title: '¿Qué estás celebrando?',
    subtitle: 'El contexto cambia mucho el tipo de regalo que se siente bien.',
    options: [
      { value: 'birthday', label: 'Cumpleaños', icon: '🎂' },
      { value: 'anniversary', label: 'Aniversario', icon: '💌' },
      { value: 'christmas', label: 'Navidad', icon: '🎄' },
      { value: 'secret-santa', label: 'Amigo invisible', icon: '🎲' },
      { value: 'thankyou', label: 'Agradecimiento', icon: '🙏' },
      { value: 'justbecause', label: 'Porque sí', icon: '🌈' }
    ]
  },
  {
    id: 'budget',
    kicker: '5 · Presupuesto',
    title: '¿Cuánto quieres gastar?',
    subtitle: 'Tomamos el máximo como guía, no como una obligación.',
    options: [
      { value: 'under20', label: 'Menos de 20 €', icon: '🪙', max: 20 },
      { value: '20to40', label: '20–40 €', icon: '💶', max: 40 },
      { value: '40to75', label: '40–75 €', icon: '💳', max: 75 },
      { value: '75to150', label: '75–150 €', icon: '🎁', max: 150 },
      { value: 'over150', label: 'Más de 150 €', icon: '💎', max: 250 }
    ]
  },
  {
    id: 'interests',
    kicker: '6 · Sus gustos',
    title: '¿Qué le mueve por dentro?',
    subtitle: 'Elige el gusto que más le representa.',
    options: [
      { value: 'tech', label: 'Tecnología', icon: '📱' },
      { value: 'sport', label: 'Deporte', icon: '🏃' },
      { value: 'food', label: 'Cocina y sabores', icon: '🍜' },
      { value: 'travel', label: 'Viajes', icon: '✈️' },
      { value: 'beauty', label: 'Cuidado personal', icon: '🧴' },
      { value: 'books', label: 'Libros', icon: '📚' },
      { value: 'gaming', label: 'Juegos', icon: '🎮' },
      { value: 'music', label: 'Música', icon: '🎶' },
      { value: 'home', label: 'Casa y calma', icon: '🛋️' },
      { value: 'creative', label: 'Crear cosas', icon: '🎨' }
    ]
  },
  {
    id: 'style',
    kicker: '7 · Estilo',
    title: '¿Qué sensación quieres provocar?',
    subtitle: 'Elige el aire del regalo, incluso si todavía no sabes cuál será.',
    options: [
      { value: 'useful', label: 'Útil', icon: '🧰', detail: 'lo usará de verdad' },
      { value: 'original', label: 'Original', icon: '🚀', detail: 'que no se vea venir' },
      { value: 'emotional', label: 'Emocional', icon: '💛', detail: 'que diga algo' },
      { value: 'fun', label: 'Divertido', icon: '😄', detail: 'para pasarlo bien' },
      { value: 'premium', label: 'Premium', icon: '✨', detail: 'un pequeño lujo' }
    ]
  },
  {
    id: 'country',
    kicker: '8 · Dónde compras',
    title: '¿En qué país estás?',
    subtitle: 'Así abrimos la tienda de Amazon que corresponde.',
    options: [
      { value: 'ES', label: 'España', icon: '🇪🇸' },
      { value: 'US', label: 'Estados Unidos', icon: '🇺🇸' },
      { value: 'GB', label: 'Reino Unido', icon: '🇬🇧' },
      { value: 'DE', label: 'Alemania', icon: '🇩🇪' },
      { value: 'FR', label: 'Francia', icon: '🇫🇷' },
      { value: 'IT', label: 'Italia', icon: '🇮🇹' },
      { value: 'CA', label: 'Canadá', icon: '🇨🇦' }
    ]
  }
];

var GIFT_CATALOG = [
  { id: 'mini-photo-printer', title: 'Mini impresora de recuerdos', category: 'momentos', categoryLabel: 'Momentos', icon: '📸', price: 55, interests: ['tech', 'travel', 'creative'], styles: ['emotional', 'original'], relations: ['partner', 'friend', 'sibling'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'anniversary', 'justbecause'], amazonQuery: 'mini impresora fotos portátil regalo', tags: ['emocional', 'sorpresa'], reason: 'Convierte fotos que viven en el móvil en recuerdos que sí se tocan.', editorialScore: 5 },
  { id: 'coffee-kit', title: 'Ritual de café de especialidad', category: 'sabores', categoryLabel: 'Sabores', icon: '☕', price: 32, interests: ['food', 'home'], styles: ['useful', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'kit café especialidad regalo', tags: ['acogedor', 'práctico'], reason: 'Un pequeño ritual diario se siente más personal que otro objeto olvidado.', editorialScore: 5 },
  { id: 'tea-ritual', title: 'Set para una pausa de té', category: 'sabores', categoryLabel: 'Sabores', icon: '🫖', price: 28, interests: ['food', 'home'], styles: ['emotional', 'useful', 'premium'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'set té regalo infusor taza', tags: ['pausa', 'clásico'], reason: 'Tiene ese equilibrio entre detalle bonito y algo que se usa muchas veces.', editorialScore: 4 },
  { id: 'portable-speaker', title: 'Altavoz para poner banda sonora', category: 'musica', categoryLabel: 'Música', icon: '🔊', price: 42, interests: ['music', 'tech'], styles: ['useful', 'fun', 'original'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'altavoz bluetooth portátil buena calidad', tags: ['música', 'planazo'], reason: 'Un regalo útil que además puede convertirse en el centro de cualquier plan.', editorialScore: 5 },
  { id: 'e-reader', title: 'Lector para perderse en historias', category: 'lectura', categoryLabel: 'Lectura', icon: '📖', price: 125, interests: ['books', 'tech', 'travel'], styles: ['useful', 'premium'], relations: ['partner', 'parent', 'friend', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'anniversary'], amazonQuery: 'lector ebook 6 pulgadas luz integrada', tags: ['lectura', 'premium'], reason: 'Hace sitio a una afición que ya existe y acompaña en casa o de viaje.', editorialScore: 4 },
  { id: 'book-light', title: 'Lámpara de lectura de cuello', category: 'lectura', categoryLabel: 'Lectura', icon: '🔦', price: 18, interests: ['books', 'home'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'justbecause'], amazonQuery: 'lámpara lectura cuello recargable regalo', tags: ['menos de 20', 'útil'], reason: 'Un detalle pequeño pero muy afinado para quien siempre está leyendo.', editorialScore: 4 },
  { id: 'botanical-puzzle', title: 'Puzzle de arte para desconectar', category: 'calma', categoryLabel: 'Calma', icon: '🧩', price: 24, interests: ['home', 'creative', 'books'], styles: ['fun', 'emotional', 'original'], relations: ['parent', 'friend', 'partner', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'puzzle arte 1000 piezas adulto bonito', tags: ['desconexión', 'creativo'], reason: 'Propone un rato de calma y concentración, sin exigir otra pantalla.', editorialScore: 4 },
  { id: 'botanical-lego', title: 'Flores que no necesitan agua', category: 'casa', categoryLabel: 'Casa', icon: '🌷', price: 48, interests: ['home', 'creative'], styles: ['original', 'emotional', 'premium'], relations: ['partner', 'friend', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'anniversary', 'christmas', 'justbecause'], amazonQuery: 'set flores decorativas bloques construcción regalo', tags: ['decoración', 'sorpresa'], reason: 'Es una actividad y una pieza decorativa en un solo gesto.', editorialScore: 5 },
  { id: 'couple-board-game', title: 'Juego de mesa para dos', category: 'planes', categoryLabel: 'Planes', icon: '🎲', price: 30, interests: ['gaming', 'home'], styles: ['fun', 'original'], relations: ['partner', 'friend', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'anniversary', 'christmas', 'justbecause'], amazonQuery: 'juego de mesa para dos adultos', tags: ['para compartir', 'divertido'], reason: 'Regala una excusa concreta para pasar tiempo juntos, no solo una caja.', editorialScore: 5 },
  { id: 'travel-organizer', title: 'Organizador de cables de viaje', category: 'viajes', categoryLabel: 'Viajes', icon: '🧳', price: 24, interests: ['travel', 'tech'], styles: ['useful'], relations: ['partner', 'friend', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa', 'christmas'], amazonQuery: 'organizador cables viaje compacto', tags: ['viajes', 'práctico'], reason: 'Soluciona un pequeño caos recurrente y cabe en cualquier equipaje.', editorialScore: 4 },
  { id: 'packing-cubes', title: 'Maleta mejor organizada', category: 'viajes', categoryLabel: 'Viajes', icon: '🧺', price: 27, interests: ['travel', 'home'], styles: ['useful'], relations: ['partner', 'friend', 'parent', 'coworker'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'organizadores maleta packing cubes set', tags: ['orden', 'viajes'], reason: 'Un regalo sensato para esa persona que siempre tiene un viaje en mente.', editorialScore: 3 },
  { id: 'card-holder', title: 'Tarjetero que mejora cada día', category: 'estilo', categoryLabel: 'Estilo', icon: '👝', price: 35, interests: ['home', 'travel'], styles: ['useful', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'tarjetero cuero compacto regalo', tags: ['elegante', 'útil'], reason: 'Un básico bien elegido tiene más recorrido que un regalo que solo luce un día.', editorialScore: 4 },
  { id: 'mechanical-keyboard', title: 'Teclado para trabajar o jugar mejor', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '⌨️', price: 72, interests: ['tech', 'gaming'], styles: ['useful', 'premium'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas'], amazonQuery: 'teclado mecánico compacto retroiluminado', tags: ['setup', 'premium'], reason: 'Es una mejora diaria para un escritorio que ya forma parte de su vida.', editorialScore: 4 },
  { id: 'earbuds', title: 'Auriculares para sus ratos', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🎧', price: 58, interests: ['tech', 'music', 'sport'], styles: ['useful', 'premium'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas'], amazonQuery: 'auriculares bluetooth cancelación de ruido', tags: ['música', 'movilidad'], reason: 'Encaja si escucha música, podcasts o necesita un poco de silencio portátil.', editorialScore: 4 },
  { id: 'usbc-hub', title: 'Hub para tenerlo todo conectado', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔌', price: 34, interests: ['tech', 'gaming'], styles: ['useful'], relations: ['partner', 'friend', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'hub usb c multipuerto hdmi', tags: ['escritorio', 'útil'], reason: 'Un salvavidas de escritorio para quien vive entre portátil, pantalla y accesorios.', editorialScore: 3 },
  { id: 'resistance-bands', title: 'Entrenamiento que cabe en casa', category: 'deporte', categoryLabel: 'Deporte', icon: '💪', price: 22, interests: ['sport'], styles: ['useful'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'bandas elásticas entrenamiento set', tags: ['fitness', 'menos de 40'], reason: 'Suma variedad a su rutina sin ocupar medio salón.', editorialScore: 4 },
  { id: 'yoga-mat', title: 'Esterilla para bajar revoluciones', category: 'deporte', categoryLabel: 'Deporte', icon: '🧘', price: 31, interests: ['sport', 'home'], styles: ['useful', 'emotional'], relations: ['partner', 'friend', 'parent', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'justbecause', 'thankyou'], amazonQuery: 'esterilla yoga antideslizante gruesa', tags: ['bienestar', 'casa'], reason: 'Un regalo que dice: también está bien parar, estirar y cuidarse.', editorialScore: 4 },
  { id: 'running-belt', title: 'Cinturón para salir ligero', category: 'deporte', categoryLabel: 'Deporte', icon: '🏃‍♀️', price: 17, interests: ['sport', 'travel'], styles: ['useful'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'cinturón running móvil llaves', tags: ['menos de 20', 'movimiento'], reason: 'Resuelve el problema de dónde llevar lo esencial cuando sale a moverse.', editorialScore: 3 },
  { id: 'chocolate-box', title: 'Caja de bombones con historia', category: 'sabores', categoryLabel: 'Sabores', icon: '🍫', price: 20, interests: ['food'], styles: ['emotional', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'anniversary'], amazonQuery: 'caja bombones gourmet regalo', tags: ['clásico', 'para compartir'], reason: 'Un clásico funciona mejor cuando tiene una selección cuidada y fácil de compartir.', editorialScore: 3 },
  { id: 'hot-sauce-set', title: 'Ruta de salsas picantes', category: 'sabores', categoryLabel: 'Sabores', icon: '🌶️', price: 26, interests: ['food'], styles: ['fun', 'original'], relations: ['friend', 'sibling', 'partner', 'coworker'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'secret-santa', 'justbecause'], amazonQuery: 'set salsas picantes regalo', tags: ['atrevido', 'divertido'], reason: 'Tiene juego, conversación y una pequeña dosis de reto para la mesa.', editorialScore: 4 },
  { id: 'skincare-set', title: 'Kit de autocuidado sin prisas', category: 'cuidado', categoryLabel: 'Cuidado', icon: '🧴', price: 36, interests: ['beauty', 'home'], styles: ['emotional', 'premium', 'useful'], relations: ['partner', 'parent', 'friend', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'set cuidado facial cuerpo regalo', tags: ['bienestar', 'cuidado'], reason: 'Un recordatorio tangible de reservarse un rato para uno mismo.', editorialScore: 4 },
  { id: 'selfcare-candle', title: 'Vela para cambiar el ambiente', category: 'casa', categoryLabel: 'Casa', icon: '🕯️', price: 25, interests: ['home', 'beauty'], styles: ['emotional', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'vela aromática premium regalo', tags: ['calma', 'hogar'], reason: 'Un detalle sencillo que transforma un momento cotidiano en algo más especial.', editorialScore: 4 },
  { id: 'herb-garden', title: 'Un huerto de cocina en miniatura', category: 'casa', categoryLabel: 'Casa', icon: '🌱', price: 26, interests: ['food', 'home', 'creative'], styles: ['original', 'useful', 'emotional'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'kit huerto urbano hierbas aromáticas', tags: ['verde', 'cocina'], reason: 'Se disfruta al montarlo y también después, cuando empieza a crecer.', editorialScore: 5 },
  { id: 'chef-knife', title: 'Una herramienta para cocinar mejor', category: 'cocina', categoryLabel: 'Cocina', icon: '🔪', price: 62, interests: ['food', 'home'], styles: ['useful', 'premium'], relations: ['parent', 'partner', 'friend', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas'], amazonQuery: 'cuchillo chef acero inoxidable regalo', tags: ['cocina', 'duradero'], reason: 'Para quien disfruta cocinando, una buena herramienta se nota en cada receta.', editorialScore: 4 },
  { id: 'instant-camera', title: 'Cámara para fotos que salen', category: 'momentos', categoryLabel: 'Momentos', icon: '📷', price: 92, interests: ['creative', 'travel', 'music'], styles: ['original', 'emotional', 'fun'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'anniversary', 'christmas'], amazonQuery: 'cámara instantánea fotos regalo', tags: ['recuerdos', 'plan'], reason: 'No solo captura el momento: convierte el plan en parte del regalo.', editorialScore: 5 },
  { id: 'fountain-pen', title: 'Cuaderno y pluma para sus ideas', category: 'creatividad', categoryLabel: 'Creatividad', icon: '✍️', price: 38, interests: ['books', 'creative', 'home'], styles: ['emotional', 'premium', 'useful'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'pluma estilográfica cuaderno regalo', tags: ['analógico', 'elegante'], reason: 'Un conjunto con presencia para escribir, planear o simplemente pensar.', editorialScore: 4 },
  { id: 'watercolor-kit', title: 'Kit para crear sin instrucciones', category: 'creatividad', categoryLabel: 'Creatividad', icon: '🎨', price: 29, interests: ['creative', 'home'], styles: ['original', 'fun', 'emotional'], relations: ['friend', 'sibling', 'partner', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'set acuarelas artísticas adulto regalo', tags: ['creativo', 'sorpresa'], reason: 'Invita a probar algo nuevo sin tener que ser experto.', editorialScore: 4 },
  { id: 'portable-projector', title: 'Cine improvisado en cualquier pared', category: 'planes', categoryLabel: 'Planes', icon: '📽️', price: 86, interests: ['tech', 'gaming', 'home', 'music'], styles: ['original', 'fun', 'premium'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'anniversary', 'christmas', 'justbecause'], amazonQuery: 'mini proyector portátil para cine en casa', tags: ['planazo', 'sorpresa'], reason: 'Eleva una tarde normal a plan especial con muy poco montaje.', editorialScore: 5 },
  { id: 'massage-gun', title: 'Recuperación después de moverse', category: 'bienestar', categoryLabel: 'Bienestar', icon: '⚡', price: 94, interests: ['sport', 'home'], styles: ['useful', 'premium'], relations: ['partner', 'friend', 'sibling', 'parent'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'pistola masaje muscular silenciosa', tags: ['recuperación', 'bienestar'], reason: 'Un extra de cuidado para quien entrena, trabaja mucho o acumula tensión.', editorialScore: 3 },
  { id: 'digital-luggage-scale', title: 'La báscula que evita sustos', category: 'viajes', categoryLabel: 'Viajes', icon: '⚖️', price: 15, interests: ['travel'], styles: ['useful', 'fun'], relations: ['friend', 'partner', 'parent', 'coworker'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'báscula equipaje digital pequeña', tags: ['menos de 20', 'viajes'], reason: 'Una idea útil y ligeramente inesperada para cualquier viajero frecuente.', editorialScore: 5 },
  { id: 'digital-photo-frame', title: 'Fotos que cambian solas', category: 'momentos', categoryLabel: 'Momentos', icon: '🖼️', price: 78, interests: ['tech', 'home', 'creative'], styles: ['emotional', 'premium'], relations: ['parent', 'partner', 'friend', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'anniversary', 'christmas'], amazonQuery: 'marco digital fotos wifi regalo', tags: ['familia', 'emocional'], reason: 'Mantiene presentes muchos recuerdos, no solo la foto que se elige el día uno.', editorialScore: 4 },
  { id: 'urban-backpack', title: 'Mochila para su día a día', category: 'estilo', categoryLabel: 'Estilo', icon: '🎒', price: 68, interests: ['travel', 'tech', 'home'], styles: ['useful', 'premium'], relations: ['partner', 'friend', 'sibling', 'coworker', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas'], amazonQuery: 'mochila urbana resistente portátil portátil', tags: ['diario', 'viajes'], reason: 'Un objeto de uso frecuente que puede mejorar trabajo, estudios y escapadas.', editorialScore: 3 },
  { id: 'powerbank', title: 'Batería para no quedarse a cero', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔋', price: 29, interests: ['tech', 'travel', 'gaming'], styles: ['useful'], relations: ['friend', 'partner', 'sibling', 'coworker', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'batería externa powerbank carga rápida', tags: ['salvavidas', 'útil'], reason: 'Práctico, fácil de acertar y especialmente útil para quien está siempre fuera.', editorialScore: 3 },

  {
    "id": "date-night-box",
    "title": "Caja para una cita en casa",
    "category": "planes",
    "categoryLabel": "Planes",
    "icon": "🍿",
    "price": 35,
    "interests": [
      "food",
      "home"
    ],
    "styles": [
      "emotional",
      "fun",
      "original"
    ],
    "relations": [
      "partner",
      "friend"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "caja noche cita en casa regalo",
    "tags": [
      "para compartir",
      "planazo"
    ],
    "reason": "Convierte una tarde normal en un plan fácil de preparar y compartir.",
    "editorialScore": 4
  },
  {
    "id": "movie-night-kit",
    "title": "Kit de cine en casa",
    "category": "planes",
    "categoryLabel": "Planes",
    "icon": "🎬",
    "price": 29,
    "interests": [
      "home",
      "food"
    ],
    "styles": [
      "fun",
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "kit cine en casa palomitas regalo",
    "tags": [
      "película",
      "acogedor"
    ],
    "reason": "Una excusa sencilla para apagar el móvil y montar una sesión de película.",
    "editorialScore": 4
  },
  {
    "id": "picnic-set",
    "title": "Set para improvisar un picnic",
    "category": "planes",
    "categoryLabel": "Planes",
    "icon": "🧺",
    "price": 38,
    "interests": [
      "travel",
      "food",
      "home"
    ],
    "styles": [
      "emotional",
      "original",
      "useful"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "set picnic portátil manta cesta regalo",
    "tags": [
      "aire libre",
      "compartir"
    ],
    "reason": "Hace que cualquier parque o escapada tenga pinta de plan pensado.",
    "editorialScore": 4
  },
  {
    "id": "cocktail-kit",
    "title": "Kit para preparar cócteles",
    "category": "sabores",
    "categoryLabel": "Sabores",
    "icon": "🍸",
    "price": 34,
    "interests": [
      "food",
      "home"
    ],
    "styles": [
      "fun",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "kit coctelería cócteles regalo",
    "tags": [
      "sabor",
      "plan"
    ],
    "reason": "Un regalo participativo para probar recetas y alargar la sobremesa.",
    "editorialScore": 4
  },
  {
    "id": "spice-rack",
    "title": "Colección de especias del mundo",
    "category": "cocina",
    "categoryLabel": "Cocina",
    "icon": "🌶️",
    "price": 26,
    "interests": [
      "food",
      "travel"
    ],
    "styles": [
      "useful",
      "original",
      "premium"
    ],
    "relations": [
      "parent",
      "partner",
      "friend",
      "coworker"
    ],
    "ages": [
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "set especias del mundo regalo cocina",
    "tags": [
      "cocina",
      "sorpresa"
    ],
    "reason": "Aporta variedad a platos cotidianos sin ocupar demasiado espacio.",
    "editorialScore": 4
  },
  {
    "id": "pasta-maker",
    "title": "Kit para hacer pasta fresca",
    "category": "cocina",
    "categoryLabel": "Cocina",
    "icon": "🍝",
    "price": 52,
    "interests": [
      "food",
      "creative",
      "home"
    ],
    "styles": [
      "fun",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "máquina kit hacer pasta fresca regalo",
    "tags": [
      "cocinar",
      "experiencia"
    ],
    "reason": "Regala una actividad que termina en una comida hecha entre todos.",
    "editorialScore": 4
  },
  {
    "id": "wireless-charging-station",
    "title": "Base de carga para tenerlo todo a mano",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "🔋",
    "price": 39,
    "interests": [
      "tech",
      "home"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "estación carga inalámbrica móvil reloj auriculares",
    "tags": [
      "orden",
      "setup"
    ],
    "reason": "Reduce cables y deja los dispositivos listos para el día siguiente.",
    "editorialScore": 4
  },
  {
    "id": "smart-speaker",
    "title": "Altavoz inteligente para la casa",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "🏠",
    "price": 49,
    "interests": [
      "tech",
      "music",
      "home"
    ],
    "styles": [
      "useful",
      "fun"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "altavoz inteligente asistente voz",
    "tags": [
      "casa",
      "música"
    ],
    "reason": "Une música, temporizadores y pequeños automatismos en un objeto cotidiano.",
    "editorialScore": 4
  },
  {
    "id": "monitor-light-bar",
    "title": "Luz para mejorar el escritorio",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "💡",
    "price": 45,
    "interests": [
      "tech",
      "home"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "barra de luz monitor escritorio",
    "tags": [
      "escritorio",
      "útil"
    ],
    "reason": "Un cambio pequeño que hace más agradable trabajar, estudiar o jugar.",
    "editorialScore": 3
  },
  {
    "id": "webcam-light",
    "title": "Luz compacta para videollamadas",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "📹",
    "price": 24,
    "interests": [
      "tech",
      "creative"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "secret-santa"
    ],
    "amazonQuery": "luz webcam videollamadas escritorio",
    "tags": [
      "menos de 30",
      "práctico"
    ],
    "reason": "Un accesorio útil para quien vive entre reuniones, clases o directos.",
    "editorialScore": 3
  },
  {
    "id": "card-game",
    "title": "Juego de cartas para sacar conversación",
    "category": "juegos",
    "categoryLabel": "Juegos",
    "icon": "🃏",
    "price": 17,
    "interests": [
      "gaming",
      "home"
    ],
    "styles": [
      "fun",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "coworker"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause",
      "thankyou"
    ],
    "amazonQuery": "juego cartas conversación adultos regalo",
    "tags": [
      "menos de 20",
      "para compartir"
    ],
    "reason": "Funciona tanto en una sobremesa como en una reunión improvisada.",
    "editorialScore": 4
  },
  {
    "id": "cooperative-board-game",
    "title": "Juego cooperativo para una tarde",
    "category": "juegos",
    "categoryLabel": "Juegos",
    "icon": "🧠",
    "price": 32,
    "interests": [
      "gaming",
      "creative",
      "home"
    ],
    "styles": [
      "fun",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "parent"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "juego de mesa cooperativo adultos",
    "tags": [
      "estrategia",
      "compartir"
    ],
    "reason": "La gracia está en jugar juntos contra el reto, no en competir por todo.",
    "editorialScore": 4
  },
  {
    "id": "gaming-headset",
    "title": "Auriculares para su setup",
    "category": "juegos",
    "categoryLabel": "Juegos",
    "icon": "🎮",
    "price": 62,
    "interests": [
      "gaming",
      "tech",
      "music"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "auriculares gaming micrófono cómodo",
    "tags": [
      "setup",
      "gaming"
    ],
    "reason": "Mejora cada partida y también sirve para música, llamadas o concentración.",
    "editorialScore": 4
  },
  {
    "id": "foam-roller",
    "title": "Kit de recuperación después de entrenar",
    "category": "bienestar",
    "categoryLabel": "Bienestar",
    "icon": "🧘",
    "price": 25,
    "interests": [
      "sport",
      "home"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "justbecause"
    ],
    "amazonQuery": "rodillo masaje recuperación muscular set",
    "tags": [
      "bienestar",
      "útil"
    ],
    "reason": "Un detalle práctico para cuidar el cuerpo sin convertirlo en una promesa imposible.",
    "editorialScore": 3
  },
  {
    "id": "hiking-bottle",
    "title": "Botella resistente para sus rutas",
    "category": "deporte",
    "categoryLabel": "Deporte",
    "icon": "🥤",
    "price": 28,
    "interests": [
      "sport",
      "travel"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "botella térmica deporte senderismo",
    "tags": [
      "aire libre",
      "útil"
    ],
    "reason": "Acompaña entrenamientos, excursiones y días largos fuera de casa.",
    "editorialScore": 4
  },
  {
    "id": "fitness-tracker",
    "title": "Pulsera para moverse más",
    "category": "deporte",
    "categoryLabel": "Deporte",
    "icon": "⌚",
    "price": 58,
    "interests": [
      "sport",
      "tech"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "pulsera actividad fitness reloj deportivo",
    "tags": [
      "movimiento",
      "tech"
    ],
    "reason": "Tiene sentido para quien disfruta viendo sus hábitos y sus avances.",
    "editorialScore": 3
  },
  {
    "id": "hiking-headlamp",
    "title": "Linterna frontal para escapadas",
    "category": "deporte",
    "categoryLabel": "Deporte",
    "icon": "🔦",
    "price": 22,
    "interests": [
      "sport",
      "travel"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "linterna frontal recargable senderismo",
    "tags": [
      "aventura",
      "menos de 30"
    ],
    "reason": "Un accesorio inesperado que se vuelve imprescindible cuando hace falta.",
    "editorialScore": 3
  },
  {
    "id": "toiletry-bag",
    "title": "Neceser bien organizado",
    "category": "viajes",
    "categoryLabel": "Viajes",
    "icon": "🧴",
    "price": 23,
    "interests": [
      "travel",
      "home"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "parent",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "neceser viaje compartimentos regalo",
    "tags": [
      "viajes",
      "orden"
    ],
    "reason": "Resuelve el clásico caos de los líquidos y cabe en la próxima escapada.",
    "editorialScore": 4
  },
  {
    "id": "passport-wallet",
    "title": "Cartera para viajar ligero",
    "category": "viajes",
    "categoryLabel": "Viajes",
    "icon": "🛂",
    "price": 31,
    "interests": [
      "travel"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "parent",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "thankyou"
    ],
    "amazonQuery": "cartera pasaporte documentos viaje",
    "tags": [
      "viajes",
      "elegante"
    ],
    "reason": "Un básico compacto para proteger documentos y tenerlos localizados.",
    "editorialScore": 3
  },
  {
    "id": "weekend-bag",
    "title": "Bolsa para una escapada de fin de semana",
    "category": "viajes",
    "categoryLabel": "Viajes",
    "icon": "👜",
    "price": 54,
    "interests": [
      "travel",
      "home"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "parent"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "anniversary"
    ],
    "amazonQuery": "bolsa viaje fin de semana compartimentos",
    "tags": [
      "escapada",
      "práctico"
    ],
    "reason": "Invita a usarla pronto: una noche fuera, una visita o una pequeña aventura.",
    "editorialScore": 4
  },
  {
    "id": "travel-pillow",
    "title": "Almohada cómoda para moverse",
    "category": "viajes",
    "categoryLabel": "Viajes",
    "icon": "✈️",
    "price": 26,
    "interests": [
      "travel",
      "home"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "parent",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "almohada viaje ergonómica cuello",
    "tags": [
      "viajes",
      "confort"
    ],
    "reason": "Mejora trayectos largos y se guarda sin ocupar media maleta.",
    "editorialScore": 3
  },
  {
    "id": "photo-album",
    "title": "Álbum para ordenar recuerdos",
    "category": "momentos",
    "categoryLabel": "Momentos",
    "icon": "📷",
    "price": 21,
    "interests": [
      "creative",
      "travel"
    ],
    "styles": [
      "emotional",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "christmas"
    ],
    "amazonQuery": "álbum fotos bonito regalo recuerdos",
    "tags": [
      "emocional",
      "menos de 30"
    ],
    "reason": "Ayuda a sacar las fotos del móvil y convertirlas en una historia compartida.",
    "editorialScore": 5
  },
  {
    "id": "custom-map-print",
    "title": "Mapa de un lugar importante",
    "category": "momentos",
    "categoryLabel": "Momentos",
    "icon": "🗺️",
    "price": 36,
    "interests": [
      "travel",
      "creative"
    ],
    "styles": [
      "emotional",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "mapa personalizado ciudad lugar especial lámina",
    "tags": [
      "personalizado",
      "recuerdo"
    ],
    "reason": "Un sitio concreto puede contar mucho más que un objeto genérico.",
    "editorialScore": 5
  },
  {
    "id": "photo-light-box",
    "title": "Caja de luz con una foto especial",
    "category": "momentos",
    "categoryLabel": "Momentos",
    "icon": "✨",
    "price": 44,
    "interests": [
      "creative",
      "home",
      "travel"
    ],
    "styles": [
      "emotional",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "parent",
      "friend"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "christmas"
    ],
    "amazonQuery": "caja luz foto personalizada regalo",
    "tags": [
      "personalizado",
      "decoración"
    ],
    "reason": "Da una presencia nueva a una imagen que ya tiene un significado propio.",
    "editorialScore": 4
  },
  {
    "id": "memory-journal",
    "title": "Diario para llenar de historias",
    "category": "momentos",
    "categoryLabel": "Momentos",
    "icon": "📔",
    "price": 19,
    "interests": [
      "creative",
      "books"
    ],
    "styles": [
      "emotional",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "diario recuerdos preguntas pareja regalo",
    "tags": [
      "emocional",
      "menos de 20"
    ],
    "reason": "Propone escribir, recordar y dejar espacio para lo que todavía está por vivir.",
    "editorialScore": 4
  },
  {
    "id": "calligraphy-kit",
    "title": "Kit de lettering para empezar",
    "category": "creatividad",
    "categoryLabel": "Creatividad",
    "icon": "✒️",
    "price": 27,
    "interests": [
      "creative",
      "books"
    ],
    "styles": [
      "fun",
      "original",
      "useful"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "kit lettering caligrafía creativa regalo",
    "tags": [
      "crear",
      "hobby"
    ],
    "reason": "Un hobby amable para probar algo nuevo sin necesitar experiencia previa.",
    "editorialScore": 4
  },
  {
    "id": "model-building-kit",
    "title": "Maqueta para construir a su ritmo",
    "category": "creatividad",
    "categoryLabel": "Creatividad",
    "icon": "🛠️",
    "price": 34,
    "interests": [
      "creative",
      "home"
    ],
    "styles": [
      "fun",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "maqueta construcción hobby adulto regalo",
    "tags": [
      "concentración",
      "hobby"
    ],
    "reason": "Regala unas horas de concentración y una pieza de la que sentirse orgulloso.",
    "editorialScore": 4
  },
  {
    "id": "bath-salts-set",
    "title": "Set de baño para bajar revoluciones",
    "category": "bienestar",
    "categoryLabel": "Bienestar",
    "icon": "🛁",
    "price": 24,
    "interests": [
      "home",
      "creative"
    ],
    "styles": [
      "emotional",
      "premium"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "set sales baño relajante regalo",
    "tags": [
      "autocuidado",
      "pausa"
    ],
    "reason": "Un detalle pequeño para convertir un rato normal en una pausa de verdad.",
    "editorialScore": 4
  },
  {
    "id": "sleep-mask",
    "title": "Antifaz y pequeño ritual de descanso",
    "category": "bienestar",
    "categoryLabel": "Bienestar",
    "icon": "😴",
    "price": 18,
    "interests": [
      "home"
    ],
    "styles": [
      "useful",
      "emotional"
    ],
    "relations": [
      "partner",
      "friend",
      "parent",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "secret-santa"
    ],
    "amazonQuery": "antifaz dormir seda regalo descanso",
    "tags": [
      "menos de 20",
      "descanso"
    ],
    "reason": "Sencillo, útil y fácil de acertar para alguien que necesita desconectar.",
    "editorialScore": 3
  },
  {
    "id": "standing-mirror",
    "title": "Espejo de sobremesa con estilo",
    "category": "estilo",
    "categoryLabel": "Estilo",
    "icon": "🪞",
    "price": 33,
    "interests": [
      "home",
      "creative"
    ],
    "styles": [
      "useful",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "parent"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "espejo sobremesa diseño regalo",
    "tags": [
      "estilo",
      "casa"
    ],
    "reason": "Añade un punto bonito a la rutina sin exigir conocer tallas ni gustos exactos.",
    "editorialScore": 3
  },
  {
    "id": "room-diffuser",
    "title": "Difusor para cambiar el ambiente",
    "category": "casa",
    "categoryLabel": "Casa",
    "icon": "🌿",
    "price": 31,
    "interests": [
      "home"
    ],
    "styles": [
      "emotional",
      "premium",
      "useful"
    ],
    "relations": [
      "partner",
      "parent",
      "friend"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "difusor aromas aceites esenciales regalo",
    "tags": [
      "ambiente",
      "acogedor"
    ],
    "reason": "Una forma suave de hacer más personal un rincón de casa.",
    "editorialScore": 4
  },
  {
    "id": "cozy-blanket",
    "title": "Manta suave para sus ratos de sofá",
    "category": "casa",
    "categoryLabel": "Casa",
    "icon": "🧶",
    "price": 37,
    "interests": [
      "home"
    ],
    "styles": [
      "emotional",
      "useful"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "anniversary"
    ],
    "amazonQuery": "manta suave sofá regalo acogedor",
    "tags": [
      "acogedor",
      "casa"
    ],
    "reason": "Un regalo sencillo que se disfruta muchas veces y admite cualquier plan.",
    "editorialScore": 4
  },
  {
    "id": "desk-organizer",
    "title": "Organizador de escritorio bonito",
    "category": "escritorio",
    "categoryLabel": "Escritorio",
    "icon": "🗂️",
    "price": 29,
    "interests": [
      "home",
      "tech",
      "creative"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "secret-santa"
    ],
    "amazonQuery": "organizador escritorio diseño cables accesorios",
    "tags": [
      "orden",
      "setup"
    ],
    "reason": "Mejora un espacio de uso diario sin convertirse en otro trasto.",
    "editorialScore": 4
  },
  {
    "id": "cookbook",
    "title": "Libro de recetas para abrir apetito",
    "category": "lectura",
    "categoryLabel": "Lectura",
    "icon": "📚",
    "price": 24,
    "interests": [
      "books",
      "food"
    ],
    "styles": [
      "emotional",
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "thankyou"
    ],
    "amazonQuery": "libro recetas cocina regalo",
    "tags": [
      "lectura",
      "cocina"
    ],
    "reason": "Puede inspirar planes, conversaciones y una receta para estrenar el regalo.",
    "editorialScore": 4
  },
  {
    "id": "bookstand",
    "title": "Atril para leer o cocinar",
    "category": "lectura",
    "categoryLabel": "Lectura",
    "icon": "📖",
    "price": 27,
    "interests": [
      "books",
      "food",
      "home"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "parent",
      "partner",
      "friend",
      "coworker"
    ],
    "ages": [
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "atril libro cocina lectura madera regalo",
    "tags": [
      "útil",
      "casa"
    ],
    "reason": "Una mejora discreta para dos aficiones que suelen convivir muy bien.",
    "editorialScore": 3
  },
  {
    "id": "vinyl-record",
    "title": "Un vinilo para escuchar con calma",
    "category": "musica",
    "categoryLabel": "Música",
    "icon": "💿",
    "price": 28,
    "interests": [
      "music",
      "home"
    ],
    "styles": [
      "emotional",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "christmas"
    ],
    "amazonQuery": "vinilo álbum música regalo",
    "tags": [
      "música",
      "nostalgia"
    ],
    "reason": "Elegir un disco concreto hace que el detalle se sienta pensado y personal.",
    "editorialScore": 4
  },
  {
    "id": "midi-keyboard",
    "title": "Teclado para jugar con la música",
    "category": "musica",
    "categoryLabel": "Música",
    "icon": "🎹",
    "price": 69,
    "interests": [
      "music",
      "creative",
      "tech"
    ],
    "styles": [
      "fun",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "teclado midi compacto principiante",
    "tags": [
      "crear",
      "música"
    ],
    "reason": "Una puerta de entrada a tocar, producir y trastear sin complicarse.",
    "editorialScore": 3
  },
  {
    "id": "noise-cancelling-headphones",
    "title": "Auriculares para aislarse un rato",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "🎧",
    "price": 89,
    "interests": [
      "tech",
      "music",
      "travel"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "auriculares cancelación ruido inalámbricos",
    "tags": [
      "silencio",
      "premium"
    ],
    "reason": "Sirven para viajar, concentrarse o escuchar lo que le gusta con más calma.",
    "editorialScore": 4
  },
  {
    "id": "instant-film-pack",
    "title": "Pack de película instantánea",
    "category": "momentos",
    "categoryLabel": "Momentos",
    "icon": "📸",
    "price": 23,
    "interests": [
      "creative",
      "travel"
    ],
    "styles": [
      "fun",
      "emotional",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "anniversary",
      "justbecause"
    ],
    "amazonQuery": "película instantánea pack fotos",
    "tags": [
      "fotos",
      "menos de 30"
    ],
    "reason": "Un consumible que invita a usar la cámara y llenar el álbum de planes nuevos.",
    "editorialScore": 4
  },
  {
    "id": "smartwatch",
    "title": "Reloj para el día a día",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "⌚",
    "price": 119,
    "interests": [
      "tech",
      "sport"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "reloj inteligente smartwatch actividad",
    "tags": [
      "tech",
      "premium"
    ],
    "reason": "Combina notificaciones, movimiento y pequeñas ayudas que se usan a diario.",
    "editorialScore": 3
  },
  {
    "id": "coffee-grinder",
    "title": "Molinillo para mejorar el café",
    "category": "sabores",
    "categoryLabel": "Sabores",
    "icon": "⚙️",
    "price": 46,
    "interests": [
      "food",
      "home"
    ],
    "styles": [
      "useful",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "coworker"
    ],
    "ages": [
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "thankyou"
    ],
    "amazonQuery": "molinillo café manual o eléctrico regalo",
    "tags": [
      "café",
      "ritual"
    ],
    "reason": "Para quien ya disfruta del café, mejorar una parte del ritual se nota.",
    "editorialScore": 4
  },
  {
    "id": "cast-iron-pot",
    "title": "Cacerola para cocinar a fuego lento",
    "category": "cocina",
    "categoryLabel": "Cocina",
    "icon": "🍲",
    "price": 58,
    "interests": [
      "food",
      "home"
    ],
    "styles": [
      "useful",
      "premium"
    ],
    "relations": [
      "partner",
      "parent",
      "friend"
    ],
    "ages": [
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "thankyou"
    ],
    "amazonQuery": "cacerola hierro fundido cocina regalo",
    "tags": [
      "cocina",
      "duradero"
    ],
    "reason": "Un objeto duradero que acaba asociado a muchas comidas compartidas.",
    "editorialScore": 3
  },
  {
    "id": "digital-notebook",
    "title": "Cuaderno digital para escribir y organizarse",
    "category": "tecnologia",
    "categoryLabel": "Tecnología",
    "icon": "📝",
    "price": 99,
    "interests": [
      "tech",
      "creative",
      "books"
    ],
    "styles": [
      "useful",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "cuaderno digital notas escritura",
    "tags": [
      "organización",
      "tech"
    ],
    "reason": "Mezcla la sensación de escribir a mano con la comodidad de tenerlo todo ordenado.",
    "editorialScore": 3
  },
  {
    "id": "portable-mic",
    "title": "Micrófono para crear contenido o cantar",
    "category": "musica",
    "categoryLabel": "Música",
    "icon": "🎙️",
    "price": 64,
    "interests": [
      "music",
      "creative",
      "tech"
    ],
    "styles": [
      "fun",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "micrófono usb podcast cantar grabar",
    "tags": [
      "crear",
      "música"
    ],
    "reason": "Tiene recorrido para podcasts, videollamadas, karaoke o primeras grabaciones.",
    "editorialScore": 3
  },
  {
    "id": "lego-architecture",
    "title": "Construcción de arquitectura para exponer",
    "category": "creatividad",
    "categoryLabel": "Creatividad",
    "icon": "🏛️",
    "price": 52,
    "interests": [
      "creative",
      "home",
      "travel"
    ],
    "styles": [
      "fun",
      "original",
      "premium"
    ],
    "relations": [
      "partner",
      "friend",
      "sibling",
      "child"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult"
    ],
    "occasions": [
      "birthday",
      "christmas"
    ],
    "amazonQuery": "set construcción arquitectura decoración",
    "tags": [
      "construir",
      "decoración"
    ],
    "reason": "Combina el placer de construir con una pieza que luego puede quedarse a la vista.",
    "editorialScore": 4
  },
  {
    "id": "backgammon-set",
    "title": "Backgammon para tardes largas",
    "category": "juegos",
    "categoryLabel": "Juegos",
    "icon": "🎲",
    "price": 41,
    "interests": [
      "gaming",
      "home",
      "travel"
    ],
    "styles": [
      "fun",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "anniversary"
    ],
    "amazonQuery": "backgammon madera juego mesa regalo",
    "tags": [
      "clásico",
      "compartir"
    ],
    "reason": "Un clásico con presencia que funciona en casa y también en una escapada.",
    "editorialScore": 4
  },
  {
    "id": "spa-headband-set",
    "title": "Set de autocuidado para desconectar",
    "category": "bienestar",
    "categoryLabel": "Bienestar",
    "icon": "🧖",
    "price": 22,
    "interests": [
      "home",
      "creative"
    ],
    "styles": [
      "emotional",
      "useful"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "coworker"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "christmas"
    ],
    "amazonQuery": "set spa autocuidado diadema regalo",
    "tags": [
      "pausa",
      "menos de 30"
    ],
    "reason": "Un gesto de cuidado fácil de disfrutar sin pedir demasiadas explicaciones.",
    "editorialScore": 3
  },
  {
    "id": "tea-subscription",
    "title": "Selección de tés para descubrir",
    "category": "sabores",
    "categoryLabel": "Sabores",
    "icon": "🍵",
    "price": 39,
    "interests": [
      "food",
      "home"
    ],
    "styles": [
      "emotional",
      "premium",
      "original"
    ],
    "relations": [
      "partner",
      "parent",
      "friend",
      "coworker"
    ],
    "ages": [
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "suscripción té regalo selección",
    "tags": [
      "pausa",
      "sabor"
    ],
    "reason": "En vez de un único objeto, propone varios momentos de pausa durante el mes.",
    "editorialScore": 4
  },
  {
    "id": "sauce-making-kit",
    "title": "Kit para preparar salsas caseras",
    "category": "cocina",
    "categoryLabel": "Cocina",
    "icon": "🫙",
    "price": 30,
    "interests": [
      "food",
      "creative"
    ],
    "styles": [
      "fun",
      "original",
      "useful"
    ],
    "relations": [
      "partner",
      "friend",
      "parent",
      "sibling"
    ],
    "ages": [
      "young-adult",
      "adult",
      "midlife",
      "50plus"
    ],
    "occasions": [
      "birthday",
      "christmas",
      "justbecause"
    ],
    "amazonQuery": "kit hacer salsas picantes caseras regalo",
    "tags": [
      "cocina",
      "experiencia"
    ],
    "reason": "Una idea distinta para experimentar y luego compartir el resultado.",
    "editorialScore": 4
  },
  {
    "id": "reusable-cup",
    "title": "Vaso reutilizable para sus mañanas",
    "category": "viajes",
    "categoryLabel": "Viajes",
    "icon": "🥤",
    "price": 20,
    "interests": [
      "travel",
      "home"
    ],
    "styles": [
      "useful",
      "original"
    ],
    "relations": [
      "partner",
      "friend",
      "coworker",
      "sibling"
    ],
    "ages": [
      "teen",
      "young-adult",
      "adult",
      "midlife"
    ],
    "occasions": [
      "birthday",
      "thankyou",
      "secret-santa"
    ],
    "amazonQuery": "vaso térmico reutilizable café",
    "tags": [
      "menos de 30",
      "rutina"
    ],
    "reason": "Un regalo pequeño que puede acompañar todos los días y fuera de casa.",
    "editorialScore": 3
  }
,
  { id: 'personalized-keychain', title: 'Llavero personalizado para llevar un recuerdo', category: 'detalles', categoryLabel: 'Detalles', icon: '🔑', price: 16, interests: ['home', 'creative'], styles: ['emotional', 'useful'], relations: ['partner', 'parent', 'friend', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'anniversary', 'thankyou', 'secret-santa', 'justbecause'], amazonQuery: 'llavero personalizado nombre regalo', tags: ['menos de 20', 'personal'], reason: 'Un detalle pequeño que gana significado cuando lleva una referencia vuestra.', editorialScore: 4 },
  { id: 'couples-question-cards', title: 'Cartas de preguntas para dos', category: 'planes', categoryLabel: 'Planes', icon: '💬', price: 18, interests: ['home', 'gaming', 'creative'], styles: ['emotional', 'fun', 'original'], relations: ['partner'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'anniversary', 'justbecause'], amazonQuery: 'juego cartas preguntas pareja', tags: ['menos de 20', 'para compartir'], reason: 'Abre conversaciones distintas y convierte una noche normal en un rato de conexión.', editorialScore: 5 },
  { id: 'memory-box', title: 'Caja para guardar pequeños recuerdos', category: 'momentos', categoryLabel: 'Momentos', icon: '📦', price: 29, interests: ['creative', 'home'], styles: ['emotional', 'original'], relations: ['partner', 'parent', 'friend', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'anniversary', 'christmas', 'justbecause'], amazonQuery: 'caja recuerdos madera personalizada regalo', tags: ['emocional', 'especial'], reason: 'Da un lugar bonito a entradas, fotos y objetos que cuentan una historia.', editorialScore: 4 },
  { id: 'photo-calendar', title: 'Calendario con fotos para todo el año', category: 'momentos', categoryLabel: 'Momentos', icon: '🗓️', price: 24, interests: ['creative', 'home', 'travel'], styles: ['emotional', 'useful'], relations: ['parent', 'partner', 'friend', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'calendario fotos personalizado regalo', tags: ['familia', 'para todo el año'], reason: 'Hace que un recuerdo vuelva a aparecer cada mes, no solo el día del regalo.', editorialScore: 5 },
  { id: 'experience-scratch-card', title: 'Tarjetas de planes para rascar', category: 'planes', categoryLabel: 'Planes', icon: '🎟️', price: 22, interests: ['travel', 'creative', 'home'], styles: ['original', 'fun', 'emotional'], relations: ['partner', 'friend', 'sibling'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'anniversary', 'justbecause'], amazonQuery: 'tarjetas planes pareja rasca regalo', tags: ['sorpresa', 'planazo'], reason: 'La sorpresa no termina al abrirlo: todavía queda descubrir qué plan toca.', editorialScore: 4 },
  { id: 'portable-espresso-maker', title: 'Café de especialidad para llevar', category: 'sabores', categoryLabel: 'Sabores', icon: '☕', price: 65, interests: ['food', 'travel'], styles: ['useful', 'premium', 'original'], relations: ['partner', 'friend', 'coworker', 'parent'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'cafetera espresso portátil viaje regalo', tags: ['café', 'premium'], reason: 'Lleva un ritual que ya disfruta a la oficina, la escapada o la próxima aventura.', editorialScore: 4 },
  { id: 'milk-frother', title: 'Espumador para mejorar sus cafés', category: 'cocina', categoryLabel: 'Cocina', icon: '🥛', price: 25, interests: ['food', 'home'], styles: ['useful', 'fun'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'espumador leche eléctrico café regalo', tags: ['menos de 30', 'café'], reason: 'Un cambio sencillo para que su café de cada día parezca más especial.', editorialScore: 4 },
  { id: 'pizza-stone', title: 'Piedra para hacer pizza en casa', category: 'cocina', categoryLabel: 'Cocina', icon: '🍕', price: 32, interests: ['food', 'home', 'creative'], styles: ['useful', 'fun', 'original'], relations: ['partner', 'parent', 'friend', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'piedra pizza horno casa regalo', tags: ['cocina', 'para compartir'], reason: 'Convierte una receta conocida en un plan que apetece repetir.', editorialScore: 4 },
  { id: 'baking-kit', title: 'Kit para hornear algo rico', category: 'cocina', categoryLabel: 'Cocina', icon: '🧁', price: 30, interests: ['food', 'creative', 'home'], styles: ['fun', 'useful', 'emotional'], relations: ['parent', 'friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'kit repostería moldes utensilios regalo', tags: ['dulce', 'experiencia'], reason: 'Regala tiempo de cocina y algo rico que se puede compartir al terminar.', editorialScore: 4 },
  { id: 'olive-oil-tasting', title: 'Cata de aceites para la mesa', category: 'sabores', categoryLabel: 'Sabores', icon: '🫒', price: 28, interests: ['food', 'travel'], styles: ['premium', 'original', 'emotional'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'pack cata aceite oliva gourmet regalo', tags: ['gourmet', 'sorpresa'], reason: 'Un regalo comestible con conversación, descubrimiento y un uso muy fácil.', editorialScore: 5 },
  { id: 'smart-tracker-tag', title: 'Localizador para no perder lo importante', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '📍', price: 29, interests: ['tech', 'travel'], styles: ['useful', 'fun'], relations: ['partner', 'friend', 'sibling', 'coworker', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'localizador bluetooth llaves mochila', tags: ['salvavidas', 'útil'], reason: 'Una solución pequeña para llaves, mochila o maleta que se usa muchas veces.', editorialScore: 5 },
  { id: 'wireless-mouse', title: 'Ratón cómodo para su escritorio', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🖱️', price: 24, interests: ['tech', 'gaming'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'ratón inalámbrico ergonómico silencioso', tags: ['menos de 30', 'escritorio'], reason: 'Mejora muchas horas de trabajo, estudio o juego sin llamar demasiado la atención.', editorialScore: 4 },
  { id: 'phone-tripod', title: 'Trípode para grabar sin pedir ayuda', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '📱', price: 31, interests: ['tech', 'creative', 'music', 'travel'], styles: ['useful', 'original', 'fun'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'trípode móvil con mando bluetooth', tags: ['crear', 'versátil'], reason: 'Da autonomía para fotos, vídeos, recetas o videollamadas sin montar un estudio.', editorialScore: 4 },
  { id: 'portable-ssd', title: 'Disco rápido para guardar sus proyectos', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '💾', price: 79, interests: ['tech', 'creative', 'gaming'], styles: ['useful', 'premium'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas'], amazonQuery: 'ssd externo portátil 1tb usb c', tags: ['setup', 'premium'], reason: 'Un extra de espacio útil para fotos, juegos, vídeos o trabajo creativo.', editorialScore: 4 },
  { id: 'smart-plug', title: 'Enchufe inteligente para simplificar la casa', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔌', price: 19, interests: ['tech', 'home'], styles: ['useful', 'fun'], relations: ['parent', 'partner', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'justbecause'], amazonQuery: 'enchufe inteligente wifi compatible alexa', tags: ['menos de 20', 'casa'], reason: 'Añade un pequeño automatismo útil sin convertir la casa en un proyecto.', editorialScore: 4 },
  { id: 'tablet-stand', title: 'Soporte para leer o ver contenido', category: 'escritorio', categoryLabel: 'Escritorio', icon: '📐', price: 23, interests: ['tech', 'home', 'books'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'soporte tablet ajustable escritorio cocina', tags: ['menos de 30', 'comodidad'], reason: 'Libera las manos para una receta, una videollamada o una tarde de lectura.', editorialScore: 4 },
  { id: 'travel-adapter', title: 'Adaptador para viajar con tranquilidad', category: 'viajes', categoryLabel: 'Viajes', icon: '🌍', price: 24, interests: ['travel', 'tech'], styles: ['useful'], relations: ['partner', 'friend', 'coworker', 'sibling', 'parent'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'adaptador universal viaje usb c', tags: ['menos de 30', 'viajes'], reason: 'Evita buscar enchufes y adaptadores en el peor momento de una escapada.', editorialScore: 4 },
  { id: 'travel-journal', title: 'Cuaderno para guardar futuros viajes', category: 'viajes', categoryLabel: 'Viajes', icon: '🗺️', price: 17, interests: ['travel', 'books', 'creative'], styles: ['emotional', 'useful', 'original'], relations: ['partner', 'friend', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'anniversary', 'justbecause'], amazonQuery: 'diario de viaje cuaderno regalo', tags: ['menos de 20', 'aventura'], reason: 'Invita a planear lo que viene y a conservar lo que pase durante el camino.', editorialScore: 4 },
  { id: 'dry-bag', title: 'Bolsa estanca para sus escapadas', category: 'viajes', categoryLabel: 'Viajes', icon: '🌊', price: 26, interests: ['travel', 'sport'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'bolsa estanca impermeable senderismo playa', tags: ['aire libre', 'práctico'], reason: 'Protege lo esencial en playa, montaña, bici o cualquier plan con agua cerca.', editorialScore: 4 },
  { id: 'travel-coffee-mug', title: 'Taza térmica para sus mañanas fuera', category: 'viajes', categoryLabel: 'Viajes', icon: '🥤', price: 22, interests: ['travel', 'food', 'home'], styles: ['useful', 'emotional'], relations: ['partner', 'friend', 'coworker', 'sibling', 'parent'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'taza térmica café viaje antigoteo', tags: ['menos de 30', 'diario'], reason: 'Un objeto cotidiano que acompaña trayectos, oficina y fines de semana.', editorialScore: 4 },
  { id: 'massage-ball', title: 'Bola de masaje para soltar tensión', category: 'bienestar', categoryLabel: 'Bienestar', icon: '🟠', price: 14, interests: ['sport', 'home'], styles: ['useful'], relations: ['partner', 'friend', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'bola masaje miofascial espalda pies', tags: ['menos de 20', 'recuperación'], reason: 'Un detalle económico para aliviar la tensión después de entrenar o trabajar.', editorialScore: 4 },
  { id: 'gym-towel-set', title: 'Toallas ligeras para entrenar', category: 'deporte', categoryLabel: 'Deporte', icon: '🏋️', price: 20, interests: ['sport', 'home'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'set toallas gimnasio deportivas', tags: ['menos de 20', 'fitness'], reason: 'Un básico práctico para su mochila de entrenamiento y fácil de aprovechar.', editorialScore: 3 },
  { id: 'running-socks', title: 'Calcetines técnicos para moverse mejor', category: 'deporte', categoryLabel: 'Deporte', icon: '🧦', price: 18, interests: ['sport'], styles: ['useful', 'fun'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'calcetines running técnicos pack', tags: ['menos de 20', 'útil'], reason: 'Un regalo sencillo y consumible para quien no para de caminar, correr o entrenar.', editorialScore: 4 },
  { id: 'bike-multitool', title: 'Multiherramienta para su bicicleta', category: 'deporte', categoryLabel: 'Deporte', icon: '🚲', price: 34, interests: ['sport', 'travel', 'tech'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'multiherramienta bicicleta kit reparación', tags: ['aventura', 'práctico'], reason: 'Cabe en cualquier salida y da tranquilidad cuando aparece un ajuste inesperado.', editorialScore: 4 },
  { id: 'pickleball-set', title: 'Set para probar un deporte nuevo', category: 'deporte', categoryLabel: 'Deporte', icon: '🏓', price: 39, interests: ['sport', 'fun'], styles: ['fun', 'original', 'useful'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'justbecause', 'christmas'], amazonQuery: 'set pickleball palas pelotas', tags: ['planazo', 'movimiento'], reason: 'Propone una actividad compartida y una excusa concreta para salir de la rutina.', editorialScore: 4 },
  { id: 'hand-care-set', title: 'Set de cuidado para manos', category: 'cuidado', categoryLabel: 'Cuidado', icon: '👐', price: 21, interests: ['beauty', 'home'], styles: ['emotional', 'useful', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'secret-santa'], amazonQuery: 'set crema manos cuidado regalo', tags: ['menos de 30', 'cuidado'], reason: 'Un pequeño lujo diario que funciona especialmente bien como detalle atento.', editorialScore: 4 },
  { id: 'weighted-eye-mask', title: 'Antifaz relajante para desconectar', category: 'bienestar', categoryLabel: 'Bienestar', icon: '😴', price: 28, interests: ['home', 'beauty'], styles: ['emotional', 'useful', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'antifaz peso relajante ojos regalo', tags: ['descanso', 'bienestar'], reason: 'Sugiere una pausa de verdad para alguien que siempre está haciendo cosas.', editorialScore: 4 },
  { id: 'sleep-sound-machine', title: 'Sonido suave para dormir mejor', category: 'bienestar', categoryLabel: 'Bienestar', icon: '🌙', price: 32, interests: ['home', 'tech'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'sibling'], ages: ['child', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'máquina ruido blanco dormir relajación', tags: ['calma', 'casa'], reason: 'Un apoyo discreto para crear un ambiente más tranquilo al final del día.', editorialScore: 4 },
  { id: 'heated-mug', title: 'Base para mantener el café caliente', category: 'casa', categoryLabel: 'Casa', icon: '♨️', price: 42, interests: ['tech', 'home', 'food'], styles: ['useful', 'premium', 'original'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'calentador taza café escritorio', tags: ['escritorio', 'café'], reason: 'Un detalle inesperado para quien siempre deja la taza olvidada mientras hace mil cosas.', editorialScore: 4 },
  { id: 'sunglasses', title: 'Gafas de sol para sus planes al aire libre', category: 'estilo', categoryLabel: 'Estilo', icon: '🕶️', price: 36, interests: ['travel', 'sport'], styles: ['useful', 'premium', 'fun'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'gafas de sol polarizadas deportivas', tags: ['aire libre', 'estilo'], reason: 'Combina algo que se usa mucho con un toque visible de personalidad.', editorialScore: 3 },
  { id: 'leather-belt', title: 'Cinturón que combina con todo', category: 'estilo', categoryLabel: 'Estilo', icon: '👔', price: 28, interests: ['home', 'travel'], styles: ['useful', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'cinturón cuero clásico regalo', tags: ['menos de 30', 'elegante'], reason: 'Un básico bien escogido tiene uso real y no depende de acertar una talla complicada.', editorialScore: 4 },
  { id: 'bookends', title: 'Sujetalibros para ordenar su estantería', category: 'lectura', categoryLabel: 'Lectura', icon: '📚', price: 23, interests: ['books', 'home'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'sujetalibros decorativos originales', tags: ['menos de 30', 'casa'], reason: 'Acompaña una afición que ya tiene y mejora el lugar donde la disfruta.', editorialScore: 4 },
  { id: 'reading-journal', title: 'Diario para apuntar sus lecturas', category: 'lectura', categoryLabel: 'Lectura', icon: '📓', price: 16, interests: ['books', 'creative', 'home'], styles: ['emotional', 'useful', 'original'], relations: ['parent', 'friend', 'partner', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'diario lector registro libros regalo', tags: ['menos de 20', 'lectura'], reason: 'Hace sitio a una afición y convierte cada libro terminado en parte de una colección.', editorialScore: 4 },
  { id: 'embroidery-kit', title: 'Kit de bordado para crear despacio', category: 'creatividad', categoryLabel: 'Creatividad', icon: '🧵', price: 27, interests: ['creative', 'home'], styles: ['original', 'emotional', 'fun'], relations: ['friend', 'sibling', 'partner', 'parent', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'kit bordado principiante regalo', tags: ['manualidades', 'calma'], reason: 'Una actividad táctil y relajada para desconectar de las pantallas.', editorialScore: 4 },
  { id: 'paint-by-numbers', title: 'Lámina para pintar por números', category: 'creatividad', categoryLabel: 'Creatividad', icon: '🖌️', price: 25, interests: ['creative', 'home'], styles: ['fun', 'emotional', 'original'], relations: ['friend', 'partner', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'pintar por números adulto kit regalo', tags: ['creativo', 'desconexión'], reason: 'Ofrece un rato de concentración agradable y un resultado que se puede colgar.', editorialScore: 4 },
  { id: 'record-cleaning-kit', title: 'Kit para cuidar sus vinilos', category: 'musica', categoryLabel: 'Música', icon: '💿', price: 19, interests: ['music', 'home'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'parent', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'kit limpieza discos vinilo', tags: ['menos de 20', 'música'], reason: 'Un accesorio afinado para quien disfruta escuchar sus discos con calma.', editorialScore: 4 },
  { id: 'karaoke-mic', title: 'Micrófono para cantar sin vergüenza', category: 'musica', categoryLabel: 'Música', icon: '🎤', price: 45, interests: ['music', 'tech', 'gaming'], styles: ['fun', 'original'], relations: ['partner', 'friend', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'micrófono karaoke bluetooth altavoz', tags: ['divertido', 'planazo'], reason: 'Es imposible que se quede en un cajón cuando aparece una canción conocida.', editorialScore: 4 },
  { id: 'vinyl-display-frame', title: 'Marco para exponer su disco favorito', category: 'musica', categoryLabel: 'Música', icon: '🖼️', price: 22, interests: ['music', 'home'], styles: ['emotional', 'original', 'useful'], relations: ['partner', 'friend', 'sibling', 'parent'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'marco expositor disco vinilo pared', tags: ['decoración', 'música'], reason: 'Convierte una portada especial en una pieza visible de su espacio.', editorialScore: 4 },
  { id: 'trivia-game', title: 'Juego de preguntas para reírse juntos', category: 'juegos', categoryLabel: 'Juegos', icon: '❓', price: 24, interests: ['gaming', 'home'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling', 'coworker', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'juego preguntas cultura general adultos', tags: ['menos de 30', 'para compartir'], reason: 'Funciona como regalo y como excusa inmediata para estrenarlo en grupo.', editorialScore: 4 },
  { id: 'escape-room-game', title: 'Escape room para resolver en casa', category: 'juegos', categoryLabel: 'Juegos', icon: '🔐', price: 35, interests: ['gaming', 'creative', 'home'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'juego escape room misterio casa', tags: ['reto', 'planazo'], reason: 'Da una misión concreta a la tarde y recompensa pensar en equipo.', editorialScore: 4 },
  { id: 'poker-set', title: 'Maletín de póker para sus noches de juego', category: 'juegos', categoryLabel: 'Juegos', icon: '♠️', price: 32, interests: ['gaming', 'home'], styles: ['fun', 'premium', 'original'], relations: ['friend', 'partner', 'sibling', 'coworker'], ages: ['adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'maletín póker fichas cartas regalo', tags: ['para compartir', 'noche de juego'], reason: 'Monta una partida memorable con poco más que una mesa y buena compañía.', editorialScore: 4 },
  { id: 'plant-watering-kit', title: 'Kit para cuidar sus plantas', category: 'casa', categoryLabel: 'Casa', icon: '🪴', price: 19, interests: ['home', 'creative'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'kit cuidado plantas interior herramientas', tags: ['menos de 20', 'verde'], reason: 'Acierta con la afición de cuidar algo vivo sin regalar otra planta más.', editorialScore: 5 },
  { id: 'bird-feeder', title: 'Comedero para mirar la naturaleza', category: 'casa', categoryLabel: 'Casa', icon: '🐦', price: 26, interests: ['home', 'travel'], styles: ['emotional', 'original', 'useful'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'comedero pájaros jardín ventana', tags: ['naturaleza', 'sorpresa'], reason: 'Añade un pequeño espectáculo diario a una ventana, terraza o jardín.', editorialScore: 4 },
  { id: 'electric-blanket', title: 'Manta eléctrica para tardes de sofá', category: 'casa', categoryLabel: 'Casa', icon: '🔥', price: 58, interests: ['home'], styles: ['emotional', 'useful', 'premium'], relations: ['parent', 'partner', 'friend'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'manta eléctrica sofá calor regulable', tags: ['acogedor', 'bienestar'], reason: 'Un regalo de confort que se entiende en cuanto llega el primer día frío.', editorialScore: 4 },
  { id: 'mini-waffle-maker', title: 'Mini gofrera para desayunos con plan', category: 'cocina', categoryLabel: 'Cocina', icon: '🧇', price: 35, interests: ['food', 'home'], styles: ['fun', 'useful', 'original'], relations: ['partner', 'friend', 'parent', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'mini gofrera eléctrica regalo', tags: ['desayuno', 'para compartir'], reason: 'Un aparato pequeño con una recompensa muy clara: preparar algo rico juntos.', editorialScore: 4 },
  { id: 'beer-tasting-set', title: 'Set para descubrir cervezas', category: 'sabores', categoryLabel: 'Sabores', icon: '🍺', price: 29, interests: ['food', 'travel'], styles: ['fun', 'premium', 'original'], relations: ['friend', 'partner', 'sibling', 'coworker'], ages: ['adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'set degustación cervezas regalo', tags: ['sabor', 'para compartir'], reason: 'Una experiencia sencilla de abrir, probar y comentar sin demasiada ceremonia.', editorialScore: 4 },
  { id: 'scented-hand-cream', title: 'Crema de manos con un aroma especial', category: 'cuidado', categoryLabel: 'Cuidado', icon: '🌸', price: 16, interests: ['beauty', 'home'], styles: ['emotional', 'useful', 'premium'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'secret-santa'], amazonQuery: 'crema manos perfumada regalo', tags: ['menos de 20', 'detalle'], reason: 'Un gesto pequeño y fácil de disfrutar que transmite cuidado sin exagerar.', editorialScore: 4 },
  { id: 'plant-care-tools', title: 'Herramientas bonitas para su rincón verde', category: 'casa', categoryLabel: 'Casa', icon: '🌿', price: 24, interests: ['home', 'creative'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'herramientas jardín interior plantas kit', tags: ['verde', 'práctico'], reason: 'Un complemento útil para quien disfruta ver crecer y cuidar su colección.', editorialScore: 4 },
  { id: 'crossbody-bag', title: 'Bolso cruzado para moverse ligero', category: 'estilo', categoryLabel: 'Estilo', icon: '👜', price: 45, interests: ['travel', 'home'], styles: ['useful', 'premium', 'original'], relations: ['partner', 'friend', 'sibling', 'parent', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas'], amazonQuery: 'bolso bandolera ligero urbano', tags: ['diario', 'estilo'], reason: 'Combina practicidad y personalidad para días de ciudad, viajes o conciertos.', editorialScore: 4 },
  { id: 'mug-warmer', title: 'Calentador de taza para el escritorio', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '☕', price: 34, interests: ['tech', 'home', 'food'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'calentador taza escritorio café usb', tags: ['escritorio', 'útil'], reason: 'Un regalo muy concreto para quien siempre se olvida de su bebida mientras trabaja.', editorialScore: 4 },
  { id: 'tea-infuser', title: 'Infusor bonito para sus pausas', category: 'sabores', categoryLabel: 'Sabores', icon: '🍵', price: 15, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'infusor té acero inoxidable regalo', tags: ['menos de 20', 'pausa'], reason: 'Un detalle asequible que mejora un momento que ya forma parte de su día.', editorialScore: 4 },
  { id: 'hot-chocolate-kit', title: 'Kit para preparar chocolate caliente', category: 'sabores', categoryLabel: 'Sabores', icon: '🍫', price: 18, interests: ['food', 'home'], styles: ['emotional', 'fun'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'kit chocolate caliente regalo', tags: ['menos de 20', 'acogedor'], reason: 'Regala una pausa sencilla, fácil de estrenar y de compartir.', editorialScore: 4 },
  { id: 'coffee-syrup-set', title: 'Set de siropes para variar el café', category: 'sabores', categoryLabel: 'Sabores', icon: '🍯', price: 18, interests: ['food', 'home'], styles: ['fun', 'original'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'set siropes café sabores regalo', tags: ['menos de 20', 'café'], reason: 'Añade juego a un hábito diario sin pedir mucho espacio ni presupuesto.', editorialScore: 4 },
  { id: 'gourmet-snack-box', title: 'Caja de picoteo para compartir', category: 'sabores', categoryLabel: 'Sabores', icon: '🥨', price: 19, interests: ['food', 'travel'], styles: ['emotional', 'fun'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'caja aperitivos gourmet regalo', tags: ['menos de 20', 'para compartir'], reason: 'Un regalo comestible y fácil de disfrutar en cuanto llega.', editorialScore: 4 },
  { id: 'spice-blend-set', title: 'Pequeño set de mezclas de especias', category: 'cocina', categoryLabel: 'Cocina', icon: '🧂', price: 17, interests: ['food', 'travel'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'set mezclas especias cocina regalo', tags: ['menos de 20', 'cocina'], reason: 'Una forma económica de cambiar recetas conocidas con muy poco esfuerzo.', editorialScore: 4 },
  { id: 'kitchen-timer', title: 'Temporizador de cocina con encanto', category: 'cocina', categoryLabel: 'Cocina', icon: '⏲️', price: 12, interests: ['food', 'home', 'tech'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'temporizador cocina magnético regalo', tags: ['menos de 20', 'útil'], reason: 'Un accesorio pequeño que hace más fácil cocinar y también queda bien a la vista.', editorialScore: 3 },
  { id: 'herb-scissors', title: 'Tijeras para hierbas frescas', category: 'cocina', categoryLabel: 'Cocina', icon: '✂️', price: 14, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'tijeras cortar hierbas cocina', tags: ['menos de 20', 'cocina'], reason: 'Un utensilio curioso y realmente práctico para cocinar un poco mejor.', editorialScore: 4 },
  { id: 'cookie-stamp', title: 'Sello para hacer galletas caseras', category: 'cocina', categoryLabel: 'Cocina', icon: '🍪', price: 16, interests: ['food', 'creative'], styles: ['fun', 'original'], relations: ['parent', 'friend', 'partner', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'sello galletas repostería personalizado', tags: ['menos de 20', 'dulce'], reason: 'Convierte una receta sencilla en algo con un toque propio.', editorialScore: 4 },
  { id: 'water-bottle', title: 'Botella ligera para cada día', category: 'deporte', categoryLabel: 'Deporte', icon: '💧', price: 19, interests: ['sport', 'travel', 'home'], styles: ['useful'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'botella agua deportiva ligera sin bpa', tags: ['menos de 20', 'diario'], reason: 'Un básico que acompaña al gimnasio, la oficina o cualquier trayecto.', editorialScore: 4 },
  { id: 'phone-stand', title: 'Soporte para tener el móvil a la vista', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '📱', price: 15, interests: ['tech', 'home'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'justbecause'], amazonQuery: 'soporte móvil sobremesa plegable', tags: ['menos de 20', 'escritorio'], reason: 'Sirve para videollamadas, recetas, música o simplemente dejar el móvil ordenado.', editorialScore: 4 },
  { id: 'cable-pouch', title: 'Estuche pequeño para cables', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🧵', price: 16, interests: ['tech', 'travel'], styles: ['useful'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'estuche organizador cables pequeño viaje', tags: ['menos de 20', 'orden'], reason: 'Evita el nudo de cables que aparece en mochilas, cajones y maletas.', editorialScore: 4 },
  { id: 'screen-cleaning-kit', title: 'Kit para mantener las pantallas limpias', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🧽', price: 13, interests: ['tech', 'home'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'kit limpieza pantalla portátil gafas móvil', tags: ['menos de 20', 'práctico'], reason: 'Un accesorio humilde pero útil para quien vive rodeado de dispositivos.', editorialScore: 3 },
  { id: 'mini-notebook', title: 'Libreta para ideas rápidas', category: 'creatividad', categoryLabel: 'Creatividad', icon: '📝', price: 12, interests: ['creative', 'books', 'home'], styles: ['emotional', 'useful', 'original'], relations: ['friend', 'partner', 'parent', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'justbecause'], amazonQuery: 'libreta pequeña bonita ideas regalo', tags: ['menos de 20', 'analógico'], reason: 'Un lugar sencillo para apuntar planes, ideas o cosas que no quiere olvidar.', editorialScore: 4 },
  { id: 'magnetic-bookmark', title: 'Marcapáginas magnético para sus libros', category: 'lectura', categoryLabel: 'Lectura', icon: '🔖', price: 11, interests: ['books', 'creative'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'marcapáginas magnético bonito regalo', tags: ['menos de 20', 'lectura'], reason: 'Un detalle mínimo pero muy afinado para quien siempre tiene un libro cerca.', editorialScore: 4 },
  { id: 'bookplate-stamp', title: 'Sello para marcar su biblioteca', category: 'lectura', categoryLabel: 'Lectura', icon: '📚', price: 18, interests: ['books', 'creative'], styles: ['emotional', 'original', 'useful'], relations: ['parent', 'friend', 'partner', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'sello ex libris personalizado biblioteca', tags: ['menos de 20', 'personal'], reason: 'Hace que una colección de libros se sienta todavía más suya.', editorialScore: 5 },
  { id: 'mini-puzzle', title: 'Puzzle pequeño para una pausa', category: 'juegos', categoryLabel: 'Juegos', icon: '🧩', price: 15, interests: ['gaming', 'creative', 'home'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'puzzle pequeño adulto regalo', tags: ['menos de 20', 'desconexión'], reason: 'Una idea compacta para entretenerse un rato sin encender otra pantalla.', editorialScore: 4 },
  { id: 'party-card-game', title: 'Juego de cartas para cualquier reunión', category: 'juegos', categoryLabel: 'Juegos', icon: '🎴', price: 19, interests: ['gaming', 'home'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause', 'secret-santa'], amazonQuery: 'juego cartas fiesta adultos regalo', tags: ['menos de 20', 'para compartir'], reason: 'Cabe en cualquier plan y ayuda a que una reunión arranque sin esfuerzo.', editorialScore: 4 },
  { id: 'plant-mister', title: 'Pulverizador para su rincón verde', category: 'casa', categoryLabel: 'Casa', icon: '💦', price: 14, interests: ['home', 'creative'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'coworker', 'sibling'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'justbecause'], amazonQuery: 'pulverizador plantas interior bonito', tags: ['menos de 20', 'verde'], reason: 'Un accesorio sencillo para cuidar plantas sin sumar otra maceta.', editorialScore: 4 },
  { id: 'socks-gift-box', title: 'Pack de calcetines con personalidad', category: 'estilo', categoryLabel: 'Estilo', icon: '🧦', price: 18, interests: ['home', 'travel'], styles: ['useful', 'fun'], relations: ['friend', 'partner', 'parent', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'christmas'], amazonQuery: 'pack calcetines divertidos regalo', tags: ['menos de 20', 'diario'], reason: 'Un básico útil con suficiente personalidad para no parecer un regalo automático.', editorialScore: 4 },
  { id: 'lip-balm-set', title: 'Set de bálsamos para llevar', category: 'cuidado', categoryLabel: 'Cuidado', icon: '💄', price: 15, interests: ['beauty', 'home'], styles: ['useful', 'emotional'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa', 'christmas'], amazonQuery: 'set bálsamos labiales regalo', tags: ['menos de 20', 'cuidado'], reason: 'Un detalle fácil de usar y de llevar que comunica atención sin complicarse.', editorialScore: 4 },
  { id: 'coffee-scoop', title: 'Cuchara medidora para su café', category: 'sabores', categoryLabel: 'Sabores', icon: '🥄', price: 12, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'cuchara medidora café acero regalo', tags: ['menos de 20', 'café'], reason: 'Un accesorio pequeño para hacer más preciso un ritual cotidiano.', editorialScore: 3 },
  { id: 'tea-towel-set', title: 'Paños de cocina con diseño', category: 'cocina', categoryLabel: 'Cocina', icon: '🧺', price: 16, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'paños cocina diseño pack regalo', tags: ['menos de 20', 'casa'], reason: 'Un básico útil con un toque de personalidad para la cocina.', editorialScore: 3 },
  { id: 'bottle-opener', title: 'Abrebotellas para sus sobremesas', category: 'sabores', categoryLabel: 'Sabores', icon: '🍾', price: 15, interests: ['food', 'travel'], styles: ['useful', 'fun'], relations: ['friend', 'partner', 'sibling', 'coworker'], ages: ['adult', 'midlife'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'abrebotellas diseño regalo', tags: ['menos de 20', 'para compartir'], reason: 'Un detalle sencillo que aparece en todos los planes de mesa.', editorialScore: 3 },
  { id: 'silicone-ice-tray', title: 'Molde para hielos originales', category: 'cocina', categoryLabel: 'Cocina', icon: '🧊', price: 14, interests: ['food', 'home'], styles: ['fun', 'original'], relations: ['partner', 'friend', 'sibling', 'coworker'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'molde hielos grandes original regalo', tags: ['menos de 20', 'sorpresa'], reason: 'Cambia una bebida cotidiana con una idea pequeña y fácil de estrenar.', editorialScore: 4 },
  { id: 'mini-cutting-board', title: 'Tabla pequeña para aperitivos', category: 'cocina', categoryLabel: 'Cocina', icon: '🪵', price: 19, interests: ['food', 'home'], styles: ['useful', 'emotional'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'tabla pequeña aperitivos madera regalo', tags: ['menos de 20', 'mesa'], reason: 'Un soporte bonito para convertir un picoteo en un momento pensado.', editorialScore: 4 },
  { id: 'lunch-bag', title: 'Bolsa térmica para llevar la comida', category: 'viajes', categoryLabel: 'Viajes', icon: '🍱', price: 18, interests: ['food', 'travel', 'home'], styles: ['useful'], relations: ['friend', 'partner', 'parent', 'coworker', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'bolsa térmica comida trabajo reutilizable', tags: ['menos de 20', 'diario'], reason: 'Una mejora práctica para oficina, excursiones o días largos fuera.', editorialScore: 4 },
  { id: 'fruit-infuser-bottle', title: 'Botella para dar sabor al agua', category: 'deporte', categoryLabel: 'Deporte', icon: '🍋', price: 18, interests: ['food', 'travel', 'sport'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'botella infusor frutas agua deporte', tags: ['menos de 20', 'movimiento'], reason: 'Hace más fácil llevar una bebida preparada a todas partes.', editorialScore: 3 },
  { id: 'spice-spoon-set', title: 'Cucharas medidoras para cocinar', category: 'cocina', categoryLabel: 'Cocina', icon: '🧂', price: 13, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'cucharas medidoras cocina set', tags: ['menos de 20', 'útil'], reason: 'Un accesorio humilde que se usa de verdad cuando llega la hora de cocinar.', editorialScore: 3 },
  { id: 'pancake-spatula', title: 'Espátula para desayunos especiales', category: 'cocina', categoryLabel: 'Cocina', icon: '🥞', price: 13, interests: ['food', 'home'], styles: ['fun', 'useful'], relations: ['partner', 'friend', 'parent', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'espátula crepes tortitas cocina regalo', tags: ['menos de 20', 'desayuno'], reason: 'Un pequeño recordatorio de que cocinar también puede ser un plan.', editorialScore: 3 },
  { id: 'coffee-clip', title: 'Pinza para conservar mejor el café', category: 'sabores', categoryLabel: 'Sabores', icon: '📎', price: 10, interests: ['food', 'home'], styles: ['useful', 'original'], relations: ['parent', 'partner', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'pinza cierre bolsa café acero', tags: ['menos de 20', 'detalle'], reason: 'Un gesto muy concreto para quien cuida los pequeños detalles de su café.', editorialScore: 3 },
  { id: 'charging-cable-set', title: 'Pack de cables para llevar de todo', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔌', price: 15, interests: ['tech', 'travel'], styles: ['useful'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'pack cables carga usb c lightning viaje', tags: ['menos de 20', 'salvavidas'], reason: 'Una solución barata para el cajón, la mochila o la próxima escapada.', editorialScore: 4 },
  { id: 'phone-grip', title: 'Soporte de dedo para el móvil', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '📱', price: 12, interests: ['tech', 'home'], styles: ['useful', 'fun'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'soporte dedo móvil grip teléfono', tags: ['menos de 20', 'práctico'], reason: 'Mejora el agarre y sirve como apoyo cuando ve vídeos o recetas.', editorialScore: 3 },
  { id: 'usb-desk-lamp', title: 'Luz USB para su rincón de trabajo', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '💡', price: 18, interests: ['tech', 'home', 'creative'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'coworker', 'sibling'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'lámpara usb escritorio flexible', tags: ['menos de 20', 'escritorio'], reason: 'Añade luz justo donde hace falta sin ocupar espacio.', editorialScore: 3 },
  { id: 'webcam-cover', title: 'Tapas para proteger la webcam', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔒', price: 10, interests: ['tech'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'coworker', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'tapa privacidad webcam portátil', tags: ['menos de 20', 'útil'], reason: 'Un detalle pequeño para quien cuida su privacidad digital.', editorialScore: 3 },
  { id: 'keyring-multitool', title: 'Multiherramienta para llevar en las llaves', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🗝️', price: 18, interests: ['tech', 'travel'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'coworker'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'multiherramienta llavero regalo', tags: ['menos de 20', 'salvavidas'], reason: 'Práctica, compacta y con ese punto de objeto curioso que apetece enseñar.', editorialScore: 4 },
  { id: 'luggage-tag', title: 'Etiqueta de maleta con personalidad', category: 'viajes', categoryLabel: 'Viajes', icon: '🏷️', price: 14, interests: ['travel'], styles: ['useful', 'original'], relations: ['partner', 'friend', 'parent', 'coworker', 'sibling'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'etiqueta maleta original regalo', tags: ['menos de 20', 'viajes'], reason: 'Un accesorio sencillo para reconocer el equipaje y viajar con más estilo.', editorialScore: 3 },
  { id: 'travel-cutlery', title: 'Cubiertos reutilizables para llevar', category: 'viajes', categoryLabel: 'Viajes', icon: '🍴', price: 16, interests: ['travel', 'food', 'home'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'coworker', 'sibling'], ages: ['young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'cubiertos reutilizables viaje estuche', tags: ['menos de 20', 'diario'], reason: 'Una idea útil para oficina, viajes y comidas improvisadas.', editorialScore: 3 },
  { id: 'shoe-bag', title: 'Bolsa para guardar las zapatillas', category: 'deporte', categoryLabel: 'Deporte', icon: '👟', price: 14, interests: ['sport', 'travel'], styles: ['useful'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'bolsa zapatillas deporte viaje', tags: ['menos de 20', 'orden'], reason: 'Mantiene la mochila limpia y acompaña cualquier rutina deportiva.', editorialScore: 3 },
  { id: 'resistance-loop', title: 'Mini bandas para entrenar en cualquier sitio', category: 'deporte', categoryLabel: 'Deporte', icon: '🟣', price: 18, interests: ['sport'], styles: ['useful', 'original'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'justbecause', 'thankyou'], amazonQuery: 'mini bandas resistencia glúteos entrenamiento', tags: ['menos de 20', 'fitness'], reason: 'Amplía una rutina sin añadir peso ni ocupar casi espacio.', editorialScore: 4 },
  { id: 'hand-warmer', title: 'Calientamanos para días fríos', category: 'viajes', categoryLabel: 'Viajes', icon: '🧤', price: 16, interests: ['travel', 'sport', 'home'], styles: ['useful', 'fun'], relations: ['friend', 'partner', 'sibling', 'parent'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'calientamanos reutilizable bolsillo', tags: ['menos de 20', 'acogedor'], reason: 'Un detalle inesperado para paseos, viajes, deporte o tardes de invierno.', editorialScore: 4 },
  { id: 'mini-candle-set', title: 'Trío de velas para cambiar el ambiente', category: 'casa', categoryLabel: 'Casa', icon: '🕯️', price: 18, interests: ['home', 'beauty'], styles: ['emotional', 'premium'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas', 'justbecause'], amazonQuery: 'set mini velas aromáticas regalo', tags: ['menos de 20', 'calma'], reason: 'Tres aromas y tres momentos posibles dentro de un mismo detalle.', editorialScore: 4 },
  { id: 'bath-bomb-set', title: 'Bombas de baño para una pausa', category: 'cuidado', categoryLabel: 'Cuidado', icon: '🫧', price: 15, interests: ['beauty', 'home'], styles: ['emotional', 'fun'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'christmas'], amazonQuery: 'bombas baño relajantes set regalo', tags: ['menos de 20', 'autocuidado'], reason: 'Una forma fácil de convertir una noche cualquiera en un rato de descanso.', editorialScore: 4 },
  { id: 'gel-pens', title: 'Set de bolígrafos para escribir bonito', category: 'creatividad', categoryLabel: 'Creatividad', icon: '🖊️', price: 13, interests: ['creative', 'books', 'home'], styles: ['useful', 'fun', 'original'], relations: ['friend', 'partner', 'parent', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'set bolígrafos gel colores regalo', tags: ['menos de 20', 'crear'], reason: 'Un pequeño empujón para apuntar ideas, estudiar o decorar su agenda.', editorialScore: 4 },
  { id: 'bookmark-set', title: 'Pack de marcapáginas para sus lecturas', category: 'lectura', categoryLabel: 'Lectura', icon: '🔖', price: 14, interests: ['books', 'creative'], styles: ['useful', 'original'], relations: ['parent', 'friend', 'partner', 'sibling', 'coworker'], ages: ['teen', 'young-adult', 'adult', 'midlife', '50plus'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'pack marcapáginas originales regalo', tags: ['menos de 20', 'lectura'], reason: 'Un detalle sencillo para una afición que siempre deja sitio a otro libro.', editorialScore: 4 },
  { id: 'dice-set', title: 'Dados bonitos para sus partidas', category: 'juegos', categoryLabel: 'Juegos', icon: '🎲', price: 15, interests: ['gaming', 'creative'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling', 'child'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'set dados poliédricos rol regalo', tags: ['menos de 20', 'juegos'], reason: 'Un accesorio pequeño que da personalidad a cada partida.', editorialScore: 4 },
  { id: 'puzzle-cube', title: 'Cubo para entretener las manos', category: 'juegos', categoryLabel: 'Juegos', icon: '🧊', price: 16, interests: ['gaming', 'creative'], styles: ['fun', 'original'], relations: ['friend', 'partner', 'sibling', 'child', 'coworker'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'cubo rompecabezas velocidad regalo', tags: ['menos de 20', 'reto'], reason: 'Una distracción compacta para viajes, descansos y ratos de concentración.', editorialScore: 4 },
  { id: 'sticker-pack', title: 'Pegatinas para personalizar sus cosas', category: 'creatividad', categoryLabel: 'Creatividad', icon: '🌈', price: 10, interests: ['creative', 'gaming', 'home'], styles: ['fun', 'original'], relations: ['friend', 'sibling', 'child', 'partner'], ages: ['teen', 'young-adult', 'adult'], occasions: ['birthday', 'christmas', 'justbecause'], amazonQuery: 'pack pegatinas decoración portátil agenda', tags: ['menos de 20', 'color'], reason: 'Un regalo pequeño que puede llenar de personalidad una libreta, portátil o botella.', editorialScore: 3 }
,
  {"id":"portable-cutlery-set","title":"Cubiertos reutilizables para llevar","category":"viajes","categoryLabel":"viajes","icon":"🍴","price":12,"interests":["travel","food","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cubiertos reutilizables estuche regalo","tags":["práctico","menos de 20"],"reason":"Un detalle pequeño que acompaña comidas fuera de casa y evita soluciones improvisadas.","editorialScore":3,"titles":{"en":"Reusable cutlery set to go","de":"Wiederverwendbares Besteck für unterwegs","fr":"Couverts réutilisables à emporter","it":"Set di posate riutilizzabili da viaggio"}},
  {"id":"silicone-food-bag","title":"Bolsas de silicona para conservar","category":"hogar","categoryLabel":"hogar","icon":"🥡","price":14,"interests":["food","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"bolsas silicona reutilizables alimentos regalo","tags":["cocina","menos de 20"],"reason":"Hace más fácil guardar, organizar y llevar comida sin llenar la cocina de envoltorios.","editorialScore":3,"titles":{"en":"Reusable silicone food bags","de":"Wiederverwendbare Silikonbeutel für Lebensmittel","fr":"Sacs alimentaires réutilisables en silicone","it":"Sacchetti in silicone riutilizzabili per alimenti"}},
  {"id":"spice-mix-gift-set","title":"Colección de mezclas de especias","category":"sabores","categoryLabel":"sabores","icon":"🌶️","price":16,"interests":["food","home"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set mezclas especias regalo gourmet","tags":["sabores","sorpresa"],"reason":"Una forma fácil de convertir recetas de siempre en algo un poco más especial.","editorialScore":4,"titles":{"en":"Spice blend gift set","de":"Geschenkset mit Gewürzmischungen","fr":"Coffret de mélanges d’épices","it":"Set regalo di miscele di spezie"}},
  {"id":"coffee-scoop-set","title":"Cucharas medidoras para café","category":"sabores","categoryLabel":"sabores","icon":"☕","price":11,"interests":["food","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cucharas medidoras café acero regalo","tags":["café","menos de 20"],"reason":"Un accesorio sencillo para alguien que disfruta cuidando cada paso de su ritual de café.","editorialScore":3,"titles":{"en":"Coffee measuring spoon set","de":"Messlöffel-Set für Kaffee","fr":"Cuillères doseuses pour café","it":"Set di cucchiaini dosatori per caffè"}},
  {"id":"cable-label-kit","title":"Kit para etiquetar cables","category":"tecnología","categoryLabel":"tecnología","icon":"🏷️","price":9,"interests":["tech","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit etiquetas organizar cables escritorio","tags":["orden","menos de 20"],"reason":"Ataca un pequeño caos cotidiano con una solución barata, visible y muy útil.","editorialScore":3,"titles":{"en":"Cable label organization kit","de":"Set zum Beschriften von Kabeln","fr":"Kit d’étiquettes pour câbles","it":"Kit per etichettare e organizzare i cavi"}},
  {"id":"device-care-cleaning-kit","title":"Kit de limpieza para pantallas","category":"tecnología","categoryLabel":"tecnología","icon":"✨","price":10,"interests":["tech","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit limpieza pantalla portátil móvil ordenador","tags":["útil","menos de 20"],"reason":"Un regalo práctico para quien usa portátil, móvil, tablet o consola todos los días.","editorialScore":3,"titles":{"en":"Screen cleaning kit","de":"Reinigungsset für Bildschirme","fr":"Kit de nettoyage pour écrans","it":"Kit pulizia schermi"}},
  {"id":"webcam-cover-set","title":"Pack de tapas para webcam","category":"tecnología","categoryLabel":"tecnología","icon":"🛡️","price":7,"interests":["tech"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tapas privacidad webcam pack","tags":["tecnología","menos de 20"],"reason":"Una mejora pequeña para el portátil que se entiende al instante y no ocupa nada.","editorialScore":3,"titles":{"en":"Webcam privacy cover set","de":"Set Webcam-Abdeckungen zum Schutz der Privatsphäre","fr":"Lot de caches webcam pour la vie privée","it":"Set copri webcam per la privacy"}},
  {"id":"usb-rechargeable-book-light","title":"Luz de lectura recargable","category":"lectura","categoryLabel":"lectura","icon":"🔦","price":15,"interests":["books","tech"],"styles":["useful","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"luz lectura libro recargable flexible regalo","tags":["lectura","menos de 20"],"reason":"Acompaña sus libros sin molestar y convierte cualquier rincón en un lugar para leer.","editorialScore":4,"titles":{"en":"Rechargeable book reading light","de":"Wiederaufladbare Leselampe","fr":"Lampe de lecture rechargeable","it":"Lampada da lettura ricaricabile"}},
  {"id":"phone-grip-stand","title":"Soporte de dedo para el móvil","category":"tecnología","categoryLabel":"tecnología","icon":"📱","price":12,"interests":["tech","travel"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"soporte dedo móvil plegable regalo","tags":["móvil","menos de 20"],"reason":"Hace más cómodo ver, sujetar y apoyar el móvil, especialmente cuando está siempre a mano.","editorialScore":3,"titles":{"en":"Phone grip and stand","de":"Handyhalterung und Fingergriff","fr":"Bague support pour téléphone","it":"Impugnatura e supporto per smartphone"}},
  {"id":"desk-cable-clips","title":"Clips para ordenar el escritorio","category":"tecnología","categoryLabel":"tecnología","icon":"🧷","price":8,"interests":["tech","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"clips organizadores cables escritorio adhesivos","tags":["orden","menos de 20"],"reason":"Un mini regalo que mejora cada día de trabajo, estudio o juego.","editorialScore":3,"titles":{"en":"Desk cable clips","de":"Kabelclips für den Schreibtisch","fr":"Clips pour organiser les câbles du bureau","it":"Clip per organizzare i cavi sulla scrivania"}},
  {"id":"laptop-sticker-set","title":"Pegatinas para personalizar el portátil","category":"creatividad","categoryLabel":"creatividad","icon":"🌈","price":10,"interests":["tech","creative","gaming"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pack pegatinas portátil ordenador diseño","tags":["color","menos de 20"],"reason":"Añade personalidad a algo que usa mucho sin exigir conocer sus gustos al milímetro.","editorialScore":3,"titles":{"en":"Laptop sticker set","de":"Sticker-Set für den Laptop","fr":"Set d’autocollants pour ordinateur portable","it":"Set di adesivi per laptop"}},
  {"id":"smartphone-tripod-mini","title":"Mini trípode para el móvil","category":"tecnología","categoryLabel":"tecnología","icon":"📲","price":18,"interests":["tech","creative","travel"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mini trípode móvil flexible fotos vídeo","tags":["fotos","menos de 20"],"reason":"Sirve para fotos, videollamadas, recetas o vídeos sin convertirse en un aparato complicado.","editorialScore":4,"titles":{"en":"Mini smartphone tripod","de":"Mini-Stativ für das Smartphone","fr":"Mini trépied pour smartphone","it":"Mini treppiede per smartphone"}},
  {"id":"mini-sewing-kit","title":"Kit de costura de emergencia","category":"hogar","categoryLabel":"hogar","icon":"🧵","price":9,"interests":["home","creative"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit costura viaje emergencia compacto","tags":["práctico","menos de 20"],"reason":"El tipo de detalle que parece pequeño hasta que resuelve una urgencia real.","editorialScore":3,"titles":{"en":"Mini emergency sewing kit","de":"Mini-Nähset für unterwegs","fr":"Mini nécessaire de couture de dépannage","it":"Mini kit da cucito di emergenza"}},
  {"id":"watercolor-pocket-set","title":"Acuarelas de bolsillo","category":"creatividad","categoryLabel":"creatividad","icon":"🎨","price":16,"interests":["creative","books","travel"],"styles":["original","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set acuarelas portátil artista principiante regalo","tags":["crear","menos de 20"],"reason":"Invita a parar un rato y crear algo sin preparar un estudio entero.","editorialScore":4,"titles":{"en":"Pocket watercolor painting set","de":"Aquarell-Set im Taschenformat","fr":"Set d’aquarelle de poche","it":"Set acquerelli tascabile"}},
  {"id":"brush-lettering-set","title":"Kit de lettering para empezar","category":"creatividad","categoryLabel":"creatividad","icon":"✍️","price":18,"interests":["creative","books"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit brush lettering iniciación regalo","tags":["creativo","menos de 20"],"reason":"Una puerta de entrada amable a una afición que cabe en un cajón.","editorialScore":4,"titles":{"en":"Brush lettering starter set","de":"Brush-Lettering-Set für Einsteiger","fr":"Kit de brush lettering pour débuter","it":"Kit lettering con pennarelli brush per iniziare"}},
  {"id":"washi-tape-kit","title":"Colección de cintas decorativas","category":"creatividad","categoryLabel":"creatividad","icon":"🪄","price":12,"interests":["creative","home","books"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set washi tape cintas decorativas agenda","tags":["color","menos de 20"],"reason":"Da juego para diarios, regalos, manualidades y cualquier proyecto que pida un toque de color.","editorialScore":3,"titles":{"en":"Decorative washi tape set","de":"Dekoratives Washi-Tape-Set","fr":"Set de masking tape décoratif","it":"Set di washi tape decorativi"}},
  {"id":"craft-cutting-mat-small","title":"Base de corte para manualidades","category":"creatividad","categoryLabel":"creatividad","icon":"📐","price":15,"interests":["creative","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"base corte manualidades tamaño pequeño autocicatrizante","tags":["crear","menos de 20"],"reason":"Mejora cualquier proyecto creativo y protege la mesa desde el primer uso.","editorialScore":3,"titles":{"en":"Small craft cutting mat","de":"Kleine Schneidematte für Bastelarbeiten","fr":"Petit tapis de découpe pour loisirs créatifs","it":"Tappetino da taglio piccolo per lavori creativi"}},
  {"id":"colored-pencils-set","title":"Lápices de colores bonitos","category":"creatividad","categoryLabel":"creatividad","icon":"🖍️","price":14,"interests":["creative","books"],"styles":["fun","emotional"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lápices colores profesionales set regalo","tags":["color","menos de 20"],"reason":"Un clásico que funciona tanto para desconectar como para volver a una afición olvidada.","editorialScore":4,"titles":{"en":"Quality colored pencils set","de":"Hochwertiges Buntstifte-Set","fr":"Set de crayons de couleur de qualité","it":"Set di matite colorate di qualità"}},
  {"id":"bookmark-metal","title":"Marcapáginas metálico especial","category":"lectura","categoryLabel":"lectura","icon":"🔖","price":10,"interests":["books","creative"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"marcapáginas metal bonito regalo lector","tags":["lectura","menos de 20"],"reason":"Un detalle asequible que aparece cada vez que retoma su libro.","editorialScore":4,"titles":{"en":"Decorative metal bookmark","de":"Besonderes Metall-Lesezeichen","fr":"Marque-page en métal décoratif","it":"Segnalibro in metallo decorativo"}},
  {"id":"book-sleeve","title":"Funda protectora para libros","category":"lectura","categoryLabel":"lectura","icon":"📖","price":18,"interests":["books","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"funda libro acolchada lectora viaje","tags":["lectura","menos de 20"],"reason":"Cuida sus lecturas cuando las lleva en la mochila o en la maleta.","editorialScore":3,"titles":{"en":"Protective book sleeve","de":"Schutzhülle für Bücher","fr":"Housse de protection pour livres","it":"Custodia protettiva per libri"}},
  {"id":"reading-notes-journal","title":"Cuaderno para apuntar lecturas","category":"lectura","categoryLabel":"lectura","icon":"📚","price":14,"interests":["books","creative"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"diario de lecturas cuaderno reseñas libros regalo","tags":["lectura","menos de 20"],"reason":"Convierte cada libro en una conversación pendiente y en un recuerdo propio.","editorialScore":4,"titles":{"en":"Reading journal notebook","de":"Lesetagebuch","fr":"Carnet de lecture","it":"Diario di lettura"}},
  {"id":"page-holder-ring","title":"Anillo sujeta páginas","category":"lectura","categoryLabel":"lectura","icon":"💍","price":9,"interests":["books"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"anillo sujeta páginas libro lectura","tags":["curioso","menos de 20"],"reason":"Una idea pequeña y sorprendentemente útil para leer con una sola mano.","editorialScore":3,"titles":{"en":"Book page holder ring","de":"Seitenhalter-Ring für Bücher","fr":"Anneau porte-pages pour livres","it":"Anello fermapagine per libri"}},
  {"id":"bookish-socks","title":"Calcetines para amantes de los libros","category":"lectura","categoryLabel":"lectura","icon":"🧦","price":13,"interests":["books","home"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"calcetines divertidos lector libros regalo","tags":["lectura","menos de 20"],"reason":"Une una afición reconocible con un detalle cotidiano y fácil de regalar.","editorialScore":3,"titles":{"en":"Book lover socks","de":"Socken für Buchliebhaber","fr":"Chaussettes pour amoureux des livres","it":"Calzini per amanti dei libri"}},
  {"id":"pocket-puzzle","title":"Rompecabezas de bolsillo","category":"juegos","categoryLabel":"juegos","icon":"🧩","price":16,"interests":["gaming","creative","books"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"rompecabezas pequeño adulto diseño regalo","tags":["desconexión","menos de 20"],"reason":"Una pausa breve para las manos y la cabeza, sin depender de una pantalla.","editorialScore":3,"titles":{"en":"Pocket-sized puzzle","de":"Puzzle im Taschenformat","fr":"Puzzle de poche","it":"Puzzle tascabile"}},
  {"id":"travel-card-game","title":"Juego de cartas para llevar","category":"juegos","categoryLabel":"juegos","icon":"🃏","price":13,"interests":["gaming","travel"],"styles":["fun","useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego cartas compacto viaje amigos regalo","tags":["juego","menos de 20"],"reason":"Cabe en cualquier mochila y puede rescatar una tarde, una sobremesa o un viaje.","editorialScore":4,"titles":{"en":"Travel card game","de":"Kartenspiel für unterwegs","fr":"Jeu de cartes de voyage","it":"Gioco di carte da viaggio"}},
  {"id":"magnetic-tangram","title":"Tangram magnético","category":"juegos","categoryLabel":"juegos","icon":"🔷","price":15,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tangram magnético rompecabezas regalo","tags":["juego","menos de 20"],"reason":"Un objeto sencillo que entretiene, decora y se presta a retos distintos.","editorialScore":3,"titles":{"en":"Magnetic tangram puzzle","de":"Magnetisches Tangram-Puzzle","fr":"Tangram magnétique","it":"Tangram magnetico"}},
  {"id":"mystery-puzzle-box-mini","title":"Caja de misterio para resolver","category":"juegos","categoryLabel":"juegos","icon":"🔐","price":19,"interests":["gaming","creative"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"caja rompecabezas misterio madera regalo","tags":["sorpresa","menos de 20"],"reason":"Da algo que hacer y una historia que contar, en vez de quedarse en la estantería.","editorialScore":4,"titles":{"en":"Mini mystery puzzle box","de":"Mini-Rätselbox zum Lösen","fr":"Mini boîte à énigmes","it":"Mini scatola rompicapo"}},
  {"id":"party-icebreaker-deck","title":"Juego de cartas para romper el hielo","category":"juegos","categoryLabel":"juegos","icon":"🎉","price":16,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["friend","sibling","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego cartas fiesta preguntas amigos regalo","tags":["risas","menos de 20"],"reason":"Una opción fácil para que el regalo se convierta en un plan compartido.","editorialScore":4,"titles":{"en":"Party icebreaker card game","de":"Party-Kartenspiel zum Kennenlernen","fr":"Jeu de cartes pour briser la glace","it":"Gioco di carte party per rompere il ghiaccio"}},
  {"id":"adult-coloring-book","title":"Libro para colorear y desconectar","category":"creatividad","categoryLabel":"creatividad","icon":"🌿","price":12,"interests":["creative","books","home"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"libro colorear adultos relajación ilustraciones","tags":["calma","menos de 20"],"reason":"Un rato de concentración tranquila para bajar revoluciones sin otra pantalla.","editorialScore":4,"titles":{"en":"Adult coloring book","de":"Malbuch für Erwachsene zum Abschalten","fr":"Livre de coloriage pour adultes","it":"Libro da colorare per adulti"}},
  {"id":"habit-tracker-notebook","title":"Cuaderno para seguir hábitos","category":"papelería","categoryLabel":"papelería","icon":"✅","price":11,"interests":["creative","books","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cuaderno habit tracker hábitos regalo","tags":["organización","menos de 20"],"reason":"Ayuda a convertir una intención en algo que se ve y se puede continuar.","editorialScore":3,"titles":{"en":"Habit tracker notebook","de":"Notizbuch für Gewohnheiten","fr":"Carnet de suivi des habitudes","it":"Quaderno per monitorare le abitudini"}},
  {"id":"pocket-planner","title":"Agenda pequeña para el día a día","category":"papelería","categoryLabel":"papelería","icon":"🗓️","price":12,"interests":["books","creative","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"agenda pequeña semanal bolsillo regalo","tags":["organización","menos de 20"],"reason":"Un regalo útil para quien disfruta llevando las cosas un poco más en orden.","editorialScore":3,"titles":{"en":"Pocket daily planner","de":"Kleiner Tagesplaner","fr":"Petit agenda quotidien","it":"Agenda tascabile giornaliera"}},
  {"id":"affirmation-card-deck","title":"Cartas de inspiración para cada día","category":"bienestar","categoryLabel":"bienestar","icon":"🌞","price":15,"interests":["home","creative"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cartas afirmaciones inspiración bienestar regalo","tags":["ánimo","menos de 20"],"reason":"Pequeños mensajes que pueden convertirse en un ritual personal sin resultar invasivos.","editorialScore":3,"titles":{"en":"Daily affirmation card deck","de":"Inspirationskarten für jeden Tag","fr":"Cartes d’inspiration quotidiennes","it":"Carte di ispirazione quotidiana"}},
  {"id":"gratitude-notebook","title":"Cuaderno de gratitud","category":"bienestar","categoryLabel":"bienestar","icon":"💛","price":14,"interests":["home","creative","books"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cuaderno gratitud diario bienestar regalo","tags":["emocional","menos de 20"],"reason":"Una forma sencilla de guardar lo bueno de los días y volver a ello cuando apetece.","editorialScore":4,"titles":{"en":"Gratitude notebook","de":"Dankbarkeitstagebuch","fr":"Carnet de gratitude","it":"Quaderno della gratitudine"}},
  {"id":"mini-photo-frame","title":"Marco pequeño para una foto","category":"momentos","categoryLabel":"momentos","icon":"🖼️","price":12,"interests":["home","travel"],"styles":["emotional"],"relations":["partner","parent","sibling","friend","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"marco foto pequeño bonito regalo","tags":["recuerdo","menos de 20"],"reason":"Hace visible un recuerdo sin obligar a preparar un regalo complicado.","editorialScore":4,"titles":{"en":"Small photo frame","de":"Kleiner Bilderrahmen für ein Foto","fr":"Petit cadre photo","it":"Piccola cornice per foto"}},
  {"id":"message-in-a-bottle-kit","title":"Kit para dejar un mensaje especial","category":"momentos","categoryLabel":"momentos","icon":"💌","price":16,"interests":["creative","home"],"styles":["emotional","original"],"relations":["partner","parent","friend","sibling","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit mensaje botella cartas regalo original","tags":["sorpresa","menos de 20"],"reason":"El objeto importa menos que lo que permite decir y conservar.","editorialScore":4,"titles":{"en":"Message in a bottle gift kit","de":"Geschenkset für eine besondere Nachricht","fr":"Kit message dans une bouteille","it":"Kit messaggio in bottiglia"}},
  {"id":"keyring-initial","title":"Llavero con inicial","category":"estilo","categoryLabel":"estilo","icon":"🔑","price":14,"interests":["travel","home"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"llavero inicial personalizado regalo","tags":["detalle","menos de 20"],"reason":"Un pequeño objeto de uso diario que se siente pensado para esa persona.","editorialScore":3,"titles":{"en":"Initial letter keyring","de":"Schlüsselanhänger mit Initiale","fr":"Porte-clés avec initiale","it":"Portachiavi con iniziale"}},
  {"id":"minimalist-hair-clips","title":"Pinzas de pelo minimalistas","category":"estilo","categoryLabel":"estilo","icon":"🎀","price":12,"interests":["beauty"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pinzas pelo minimalistas pack regalo","tags":["estilo","menos de 20"],"reason":"Un accesorio discreto que puede encajar con muchos estilos sin arriesgar demasiado.","editorialScore":3,"titles":{"en":"Minimalist hair clip set","de":"Minimalistisches Haarspangen-Set","fr":"Set de pinces à cheveux minimalistes","it":"Set di mollette per capelli minimal"}},
  {"id":"travel-jewelry-pouch","title":"Estuche para joyas de viaje","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":16,"interests":["travel","beauty"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estuche joyas viaje compacto regalo","tags":["viajes","menos de 20"],"reason":"Evita que los pequeños accesorios se pierdan o se enreden en la próxima escapada.","editorialScore":4,"titles":{"en":"Travel jewelry pouch","de":"Reiseetui für Schmuck","fr":"Pochette à bijoux de voyage","it":"Astuccio da viaggio per gioielli"}},
  {"id":"hair-turban","title":"Toalla turbante para el pelo","category":"bienestar","categoryLabel":"bienestar","icon":"🧖","price":16,"interests":["beauty","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"toalla turbante microfibra pelo regalo","tags":["cuidado","menos de 20"],"reason":"Convierte una rutina cotidiana en algo más cómodo y un poco más agradable.","editorialScore":3,"titles":{"en":"Quick-dry hair turban towel","de":"Schnelltrocknender Haarturban","fr":"Serviette turban séchage rapide","it":"Asciugamano turbante per capelli ad asciugatura rapida"}},
  {"id":"lip-balm-trio","title":"Trío de bálsamos labiales","category":"bienestar","categoryLabel":"bienestar","icon":"💄","price":10,"interests":["beauty"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pack bálsamos labiales regalo","tags":["cuidado","menos de 20"],"reason":"Un detalle fácil de usar, compartir o llevar en el bolso todos los días.","editorialScore":3,"titles":{"en":"Lip balm trio gift set","de":"Lippenpflege-Trio als Geschenkset","fr":"Trio de baumes à lèvres","it":"Trio di balsami labbra regalo"}},
  {"id":"shower-steamer-set","title":"Pastillas aromáticas para la ducha","category":"bienestar","categoryLabel":"bienestar","icon":"🫧","price":15,"interests":["beauty","home"],"styles":["original","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pastillas aromáticas ducha set regalo","tags":["relax","menos de 20"],"reason":"Un lujo pequeño para hacer especial una ducha normal sin llenar el baño de objetos.","editorialScore":4,"titles":{"en":"Shower steamer aromatherapy set","de":"Aromatische Dusch-Duftsteine","fr":"Pastilles parfumées pour la douche","it":"Set di pastiglie aromatiche per doccia"}},
  {"id":"bath-salts-mini","title":"Sales de baño en formato regalo","category":"bienestar","categoryLabel":"bienestar","icon":"🛁","price":13,"interests":["beauty","home"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"sales baño set regalo relajante","tags":["relax","menos de 20"],"reason":"Una pausa sencilla para quien agradece tener un momento solo para sí.","editorialScore":3,"titles":{"en":"Mini bath salts gift set","de":"Mini-Badesalz-Geschenkset","fr":"Mini coffret de sels de bain","it":"Mini set regalo di sali da bagno"}},
  {"id":"foot-file-pedicure","title":"Kit sencillo de cuidado de pies","category":"bienestar","categoryLabel":"bienestar","icon":"🦶","price":12,"interests":["beauty","sport"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit cuidado pies lima pedicura regalo","tags":["cuidado","menos de 20"],"reason":"Práctico, fácil de entender y especialmente agradecido después de días intensos.","editorialScore":3,"titles":{"en":"Simple foot care kit","de":"Einfaches Fußpflege-Set","fr":"Kit simple de soin des pieds","it":"Semplice kit per la cura dei piedi"}},
  {"id":"grip-strengthener","title":"Fortalecedor de manos","category":"movimiento","categoryLabel":"movimiento","icon":"💪","price":10,"interests":["sport","tech"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"fortalecedor manos antebrazo deporte regalo","tags":["movimiento","menos de 20"],"reason":"Una idea compacta para quien entrena, escala, toca instrumentos o quiere moverse más.","editorialScore":3,"titles":{"en":"Hand grip strengthener","de":"Handkrafttrainer","fr":"Renforceur de préhension","it":"Allenatore per la forza della presa"}},
  {"id":"reflective-running-bands","title":"Bandas reflectantes para salir a correr","category":"movimiento","categoryLabel":"movimiento","icon":"🏃","price":11,"interests":["sport","travel"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"bandas reflectantes running seguridad regalo","tags":["deporte","menos de 20"],"reason":"Un extra útil para hacer más cómodos y visibles sus paseos o entrenamientos.","editorialScore":3,"titles":{"en":"Reflective running bands","de":"Reflektierende Bänder fürs Laufen","fr":"Brassards réfléchissants pour courir","it":"Fasce riflettenti per correre"}},
  {"id":"gym-towel-quickdry","title":"Toalla deportiva de secado rápido","category":"movimiento","categoryLabel":"movimiento","icon":"🏋️","price":14,"interests":["sport","travel"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"toalla deporte secado rápido microfibra regalo","tags":["deporte","menos de 20"],"reason":"Cabe en la bolsa y mejora cualquier sesión de gimnasio, yoga o escapada.","editorialScore":3,"titles":{"en":"Quick-dry sports towel","de":"Schnelltrocknendes Sporthandtuch","fr":"Serviette de sport à séchage rapide","it":"Asciugamano sportivo ad asciugatura rapida"}},
  {"id":"water-bottle-cleaning-brush","title":"Cepillo para limpiar botellas","category":"movimiento","categoryLabel":"movimiento","icon":"🧼","price":10,"interests":["sport","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cepillo limpiar botella reutilizable set","tags":["útil","menos de 20"],"reason":"Un accesorio humilde que hace mucho más fácil mantener sus botellas en uso.","editorialScore":3,"titles":{"en":"Water bottle cleaning brush set","de":"Bürsten-Set zur Flaschenreinigung","fr":"Brosse de nettoyage pour gourdes","it":"Set di spazzole per pulire borracce"}},
  {"id":"mini-repair-kit","title":"Kit de reparación para pequeños apaños","category":"hogar","categoryLabel":"hogar","icon":"🛠️","price":18,"interests":["home","tech"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit reparación casa compacto herramientas regalo","tags":["apaños","menos de 20"],"reason":"Un fondo de armario útil para arreglar algo en el momento en que hace falta.","editorialScore":4,"titles":{"en":"Mini home repair kit","de":"Mini-Reparaturset für kleine Arbeiten","fr":"Mini kit de réparation pour petits dépannages","it":"Mini kit per piccole riparazioni domestiche"}},
  {"id":"multi-tool-keyring","title":"Multiherramienta de llavero","category":"hogar","categoryLabel":"hogar","icon":"🔧","price":17,"interests":["home","travel","sport"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"multiherramienta llavero compacta regalo","tags":["práctico","menos de 20"],"reason":"Concentra varios pequeños recursos en algo que puede llevar siempre encima.","editorialScore":4,"titles":{"en":"Keychain multi-tool","de":"Multifunktionswerkzeug am Schlüsselbund","fr":"Multi-outil porte-clés","it":"Multiutensile portachiavi"}},
  {"id":"reusable-shopping-bag-foldable","title":"Bolsa plegable que cabe en cualquier parte","category":"hogar","categoryLabel":"hogar","icon":"🛍️","price":13,"interests":["home","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"bolsa compra plegable reutilizable diseño regalo","tags":["cotidiano","menos de 20"],"reason":"Resuelve una necesidad recurrente y desaparece en un bolsillo cuando no se usa.","editorialScore":3,"titles":{"en":"Foldable reusable shopping bag","de":"Faltbare Einkaufstasche zum Wiederverwenden","fr":"Sac réutilisable pliable","it":"Borsa riutilizzabile pieghevole"}},
  {"id":"reusable-cutlery-case","title":"Estuche para cubiertos reutilizables","category":"hogar","categoryLabel":"hogar","icon":"🥢","price":15,"interests":["home","travel","food"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estuche cubiertos reutilizables viaje","tags":["práctico","menos de 20"],"reason":"Completa un pequeño hábito sostenible y queda bien en la mochila o el bolso.","editorialScore":3,"titles":{"en":"Reusable cutlery travel case","de":"Etui für wiederverwendbares Besteck","fr":"Etui pour couverts réutilisables","it":"Astuccio per posate riutilizzabili"}},
  {"id":"fridge-magnets-photo","title":"Imanes para convertir fotos en recuerdos","category":"momentos","categoryLabel":"momentos","icon":"🧲","price":14,"interests":["home","travel"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"imanes fotos personalizados frigorífico regalo","tags":["recuerdo","menos de 20"],"reason":"Una manera informal de llevar momentos compartidos a la vida diaria.","editorialScore":4,"titles":{"en":"Photo fridge magnets","de":"Fotomagnete für den Kühlschrank","fr":"Aimants photo pour réfrigérateur","it":"Calamite fotografiche per il frigorifero"}},
  {"id":"plant-labels-set","title":"Etiquetas bonitas para sus plantas","category":"hogar","categoryLabel":"hogar","icon":"🌱","price":9,"interests":["home","creative"],"styles":["original","useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"etiquetas plantas jardín bonitas pack","tags":["verde","menos de 20"],"reason":"Un detalle para quien disfruta cuidando plantas y poniendo orden a sus macetas.","editorialScore":3,"titles":{"en":"Decorative plant labels","de":"Dekorative Pflanzenetiketten","fr":"Étiquettes décoratives pour plantes","it":"Etichette decorative per piante"}},
  {"id":"seed-paper-cards","title":"Tarjetas de papel plantable","category":"hogar","categoryLabel":"hogar","icon":"🌼","price":13,"interests":["home","creative"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tarjetas papel semillas plantable regalo","tags":["verde","menos de 20"],"reason":"El mensaje no termina al abrirlo: puede convertirse en algo que crece.","editorialScore":4,"titles":{"en":"Plantable seed paper cards","de":"Pflanzbare Karten aus Samenpapier","fr":"Cartes en papier ensemencé à planter","it":"Biglietti in carta con semi da piantare"}},
  {"id":"plant-mister-mini","title":"Pulverizador pequeño para plantas","category":"hogar","categoryLabel":"hogar","icon":"💧","price":12,"interests":["home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pulverizador plantas cristal pequeño regalo","tags":["plantas","menos de 20"],"reason":"Un accesorio bonito y práctico para quien tiene un pequeño jardín en casa.","editorialScore":3,"titles":{"en":"Mini plant mister","de":"Kleine Pflanzensprühflasche","fr":"Petit vaporisateur pour plantes","it":"Mini nebulizzatore per piante"}},
  {"id":"drawer-organizer-small","title":"Organizador pequeño para cajones","category":"hogar","categoryLabel":"hogar","icon":"🗂️","price":15,"interests":["home","tech"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"organizador cajones pequeño modular regalo","tags":["orden","menos de 20"],"reason":"Ayuda a que las cosas que ya tiene sean más fáciles de encontrar.","editorialScore":3,"titles":{"en":"Small drawer organizer","de":"Kleiner Schubladen-Organizer","fr":"Petit organisateur de tiroir","it":"Piccolo organizer per cassetti"}},
  {"id":"candle-snuffer","title":"Apagavelas bonito","category":"hogar","categoryLabel":"hogar","icon":"🕯️","price":14,"interests":["home"],"styles":["original","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"apagavelas bonito accesorio velas regalo","tags":["casa","menos de 20"],"reason":"Un objeto pequeño que eleva un ritual doméstico sin regalar otra vela más.","editorialScore":4,"titles":{"en":"Decorative candle snuffer","de":"Hübscher Kerzenlöscher","fr":"Éteignoir à bougie décoratif","it":"Spegni candela decorativo"}},
  {"id":"coaster-cork-set","title":"Posavasos de corcho con diseño","category":"hogar","categoryLabel":"hogar","icon":"🟤","price":16,"interests":["home","food"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"posavasos corcho diseño set regalo","tags":["casa","menos de 20"],"reason":"Protegen la mesa y aportan un detalle visible a la casa sin ocupar mucho.","editorialScore":3,"titles":{"en":"Designer cork coaster set","de":"Designer-Untersetzer aus Kork","fr":"Set de dessous-de-verre en liège design","it":"Set di sottobicchieri in sughero design"}},
  {"id":"ceramic-mug-sleeve","title":"Funda térmica para su taza","category":"hogar","categoryLabel":"hogar","icon":"☕","price":14,"interests":["home","food"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"funda taza cerámica térmica regalo","tags":["café","menos de 20"],"reason":"Hace más cómodo llevar su bebida y añade un pequeño gesto de cuidado a la rutina.","editorialScore":3,"titles":{"en":"Ceramic mug heat sleeve","de":"Thermo-Hülle für Keramiktassen","fr":"Manchon thermique pour mug en céramique","it":"Fascia termica per tazza in ceramica"}},
  {"id":"honey-dipper","title":"Cucharita para la miel","category":"sabores","categoryLabel":"sabores","icon":"🍯","price":8,"interests":["food","home"],"styles":["original","useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cuchara miel madera regalo cocina","tags":["cocina","menos de 20"],"reason":"Una idea diminuta y simpática para acompañar desayunos, tés y postres.","editorialScore":3,"titles":{"en":"Honey dipper spoon","de":"Honiglöffel","fr":"Cuillère à miel","it":"Dosatore per miele"}},
  {"id":"olive-oil-pourer","title":"Vertedor elegante para aceite","category":"sabores","categoryLabel":"sabores","icon":"🫒","price":18,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"vertedor aceite oliva acero cocina regalo","tags":["cocina","menos de 20"],"reason":"Mejora un gesto cotidiano de cocina y queda bien a la vista.","editorialScore":4,"titles":{"en":"Elegant olive oil pourer","de":"Eleganter Ausgießer für Olivenöl","fr":"Bec verseur élégant pour huile d’olive","it":"Versatore elegante per olio d’oliva"}},
  {"id":"cookie-stamp-set","title":"Sellos para galletas caseras","category":"sabores","categoryLabel":"sabores","icon":"🍪","price":17,"interests":["food","creative"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"sellos galletas repostería set regalo","tags":["repostería","menos de 20"],"reason":"Convierte una tarde de cocina en un plan creativo con resultado para compartir.","editorialScore":4,"titles":{"en":"Cookie stamp baking set","de":"Keksstempel-Backset","fr":"Set de tampons pour biscuits maison","it":"Set di timbri per biscotti fatti in casa"}},
  {"id":"citrus-peeler","title":"Pelador de cítricos","category":"sabores","categoryLabel":"sabores","icon":"🍊","price":10,"interests":["food","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pelador cítricos acero cocina regalo","tags":["cocina","menos de 20"],"reason":"Un utensilio curioso que se usa de verdad cuando disfruta cocinando.","editorialScore":3,"titles":{"en":"Citrus peeler tool","de":"Zitrusschäler","fr":"Éplucheur pour agrumes","it":"Sbucciatore per agrumi"}},
  {"id":"ice-cube-tray-sphere","title":"Molde de hielos grandes","category":"sabores","categoryLabel":"sabores","icon":"🧊","price":16,"interests":["food","home"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"molde hielo esferas cóctel regalo","tags":["bar","menos de 20"],"reason":"Un pequeño cambio de formato para hacer más especiales bebidas y sobremesas.","editorialScore":4,"titles":{"en":"Large sphere ice cube tray","de":"Form für große Eiskugeln","fr":"Moule à gros glaçons sphériques","it":"Stampo per grandi cubetti di ghiaccio sferici"}},
  {"id":"silicone-spatula-mini","title":"Espátula pequeña de silicona","category":"sabores","categoryLabel":"sabores","icon":"🥄","price":8,"interests":["food","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"espátula silicona pequeña cocina regalo","tags":["cocina","menos de 20"],"reason":"Un básico simpático para quien disfruta preparando recetas y cuidando los detalles.","editorialScore":3,"titles":{"en":"Mini silicone spatula","de":"Kleiner Silikonspatel","fr":"Petite spatule en silicone","it":"Mini spatola in silicone"}},
  {"id":"ramen-bowl-set","title":"Cuenco y accesorios para ramen","category":"sabores","categoryLabel":"sabores","icon":"🍜","price":18,"interests":["food","home"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cuenco ramen set palillos regalo","tags":["sabores","menos de 20"],"reason":"Convierte una comida rápida en un pequeño momento de disfrute.","editorialScore":4,"titles":{"en":"Ramen bowl and chopstick set","de":"Ramen-Schüssel-Set mit Essstäbchen","fr":"Bol à ramen avec accessoires","it":"Set ciotola ramen con bacchette"}},
  {"id":"cocktail-stirrer-set","title":"Agitadores para cócteles caseros","category":"sabores","categoryLabel":"sabores","icon":"🍸","price":17,"interests":["food","home"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"agitadores cocktail set bar casa regalo","tags":["bar","menos de 20"],"reason":"Añade gracia a una sobremesa y abre la puerta a preparar algo juntos.","editorialScore":3,"titles":{"en":"Cocktail stirrer set","de":"Cocktail-Rührstäbchen-Set","fr":"Set de touillettes à cocktails","it":"Set di bastoncini per cocktail"}},
  {"id":"hot-sauce-mini-set","title":"Pack de salsas picantes","category":"sabores","categoryLabel":"sabores","icon":"🔥","price":19,"interests":["food"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pack salsas picantes degustación regalo","tags":["sabor","menos de 20"],"reason":"Una sorpresa con personalidad para quien disfruta probando sabores nuevos.","editorialScore":4,"titles":{"en":"Mini hot sauce gift set","de":"Mini-Geschenkset mit scharfen Saucen","fr":"Mini coffret de sauces piquantes","it":"Mini set regalo di salse piccanti"}},
  {"id":"chocolate-tasting-bars","title":"Selección de tabletas para degustar","category":"sabores","categoryLabel":"sabores","icon":"🍫","price":18,"interests":["food"],"styles":["emotional","fun"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pack chocolate degustación gourmet regalo","tags":["dulce","menos de 20"],"reason":"Funciona como detalle y como plan: abrir, probar y elegir favoritas.","editorialScore":4,"titles":{"en":"Chocolate tasting bar selection","de":"Auswahl zum Schokoladenverkosten","fr":"Sélection de tablettes de chocolat à déguster","it":"Selezione di tavolette di cioccolato da degustare"}},
  {"id":"popcorn-seasoning-set","title":"Sabores para mejorar las palomitas","category":"sabores","categoryLabel":"sabores","icon":"🍿","price":16,"interests":["food","gaming","home"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set condimentos palomitas regalo cine","tags":["plan","menos de 20"],"reason":"Un extra divertido para noches de película, juegos o sofá.","editorialScore":3,"titles":{"en":"Popcorn seasoning gift set","de":"Gewürzset für Popcorn","fr":"Coffret d’assaisonnements pour popcorn","it":"Set di condimenti per popcorn"}},
  {"id":"desk-fidget-ring","title":"Anillo antiestrés para el escritorio","category":"juegos","categoryLabel":"juegos","icon":"🔄","price":10,"interests":["gaming","tech","home"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"anillo antiestrés fidget escritorio regalo","tags":["desconexión","menos de 20"],"reason":"Un pequeño objeto para las manos en reuniones, estudio o momentos de concentración.","editorialScore":3,"titles":{"en":"Desk fidget ring","de":"Fidget-Ring für den Schreibtisch","fr":"Bague anti-stress pour le bureau","it":"Anello antistress da scrivania"}},
  {"id":"controller-thumb-grips","title":"Grips para mejorar el mando","category":"gaming","categoryLabel":"gaming","icon":"🎮","price":12,"interests":["gaming","tech"],"styles":["useful","fun"],"relations":["friend","sibling","child","partner","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"grips joystick mando consola pack","tags":["gaming","menos de 20"],"reason":"Un detalle específico que mejora algo que ya disfruta usando.","editorialScore":4,"titles":{"en":"Controller thumb grips","de":"Thumb-Grips für Controller","fr":"Grips pour sticks de manette","it":"Grip per levette del controller"}},
  {"id":"phone-charging-cable-braided","title":"Cable de carga reforzado","category":"tecnología","categoryLabel":"tecnología","icon":"🔌","price":15,"interests":["tech","travel"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cable carga móvil reforzado largo regalo","tags":["tecnología","menos de 20"],"reason":"Un reemplazo útil para un accesorio que siempre acaba desapareciendo o rompiéndose.","editorialScore":3,"titles":{"en":"Braided phone charging cable","de":"Geflochtenes Ladekabel fürs Handy","fr":"Câble de charge renforcé pour téléphone","it":"Cavo di ricarica intrecciato per smartphone"}},
  {"id":"screen-privacy-filter-mini","title":"Filtro de privacidad para portátil","category":"tecnología","categoryLabel":"tecnología","icon":"👀","price":19,"interests":["tech","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"filtro privacidad pantalla portátil 13 14 pulgadas","tags":["privacidad","menos de 20"],"reason":"Protege lo que aparece en pantalla cuando trabaja o estudia fuera de casa.","editorialScore":4,"titles":{"en":"Laptop privacy screen filter","de":"Blickschutzfilter für Laptops","fr":"Filtre de confidentialité pour ordinateur portable","it":"Filtro privacy per laptop"}},
  {"id":"bluetooth-shutter-remote","title":"Mando Bluetooth para hacer fotos","category":"tecnología","categoryLabel":"tecnología","icon":"📷","price":14,"interests":["tech","travel","creative"],"styles":["fun","useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mando bluetooth disparador fotos móvil regalo","tags":["fotos","menos de 20"],"reason":"Hace posibles fotos de grupo y vídeos sin pedirle a nadie que sujete el móvil.","editorialScore":4,"titles":{"en":"Bluetooth camera shutter remote","de":"Bluetooth-Fernauslöser für Fotos","fr":"Télécommande Bluetooth pour photos","it":"Telecomando Bluetooth per selfie e foto"}},
  {"id":"usb-led-strip","title":"Tira de luz para su rincón","category":"tecnología","categoryLabel":"tecnología","icon":"💡","price":16,"interests":["tech","gaming","home"],"styles":["fun","original"],"relations":["friend","sibling","child","partner","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tira led usb escritorio habitación regalo","tags":["ambiente","menos de 20"],"reason":"Cambia el ambiente de un escritorio, habitación o zona de juegos con muy poco esfuerzo.","editorialScore":4,"titles":{"en":"USB LED light strip","de":"USB-LED-Lichtleiste für den persönlichen Bereich","fr":"Ruban lumineux LED USB","it":"Striscia luminosa LED USB"}},
  {"id":"keycap-puller-kit","title":"Kit para personalizar teclados","category":"gaming","categoryLabel":"gaming","icon":"⌨️","price":12,"interests":["tech","gaming","creative"],"styles":["original","useful"],"relations":["friend","sibling","child","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit extractor keycaps teclado mecánico","tags":["setup","menos de 20"],"reason":"Una idea de nicho para quien disfruta afinando su setup hasta el último detalle.","editorialScore":4,"titles":{"en":"Keyboard keycap puller kit","de":"Set zum Austauschen von Tastenkappen","fr":"Kit pour personnaliser un clavier","it":"Kit per personalizzare la tastiera"}},
  {"id":"microfiber-screen-cloth-set","title":"Paños suaves para sus dispositivos","category":"tecnología","categoryLabel":"tecnología","icon":"🫧","price":7,"interests":["tech","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"paños microfibra limpiar pantallas pack","tags":["útil","menos de 20"],"reason":"Un básico barato que siempre acaba teniendo un hueco cerca del ordenador o la televisión.","editorialScore":3,"titles":{"en":"Microfiber screen cloth set","de":"Mikrofasertuch-Set für Bildschirme","fr":"Lot de chiffons microfibre pour écrans","it":"Set panni in microfibra per schermi"}},
  {"id":"travel-luggage-tags","title":"Etiquetas de equipaje con personalidad","category":"viajes","categoryLabel":"viajes","icon":"🏷️","price":13,"interests":["travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"etiquetas equipaje viaje bonitas pack regalo","tags":["viajes","menos de 20"],"reason":"Hace más fácil reconocer la maleta y añade una señal personal a cada escapada.","editorialScore":3,"titles":{"en":"Travel luggage tag set","de":"Reisegepäckanhänger mit Persönlichkeit","fr":"Étiquettes de bagage originales","it":"Set di etichette per bagagli da viaggio"}},
  {"id":"packing-cube-mini","title":"Cubo organizador para la maleta","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":17,"interests":["travel","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"packing cube organizador maleta pequeño regalo","tags":["viajes","menos de 20"],"reason":"Ayuda a viajar con menos caos y a encontrar las cosas en cuanto llega.","editorialScore":4,"titles":{"en":"Mini packing cube","de":"Kleiner Packwürfel für den Koffer","fr":"Petit cube de rangement pour valise","it":"Mini cubo organizer per valigia"}},
  {"id":"travel-toothbrush-case","title":"Estuche de cepillo para viajar","category":"viajes","categoryLabel":"viajes","icon":"🪥","price":12,"interests":["travel","beauty"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estuche cepillo dientes viaje ventilado regalo","tags":["viajes","menos de 20"],"reason":"Un detalle práctico para cualquier escapada, incluso para quien ya tiene de todo.","editorialScore":3,"titles":{"en":"Travel toothbrush case","de":"Reiseetui für die Zahnbürste","fr":"Etui de voyage pour brosse à dents","it":"Astuccio da viaggio per spazzolino"}},
  {"id":"sleep-earplugs-case","title":"Estuche para descansar en cualquier sitio","category":"viajes","categoryLabel":"viajes","icon":"😴","price":9,"interests":["travel","home"],"styles":["useful","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estuche tapones oídos dormir viaje","tags":["descanso","menos de 20"],"reason":"Un gesto de cuidado para quien duerme fuera, viaja mucho o necesita desconectar.","editorialScore":3,"titles":{"en":"Sleep earplugs travel case","de":"Etui für Schlaf-Ohrstöpsel unterwegs","fr":"Etui pour bouchons d’oreilles de sommeil","it":"Astuccio per tappi per dormire in viaggio"}},
  {"id":"city-map-poster-small","title":"Mapa de ciudad para recordar un lugar","category":"momentos","categoryLabel":"momentos","icon":"🗺️","price":18,"interests":["travel","home"],"styles":["emotional","original"],"relations":["partner","parent","friend","sibling","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"póster mapa ciudad personalizado regalo","tags":["recuerdo","menos de 20"],"reason":"Lleva un lugar compartido a casa y deja que el contexto haga el regalo especial.","editorialScore":4,"titles":{"en":"Small city map poster","de":"Kleines Stadtplan-Poster","fr":"Petite affiche de plan de ville","it":"Piccola stampa con mappa della città"}},
  {"id":"postcard-writing-kit","title":"Kit para escribir postales","category":"viajes","categoryLabel":"viajes","icon":"✉️","price":15,"interests":["travel","creative","books"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit postales escribir cartas viaje regalo","tags":["viajes","menos de 20"],"reason":"Invita a recuperar el placer de mandar algo físico desde cualquier sitio.","editorialScore":4,"titles":{"en":"Postcard writing kit","de":"Postkarten-Schreibset","fr":"Kit pour écrire des cartes postales","it":"Kit per scrivere cartoline"}},
  {"id":"mini-first-aid-pouch","title":"Neceser mini de primeros auxilios","category":"viajes","categoryLabel":"viajes","icon":"🩹","price":17,"interests":["travel","sport"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"neceser primeros auxilios viaje compacto regalo","tags":["previsor","menos de 20"],"reason":"Un pequeño kit que nadie suele comprar hasta que agradece tenerlo.","editorialScore":3,"titles":{"en":"Mini first-aid travel pouch","de":"Mini-Erste-Hilfe-Tasche für unterwegs","fr":"Mini trousse de premiers secours de voyage","it":"Mini astuccio pronto soccorso da viaggio"}},
  {"id":"scented-sachet-drawer","title":"Saquitos aromáticos para cajones","category":"hogar","categoryLabel":"hogar","icon":"🌸","price":11,"interests":["home","beauty"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"saquitos aromáticos cajones armario regalo","tags":["casa","menos de 20"],"reason":"Un detalle sensorial discreto para hacer más agradable una rutina doméstica.","editorialScore":3,"titles":{"en":"Scented drawer sachets","de":"Duftsäckchen für Schubladen","fr":"Sachets parfumés pour tiroirs","it":"Sacchetti profumati per cassetti"}},
  {"id":"slippers-socks","title":"Calcetines suaves para estar en casa","category":"hogar","categoryLabel":"hogar","icon":"🧦","price":18,"interests":["home","beauty"],"styles":["useful","emotional"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"calcetines casa suaves regalo invierno","tags":["calma","menos de 20"],"reason":"Una forma fácil de regalar confort sin complicar tallas ni estilos.","editorialScore":3,"titles":{"en":"Soft lounge socks","de":"Weiche Kuschelsocken für zu Hause","fr":"Chaussettes douces pour la maison","it":"Calzini morbidi da casa"}},
  {"id":"pocket-mirror","title":"Espejo compacto para el bolso","category":"estilo","categoryLabel":"estilo","icon":"🪞","price":9,"interests":["beauty","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","child","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"espejo bolsillo compacto bonito regalo","tags":["detalle","menos de 20"],"reason":"Un objeto cotidiano con un punto bonito que se puede llevar siempre encima.","editorialScore":3,"titles":{"en":"Compact pocket mirror","de":"Kompakter Taschenspiegel","fr":"Miroir de poche compact","it":"Specchietto compatto da borsa"}},
  {"id":"slim-card-wallet","title":"Tarjetero compacto","category":"estilo","categoryLabel":"estilo","icon":"💳","price":18,"interests":["travel","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tarjetero compacto minimalista regalo","tags":["estilo","menos de 20"],"reason":"Un básico que mejora el bolsillo o el bolso sin pedir conocer su talla.","editorialScore":3,"titles":{"en":"Compact card holder","de":"Kompaktes Kartenetui","fr":"Porte-cartes compact","it":"Portacarte compatto"}},
  {"id":"shoe-care-kit-mini","title":"Kit compacto para cuidar zapatos","category":"estilo","categoryLabel":"estilo","icon":"👟","price":19,"interests":["home","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit cuidado zapatos cepillo crema regalo","tags":["cuidado","menos de 20"],"reason":"Una idea útil para quien aprecia que sus cosas duren y se vean bien.","editorialScore":3,"titles":{"en":"Mini shoe care kit","de":"Kompaktes Schuhpflege-Set","fr":"Mini kit d’entretien des chaussures","it":"Mini kit per la cura delle scarpe"}},
  {"id":"beard-comb-kit","title":"Peine y aceite para barba","category":"bienestar","categoryLabel":"bienestar","icon":"🧔","price":15,"interests":["beauty","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit barba peine aceite regalo","tags":["cuidado","menos de 20"],"reason":"Un detalle personal sin entrar en una compra demasiado específica.","editorialScore":3,"titles":{"en":"Beard comb and oil kit","de":"Bartkamm- und Bartöl-Set","fr":"Kit peigne et huile pour barbe","it":"Kit pettine e olio da barba"}},
  {"id":"nail-care-kit","title":"Kit de manicura compacto","category":"bienestar","categoryLabel":"bienestar","icon":"💅","price":18,"interests":["beauty","travel"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit manicura compacto acero regalo","tags":["cuidado","menos de 20"],"reason":"Cabe en casa o en la maleta y resuelve una necesidad que vuelve una y otra vez.","editorialScore":3,"titles":{"en":"Compact nail care kit","de":"Kompaktes Nagelpflege-Set","fr":"Kit compact de soin des ongles","it":"Kit compatto per la cura delle unghie"}},
  {"id":"kids-sticker-book","title":"Libro de pegatinas para inventar historias","category":"creatividad","categoryLabel":"creatividad","icon":"⭐","price":10,"interests":["creative","books"],"styles":["fun","original"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"libro pegatinas niños historias creativas regalo","tags":["juego","menos de 20"],"reason":"Un rato de juego tranquilo que deja que la imaginación haga el resto.","editorialScore":4,"titles":{"en":"Kids story sticker book","de":"Stickerbuch für Kinder zum Geschichtenerfinden","fr":"Livre d’autocollants pour inventer des histoires","it":"Libro di adesivi per bambini per inventare storie"}},
  {"id":"washable-markers-kids","title":"Rotuladores lavables para crear","category":"creatividad","categoryLabel":"creatividad","icon":"🖌️","price":14,"interests":["creative"],"styles":["fun","useful"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"rotuladores lavables niños set creativo regalo","tags":["crear","menos de 20"],"reason":"Un clásico fiable para tardes de dibujo, deberes creativos y juegos inventados.","editorialScore":3,"titles":{"en":"Washable markers for kids","de":"Auswaschbare Filzstifte für Kinder","fr":"Feutres lavables pour enfants","it":"Pennarelli lavabili per bambini"}},
  {"id":"mini-science-kit","title":"Experimentos de ciencia en pequeño formato","category":"juegos","categoryLabel":"juegos","icon":"🔬","price":19,"interests":["creative","books","gaming"],"styles":["fun","original"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit experimentos ciencia niños regalo","tags":["curiosidad","menos de 20"],"reason":"Propone hacer, observar y preguntar: un regalo con más recorrido que un juguete de un solo día.","editorialScore":4,"titles":{"en":"Mini science experiment kit","de":"Mini-Wissenschafts-Experimentier-Set","fr":"Mini kit d’expériences scientifiques","it":"Mini kit di esperimenti scientifici"}},
  {"id":"pocket-yo-yo","title":"Yo-yo para llevar a cualquier parte","category":"juegos","categoryLabel":"juegos","icon":"🪀","price":12,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["child","sibling","friend","other"],"ages":["child","teen","young-adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"yo yo bolsillo juguete habilidad regalo","tags":["juego","menos de 20"],"reason":"Un regalo pequeño que invita a practicar una habilidad y compartir el reto.","editorialScore":3,"titles":{"en":"Pocket yo-yo","de":"Yo-Yo für unterwegs","fr":"Yo-yo de poche","it":"Yo-yo tascabile"}},
  {"id":"story-dice","title":"Dados para inventar historias","category":"juegos","categoryLabel":"juegos","icon":"🎲","price":15,"interests":["creative","books","gaming"],"styles":["fun","original"],"relations":["child","parent","friend","sibling","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"dados contar historias creatividad regalo","tags":["imaginación","menos de 20"],"reason":"Abre posibilidades distintas cada vez que se tiran, solos o en compañía.","editorialScore":4,"titles":{"en":"Storytelling dice","de":"Geschichtenwürfel","fr":"Dés pour inventer des histoires","it":"Dadi per inventare storie"}},
  {"id":"reusable-coloring-mat","title":"Mantel reutilizable para colorear","category":"creatividad","categoryLabel":"creatividad","icon":"🌈","price":18,"interests":["creative","home"],"styles":["fun","useful"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mantel reutilizable colorear niños pizarra","tags":["crear","menos de 20"],"reason":"Da libertad para crear y volver a empezar sin gastar papel en cada intento.","editorialScore":4,"titles":{"en":"Reusable coloring mat","de":"Wiederverwendbare Malmatte","fr":"Set de colori réutilisable","it":"Tovaglietta riutilizzabile da colorare"}},
  {"id":"animal-puzzle-wood","title":"Puzzle de madera con animales","category":"juegos","categoryLabel":"juegos","icon":"🐾","price":16,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["child","parent","other"],"ages":["child"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"puzzle madera animales infantil regalo","tags":["juego","menos de 20"],"reason":"Una opción manipulable y tranquila para jugar sin estímulos interminables.","editorialScore":3,"titles":{"en":"Wooden animal puzzle","de":"Holzpuzzle mit Tieren","fr":"Puzzle en bois sur le thème des animaux","it":"Puzzle in legno con animali"}},
  {"id":"rainbow-bracelet-kit","title":"Kit para hacer pulseras","category":"creatividad","categoryLabel":"creatividad","icon":"🌈","price":18,"interests":["creative"],"styles":["fun","original"],"relations":["child","friend","sibling","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit pulseras amistad manualidades regalo","tags":["crear","menos de 20"],"reason":"El regalo es la actividad y también lo que termina compartiendo o regalando.","editorialScore":4,"titles":{"en":"Rainbow friendship bracelet kit","de":"Set für Freundschaftsbänder","fr":"Kit de bracelets d’amitié","it":"Kit per braccialetti dell’amicizia"}},
  {"id":"pour-over-coffee-starter","title":"Kit para empezar con café de filtro","category":"sabores","categoryLabel":"sabores","icon":"☕","price":29,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit café filtro pour over regalo","tags":["café","20–40"],"reason":"Un ritual completo y accesible para quien disfruta preparando el café con calma.","editorialScore":5,"titles":{"en":"Pour-over coffee starter kit","de":"Pour-over-Kaffee-Starterset","fr":"Kit de démarrage pour café filtre","it":"Kit base per caffè filtro"}},
  {"id":"tea-tasting-box","title":"Caja de degustación de tés","category":"sabores","categoryLabel":"sabores","icon":"🍵","price":28,"interests":["food","home"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"caja degustación tés regalo gourmet","tags":["pausa","20–40"],"reason":"Permite probar sabores distintos y encontrar un nuevo favorito sin apostar por uno solo.","editorialScore":5,"titles":{"en":"Tea tasting gift box","de":"Tee-Verkostungsbox","fr":"Coffret de dégustation de thés","it":"Scatola degustazione tè"}},
  {"id":"spice-rack-small","title":"Especiero compacto para la cocina","category":"sabores","categoryLabel":"sabores","icon":"🧂","price":32,"interests":["food","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"especiero compacto cocina sobremesa regalo","tags":["orden","20–40"],"reason":"Ordena un ingrediente que usa a diario y hace más agradable cocinar.","editorialScore":4,"titles":{"en":"Compact spice rack","de":"Kompaktes Gewürzregal","fr":"Petit rangement à épices","it":"Portaspezie compatto"}},
  {"id":"baking-decor-kit","title":"Kit para decorar repostería","category":"sabores","categoryLabel":"sabores","icon":"🧁","price":26,"interests":["food","creative"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit decorar repostería boquillas manga pastelera regalo","tags":["repostería","20–40"],"reason":"Un regalo que se convierte rápidamente en una tarde de crear y compartir.","editorialScore":4,"titles":{"en":"Baking decoration kit","de":"Backdekorations-Set","fr":"Kit de décoration pâtisserie","it":"Kit per decorare dolci"}},
  {"id":"sushi-making-kit","title":"Kit para preparar sushi en casa","category":"sabores","categoryLabel":"sabores","icon":"🍣","price":34,"interests":["food","creative"],"styles":["fun","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit hacer sushi casa regalo","tags":["cocina","20–40"],"reason":"Una experiencia más memorable que un utensilio suelto: preparar, probar y reírse juntos.","editorialScore":5,"titles":{"en":"Sushi making kit","de":"Sushi-Zubereitungsset für zu Hause","fr":"Kit pour préparer des sushis maison","it":"Kit per preparare sushi in casa"}},
  {"id":"pizza-stone-mini","title":"Piedra pequeña para pizza casera","category":"sabores","categoryLabel":"sabores","icon":"🍕","price":35,"interests":["food","home"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"piedra pizza horno casa compacta regalo","tags":["cocina","20–40"],"reason":"Mejora una comida que ya gusta y puede activar un plan de cocina compartido.","editorialScore":4,"titles":{"en":"Compact pizza stone","de":"Kompakter Pizzastein","fr":"Petite pierre à pizza","it":"Pietra compatta per pizza"}},
  {"id":"smartphone-gimbal-basic","title":"Estabilizador sencillo para el móvil","category":"tecnología","categoryLabel":"tecnología","icon":"🎥","price":39,"interests":["tech","creative","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estabilizador móvil gimbal básico vídeo regalo","tags":["vídeo","20–40"],"reason":"Para quien graba viajes, recetas o momentos y quiere que se vean más cuidados.","editorialScore":4,"titles":{"en":"Basic smartphone gimbal","de":"Einfacher Smartphone-Gimbal","fr":"Stabilisateur simple pour smartphone","it":"Gimbal base per smartphone"}},
  {"id":"mechanical-keyboard-wrist-rest","title":"Reposamuñecas para teclado","category":"gaming","categoryLabel":"gaming","icon":"⌨️","price":24,"interests":["tech","gaming","home"],"styles":["useful","premium"],"relations":["friend","sibling","child","partner","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"reposamuñecas teclado mecánico madera regalo","tags":["setup","20–40"],"reason":"Mejora muchas horas de escritorio y añade personalidad a su setup.","editorialScore":4,"titles":{"en":"Mechanical keyboard wrist rest","de":"Handballenauflage für mechanische Tastatur","fr":"Repose-poignets pour clavier mécanique","it":"Poggiapolsi per tastiera meccanica"}},
  {"id":"charging-station-wood","title":"Estación de carga para la mesilla","category":"tecnología","categoryLabel":"tecnología","icon":"🔋","price":36,"interests":["tech","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estación carga móvil reloj auriculares madera regalo","tags":["orden","20–40"],"reason":"Agrupa lo que carga cada noche y hace que la mesilla respire un poco más.","editorialScore":4,"titles":{"en":"Wooden charging station","de":"Ladestation aus Holz","fr":"Station de charge en bois","it":"Stazione di ricarica in legno"}},
  {"id":"wireless-charger-stand","title":"Base de carga inalámbrica vertical","category":"tecnología","categoryLabel":"tecnología","icon":"📱","price":29,"interests":["tech","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cargador inalámbrico vertical móvil regalo","tags":["tecnología","20–40"],"reason":"Un accesorio práctico que permite ver notificaciones sin dejar el móvil tirado.","editorialScore":4,"titles":{"en":"Wireless charging stand","de":"Vertikale kabellose Ladestation","fr":"Support de charge sans fil vertical","it":"Stand di ricarica wireless verticale"}},
  {"id":"e-reader-sleeve-premium","title":"Funda acolchada para lector electrónico","category":"lectura","categoryLabel":"lectura","icon":"📘","price":32,"interests":["books","travel","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"funda acolchada kindle e-reader regalo","tags":["lectura","20–40"],"reason":"Protege una afición que viaja con ella y permite acertar sin elegir un título concreto.","editorialScore":4,"titles":{"en":"Premium e-reader sleeve","de":"Hochwertige Hülle für E-Reader","fr":"Housse matelassée pour liseuse","it":"Custodia imbottita premium per e-reader"}},
  {"id":"booklight-rechargeable-premium","title":"Lámpara de lectura con varios niveles","category":"lectura","categoryLabel":"lectura","icon":"📖","price":25,"interests":["books","tech","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lámpara lectura libro recargable varios niveles regalo","tags":["lectura","20–40"],"reason":"La misma idea de siempre, pero con un acabado que se siente más especial.","editorialScore":4,"titles":{"en":"Premium rechargeable reading light","de":"Hochwertige Leselampe mit mehreren Stufen","fr":"Lampe de lecture rechargeable à plusieurs niveaux","it":"Lampada da lettura ricaricabile con più livelli"}},
  {"id":"reading-glasses-case","title":"Estuche rígido para gafas de lectura","category":"lectura","categoryLabel":"lectura","icon":"👓","price":24,"interests":["books","travel"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"estuche gafas lectura rígido diseño regalo","tags":["lectura","20–40"],"reason":"Protege un pequeño aliado diario y deja espacio para elegir un diseño con personalidad.","editorialScore":3,"titles":{"en":"Hard case for reading glasses","de":"Hartschalenetui für Lesebrille","fr":"Étui rigide pour lunettes de lecture","it":"Astuccio rigido per occhiali da lettura"}},
  {"id":"escape-room-box","title":"Caja de escape para resolver en casa","category":"juegos","categoryLabel":"juegos","icon":"🗝️","price":35,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["partner","friend","sibling","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego escape room caja casa regalo","tags":["plan","20–40"],"reason":"La propuesta es vivir un rato juntos, no solamente abrir una caja.","editorialScore":5,"titles":{"en":"At-home escape room box","de":"Escape-Room-Box für zu Hause","fr":"Boîte d’escape game à la maison","it":"Box escape room da fare a casa"}},
  {"id":"strategy-card-game","title":"Juego de cartas de estrategia","category":"juegos","categoryLabel":"juegos","icon":"♟️","price":30,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["friend","sibling","partner","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego cartas estrategia adultos regalo","tags":["juego","20–40"],"reason":"Ideal para quien disfruta aprendiendo reglas, tomando decisiones y echando otra partida.","editorialScore":4,"titles":{"en":"Strategy card game","de":"Strategisches Kartenspiel","fr":"Jeu de cartes stratégique","it":"Gioco di carte strategico"}},
  {"id":"cooperative-board-game-small","title":"Juego cooperativo para dos o más","category":"juegos","categoryLabel":"juegos","icon":"🤝","price":39,"interests":["gaming","creative"],"styles":["fun","emotional"],"relations":["partner","friend","sibling","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego mesa cooperativo dos adultos regalo","tags":["plan","20–40"],"reason":"Cambia la competición por un objetivo compartido y deja recuerdos de cada partida.","editorialScore":5,"titles":{"en":"Small cooperative board game","de":"Kleines kooperatives Brettspiel","fr":"Petit jeu de société coopératif","it":"Piccolo gioco da tavolo cooperativo"}},
  {"id":"custom-star-map-print","title":"Lámina del cielo de una fecha especial","category":"momentos","categoryLabel":"momentos","icon":"🌌","price":29,"interests":["travel","home","creative"],"styles":["emotional","original"],"relations":["partner","parent","friend","sibling","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lámina mapa estrellas personalizada fecha regalo","tags":["recuerdo","20–40"],"reason":"Convierte una fecha o un lugar importante en una pieza que se puede conservar.","editorialScore":5,"titles":{"en":"Custom star map print","de":"Personalisierter Sternkarten-Druck","fr":"Carte du ciel personnalisée","it":"Stampa personalizzata della mappa stellare"}},
  {"id":"photo-collage-kit","title":"Kit para montar un collage de fotos","category":"momentos","categoryLabel":"momentos","icon":"🧡","price":25,"interests":["creative","travel","home"],"styles":["emotional","fun"],"relations":["partner","parent","friend","sibling","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit collage fotos regalo creativo","tags":["recuerdo","20–40"],"reason":"Da una estructura para convertir fotos sueltas en una historia que se puede mirar juntos.","editorialScore":5,"titles":{"en":"Photo collage gift kit","de":"Fotocollage-Geschenkset","fr":"Kit pour créer un collage photo","it":"Kit regalo per collage di foto"}},
  {"id":"journaling-kit","title":"Kit de journaling para empezar","category":"creatividad","categoryLabel":"creatividad","icon":"📔","price":33,"interests":["creative","books","home"],"styles":["original","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit journaling cuaderno pegatinas bolígrafos regalo","tags":["crear","20–40"],"reason":"Combina herramientas y estímulos para que empezar sea más fácil que comprar piezas por separado.","editorialScore":4,"titles":{"en":"Journaling starter kit","de":"Journaling-Starterset","fr":"Kit de démarrage pour journaling","it":"Kit base per journaling"}},
  {"id":"art-print-hobby","title":"Lámina ilustrada de su afición","category":"creatividad","categoryLabel":"creatividad","icon":"🖼️","price":28,"interests":["creative","home","books"],"styles":["original","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lámina ilustración afición personalizada regalo","tags":["personal","20–40"],"reason":"La clave está en elegir el tema que ya forma parte de su mundo, no en decorar por decorar.","editorialScore":4,"titles":{"en":"Illustrated hobby art print","de":"Illustrierter Kunstdruck zu seinem Hobby","fr":"Affiche illustrée sur sa passion","it":"Stampa illustrata sulla sua passione"}},
  {"id":"yoga-blocks-cork","title":"Bloques de corcho para practicar yoga","category":"movimiento","categoryLabel":"movimiento","icon":"🧘","price":26,"interests":["sport","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"bloques yoga corcho set regalo","tags":["movimiento","20–40"],"reason":"Un apoyo real para una práctica que ya disfruta o quiere retomar.","editorialScore":4,"titles":{"en":"Cork yoga blocks","de":"Yoga-Blöcke aus Kork","fr":"Blocs de yoga en liège","it":"Blocchi yoga in sughero"}},
  {"id":"massage-cupping-kit","title":"Kit de masaje para descargar tensión","category":"bienestar","categoryLabel":"bienestar","icon":"🫶","price":34,"interests":["sport","home","beauty"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit automasaje ventosas relajación regalo","tags":["relax","20–40"],"reason":"Una opción de autocuidado para crear un momento de pausa en casa.","editorialScore":3,"titles":{"en":"Self-massage cupping kit","de":"Set zur Selbstmassage mit Schröpfgläsern","fr":"Kit de massage à ventouses pour soi","it":"Kit coppettazione per automassaggio"}},
  {"id":"running-belt-reflective","title":"Cinturón deportivo reflectante","category":"movimiento","categoryLabel":"movimiento","icon":"🏃","price":25,"interests":["sport","travel"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cinturón running reflectante móvil llaves regalo","tags":["deporte","20–40"],"reason":"Lleva lo esencial sin rebotes y mejora la visibilidad cuando entrena al aire libre.","editorialScore":4,"titles":{"en":"Reflective running belt","de":"Reflektierender Laufgürtel","fr":"Ceinture de running réfléchissante","it":"Cintura da running riflettente"}},
  {"id":"compact-dumbbell-set","title":"Mancuernas compactas para casa","category":"movimiento","categoryLabel":"movimiento","icon":"🏋️","price":39,"interests":["sport","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mancuernas pequeñas fitness casa set regalo","tags":["movimiento","20–40"],"reason":"Una forma sencilla de añadir fuerza a entrenamientos cortos sin montar un gimnasio.","editorialScore":4,"titles":{"en":"Compact dumbbell set","de":"Kompaktes Hantelset für zu Hause","fr":"Set d’haltères compact pour la maison","it":"Set di manubri compatti per casa"}},
  {"id":"travel-hammock","title":"Hamaca ligera para escapadas","category":"viajes","categoryLabel":"viajes","icon":"🏕️","price":38,"interests":["travel","sport"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"hamaca portátil ligera camping viaje regalo","tags":["escapada","20–40"],"reason":"Para quien disfruta encontrar un rincón, colgarse y cambiar de ritmo.","editorialScore":4,"titles":{"en":"Lightweight travel hammock","de":"Leichte Reisehängematte","fr":"Hamac léger de voyage","it":"Amaca leggera da viaggio"}},
  {"id":"packing-cube-set","title":"Set de organizadores para maleta","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":29,"interests":["travel","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set organizadores packing cubes maleta regalo","tags":["viajes","20–40"],"reason":"Multiplica el orden de cualquier viaje sin exigir saber qué destino tiene en mente.","editorialScore":4,"titles":{"en":"Packing cube travel set","de":"Packwürfel-Set für Reisen","fr":"Set de cubes de rangement pour valise","it":"Set di cubi organizer per valigia"}},
  {"id":"cabin-backpack-organizer","title":"Organizador para mochila de cabina","category":"viajes","categoryLabel":"viajes","icon":"🎒","price":36,"interests":["travel","tech"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"organizador mochila viaje portátil compartimentos regalo","tags":["viajes","20–40"],"reason":"Hace más accesibles cargadores, documentos y pequeños objetos mientras se mueve.","editorialScore":4,"titles":{"en":"Cabin backpack organizer","de":"Organizer für Kabinenrucksack","fr":"Organisateur pour sac à dos cabine","it":"Organizer per zaino da cabina"}},
  {"id":"travel-neck-pillow-memory","title":"Almohada de viaje con apoyo cómodo","category":"viajes","categoryLabel":"viajes","icon":"✈️","price":28,"interests":["travel","home"],"styles":["useful","emotional"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"almohada cuello viaje memory foam regalo","tags":["descanso","20–40"],"reason":"Un gesto de cuidado especialmente acertado para quien pasa horas en tránsito.","editorialScore":4,"titles":{"en":"Memory foam travel neck pillow","de":"Reise-Nackenkissen mit Memory-Schaum","fr":"Oreiller de voyage à mémoire de forme","it":"Cuscino da viaggio in memory foam"}},
  {"id":"skincare-routine-kit","title":"Kit de rutina facial sencilla","category":"bienestar","categoryLabel":"bienestar","icon":"🧴","price":36,"interests":["beauty","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit skincare rutina facial regalo","tags":["cuidado","20–40"],"reason":"Mejor regalar una rutina fácil de usar que apostar por un producto demasiado específico.","editorialScore":4,"titles":{"en":"Simple skincare routine kit","de":"Einfaches Hautpflege-Routine-Set","fr":"Kit de routine de soins du visage","it":"Kit per una semplice routine skincare"}},
  {"id":"grooming-kit-basic","title":"Kit de cuidado personal básico","category":"bienestar","categoryLabel":"bienestar","icon":"🧼","price":39,"interests":["beauty","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit cuidado personal hombre mujer viaje regalo","tags":["cuidado","20–40"],"reason":"Una selección versátil para renovar básicos que realmente entran en la rutina.","editorialScore":4,"titles":{"en":"Everyday grooming kit","de":"Alltags-Pflegeset","fr":"Kit de soin personnel quotidien","it":"Kit base per la cura personale"}},
  {"id":"desk-lamp-clamp","title":"Lámpara de pinza para el escritorio","category":"hogar","categoryLabel":"hogar","icon":"💡","price":34,"interests":["home","tech","books"],"styles":["useful"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lámpara pinza escritorio lectura regalo","tags":["luz","20–40"],"reason":"Mejora un rincón de trabajo, lectura o creación sin ocupar la superficie.","editorialScore":4,"titles":{"en":"Clamp desk lamp","de":"Klemm-Schreibtischlampe","fr":"Lampe de bureau à pince","it":"Lampada da scrivania con morsetto"}},
  {"id":"ambient-night-light","title":"Luz ambiental para la mesilla","category":"hogar","categoryLabel":"hogar","icon":"🌙","price":27,"interests":["home","tech"],"styles":["emotional","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"luz ambiente mesilla dormitorio regulable regalo","tags":["casa","20–40"],"reason":"Un cambio sencillo que hace más acogedor el lugar donde empieza y termina el día.","editorialScore":4,"titles":{"en":"Ambient bedside night light","de":"Stimmungslicht für den Nachttisch","fr":"Lampe d’ambiance pour la table de nuit","it":"Luce d’atmosfera da comodino"}},
  {"id":"bathroom-spa-set","title":"Set spa para una tarde de autocuidado","category":"bienestar","categoryLabel":"bienestar","icon":"🧖","price":30,"interests":["beauty","home"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set spa casa autocuidado regalo","tags":["relax","20–40"],"reason":"Crea una experiencia completa sin tener que reservar nada ni acertar una talla.","editorialScore":4,"titles":{"en":"At-home spa gift set","de":"Spa-Geschenkset für zu Hause","fr":"Coffret spa pour la maison","it":"Set spa per il relax a casa"}},
  {"id":"ceramic-serving-board","title":"Tabla cerámica para servir","category":"hogar","categoryLabel":"hogar","icon":"🍽️","price":35,"interests":["home","food"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tabla cerámica servir aperitivos diseño regalo","tags":["casa","20–40"],"reason":"Para quien disfruta cuidar la mesa incluso cuando la ocasión es improvisada.","editorialScore":4,"titles":{"en":"Ceramic serving board","de":"Keramische Servierplatte","fr":"Plateau de service en céramique","it":"Tagliere da portata in ceramica"}},
  {"id":"insulated-water-bottle","title":"Botella térmica para el día a día","category":"movimiento","categoryLabel":"movimiento","icon":"🚰","price":29,"interests":["sport","travel","home"],"styles":["useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"botella térmica acero reutilizable regalo","tags":["cotidiano","20–40"],"reason":"Un objeto que puede acompañarle en el trabajo, los viajes o el deporte.","editorialScore":4,"titles":{"en":"Insulated everyday water bottle","de":"Isolierte Trinkflasche für jeden Tag","fr":"Gourde isotherme pour tous les jours","it":"Borraccia termica per tutti i giorni"}},
  {"id":"kids-building-set","title":"Set de construcción para inventar","category":"juegos","categoryLabel":"juegos","icon":"🧱","price":32,"interests":["gaming","creative"],"styles":["fun","useful"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set construcción creativo niños regalo","tags":["juego","20–40"],"reason":"Deja que construya, desmonte y vuelva a empezar con un resultado distinto cada vez.","editorialScore":4,"titles":{"en":"Creative building set for kids","de":"Kreatives Bauset für Kinder","fr":"Jeu de construction créatif pour enfants","it":"Set di costruzioni creative per bambini"}},
  {"id":"kids-magic-trick-set","title":"Set de trucos de magia para aprender","category":"juegos","categoryLabel":"juegos","icon":"🎩","price":26,"interests":["gaming","creative"],"styles":["fun","original"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set magia niños trucos aprendizaje regalo","tags":["sorpresa","20–40"],"reason":"Un regalo que se practica, se representa y acaba compartiéndose con toda la familia.","editorialScore":4,"titles":{"en":"Kids magic trick set","de":"Zaubertrick-Set für Kinder","fr":"Coffret de tours de magie pour enfants","it":"Set di giochi di magia per bambini"}},
  {"id":"magnetic-drawing-board","title":"Pizarra magnética para dibujar y borrar","category":"creatividad","categoryLabel":"creatividad","icon":"🖍️","price":28,"interests":["creative","home"],"styles":["fun","useful"],"relations":["child","parent","other"],"ages":["child","teen"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pizarra magnética dibujo niños reutilizable regalo","tags":["crear","20–40"],"reason":"Permite llenar la mesa de ideas y empezar de nuevo sin desperdicio.","editorialScore":4,"titles":{"en":"Magnetic drawing board","de":"Magnetische Zeichen- und Löschtafel","fr":"Ardoise magnétique pour dessiner","it":"Lavagna magnetica per disegnare"}},
  {"id":"family-card-game","title":"Juego de cartas para toda la familia","category":"juegos","categoryLabel":"juegos","icon":"👨‍👩‍👧‍👦","price":24,"interests":["gaming","creative"],"styles":["fun","emotional"],"relations":["parent","child","sibling","friend","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego cartas familiar fácil regalo","tags":["plan","20–40"],"reason":"Una apuesta transversal que funciona cuando el mejor regalo es juntarse un rato.","editorialScore":4,"titles":{"en":"Family card game","de":"Kartenspiel für die ganze Familie","fr":"Jeu de cartes pour toute la famille","it":"Gioco di carte per tutta la famiglia"}},
  {"id":"custom-mug","title":"Taza con mensaje o diseño personal","category":"momentos","categoryLabel":"momentos","icon":"☕","price":25,"interests":["home","food","creative"],"styles":["emotional","useful"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"taza personalizada mensaje regalo cumpleaños","tags":["detalle","20–40"],"reason":"Lo cotidiano se vuelve personal cuando el mensaje está elegido para esa persona.","editorialScore":4,"titles":{"en":"Custom message mug","de":"Tasse mit persönlicher Nachricht oder Motiv","fr":"Mug avec message ou motif personnalisé","it":"Tazza con messaggio o design personalizzato"}},
  {"id":"air-fryer-accessory-set","title":"Accesorios para sacarle más partido a la air fryer","category":"sabores","categoryLabel":"sabores","icon":"🍟","price":45,"interests":["food","home"],"styles":["useful","original"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set accesorios air fryer cocina regalo","tags":["cocina","40–75"],"reason":"Amplía una herramienta que ya tiene y convierte recetas rápidas en un terreno para experimentar.","editorialScore":4,"titles":{"en":"Air fryer accessory set","de":"Zubehörset für die Heißluftfritteuse","fr":"Set d’accessoires pour air fryer","it":"Set accessori per friggitrice ad aria"}},
  {"id":"electric-milk-frother","title":"Espumador eléctrico para sus cafés","category":"sabores","categoryLabel":"sabores","icon":"🥛","price":49,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"espumador leche eléctrico café regalo","tags":["café","40–75"],"reason":"Un pequeño upgrade para el café de cada mañana que se nota desde el primer uso.","editorialScore":5,"titles":{"en":"Electric milk frother","de":"Elektrischer Milchaufschäumer","fr":"Mousseur à lait électrique","it":"Montalatte elettrico"}},
  {"id":"cast-iron-skillet","title":"Sartén de hierro para cocinar sin prisa","category":"sabores","categoryLabel":"sabores","icon":"🍳","price":55,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"sartén hierro fundido cocina regalo","tags":["cocina","40–75"],"reason":"Una pieza duradera para quien disfruta aprendiendo recetas y cuidando los utensilios.","editorialScore":4,"titles":{"en":"Cast iron skillet","de":"Gusseiserne Pfanne","fr":"Poêle en fonte","it":"Padella in ghisa"}},
  {"id":"cocktail-shaker-set","title":"Set completo para preparar cócteles","category":"sabores","categoryLabel":"sabores","icon":"🍸","price":48,"interests":["food","home"],"styles":["fun","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set cocktail shaker completo regalo","tags":["bar","40–75"],"reason":"Convierte una afición por los sabores en un plan compartido y fácil de estrenar.","editorialScore":5,"titles":{"en":"Cocktail shaker gift set","de":"Cocktail-Shaker-Geschenkset","fr":"Coffret shaker à cocktails","it":"Set regalo shaker per cocktail"}},
  {"id":"smart-speaker-mini","title":"Altavoz inteligente compacto","category":"tecnología","categoryLabel":"tecnología","icon":"🔊","price":45,"interests":["tech","music","home"],"styles":["useful","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"altavoz inteligente compacto wifi regalo","tags":["casa","40–75"],"reason":"Música, temporizadores, podcasts y pequeñas rutinas en un solo rincón de la casa.","editorialScore":4,"titles":{"en":"Compact smart speaker","de":"Kompakter Smart Speaker","fr":"Enceinte intelligente compacte","it":"Altoparlante smart compatto"}},
  {"id":"noise-reducing-headphones","title":"Auriculares cómodos para concentrarse","category":"tecnología","categoryLabel":"tecnología","icon":"🎧","price":69,"interests":["tech","music","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"auriculares reducción ruido cómodos regalo","tags":["concentración","40–75"],"reason":"Una mejora versátil para música, viajes, llamadas o ratos de concentración.","editorialScore":5,"titles":{"en":"Comfortable noise-reducing headphones","de":"Bequeme geräuschreduzierende Kopfhörer","fr":"Casque confortable réducteur de bruit","it":"Cuffie comode con riduzione del rumore"}},
  {"id":"portable-projector-mini","title":"Proyector compacto para noches de película","category":"tecnología","categoryLabel":"tecnología","icon":"📽️","price":72,"interests":["tech","gaming","home"],"styles":["fun","original"],"relations":["partner","friend","sibling","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mini proyector portátil cine casa regalo","tags":["plan","40–75"],"reason":"No es solo un aparato: propone una noche diferente para ver algo juntos.","editorialScore":5,"titles":{"en":"Compact portable projector","de":"Kompakter tragbarer Projektor","fr":"Mini projecteur portable","it":"Mini proiettore portatile"}},
  {"id":"tablet-stand-aluminum","title":"Soporte de aluminio para tablet","category":"tecnología","categoryLabel":"tecnología","icon":"📱","price":49,"interests":["tech","home","books"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"soporte tablet aluminio ajustable escritorio regalo","tags":["escritorio","40–75"],"reason":"Hace más cómodas las videollamadas, recetas, series o lecturas digitales.","editorialScore":4,"titles":{"en":"Aluminum tablet stand","de":"Tabletständer aus Aluminium","fr":"Support de tablette en aluminium","it":"Supporto in alluminio per tablet"}},
  {"id":"e-reader-basic","title":"Lector electrónico para llevar su biblioteca","category":"lectura","categoryLabel":"lectura","icon":"📚","price":75,"interests":["books","tech","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lector electrónico e reader básico regalo","tags":["lectura","40–75"],"reason":"Un regalo con recorrido para quien siempre está buscando hueco para leer.","editorialScore":5,"titles":{"en":"Basic e-reader","de":"Einfacher E-Reader","fr":"Liseuse électronique simple","it":"E-reader base"}},
  {"id":"premium-notebook-leather","title":"Cuaderno encuadernado para sus ideas","category":"papelería","categoryLabel":"papelería","icon":"📓","price":45,"interests":["books","creative","home"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cuaderno piel encuadernado premium regalo","tags":["escribir","40–75"],"reason":"La calidad del objeto invita a usarlo para proyectos, viajes o pensamientos importantes.","editorialScore":4,"titles":{"en":"Leather-bound notebook","de":"Ledergebundenes Notizbuch","fr":"Carnet relié en cuir","it":"Taccuino rilegato in pelle"}},
  {"id":"illustrated-cookbook","title":"Libro de cocina ilustrado","category":"sabores","categoryLabel":"sabores","icon":"📕","price":42,"interests":["food","books","home"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"libro cocina ilustrado recetas regalo","tags":["cocina","40–75"],"reason":"Un regalo para mirar, elegir una receta y acabar cocinando algo que se recuerda.","editorialScore":4,"titles":{"en":"Illustrated cookbook","de":"Illustriertes Kochbuch","fr":"Livre de cuisine illustré","it":"Libro di cucina illustrato"}},
  {"id":"beginner-guitar-accessory","title":"Kit de accesorios para guitarra","category":"música","categoryLabel":"música","icon":"🎸","price":55,"interests":["music","creative"],"styles":["useful","original"],"relations":["friend","sibling","child","partner","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"kit accesorios guitarra afinador púas correa regalo","tags":["música","40–75"],"reason":"Refuerza una afición concreta sin obligarte a elegir una guitarra ni conocer su nivel exacto.","editorialScore":4,"titles":{"en":"Beginner guitar accessory kit","de":"Zubehörset für Gitarrenanfänger","fr":"Kit d’accessoires pour guitare débutant","it":"Kit accessori per chitarra principiante"}},
  {"id":"board-game-deluxe","title":"Edición cuidada de un juego de mesa","category":"juegos","categoryLabel":"juegos","icon":"🎲","price":58,"interests":["gaming","creative"],"styles":["fun","premium"],"relations":["friend","sibling","partner","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"juego mesa edición especial adultos regalo","tags":["juego","40–75"],"reason":"Una experiencia social que puede reaparecer muchas veces después del cumpleaños.","editorialScore":5,"titles":{"en":"Deluxe board game edition","de":"Hochwertige Brettspiel-Edition","fr":"Édition soignée d’un jeu de société","it":"Edizione deluxe di un gioco da tavolo"}},
  {"id":"creative-lightbox","title":"Caja de luz para crear mensajes","category":"hogar","categoryLabel":"hogar","icon":"💡","price":47,"interests":["creative","home","music"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","child","coworker","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"caja luz mensajes letras decoración regalo","tags":["ambiente","40–75"],"reason":"Permite cambiar el mensaje y adaptar el rincón a la ocasión, no solo decorar una vez.","editorialScore":4,"titles":{"en":"Creative light box","de":"Kreative Leuchtbox","fr":"Boîte lumineuse créative","it":"Light box creativa"}},
  {"id":"yoga-mat-premium","title":"Esterilla cómoda para practicar","category":"movimiento","categoryLabel":"movimiento","icon":"🧘","price":50,"interests":["sport","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"esterilla yoga premium antideslizante regalo","tags":["movimiento","40–75"],"reason":"Un buen soporte cambia la sensación de una práctica que ya forma parte de su vida.","editorialScore":4,"titles":{"en":"Premium yoga mat","de":"Hochwertige Yogamatte","fr":"Tapis de yoga confortable","it":"Tappetino yoga premium"}},
  {"id":"sport-action-camera","title":"Cámara compacta para sus aventuras","category":"movimiento","categoryLabel":"movimiento","icon":"🏄","price":72,"interests":["sport","travel","tech"],"styles":["original","fun"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cámara deportiva acción compacta regalo","tags":["aventura","40–75"],"reason":"Para guardar rutas, escapadas y planes activos desde un punto de vista distinto.","editorialScore":4,"titles":{"en":"Compact action camera","de":"Kompakte Actionkamera","fr":"Caméra d’action compacte","it":"Action cam compatta"}},
  {"id":"carry-on-duffel","title":"Bolsa de viaje para escapadas cortas","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":62,"interests":["travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"bolsa viaje fin de semana cabina resistente regalo","tags":["escapada","40–75"],"reason":"Una pieza práctica para planes de dos días, gimnasio o visitas improvisadas.","editorialScore":4,"titles":{"en":"Carry-on weekend duffel","de":"Wochenend-Reisetasche als Handgepäck","fr":"Sac de voyage week-end cabine","it":"Borsone da weekend formato cabina"}},
  {"id":"personalized-jewelry","title":"Joya discreta con un detalle personal","category":"estilo","categoryLabel":"estilo","icon":"✨","price":65,"interests":["beauty","creative"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","child","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"joya minimalista personalizada inicial regalo","tags":["detalle","40–75"],"reason":"La personalización hace que un objeto sencillo diga algo sin resultar excesivo.","editorialScore":5,"titles":{"en":"Personalized minimalist jewelry","de":"Personalisierter minimalistischer Schmuck","fr":"Bijou minimaliste personnalisé","it":"Gioiello minimal personalizzato"}},
  {"id":"facial-cleansing-device","title":"Dispositivo suave para la rutina facial","category":"bienestar","categoryLabel":"bienestar","icon":"🫧","price":69,"interests":["beauty","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"dispositivo limpieza facial suave regalo","tags":["cuidado","40–75"],"reason":"Un extra tecnológico para una rutina de autocuidado que ya disfruta o quiere mejorar.","editorialScore":4,"titles":{"en":"Gentle facial cleansing device","de":"Sanftes Gesichtsreinigungsgerät","fr":"Appareil doux de nettoyage du visage","it":"Dispositivo delicato per la detersione del viso"}},
  {"id":"espresso-moka-set","title":"Set moka para preparar café intenso","category":"sabores","categoryLabel":"sabores","icon":"☕","price":60,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cafetera moka set café regalo","tags":["café","40–75"],"reason":"Un ritual clásico con suficiente presencia para sentirse como regalo y no como recambio.","editorialScore":5,"titles":{"en":"Moka espresso coffee set","de":"Moka-Espresso-Kaffeeset","fr":"Set moka pour café intense","it":"Set moka per caffè intenso"}},
  {"id":"smartwatch-basic","title":"Reloj inteligente para el día a día","category":"tecnología","categoryLabel":"tecnología","icon":"⌚","price":99,"interests":["tech","sport"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"smartwatch básico actividad notificaciones regalo","tags":["tecnología","75–150"],"reason":"Un regalo versátil para movimiento, música, recordatorios y pequeñas rutinas diarias.","editorialScore":5,"titles":{"en":"Everyday basic smartwatch","de":"Einfacher Smartwatch für den Alltag","fr":"Montre connectée simple pour tous les jours","it":"Smartwatch base per tutti i giorni"}},
  {"id":"instant-camera-bundle","title":"Cámara instantánea para guardar momentos","category":"momentos","categoryLabel":"momentos","icon":"📸","price":89,"interests":["creative","travel","music"],"styles":["emotional","fun"],"relations":["partner","friend","sibling","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cámara instantánea fotos regalo","tags":["recuerdos","75–150"],"reason":"Hace que las fotos salgan del móvil y se conviertan en parte del momento.","editorialScore":5,"titles":{"en":"Instant camera","de":"Sofortbildkamera","fr":"Appareil photo instantané","it":"Macchina fotografica istantanea"}},
  {"id":"premium-noise-cancelling-headphones","title":"Auriculares premium para viajar o concentrarse","category":"tecnología","categoryLabel":"tecnología","icon":"🎧","price":129,"interests":["tech","music","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"auriculares premium cancelación ruido regalo","tags":["música","75–150"],"reason":"Una mejora importante para quien trabaja, viaja o escucha música a diario.","editorialScore":5,"titles":{"en":"Premium noise-cancelling headphones","de":"Hochwertige Noise-Cancelling-Kopfhörer","fr":"Casque premium à réduction de bruit","it":"Cuffie premium con cancellazione del rumore"}},
  {"id":"travel-espresso-brewer","title":"Cafetera portátil para sus escapadas","category":"sabores","categoryLabel":"sabores","icon":"☕","price":89,"interests":["food","travel"],"styles":["original","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cafetera espresso portátil viaje regalo","tags":["café","75–150"],"reason":"Lleva un ritual que le gusta fuera de casa y convierte los viajes en algo más suyo.","editorialScore":5,"titles":{"en":"Portable espresso maker","de":"Tragbare Espressomaschine","fr":"Machine à espresso portable","it":"Macchina da espresso portatile"}},
  {"id":"weekend-travel-backpack","title":"Mochila de viaje para fines de semana","category":"viajes","categoryLabel":"viajes","icon":"🎒","price":95,"interests":["travel","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"mochila viaje fin de semana portátil compartimentos regalo","tags":["viajes","75–150"],"reason":"Una compañera de viaje que organiza mejor lo esencial y aguanta nuevos planes.","editorialScore":5,"titles":{"en":"Weekend travel backpack","de":"Reiserucksack für Wochenendtrips","fr":"Sac à dos de voyage pour week-ends","it":"Zaino da viaggio per weekend"}},
  {"id":"premium-cast-iron-cookware","title":"Pieza premium para cocinar con calma","category":"sabores","categoryLabel":"sabores","icon":"🍲","price":110,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"cacerola hierro fundido premium cocina regalo","tags":["cocina","75–150"],"reason":"Una pieza para quien disfruta de cocinar y valora que sus utensilios duren muchos años.","editorialScore":5,"titles":{"en":"Premium cast iron cookware","de":"Hochwertiges gusseisernes Kochgeschirr","fr":"Ustensile de cuisine premium en fonte","it":"Pentola premium in ghisa"}},
  {"id":"luxury-skincare-set","title":"Ritual premium de cuidado personal","category":"bienestar","categoryLabel":"bienestar","icon":"🧴","price":85,"interests":["beauty","home"],"styles":["emotional","premium"],"relations":["partner","parent","sibling","friend","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set skincare premium cuidado piel regalo","tags":["cuidado","75–150"],"reason":"Una experiencia de autocuidado con más sensación de ocasión especial.","editorialScore":4,"titles":{"en":"Luxury skincare gift set","de":"Hochwertiges Hautpflege-Geschenkset","fr":"Coffret premium de soins de la peau","it":"Set premium per la cura della pelle"}},
  {"id":"premium-board-game-collection","title":"Colección de juegos para muchas tardes","category":"juegos","categoryLabel":"juegos","icon":"🎲","price":90,"interests":["gaming","creative"],"styles":["fun","premium"],"relations":["partner","friend","sibling","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"colección juegos mesa adultos premium regalo","tags":["plan","75–150"],"reason":"Un regalo que no termina el día del cumpleaños: sigue generando planes.","editorialScore":5,"titles":{"en":"Premium board game collection","de":"Hochwertige Brettspielsammlung","fr":"Collection premium de jeux de société","it":"Collezione premium di giochi da tavolo"}},
  {"id":"digital-drawing-tablet","title":"Tableta para dibujar y crear en digital","category":"creatividad","categoryLabel":"creatividad","icon":"🖊️","price":119,"interests":["creative","tech"],"styles":["useful","original"],"relations":["friend","sibling","child","partner","other"],"ages":["teen","young-adult","adult"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"tableta gráfica dibujo digital regalo","tags":["crear","75–150"],"reason":"Da una herramienta real a una afición creativa que puede crecer con la persona.","editorialScore":5,"titles":{"en":"Digital drawing tablet","de":"Grafiktablett zum digitalen Zeichnen","fr":"Tablette graphique pour créer en numérique","it":"Tavoletta grafica per disegnare in digitale"}},
  {"id":"activity-tracker-band","title":"Pulsera para seguir sus entrenamientos","category":"movimiento","categoryLabel":"movimiento","icon":"🏃","price":79,"interests":["sport","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"pulsera actividad fitness tracker regalo","tags":["deporte","75–150"],"reason":"Acompaña hábitos y entrenamientos sin exigir un reloj grande ni una inversión máxima.","editorialScore":4,"titles":{"en":"Fitness activity tracker","de":"Fitness-Aktivitätstracker","fr":"Bracelet de suivi d’activité","it":"Fitness tracker per monitorare l’attività"}},
  {"id":"e-reader-premium","title":"Lector electrónico premium para viajar con libros","category":"lectura","categoryLabel":"lectura","icon":"📚","price":189,"interests":["books","tech","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"lector electrónico premium e reader regalo","tags":["lectura","más de 150"],"reason":"Un regalo de largo recorrido para quien convierte cualquier espera en tiempo de lectura.","editorialScore":5,"titles":{"en":"Premium e-reader","de":"Hochwertiger E-Reader","fr":"Liseuse électronique premium","it":"E-reader premium"}},
  {"id":"smartphone-premium","title":"Móvil premium para renovar su día a día","category":"tecnología","categoryLabel":"tecnología","icon":"📱","price":249,"interests":["tech","creative","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"smartphone premium cámara buena regalo","tags":["tecnología","más de 150"],"reason":"Una inversión grande que tiene sentido cuando la tecnología forma parte de todo su día.","editorialScore":4,"titles":{"en":"Premium smartphone","de":"Premium-Smartphone","fr":"Smartphone premium","it":"Smartphone premium"}},
  {"id":"smartwatch-premium","title":"Reloj inteligente premium","category":"tecnología","categoryLabel":"tecnología","icon":"⌚","price":199,"interests":["tech","sport","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"smartwatch premium deporte salud notificaciones regalo","tags":["tecnología","más de 150"],"reason":"Une seguimiento, comunicación y diseño en un objeto que se usa a diario.","editorialScore":5,"titles":{"en":"Premium smartwatch","de":"Hochwertige Smartwatch","fr":"Montre connectée premium","it":"Smartwatch premium"}},
  {"id":"robot-vacuum","title":"Robot aspirador para liberar tiempo","category":"hogar","categoryLabel":"hogar","icon":"🤖","price":229,"interests":["home","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"robot aspirador inteligente regalo hogar","tags":["casa","más de 150"],"reason":"Un regalo práctico de los que devuelven tiempo y reducen una tarea repetitiva.","editorialScore":5,"titles":{"en":"Robot vacuum cleaner","de":"Saugroboter","fr":"Robot aspirateur","it":"Robot aspirapolvere"}},
  {"id":"espresso-machine","title":"Máquina espresso para su ritual de café","category":"sabores","categoryLabel":"sabores","icon":"☕","price":199,"interests":["food","home"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"máquina espresso café automática regalo","tags":["café","más de 150"],"reason":"Lleva a casa una experiencia que normalmente se busca fuera.","editorialScore":5,"titles":{"en":"Espresso coffee machine","de":"Espressomaschine","fr":"Machine à espresso","it":"Macchina espresso"}},
  {"id":"premium-air-fryer","title":"Freidora de aire premium","category":"sabores","categoryLabel":"sabores","icon":"🍟","price":169,"interests":["food","home","tech"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"freidora aire premium gran capacidad regalo","tags":["cocina","más de 150"],"reason":"Una herramienta que abre muchas recetas y se integra en la vida diaria.","editorialScore":4,"titles":{"en":"Premium air fryer","de":"Hochwertige Heißluftfritteuse","fr":"Air fryer premium","it":"Friggitrice ad aria premium"}},
  {"id":"noise-cancelling-headphones-premium","title":"Auriculares premium para aislarse del ruido","category":"tecnología","categoryLabel":"tecnología","icon":"🎧","price":189,"interests":["tech","music","travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"auriculares premium bluetooth cancelación ruido regalo","tags":["música","más de 150"],"reason":"Un regalo con uso frecuente para viajar, concentrarse y escuchar mejor.","editorialScore":5,"titles":{"en":"Premium noise-cancelling headphones","de":"Premium-Kopfhörer mit Geräuschunterdrückung","fr":"Casque premium à réduction de bruit","it":"Cuffie premium con cancellazione del rumore"}},
  {"id":"portable-projector-premium","title":"Proyector premium para montar un cine en casa","category":"tecnología","categoryLabel":"tecnología","icon":"🎞️","price":199,"interests":["tech","gaming","home"],"styles":["fun","premium"],"relations":["partner","friend","sibling","child","other"],"ages":["child","teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"proyector portátil premium home cinema regalo","tags":["plan","más de 150"],"reason":"Convierte el salón en un plan recurrente para ver, jugar y compartir.","editorialScore":5,"titles":{"en":"Premium home cinema projector","de":"Hochwertiger Heimkino-Projektor","fr":"Projecteur premium pour home cinéma","it":"Proiettore premium per home cinema"}},
  {"id":"camera-lens","title":"Objetivo para llevar más lejos sus fotos","category":"creatividad","categoryLabel":"creatividad","icon":"📷","price":209,"interests":["creative","travel","tech"],"styles":["original","premium"],"relations":["friend","sibling","partner","other"],"ages":["young-adult","adult","midlife"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"objetivo cámara fotografía retrato viaje regalo","tags":["fotos","más de 150"],"reason":"Una forma de profundizar en la fotografía cuando esa afición ya tiene un lugar importante.","editorialScore":4,"titles":{"en":"Camera lens for creative photography","de":"Objektiv für kreative Fotografie","fr":"Objectif pour photographie créative","it":"Obiettivo per fotografia creativa"}},
  {"id":"weekend-luggage-set","title":"Set de maletas para viajar mejor","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":179,"interests":["travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set maletas viaje fin de semana premium regalo","tags":["viajes","más de 150"],"reason":"Una inversión en próximos planes, escapadas y muchas historias por estrenar.","editorialScore":5,"titles":{"en":"Premium weekend luggage set","de":"Hochwertiges Wochenend-Gepäckset","fr":"Set de bagages premium pour week-end","it":"Set valigie premium da weekend"}}];


function makeOptionCopy(label, detail) {
  return { label: label, detail: detail || '' };
}

function makeQuestionCopy(kicker, title, subtitle, options) {
  return { kicker: kicker, title: title, subtitle: subtitle, options: options };
}

var LANGUAGE_COPY = {
  es: {
    locale: 'es', label: 'Español', pickerLabel: 'Idioma', stepPrefix: 'Paso ', stepJoin: ' de ',
    heroEyebrow: 'Ideas para regalos', heroTitle: 'Encuentra un regalo de cumpleaños que encaje de verdad.', heroCopy: 'Responde con unos toques y descubre 10 ideas de regalos de cumpleaños según la persona, la ocasión, sus gustos y tu presupuesto.', heroNotes: [{ value: '8', label: 'toques' }, { value: '10', label: 'ideas' }, { value: 'sin', label: 'cuenta' }],
    trust: [{ title: 'Ideas pensadas', detail: 'Mezcla de clásicos y sorpresas' }, { title: 'Enlaces claros', detail: 'Te llevamos a una búsqueda relevante' }, { title: 'Sin cuenta', detail: 'Tus respuestas se quedan en tu navegador' }],
    keyboardHint: 'Toca una opción y pasaremos al siguiente paso. No hace falta escribir nombres ni descripciones.',
    messages: { choose: 'Elige una opción para continuar.', chooseInterest: 'Elige al menos un gusto para continuar.', maxInterests: 'Elige hasta 3 gustos para que las ideas no se dispersen.', multiHint: 'Puedes elegir hasta 3 opciones', copied: 'Enlace copiado.', copyHint: 'Copia el enlace de esta página para compartirlo.' },
    results: { ready: 'Tu selección está lista', genericTitle: '10 ideas para acertar', relationTitle: '10 ideas para tu {relation}.', intro: 'Una mezcla de opciones útiles, originales y con algo que contar. Abre las que te llamen y compara en la tienda de tu país.', chips: 'Tus preferencias', adjust: '← Ajustar respuestas', refresh: 'Ver otras ideas', share: 'Compartir selección', shareText: 'He encontrado ideas de regalo en Regalazo 🎁', badge: 'Mejor encaje', price: '≈ {price} € · presupuesto orientativo', link: 'Ver opciones en Amazon', note: 'Estas son búsquedas relevantes, no fichas de producto concretas. Amazon puede mostrar otras opciones y los precios o la disponibilidad pueden cambiar.' },
    questions: {
      relation: makeQuestionCopy('1 · Para quién', '¿Qué relación tienes con esta persona?', 'El vínculo ayuda a encontrar el tono adecuado.', { partner: makeOptionCopy('Pareja', 'algo con intención'), parent: makeOptionCopy('Madre o padre', 'un detalle especial'), sibling: makeOptionCopy('Hermano/a', 'con complicidad'), friend: makeOptionCopy('Amigo/a', 'para sorprenderle'), child: makeOptionCopy('Hijo/a', 'según su etapa'), coworker: makeOptionCopy('Compañero/a', 'acierto sin complicarse'), other: makeOptionCopy('Otra persona', 'lo afinamos después') }),
      gender: makeQuestionCopy('2 · Género', '¿Qué género describe mejor a esa persona?', 'Si no lo sabes o prefieres no decirlo, puedes elegir esa opción.', { woman: makeOptionCopy('Mujer'), man: makeOptionCopy('Hombre'), nonbinary: makeOptionCopy('Persona no binaria'), other: makeOptionCopy('Otra identidad'), 'prefer-not': makeOptionCopy('Prefiero no decirlo'), unknown: makeOptionCopy('No lo sé') }),
      age: makeQuestionCopy('3 · Edad', '¿En qué rango de edad está?', 'Aproximada es perfecto. No necesitas saber el número exacto.', { child: makeOptionCopy('Menos de 12'), teen: makeOptionCopy('12–17'), 'young-adult': makeOptionCopy('18–24'), adult: makeOptionCopy('25–34'), midlife: makeOptionCopy('35–49'), '50plus': makeOptionCopy('50 o más'), unknown: makeOptionCopy('No lo sé') }),
      occasion: makeQuestionCopy('4 · Momento', '¿Qué estás celebrando?', 'El contexto cambia mucho el tipo de regalo que se siente bien.', { birthday: makeOptionCopy('Cumpleaños'), anniversary: makeOptionCopy('Aniversario'), christmas: makeOptionCopy('Navidad'), 'secret-santa': makeOptionCopy('Amigo invisible'), thankyou: makeOptionCopy('Agradecimiento'), justbecause: makeOptionCopy('Porque sí') }),
      budget: makeQuestionCopy('5 · Presupuesto', '¿Cuánto quieres gastar?', 'Tomamos el máximo como guía, no como una obligación.', { under20: makeOptionCopy('Menos de 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Más de 150 €') }),
      interests: makeQuestionCopy('6 · Sus gustos', '¿Qué le mueve por dentro?', 'Elige el gusto que más le representa.', { tech: makeOptionCopy('Tecnología'), sport: makeOptionCopy('Deporte'), food: makeOptionCopy('Cocina y sabores'), travel: makeOptionCopy('Viajes'), beauty: makeOptionCopy('Cuidado personal'), books: makeOptionCopy('Libros'), gaming: makeOptionCopy('Juegos'), music: makeOptionCopy('Música'), home: makeOptionCopy('Casa y calma'), creative: makeOptionCopy('Crear cosas') }),
      style: makeQuestionCopy('7 · Estilo', '¿Qué sensación quieres provocar?', 'Elige el aire del regalo, incluso si todavía no sabes cuál será.', { useful: makeOptionCopy('Útil', 'lo usará de verdad'), original: makeOptionCopy('Original', 'que no se vea venir'), emotional: makeOptionCopy('Emocional', 'que diga algo'), fun: makeOptionCopy('Divertido', 'para pasarlo bien'), premium: makeOptionCopy('Premium', 'un pequeño lujo') }),
      country: makeQuestionCopy('8 · Dónde compras', '¿En qué país estás?', 'Así abrimos la tienda de Amazon que corresponde.', { ES: makeOptionCopy('España'), US: makeOptionCopy('Estados Unidos'), GB: makeOptionCopy('Reino Unido'), DE: makeOptionCopy('Alemania'), FR: makeOptionCopy('Francia'), IT: makeOptionCopy('Italia'), CA: makeOptionCopy('Canadá') })
    },
    seo: { eyebrow: 'Guía de regalos', title: 'Ideas de regalos de cumpleaños para acertar', intro: 'Un buen regalo de cumpleaños no tiene que ser caro ni complicado. Lo importante es que conecte con la relación que tienes con esa persona, con algo que disfruta y con el momento que vais a celebrar. Regalazo combina esas pistas para proponerte ideas útiles, originales y fáciles de buscar.', cards: [{ title: 'Regalos para tu pareja', description: 'Ideas con intención para celebrar juntos: recuerdos, planes compartidos y pequeños lujos que no se sienten impersonales.', link: 'Ver ideas para pareja' }, { title: 'Regalos de cumpleaños baratos', description: 'Detalles con criterio por menos de 20, 40 o 50 euros, sin caer en el regalo genérico de última hora.', link: 'Ver ideas económicas' }, { title: 'Guía para elegir mejor', description: 'Una guía rápida para pensar en intereses, presupuesto, estilo y ocasión antes de comprar.', link: 'Leer la guía completa' }], faqTitle: 'Preguntas frecuentes sobre regalos de cumpleaños', faqs: [{ question: '¿Cómo elijo un regalo de cumpleaños original?', answer: 'Empieza por algo que la persona ya disfruta y cambia el formato: un accesorio para su afición, un plan para compartir o un objeto cotidiano mejor elegido. La originalidad suele estar en el encaje, no en que sea extravagante.' }, { question: '¿Qué regalo puedo hacer con poco presupuesto?', answer: 'Con menos de 20 o 40 euros funcionan bien los detalles que crean un momento: una selección gourmet, un accesorio útil, un pequeño kit creativo o algo para una afición concreta. El recomendador permite filtrar por presupuesto.' }, { question: '¿Tengo que saber la edad exacta?', answer: 'No. Basta con elegir un rango aproximado. También puedes indicar que no lo sabes y dejar que el resto de señales —relación, ocasión, gusto y estilo— pese más.' }] },
    footer: ['Regalazo es un proyecto independiente. Los precios y la disponibilidad pueden cambiar.', 'En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.']
  },
  en: {
    locale: 'en', label: 'English', pickerLabel: 'Language', stepPrefix: 'Step ', stepJoin: ' of ',
    heroEyebrow: 'Gift ideas', heroTitle: 'Find a birthday gift that truly fits.', heroCopy: 'Tap through a few questions and discover 10 birthday gift ideas based on the person, the occasion, their interests and your budget.', heroNotes: [{ value: '8', label: 'taps' }, { value: '10', label: 'ideas' }, { value: 'no', label: 'sign-up' }],
    trust: [{ title: 'Thoughtful ideas', detail: 'A mix of classics and surprises' }, { title: 'Clear links', detail: 'We take you to a relevant search' }, { title: 'No account', detail: 'Your answers stay in your browser' }],
    keyboardHint: 'Tap an option and we will move to the next step. No names or descriptions needed.',
    messages: { choose: 'Choose an option to continue.', chooseInterest: 'Choose at least one interest to continue.', maxInterests: 'Choose up to 3 interests so the ideas stay focused.', multiHint: 'Choose up to 3 options', copied: 'Link copied.', copyHint: 'Copy this page link to share it.' },
    results: { ready: 'Your selection is ready', genericTitle: '10 ideas to get it right', relationTitle: '10 ideas for your {relation}.', intro: 'A mix of useful, original ideas with something to say. Open the ones that catch your eye and compare them in your local store.', chips: 'Your preferences', adjust: '← Adjust answers', refresh: 'See more ideas', share: 'Share selection', shareText: 'I found gift ideas on Regalazo 🎁', badge: 'Best match', price: '≈ €{price} · guide price', link: 'See options on Amazon', note: 'These are relevant searches, not specific product listings. Amazon may show other options, and prices or availability can change.' },
    questions: {
      relation: makeQuestionCopy('1 · For whom', 'What is your relationship with this person?', 'The relationship helps us find the right tone.', { partner: makeOptionCopy('Partner', 'something with intention'), parent: makeOptionCopy('Mother or father', 'a special detail'), sibling: makeOptionCopy('Sibling', 'with shared history'), friend: makeOptionCopy('Friend', 'to surprise them'), child: makeOptionCopy('Son or daughter', 'for their stage'), coworker: makeOptionCopy('Colleague', 'an easy win'), other: makeOptionCopy('Someone else', 'we will refine it later') }),
      gender: makeQuestionCopy('2 · Gender', 'Which gender best describes this person?', 'If you do not know or would rather not say, you can choose that option.', { woman: makeOptionCopy('Woman'), man: makeOptionCopy('Man'), nonbinary: makeOptionCopy('Non-binary person'), other: makeOptionCopy('Another identity'), 'prefer-not': makeOptionCopy('Prefer not to say'), unknown: makeOptionCopy('I do not know') }),
      age: makeQuestionCopy('3 · Age', 'What age range are they in?', 'An approximate range is perfect. You do not need the exact number.', { child: makeOptionCopy('Under 12'), teen: makeOptionCopy('12–17'), 'young-adult': makeOptionCopy('18–24'), adult: makeOptionCopy('25–34'), midlife: makeOptionCopy('35–49'), '50plus': makeOptionCopy('50 or older'), unknown: makeOptionCopy('I do not know') }),
      occasion: makeQuestionCopy('4 · Occasion', 'What are you celebrating?', 'The context changes the kind of gift that feels right.', { birthday: makeOptionCopy('Birthday'), anniversary: makeOptionCopy('Anniversary'), christmas: makeOptionCopy('Christmas'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Thank you'), justbecause: makeOptionCopy('Just because') }),
      budget: makeQuestionCopy('5 · Budget', 'How much do you want to spend?', 'We use the maximum as a guide, not a rule.', { under20: makeOptionCopy('Under €20'), '20to40': makeOptionCopy('€20–40'), '40to75': makeOptionCopy('€40–75'), '75to150': makeOptionCopy('€75–150'), over150: makeOptionCopy('Over €150') }),
      interests: makeQuestionCopy('6 · Their interests', 'What makes them tick?', 'Choose the interest that represents them best.', { tech: makeOptionCopy('Technology'), sport: makeOptionCopy('Sports'), food: makeOptionCopy('Food and flavors'), travel: makeOptionCopy('Travel'), beauty: makeOptionCopy('Personal care'), books: makeOptionCopy('Books'), gaming: makeOptionCopy('Games'), music: makeOptionCopy('Music'), home: makeOptionCopy('Home and calm'), creative: makeOptionCopy('Making things') }),
      style: makeQuestionCopy('7 · Style', 'What feeling do you want to create?', 'Choose the mood of the gift, even if you do not know the exact item yet.', { useful: makeOptionCopy('Useful', 'they will really use it'), original: makeOptionCopy('Original', 'they will not see it coming'), emotional: makeOptionCopy('Emotional', 'it says something'), fun: makeOptionCopy('Fun', 'for a good time'), premium: makeOptionCopy('Premium', 'a little luxury') }),
      country: makeQuestionCopy('8 · Where you shop', 'Which country are you in?', 'We will open the matching Amazon store.', { ES: makeOptionCopy('Spain'), US: makeOptionCopy('United States'), GB: makeOptionCopy('United Kingdom'), DE: makeOptionCopy('Germany'), FR: makeOptionCopy('France'), IT: makeOptionCopy('Italy'), CA: makeOptionCopy('Canada') })
    },
    seo: { eyebrow: 'Gift guide', title: 'Birthday gift ideas to get it right', intro: 'A good birthday gift does not have to be expensive or complicated. What matters is the connection with the person, something they enjoy and the moment you are celebrating. Regalazo combines those clues to suggest useful, original ideas that are easy to find.', cards: [{ title: 'Gifts for your partner', description: 'Thoughtful ideas for celebrating together: memories, shared plans and little luxuries that do not feel impersonal.', link: 'See partner gift ideas' }, { title: 'Affordable birthday gifts', description: 'Considered details under 20, 40 or 50 euros, without falling into the last-minute generic gift.', link: 'See budget ideas' }, { title: 'How to choose better', description: 'A quick guide to thinking about interests, budget, style and occasion before buying.', link: 'Read the full guide' }], faqTitle: 'Frequently asked questions about birthday gifts', faqs: [{ question: 'How do I choose an original birthday gift?', answer: 'Start with something the person already enjoys and change the format: an accessory for a hobby, a plan to share or a better-chosen everyday object. Originality is usually about the fit, not extravagance.' }, { question: 'What gift can I give on a small budget?', answer: 'Under 20 or 40 euros, details that create a moment work well: a gourmet selection, a useful accessory, a small creative kit or something for a specific hobby. The recommender lets you filter by budget.' }, { question: 'Do I need to know their exact age?', answer: 'No. An approximate range is enough. You can also say you do not know and let the other clues —relationship, occasion, interests and style— carry more weight.' }] },
    footer: ['Regalazo is an independent project. Prices and availability may change.', 'As an Amazon Associate, I may earn from qualifying purchases.']
  },
  de: {
    locale: 'de', label: 'Deutsch', pickerLabel: 'Sprache', stepPrefix: 'Schritt ', stepJoin: ' von ',
    heroEyebrow: 'Geschenkideen', heroTitle: 'Finde ein Geburtstagsgeschenk, das wirklich passt.', heroCopy: 'Tippe dich durch ein paar Fragen und entdecke 10 Geburtstagsgeschenke passend zur Person, zum Anlass, zu ihren Interessen und zu deinem Budget.', heroNotes: [{ value: '8', label: 'Tipps' }, { value: '10', label: 'Ideen' }, { value: 'ohne', label: 'Konto' }],
    trust: [{ title: 'Durchdachte Ideen', detail: 'Eine Mischung aus Klassikern und Überraschungen' }, { title: 'Klare Links', detail: 'Wir führen dich zu einer passenden Suche' }, { title: 'Kein Konto', detail: 'Deine Antworten bleiben im Browser' }],
    keyboardHint: 'Tippe eine Option an und wir gehen direkt zum nächsten Schritt. Namen und Beschreibungen sind nicht nötig.',
    messages: { choose: 'Wähle eine Option, um fortzufahren.', chooseInterest: 'Wähle mindestens ein Interesse.', maxInterests: 'Wähle bis zu 3 Interessen, damit die Ideen fokussiert bleiben.', multiHint: 'Du kannst bis zu 3 Optionen wählen', copied: 'Link kopiert.', copyHint: 'Kopiere den Link dieser Seite zum Teilen.' },
    results: { ready: 'Deine Auswahl ist fertig', genericTitle: '10 Ideen, die passen', relationTitle: '10 Ideen, die zu dieser Person passen.', intro: 'Eine Mischung aus nützlichen und originellen Ideen mit persönlicher Note. Öffne die Vorschläge, die dir gefallen, und vergleiche sie im passenden Shop.', chips: 'Deine Auswahl', adjust: '← Antworten ändern', refresh: 'Weitere Ideen', share: 'Auswahl teilen', shareText: 'Ich habe Geschenkideen bei Regalazo gefunden 🎁', badge: 'Beste Übereinstimmung', price: '≈ {price} € · Richtwert', link: 'Optionen auf Amazon ansehen', note: 'Dies sind passende Suchen, keine konkreten Produktangebote. Amazon kann andere Optionen anzeigen; Preise und Verfügbarkeit können sich ändern.' },
    questions: {
      relation: makeQuestionCopy('1 · Für wen', 'Welche Beziehung hast du zu dieser Person?', 'Die Beziehung hilft uns, den passenden Ton zu finden.', { partner: makeOptionCopy('Partner/in', 'mit persönlicher Note'), parent: makeOptionCopy('Mutter oder Vater', 'ein besonderes Detail'), sibling: makeOptionCopy('Geschwister', 'mit Verbundenheit'), friend: makeOptionCopy('Freund/in', 'zum Überraschen'), child: makeOptionCopy('Sohn oder Tochter', 'passend zum Alter'), coworker: makeOptionCopy('Kolleg/in', 'unkompliziert passend'), other: makeOptionCopy('Andere Person', 'das verfeinern wir später') }),
      gender: makeQuestionCopy('2 · Geschlecht', 'Welches Geschlecht beschreibt die Person am besten?', 'Wenn du es nicht weißt oder nicht sagen möchtest, kannst du diese Option wählen.', { woman: makeOptionCopy('Frau'), man: makeOptionCopy('Mann'), nonbinary: makeOptionCopy('Nicht-binäre Person'), other: makeOptionCopy('Andere Identität'), 'prefer-not': makeOptionCopy('Möchte ich nicht sagen'), unknown: makeOptionCopy('Ich weiß es nicht') }),
      age: makeQuestionCopy('3 · Alter', 'In welcher Altersgruppe ist die Person?', 'Eine ungefähre Angabe reicht völlig. Die genaue Zahl musst du nicht kennen.', { child: makeOptionCopy('Unter 12'), teen: makeOptionCopy('12–17'), 'young-adult': makeOptionCopy('18–24'), adult: makeOptionCopy('25–34'), midlife: makeOptionCopy('35–49'), '50plus': makeOptionCopy('50 oder älter'), unknown: makeOptionCopy('Ich weiß es nicht') }),
      occasion: makeQuestionCopy('4 · Anlass', 'Was feiert ihr?', 'Der Anlass verändert, welches Geschenk sich richtig anfühlt.', { birthday: makeOptionCopy('Geburtstag'), anniversary: makeOptionCopy('Jahrestag'), christmas: makeOptionCopy('Weihnachten'), 'secret-santa': makeOptionCopy('Wichteln'), thankyou: makeOptionCopy('Dankeschön'), justbecause: makeOptionCopy('Einfach so') }),
      budget: makeQuestionCopy('5 · Budget', 'Wie viel möchtest du ausgeben?', 'Wir nutzen den Höchstbetrag als Orientierung, nicht als Pflicht.', { under20: makeOptionCopy('Unter 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Über 150 €') }),
      interests: makeQuestionCopy('6 · Interessen', 'Wofür begeistert sich die Person?', 'Wähle das Interesse, das am besten passt.', { tech: makeOptionCopy('Technik'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Kochen und Genuss'), travel: makeOptionCopy('Reisen'), beauty: makeOptionCopy('Pflege'), books: makeOptionCopy('Bücher'), gaming: makeOptionCopy('Spiele'), music: makeOptionCopy('Musik'), home: makeOptionCopy('Zuhause und Ruhe'), creative: makeOptionCopy('Kreativ sein') }),
      style: makeQuestionCopy('7 · Stil', 'Welche Stimmung soll das Geschenk auslösen?', 'Wähle die Richtung des Geschenks, auch wenn du den konkreten Artikel noch nicht kennst.', { useful: makeOptionCopy('Nützlich', 'wird wirklich verwendet'), original: makeOptionCopy('Originell', 'damit rechnet niemand'), emotional: makeOptionCopy('Emotional', 'sagt etwas aus'), fun: makeOptionCopy('Lustig', 'für gute Laune'), premium: makeOptionCopy('Hochwertig', 'ein kleiner Luxus') }),
      country: makeQuestionCopy('8 · Einkaufsland', 'In welchem Land bist du?', 'Wir öffnen den passenden Amazon-Shop.', { ES: makeOptionCopy('Spanien'), US: makeOptionCopy('Vereinigte Staaten'), GB: makeOptionCopy('Vereinigtes Königreich'), DE: makeOptionCopy('Deutschland'), FR: makeOptionCopy('Frankreich'), IT: makeOptionCopy('Italien'), CA: makeOptionCopy('Kanada') })
    },
    seo: { eyebrow: 'Geschenkguide', title: 'Geburtstagsgeschenke, die wirklich passen', intro: 'Ein gutes Geburtstagsgeschenk muss weder teuer noch kompliziert sein. Entscheidend sind die Beziehung, etwas, das die Person mag, und der Anlass. Regalazo verbindet diese Hinweise zu nützlichen, originellen und leicht auffindbaren Ideen.', cards: [{ title: 'Geschenke für deine Partnerperson', description: 'Ideen mit persönlicher Note: gemeinsame Erinnerungen, Pläne und kleine Luxusmomente.', link: 'Ideen für Partner ansehen' }, { title: 'Günstige Geburtstagsgeschenke', description: 'Durchdachte Details unter 20, 40 oder 50 Euro statt eines beliebigen Last-Minute-Geschenks.', link: 'Budget-Ideen ansehen' }, { title: 'Besser auswählen', description: 'Ein kurzer Guide zu Interessen, Budget, Stil und Anlass vor dem Kauf.', link: 'Guide lesen' }], faqTitle: 'Häufige Fragen zu Geburtstagsgeschenken', faqs: [{ question: 'Wie finde ich ein originelles Geburtstagsgeschenk?', answer: 'Beginne mit etwas, das die Person bereits mag, und ändere das Format: ein Zubehör für ein Hobby, ein gemeinsamer Plan oder ein besser ausgewählter Alltagsgegenstand. Originalität liegt meist in der Passung.' }, { question: 'Was kann ich mit kleinem Budget schenken?', answer: 'Unter 20 oder 40 Euro funktionieren Details, die einen Moment schaffen: eine Feinkostauswahl, ein nützliches Accessoire, ein kleines Kreativset oder etwas für ein konkretes Hobby.' }, { question: 'Muss ich das genaue Alter wissen?', answer: 'Nein. Eine ungefähre Altersgruppe reicht. Du kannst auch angeben, dass du es nicht weißt, und die anderen Hinweise stärker gewichten lassen.' }] },
    footer: ['Regalazo ist ein unabhängiges Projekt. Preise und Verfügbarkeit können sich ändern.', 'Als Amazon-Partner kann ich an qualifizierten Käufen verdienen.']
  },
  fr: {
    locale: 'fr', label: 'Français', pickerLabel: 'Langue', stepPrefix: 'Étape ', stepJoin: ' sur ',
    heroEyebrow: 'Idées cadeaux', heroTitle: 'Trouvez un cadeau d’anniversaire qui lui correspond vraiment.', heroCopy: 'Répondez à quelques questions en appuyant sur l’écran et découvrez 10 idées selon la personne, l’occasion, ses goûts et votre budget.', heroNotes: [{ value: '8', label: 'touches' }, { value: '10', label: 'idées' }, { value: 'sans', label: 'compte' }],
    trust: [{ title: 'Idées choisies', detail: 'Un mélange de classiques et de surprises' }, { title: 'Liens clairs', detail: 'Nous ouvrons une recherche pertinente' }, { title: 'Sans compte', detail: 'Vos réponses restent dans votre navigateur' }],
    keyboardHint: 'Touchez une option pour passer directement à l’étape suivante. Aucun nom ni description à écrire.',
    messages: { choose: 'Choisissez une option pour continuer.', chooseInterest: 'Choisissez au moins un goût pour continuer.', maxInterests: 'Choisissez jusqu’à 3 goûts pour garder des idées ciblées.', multiHint: 'Vous pouvez choisir jusqu’à 3 options', copied: 'Lien copié.', copyHint: 'Copiez le lien de cette page pour la partager.' },
    results: { ready: 'Votre sélection est prête', genericTitle: '10 idées pour faire mouche', relationTitle: '10 idées qui correspondent à votre {relation}.', intro: 'Un mélange d’idées utiles et originales, avec une vraie intention. Ouvrez celles qui vous attirent et comparez-les dans votre boutique locale.', chips: 'Vos préférences', adjust: '← Modifier les réponses', refresh: 'Voir d’autres idées', share: 'Partager la sélection', shareText: 'J’ai trouvé des idées cadeaux sur Regalazo 🎁', badge: 'Meilleure idée', price: '≈ {price} € · budget indicatif', link: 'Voir les options sur Amazon', note: 'Ce sont des recherches pertinentes, pas des fiches produit précises. Amazon peut afficher d’autres options et les prix ou la disponibilité peuvent changer.' },
    questions: {
      relation: makeQuestionCopy('1 · Pour qui', 'Quelle relation avez-vous avec cette personne ?', 'Le lien aide à trouver le ton juste.', { partner: makeOptionCopy('Partenaire', 'avec une intention'), parent: makeOptionCopy('Mère ou père', 'une attention spéciale'), sibling: makeOptionCopy('Frère ou sœur', 'avec complicité'), friend: makeOptionCopy('Ami(e)', 'pour le surprendre'), child: makeOptionCopy('Fils ou fille', 'selon son âge'), coworker: makeOptionCopy('Collègue', 'une valeur sûre'), other: makeOptionCopy('Autre personne', 'nous affinerons ensuite') }),
      gender: makeQuestionCopy('2 · Genre', 'Quel genre décrit le mieux cette personne ?', 'Si vous ne savez pas ou préférez ne pas le dire, vous pouvez choisir cette option.', { woman: makeOptionCopy('Femme'), man: makeOptionCopy('Homme'), nonbinary: makeOptionCopy('Personne non binaire'), other: makeOptionCopy('Autre identité'), 'prefer-not': makeOptionCopy('Je préfère ne pas le dire'), unknown: makeOptionCopy('Je ne sais pas') }),
      age: makeQuestionCopy('3 · Âge', 'Dans quelle tranche d’âge est-elle ?', 'Une estimation suffit. Vous n’avez pas besoin de connaître le nombre exact.', { child: makeOptionCopy('Moins de 12 ans'), teen: makeOptionCopy('12–17 ans'), 'young-adult': makeOptionCopy('18–24 ans'), adult: makeOptionCopy('25–34 ans'), midlife: makeOptionCopy('35–49 ans'), '50plus': makeOptionCopy('50 ans ou plus'), unknown: makeOptionCopy('Je ne sais pas') }),
      occasion: makeQuestionCopy('4 · Occasion', 'Que célébrez-vous ?', 'Le contexte change beaucoup le type de cadeau qui convient.', { birthday: makeOptionCopy('Anniversaire'), anniversary: makeOptionCopy('Anniversaire de couple'), christmas: makeOptionCopy('Noël'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Remerciement'), justbecause: makeOptionCopy('Juste comme ça') }),
      budget: makeQuestionCopy('5 · Budget', 'Combien souhaitez-vous dépenser ?', 'Le maximum sert de repère, pas d’obligation.', { under20: makeOptionCopy('Moins de 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Plus de 150 €') }),
      interests: makeQuestionCopy('6 · Ses goûts', 'Qu’est-ce qui la fait vibrer ?', 'Choisissez le goût qui lui ressemble le plus.', { tech: makeOptionCopy('Technologie'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Cuisine et saveurs'), travel: makeOptionCopy('Voyages'), beauty: makeOptionCopy('Soin de soi'), books: makeOptionCopy('Livres'), gaming: makeOptionCopy('Jeux'), music: makeOptionCopy('Musique'), home: makeOptionCopy('Maison et calme'), creative: makeOptionCopy('Créer') }),
      style: makeQuestionCopy('7 · Style', 'Quelle sensation voulez-vous provoquer ?', 'Choisissez l’esprit du cadeau, même si vous ne connaissez pas encore l’objet.', { useful: makeOptionCopy('Utile', 'elle s’en servira vraiment'), original: makeOptionCopy('Original', 'pour surprendre'), emotional: makeOptionCopy('Émotionnel', 'pour dire quelque chose'), fun: makeOptionCopy('Amusant', 'pour passer un bon moment'), premium: makeOptionCopy('Premium', 'un petit luxe') }),
      country: makeQuestionCopy('8 · Où acheter', 'Dans quel pays êtes-vous ?', 'Nous ouvrirons la boutique Amazon correspondante.', { ES: makeOptionCopy('Espagne'), US: makeOptionCopy('États-Unis'), GB: makeOptionCopy('Royaume-Uni'), DE: makeOptionCopy('Allemagne'), FR: makeOptionCopy('France'), IT: makeOptionCopy('Italie'), CA: makeOptionCopy('Canada') })
    },
    seo: { eyebrow: 'Guide cadeaux', title: 'Idées de cadeaux d’anniversaire pour viser juste', intro: 'Un bon cadeau d’anniversaire n’a pas besoin d’être cher ou compliqué. Ce qui compte, c’est le lien avec la personne, ce qu’elle aime et le moment célébré. Regalazo combine ces indices pour proposer des idées utiles, originales et faciles à trouver.', cards: [{ title: 'Cadeaux pour votre partenaire', description: 'Des idées attentionnées pour célébrer ensemble : souvenirs, projets partagés et petits luxes.', link: 'Voir les idées pour partenaire' }, { title: 'Cadeaux d’anniversaire pas chers', description: 'Des attentions choisies à moins de 20, 40 ou 50 euros, sans cadeau générique de dernière minute.', link: 'Voir les idées petit budget' }, { title: 'Mieux choisir son cadeau', description: 'Un guide rapide pour penser aux goûts, au budget, au style et à l’occasion.', link: 'Lire le guide complet' }], faqTitle: 'Questions fréquentes sur les cadeaux d’anniversaire', faqs: [{ question: 'Comment choisir un cadeau d’anniversaire original ?', answer: 'Partez de quelque chose que la personne aime déjà et changez le format : un accessoire pour son loisir, une activité à partager ou un objet du quotidien mieux choisi. L’originalité est souvent dans la pertinence.' }, { question: 'Quel cadeau offrir avec un petit budget ?', answer: 'Avec moins de 20 ou 40 euros, les détails qui créent un moment fonctionnent bien : une sélection gourmande, un accessoire utile, un petit kit créatif ou quelque chose pour un loisir précis.' }, { question: 'Faut-il connaître l’âge exact ?', answer: 'Non. Une tranche approximative suffit. Vous pouvez aussi indiquer que vous ne savez pas et laisser les autres indices peser davantage.' }] },
    footer: ['Regalazo est un projet indépendant. Les prix et la disponibilité peuvent changer.', 'En tant qu’associé Amazon, je peux percevoir des revenus sur les achats admissibles.']
  },
  it: {
    locale: 'it', label: 'Italiano', pickerLabel: 'Lingua', stepPrefix: 'Passo ', stepJoin: ' di ',
    heroEyebrow: 'Idee regalo', heroTitle: 'Trova un regalo di compleanno che sia davvero azzeccato.', heroCopy: 'Rispondi con pochi tocchi e scopri 10 idee regalo in base alla persona, all’occasione, ai suoi interessi e al tuo budget.', heroNotes: [{ value: '8', label: 'tocchi' }, { value: '10', label: 'idee' }, { value: 'senza', label: 'account' }],
    trust: [{ title: 'Idee pensate', detail: 'Un mix di classici e sorprese' }, { title: 'Link chiari', detail: 'Ti portiamo a una ricerca pertinente' }, { title: 'Senza account', detail: 'Le tue risposte restano nel browser' }],
    keyboardHint: 'Tocca un’opzione e passeremo subito alla domanda successiva. Non servono nomi o descrizioni.',
    messages: { choose: 'Scegli un’opzione per continuare.', chooseInterest: 'Scegli almeno un interesse per continuare.', maxInterests: 'Scegli fino a 3 interessi per mantenere le idee mirate.', multiHint: 'Puoi scegliere fino a 3 opzioni', copied: 'Link copiato.', copyHint: 'Copia il link di questa pagina per condividerla.' },
    results: { ready: 'La tua selezione è pronta', genericTitle: '10 idee per fare centro', relationTitle: '10 idee regalo che fanno centro per questa persona.', intro: 'Un mix di idee utili e originali, con qualcosa da raccontare. Apri quelle che ti attirano e confrontale nel tuo negozio locale.', chips: 'Le tue preferenze', adjust: '← Modifica risposte', refresh: 'Vedi altre idee', share: 'Condividi selezione', shareText: 'Ho trovato idee regalo su Regalazo 🎁', badge: 'Abbinamento migliore', price: '≈ {price} € · budget indicativo', link: 'Vedi opzioni su Amazon', note: 'Sono ricerche pertinenti, non schede di prodotti specifici. Amazon può mostrare altre opzioni e prezzi o disponibilità possono cambiare.' },
    questions: {
      relation: makeQuestionCopy('1 · Per chi', 'Che rapporto hai con questa persona?', 'Il rapporto aiuta a trovare il tono giusto.', { partner: makeOptionCopy('Partner', 'qualcosa con intenzione'), parent: makeOptionCopy('Mamma o papà', 'un dettaglio speciale'), sibling: makeOptionCopy('Fratello o sorella', 'con complicità'), friend: makeOptionCopy('Amico/a', 'per sorprenderlo/a'), child: makeOptionCopy('Figlio/a', 'in base alla sua età'), coworker: makeOptionCopy('Collega', 'una scelta semplice'), other: makeOptionCopy('Altra persona', 'lo definiremo dopo') }),
      gender: makeQuestionCopy('2 · Genere', 'Quale genere descrive meglio questa persona?', 'Se non lo sai o preferisci non dirlo, puoi scegliere questa opzione.', { woman: makeOptionCopy('Donna'), man: makeOptionCopy('Uomo'), nonbinary: makeOptionCopy('Persona non binaria'), other: makeOptionCopy('Altra identità'), 'prefer-not': makeOptionCopy('Preferisco non dirlo'), unknown: makeOptionCopy('Non lo so') }),
      age: makeQuestionCopy('3 · Età', 'In quale fascia d’età si trova?', 'Una stima va benissimo. Non serve conoscere il numero esatto.', { child: makeOptionCopy('Meno di 12'), teen: makeOptionCopy('12–17'), 'young-adult': makeOptionCopy('18–24'), adult: makeOptionCopy('25–34'), midlife: makeOptionCopy('35–49'), '50plus': makeOptionCopy('50 o più'), unknown: makeOptionCopy('Non lo so') }),
      occasion: makeQuestionCopy('4 · Occasione', 'Che cosa state festeggiando?', 'Il contesto cambia molto il tipo di regalo più adatto.', { birthday: makeOptionCopy('Compleanno'), anniversary: makeOptionCopy('Anniversario'), christmas: makeOptionCopy('Natale'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Ringraziamento'), justbecause: makeOptionCopy('Perché sì') }),
      budget: makeQuestionCopy('5 · Budget', 'Quanto vuoi spendere?', 'Usiamo il massimo come riferimento, non come obbligo.', { under20: makeOptionCopy('Meno di 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Più di 150 €') }),
      interests: makeQuestionCopy('6 · I suoi interessi', 'Che cosa lo/a appassiona?', 'Scegli l’interesse che lo/a rappresenta di più.', { tech: makeOptionCopy('Tecnologia'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Cucina e sapori'), travel: makeOptionCopy('Viaggi'), beauty: makeOptionCopy('Cura personale'), books: makeOptionCopy('Libri'), gaming: makeOptionCopy('Giochi'), music: makeOptionCopy('Musica'), home: makeOptionCopy('Casa e calma'), creative: makeOptionCopy('Creare cose') }),
      style: makeQuestionCopy('7 · Stile', 'Che sensazione vuoi provocare?', 'Scegli lo stile del regalo, anche se non sai ancora quale sarà.', { useful: makeOptionCopy('Utile', 'lo userà davvero'), original: makeOptionCopy('Originale', 'per sorprenderlo/a'), emotional: makeOptionCopy('Emotivo', 'per dire qualcosa'), fun: makeOptionCopy('Divertente', 'per stare bene insieme'), premium: makeOptionCopy('Premium', 'un piccolo lusso') }),
      country: makeQuestionCopy('8 · Dove acquisti', 'In quale Paese ti trovi?', 'Apriremo il negozio Amazon corrispondente.', { ES: makeOptionCopy('Spagna'), US: makeOptionCopy('Stati Uniti'), GB: makeOptionCopy('Regno Unito'), DE: makeOptionCopy('Germania'), FR: makeOptionCopy('Francia'), IT: makeOptionCopy('Italia'), CA: makeOptionCopy('Canada') })
    },
    seo: { eyebrow: 'Guida ai regali', title: 'Idee regalo di compleanno per andare sul sicuro', intro: 'Un buon regalo di compleanno non deve essere costoso o complicato. Conta il rapporto con la persona, ciò che le piace e il momento da festeggiare. Regalazo combina questi indizi per proporti idee utili, originali e facili da trovare.', cards: [{ title: 'Regali per il tuo partner', description: 'Idee pensate per festeggiare insieme: ricordi, progetti condivisi e piccoli lussi.', link: 'Vedi idee per partner' }, { title: 'Regali di compleanno economici', description: 'Dettagli scelti sotto i 20, 40 o 50 euro, senza il solito regalo generico dell’ultimo minuto.', link: 'Vedi idee economiche' }, { title: 'Come scegliere meglio', description: 'Una guida rapida a interessi, budget, stile e occasione prima di comprare.', link: 'Leggi la guida completa' }], faqTitle: 'Domande frequenti sui regali di compleanno', faqs: [{ question: 'Come scelgo un regalo di compleanno originale?', answer: 'Parti da qualcosa che la persona ama già e cambia formato: un accessorio per un hobby, un’attività da condividere o un oggetto quotidiano scelto meglio. L’originalità spesso sta nell’abbinamento.' }, { question: 'Che regalo posso fare con un budget ridotto?', answer: 'Sotto i 20 o 40 euro funzionano bene i dettagli che creano un momento: una selezione gourmet, un accessorio utile, un piccolo kit creativo o qualcosa per un hobby preciso.' }, { question: 'Devo conoscere l’età esatta?', answer: 'No. Basta una fascia approssimativa. Puoi anche dire che non lo sai e lasciare che gli altri indizi pesino di più.' }] },
    footer: ['Regalazo è un progetto indipendente. Prezzi e disponibilità possono cambiare.', 'In qualità di Associato Amazon, posso ricevere compensi sugli acquisti idonei.']
  }
};

var ANALYTICS_CONFIG = Object.freeze({
  provider: 'mixpanel',
  enabled: true,
  token: '7a393adbe60cb8cd073e9aaf44263a33',
  version: 'growth-v2',
  scriptUrl: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js',
  apiHost: 'https://api-eu.mixpanel.com'
});
var ANALYTICS_CONSENT_COPY = {
  es: { title: '¿Nos ayudas a mejorar Regalazo?', text: 'Podemos usar analítica anónima para saber qué funciona y mejorar las recomendaciones. No guardamos nombres, emails ni texto libre.', accept: 'Aceptar analítica', reject: 'Ahora no', preferences: 'Preferencias de analítica' },
  en: { title: 'Help us improve Regalazo?', text: 'We use anonymous analytics to see what works and improve recommendations. We do not store names, emails or free text.', accept: 'Allow analytics', reject: 'Not now', preferences: 'Analytics preferences' },
  de: { title: 'Regalazo verbessern?', text: 'Anonyme Analysen helfen uns zu sehen, was funktioniert und Empfehlungen zu verbessern. Wir speichern keine Namen, E-Mails oder freien Texte.', accept: 'Analytik erlauben', reject: 'Jetzt nicht', preferences: 'Analyse-Einstellungen' },
  fr: { title: 'Nous aider à améliorer Regalazo ?', text: 'Nous pouvons utiliser des statistiques anonymes pour améliorer les recommandations. Nous ne conservons ni noms, ni e-mails, ni texte libre.', accept: 'Autoriser les statistiques', reject: 'Pas maintenant', preferences: 'Préférences statistiques' },
  it: { title: 'Ci aiuti a migliorare Regalazo?', text: 'Possiamo usare analisi anonime per capire cosa funziona e migliorare i consigli. Non conserviamo nomi, email o testo libero.', accept: 'Consenti analisi', reject: 'Non ora', preferences: 'Preferenze analisi' }
};
var ANALYTICS_CONSENT_STORAGE_KEY = 'regalazo-analytics-consent-v1';
var ANALYTICS_QUEUE = [];
var analyticsConsentState = null;
var analyticsScriptLoading = false;
var analyticsReady = false;


var GIFT_TITLE_COPY = {
  en: {
    'mini-photo-printer': 'Mini photo printer for memories', 'coffee-kit': 'Specialty coffee ritual', 'tea-ritual': 'Tea break set', 'portable-speaker': 'Speaker for a soundtrack', 'e-reader': 'E-reader for getting lost in stories', 'book-light': 'Neck reading light', 'botanical-puzzle': 'Art puzzle to unwind', 'botanical-lego': 'Flowers that need no water', 'couple-board-game': 'Board game for two', 'travel-organizer': 'Travel cable organizer', 'packing-cubes': 'Better organized luggage', 'card-holder': 'Card holder for every day', 'mechanical-keyboard': 'Keyboard to work or play better', 'earbuds': 'Earbuds for their everyday moments', 'usbc-hub': 'Hub to connect everything', 'resistance-bands': 'A workout that fits at home', 'yoga-mat': 'Mat to slow down', 'running-belt': 'Belt for running light', 'chocolate-box': 'Box of chocolates with a story', 'hot-sauce-set': 'Spicy sauce tasting route', 'skincare-set': 'Unhurried self-care kit', 'selfcare-candle': 'Candle to change the mood', 'herb-garden': 'Mini kitchen herb garden', 'chef-knife': 'A tool for better cooking', 'instant-camera': 'Camera for instant photos', 'fountain-pen': 'Notebook and pen for ideas', 'watercolor-kit': 'Creative kit without instructions', 'portable-projector': 'Impromptu cinema on any wall', 'massage-gun': 'Recovery after moving', 'digital-luggage-scale': 'The scale that avoids surprises', 'digital-photo-frame': 'Photos that change on their own', 'urban-backpack': 'Backpack for every day', 'powerbank': 'Battery to stay charged', 'date-night-box': 'At-home date night box', 'movie-night-kit': 'Home cinema kit', 'picnic-set': 'Set for an impromptu picnic', 'cocktail-kit': 'Cocktail-making kit', 'spice-rack': 'World spices collection', 'pasta-maker': 'Fresh pasta-making kit', 'wireless-charging-station': 'Charging station to keep everything close', 'smart-speaker': 'Smart speaker for the home', 'monitor-light-bar': 'Light to upgrade the desk', 'webcam-light': 'Compact light for video calls', 'card-game': 'Conversation card game', 'cooperative-board-game': 'Cooperative game for an afternoon', 'gaming-headset': 'Headset for their setup', 'foam-roller': 'Post-workout recovery kit', 'hiking-bottle': 'Durable bottle for their routes', 'fitness-tracker': 'Band to move more', 'hiking-headlamp': 'Headlamp for getaways', 'toiletry-bag': 'Well-organized wash bag', 'passport-wallet': 'Travel wallet for light packing', 'weekend-bag': 'Weekend getaway bag', 'travel-pillow': 'Comfortable pillow for travelling', 'photo-album': 'Album for arranging memories', 'custom-map-print': 'Map of an important place', 'photo-light-box': 'Light box with a special photo', 'memory-journal': 'Journal to fill with stories', 'calligraphy-kit': 'Lettering kit to get started', 'model-building-kit': 'Model kit to build at your own pace', 'bath-salts-set': 'Bath set to slow down', 'sleep-mask': 'Sleep mask and a small rest ritual', 'standing-mirror': 'Stylish tabletop mirror', 'room-diffuser': 'Diffuser to change the atmosphere', 'cozy-blanket': 'Soft blanket for sofa time', 'desk-organizer': 'Beautiful desk organizer', 'cookbook': 'Recipe book to whet the appetite', 'bookstand': 'Stand for reading or cooking', 'vinyl-record': 'A vinyl record to listen to slowly', 'midi-keyboard': 'Keyboard to play with music', 'noise-cancelling-headphones': 'Headphones for a little quiet', 'instant-film-pack': 'Instant film pack', 'smartwatch': 'Watch for everyday life', 'coffee-grinder': 'Grinder to improve the coffee', 'cast-iron-pot': 'Pot for slow cooking', 'digital-notebook': 'Digital notebook for writing and planning', 'portable-mic': 'Microphone for creating or singing', 'lego-architecture': 'Architecture build to display', 'backgammon-set': 'Backgammon for long afternoons', 'spa-headband-set': 'Self-care set to switch off', 'tea-subscription': 'Tea selection to discover', 'sauce-making-kit': 'Homemade sauce kit', 'reusable-cup': 'Reusable cup for their mornings',     'personalized-keychain': 'Personalized keychain for a shared memory', 'couples-question-cards': 'Question cards for two', 'memory-box': 'Box for keeping little memories', 'photo-calendar': 'Photo calendar for the whole year', 'experience-scratch-card': 'Scratch cards for future plans', 'portable-espresso-maker': 'Specialty coffee to take anywhere', 'milk-frother': 'Frother for better coffee', 'pizza-stone': 'Pizza stone for home cooking', 'baking-kit': 'Baking kit for something delicious', 'olive-oil-tasting': 'Olive oil tasting for the table', 'smart-tracker-tag': 'Tracker for the important things', 'wireless-mouse': 'Comfortable mouse for the desk', 'phone-tripod': 'Tripod for hands-free filming', 'portable-ssd': 'Fast drive for their projects', 'smart-plug': 'Smart plug to simplify the home', 'tablet-stand': 'Stand for reading or watching', 'travel-adapter': 'Adapter for worry-free travel', 'travel-journal': 'Journal for future journeys', 'dry-bag': 'Dry bag for outdoor escapes', 'travel-coffee-mug': 'Travel mug for mornings away', 'massage-ball': 'Massage ball to release tension', 'gym-towel-set': 'Light towels for training', 'running-socks': 'Technical socks for moving better', 'bike-multitool': 'Multitool for their bicycle', 'pickleball-set': 'Set for trying a new sport', 'hand-care-set': 'Hand care set', 'weighted-eye-mask': 'Relaxing eye mask to switch off', 'sleep-sound-machine': 'Soft sounds for better sleep', 'heated-mug': 'Base to keep coffee warm', 'sunglasses': 'Sunglasses for outdoor plans', 'leather-belt': 'Belt that goes with everything', 'bookends': 'Bookends for a tidier shelf', 'reading-journal': 'Journal for tracking their reading', 'embroidery-kit': 'Embroidery kit to create slowly', 'paint-by-numbers': 'Paint-by-numbers artwork', 'record-cleaning-kit': 'Kit for caring for vinyl records', 'karaoke-mic': 'Microphone for singing without shame', 'vinyl-display-frame': 'Frame for displaying a favourite record', 'trivia-game': 'Question game for laughing together', 'escape-room-game': 'Escape room to solve at home', 'poker-set': 'Poker set for game nights', 'plant-watering-kit': 'Kit for caring for their plants', 'bird-feeder': 'Feeder for watching nature', 'electric-blanket': 'Electric blanket for sofa evenings', 'mini-waffle-maker': 'Mini waffle maker for planned breakfasts', 'beer-tasting-set': 'Beer tasting set', 'scented-hand-cream': 'Hand cream with a special scent', 'plant-care-tools': 'Pretty tools for their green corner', 'crossbody-bag': 'Crossbody bag for travelling light', 'mug-warmer': 'Mug warmer for the desk',     'coffee-scoop': 'Measuring spoon for their coffee', 'tea-towel-set': 'Designed kitchen towels', 'bottle-opener': 'Bottle opener for long lunches', 'silicone-ice-tray': 'Ice mould for original drinks', 'mini-cutting-board': 'Small board for nibbles', 'lunch-bag': 'Insulated bag for packed lunches', 'fruit-infuser-bottle': 'Bottle for flavoured water', 'spice-spoon-set': 'Measuring spoons for cooking', 'pancake-spatula': 'Spatula for special breakfasts', 'coffee-clip': 'Clip to keep coffee fresh', 'charging-cable-set': 'Cable pack for taking everything', 'phone-grip': 'Finger grip for the phone', 'usb-desk-lamp': 'USB light for the desk', 'webcam-cover': 'Covers to protect the webcam', 'keyring-multitool': 'Multitool to carry on the keys', 'luggage-tag': 'Personality-packed luggage tag', 'travel-cutlery': 'Reusable cutlery to take along', 'shoe-bag': 'Bag for storing trainers', 'resistance-loop': 'Mini bands for training anywhere', 'hand-warmer': 'Hand warmer for cold days', 'mini-candle-set': 'Trio of candles to change the mood', 'bath-bomb-set': 'Bath bombs for a little break', 'gel-pens': 'Gel pen set for beautiful writing', 'bookmark-set': 'Bookmark pack for their reading', 'dice-set': 'Pretty dice for game nights', 'puzzle-cube': 'Cube to keep their hands busy', 'sticker-pack': 'Stickers to personalise their things',     'tea-infuser': 'Pretty infuser for their breaks', 'hot-chocolate-kit': 'Hot chocolate making kit', 'coffee-syrup-set': 'Syrup set to vary their coffee', 'gourmet-snack-box': 'Snack box to share', 'spice-blend-set': 'Small set of spice blends', 'kitchen-timer': 'Charming kitchen timer', 'herb-scissors': 'Scissors for fresh herbs', 'cookie-stamp': 'Stamp for homemade cookies', 'water-bottle': 'Light bottle for every day', 'phone-stand': 'Stand to keep the phone in view', 'cable-pouch': 'Small cable pouch', 'screen-cleaning-kit': 'Kit for keeping screens clean', 'mini-notebook': 'Notebook for quick ideas', 'magnetic-bookmark': 'Magnetic bookmark for their books', 'bookplate-stamp': 'Stamp for marking their library', 'mini-puzzle': 'Small puzzle for a break', 'party-card-game': 'Card game for any gathering', 'plant-mister': 'Mister for their green corner', 'socks-gift-box': 'Personality-packed sock set', 'lip-balm-set': 'Lip balm set to take anywhere'
  },
  de: {
    'mini-photo-printer': 'Mini-Fotodrucker für Erinnerungen', 'coffee-kit': 'Ritual für Spezialitätenkaffee', 'tea-ritual': 'Teeset für eine kleine Pause', 'portable-speaker': 'Lautsprecher für den Soundtrack', 'e-reader': 'E-Reader für Geschichten', 'book-light': 'Leselampe zum Umhängen', 'botanical-puzzle': 'Kunstpuzzle zum Abschalten', 'botanical-lego': 'Blumen, die kein Wasser brauchen', 'couple-board-game': 'Brettspiel für zwei', 'travel-organizer': 'Kabel-Organizer für unterwegs', 'packing-cubes': 'Besser gepackter Koffer', 'card-holder': 'Kartenetui für jeden Tag', 'mechanical-keyboard': 'Tastatur für Arbeit und Gaming', 'earbuds': 'Kopfhörer für den Alltag', 'usbc-hub': 'Hub für alle Anschlüsse', 'resistance-bands': 'Training für zu Hause', 'yoga-mat': 'Matte zum Runterkommen', 'running-belt': 'Laufgürtel für unterwegs', 'chocolate-box': 'Pralinenbox mit Geschichte', 'hot-sauce-set': 'Scharfe Saucen zum Probieren', 'skincare-set': 'Pflegeset ohne Eile', 'selfcare-candle': 'Kerze für eine andere Stimmung', 'herb-garden': 'Mini-Kräutergarten für die Küche', 'chef-knife': 'Küchenwerkzeug fürs bessere Kochen', 'instant-camera': 'Kamera für Sofortbilder', 'fountain-pen': 'Notizbuch und Füller für Ideen', 'watercolor-kit': 'Kreativset ohne Anleitung', 'portable-projector': 'Kino an jeder Wand', 'massage-gun': 'Erholung nach dem Sport', 'digital-luggage-scale': 'Gepäckwaage gegen Überraschungen', 'digital-photo-frame': 'Digitaler Rahmen mit wechselnden Fotos', 'urban-backpack': 'Rucksack für den Alltag', 'powerbank': 'Powerbank für unterwegs', 'date-night-box': 'Box für einen Abend zu zweit zu Hause', 'movie-night-kit': 'Heimkino-Set', 'picnic-set': 'Set für ein spontanes Picknick', 'cocktail-kit': 'Cocktail-Set', 'spice-rack': 'Gewürzsammlung aus aller Welt', 'pasta-maker': 'Set für frische Pasta', 'wireless-charging-station': 'Ladestation für alles Wichtige', 'smart-speaker': 'Smarter Lautsprecher für zu Hause', 'monitor-light-bar': 'Licht für einen besseren Schreibtisch', 'webcam-light': 'Kompaktes Licht für Videocalls', 'card-game': 'Kartenspiel für gute Gespräche', 'cooperative-board-game': 'Kooperatives Spiel für einen Nachmittag', 'gaming-headset': 'Headset für das Gaming-Setup', 'foam-roller': 'Regenerationsset nach dem Training', 'hiking-bottle': 'Robuste Flasche für unterwegs', 'fitness-tracker': 'Fitnessband für mehr Bewegung', 'hiking-headlamp': 'Stirnlampe für Ausflüge', 'toiletry-bag': 'Gut organisierter Kulturbeutel', 'passport-wallet': 'Reiseetui für leichtes Gepäck', 'weekend-bag': 'Tasche für den Wochenendtrip', 'travel-pillow': 'Bequemes Kissen für unterwegs', 'photo-album': 'Album für schöne Erinnerungen', 'custom-map-print': 'Karte eines wichtigen Ortes', 'photo-light-box': 'Leuchtbox mit einem besonderen Foto', 'memory-journal': 'Tagebuch für gemeinsame Geschichten', 'calligraphy-kit': 'Lettering-Set zum Ausprobieren', 'model-building-kit': 'Modellbausatz im eigenen Tempo', 'bath-salts-set': 'Badeset zum Abschalten', 'sleep-mask': 'Schlafmaske für ein kleines Ruhe-Ritual', 'standing-mirror': 'Stilvoller Tischspiegel', 'room-diffuser': 'Diffuser für eine andere Atmosphäre', 'cozy-blanket': 'Weiche Decke für die Couch', 'desk-organizer': 'Schöner Schreibtisch-Organizer', 'cookbook': 'Kochbuch, das Appetit macht', 'bookstand': 'Ständer zum Lesen oder Kochen', 'vinyl-record': 'Eine Schallplatte zum bewussten Hören', 'midi-keyboard': 'Keyboard zum Musikmachen', 'noise-cancelling-headphones': 'Kopfhörer für ein wenig Ruhe', 'instant-film-pack': 'Packung Sofortbildfilm', 'smartwatch': 'Uhr für den Alltag', 'coffee-grinder': 'Mühle für besseren Kaffee', 'cast-iron-pot': 'Topf fürs langsame Kochen', 'digital-notebook': 'Digitales Notizbuch zum Schreiben und Planen', 'portable-mic': 'Mikrofon zum Erstellen oder Singen', 'lego-architecture': 'Architektur-Bausatz zum Ausstellen', 'backgammon-set': 'Backgammon für lange Nachmittage', 'spa-headband-set': 'Selfcare-Set zum Abschalten', 'tea-subscription': 'Teeauswahl zum Entdecken', 'sauce-making-kit': 'Set für hausgemachte Saucen', 'reusable-cup': 'Mehrwegbecher für den Morgen',     'personalized-keychain': 'Personalisiertes Schlüsselband für eine gemeinsame Erinnerung', 'couples-question-cards': 'Fragekarten für zwei', 'memory-box': 'Box für kleine Erinnerungen', 'photo-calendar': 'Fotokalender für das ganze Jahr', 'experience-scratch-card': 'Rubbelkarten für zukünftige Pläne', 'portable-espresso-maker': 'Spezialitätenkaffee für unterwegs', 'milk-frother': 'Milchaufschäumer für besseren Kaffee', 'pizza-stone': 'Pizzastein für zu Hause', 'baking-kit': 'Backset für etwas Leckeres', 'olive-oil-tasting': 'Olivenöl-Verkostung für den Tisch', 'smart-tracker-tag': 'Tracker für wichtige Dinge', 'wireless-mouse': 'Bequeme Maus für den Schreibtisch', 'phone-tripod': 'Stativ zum Filmen ohne Hilfe', 'portable-ssd': 'Schnelle Festplatte für die Projekte', 'smart-plug': 'Smarter Stecker für ein einfacheres Zuhause', 'tablet-stand': 'Halterung zum Lesen oder Schauen', 'travel-adapter': 'Adapter für entspanntes Reisen', 'travel-journal': 'Reisetagebuch für kommende Abenteuer', 'dry-bag': 'Wasserdichte Tasche für Ausflüge', 'travel-coffee-mug': 'Thermobecher für unterwegs', 'massage-ball': 'Massageball gegen Verspannungen', 'gym-towel-set': 'Leichte Handtücher fürs Training', 'running-socks': 'Funktionssocken für mehr Bewegung', 'bike-multitool': 'Multitool für das Fahrrad', 'pickleball-set': 'Set für eine neue Sportart', 'hand-care-set': 'Handpflege-Set', 'weighted-eye-mask': 'Entspannende Augenmaske zum Abschalten', 'sleep-sound-machine': 'Sanfte Klänge für besseren Schlaf', 'heated-mug': 'Untersetzer, der den Kaffee warm hält', 'sunglasses': 'Sonnenbrille für draußen', 'leather-belt': 'Gürtel, der zu allem passt', 'bookends': 'Buchstützen für ein ordentliches Regal', 'reading-journal': 'Lesetagebuch für die Büchersammlung', 'embroidery-kit': 'Stickset zum langsamen Gestalten', 'paint-by-numbers': 'Malen-nach-Zahlen-Bild', 'record-cleaning-kit': 'Set für die Pflege von Schallplatten', 'karaoke-mic': 'Mikrofon zum Singen ohne Scham', 'vinyl-display-frame': 'Rahmen für die Lieblingsplatte', 'trivia-game': 'Fragespiel zum gemeinsamen Lachen', 'escape-room-game': 'Escape Room für zu Hause', 'poker-set': 'Pokerkoffer für Spieleabende', 'plant-watering-kit': 'Set für die Pflanzenpflege', 'bird-feeder': 'Futterstelle zum Beobachten der Natur', 'electric-blanket': 'Heizdecke für gemütliche Sofaabende', 'mini-waffle-maker': 'Mini-Waffeleisen für besondere Frühstücke', 'beer-tasting-set': 'Bierverkostungs-Set', 'scented-hand-cream': 'Handcreme mit besonderem Duft', 'plant-care-tools': 'Schöne Werkzeuge für die grüne Ecke', 'crossbody-bag': 'Umhängetasche für leichtes Unterwegssein', 'mug-warmer': 'Tassenwärmer für den Schreibtisch',     'coffee-scoop': 'Messlöffel für den Kaffee', 'tea-towel-set': 'Geschirrtücher mit Design', 'bottle-opener': 'Flaschenöffner für lange Abende', 'silicone-ice-tray': 'Eisform für besondere Drinks', 'mini-cutting-board': 'Kleines Brett für Snacks', 'lunch-bag': 'Isolierte Tasche für unterwegs', 'fruit-infuser-bottle': 'Flasche für aromatisiertes Wasser', 'spice-spoon-set': 'Messlöffel zum Kochen', 'pancake-spatula': 'Pfannenwender für besondere Frühstücke', 'coffee-clip': 'Clip, der Kaffee frisch hält', 'charging-cable-set': 'Kabelset für unterwegs', 'phone-grip': 'Fingerhalterung für das Smartphone', 'usb-desk-lamp': 'USB-Licht für den Schreibtisch', 'webcam-cover': 'Abdeckungen für die Webcam', 'keyring-multitool': 'Multitool am Schlüsselbund', 'luggage-tag': 'Persönlicher Kofferanhänger', 'travel-cutlery': 'Mehrwegbesteck für unterwegs', 'shoe-bag': 'Tasche für Sportschuhe', 'resistance-loop': 'Minibänder für Training überall', 'hand-warmer': 'Handwärmer für kalte Tage', 'mini-candle-set': 'Drei Kerzen für eine andere Stimmung', 'bath-bomb-set': 'Badebomben für eine kleine Pause', 'gel-pens': 'Gelstift-Set zum schönen Schreiben', 'bookmark-set': 'Lesezeichen-Set für die Lektüre', 'dice-set': 'Schöne Würfel für Spieleabende', 'puzzle-cube': 'Würfel für beschäftigte Hände', 'sticker-pack': 'Sticker für persönliche Dinge',     'tea-infuser': 'Schöner Teesieb für kleine Pausen', 'hot-chocolate-kit': 'Set für heiße Schokolade', 'coffee-syrup-set': 'Sirupset für abwechslungsreichen Kaffee', 'gourmet-snack-box': 'Snackbox zum Teilen', 'spice-blend-set': 'Kleines Set mit Gewürzmischungen', 'kitchen-timer': 'Charmanter Küchentimer', 'herb-scissors': 'Schere für frische Kräuter', 'cookie-stamp': 'Stempel für selbstgemachte Kekse', 'water-bottle': 'Leichte Flasche für jeden Tag', 'phone-stand': 'Halterung für das Smartphone', 'cable-pouch': 'Kleine Tasche für Kabel', 'screen-cleaning-kit': 'Set für saubere Bildschirme', 'mini-notebook': 'Notizbuch für schnelle Ideen', 'magnetic-bookmark': 'Magnetischer Lesezeichen für Bücher', 'bookplate-stamp': 'Stempel für die eigene Bibliothek', 'mini-puzzle': 'Kleines Puzzle für eine Pause', 'party-card-game': 'Kartenspiel für jede Runde', 'plant-mister': 'Pflanzensprüher für die grüne Ecke', 'socks-gift-box': 'Socken mit Persönlichkeit', 'lip-balm-set': 'Lippenpflege-Set für unterwegs'
  },
  fr: {
    'mini-photo-printer': 'Mini-imprimante photo souvenir', 'coffee-kit': 'Rituel de café de spécialité', 'tea-ritual': 'Set pour une pause thé', 'portable-speaker': 'Enceinte pour votre bande-son', 'e-reader': 'Liseuse pour se perdre dans les histoires', 'book-light': 'Lampe de lecture tour de cou', 'botanical-puzzle': 'Puzzle d’art pour déconnecter', 'botanical-lego': 'Des fleurs sans eau', 'couple-board-game': 'Jeu de société pour deux', 'travel-organizer': 'Organiseur de câbles de voyage', 'packing-cubes': 'Valise mieux organisée', 'card-holder': 'Porte-cartes pour tous les jours', 'mechanical-keyboard': 'Clavier pour mieux travailler ou jouer', 'earbuds': 'Écouteurs pour ses moments', 'usbc-hub': 'Hub pour tout connecter', 'resistance-bands': 'Entraînement à la maison', 'yoga-mat': 'Tapis pour ralentir', 'running-belt': 'Ceinture pour courir léger', 'chocolate-box': 'Boîte de chocolats avec une histoire', 'hot-sauce-set': 'Parcours de sauces piquantes', 'skincare-set': 'Kit de soin sans se presser', 'selfcare-candle': 'Bougie pour changer l’ambiance', 'herb-garden': 'Mini-potager d’herbes aromatiques', 'chef-knife': 'Un outil pour mieux cuisiner', 'instant-camera': 'Appareil photo instantané', 'fountain-pen': 'Carnet et stylo pour ses idées', 'watercolor-kit': 'Kit créatif sans mode d’emploi', 'portable-projector': 'Cinéma improvisé sur un mur', 'massage-gun': 'Récupération après l’effort', 'digital-luggage-scale': 'La balance qui évite les surprises', 'digital-photo-frame': 'Cadre photo aux images changeantes', 'urban-backpack': 'Sac à dos pour tous les jours', 'powerbank': 'Batterie externe pour ne pas tomber à plat', 'date-night-box': 'Coffret pour une soirée à deux à la maison', 'movie-night-kit': 'Kit cinéma à la maison', 'picnic-set': 'Set pour un pique-nique improvisé', 'cocktail-kit': 'Kit pour préparer des cocktails', 'spice-rack': 'Collection d’épices du monde', 'pasta-maker': 'Kit pour préparer des pâtes fraîches', 'wireless-charging-station': 'Station de charge pour tout garder à portée', 'smart-speaker': 'Enceinte intelligente pour la maison', 'monitor-light-bar': 'Lampe pour améliorer le bureau', 'webcam-light': 'Lampe compacte pour les appels vidéo', 'card-game': 'Jeu de cartes pour lancer la conversation', 'cooperative-board-game': 'Jeu coopératif pour un après-midi', 'gaming-headset': 'Casque pour son setup', 'foam-roller': 'Kit de récupération après le sport', 'hiking-bottle': 'Gourde résistante pour les randonnées', 'fitness-tracker': 'Bracelet pour bouger davantage', 'hiking-headlamp': 'Lampe frontale pour les escapades', 'toiletry-bag': 'Trousse de toilette bien organisée', 'passport-wallet': 'Portefeuille de voyage léger', 'weekend-bag': 'Sac pour une escapade le temps d’un week-end', 'travel-pillow': 'Coussin confortable pour voyager', 'photo-album': 'Album pour ranger les souvenirs', 'custom-map-print': 'Carte d’un lieu important', 'photo-light-box': 'Boîte lumineuse avec une photo spéciale', 'memory-journal': 'Carnet pour remplir des histoires', 'calligraphy-kit': 'Kit de lettering pour débuter', 'model-building-kit': 'Maquette à construire à son rythme', 'bath-salts-set': 'Set de bain pour ralentir', 'sleep-mask': 'Masque de sommeil et rituel de repos', 'standing-mirror': 'Miroir de table élégant', 'room-diffuser': 'Diffuseur pour changer l’atmosphère', 'cozy-blanket': 'Plaid doux pour le canapé', 'desk-organizer': 'Organiseur de bureau élégant', 'cookbook': 'Livre de recettes qui met en appétit', 'bookstand': 'Support pour lire ou cuisiner', 'vinyl-record': 'Un vinyle à écouter tranquillement', 'midi-keyboard': 'Clavier pour jouer avec la musique', 'noise-cancelling-headphones': 'Casque pour s’isoler un peu', 'instant-film-pack': 'Pack de film instantané', 'smartwatch': 'Montre pour le quotidien', 'coffee-grinder': 'Moulin pour améliorer le café', 'cast-iron-pot': 'Cocotte pour cuisiner doucement', 'digital-notebook': 'Carnet numérique pour écrire et s’organiser', 'portable-mic': 'Micro pour créer du contenu ou chanter', 'lego-architecture': 'Construction architecturale à exposer', 'backgammon-set': 'Backgammon pour les longues après-midi', 'spa-headband-set': 'Set de soin pour déconnecter', 'tea-subscription': 'Sélection de thés à découvrir', 'sauce-making-kit': 'Kit pour préparer des sauces maison', 'reusable-cup': 'Gobelet réutilisable pour ses matins',     'personalized-keychain': 'Porte-clés personnalisé pour un souvenir partagé', 'couples-question-cards': 'Cartes de questions pour deux', 'memory-box': 'Boîte pour garder les petits souvenirs', 'photo-calendar': 'Calendrier photo pour toute l’année', 'experience-scratch-card': 'Cartes à gratter pour de futurs projets', 'portable-espresso-maker': 'Café de spécialité à emporter', 'milk-frother': 'Mousseur pour de meilleurs cafés', 'pizza-stone': 'Pierre à pizza pour la maison', 'baking-kit': 'Kit de pâtisserie pour se régaler', 'olive-oil-tasting': 'Dégustation d’huiles pour la table', 'smart-tracker-tag': 'Traceur pour les objets importants', 'wireless-mouse': 'Souris confortable pour le bureau', 'phone-tripod': 'Trépied pour filmer sans aide', 'portable-ssd': 'Disque rapide pour ses projets', 'smart-plug': 'Prise connectée pour simplifier la maison', 'tablet-stand': 'Support pour lire ou regarder', 'travel-adapter': 'Adaptateur pour voyager sereinement', 'travel-journal': 'Carnet pour les prochains voyages', 'dry-bag': 'Sac étanche pour les escapades', 'travel-coffee-mug': 'Mug isotherme pour les matins dehors', 'massage-ball': 'Balle de massage pour relâcher les tensions', 'gym-towel-set': 'Serviettes légères pour le sport', 'running-socks': 'Chaussettes techniques pour mieux bouger', 'bike-multitool': 'Multi-outil pour son vélo', 'pickleball-set': 'Set pour découvrir un nouveau sport', 'hand-care-set': 'Set de soin des mains', 'weighted-eye-mask': 'Masque relaxant pour déconnecter', 'sleep-sound-machine': 'Sons doux pour mieux dormir', 'heated-mug': 'Base pour garder le café chaud', 'sunglasses': 'Lunettes de soleil pour ses sorties', 'leather-belt': 'Ceinture facile à assortir', 'bookends': 'Serre-livres pour une étagère bien rangée', 'reading-journal': 'Carnet pour suivre ses lectures', 'embroidery-kit': 'Kit de broderie pour créer doucement', 'paint-by-numbers': 'Tableau à peindre par numéros', 'record-cleaning-kit': 'Kit pour prendre soin de ses vinyles', 'karaoke-mic': 'Microphone pour chanter sans complexe', 'vinyl-display-frame': 'Cadre pour exposer son vinyle préféré', 'trivia-game': 'Jeu de questions pour rire ensemble', 'escape-room-game': 'Escape game à résoudre à la maison', 'poker-set': 'Mallette de poker pour les soirées jeu', 'plant-watering-kit': 'Kit pour prendre soin de ses plantes', 'bird-feeder': 'Mangeoire pour observer la nature', 'electric-blanket': 'Plaid chauffant pour les soirées canapé', 'mini-waffle-maker': 'Mini gaufrier pour des petits-déjeuners joyeux', 'beer-tasting-set': 'Set de dégustation de bières', 'scented-hand-cream': 'Crème pour les mains au parfum spécial', 'plant-care-tools': 'Jolis outils pour son coin végétal', 'crossbody-bag': 'Sac bandoulière pour bouger léger', 'mug-warmer': 'Chauffe-tasse pour le bureau',     'coffee-scoop': 'Cuillère doseuse pour son café', 'tea-towel-set': 'Torchons de cuisine décorés', 'bottle-opener': 'Décapsuleur pour les longues soirées', 'silicone-ice-tray': 'Moule à glaçons pour des boissons originales', 'mini-cutting-board': 'Petite planche pour l’apéritif', 'lunch-bag': 'Sac isotherme pour les repas', 'fruit-infuser-bottle': 'Gourde pour parfumer l’eau', 'spice-spoon-set': 'Cuillères doseuses pour cuisiner', 'pancake-spatula': 'Spatule pour des petits-déjeuners spéciaux', 'coffee-clip': 'Pince pour garder le café frais', 'charging-cable-set': 'Pack de câbles à emporter', 'phone-grip': 'Anneau pour mieux tenir le téléphone', 'usb-desk-lamp': 'Lampe USB pour le bureau', 'webcam-cover': 'Caches pour protéger la webcam', 'keyring-multitool': 'Multi-outil à porter sur les clés', 'luggage-tag': 'Étiquette de valise pleine de personnalité', 'travel-cutlery': 'Couverts réutilisables à emporter', 'shoe-bag': 'Sac pour ranger ses baskets', 'resistance-loop': 'Mini-bandes pour s’entraîner partout', 'hand-warmer': 'Chauffe-mains pour les jours froids', 'mini-candle-set': 'Trio de bougies pour changer l’ambiance', 'bath-bomb-set': 'Bombes de bain pour une pause', 'gel-pens': 'Set de stylos gel pour écrire joliment', 'bookmark-set': 'Pack de marque-pages pour ses lectures', 'dice-set': 'Jolis dés pour les soirées jeu', 'puzzle-cube': 'Cube pour occuper ses mains', 'sticker-pack': 'Autocollants pour personnaliser ses affaires',     'tea-infuser': 'Joli infuseur pour ses pauses', 'hot-chocolate-kit': 'Kit pour préparer un chocolat chaud', 'coffee-syrup-set': 'Set de sirops pour varier le café', 'gourmet-snack-box': 'Boîte apéritive à partager', 'spice-blend-set': 'Petit set de mélanges d’épices', 'kitchen-timer': 'Minuteur de cuisine plein de charme', 'herb-scissors': 'Ciseaux pour les herbes fraîches', 'cookie-stamp': 'Tampon pour faire des biscuits maison', 'water-bottle': 'Gourde légère pour tous les jours', 'phone-stand': 'Support pour garder le téléphone en vue', 'cable-pouch': 'Petite pochette pour les câbles', 'screen-cleaning-kit': 'Kit pour garder les écrans propres', 'mini-notebook': 'Carnet pour les idées rapides', 'magnetic-bookmark': 'Marque-page magnétique pour ses livres', 'bookplate-stamp': 'Tampon pour marquer sa bibliothèque', 'mini-puzzle': 'Petit puzzle pour une pause', 'party-card-game': 'Jeu de cartes pour toutes les réunions', 'plant-mister': 'Vaporisateur pour son coin végétal', 'socks-gift-box': 'Pack de chaussettes avec personnalité', 'lip-balm-set': 'Set de baumes à emporter'
  },
  it: {
    'mini-photo-printer': 'Mini stampante fotografica per ricordi', 'coffee-kit': 'Rituale del caffè specialty', 'tea-ritual': 'Set per una pausa tè', 'portable-speaker': 'Altoparlante per la colonna sonora', 'e-reader': 'E-reader per perdersi nelle storie', 'book-light': 'Lampada da lettura da collo', 'botanical-puzzle': 'Puzzle d’arte per staccare', 'botanical-lego': 'Fiori che non hanno bisogno d’acqua', 'couple-board-game': 'Gioco da tavolo per due', 'travel-organizer': 'Organizer per cavi da viaggio', 'packing-cubes': 'Valigia più ordinata', 'card-holder': 'Portacarte per ogni giorno', 'mechanical-keyboard': 'Tastiera per lavorare o giocare meglio', 'earbuds': 'Auricolari per i suoi momenti', 'usbc-hub': 'Hub per collegare tutto', 'resistance-bands': 'Allenamento che sta in casa', 'yoga-mat': 'Tappetino per rallentare', 'running-belt': 'Cintura per correre leggeri', 'chocolate-box': 'Scatola di cioccolatini con una storia', 'hot-sauce-set': 'Percorso di salse piccanti', 'skincare-set': 'Kit di cura personale senza fretta', 'selfcare-candle': 'Candela per cambiare atmosfera', 'herb-garden': 'Mini orto di erbe in cucina', 'chef-knife': 'Uno strumento per cucinare meglio', 'instant-camera': 'Fotocamera istantanea', 'fountain-pen': 'Quaderno e penna per le sue idee', 'watercolor-kit': 'Kit creativo senza istruzioni', 'portable-projector': 'Cinema improvvisato su qualsiasi parete', 'massage-gun': 'Recupero dopo essersi mossi', 'digital-luggage-scale': 'La bilancia che evita sorprese', 'digital-photo-frame': 'Cornice digitale con foto che cambiano', 'urban-backpack': 'Zaino per ogni giorno', 'powerbank': 'Powerbank per non restare senza batteria', 'date-night-box': 'Box per una serata in casa a due', 'movie-night-kit': 'Kit cinema in casa', 'picnic-set': 'Set per un picnic improvvisato', 'cocktail-kit': 'Kit per preparare cocktail', 'spice-rack': 'Collezione di spezie dal mondo', 'pasta-maker': 'Kit per fare la pasta fresca', 'wireless-charging-station': 'Base di ricarica per avere tutto a portata', 'smart-speaker': 'Altoparlante smart per casa', 'monitor-light-bar': 'Luce per migliorare la scrivania', 'webcam-light': 'Luce compatta per le videochiamate', 'card-game': 'Gioco di carte per iniziare a parlare', 'cooperative-board-game': 'Gioco cooperativo per un pomeriggio', 'gaming-headset': 'Cuffie per il suo setup', 'foam-roller': 'Kit di recupero dopo l’allenamento', 'hiking-bottle': 'Borraccia resistente per i suoi percorsi', 'fitness-tracker': 'Bracciale per muoversi di più', 'hiking-headlamp': 'Lampada frontale per le escursioni', 'toiletry-bag': 'Beauty case ben organizzato', 'passport-wallet': 'Portadocumenti da viaggio leggero', 'weekend-bag': 'Borsa per un weekend fuori', 'travel-pillow': 'Cuscino comodo per viaggiare', 'photo-album': 'Album per ordinare i ricordi', 'custom-map-print': 'Mappa di un luogo importante', 'photo-light-box': 'Light box con una foto speciale', 'memory-journal': 'Diario da riempire di storie', 'calligraphy-kit': 'Kit di lettering per iniziare', 'model-building-kit': 'Modello da costruire con calma', 'bath-salts-set': 'Set da bagno per rallentare', 'sleep-mask': 'Mascherina e piccolo rituale di riposo', 'standing-mirror': 'Specchio da tavolo con stile', 'room-diffuser': 'Diffusore per cambiare atmosfera', 'cozy-blanket': 'Coperta morbida per il divano', 'desk-organizer': 'Organizer da scrivania elegante', 'cookbook': 'Libro di ricette che fa venire fame', 'bookstand': 'Leggio per leggere o cucinare', 'vinyl-record': 'Un vinile da ascoltare con calma', 'midi-keyboard': 'Tastiera per giocare con la musica', 'noise-cancelling-headphones': 'Cuffie per isolarsi un po’', 'instant-film-pack': 'Pack di pellicola istantanea', 'smartwatch': 'Orologio per la vita di ogni giorno', 'coffee-grinder': 'Macinacaffè per migliorare il caffè', 'cast-iron-pot': 'Pentola per cucinare a fuoco lento', 'digital-notebook': 'Quaderno digitale per scrivere e organizzarsi', 'portable-mic': 'Microfono per creare o cantare', 'lego-architecture': 'Costruzione architettonica da esporre', 'backgammon-set': 'Backgammon per pomeriggi lunghi', 'spa-headband-set': 'Set per prendersi cura di sé', 'tea-subscription': 'Selezione di tè da scoprire', 'sauce-making-kit': 'Kit per preparare salse fatte in casa', 'reusable-cup': 'Bicchiere riutilizzabile per le mattine',     'personalized-keychain': 'Portachiavi personalizzato per un ricordo condiviso', 'couples-question-cards': 'Carte di domande per due', 'memory-box': 'Scatola per conservare piccoli ricordi', 'photo-calendar': 'Calendario fotografico per tutto l’anno', 'experience-scratch-card': 'Carte da grattare per i prossimi piani', 'portable-espresso-maker': 'Caffè specialty da portare ovunque', 'milk-frother': 'Montalatte per un caffè migliore', 'pizza-stone': 'Pietra per pizza fatta in casa', 'baking-kit': 'Kit da forno per qualcosa di buono', 'olive-oil-tasting': 'Degustazione di oli per la tavola', 'smart-tracker-tag': 'Localizzatore per le cose importanti', 'wireless-mouse': 'Mouse comodo per la scrivania', 'phone-tripod': 'Treppiede per filmare senza aiuto', 'portable-ssd': 'Disco veloce per i suoi progetti', 'smart-plug': 'Presa smart per semplificare la casa', 'tablet-stand': 'Supporto per leggere o guardare', 'travel-adapter': 'Adattatore per viaggiare tranquilli', 'travel-journal': 'Diario per i prossimi viaggi', 'dry-bag': 'Borsa impermeabile per le escursioni', 'travel-coffee-mug': 'Tazza termica per le mattine fuori', 'massage-ball': 'Palla da massaggio per sciogliere la tensione', 'gym-towel-set': 'Asciugamani leggeri per allenarsi', 'running-socks': 'Calze tecniche per muoversi meglio', 'bike-multitool': 'Multitool per la bicicletta', 'pickleball-set': 'Set per provare un nuovo sport', 'hand-care-set': 'Set per la cura delle mani', 'weighted-eye-mask': 'Mascherina rilassante per staccare', 'sleep-sound-machine': 'Suoni delicati per dormire meglio', 'heated-mug': 'Base per tenere caldo il caffè', 'sunglasses': 'Occhiali da sole per stare all’aperto', 'leather-belt': 'Cintura che sta bene con tutto', 'bookends': 'Reggilibri per una libreria ordinata', 'reading-journal': 'Diario per segnare le letture', 'embroidery-kit': 'Kit da ricamo per creare con calma', 'paint-by-numbers': 'Quadro da dipingere con i numeri', 'record-cleaning-kit': 'Kit per prendersi cura dei vinili', 'karaoke-mic': 'Microfono per cantare senza vergogna', 'vinyl-display-frame': 'Cornice per esporre il vinile preferito', 'trivia-game': 'Gioco di domande per ridere insieme', 'escape-room-game': 'Escape room da risolvere a casa', 'poker-set': 'Set da poker per le serate di gioco', 'plant-watering-kit': 'Kit per prendersi cura delle piante', 'bird-feeder': 'Mangiatoia per osservare la natura', 'electric-blanket': 'Coperta elettrica per le serate sul divano', 'mini-waffle-maker': 'Mini piastra per colazioni speciali', 'beer-tasting-set': 'Set per degustare birre', 'scented-hand-cream': 'Crema mani con un profumo speciale', 'plant-care-tools': 'Strumenti belli per il suo angolo verde', 'crossbody-bag': 'Borsa a tracolla per muoversi leggeri', 'mug-warmer': 'Scalda-tazza per la scrivania',     'coffee-scoop': 'Cucchiaio dosatore per il suo caffè', 'tea-towel-set': 'Strofinacci da cucina dal design speciale', 'bottle-opener': 'Apribottiglie per le serate insieme', 'silicone-ice-tray': 'Stampo per ghiaccio originale', 'mini-cutting-board': 'Piccolo tagliere per aperitivi', 'lunch-bag': 'Borsa termica per il pranzo', 'fruit-infuser-bottle': 'Borraccia per aromatizzare l’acqua', 'spice-spoon-set': 'Cucchiaini dosatori per cucinare', 'pancake-spatula': 'Spatola per colazioni speciali', 'coffee-clip': 'Clip per conservare meglio il caffè', 'charging-cable-set': 'Pack di cavi da portare con sé', 'phone-grip': 'Anello per impugnare meglio il telefono', 'usb-desk-lamp': 'Luce USB per la scrivania', 'webcam-cover': 'Coperture per proteggere la webcam', 'keyring-multitool': 'Multitool da portare con le chiavi', 'luggage-tag': 'Etichetta per valigia con personalità', 'travel-cutlery': 'Posate riutilizzabili da viaggio', 'shoe-bag': 'Borsa per riporre le scarpe da ginnastica', 'resistance-loop': 'Mini bande per allenarsi ovunque', 'hand-warmer': 'Scaldamani per le giornate fredde', 'mini-candle-set': 'Trio di candele per cambiare atmosfera', 'bath-bomb-set': 'Bombe da bagno per una pausa', 'gel-pens': 'Set di penne gel per scrivere bene', 'bookmark-set': 'Set di segnalibri per le sue letture', 'dice-set': 'Dadi belli per le serate di gioco', 'puzzle-cube': 'Cubo per tenere occupate le mani', 'sticker-pack': 'Adesivi per personalizzare le sue cose',     'tea-infuser': 'Infusore bello per le sue pause', 'hot-chocolate-kit': 'Kit per preparare la cioccolata calda', 'coffee-syrup-set': 'Set di sciroppi per variare il caffè', 'gourmet-snack-box': 'Box di snack da condividere', 'spice-blend-set': 'Piccolo set di miscele di spezie', 'kitchen-timer': 'Timer da cucina dal tocco speciale', 'herb-scissors': 'Forbici per le erbe fresche', 'cookie-stamp': 'Timbro per fare biscotti in casa', 'water-bottle': 'Borraccia leggera per ogni giorno', 'phone-stand': 'Supporto per tenere il telefono in vista', 'cable-pouch': 'Piccola custodia per i cavi', 'screen-cleaning-kit': 'Kit per tenere puliti gli schermi', 'mini-notebook': 'Taccuino per le idee veloci', 'magnetic-bookmark': 'Segnalibro magnetico per i suoi libri', 'bookplate-stamp': 'Timbro per segnare la sua biblioteca', 'mini-puzzle': 'Piccolo puzzle per una pausa', 'party-card-game': 'Gioco di carte per ogni riunione', 'plant-mister': 'Spruzzino per il suo angolo verde', 'socks-gift-box': 'Set di calze con personalità', 'lip-balm-set': 'Set di balsami da portare ovunque'
  }

};
var ENHANCED_RESULT_COPY = {"es":{"newBadge":"Descubrimiento"},"en":{"newBadge":"New find"},"de":{"newBadge":"Neue Entdeckung"},"fr":{"newBadge":"Nouvelle découverte"},"it":{"newBadge":"Nuova scoperta"}};
  var HERO_NOTE_COPY = {"es":[{"value":"8","label":"toques"},{"value":"<1","label":"minuto"},{"value":"10","label":"resultados"},{"value":"sin","label":"cuenta"}],"en":[{"value":"8","label":"taps"},{"value":"<1","label":"minute"},{"value":"10","label":"results"},{"value":"no","label":"sign-up"}],"de":[{"value":"8","label":"Klicks"},{"value":"<1","label":"Minute"},{"value":"10","label":"Ergebnisse"},{"value":"ohne","label":"Konto"}],"fr":[{"value":"8","label":"touches"},{"value":"<1","label":"minute"},{"value":"10","label":"résultats"},{"value":"sans","label":"compte"}],"it":[{"value":"8","label":"tap"},{"value":"<1","label":"minuto"},{"value":"10","label":"risultati"},{"value":"senza","label":"account"}]};
var GROWTH_COPY = {
  es: { weeklyBadge: 'Descubrimiento de la semana', weeklyIntro: 'Una idea distinta del catálogo para salir de lo de siempre: {title}.', weeklyLink: 'Abrir el radar', weeklyPricePrefix: 'Precio orientativo', installTitle: 'Llévate Regalazo contigo', installText: 'Instálalo para tener el radar a mano cuando vuelva a surgir un cumpleaños.', installButton: 'Instalar', installDismiss: 'Ahora no' },
  en: { weeklyBadge: 'Discovery of the week', weeklyIntro: 'A different catalogue idea to escape the obvious: {title}.', weeklyLink: 'Open the radar', weeklyPricePrefix: 'Guide price', installTitle: 'Take Regalazo with you', installText: 'Install it so the radar is ready when the next birthday appears.', installButton: 'Install', installDismiss: 'Not now' },
  de: { weeklyBadge: 'Entdeckung der Woche', weeklyIntro: 'Eine andere Katalogidee abseits des Offensichtlichen: {title}.', weeklyLink: 'Radar öffnen', weeklyPricePrefix: 'Richtwert', installTitle: 'Regalazo immer dabei', installText: 'Installiere den Radar für den nächsten Geburtstag.', installButton: 'Installieren', installDismiss: 'Jetzt nicht' },
  fr: { weeklyBadge: 'Découverte de la semaine', weeklyIntro: 'Une idée différente du catalogue pour sortir de l’évidence : {title}.', weeklyLink: 'Ouvrir le radar', weeklyPricePrefix: 'Prix indicatif', installTitle: 'Emportez Regalazo', installText: 'Installez le radar pour l’avoir sous la main au prochain anniversaire.', installButton: 'Installer', installDismiss: 'Pas maintenant' },
  it: { weeklyBadge: 'Scoperta della settimana', weeklyIntro: 'Un’idea diversa dal catalogo per uscire dal solito: {title}.', weeklyLink: 'Apri il radar', weeklyPricePrefix: 'Prezzo indicativo', installTitle: 'Porta Regalazo con te', installText: 'Installa il radar per averlo pronto al prossimo compleanno.', installButton: 'Installa', installDismiss: 'Non ora' }
};
Object.keys(ENHANCED_RESULT_COPY).forEach(function (language) {
  if (!LANGUAGE_COPY[language]) return;
  LANGUAGE_COPY[language].results = Object.assign({}, LANGUAGE_COPY[language].results, ENHANCED_RESULT_COPY[language]);
  LANGUAGE_COPY[language].heroNotes = HERO_NOTE_COPY[language] || LANGUAGE_COPY[language].heroNotes;
  LANGUAGE_COPY[language].growth = GROWTH_COPY[language] || GROWTH_COPY.es;
});

var LANGUAGE_STORAGE_KEY = 'regalazo-language-v1';
var state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], language: readLanguage(), recommendationMode: 'fit', analyticsStarted: false, answers: { interests: [] } };
var currentRecommendations = [];
var toastTimer;
var pendingScrollPosition = null;
var lastScrollPosition = { left: window.scrollX || 0, top: window.scrollY || 0 };
var hero = document.getElementById('hero');
var wizard = document.getElementById('wizard');
var trustStrip = document.querySelector('.trust-strip');
var seoContent = document.querySelector('.seo-content');
var results = document.getElementById('results');
var questionRegion = document.getElementById('question-region');
var stepLabel = document.getElementById('step-label');
var progressValue = document.getElementById('progress-value');
var progressBar = document.getElementById('progress-bar');
var backButton = document.getElementById('back-button');
var nextButton = document.getElementById('next-button');
var toast = document.getElementById('toast');
var languageSelect = document.getElementById('language-select');
var weeklyDiscovery = document.getElementById('weekly-discovery');
var analyticsConsentBanner = document.getElementById('analytics-consent');
var analyticsConsentTitle = document.getElementById('analytics-consent-title');
var analyticsConsentText = document.getElementById('analytics-consent-text');
var analyticsConsentAcceptButton = document.getElementById('analytics-consent-accept');
var analyticsConsentRejectButton = document.getElementById('analytics-consent-reject');
var analyticsPreferencesButton = document.getElementById('analytics-preferences');
var pwaPrompt = document.getElementById('pwa-prompt');
var pwaInstallButton = document.getElementById('pwa-install');
var pwaDismissButton = document.getElementById('pwa-dismiss');
var deferredInstallPrompt = null;
analyticsConsentState = readAnalyticsConsent();

function escapeHtml(value) {
  var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(value).replace(/[&<>"']/g, function (character) { return map[character]; });
}

function getQuestion(id) {
  return QUESTIONS.find(function (question) { return question.id === id; });
}

function getOption(id, value) {
  var question = getQuestion(id);
  return question ? question.options.find(function (option) { return option.value === value; }) : null;
}

function currentCopy() {
  return LANGUAGE_COPY[state.language] || LANGUAGE_COPY.es;
}

function readLanguage() {
  try {
    var stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (LANGUAGE_COPY[stored]) return stored;
  } catch (error) {}
  var browserLanguages = [];
  try {
    browserLanguages = (Array.isArray(navigator.languages) ? navigator.languages : []).concat(navigator.language || []);
  } catch (error) {}
  for (var index = 0; index < browserLanguages.length; index += 1) {
    var language = String(browserLanguages[index] || '').toLowerCase().split('-')[0];
    if (LANGUAGE_COPY[language]) return language;
  }
  return 'en';
}

function getQuestionCopy(id) {
  var copy = currentCopy().questions[id];
  return copy || LANGUAGE_COPY.es.questions[id];
}

function interpolate(template, replacements) {
  return String(template).replace(/\{(\w+)\}/g, function (_, key) {
    return Object.prototype.hasOwnProperty.call(replacements, key) ? replacements[key] : '';
  });
}

function localizedGift(gift) {
  var titles = GIFT_TITLE_COPY[state.language] || {};
  var baseId = gift.baseId || gift.id;
  var recipe = gift._recipe;
  var angle = recipe && recipe.copy ? (recipe.copy[state.language] || recipe.copy.es) : '';
  return {
    title: titles[baseId] || (gift.titles && gift.titles[state.language]) || gift.title,
    tags: gift.tags,
    reason: gift.reason,
    angle: angle || '',
    isDiscovery: !!gift._isDiscovery
  };
}

var ANALYTICS_SAFE_PROPERTIES = {
  quiz_started: [],
  quiz_answered: ['step'],
  recommendations_viewed: ['resultCount', 'variant', 'mode'],
  recommendations_refreshed: ['variant', 'mode'],
  gift_outbound_clicked: ['position'],
  language_changed: ['from', 'to'],
  share_clicked: ['method'],
  share_completed: ['method', 'mode'],
  shared_result_opened: ['mode'],
  weekly_discovery_viewed: [],
  weekly_discovery_clicked: [],
  pwa_ready: [],
  pwa_install_prompt_viewed: [],
  pwa_install_prompted: [],
  pwa_install_choice: ['choice'],
  pwa_installed: [],
  pwa_install_dismissed: [],
  quiz_reset: [],
  analytics_loaded: []
};

function readAnalyticsConsent() {
  try {
    var value = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch (error) {
    return null;
  }
}

function updateAnalyticsConsentCopy() {
  if (!analyticsConsentTitle || !analyticsConsentText || !analyticsConsentAcceptButton || !analyticsConsentRejectButton) return;
  var copy = ANALYTICS_CONSENT_COPY[state.language] || ANALYTICS_CONSENT_COPY.es;
  analyticsConsentTitle.textContent = copy.title;
  analyticsConsentText.textContent = copy.text;
  analyticsConsentAcceptButton.textContent = copy.accept;
  analyticsConsentRejectButton.textContent = copy.reject;
  if (analyticsPreferencesButton) analyticsPreferencesButton.textContent = copy.preferences;
}

function hideAnalyticsConsent() {
  if (analyticsConsentBanner) analyticsConsentBanner.hidden = true;
  document.body.classList.remove('analytics-consent-visible');
}

function showAnalyticsConsent() {
  if (!analyticsConsentBanner || analyticsConsentState) return;
  updateAnalyticsConsentCopy();
  analyticsConsentBanner.hidden = false;
  document.body.classList.add('analytics-consent-visible');
}

function safeAnalyticsProperties(eventName, properties) {
  var safeKeys = ANALYTICS_SAFE_PROPERTIES[eventName] || [];
  var safeProperties = {};
  safeKeys.forEach(function (key) {
    if (properties && Object.prototype.hasOwnProperty.call(properties, key)) safeProperties[key] = properties[key];
  });
  return safeProperties;
}

function sendMixpanelEvent(event) {
  if (analyticsReady && window.mixpanel && typeof window.mixpanel.track === 'function') {
    window.mixpanel.track(event.event, event.properties);
  }
}

function initializeMixpanel() {
  if (analyticsReady) return true;
  if (!window.mixpanel || typeof window.mixpanel.init !== 'function') return false;
  window.mixpanel.init(ANALYTICS_CONFIG.token, {
    api_host: ANALYTICS_CONFIG.apiHost,
    track_pageview: false,
    persistence: 'localStorage'
  });
  analyticsReady = true;
  ANALYTICS_QUEUE.splice(0).forEach(sendMixpanelEvent);
  return true;
}

function loadMixpanel() {
  if (analyticsConsentState !== 'granted' || !ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.token || analyticsReady || analyticsScriptLoading) return;
  if (initializeMixpanel()) return;
  analyticsScriptLoading = true;
  var script = document.createElement('script');
  script.async = true;
  script.src = ANALYTICS_CONFIG.scriptUrl;
  script.onload = function () {
    analyticsScriptLoading = false;
    if (initializeMixpanel()) trackEvent('analytics_loaded', {});
  };
  script.onerror = function () {
    analyticsScriptLoading = false;
  };
  document.head.appendChild(script);
}

function setAnalyticsConsent(value) {
  if (value !== 'granted' && value !== 'denied') return;
  analyticsConsentState = value;
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch (error) {}
  if (value === 'denied') {
    ANALYTICS_QUEUE.length = 0;
    if (window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
  }
  hideAnalyticsConsent();
  if (value === 'granted') {
    if (window.mixpanel && typeof window.mixpanel.opt_in_tracking === 'function') window.mixpanel.opt_in_tracking();
    loadMixpanel();
  }
}

function openAnalyticsPreferences() {
  analyticsConsentState = null;
  try {
    localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
  } catch (error) {}
  if (window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
  showAnalyticsConsent();
}

function trackEvent(eventName, properties) {
  if (analyticsConsentState !== 'granted') return;
  var baseProperties = {
    app: 'regalazo',
    language: state.language,
    version: ANALYTICS_CONFIG.version
  };
  var event = {
    event: eventName,
    properties: Object.assign(baseProperties, safeAnalyticsProperties(eventName, properties || {})),
    timestamp: new Date().toISOString()
  };
  ANALYTICS_QUEUE.push(event);
  sendMixpanelEvent(event);
}

window.RegalazoAnalytics = Object.freeze({
  track: trackEvent,
  getConsent: function () { return analyticsConsentState; },
  setConsent: setAnalyticsConsent,
  getQueue: function () { return ANALYTICS_QUEUE.slice(); }
});

function applyLanguage() {
  var copy = currentCopy();
  document.documentElement.lang = copy.locale;
  document.title = copy.heroTitle + ' | Regalazo';
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', copy.heroCopy);
  if (languageSelect) {
    languageSelect.value = state.language;
    languageSelect.setAttribute('aria-label', copy.pickerLabel);
  }
  var heroEyebrow = document.querySelector('.hero .eyebrow');
  var heroTitle = document.getElementById('hero-title');
  var heroCopy = document.querySelector('.hero-copy');
  if (heroEyebrow) heroEyebrow.textContent = copy.heroEyebrow;
  if (heroTitle) heroTitle.textContent = copy.heroTitle;
  if (heroCopy) heroCopy.textContent = copy.heroCopy;

  var notes = document.querySelectorAll('.hero-notes > span');
  copy.heroNotes.forEach(function (note, index) {
    if (notes[index]) notes[index].innerHTML = '<strong>' + escapeHtml(note.value) + '</strong> ' + escapeHtml(note.label);
  });

  var trustItems = document.querySelectorAll('.trust-item');
  copy.trust.forEach(function (item, index) {
    if (!trustItems[index]) return;
    var strong = trustItems[index].querySelector('strong');
    var small = trustItems[index].querySelector('small');
    if (strong) strong.textContent = item.title;
    if (small) small.textContent = item.detail;
  });

  var hint = document.querySelector('.keyboard-hint');
  if (hint) hint.textContent = copy.keyboardHint;

  var seoEyebrow = document.querySelector('.seo-content .eyebrow');
  var seoTitle = document.getElementById('seo-title');
  var seoIntro = document.querySelector('.seo-intro');
  if (seoEyebrow) seoEyebrow.textContent = copy.seo.eyebrow;
  if (seoTitle) seoTitle.textContent = copy.seo.title;
  if (seoIntro) seoIntro.textContent = copy.seo.intro;

  var seoCards = document.querySelectorAll('.seo-card');
  copy.seo.cards.forEach(function (card, index) {
    if (!seoCards[index]) return;
    var cardTitle = seoCards[index].querySelector('h3');
    var cardDescription = seoCards[index].querySelector('p');
    var cardLink = seoCards[index].querySelector('a');
    if (cardTitle) cardTitle.textContent = card.title;
    if (cardDescription) cardDescription.textContent = card.description;
    if (cardLink) cardLink.innerHTML = escapeHtml(card.link) + ' <span aria-hidden="true">→</span>';
  });

  var faqTitle = document.querySelector('.faq-title');
  if (faqTitle) faqTitle.textContent = copy.seo.faqTitle;
  var faqItems = document.querySelectorAll('.faq-item');
  copy.seo.faqs.forEach(function (faq, index) {
    if (!faqItems[index]) return;
    var summary = faqItems[index].querySelector('summary');
    var answer = faqItems[index].querySelector('p');
    if (summary) summary.textContent = faq.question;
    if (answer) answer.textContent = faq.answer;
  });

  var footerParagraphs = document.querySelectorAll('.site-footer p');
  copy.footer.forEach(function (text, index) {
    if (footerParagraphs[index]) footerParagraphs[index].textContent = text;
  });
  renderWeeklyDiscovery();
  updatePwaCopy();
  updateAnalyticsConsentCopy();
}

function renderWeeklyDiscovery() {
  if (!weeklyDiscovery || !GIFT_CATALOG.length) return;
  var week = Math.floor((Date.now() - Date.UTC(2024, 0, 1)) / 604800000);
  var gift = GIFT_CATALOG[Math.abs(week) % GIFT_CATALOG.length];
  var titles = GIFT_TITLE_COPY[state.language] || {};
  var growth = currentCopy().growth || GROWTH_COPY.es;
  var title = titles[gift.id] || gift.title;
  var badge = document.getElementById('weekly-badge');
  var heading = document.getElementById('weekly-title');
  var copy = document.getElementById('weekly-copy');
  var price = document.getElementById('weekly-price');
  var link = document.getElementById('weekly-link');
  if (badge) badge.textContent = growth.weeklyBadge;
  if (heading) heading.textContent = title;
  if (copy) copy.textContent = interpolate(growth.weeklyIntro, { title: title });
  if (price) price.textContent = growth.weeklyPricePrefix + ': ≈ ' + String(gift.price) + ' €';
  if (link) {
    link.innerHTML = escapeHtml(growth.weeklyLink) + ' <span aria-hidden="true">→</span>';
    link.setAttribute('data-gift-id', gift.id);
  }
  if (!weeklyDiscovery.dataset.tracked) {
    weeklyDiscovery.dataset.tracked = 'true';
    trackEvent('weekly_discovery_viewed', { giftId: gift.id });
  }
}

function updatePwaCopy() {
  var growth = currentCopy().growth || GROWTH_COPY.es;
  var title = document.getElementById('pwa-prompt-title');
  var text = document.getElementById('pwa-prompt-text');
  var install = document.getElementById('pwa-install');
  var dismiss = document.getElementById('pwa-dismiss');
  if (title) title.textContent = growth.installTitle;
  if (text) text.textContent = growth.installText;
  if (install) install.textContent = growth.installButton;
  if (dismiss) dismiss.setAttribute('aria-label', growth.installDismiss);
}

function registerPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function () {
        trackEvent('pwa_ready', {});
      }).catch(function () {});
    });
  }
  if (!APP_CONFIG.installPromptEnabled) return;
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    try {
      if (localStorage.getItem('regalazo-pwa-dismissed-v1') === '1') return;
    } catch (error) {}
    window.setTimeout(function () {
      if (pwaPrompt && deferredInstallPrompt) {
        pwaPrompt.hidden = false;
        trackEvent('pwa_install_prompt_viewed', {});
      }
    }, APP_CONFIG.installPromptDelayMs);
  });
  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    if (pwaPrompt) pwaPrompt.hidden = true;
    trackEvent('pwa_installed', {});
  });
  if (pwaInstallButton) {
    pwaInstallButton.addEventListener('click', function () {
      if (!deferredInstallPrompt) return;
      var promptEvent = deferredInstallPrompt;
      deferredInstallPrompt = null;
      if (pwaPrompt) pwaPrompt.hidden = true;
      trackEvent('pwa_install_prompted', {});
      promptEvent.prompt();
      if (promptEvent.userChoice && typeof promptEvent.userChoice.then === 'function') {
        promptEvent.userChoice.then(function (choice) {
          trackEvent('pwa_install_choice', { outcome: choice && choice.outcome || 'unknown' });
        }).catch(function () {});
      }
    });
  }
  if (pwaDismissButton) {
    pwaDismissButton.addEventListener('click', function () {
      if (pwaPrompt) pwaPrompt.hidden = true;
      try { localStorage.setItem('regalazo-pwa-dismissed-v1', '1'); } catch (error) {}
      trackEvent('pwa_install_dismissed', {});
    });
  }
}

function getLabel(id, value) {
  var questionCopy = getQuestionCopy(id);
  var localizedOption = questionCopy && questionCopy.options[value];
  if (localizedOption) return localizedOption.label;
  var option = getOption(id, value);
  return option ? option.label : 'Cualquiera';
}

function selectedValues(question) {
  var value = state.answers[question.id];
  return question.multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);
}

function optionMarkup(question, option) {
  var selected = selectedValues(question).indexOf(option.value) !== -1;
  var questionCopy = getQuestionCopy(question.id);
  var localizedOption = questionCopy && questionCopy.options[option.value];
  var label = localizedOption ? localizedOption.label : option.label;
  var detail = localizedOption ? localizedOption.detail : option.detail;
  var details = detail ? '<span class="option-detail">' + escapeHtml(detail) + '</span>' : '';
  return '<button class="option-card" type="button" data-option="' + escapeHtml(option.value) + '" aria-pressed="' + String(selected) + '">' +
    '<span class="option-icon" aria-hidden="true">' + option.icon + '</span>' +
    '<span class="option-copy"><span class="option-label">' + escapeHtml(label) + '</span>' + details + '</span>' +
    '</button>';
}

function renderQuestion() {
  var question = QUESTIONS[state.step];
  var localizedQuestion = getQuestionCopy(question.id);
  var copy = currentCopy();
  var percent = Math.round(((state.step + 1) / QUESTIONS.length) * 100);
  stepLabel.textContent = copy.stepPrefix + (state.step + 1) + copy.stepJoin + QUESTIONS.length;
  progressValue.textContent = percent + '%';
  progressBar.style.width = percent + '%';
  backButton.hidden = state.step === 0;
  nextButton.hidden = true;
  questionRegion.innerHTML = '<p class="question-kicker">' + escapeHtml(localizedQuestion.kicker) + '</p>' +
    '<h2 id="question-title" class="question-title">' + escapeHtml(localizedQuestion.title) + '</h2>' +
    '<p class="question-subtitle">' + escapeHtml(localizedQuestion.subtitle) + '</p>' +
    '<div class="options-grid" role="group" aria-labelledby="question-title">' +
    question.options.map(function (option) { return optionMarkup(question, option); }).join('') +
    '</div>' + (question.multiple ? '<p class="multi-hint"><span aria-hidden="true">＋</span> ' + escapeHtml(copy.messages.multiHint) + '</p>' : '');
  questionRegion.classList.remove('question-transition');
  void questionRegion.offsetWidth;
  questionRegion.classList.add('question-transition');
}

function render() {
  if (state.step >= QUESTIONS.length) {
    renderResults();
    return;
  }
  renderQuestion();
}

function handleOption(value, scrollPosition) {
  var question = QUESTIONS[state.step];
  if (state.step === 0 && !state.analyticsStarted) {
    state.analyticsStarted = true;
    trackEvent('quiz_started', {});
  }
  if (question.multiple) {
    var current = selectedValues(question);
    var exists = current.indexOf(value) !== -1;
    if (!exists && current.length >= 3) {
      showToast(currentCopy().messages.maxInterests);
      return;
    }
    state.answers[question.id] = exists ? current.filter(function (item) { return item !== value; }) : current.concat(value);
    trackEvent('quiz_answered', { questionId: question.id, value: state.answers[question.id], step: state.step + 1 });
  } else {
    state.answers[question.id] = value;
    trackEvent('quiz_answered', { questionId: question.id, value: value, step: state.step + 1 });
    advance(scrollPosition);
    return;
  }
  renderQuestion();
}

function advance(scrollPosition) {
  var question = QUESTIONS[state.step];
  if (selectedValues(question).length === 0) {
    showToast(question.multiple ? currentCopy().messages.chooseInterest : currentCopy().messages.choose);
    return;
  }
  var position = scrollPosition || lastScrollPosition || getScrollPosition();
  state.step += 1;
  render();
  restoreScrollPosition(position);
  lastScrollPosition = position;
}

function goBack() {
  if (state.step > 0) {
    state.step -= 1;
    renderQuestion();
  }
}

function budgetFor(value) {
  var option = getOption('budget', value);
  return option || { label: 'Hasta 40 €', max: 40 };
}

function selectedInterests(answers) {
  var value = answers && answers.interests;
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function hashString(value) {
  var hash = 2166136261;
  String(value).split('').forEach(function (character) { hash = Math.imul(hash ^ character.charCodeAt(0), 16777619); });
  return hash >>> 0;
}

var VARIETY_STORAGE_KEY = 'regalazo-variety-v3';
var GIFT_RECIPES = [{"id":"smart-fit","querySuffix":"regalo bien elegido","copy":{"es":"Apuesta afinada","en":"Fine-tuned pick","de":"Treffsichere Wahl","fr":"Choix bien ciblé","it":"Scelta mirata"},"reason":{"es":"La ruta segura: buscar una versión que encaje con lo que ya disfruta.","en":"The reliable route: look for a version that fits what they already enjoy.","de":"Der sichere Weg: eine Variante finden, die zu dem passt, was diese Person bereits mag.","fr":"La valeur sûre : chercher une version qui correspond à ce que cette personne aime déjà.","it":"La strada sicura: cercare una versione in linea con ciò che questa persona ama già."}},{"id":"personal-touch","querySuffix":"personalizable","copy":{"es":"Con un toque personal","en":"Personal touch","de":"Persönliche Note","fr":"Touche personnelle","it":"Tocco personale"},"reason":{"es":"Busca una variante personalizable para que una idea conocida se sienta hecha a medida.","en":"Look for a customisable version so a familiar idea feels made for them.","de":"Eine personalisierbare Variante macht aus einer bekannten Idee etwas Persönliches.","fr":"Une version personnalisable donne à une idée connue une vraie touche personnelle.","it":"Una versione personalizzabile rende personale anche un’idea già conosciuta."}},{"id":"make-a-plan","querySuffix":"plan experiencia","copy":{"es":"Hazlo un plan","en":"Turn it into a plan","de":"Als Erlebnis verschenken","fr":"À vivre ensemble","it":"Da vivere insieme"},"reason":{"es":"La clave es añadir un plan: que el regalo provoque algo que podáis hacer o disfrutar.","en":"The key is adding a plan: let the gift create something you can do or enjoy together.","de":"Der eigentliche Wert ist das Erlebnis: ein Geschenk, das ihr gemeinsam nutzen oder genießen könnt.","fr":"L’idée est d’en faire un moment à vivre : un cadeau qui crée une activité ou un plaisir partagé.","it":"Il punto è aggiungere un piano: un regalo che crea qualcosa da fare o vivere insieme."}},{"id":"gift-set","querySuffix":"set pack regalo","copy":{"es":"En formato pack","en":"Gift-set angle","de":"Als Geschenkset","fr":"En coffret","it":"In formato set"},"reason":{"es":"Un pack bien elegido multiplica la sensación de regalo y deja más de una forma de usarlo.","en":"A well-chosen set feels more gift-like and gives them more than one way to use it.","de":"Ein gut gewähltes Set wirkt besonders und bietet mehr als eine Möglichkeit, es zu nutzen.","fr":"Un coffret bien choisi renforce l’effet cadeau et offre plusieurs façons de l’utiliser.","it":"Un set scelto bene amplifica l’effetto regalo e offre più di un modo per usarlo."}},{"id":"fresh-twist","querySuffix":"regalo original diferente","copy":{"es":"Giro inesperado","en":"Unexpected twist","de":"Unerwarteter Dreh","fr":"Touche inattendue","it":"Svolta inaspettata"},"reason":{"es":"Cambiamos la ruta habitual por una versión más inesperada, sin alejarnos de sus gustos.","en":"We take a less obvious route without drifting away from what they like.","de":"Eine weniger offensichtliche Richtung, die trotzdem bei den Interessen dieser Person bleibt.","fr":"On sort du chemin évident sans s’éloigner de ce que cette personne aime.","it":"Una strada meno ovvia, ma sempre coerente con ciò che piace a questa persona."}},{"id":"new-find","querySuffix":"novedades tendencia regalo","copy":{"es":"Descubrimiento reciente","en":"Fresh discovery","de":"Neue Entdeckung","fr":"Nouvelle découverte","it":"Scoperta recente"},"reason":{"es":"Ponemos el foco en lo que acaba de aparecer o está ganando tracción en la búsqueda.","en":"We focus on items that are newly appearing or gaining traction in the search.","de":"Der Fokus liegt auf Dingen, die neu auftauchen oder in der Suche an Aufmerksamkeit gewinnen.","fr":"On privilégie ce qui apparaît récemment ou gagne en visibilité dans la recherche.","it":"Diamo priorità a ciò che compare da poco o sta guadagnando attenzione nella ricerca."}},{"id":"small-luxury","querySuffix":"premium calidad","copy":{"es":"Pequeño lujo","en":"Small luxury","de":"Kleiner Luxus","fr":"Petit luxe","it":"Piccolo lusso"},"reason":{"es":"Si el presupuesto lo permite, buscamos una versión con mejores materiales o más presencia.","en":"When the budget allows, look for a version with better materials or more presence.","de":"Wenn das Budget es erlaubt, suchen wir nach besseren Materialien und mehr Präsenz.","fr":"Quand le budget le permet, on cherche une version avec de meilleurs matériaux ou plus de présence.","it":"Se il budget lo permette, cerchiamo una versione con materiali migliori o più presenza."}}];

function recipeCopy(recipe, field) {
  var copy = recipe && recipe[field] || {};
  return copy[state.language] || copy.es || '';
}

function isRecipeCompatible(gift, recipe) {
  if (!gift || !recipe) return false;
  if (recipe.id === 'make-a-plan' && ['planes', 'momentos', 'sabores', 'viajes', 'juegos', 'creatividad'].indexOf(gift.category) === -1) return false;
  if (recipe.id === 'small-luxury' && gift.price < 35) return false;
  return true;
}

function composeGift(gift, recipe, answers, variant) {
  var baseId = gift.baseId || gift.id;
  var composed = Object.assign({}, gift);
  var discoveryScore = (hashString('discovery|' + baseId) % 1000) / 1000;
  if (recipe.id === 'new-find') discoveryScore += 0.35;
  if (recipe.id === 'fresh-twist') discoveryScore += 0.18;
  composed.baseId = baseId;
  composed.id = baseId + '::' + recipe.id;
  composed._recipeId = recipe.id;
  composed._recipe = recipe;
  composed._isDiscovery = recipe.id === 'new-find';
  composed._discoveryScore = Math.min(1, discoveryScore);
  composed._compositionSeed = hashString(baseId + '|' + recipe.id + '|' + String(variant));
  composed.amazonQuery = String(gift.amazonQuery || gift.title) + ' ' + recipe.querySuffix;
  return composed;
}

function recipeBoost(gift, mode, answers) {
  var boost = 0;
  if (!gift || !gift._recipeId) return boost;
  if (mode === 'fit' && gift._recipeId === 'smart-fit') boost += 5;
  if (mode === 'surprise') {
    if (gift._recipeId === 'fresh-twist') boost += 18;
    if (gift._recipeId === 'make-a-plan') boost += 6;
    if (gift._recipeId === 'gift-set') boost += 4;
    if (gift._recipeId === 'smart-fit') boost -= 3;
  }
  if (mode === 'new') {
    if (gift._recipeId === 'new-find') boost += 28;
    if (gift._recipeId === 'fresh-twist') boost += 12;
    boost += Math.round((gift._discoveryScore || 0) * 10);
  }
  if (answers && answers.style === 'original' && gift._recipeId === 'fresh-twist') boost += 5;
  if (answers && answers.style === 'premium' && gift._recipeId === 'small-luxury') boost += 5;
  return boost;
}


function profileKeyFor(answers) {
  var interests = selectedInterests(answers).slice().sort();
  return [
    answers && answers.relation || 'other',
    answers && answers.gender || 'unknown',
    answers && answers.age || 'unknown',
    answers && answers.occasion || 'birthday',
    answers && answers.budget || '20to40',
    interests.join(',') || 'any',
    answers && answers.style || 'useful',
    answers && answers.country || APP_CONFIG.defaultCountry
  ].join('~');
}

function readVarietyStore() {
  try {
    var raw = localStorage.getItem(VARIETY_STORAGE_KEY);
    var parsed = raw ? JSON.parse(raw) : null;
    if (parsed && parsed.profiles && typeof parsed.profiles === 'object') return parsed;
  } catch (error) {}
  return { profiles: {} };
}

function seenIdsFor(answers) {
  var store = readVarietyStore();
  var ids = store.profiles[profileKeyFor(answers)];
  return Array.isArray(ids) ? ids : [];
}

function rememberRecommendations(answers, gifts) {
  if (!Array.isArray(gifts) || !gifts.length) return;
  var store = readVarietyStore();
  var key = profileKeyFor(answers);
  var ids = Array.isArray(store.profiles[key]) ? store.profiles[key].slice() : [];
  gifts.forEach(function (gift) {
    if (gift && ids.indexOf(gift.id) === -1) ids.push(gift.id);
  });
  store.profiles[key] = ids.slice(-Math.max(GIFT_CATALOG.length * GIFT_RECIPES.length, 2500));
  try {
    localStorage.setItem(VARIETY_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {}
}

function giftFitScore(gift, answers, budget, interests) {
  answers = answers || {};
  budget = budget || budgetFor(answers.budget);
  interests = Array.isArray(interests) ? interests : selectedInterests(answers);
  var relationSignal = !answers.relation || answers.relation === 'other' ? 0.78 : (gift.relations.indexOf(answers.relation) !== -1 ? 1 : 0.28);
  var overlap = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; }).length;
  var interestSignal = interests.length ? Math.min(1, overlap / Math.max(1, Math.min(interests.length, 2))) : 0.72;
  var budgetSignal = gift.price <= budget.max ? 1 : (gift.price <= budget.max * 1.15 ? 0.65 : (gift.price <= budget.max * 1.4 ? 0.35 : 0.05));
  var occasionSignal = !answers.occasion || gift.occasions.indexOf(answers.occasion) !== -1 ? 1 : 0.42;
  var styleSignal = !answers.style || gift.styles.indexOf(answers.style) !== -1 ? 1 : 0.42;
  var ageSignal = !answers.age || answers.age === 'unknown' ? 0.78 : (gift.ages.indexOf(answers.age) !== -1 ? 1 : 0.35);
  var genderSignal = 0.8;
  if (gift.genders && gift.genders.length && answers.gender) genderSignal = gift.genders.indexOf(answers.gender) !== -1 ? 1 : 0.3;
  return Math.round(relationSignal * 20 + interestSignal * 25 + budgetSignal * 20 + occasionSignal * 14 + styleSignal * 10 + ageSignal * 8 + genderSignal * 3);
}

function giftMatchRate(gift, answers) {
  var fit = giftFitScore(gift, answers);
  return Math.max(62, Math.min(96, Math.round(62 + fit * 0.34)));
}

var MATCH_RATE_LABELS = { es: 'Encaje estimado', en: 'Estimated fit', de: 'Geschätzte Passung', fr: 'Adéquation estimée', it: 'Corrispondenza stimata' };
var MATCH_RATE_DISCLOSURES = { es: 'El encaje es una estimación basada en tus respuestas; no es una puntuación de Amazon.', en: 'The fit is an estimate based on your answers; it is not an Amazon rating.', de: 'Die Passung ist eine Schätzung auf Basis deiner Antworten und keine Amazon-Bewertung.', fr: 'L’adéquation est une estimation basée sur vos réponses, pas une note Amazon.', it: 'La corrispondenza è una stima basata sulle tue risposte, non una valutazione Amazon.' };
function formatMatchRate(rate) { return String(rate) + '% · ' + (MATCH_RATE_LABELS[state.language] || MATCH_RATE_LABELS.es); }
function matchRateDisclosure() { return MATCH_RATE_DISCLOSURES[state.language] || MATCH_RATE_DISCLOSURES.es; }

function scoreGift(gift, answers, budget, interests, mode) {
  var score = (gift.editorialScore || 0) * 2;
  var overlap = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; }).length;
  score += Math.min(overlap * 8, 20);
  if (gift.price <= budget.max) score += 8;
  else if (gift.price <= budget.max * 1.15) score += 3;
  else if (gift.price <= budget.max * 1.4) score -= 1;
  else score -= 8;
  if (budget.max >= 150 && gift.price >= 80) score += 3;
  if (answers.style && gift.styles.indexOf(answers.style) !== -1) score += 7;
  if (answers.relation && answers.relation !== 'other' && gift.relations.indexOf(answers.relation) !== -1) score += 6;
  if (!answers.age || answers.age === 'unknown' || gift.ages.indexOf(answers.age) !== -1) score += 4;
  if (!answers.occasion || gift.occasions.indexOf(answers.occasion) !== -1) score += 4;
  if (answers.relation === 'child' && gift.ages.indexOf('child') !== -1) score += 5;
  score += giftFitScore(gift, answers, budget, interests) * 0.12;
  score += recipeBoost(gift, mode, answers);
  return score;
}

function chooseDiverseGiftItems(items, limit) {
  var result = [];
  var categoryCounts = {};
  var baseCounts = {};
  [1, 2].forEach(function (maxPerCategory) {
    items.forEach(function (item) {
      if (result.length >= limit || result.indexOf(item) !== -1) return;
      var category = item.gift.category;
      var baseId = item.gift.baseId || item.gift.id;
      var count = categoryCounts[category] || 0;
      if (baseCounts[baseId] || count >= maxPerCategory) return;
      result.push(item);
      categoryCounts[category] = count + 1;
      baseCounts[baseId] = 1;
    });
  });
  if (result.length < limit) {
    items.forEach(function (item) {
      var baseId = item.gift.baseId || item.gift.id;
      if (result.length < limit && result.indexOf(item) === -1 && !baseCounts[baseId]) {
        result.push(item);
        baseCounts[baseId] = 1;
      }
    });
  }
  return result.slice(0, limit);
}

function rankGifts(answers, variant) {
  variant = Number.isFinite(variant) ? variant : 0;
  var budget = budgetFor(answers.budget);
  var interests = selectedInterests(answers);
  var profileKey = profileKeyFor(answers);
  var seenIds = seenIdsFor(answers);
  var recentIds = state && Array.isArray(state.lastRecommendationIds) ? state.lastRecommendationIds : [];
  var mode = state && state.recommendationMode || 'fit';
  var candidateItems = [];
  GIFT_CATALOG.forEach(function (baseGift, index) {
    GIFT_RECIPES.forEach(function (recipe, recipeIndex) {
      if (!isRecipeCompatible(baseGift, recipe)) return;
      var gift = composeGift(baseGift, recipe, answers, variant);
      var baseScore = scoreGift(gift, answers, budget, interests, mode);
      var variety = (hashString(profileKey + '|' + String(variant) + '|' + gift.id) % 10000) / 10000;
      var fresh = seenIds.indexOf(gift.id) === -1;
      var recent = recentIds.indexOf(gift.id) !== -1;
      var modeBoost = mode === 'new' && gift._isDiscovery ? 12 : 0;
      candidateItems.push({ gift: gift, baseScore: baseScore, fresh: fresh, recent: recent, selectionScore: baseScore * 3 + variety * 14 + modeBoost, index: index * 10 + recipeIndex });
    });
  });
  candidateItems.sort(function (a, b) { return b.baseScore - a.baseScore || b.selectionScore - a.selectionScore || a.index - b.index; });
  var budgetRanked = candidateItems.filter(function (item) { return item.gift.price <= budget.max; });
  var ranked = budgetRanked.length ? budgetRanked : candidateItems;
  var topScore = ranked.length ? ranked[0].baseScore : 0;
  var freshStrong = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 12; });
  var freshGood = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 20; });
  var candidatePool = freshStrong.length >= 10 ? freshStrong : (freshGood.length >= 10 ? freshGood : freshGood.slice());
  var alreadyIncluded = candidatePool.map(function (item) { return item.gift.id; });
  var seenGood = ranked.filter(function (item) {
    return !item.fresh && item.baseScore >= topScore - 14 && alreadyIncluded.indexOf(item.gift.id) === -1;
  });
  if (candidatePool.length < 10) {
    seenGood.forEach(function (item) {
      if (candidatePool.length < 24 && alreadyIncluded.indexOf(item.gift.id) === -1) {
        candidatePool.push(item);
        alreadyIncluded.push(item.gift.id);
      }
    });
  }
  if (candidatePool.length < 10) {
    ranked.forEach(function (item) {
      if (candidatePool.length < 24 && alreadyIncluded.indexOf(item.gift.id) === -1 && item.baseScore >= topScore - 28) {
        candidatePool.push(item);
        alreadyIncluded.push(item.gift.id);
      }
    });
  }
  candidatePool.forEach(function (item) {
    item.selectionScore += item.fresh ? 12 : 0;
    if (item.recent) item.selectionScore -= 120;
  });
  candidatePool.sort(function (a, b) {
    return b.selectionScore - a.selectionScore || b.baseScore - a.baseScore || a.index - b.index;
  });
  var selected = chooseDiverseGiftItems(candidatePool, 10);
  if (selected.length < 10) {
    var selectedBases = {};
    selected.forEach(function (item) { selectedBases[item.gift.baseId || item.gift.id] = 1; });
    ranked.forEach(function (item) {
      var baseId = item.gift.baseId || item.gift.id;
      if (selected.length < 10 && !selectedBases[baseId]) {
        selected.push(item);
        selectedBases[baseId] = 1;
      }
    });
  }
  return selected.slice(0, 10).map(function (item) { return item.gift; });
}

function amazonDomain(country) {
  return ({ ES: 'amazon.es', US: 'amazon.com', GB: 'amazon.co.uk', DE: 'amazon.de', FR: 'amazon.fr', IT: 'amazon.it', CA: 'amazon.ca' })[country] || 'amazon.com';
}

function buildAmazonUrl(gift, answers) {
  var params = new URLSearchParams();
  params.set('k', gift.amazonQuery);
  params.set('high-price', String(budgetFor(answers.budget).max));
  if (APP_CONFIG.affiliateTag) params.set('tag', APP_CONFIG.affiliateTag);
  if (state && state.recommendationMode === 'new') {
    params.set('s', 'date-desc-rank');
    params.set('ref', 'sr_st_date-desc-rank');
  }
  return 'https://' + amazonDomain(answers.country || APP_CONFIG.defaultCountry) + '/s?' + params.toString();
}

function buildReason(gift, answers) {
  var interests = selectedInterests(answers);
  var matches = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; });
  var angleReason = gift._recipe && gift._recipe.reason ? recipeCopy(gift._recipe, 'reason') : '';
  var reason = angleReason ? angleReason + ' ' + gift.reason : gift.reason;
  if (matches.length) {
    var labels = matches.slice(0, 2).map(function (interest) { return getLabel('interests', interest).toLowerCase(); });
    return 'Conecta con ' + labels.join(' y ') + ' y mantiene un tono ' + getLabel('style', answers.style).toLowerCase() + '. ' + reason;
  }
  return reason;
}

function summaryChips(answers) {
  var chips = [getLabel('relation', answers.relation), getLabel('gender', answers.gender), getLabel('age', answers.age), getLabel('occasion', answers.occasion), getLabel('budget', answers.budget), getLabel('style', answers.style), getLabel('country', answers.country)];
  selectedInterests(answers).slice(0, 3).forEach(function (interest) { chips.push(getLabel('interests', interest)); });
  return chips.filter(Boolean).map(function (chip) { return '<span class="summary-chip">' + escapeHtml(chip) + '</span>'; }).join('');
}

function celebrate() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  var context = canvas.getContext('2d');
  if (!context) {
    canvas.remove();
    return;
  }
  var width = window.innerWidth;
  var height = window.innerHeight;
  var ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);
  var colors = ['#e46c57', '#b64b3c', '#ef9b82', '#dfe9dc', '#eee9f8', '#29241f'];
  var pieces = Array.from({ length: 76 }, function (_, index) {
    return {
      x: Math.random() * width,
      y: -20 - Math.random() * height * 0.22,
      width: 5 + Math.random() * 5,
      height: 7 + Math.random() * 8,
      velocityX: (Math.random() - 0.5) * 2.2,
      velocityY: 2.2 + Math.random() * 2.7,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.18,
      color: colors[index % colors.length]
    };
  });
  var startedAt = performance.now();
  function draw(now) {
    var elapsed = now - startedAt;
    var opacity = elapsed > 1300 ? Math.max(0, 1 - (elapsed - 1300) / 650) : 1;
    context.clearRect(0, 0, width, height);
    context.globalAlpha = opacity;
    pieces.forEach(function (piece) {
      piece.x += piece.velocityX;
      piece.y += piece.velocityY;
      piece.velocityY += 0.035;
      piece.rotation += piece.spin;
      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.fillStyle = piece.color;
      context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      context.restore();
    });
    context.globalAlpha = 1;
    if (elapsed < 1950) {
      window.requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }
  window.requestAnimationFrame(draw);
}

function renderResults(shouldCelebrate, preserveRecommendations, preservePosition) {
  var savedPosition = preservePosition ? getScrollPosition() : null;
  var copy = currentCopy();
  if (!preserveRecommendations || !currentRecommendations.length) {
    currentRecommendations = rankGifts(state.answers, state.variant);
    state.lastRecommendationIds = currentRecommendations.map(function (gift) { return gift.id; });
    rememberRecommendations(state.answers, currentRecommendations);
    trackEvent('recommendations_viewed', { resultCount: currentRecommendations.length, variant: state.variant, mode: state.recommendationMode || 'fit' });
  }
  var title = copy.results.genericTitle + '.';
  var relation = getLabel('relation', state.answers.relation).toLowerCase();
  if (state.answers.relation && state.answers.relation !== 'other') {
    title = interpolate(copy.results.relationTitle, { relation: relation });
  }
  var activeMode = 'fit';
  results.innerHTML = '<div class="results-head">' +
    '<p class="results-kicker">' + escapeHtml(copy.results.ready) + '</p>' +
    '<h2 id="results-title">' + escapeHtml(title) + '</h2>' +
    '<p class="results-intro">' + escapeHtml(copy.results.intro) + '</p>' +
    '<div class="summary-chips" aria-label="' + escapeHtml(copy.results.chips) + '">' + summaryChips(state.answers) + '</div>' +
    '</div>' +
    '<div class="results-toolbar"><button class="button button-ghost" type="button" data-action="adjust">' + escapeHtml(copy.results.adjust) + '</button><button class="button button-ghost" type="button" data-action="refresh">' + escapeHtml(copy.results.refresh) + '</button><button class="button button-ghost" type="button" data-action="share">' + escapeHtml(copy.results.share) + '</button></div>' +
    '<div class="gift-list">' + currentRecommendations.map(function (gift, index) {
      var localized = localizedGift(gift);
      var tags = localized.tags.map(function (tag) { return '<span class="gift-tag">' + escapeHtml(tag) + '</span>'; }).join('');
      var discovery = activeMode === 'new' || localized.isDiscovery;
      var cardClass = 'gift-card' + (index === 0 ? ' gift-card-featured' : '') + (discovery ? ' gift-card-discovery' : '');
      var angle = localized.angle ? '<p class="gift-angle"><span class="gift-angle-mark" aria-hidden="true">✦</span>' + escapeHtml(localized.angle) + (discovery ? ' <span class="gift-new-badge">' + escapeHtml(copy.results.newBadge) + '</span>' : '') + '</p>' : '';
      return '<article class="' + cardClass + '" style="--gift-index: ' + index + ';">' +
        (index === 0 ? '<p class="gift-badge">' + escapeHtml(copy.results.badge) + '</p>' : '') +
        '<div class="gift-card-top"><span class="gift-number">' + String(index + 1).padStart(2, '0') + '</span><span class="gift-icon" aria-hidden="true">' + gift.icon + '</span></div>' +
        '<h3>' + escapeHtml(localized.title) + '</h3><p class="gift-price">' + escapeHtml(interpolate(copy.results.price, { price: gift.price })) + '</p>' + angle +
        '<div class="gift-match" aria-label="' + escapeHtml(formatMatchRate(giftMatchRate(gift, state.answers))) + '"><span class="gift-match-label">' + escapeHtml(formatMatchRate(giftMatchRate(gift, state.answers))) + '</span><span class="gift-match-track" aria-hidden="true"><span class="gift-match-fill" style="width: ' + String(giftMatchRate(gift, state.answers)) + '%;"></span></span></div>' +
        '<p class="gift-reason">' + escapeHtml(buildReason(gift, state.answers)) + '</p>' +
        '<div class="gift-tags">' + tags + '</div>' +
        '<div class="gift-card-actions"><a class="gift-link" href="' + escapeHtml(buildAmazonUrl(gift, state.answers)) + '" target="_blank" rel="sponsored nofollow noopener" data-gift-id="' + escapeHtml(gift.id) + '" data-gift-position="' + String(index + 1) + '">' + escapeHtml(copy.results.link) + ' <span aria-hidden="true">↗</span></a></div></article>';
    }).join('') + '</div>' +
    '<p class="results-note">' + escapeHtml(copy.results.note + ' ' + matchRateDisclosure()) + '</p>';
  hero.hidden = true;
  wizard.hidden = true;
  trustStrip.hidden = true;
  seoContent.hidden = true;
  results.hidden = false;
  var revealResultsAtTop = function () {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  if (savedPosition) {
    restoreScrollPosition(savedPosition);
  } else {
    revealResultsAtTop();
    window.requestAnimationFrame(revealResultsAtTop);
    window.setTimeout(revealResultsAtTop, 0);
  }
  results.classList.remove('results-transition');
  void results.offsetWidth;
  results.classList.add('results-transition');
  if (shouldCelebrate !== false) celebrate();
}

function showWizardAtLastStep() {
  hero.hidden = false;
  wizard.hidden = false;
  trustStrip.hidden = false;
  seoContent.hidden = false;
  results.hidden = true;
  state.step = QUESTIONS.length - 1;
  renderQuestion();
}

function resetApp() {
  trackEvent('quiz_reset', {});
  try {
    var resetUrl = new URL(window.location.href);
    if (resetUrl.searchParams.get('r') === '1') {
      resetUrl.searchParams.delete('r');
      ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country', 'interests', 'mode', 'v', 'utm_source', 'utm_medium', 'utm_campaign'].forEach(function (key) { resetUrl.searchParams.delete(key); });
      window.history.replaceState({}, '', resetUrl.pathname + (resetUrl.search ? resetUrl.search : '') + resetUrl.hash);
    }
  } catch (error) {}
  state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], language: state.language, recommendationMode: 'fit', analyticsStarted: false, answers: { interests: [] } };
  currentRecommendations = [];
  applyLanguage();
  hero.hidden = false;
  wizard.hidden = false;
  trustStrip.hidden = false;
  seoContent.hidden = false;
  results.hidden = true;
  render();
}

function recordClick(giftId, position) {
  try {
    var clicks = JSON.parse(localStorage.getItem(APP_CONFIG.clickStorageKey) || '[]');
    clicks.push({ id: giftId, position: position ? Number(position) : null, at: new Date().toISOString(), country: state.answers.country || APP_CONFIG.defaultCountry });
    localStorage.setItem(APP_CONFIG.clickStorageKey, JSON.stringify(clicks.slice(-100)));
  } catch (error) {
    // Private browsing or blocked storage should never stop an outbound link.
  }
  trackEvent('gift_outbound_clicked', { giftId: giftId, position: position ? Number(position) : null, country: state.answers.country || APP_CONFIG.defaultCountry });
}

function buildShareUrl() {
  var params = new URLSearchParams();
  params.set('r', '1');
  ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country'].forEach(function (key) {
    if (state.answers[key]) params.set(key, state.answers[key]);
  });
  params.set('interests', selectedInterests(state.answers).join(','));
  params.set('v', String(state.variant));
  params.set('utm_source', 'share');
  params.set('utm_medium', 'regalazo');
  params.set('utm_campaign', 'gift-selection');
  return window.location.origin + window.location.pathname + '?' + params.toString();
}

function isValidSharedValue(questionId, value) {
  var question = getQuestion(questionId);
  return !!(question && value && question.options.some(function (option) { return option.value === value; }));
}

function readSharedAnswers() {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('r') !== '1') return null;
    var answers = { interests: [] };
    ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country'].forEach(function (key) {
      var value = params.get(key);
      if (isValidSharedValue(key, value)) answers[key] = value;
    });
    var interests = (params.get('interests') || '').split(',').filter(function (value) { return isValidSharedValue('interests', value); }).slice(0, 3);
    if (!answers.relation || !answers.gender || !answers.age || !answers.occasion || !answers.budget || !answers.style || !answers.country || !interests.length) return null;
    answers.interests = interests;
    return answers;
  } catch (error) {
    return null;
  }
}

function readSharedVariant() {
  try {
    var raw = new URLSearchParams(window.location.search).get('v');
    var value = Number(raw);
    return raw && Number.isFinite(value) && value >= 0 ? value : hashString(window.location.search);
  } catch (error) {
    return hashString(window.location.search);
  }
}

function buildShareMessage() {
  var copy = currentCopy();
  var gift = currentRecommendations[0];
  var title = gift ? localizedGift(gift).title : copy.results.shareText;
  return copy.results.shareText + ' ' + title + ' →';
}

function shareSelection() {
  var copy = currentCopy();
  var url = buildShareUrl();
  trackEvent('share_clicked', { mode: state.recommendationMode || 'fit' });
  if (navigator.share) {
    navigator.share({ title: copy.results.share, text: buildShareMessage(), url: url }).then(function () {
      trackEvent('share_completed', { method: 'native', mode: state.recommendationMode || 'fit' });
    }).catch(function () {});
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () { showToast(copy.messages.copied); trackEvent('share_completed', { method: 'clipboard', mode: state.recommendationMode || 'fit' }); }).catch(function () { showToast(copy.messages.copyHint); });
  } else {
    showToast(copy.messages.copyHint);
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = window.setTimeout(function () { toast.hidden = true; }, 3000);
}

function getScrollPosition() {
  return {
    left: window.scrollX || document.documentElement.scrollLeft || 0,
    top: window.scrollY || document.documentElement.scrollTop || 0
  };
}

function restoreScrollPosition(position) {
  if (!position) return;
  window.scrollTo(position.left, position.top);
  window.requestAnimationFrame(function () {
    window.scrollTo(position.left, position.top);
  });
}

questionRegion.addEventListener('pointerdown', function (event) {
  var option = event.target.closest('[data-option]');
  if (option) {
    pendingScrollPosition = getScrollPosition();
    lastScrollPosition = pendingScrollPosition;
  }
});

questionRegion.addEventListener('click', function (event) {
  var option = event.target.closest('[data-option]');
  if (option) {
    var scrollPosition = pendingScrollPosition;
    pendingScrollPosition = null;
    handleOption(option.getAttribute('data-option'), scrollPosition);
  }
});

nextButton.addEventListener('click', advance);
backButton.addEventListener('click', goBack);

results.addEventListener('click', function (event) {
  var action = event.target.closest('[data-action]');
  if (action) {
    var actionName = action.getAttribute('data-action');
    if (actionName === 'adjust') showWizardAtLastStep();
    if (actionName === 'refresh') { state.variant += 1; trackEvent('recommendations_refreshed', { variant: state.variant, mode: state.recommendationMode || 'fit' }); renderResults(false); }
    if (actionName === 'share') shareSelection();
    return;
  }
  var link = event.target.closest('[data-gift-id]');
  if (link) recordClick(link.getAttribute('data-gift-id'), link.getAttribute('data-gift-position'));
});

document.querySelector('.brand').addEventListener('click', function (event) {
  if (state.step > 0 || !results.hidden) {
    event.preventDefault();
    resetApp();
  }
});

function setLanguage(language) {
  if (!LANGUAGE_COPY[language]) return;
  var previousLanguage = state.language;
  if (previousLanguage === language) {
    applyLanguage();
    return;
  }
  state.language = language;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {}
  applyLanguage();
  trackEvent('language_changed', { from: previousLanguage, to: language });
  if (!results.hidden) renderResults(false, true, getScrollPosition());
  else render();
}

if (languageSelect) {
  languageSelect.addEventListener('change', function (event) {
    setLanguage(event.target.value);
  });
}

if (weeklyDiscovery) {
  weeklyDiscovery.addEventListener('click', function (event) {
    if (event.target.closest('a')) trackEvent('weekly_discovery_clicked', {});
  });
}

if (analyticsConsentAcceptButton) {
  analyticsConsentAcceptButton.addEventListener('click', function () {
    setAnalyticsConsent('granted');
  });
}

if (analyticsConsentRejectButton) {
  analyticsConsentRejectButton.addEventListener('click', function () {
    setAnalyticsConsent('denied');
  });
}

if (analyticsPreferencesButton) {
  analyticsPreferencesButton.addEventListener('click', openAnalyticsPreferences);
}

var sharedAnswers = readSharedAnswers();
if (sharedAnswers) {
  state.answers = sharedAnswers;
  state.step = QUESTIONS.length;
  state.recommendationMode = 'fit';
  state.variant = readSharedVariant();
  trackEvent('shared_result_opened', { mode: state.recommendationMode });
}

registerPwa();
applyLanguage();
render();
if (analyticsConsentState === 'granted') loadMixpanel();
else if (!analyticsConsentState) showAnalyticsConsent();
