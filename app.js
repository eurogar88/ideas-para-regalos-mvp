'use strict';

/*
 * The first MVP is intentionally deterministic. The catalog is the source of truth;
 * a future AI layer may rank catalog ids, but it must never invent products or URLs.
 */
var APP_CONFIG = Object.freeze({
  affiliateTag: 'lamamihacker-21',
  defaultCountry: 'ES',
  clickStorageKey: 'regalazo-clicks-v1'
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
  { id: 'mug-warmer', title: 'Calentador de taza para el escritorio', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '☕', price: 34, interests: ['tech', 'home', 'food'], styles: ['useful', 'original'], relations: ['partner', 'parent', 'friend', 'coworker'], ages: ['adult', 'midlife', '50plus'], occasions: ['birthday', 'christmas', 'thankyou'], amazonQuery: 'calentador taza escritorio café usb', tags: ['escritorio', 'útil'], reason: 'Un regalo muy concreto para quien siempre se olvida de su bebida mientras trabaja.', editorialScore: 4 }
];


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
    footer: ['Regalazo es un proyecto independiente. Los precios y la disponibilidad pueden cambiar.', 'Como asociado de Amazon, puedo obtener ingresos por compras que cumplan los requisitos aplicables.']
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

var ANALYTICS_CONFIG = Object.freeze({ provider: 'mixpanel', enabled: false, token: '', version: 'v1' });
var ANALYTICS_QUEUE = [];


var GIFT_TITLE_COPY = {
  en: {
    'mini-photo-printer': 'Mini photo printer for memories', 'coffee-kit': 'Specialty coffee ritual', 'tea-ritual': 'Tea break set', 'portable-speaker': 'Speaker for a soundtrack', 'e-reader': 'E-reader for getting lost in stories', 'book-light': 'Neck reading light', 'botanical-puzzle': 'Art puzzle to unwind', 'botanical-lego': 'Flowers that need no water', 'couple-board-game': 'Board game for two', 'travel-organizer': 'Travel cable organizer', 'packing-cubes': 'Better organized luggage', 'card-holder': 'Card holder for every day', 'mechanical-keyboard': 'Keyboard to work or play better', 'earbuds': 'Earbuds for their everyday moments', 'usbc-hub': 'Hub to connect everything', 'resistance-bands': 'A workout that fits at home', 'yoga-mat': 'Mat to slow down', 'running-belt': 'Belt for running light', 'chocolate-box': 'Box of chocolates with a story', 'hot-sauce-set': 'Spicy sauce tasting route', 'skincare-set': 'Unhurried self-care kit', 'selfcare-candle': 'Candle to change the mood', 'herb-garden': 'Mini kitchen herb garden', 'chef-knife': 'A tool for better cooking', 'instant-camera': 'Camera for instant photos', 'fountain-pen': 'Notebook and pen for ideas', 'watercolor-kit': 'Creative kit without instructions', 'portable-projector': 'Impromptu cinema on any wall', 'massage-gun': 'Recovery after moving', 'digital-luggage-scale': 'The scale that avoids surprises', 'digital-photo-frame': 'Photos that change on their own', 'urban-backpack': 'Backpack for every day', 'powerbank': 'Battery to stay charged', 'date-night-box': 'At-home date night box', 'movie-night-kit': 'Home cinema kit', 'picnic-set': 'Set for an impromptu picnic', 'cocktail-kit': 'Cocktail-making kit', 'spice-rack': 'World spices collection', 'pasta-maker': 'Fresh pasta-making kit', 'wireless-charging-station': 'Charging station to keep everything close', 'smart-speaker': 'Smart speaker for the home', 'monitor-light-bar': 'Light to upgrade the desk', 'webcam-light': 'Compact light for video calls', 'card-game': 'Conversation card game', 'cooperative-board-game': 'Cooperative game for an afternoon', 'gaming-headset': 'Headset for their setup', 'foam-roller': 'Post-workout recovery kit', 'hiking-bottle': 'Durable bottle for their routes', 'fitness-tracker': 'Band to move more', 'hiking-headlamp': 'Headlamp for getaways', 'toiletry-bag': 'Well-organized wash bag', 'passport-wallet': 'Travel wallet for light packing', 'weekend-bag': 'Weekend getaway bag', 'travel-pillow': 'Comfortable pillow for travelling', 'photo-album': 'Album for arranging memories', 'custom-map-print': 'Map of an important place', 'photo-light-box': 'Light box with a special photo', 'memory-journal': 'Journal to fill with stories', 'calligraphy-kit': 'Lettering kit to get started', 'model-building-kit': 'Model kit to build at your own pace', 'bath-salts-set': 'Bath set to slow down', 'sleep-mask': 'Sleep mask and a small rest ritual', 'standing-mirror': 'Stylish tabletop mirror', 'room-diffuser': 'Diffuser to change the atmosphere', 'cozy-blanket': 'Soft blanket for sofa time', 'desk-organizer': 'Beautiful desk organizer', 'cookbook': 'Recipe book to whet the appetite', 'bookstand': 'Stand for reading or cooking', 'vinyl-record': 'A vinyl record to listen to slowly', 'midi-keyboard': 'Keyboard to play with music', 'noise-cancelling-headphones': 'Headphones for a little quiet', 'instant-film-pack': 'Instant film pack', 'smartwatch': 'Watch for everyday life', 'coffee-grinder': 'Grinder to improve the coffee', 'cast-iron-pot': 'Pot for slow cooking', 'digital-notebook': 'Digital notebook for writing and planning', 'portable-mic': 'Microphone for creating or singing', 'lego-architecture': 'Architecture build to display', 'backgammon-set': 'Backgammon for long afternoons', 'spa-headband-set': 'Self-care set to switch off', 'tea-subscription': 'Tea selection to discover', 'sauce-making-kit': 'Homemade sauce kit', 'reusable-cup': 'Reusable cup for their mornings',     'personalized-keychain': 'Personalized keychain for a shared memory', 'couples-question-cards': 'Question cards for two', 'memory-box': 'Box for keeping little memories', 'photo-calendar': 'Photo calendar for the whole year', 'experience-scratch-card': 'Scratch cards for future plans', 'portable-espresso-maker': 'Specialty coffee to take anywhere', 'milk-frother': 'Frother for better coffee', 'pizza-stone': 'Pizza stone for home cooking', 'baking-kit': 'Baking kit for something delicious', 'olive-oil-tasting': 'Olive oil tasting for the table', 'smart-tracker-tag': 'Tracker for the important things', 'wireless-mouse': 'Comfortable mouse for the desk', 'phone-tripod': 'Tripod for hands-free filming', 'portable-ssd': 'Fast drive for their projects', 'smart-plug': 'Smart plug to simplify the home', 'tablet-stand': 'Stand for reading or watching', 'travel-adapter': 'Adapter for worry-free travel', 'travel-journal': 'Journal for future journeys', 'dry-bag': 'Dry bag for outdoor escapes', 'travel-coffee-mug': 'Travel mug for mornings away', 'massage-ball': 'Massage ball to release tension', 'gym-towel-set': 'Light towels for training', 'running-socks': 'Technical socks for moving better', 'bike-multitool': 'Multitool for their bicycle', 'pickleball-set': 'Set for trying a new sport', 'hand-care-set': 'Hand care set', 'weighted-eye-mask': 'Relaxing eye mask to switch off', 'sleep-sound-machine': 'Soft sounds for better sleep', 'heated-mug': 'Base to keep coffee warm', 'sunglasses': 'Sunglasses for outdoor plans', 'leather-belt': 'Belt that goes with everything', 'bookends': 'Bookends for a tidier shelf', 'reading-journal': 'Journal for tracking their reading', 'embroidery-kit': 'Embroidery kit to create slowly', 'paint-by-numbers': 'Paint-by-numbers artwork', 'record-cleaning-kit': 'Kit for caring for vinyl records', 'karaoke-mic': 'Microphone for singing without shame', 'vinyl-display-frame': 'Frame for displaying a favourite record', 'trivia-game': 'Question game for laughing together', 'escape-room-game': 'Escape room to solve at home', 'poker-set': 'Poker set for game nights', 'plant-watering-kit': 'Kit for caring for their plants', 'bird-feeder': 'Feeder for watching nature', 'electric-blanket': 'Electric blanket for sofa evenings', 'mini-waffle-maker': 'Mini waffle maker for planned breakfasts', 'beer-tasting-set': 'Beer tasting set', 'scented-hand-cream': 'Hand cream with a special scent', 'plant-care-tools': 'Pretty tools for their green corner', 'crossbody-bag': 'Crossbody bag for travelling light', 'mug-warmer': 'Mug warmer for the desk'
  },
  de: {
    'mini-photo-printer': 'Mini-Fotodrucker für Erinnerungen', 'coffee-kit': 'Ritual für Spezialitätenkaffee', 'tea-ritual': 'Teeset für eine kleine Pause', 'portable-speaker': 'Lautsprecher für den Soundtrack', 'e-reader': 'E-Reader für Geschichten', 'book-light': 'Leselampe zum Umhängen', 'botanical-puzzle': 'Kunstpuzzle zum Abschalten', 'botanical-lego': 'Blumen, die kein Wasser brauchen', 'couple-board-game': 'Brettspiel für zwei', 'travel-organizer': 'Kabel-Organizer für unterwegs', 'packing-cubes': 'Besser gepackter Koffer', 'card-holder': 'Kartenetui für jeden Tag', 'mechanical-keyboard': 'Tastatur für Arbeit und Gaming', 'earbuds': 'Kopfhörer für den Alltag', 'usbc-hub': 'Hub für alle Anschlüsse', 'resistance-bands': 'Training für zu Hause', 'yoga-mat': 'Matte zum Runterkommen', 'running-belt': 'Laufgürtel für unterwegs', 'chocolate-box': 'Pralinenbox mit Geschichte', 'hot-sauce-set': 'Scharfe Saucen zum Probieren', 'skincare-set': 'Pflegeset ohne Eile', 'selfcare-candle': 'Kerze für eine andere Stimmung', 'herb-garden': 'Mini-Kräutergarten für die Küche', 'chef-knife': 'Küchenwerkzeug fürs bessere Kochen', 'instant-camera': 'Kamera für Sofortbilder', 'fountain-pen': 'Notizbuch und Füller für Ideen', 'watercolor-kit': 'Kreativset ohne Anleitung', 'portable-projector': 'Kino an jeder Wand', 'massage-gun': 'Erholung nach dem Sport', 'digital-luggage-scale': 'Gepäckwaage gegen Überraschungen', 'digital-photo-frame': 'Digitaler Rahmen mit wechselnden Fotos', 'urban-backpack': 'Rucksack für den Alltag', 'powerbank': 'Powerbank für unterwegs', 'date-night-box': 'Box für einen Abend zu zweit zu Hause', 'movie-night-kit': 'Heimkino-Set', 'picnic-set': 'Set für ein spontanes Picknick', 'cocktail-kit': 'Cocktail-Set', 'spice-rack': 'Gewürzsammlung aus aller Welt', 'pasta-maker': 'Set für frische Pasta', 'wireless-charging-station': 'Ladestation für alles Wichtige', 'smart-speaker': 'Smarter Lautsprecher für zu Hause', 'monitor-light-bar': 'Licht für einen besseren Schreibtisch', 'webcam-light': 'Kompaktes Licht für Videocalls', 'card-game': 'Kartenspiel für gute Gespräche', 'cooperative-board-game': 'Kooperatives Spiel für einen Nachmittag', 'gaming-headset': 'Headset für das Gaming-Setup', 'foam-roller': 'Regenerationsset nach dem Training', 'hiking-bottle': 'Robuste Flasche für unterwegs', 'fitness-tracker': 'Fitnessband für mehr Bewegung', 'hiking-headlamp': 'Stirnlampe für Ausflüge', 'toiletry-bag': 'Gut organisierter Kulturbeutel', 'passport-wallet': 'Reiseetui für leichtes Gepäck', 'weekend-bag': 'Tasche für den Wochenendtrip', 'travel-pillow': 'Bequemes Kissen für unterwegs', 'photo-album': 'Album für schöne Erinnerungen', 'custom-map-print': 'Karte eines wichtigen Ortes', 'photo-light-box': 'Leuchtbox mit einem besonderen Foto', 'memory-journal': 'Tagebuch für gemeinsame Geschichten', 'calligraphy-kit': 'Lettering-Set zum Ausprobieren', 'model-building-kit': 'Modellbausatz im eigenen Tempo', 'bath-salts-set': 'Badeset zum Abschalten', 'sleep-mask': 'Schlafmaske für ein kleines Ruhe-Ritual', 'standing-mirror': 'Stilvoller Tischspiegel', 'room-diffuser': 'Diffuser für eine andere Atmosphäre', 'cozy-blanket': 'Weiche Decke für die Couch', 'desk-organizer': 'Schöner Schreibtisch-Organizer', 'cookbook': 'Kochbuch, das Appetit macht', 'bookstand': 'Ständer zum Lesen oder Kochen', 'vinyl-record': 'Eine Schallplatte zum bewussten Hören', 'midi-keyboard': 'Keyboard zum Musikmachen', 'noise-cancelling-headphones': 'Kopfhörer für ein wenig Ruhe', 'instant-film-pack': 'Packung Sofortbildfilm', 'smartwatch': 'Uhr für den Alltag', 'coffee-grinder': 'Mühle für besseren Kaffee', 'cast-iron-pot': 'Topf fürs langsame Kochen', 'digital-notebook': 'Digitales Notizbuch zum Schreiben und Planen', 'portable-mic': 'Mikrofon zum Erstellen oder Singen', 'lego-architecture': 'Architektur-Bausatz zum Ausstellen', 'backgammon-set': 'Backgammon für lange Nachmittage', 'spa-headband-set': 'Selfcare-Set zum Abschalten', 'tea-subscription': 'Teeauswahl zum Entdecken', 'sauce-making-kit': 'Set für hausgemachte Saucen', 'reusable-cup': 'Mehrwegbecher für den Morgen',     'personalized-keychain': 'Personalisiertes Schlüsselband für eine gemeinsame Erinnerung', 'couples-question-cards': 'Fragekarten für zwei', 'memory-box': 'Box für kleine Erinnerungen', 'photo-calendar': 'Fotokalender für das ganze Jahr', 'experience-scratch-card': 'Rubbelkarten für zukünftige Pläne', 'portable-espresso-maker': 'Spezialitätenkaffee für unterwegs', 'milk-frother': 'Milchaufschäumer für besseren Kaffee', 'pizza-stone': 'Pizzastein für zu Hause', 'baking-kit': 'Backset für etwas Leckeres', 'olive-oil-tasting': 'Olivenöl-Verkostung für den Tisch', 'smart-tracker-tag': 'Tracker für wichtige Dinge', 'wireless-mouse': 'Bequeme Maus für den Schreibtisch', 'phone-tripod': 'Stativ zum Filmen ohne Hilfe', 'portable-ssd': 'Schnelle Festplatte für die Projekte', 'smart-plug': 'Smarter Stecker für ein einfacheres Zuhause', 'tablet-stand': 'Halterung zum Lesen oder Schauen', 'travel-adapter': 'Adapter für entspanntes Reisen', 'travel-journal': 'Reisetagebuch für kommende Abenteuer', 'dry-bag': 'Wasserdichte Tasche für Ausflüge', 'travel-coffee-mug': 'Thermobecher für unterwegs', 'massage-ball': 'Massageball gegen Verspannungen', 'gym-towel-set': 'Leichte Handtücher fürs Training', 'running-socks': 'Funktionssocken für mehr Bewegung', 'bike-multitool': 'Multitool für das Fahrrad', 'pickleball-set': 'Set für eine neue Sportart', 'hand-care-set': 'Handpflege-Set', 'weighted-eye-mask': 'Entspannende Augenmaske zum Abschalten', 'sleep-sound-machine': 'Sanfte Klänge für besseren Schlaf', 'heated-mug': 'Untersetzer, der den Kaffee warm hält', 'sunglasses': 'Sonnenbrille für draußen', 'leather-belt': 'Gürtel, der zu allem passt', 'bookends': 'Buchstützen für ein ordentliches Regal', 'reading-journal': 'Lesetagebuch für die Büchersammlung', 'embroidery-kit': 'Stickset zum langsamen Gestalten', 'paint-by-numbers': 'Malen-nach-Zahlen-Bild', 'record-cleaning-kit': 'Set für die Pflege von Schallplatten', 'karaoke-mic': 'Mikrofon zum Singen ohne Scham', 'vinyl-display-frame': 'Rahmen für die Lieblingsplatte', 'trivia-game': 'Fragespiel zum gemeinsamen Lachen', 'escape-room-game': 'Escape Room für zu Hause', 'poker-set': 'Pokerkoffer für Spieleabende', 'plant-watering-kit': 'Set für die Pflanzenpflege', 'bird-feeder': 'Futterstelle zum Beobachten der Natur', 'electric-blanket': 'Heizdecke für gemütliche Sofaabende', 'mini-waffle-maker': 'Mini-Waffeleisen für besondere Frühstücke', 'beer-tasting-set': 'Bierverkostungs-Set', 'scented-hand-cream': 'Handcreme mit besonderem Duft', 'plant-care-tools': 'Schöne Werkzeuge für die grüne Ecke', 'crossbody-bag': 'Umhängetasche für leichtes Unterwegssein', 'mug-warmer': 'Tassenwärmer für den Schreibtisch'
  },
  fr: {
    'mini-photo-printer': 'Mini-imprimante photo souvenir', 'coffee-kit': 'Rituel de café de spécialité', 'tea-ritual': 'Set pour une pause thé', 'portable-speaker': 'Enceinte pour votre bande-son', 'e-reader': 'Liseuse pour se perdre dans les histoires', 'book-light': 'Lampe de lecture tour de cou', 'botanical-puzzle': 'Puzzle d’art pour déconnecter', 'botanical-lego': 'Des fleurs sans eau', 'couple-board-game': 'Jeu de société pour deux', 'travel-organizer': 'Organiseur de câbles de voyage', 'packing-cubes': 'Valise mieux organisée', 'card-holder': 'Porte-cartes pour tous les jours', 'mechanical-keyboard': 'Clavier pour mieux travailler ou jouer', 'earbuds': 'Écouteurs pour ses moments', 'usbc-hub': 'Hub pour tout connecter', 'resistance-bands': 'Entraînement à la maison', 'yoga-mat': 'Tapis pour ralentir', 'running-belt': 'Ceinture pour courir léger', 'chocolate-box': 'Boîte de chocolats avec une histoire', 'hot-sauce-set': 'Parcours de sauces piquantes', 'skincare-set': 'Kit de soin sans se presser', 'selfcare-candle': 'Bougie pour changer l’ambiance', 'herb-garden': 'Mini-potager d’herbes aromatiques', 'chef-knife': 'Un outil pour mieux cuisiner', 'instant-camera': 'Appareil photo instantané', 'fountain-pen': 'Carnet et stylo pour ses idées', 'watercolor-kit': 'Kit créatif sans mode d’emploi', 'portable-projector': 'Cinéma improvisé sur un mur', 'massage-gun': 'Récupération après l’effort', 'digital-luggage-scale': 'La balance qui évite les surprises', 'digital-photo-frame': 'Cadre photo aux images changeantes', 'urban-backpack': 'Sac à dos pour tous les jours', 'powerbank': 'Batterie externe pour ne pas tomber à plat', 'date-night-box': 'Coffret pour une soirée à deux à la maison', 'movie-night-kit': 'Kit cinéma à la maison', 'picnic-set': 'Set pour un pique-nique improvisé', 'cocktail-kit': 'Kit pour préparer des cocktails', 'spice-rack': 'Collection d’épices du monde', 'pasta-maker': 'Kit pour préparer des pâtes fraîches', 'wireless-charging-station': 'Station de charge pour tout garder à portée', 'smart-speaker': 'Enceinte intelligente pour la maison', 'monitor-light-bar': 'Lampe pour améliorer le bureau', 'webcam-light': 'Lampe compacte pour les appels vidéo', 'card-game': 'Jeu de cartes pour lancer la conversation', 'cooperative-board-game': 'Jeu coopératif pour un après-midi', 'gaming-headset': 'Casque pour son setup', 'foam-roller': 'Kit de récupération après le sport', 'hiking-bottle': 'Gourde résistante pour les randonnées', 'fitness-tracker': 'Bracelet pour bouger davantage', 'hiking-headlamp': 'Lampe frontale pour les escapades', 'toiletry-bag': 'Trousse de toilette bien organisée', 'passport-wallet': 'Portefeuille de voyage léger', 'weekend-bag': 'Sac pour une escapade le temps d’un week-end', 'travel-pillow': 'Coussin confortable pour voyager', 'photo-album': 'Album pour ranger les souvenirs', 'custom-map-print': 'Carte d’un lieu important', 'photo-light-box': 'Boîte lumineuse avec une photo spéciale', 'memory-journal': 'Carnet pour remplir des histoires', 'calligraphy-kit': 'Kit de lettering pour débuter', 'model-building-kit': 'Maquette à construire à son rythme', 'bath-salts-set': 'Set de bain pour ralentir', 'sleep-mask': 'Masque de sommeil et rituel de repos', 'standing-mirror': 'Miroir de table élégant', 'room-diffuser': 'Diffuseur pour changer l’atmosphère', 'cozy-blanket': 'Plaid doux pour le canapé', 'desk-organizer': 'Organiseur de bureau élégant', 'cookbook': 'Livre de recettes qui met en appétit', 'bookstand': 'Support pour lire ou cuisiner', 'vinyl-record': 'Un vinyle à écouter tranquillement', 'midi-keyboard': 'Clavier pour jouer avec la musique', 'noise-cancelling-headphones': 'Casque pour s’isoler un peu', 'instant-film-pack': 'Pack de film instantané', 'smartwatch': 'Montre pour le quotidien', 'coffee-grinder': 'Moulin pour améliorer le café', 'cast-iron-pot': 'Cocotte pour cuisiner doucement', 'digital-notebook': 'Carnet numérique pour écrire et s’organiser', 'portable-mic': 'Micro pour créer du contenu ou chanter', 'lego-architecture': 'Construction architecturale à exposer', 'backgammon-set': 'Backgammon pour les longues après-midi', 'spa-headband-set': 'Set de soin pour déconnecter', 'tea-subscription': 'Sélection de thés à découvrir', 'sauce-making-kit': 'Kit pour préparer des sauces maison', 'reusable-cup': 'Gobelet réutilisable pour ses matins',     'personalized-keychain': 'Porte-clés personnalisé pour un souvenir partagé', 'couples-question-cards': 'Cartes de questions pour deux', 'memory-box': 'Boîte pour garder les petits souvenirs', 'photo-calendar': 'Calendrier photo pour toute l’année', 'experience-scratch-card': 'Cartes à gratter pour de futurs projets', 'portable-espresso-maker': 'Café de spécialité à emporter', 'milk-frother': 'Mousseur pour de meilleurs cafés', 'pizza-stone': 'Pierre à pizza pour la maison', 'baking-kit': 'Kit de pâtisserie pour se régaler', 'olive-oil-tasting': 'Dégustation d’huiles pour la table', 'smart-tracker-tag': 'Traceur pour les objets importants', 'wireless-mouse': 'Souris confortable pour le bureau', 'phone-tripod': 'Trépied pour filmer sans aide', 'portable-ssd': 'Disque rapide pour ses projets', 'smart-plug': 'Prise connectée pour simplifier la maison', 'tablet-stand': 'Support pour lire ou regarder', 'travel-adapter': 'Adaptateur pour voyager sereinement', 'travel-journal': 'Carnet pour les prochains voyages', 'dry-bag': 'Sac étanche pour les escapades', 'travel-coffee-mug': 'Mug isotherme pour les matins dehors', 'massage-ball': 'Balle de massage pour relâcher les tensions', 'gym-towel-set': 'Serviettes légères pour le sport', 'running-socks': 'Chaussettes techniques pour mieux bouger', 'bike-multitool': 'Multi-outil pour son vélo', 'pickleball-set': 'Set pour découvrir un nouveau sport', 'hand-care-set': 'Set de soin des mains', 'weighted-eye-mask': 'Masque relaxant pour déconnecter', 'sleep-sound-machine': 'Sons doux pour mieux dormir', 'heated-mug': 'Base pour garder le café chaud', 'sunglasses': 'Lunettes de soleil pour ses sorties', 'leather-belt': 'Ceinture facile à assortir', 'bookends': 'Serre-livres pour une étagère bien rangée', 'reading-journal': 'Carnet pour suivre ses lectures', 'embroidery-kit': 'Kit de broderie pour créer doucement', 'paint-by-numbers': 'Tableau à peindre par numéros', 'record-cleaning-kit': 'Kit pour prendre soin de ses vinyles', 'karaoke-mic': 'Microphone pour chanter sans complexe', 'vinyl-display-frame': 'Cadre pour exposer son vinyle préféré', 'trivia-game': 'Jeu de questions pour rire ensemble', 'escape-room-game': 'Escape game à résoudre à la maison', 'poker-set': 'Mallette de poker pour les soirées jeu', 'plant-watering-kit': 'Kit pour prendre soin de ses plantes', 'bird-feeder': 'Mangeoire pour observer la nature', 'electric-blanket': 'Plaid chauffant pour les soirées canapé', 'mini-waffle-maker': 'Mini gaufrier pour des petits-déjeuners joyeux', 'beer-tasting-set': 'Set de dégustation de bières', 'scented-hand-cream': 'Crème pour les mains au parfum spécial', 'plant-care-tools': 'Jolis outils pour son coin végétal', 'crossbody-bag': 'Sac bandoulière pour bouger léger', 'mug-warmer': 'Chauffe-tasse pour le bureau'
  },
  it: {
    'mini-photo-printer': 'Mini stampante fotografica per ricordi', 'coffee-kit': 'Rituale del caffè specialty', 'tea-ritual': 'Set per una pausa tè', 'portable-speaker': 'Altoparlante per la colonna sonora', 'e-reader': 'E-reader per perdersi nelle storie', 'book-light': 'Lampada da lettura da collo', 'botanical-puzzle': 'Puzzle d’arte per staccare', 'botanical-lego': 'Fiori che non hanno bisogno d’acqua', 'couple-board-game': 'Gioco da tavolo per due', 'travel-organizer': 'Organizer per cavi da viaggio', 'packing-cubes': 'Valigia più ordinata', 'card-holder': 'Portacarte per ogni giorno', 'mechanical-keyboard': 'Tastiera per lavorare o giocare meglio', 'earbuds': 'Auricolari per i suoi momenti', 'usbc-hub': 'Hub per collegare tutto', 'resistance-bands': 'Allenamento che sta in casa', 'yoga-mat': 'Tappetino per rallentare', 'running-belt': 'Cintura per correre leggeri', 'chocolate-box': 'Scatola di cioccolatini con una storia', 'hot-sauce-set': 'Percorso di salse piccanti', 'skincare-set': 'Kit di cura personale senza fretta', 'selfcare-candle': 'Candela per cambiare atmosfera', 'herb-garden': 'Mini orto di erbe in cucina', 'chef-knife': 'Uno strumento per cucinare meglio', 'instant-camera': 'Fotocamera istantanea', 'fountain-pen': 'Quaderno e penna per le sue idee', 'watercolor-kit': 'Kit creativo senza istruzioni', 'portable-projector': 'Cinema improvvisato su qualsiasi parete', 'massage-gun': 'Recupero dopo essersi mossi', 'digital-luggage-scale': 'La bilancia che evita sorprese', 'digital-photo-frame': 'Cornice digitale con foto che cambiano', 'urban-backpack': 'Zaino per ogni giorno', 'powerbank': 'Powerbank per non restare senza batteria', 'date-night-box': 'Box per una serata in casa a due', 'movie-night-kit': 'Kit cinema in casa', 'picnic-set': 'Set per un picnic improvvisato', 'cocktail-kit': 'Kit per preparare cocktail', 'spice-rack': 'Collezione di spezie dal mondo', 'pasta-maker': 'Kit per fare la pasta fresca', 'wireless-charging-station': 'Base di ricarica per avere tutto a portata', 'smart-speaker': 'Altoparlante smart per casa', 'monitor-light-bar': 'Luce per migliorare la scrivania', 'webcam-light': 'Luce compatta per le videochiamate', 'card-game': 'Gioco di carte per iniziare a parlare', 'cooperative-board-game': 'Gioco cooperativo per un pomeriggio', 'gaming-headset': 'Cuffie per il suo setup', 'foam-roller': 'Kit di recupero dopo l’allenamento', 'hiking-bottle': 'Borraccia resistente per i suoi percorsi', 'fitness-tracker': 'Bracciale per muoversi di più', 'hiking-headlamp': 'Lampada frontale per le escursioni', 'toiletry-bag': 'Beauty case ben organizzato', 'passport-wallet': 'Portadocumenti da viaggio leggero', 'weekend-bag': 'Borsa per un weekend fuori', 'travel-pillow': 'Cuscino comodo per viaggiare', 'photo-album': 'Album per ordinare i ricordi', 'custom-map-print': 'Mappa di un luogo importante', 'photo-light-box': 'Light box con una foto speciale', 'memory-journal': 'Diario da riempire di storie', 'calligraphy-kit': 'Kit di lettering per iniziare', 'model-building-kit': 'Modello da costruire con calma', 'bath-salts-set': 'Set da bagno per rallentare', 'sleep-mask': 'Mascherina e piccolo rituale di riposo', 'standing-mirror': 'Specchio da tavolo con stile', 'room-diffuser': 'Diffusore per cambiare atmosfera', 'cozy-blanket': 'Coperta morbida per il divano', 'desk-organizer': 'Organizer da scrivania elegante', 'cookbook': 'Libro di ricette che fa venire fame', 'bookstand': 'Leggio per leggere o cucinare', 'vinyl-record': 'Un vinile da ascoltare con calma', 'midi-keyboard': 'Tastiera per giocare con la musica', 'noise-cancelling-headphones': 'Cuffie per isolarsi un po’', 'instant-film-pack': 'Pack di pellicola istantanea', 'smartwatch': 'Orologio per la vita di ogni giorno', 'coffee-grinder': 'Macinacaffè per migliorare il caffè', 'cast-iron-pot': 'Pentola per cucinare a fuoco lento', 'digital-notebook': 'Quaderno digitale per scrivere e organizzarsi', 'portable-mic': 'Microfono per creare o cantare', 'lego-architecture': 'Costruzione architettonica da esporre', 'backgammon-set': 'Backgammon per pomeriggi lunghi', 'spa-headband-set': 'Set per prendersi cura di sé', 'tea-subscription': 'Selezione di tè da scoprire', 'sauce-making-kit': 'Kit per preparare salse fatte in casa', 'reusable-cup': 'Bicchiere riutilizzabile per le mattine',     'personalized-keychain': 'Portachiavi personalizzato per un ricordo condiviso', 'couples-question-cards': 'Carte di domande per due', 'memory-box': 'Scatola per conservare piccoli ricordi', 'photo-calendar': 'Calendario fotografico per tutto l’anno', 'experience-scratch-card': 'Carte da grattare per i prossimi piani', 'portable-espresso-maker': 'Caffè specialty da portare ovunque', 'milk-frother': 'Montalatte per un caffè migliore', 'pizza-stone': 'Pietra per pizza fatta in casa', 'baking-kit': 'Kit da forno per qualcosa di buono', 'olive-oil-tasting': 'Degustazione di oli per la tavola', 'smart-tracker-tag': 'Localizzatore per le cose importanti', 'wireless-mouse': 'Mouse comodo per la scrivania', 'phone-tripod': 'Treppiede per filmare senza aiuto', 'portable-ssd': 'Disco veloce per i suoi progetti', 'smart-plug': 'Presa smart per semplificare la casa', 'tablet-stand': 'Supporto per leggere o guardare', 'travel-adapter': 'Adattatore per viaggiare tranquilli', 'travel-journal': 'Diario per i prossimi viaggi', 'dry-bag': 'Borsa impermeabile per le escursioni', 'travel-coffee-mug': 'Tazza termica per le mattine fuori', 'massage-ball': 'Palla da massaggio per sciogliere la tensione', 'gym-towel-set': 'Asciugamani leggeri per allenarsi', 'running-socks': 'Calze tecniche per muoversi meglio', 'bike-multitool': 'Multitool per la bicicletta', 'pickleball-set': 'Set per provare un nuovo sport', 'hand-care-set': 'Set per la cura delle mani', 'weighted-eye-mask': 'Mascherina rilassante per staccare', 'sleep-sound-machine': 'Suoni delicati per dormire meglio', 'heated-mug': 'Base per tenere caldo il caffè', 'sunglasses': 'Occhiali da sole per stare all’aperto', 'leather-belt': 'Cintura che sta bene con tutto', 'bookends': 'Reggilibri per una libreria ordinata', 'reading-journal': 'Diario per segnare le letture', 'embroidery-kit': 'Kit da ricamo per creare con calma', 'paint-by-numbers': 'Quadro da dipingere con i numeri', 'record-cleaning-kit': 'Kit per prendersi cura dei vinili', 'karaoke-mic': 'Microfono per cantare senza vergogna', 'vinyl-display-frame': 'Cornice per esporre il vinile preferito', 'trivia-game': 'Gioco di domande per ridere insieme', 'escape-room-game': 'Escape room da risolvere a casa', 'poker-set': 'Set da poker per le serate di gioco', 'plant-watering-kit': 'Kit per prendersi cura delle piante', 'bird-feeder': 'Mangiatoia per osservare la natura', 'electric-blanket': 'Coperta elettrica per le serate sul divano', 'mini-waffle-maker': 'Mini piastra per colazioni speciali', 'beer-tasting-set': 'Set per degustare birre', 'scented-hand-cream': 'Crema mani con un profumo speciale', 'plant-care-tools': 'Strumenti belli per il suo angolo verde', 'crossbody-bag': 'Borsa a tracolla per muoversi leggeri', 'mug-warmer': 'Scalda-tazza per la scrivania'
  }
};

var state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], language: readLanguage(), analyticsStarted: false, answers: { interests: [] } };
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

var LANGUAGE_STORAGE_KEY = 'regalazo-language-v1';

function currentCopy() {
  return LANGUAGE_COPY[state.language] || LANGUAGE_COPY.es;
}

function readLanguage() {
  try {
    var stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (LANGUAGE_COPY[stored]) return stored;
  } catch (error) {}
  return 'es';
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
  return {
    title: titles[gift.id] || gift.title,
    tags: gift.tags,
    reason: gift.reason
  };
}

function trackEvent(eventName, properties) {
  var baseProperties = {
    app: 'regalazo',
    language: state.language,
    version: ANALYTICS_CONFIG.version
  };
  var event = {
    event: eventName,
    properties: Object.assign(baseProperties, properties || {}),
    timestamp: new Date().toISOString()
  };
  ANALYTICS_QUEUE.push(event);
  if (ANALYTICS_CONFIG.enabled && ANALYTICS_CONFIG.token && window.mixpanel && typeof window.mixpanel.track === 'function') {
    window.mixpanel.track(eventName, event.properties);
  }
}

window.RegalazoAnalytics = Object.freeze({
  track: trackEvent,
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

var VARIETY_STORAGE_KEY = 'regalazo-variety-v2';

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
  store.profiles[key] = ids.slice(-GIFT_CATALOG.length);
  try {
    localStorage.setItem(VARIETY_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {}
}

function scoreGift(gift, answers, budget, interests) {
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
  return score;
}

function chooseDiverseGiftItems(items, limit) {
  var result = [];
  var categoryCounts = {};
  [1, 2].forEach(function (maxPerCategory) {
    items.forEach(function (item) {
      if (result.length >= limit || result.indexOf(item) !== -1) return;
      var category = item.gift.category;
      var count = categoryCounts[category] || 0;
      if (count < maxPerCategory) {
        result.push(item);
        categoryCounts[category] = count + 1;
      }
    });
  });
  if (result.length < limit) {
    items.forEach(function (item) {
      if (result.length < limit && result.indexOf(item) === -1) result.push(item);
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
  var ranked = GIFT_CATALOG.map(function (gift, index) {
    var baseScore = scoreGift(gift, answers, budget, interests);
    var variety = (hashString(profileKey + '|' + String(variant) + '|' + gift.id) % 10000) / 10000;
    return {
      gift: gift,
      baseScore: baseScore,
      fresh: seenIds.indexOf(gift.id) === -1,
      recent: recentIds.indexOf(gift.id) !== -1,
      selectionScore: baseScore * 3 + variety * 12,
      index: index
    };
  });
  ranked.sort(function (a, b) { return b.baseScore - a.baseScore || a.index - b.index; });
  var topScore = ranked.length ? ranked[0].baseScore : 0;
  var freshStrong = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 12; });
  var freshGood = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 18; });
  var candidateItems = freshStrong.length >= 10 ? freshStrong : (freshGood.length >= 10 ? freshGood : freshGood.slice());
  var alreadyIncluded = candidateItems.map(function (item) { return item.gift.id; });
  var seenGood = ranked.filter(function (item) {
    return !item.fresh && item.baseScore >= topScore - 12 && alreadyIncluded.indexOf(item.gift.id) === -1;
  });
  if (candidateItems.length < 10) {
    seenGood.forEach(function (item) {
      if (candidateItems.length < 16 && alreadyIncluded.indexOf(item.gift.id) === -1) {
        candidateItems.push(item);
        alreadyIncluded.push(item.gift.id);
      }
    });
  }
  if (candidateItems.length < 10) {
    ranked.forEach(function (item) {
      if (candidateItems.length < 16 && alreadyIncluded.indexOf(item.gift.id) === -1 && item.baseScore >= topScore - 24) {
        candidateItems.push(item);
        alreadyIncluded.push(item.gift.id);
      }
    });
  }
  candidateItems.forEach(function (item) {
    item.selectionScore += item.fresh ? 10 : 0;
    if (item.recent) item.selectionScore -= 100;
  });
  candidateItems.sort(function (a, b) {
    return b.selectionScore - a.selectionScore || b.baseScore - a.baseScore || a.index - b.index;
  });
  var selected = chooseDiverseGiftItems(candidateItems, 10);
  if (selected.length < 10) {
    ranked.forEach(function (item) {
      if (selected.length < 10 && selected.every(function (chosen) { return chosen.gift !== item.gift; })) selected.push(item);
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
  return 'https://' + amazonDomain(answers.country || APP_CONFIG.defaultCountry) + '/s?' + params.toString();
}

function buildReason(gift, answers) {
  var interests = selectedInterests(answers);
  var matches = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; });
  if (matches.length) {
    var labels = matches.slice(0, 2).map(function (interest) { return getLabel('interests', interest).toLowerCase(); });
    return 'Conecta con ' + labels.join(' y ') + ' y mantiene un tono ' + getLabel('style', answers.style).toLowerCase() + '. ' + gift.reason;
  }
  return gift.reason;
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

function renderResults(shouldCelebrate) {
  var copy = currentCopy();
  currentRecommendations = rankGifts(state.answers, state.variant);
  state.lastRecommendationIds = currentRecommendations.map(function (gift) { return gift.id; });
  rememberRecommendations(state.answers, currentRecommendations);
  trackEvent('recommendations_viewed', { resultCount: currentRecommendations.length, variant: state.variant });
  var title = copy.results.genericTitle + '.';
  var relation = getLabel('relation', state.answers.relation).toLowerCase();
  if (state.answers.relation && state.answers.relation !== 'other') {
    title = interpolate(copy.results.relationTitle, { relation: relation });
  }
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
      return '<article class="gift-card' + (index === 0 ? ' gift-card-featured' : '') + '" style="--gift-index: ' + index + ';">' +
        (index === 0 ? '<p class="gift-badge">' + escapeHtml(copy.results.badge) + '</p>' : '') +
        '<div class="gift-card-top"><span class="gift-number">' + String(index + 1).padStart(2, '0') + '</span><span class="gift-icon" aria-hidden="true">' + gift.icon + '</span></div>' +
        '<h3>' + escapeHtml(localized.title) + '</h3><p class="gift-price">' + escapeHtml(interpolate(copy.results.price, { price: gift.price })) + '</p>' +
        '<p class="gift-reason">' + escapeHtml(buildReason(gift, state.answers)) + '</p>' +
        '<div class="gift-tags">' + tags + '</div>' +
        '<a class="gift-link" href="' + escapeHtml(buildAmazonUrl(gift, state.answers)) + '" target="_blank" rel="sponsored nofollow noopener" data-gift-id="' + escapeHtml(gift.id) + '" data-gift-position="' + String(index + 1) + '">' + escapeHtml(copy.results.link) + ' <span aria-hidden="true">↗</span></a></article>';
    }).join('') + '</div>' +
    '<p class="results-note">' + escapeHtml(copy.results.note) + '</p>';
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
  revealResultsAtTop();
  window.requestAnimationFrame(revealResultsAtTop);
  window.setTimeout(revealResultsAtTop, 0);
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
  state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], language: state.language, analyticsStarted: false, answers: { interests: [] } };
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

function shareSelection() {
  var copy = currentCopy();
  trackEvent('share_clicked', {});
  if (navigator.share) {
    navigator.share({ title: copy.results.share, text: copy.results.shareText, url: window.location.href }).catch(function () {});
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href).then(function () { showToast(copy.messages.copied); }).catch(function () { showToast(copy.messages.copyHint); });
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
    if (action.getAttribute('data-action') === 'adjust') showWizardAtLastStep();
    if (action.getAttribute('data-action') === 'refresh') { state.variant += 1; trackEvent('recommendations_refreshed', { variant: state.variant }); renderResults(false); }
    if (action.getAttribute('data-action') === 'share') shareSelection();
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
  if (!results.hidden) renderResults(false);
  else render();
}

if (languageSelect) {
  languageSelect.addEventListener('change', function (event) {
    setLanguage(event.target.value);
  });
}

applyLanguage();
render();
