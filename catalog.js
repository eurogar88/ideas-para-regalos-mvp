'use strict';

/* Lazy-loaded editorial catalog. The app owns ranking; this file owns data. */
(function (root) {
  root.RegalazoCatalog = Object.freeze({
    gifts: [
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
  {"id":"weekend-luggage-set","title":"Set de maletas para viajar mejor","category":"viajes","categoryLabel":"viajes","icon":"🧳","price":179,"interests":["travel"],"styles":["useful","premium"],"relations":["partner","parent","sibling","friend","coworker","other"],"ages":["teen","young-adult","adult","midlife","50plus"],"occasions":["birthday","anniversary","christmas","secret-santa","thankyou","justbecause"],"amazonQuery":"set maletas viaje fin de semana premium regalo","tags":["viajes","más de 150"],"reason":"Una inversión en próximos planes, escapadas y muchas historias por estrenar.","editorialScore":5,"titles":{"en":"Premium weekend luggage set","de":"Hochwertiges Wochenend-Gepäckset","fr":"Set de bagages premium pour week-end","it":"Set valigie premium da weekend"}}]
  });
}(window));
