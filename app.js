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
  { id: 'powerbank', title: 'Batería para no quedarse a cero', category: 'tecnologia', categoryLabel: 'Tecnología', icon: '🔋', price: 29, interests: ['tech', 'travel', 'gaming'], styles: ['useful'], relations: ['friend', 'partner', 'sibling', 'coworker', 'child'], ages: ['teen', 'young-adult', 'adult', 'midlife'], occasions: ['birthday', 'thankyou', 'secret-santa'], amazonQuery: 'batería externa powerbank carga rápida', tags: ['salvavidas', 'útil'], reason: 'Práctico, fácil de acertar y especialmente útil para quien está siempre fuera.', editorialScore: 3 }
];

var state = { step: 0, answers: { interests: [] } };
var currentRecommendations = [];
var toastTimer;
var pendingScrollPosition = null;
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

function getLabel(id, value) {
  var option = getOption(id, value);
  return option ? option.label : 'Cualquiera';
}

function selectedValues(question) {
  var value = state.answers[question.id];
  return question.multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);
}

function optionMarkup(question, option) {
  var selected = selectedValues(question).indexOf(option.value) !== -1;
  var details = option.detail ? '<span class="option-detail">' + escapeHtml(option.detail) + '</span>' : '';
  return '<button class="option-card" type="button" data-option="' + escapeHtml(option.value) + '" aria-pressed="' + String(selected) + '">' +
    '<span class="option-icon" aria-hidden="true">' + option.icon + '</span>' +
    '<span class="option-copy"><span class="option-label">' + escapeHtml(option.label) + '</span>' + details + '</span>' +
    '</button>';
}

function renderQuestion() {
  var question = QUESTIONS[state.step];
  var percent = Math.round(((state.step + 1) / QUESTIONS.length) * 100);
  stepLabel.textContent = 'Paso ' + (state.step + 1) + ' de ' + QUESTIONS.length;
  progressValue.textContent = percent + '%';
  progressBar.style.width = percent + '%';
  backButton.hidden = state.step === 0;
  nextButton.hidden = true;
  questionRegion.innerHTML = '<p class="question-kicker">' + escapeHtml(question.kicker) + '</p>' +
    '<h2 id="question-title" class="question-title">' + escapeHtml(question.title) + '</h2>' +
    '<p class="question-subtitle">' + escapeHtml(question.subtitle) + '</p>' +
    '<div class="options-grid" role="group" aria-labelledby="question-title">' +
    question.options.map(function (option) { return optionMarkup(question, option); }).join('') +
    '</div>' + (question.multiple ? '<p class="multi-hint"><span aria-hidden="true">＋</span> Puedes elegir hasta 3 opciones</p>' : '');
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
  if (question.multiple) {
    var current = selectedValues(question);
    var exists = current.indexOf(value) !== -1;
    if (!exists && current.length >= 3) {
      showToast('Elige hasta 3 gustos para que las ideas no se dispersen.');
      return;
    }
    state.answers[question.id] = exists ? current.filter(function (item) { return item !== value; }) : current.concat(value);
  } else {
    state.answers[question.id] = value;
    advance(scrollPosition);
    return;
  }
  renderQuestion();
}

function advance(scrollPosition) {
  var question = QUESTIONS[state.step];
  if (selectedValues(question).length === 0) {
    showToast(question.multiple ? 'Elige al menos un gusto para continuar.' : 'Elige una opción para continuar.');
    return;
  }
  var position = scrollPosition || getScrollPosition();
  state.step += 1;
  render();
  restoreScrollPosition(position);
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

function rankGifts(answers) {
  var budget = budgetFor(answers.budget);
  var interests = selectedInterests(answers);
  var ranked = GIFT_CATALOG.map(function (gift, index) {
    var score = gift.editorialScore || 0;
    var overlap = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; }).length;
    score += Math.min(overlap * 5, 15);
    if (gift.price <= budget.max) score += 6;
    else if (gift.price <= budget.max * 1.25) score += 2;
    else score -= 5;
    if (budget.max >= 150 && gift.price >= 80) score += 3;
    if (gift.styles.indexOf(answers.style) !== -1) score += 4;
    if (gift.relations.indexOf(answers.relation) !== -1) score += 3;
    if (answers.age === 'unknown' || gift.ages.indexOf(answers.age) !== -1) score += 2;
    if (gift.occasions.indexOf(answers.occasion) !== -1) score += 2;
    return { gift: gift, score: score, index: index };
  });
  ranked.sort(function (a, b) { return b.score - a.score || a.index - b.index; });
  var result = [];
  var categories = {};
  ranked.forEach(function (item) {
    if (result.length >= 10) return;
    if (result.length < 6 || !categories[item.gift.category]) {
      result.push(item.gift);
      categories[item.gift.category] = true;
    }
  });
  if (result.length < 10) {
    ranked.forEach(function (item) {
      if (result.length < 10 && result.indexOf(item.gift) === -1) result.push(item.gift);
    });
  }
  return result.slice(0, 10);
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
  var chips = [getLabel('relation', answers.relation), getLabel('gender', answers.gender), getLabel('age', answers.age), getLabel('occasion', answers.occasion), budgetFor(answers.budget).label, getLabel('style', answers.style), getLabel('country', answers.country)];
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

function renderResults() {
  currentRecommendations = rankGifts(state.answers);
  var title = '10 ideas para acertar';
  var relation = getLabel('relation', state.answers.relation).toLowerCase();
  if (relation && relation !== 'otra persona') title = '10 ideas para tu ' + relation;
  results.innerHTML = '<div class="results-head">' +
    '<p class="results-kicker">Tu selección está lista</p>' +
    '<h2 id="results-title">' + title + '.</h2>' +
    '<p class="results-intro">Una mezcla de opciones útiles, originales y con algo que contar. Abre las que te llamen y compara en la tienda de tu país.</p>' +
    '<div class="summary-chips" aria-label="Tus preferencias">' + summaryChips(state.answers) + '</div>' +
    '</div>' +
    '<div class="results-toolbar"><button class="button button-ghost" type="button" data-action="adjust">← Ajustar respuestas</button><button class="button button-ghost" type="button" data-action="share">Compartir selección</button></div>' +
    '<div class="gift-list">' + currentRecommendations.map(function (gift, index) {
      var tags = gift.tags.map(function (tag) { return '<span class="gift-tag">' + escapeHtml(tag) + '</span>'; }).join('');
      return '<article class="gift-card' + (index === 0 ? ' gift-card-featured' : '') + '" style="--gift-index: ' + index + ';">' +
        (index === 0 ? '<p class="gift-badge">Mejor encaje</p>' : '') +
        '<div class="gift-card-top"><span class="gift-number">' + String(index + 1).padStart(2, '0') + '</span><span class="gift-icon" aria-hidden="true">' + gift.icon + '</span></div>' +
        '<h3>' + escapeHtml(gift.title) + '</h3><p class="gift-price">≈ ' + gift.price + ' € · presupuesto orientativo</p>' +
        '<p class="gift-reason">' + escapeHtml(buildReason(gift, state.answers)) + '</p>' +
        '<div class="gift-tags">' + tags + '</div>' +
        '<a class="gift-link" href="' + escapeHtml(buildAmazonUrl(gift, state.answers)) + '" target="_blank" rel="sponsored nofollow noopener" data-gift-id="' + escapeHtml(gift.id) + '">Ver opciones en Amazon <span aria-hidden="true">↗</span></a></article>';
    }).join('') + '</div>' +
    '<p class="results-note">Estas son búsquedas relevantes, no fichas de producto concretas. Amazon puede mostrar otras opciones y los precios o la disponibilidad pueden cambiar.</p>';
  hero.hidden = true;
  wizard.hidden = true;
  trustStrip.hidden = true;
  seoContent.hidden = true;
  window.scrollTo(0, 0);
  results.hidden = false;
  results.classList.remove('results-transition');
  void results.offsetWidth;
  results.classList.add('results-transition');
  celebrate();
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
  state = { step: 0, answers: { interests: [] } };
  hero.hidden = false;
  wizard.hidden = false;
  trustStrip.hidden = false;
  seoContent.hidden = false;
  results.hidden = true;
  render();
}

function recordClick(giftId) {
  try {
    var clicks = JSON.parse(localStorage.getItem(APP_CONFIG.clickStorageKey) || '[]');
    clicks.push({ id: giftId, at: new Date().toISOString(), country: state.answers.country || APP_CONFIG.defaultCountry });
    localStorage.setItem(APP_CONFIG.clickStorageKey, JSON.stringify(clicks.slice(-100)));
  } catch (error) {
    // Private browsing or blocked storage should never stop an outbound link.
  }
}

function shareSelection() {
  var text = 'He encontrado ideas de regalo en Regalazo 🎁';
  if (navigator.share) {
    navigator.share({ title: 'Mi selección de regalos', text: text, url: window.location.href }).catch(function () {});
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href).then(function () { showToast('Enlace copiado.'); }).catch(function () { showToast('Copia el enlace de esta página para compartirlo.'); });
  } else {
    showToast('Copia el enlace de esta página para compartirlo.');
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
  if (option) pendingScrollPosition = getScrollPosition();
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
    if (action.getAttribute('data-action') === 'share') shareSelection();
    return;
  }
  var link = event.target.closest('[data-gift-id]');
  if (link) recordClick(link.getAttribute('data-gift-id'));
});

document.querySelector('.brand').addEventListener('click', function (event) {
  if (state.step > 0 || !results.hidden) {
    event.preventDefault();
    resetApp();
  }
});

render();
