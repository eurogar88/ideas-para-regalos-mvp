'use strict';

/*
 * The first MVP is intentionally deterministic. The catalog is the source of truth;
 * a future AI layer may rank catalog ids, but it must never invent products or URLs.
 */
var APP_CONFIG = Object.freeze({
  affiliateTags: Object.freeze({ ES: 'lamamihacker-21' }),
  defaultCountry: 'ES',
  clickStorageKey: 'regalazo-clicks-v1',
  installPromptEnabled: true,
  installPromptDelayMs: 5200,
  discoveryRotationDays: 7,
  catalogBaseCount: 360,
  knownCompositionCount: 6375,
  catalogScript: '/catalog.js?v=catalog-1'
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
      { value: 'unknown', label: 'No lo sé', icon: '🤷' },
      { value: 'any', label: 'Cualquiera', icon: '✨', detail: 'dejamos el género abierto' }
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
      { value: 'justbecause', label: 'Porque sí', icon: '🌈' },
      { value: 'any', label: 'Cualquiera', icon: '🎲', detail: 'una idea que funcione en general' }
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
      { value: 'creative', label: 'Crear cosas', icon: '🎨' },
      { value: 'any', label: 'Cualquiera', icon: '🎲', detail: 'sorpréndeme con algo relevante' }
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
      { value: 'premium', label: 'Premium', icon: '✨', detail: 'un pequeño lujo' },
      { value: 'any', label: 'Cualquiera', icon: '🎲', detail: 'lo dejamos abierto' }
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


var GIFT_CATALOG = window.RegalazoCatalog && Array.isArray(window.RegalazoCatalog.gifts) ? window.RegalazoCatalog.gifts : [];
var CATALOG_COUNT = GIFT_CATALOG.length || APP_CONFIG.catalogBaseCount;
var COMPOSITION_COUNT = APP_CONFIG.knownCompositionCount;
var catalogReady = GIFT_CATALOG.length > 0;
var catalogLoadPromise = null;
var catalogScriptElement = null;

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
      occasion: makeQuestionCopy('4 · Momento', '¿Qué estás celebrando?', 'El contexto cambia mucho el tipo de regalo que se siente bien.', { birthday: makeOptionCopy('Cumpleaños'), anniversary: makeOptionCopy('Aniversario'), christmas: makeOptionCopy('Navidad'), 'secret-santa': makeOptionCopy('Amigo invisible'), thankyou: makeOptionCopy('Agradecimiento'), justbecause: makeOptionCopy('Porque sí'), any: makeOptionCopy('Cualquiera', 'una idea que funcione en general') }),
      budget: makeQuestionCopy('5 · Presupuesto', '¿Cuánto quieres gastar?', 'Tomamos el máximo como guía, no como una obligación.', { under20: makeOptionCopy('Menos de 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Más de 150 €') }),
      interests: makeQuestionCopy('6 · Sus gustos', '¿Qué le mueve por dentro?', 'Elige el gusto que más le representa.', { tech: makeOptionCopy('Tecnología'), sport: makeOptionCopy('Deporte'), food: makeOptionCopy('Cocina y sabores'), travel: makeOptionCopy('Viajes'), beauty: makeOptionCopy('Cuidado personal'), books: makeOptionCopy('Libros'), gaming: makeOptionCopy('Juegos'), music: makeOptionCopy('Música'), home: makeOptionCopy('Casa y calma'), creative: makeOptionCopy('Crear cosas'), any: makeOptionCopy('Cualquiera', 'sorpréndeme con algo relevante') }),
      style: makeQuestionCopy('7 · Estilo', '¿Qué sensación quieres provocar?', 'Elige el aire del regalo, incluso si todavía no sabes cuál será.', { useful: makeOptionCopy('Útil', 'lo usará de verdad'), original: makeOptionCopy('Original', 'que no se vea venir'), emotional: makeOptionCopy('Emocional', 'que diga algo'), fun: makeOptionCopy('Divertido', 'para pasarlo bien'), premium: makeOptionCopy('Premium', 'un pequeño lujo'), any: makeOptionCopy('Cualquiera', 'lo dejamos abierto') }),
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
      occasion: makeQuestionCopy('4 · Occasion', 'What are you celebrating?', 'The context changes the kind of gift that feels right.', { birthday: makeOptionCopy('Birthday'), anniversary: makeOptionCopy('Anniversary'), christmas: makeOptionCopy('Christmas'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Thank you'), justbecause: makeOptionCopy('Just because'), any: makeOptionCopy('Anything', 'an idea that works in general') }),
      budget: makeQuestionCopy('5 · Budget', 'How much do you want to spend?', 'We use the maximum as a guide, not a rule.', { under20: makeOptionCopy('Under €20'), '20to40': makeOptionCopy('€20–40'), '40to75': makeOptionCopy('€40–75'), '75to150': makeOptionCopy('€75–150'), over150: makeOptionCopy('Over €150') }),
      interests: makeQuestionCopy('6 · Their interests', 'What makes them tick?', 'Choose the interest that represents them best.', { tech: makeOptionCopy('Technology'), sport: makeOptionCopy('Sports'), food: makeOptionCopy('Food and flavors'), travel: makeOptionCopy('Travel'), beauty: makeOptionCopy('Personal care'), books: makeOptionCopy('Books'), gaming: makeOptionCopy('Games'), music: makeOptionCopy('Music'), home: makeOptionCopy('Home and calm'), creative: makeOptionCopy('Making things'), any: makeOptionCopy('Anything', 'surprise me with something relevant') }),
      style: makeQuestionCopy('7 · Style', 'What feeling do you want to create?', 'Choose the mood of the gift, even if you do not know the exact item yet.', { useful: makeOptionCopy('Useful', 'they will really use it'), original: makeOptionCopy('Original', 'they will not see it coming'), emotional: makeOptionCopy('Emotional', 'it says something'), fun: makeOptionCopy('Fun', 'for a good time'), premium: makeOptionCopy('Premium', 'a little luxury'), any: makeOptionCopy('Anything', 'leave it open') }),
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
      occasion: makeQuestionCopy('4 · Anlass', 'Was feiert ihr?', 'Der Anlass verändert, welches Geschenk sich richtig anfühlt.', { birthday: makeOptionCopy('Geburtstag'), anniversary: makeOptionCopy('Jahrestag'), christmas: makeOptionCopy('Weihnachten'), 'secret-santa': makeOptionCopy('Wichteln'), thankyou: makeOptionCopy('Dankeschön'), justbecause: makeOptionCopy('Einfach so'), any: makeOptionCopy('Egal', 'eine Idee, die allgemein passt') }),
      budget: makeQuestionCopy('5 · Budget', 'Wie viel möchtest du ausgeben?', 'Wir nutzen den Höchstbetrag als Orientierung, nicht als Pflicht.', { under20: makeOptionCopy('Unter 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Über 150 €') }),
      interests: makeQuestionCopy('6 · Interessen', 'Wofür begeistert sich die Person?', 'Wähle das Interesse, das am besten passt.', { tech: makeOptionCopy('Technik'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Kochen und Genuss'), travel: makeOptionCopy('Reisen'), beauty: makeOptionCopy('Pflege'), books: makeOptionCopy('Bücher'), gaming: makeOptionCopy('Spiele'), music: makeOptionCopy('Musik'), home: makeOptionCopy('Zuhause und Ruhe'), creative: makeOptionCopy('Kreativ sein'), any: makeOptionCopy('Egal', 'überrasche mich mit etwas Passendem') }),
      style: makeQuestionCopy('7 · Stil', 'Welche Stimmung soll das Geschenk auslösen?', 'Wähle die Richtung des Geschenks, auch wenn du den konkreten Artikel noch nicht kennst.', { useful: makeOptionCopy('Nützlich', 'wird wirklich verwendet'), original: makeOptionCopy('Originell', 'damit rechnet niemand'), emotional: makeOptionCopy('Emotional', 'sagt etwas aus'), fun: makeOptionCopy('Lustig', 'für gute Laune'), premium: makeOptionCopy('Hochwertig', 'ein kleiner Luxus'), any: makeOptionCopy('Egal', 'lassen wir offen') }),
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
      occasion: makeQuestionCopy('4 · Occasion', 'Que célébrez-vous ?', 'Le contexte change beaucoup le type de cadeau qui convient.', { birthday: makeOptionCopy('Anniversaire'), anniversary: makeOptionCopy('Anniversaire de couple'), christmas: makeOptionCopy('Noël'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Remerciement'), justbecause: makeOptionCopy('Juste comme ça'), any: makeOptionCopy('Peu importe', 'une idée qui fonctionne en général') }),
      budget: makeQuestionCopy('5 · Budget', 'Combien souhaitez-vous dépenser ?', 'Le maximum sert de repère, pas d’obligation.', { under20: makeOptionCopy('Moins de 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Plus de 150 €') }),
      interests: makeQuestionCopy('6 · Ses goûts', 'Qu’est-ce qui la fait vibrer ?', 'Choisissez le goût qui lui ressemble le plus.', { tech: makeOptionCopy('Technologie'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Cuisine et saveurs'), travel: makeOptionCopy('Voyages'), beauty: makeOptionCopy('Soin de soi'), books: makeOptionCopy('Livres'), gaming: makeOptionCopy('Jeux'), music: makeOptionCopy('Musique'), home: makeOptionCopy('Maison et calme'), creative: makeOptionCopy('Créer'), any: makeOptionCopy('Peu importe', 'surprenez-moi avec une idée pertinente') }),
      style: makeQuestionCopy('7 · Style', 'Quelle sensation voulez-vous provoquer ?', 'Choisissez l’esprit du cadeau, même si vous ne connaissez pas encore l’objet.', { useful: makeOptionCopy('Utile', 'elle s’en servira vraiment'), original: makeOptionCopy('Original', 'pour surprendre'), emotional: makeOptionCopy('Émotionnel', 'pour dire quelque chose'), fun: makeOptionCopy('Amusant', 'pour passer un bon moment'), premium: makeOptionCopy('Premium', 'un petit luxe'), any: makeOptionCopy('Peu importe', 'laissons ouvert') }),
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
      occasion: makeQuestionCopy('4 · Occasione', 'Che cosa state festeggiando?', 'Il contesto cambia molto il tipo di regalo più adatto.', { birthday: makeOptionCopy('Compleanno'), anniversary: makeOptionCopy('Anniversario'), christmas: makeOptionCopy('Natale'), 'secret-santa': makeOptionCopy('Secret Santa'), thankyou: makeOptionCopy('Ringraziamento'), justbecause: makeOptionCopy('Perché sì'), any: makeOptionCopy('Qualsiasi', 'un’idea che funzioni in generale') }),
      budget: makeQuestionCopy('5 · Budget', 'Quanto vuoi spendere?', 'Usiamo il massimo come riferimento, non come obbligo.', { under20: makeOptionCopy('Meno di 20 €'), '20to40': makeOptionCopy('20–40 €'), '40to75': makeOptionCopy('40–75 €'), '75to150': makeOptionCopy('75–150 €'), over150: makeOptionCopy('Più di 150 €') }),
      interests: makeQuestionCopy('6 · I suoi interessi', 'Che cosa lo/a appassiona?', 'Scegli l’interesse che lo/a rappresenta di più.', { tech: makeOptionCopy('Tecnologia'), sport: makeOptionCopy('Sport'), food: makeOptionCopy('Cucina e sapori'), travel: makeOptionCopy('Viaggi'), beauty: makeOptionCopy('Cura personale'), books: makeOptionCopy('Libri'), gaming: makeOptionCopy('Giochi'), music: makeOptionCopy('Musica'), home: makeOptionCopy('Casa e calma'), creative: makeOptionCopy('Creare cose'), any: makeOptionCopy('Qualsiasi', 'sorprendimi con qualcosa di pertinente') }),
      style: makeQuestionCopy('7 · Stile', 'Che sensazione vuoi provocare?', 'Scegli lo stile del regalo, anche se non sai ancora quale sarà.', { useful: makeOptionCopy('Utile', 'lo userà davvero'), original: makeOptionCopy('Originale', 'per sorprenderlo/a'), emotional: makeOptionCopy('Emotivo', 'per dire qualcosa'), fun: makeOptionCopy('Divertente', 'per stare bene insieme'), premium: makeOptionCopy('Premium', 'un piccolo lusso'), any: makeOptionCopy('Qualsiasi', 'lasciamo aperto') }),
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
  version: 'growth-v5',
  scriptUrl: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js',
  apiHost: 'https://api-eu.mixpanel.com'
});
var ANALYTICS_CONSENT_COPY = {
  es: { title: '¿Nos ayudas a mejorar Regalazo?', text: 'Solo si aceptas cargaremos Mixpanel para medir el uso y mejorar las recomendaciones. No guardamos nombres, emails, respuestas concretas ni texto libre.', accept: 'Aceptar analítica', reject: 'Ahora no', preferences: 'Preferencias de analítica', more: 'Más información' },
  en: { title: 'Help us improve Regalazo?', text: 'We only load Mixpanel if you allow it, to measure usage and improve recommendations. We do not store names, emails, specific answers or free text.', accept: 'Allow analytics', reject: 'Not now', preferences: 'Analytics preferences', more: 'Learn more' },
  de: { title: 'Regalazo verbessern?', text: 'Mixpanel wird nur geladen, wenn du zustimmst, um die Nutzung zu messen und Empfehlungen zu verbessern. Wir speichern keine Namen, E-Mails, konkreten Antworten oder freien Texte.', accept: 'Analytik erlauben', reject: 'Jetzt nicht', preferences: 'Analyse-Einstellungen', more: 'Mehr erfahren' },
  fr: { title: 'Nous aider à améliorer Regalazo ?', text: 'Mixpanel ne sera chargé que si vous l’autorisez, afin de mesurer l’usage et d’améliorer les recommandations. Nous ne conservons ni noms, ni e-mails, ni réponses précises, ni texte libre.', accept: 'Autoriser les statistiques', reject: 'Pas maintenant', preferences: 'Préférences statistiques', more: 'En savoir plus' },
  it: { title: 'Ci aiuti a migliorare Regalazo?', text: 'Mixpanel viene caricato solo se lo consenti, per misurare l’uso e migliorare i consigli. Non conserviamo nomi, email, risposte specifiche o testo libero.', accept: 'Consenti analisi', reject: 'Non ora', preferences: 'Preferenze analisi', more: 'Scopri di più' }
};
var ANALYTICS_CONSENT_STORAGE_KEY = 'regalazo-analytics-consent-v4';
var ANALYTICS_QUEUE = [];
var analyticsConsentState = null;
var analyticsScriptLoading = false;
var analyticsReady = false;
var analyticsPageViewTracked = false;


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
var ENHANCED_RESULT_COPY = {"es":{"newBadge":"Descubrimiento","shareCardTitle":"Comparte estas ideas","shareCardText":"Envía esta selección y la otra persona verá las mismas 10 ideas, sin cuenta."},"en":{"newBadge":"New find","shareCardTitle":"Share these ideas","shareCardText":"Send this selection and the other person will see the same 10 ideas, with no sign-up."},"de":{"newBadge":"Neue Entdeckung","shareCardTitle":"Diese Ideen teilen","shareCardText":"Schicke diese Auswahl weiter; die andere Person sieht dieselben 10 Ideen, ohne Konto."},"fr":{"newBadge":"Nouvelle découverte","shareCardTitle":"Partagez ces idées","shareCardText":"Envoyez cette sélection : l’autre personne verra les mêmes 10 idées, sans compte."},"it":{"newBadge":"Nuova scoperta","shareCardTitle":"Condividi queste idee","shareCardText":"Invia questa selezione: l’altra persona vedrà le stesse 10 idee, senza account."}};
var SHARE_ACTION_COPY = {
  es: { download: 'Guardar tarjeta', saved: 'Tarjeta guardada.', unavailable: 'No se ha podido crear la tarjeta.' },
  en: { download: 'Save card', saved: 'Card saved.', unavailable: 'The card could not be created.' },
  de: { download: 'Karte speichern', saved: 'Karte gespeichert.', unavailable: 'Die Karte konnte nicht erstellt werden.' },
  fr: { download: 'Enregistrer la carte', saved: 'Carte enregistrée.', unavailable: 'La carte n’a pas pu être créée.' },
  it: { download: 'Salva scheda', saved: 'Scheda salvata.', unavailable: 'Non è stato possibile creare la scheda.' }
};
function shareActionCopy(key) {
  var copy = SHARE_ACTION_COPY[state.language] || SHARE_ACTION_COPY.es;
  return copy[key] || SHARE_ACTION_COPY.es[key] || '';
}
  var HERO_NOTE_COPY = {"es":[{"value":"8","label":"toques"},{"value":"<1","label":"minuto"},{"value":"10","label":"resultados"},{"value":"sin","label":"cuenta"}],"en":[{"value":"8","label":"taps"},{"value":"<1","label":"minute"},{"value":"10","label":"results"},{"value":"no","label":"sign-up"}],"de":[{"value":"8","label":"Klicks"},{"value":"<1","label":"Minute"},{"value":"10","label":"Ergebnisse"},{"value":"ohne","label":"Konto"}],"fr":[{"value":"8","label":"touches"},{"value":"<1","label":"minute"},{"value":"10","label":"résultats"},{"value":"sans","label":"compte"}],"it":[{"value":"8","label":"tap"},{"value":"<1","label":"minuto"},{"value":"10","label":"risultati"},{"value":"senza","label":"account"}]};
var GROWTH_COPY = {
  es: { weeklyBadge: 'Descubrimiento de la semana', weeklyIntro: 'Una idea distinta del catálogo para salir de lo de siempre: {title}.', weeklyLink: 'Ver opciones en Amazon', weeklySimilar: 'Ver similares', weeklyPricePrefix: 'Precio orientativo', weeklyProductBadge: 'Producto consultado', installTitle: 'Llévate Regalazo contigo', installText: 'Instálalo para tener Regalazo a mano cuando vuelva a surgir un cumpleaños.', installButton: 'Instalar', installDismiss: 'Ahora no' },
  en: { weeklyBadge: 'Discovery of the week', weeklyIntro: 'A different catalogue idea to escape the obvious: {title}.', weeklyLink: 'See options on Amazon', weeklySimilar: 'See similar', weeklyPricePrefix: 'Guide price', weeklyProductBadge: 'Product checked', installTitle: 'Take Regalazo with you', installText: 'Install it to keep Regalazo handy when the next birthday appears.', installButton: 'Install', installDismiss: 'Not now' },
  de: { weeklyBadge: 'Entdeckung der Woche', weeklyIntro: 'Eine andere Katalogidee abseits des Offensichtlichen: {title}.', weeklyLink: 'Optionen auf Amazon ansehen', weeklySimilar: 'Ähnliche ansehen', weeklyPricePrefix: 'Richtwert', weeklyProductBadge: 'Produkt geprüft', installTitle: 'Regalazo immer dabei', installText: 'Installiere Regalazo, damit du es beim nächsten Geburtstag griffbereit hast.', installButton: 'Installieren', installDismiss: 'Jetzt nicht' },
  fr: { weeklyBadge: 'Découverte de la semaine', weeklyIntro: 'Une idée différente du catalogue pour sortir de l’évidence : {title}.', weeklyLink: 'Voir les options sur Amazon', weeklySimilar: 'Voir similaires', weeklyPricePrefix: 'Prix indicatif', weeklyProductBadge: 'Produit vérifié', installTitle: 'Emportez Regalazo', installText: 'Installez Regalazo pour l’avoir sous la main au prochain anniversaire.', installButton: 'Installer', installDismiss: 'Pas maintenant' },
  it: { weeklyBadge: 'Scoperta della settimana', weeklyIntro: 'Un’idea diversa dal catalogo per uscire dal solito: {title}.', weeklyLink: 'Vedi le opzioni su Amazon', weeklySimilar: 'Vedi simili', weeklyPricePrefix: 'Prezzo indicativo', weeklyProductBadge: 'Prodotto verificato', installTitle: 'Porta Regalazo con te', installText: 'Installa Regalazo per averlo pronto al prossimo compleanno.', installButton: 'Installa', installDismiss: 'Non ora' }
};
var CATALOG_LOADING_COPY = { es: 'Preparando tus ideas…', en: 'Preparing your ideas…', de: 'Deine Ideen werden vorbereitet…', fr: 'Préparation de vos idées…', it: 'Prepariamo le tue idee…' };
Object.keys(ENHANCED_RESULT_COPY).forEach(function (language) {
  if (!LANGUAGE_COPY[language]) return;
  LANGUAGE_COPY[language].results = Object.assign({}, LANGUAGE_COPY[language].results, ENHANCED_RESULT_COPY[language]);
  LANGUAGE_COPY[language].heroNotes = HERO_NOTE_COPY[language] || LANGUAGE_COPY[language].heroNotes;
  LANGUAGE_COPY[language].growth = GROWTH_COPY[language] || GROWTH_COPY.es;
  LANGUAGE_COPY[language].results.catalogLoading = CATALOG_LOADING_COPY[language] || CATALOG_LOADING_COPY.en;
});
var FEEDBACK_COPY = {
  es: { owned: 'Ya lo tiene', notFit: 'No me encaja', saved: 'Anotado. Buscamos otra idea.', noMore: 'Hemos agotado las opciones más cercanas. Prueba a ampliar el presupuesto o dejar más abierto el estilo.' },
  en: { owned: 'They already have it', notFit: 'Not a fit', saved: 'Got it. We’ll find another idea.', noMore: 'We have used the closest options. Try widening the budget or style.' },
  de: { owned: 'Hat die Person schon', notFit: 'Passt nicht', saved: 'Verstanden. Wir suchen eine andere Idee.', noMore: 'Die passendsten Optionen sind ausgeschöpft. Öffne Budget oder Stil etwas weiter.' },
  fr: { owned: 'La personne l’a déjà', notFit: 'Ça ne convient pas', saved: 'Compris. Nous cherchons une autre idée.', noMore: 'Nous avons épuisé les options les plus proches. Élargissez le budget ou le style.' },
  it: { owned: 'Ce l’ha già', notFit: 'Non fa per lui/lei', saved: 'Ricevuto. Cerchiamo un’altra idea.', noMore: 'Abbiamo esaurito le opzioni più vicine. Prova ad ampliare budget o stile.' }
};
var FIT_REASON_COPY = {
  es: { budget: 'Dentro de tu presupuesto', interest: 'Para {value}', relation: 'Para {value}', style: 'Estilo {value}', age: 'Adecuado para {value}', occasion: 'Para {value}', open: 'Selección abierta' },
  en: { budget: 'Within your budget', interest: 'For {value}', relation: 'For {value}', style: '{value} style', age: 'Suitable for {value}', occasion: 'For {value}', open: 'Open selection' },
  de: { budget: 'In deinem Budget', interest: 'Für {value}', relation: 'Für {value}', style: 'Stil: {value}', age: 'Passend für {value}', occasion: 'Für {value}', open: 'Offene Auswahl' },
  fr: { budget: 'Dans votre budget', interest: 'Pour {value}', relation: 'Pour {value}', style: 'Style {value}', age: 'Adapté à {value}', occasion: 'Pour {value}', open: 'Sélection ouverte' },
  it: { budget: 'Nel tuo budget', interest: 'Per {value}', relation: 'Per {value}', style: 'Stile {value}', age: 'Adatto a {value}', occasion: 'Per {value}', open: 'Selezione aperta' }
};
var CATALOG_NOTE_COPY = {
  es: 'Motor editorial de {count} composiciones, con búsquedas distintas según tus respuestas.',
  en: 'Editorial engine with {count} compositions and different searches based on your answers.',
  de: 'Redaktioneller Motor mit {count} Kombinationen und passenden Suchen nach deinen Antworten.',
  fr: 'Moteur éditorial de {count} combinaisons, avec des recherches adaptées à vos réponses.',
  it: 'Motore editoriale con {count} combinazioni e ricerche diverse in base alle tue risposte.'
};
var PURCHASE_GUIDANCE_COPY = {
  es: {
    label: 'Antes de comprar',
    generic: 'Comprueba medidas, compatibilidad y opiniones recientes.',
    tech: 'Revisa la compatibilidad con sus dispositivos y el formato exacto.',
    kitchen: 'Comprueba tamaño, materiales y si encaja con lo que ya usa.',
    travel: 'Mira medidas, peso y si cabe en su forma habitual de viajar.',
    beauty: 'Revisa ingredientes y preferencias; en cuidado personal, lo específico puede fallar.',
    games: 'Comprueba edad recomendada, número de jugadores y duración.',
    creative: 'Mira qué incluye el kit y qué consumibles necesitará después.',
    style: 'Comprueba talla, medidas y política de devolución.',
    home: 'Comprueba espacio, mantenimiento y si ya tiene algo parecido.'
  },
  en: {
    label: 'Before buying',
    generic: 'Check dimensions, compatibility and recent reviews.',
    tech: 'Check compatibility with their devices and the exact format.',
    kitchen: 'Check size, materials and whether it fits what they already use.',
    travel: 'Check dimensions, weight and how it fits the way they travel.',
    beauty: 'Check ingredients and preferences; highly specific personal-care gifts can miss.',
    games: 'Check the recommended age, player count and play time.',
    creative: 'Check what the kit includes and which supplies they will need later.',
    style: 'Check size, measurements and the return policy.',
    home: 'Check space, maintenance and whether they already own something similar.'
  },
  de: {
    label: 'Vor dem Kauf',
    generic: 'Maße, Kompatibilität und aktuelle Bewertungen prüfen.',
    tech: 'Kompatibilität mit den Geräten und das genaue Format prüfen.',
    kitchen: 'Größe, Material und die Kompatibilität mit dem vorhandenen Zubehör prüfen.',
    travel: 'Maße, Gewicht und die übliche Reiseart berücksichtigen.',
    beauty: 'Inhaltsstoffe und Vorlieben prüfen; sehr persönliche Pflegeprodukte sind riskanter.',
    games: 'Empfohlenes Alter, Spielerzahl und Spieldauer prüfen.',
    creative: 'Prüfen, was im Set enthalten ist und was später nachgekauft werden muss.',
    style: 'Größe, Maße und Rückgabebedingungen prüfen.',
    home: 'Platz, Pflegeaufwand und mögliche Doppelungen prüfen.'
  },
  fr: {
    label: 'Avant d’acheter',
    generic: 'Vérifiez les dimensions, la compatibilité et les avis récents.',
    tech: 'Vérifiez la compatibilité avec ses appareils et le format exact.',
    kitchen: 'Vérifiez la taille, les matériaux et la compatibilité avec ce qu’il utilise déjà.',
    travel: 'Vérifiez les dimensions, le poids et son type de voyage habituel.',
    beauty: 'Vérifiez les ingrédients et les préférences ; un soin trop spécifique peut décevoir.',
    games: 'Vérifiez l’âge conseillé, le nombre de joueurs et la durée.',
    creative: 'Vérifiez le contenu du kit et les consommables à prévoir ensuite.',
    style: 'Vérifiez la taille, les mesures et les conditions de retour.',
    home: 'Vérifiez l’espace disponible, l’entretien et les doublons possibles.'
  },
  it: {
    label: 'Prima di acquistare',
    generic: 'Controlla misure, compatibilità e recensioni recenti.',
    tech: 'Controlla la compatibilità con i suoi dispositivi e il formato esatto.',
    kitchen: 'Controlla dimensioni, materiali e compatibilità con ciò che usa già.',
    travel: 'Controlla dimensioni, peso e il suo modo abituale di viaggiare.',
    beauty: 'Controlla ingredienti e preferenze; i prodotti molto specifici possono non funzionare.',
    games: 'Controlla età consigliata, numero di giocatori e durata.',
    creative: 'Controlla cosa contiene il kit e quali materiali serviranno in seguito.',
    style: 'Controlla taglia, misure e condizioni di reso.',
    home: 'Controlla spazio, manutenzione e possibili doppioni.'
  }
};

var NOT_FOR_COPY = {
  es: {
    label: 'Mejor evita si',
    generic: 'No conecta con nada que ya disfrute o no tienes claro dónde encajaría.',
    tech: 'No sabes si es compatible con sus dispositivos.',
    kitchen: 'No disfruta cocinar o ya tiene una pieza equivalente.',
    travel: 'No sabes si encaja con sus medidas o forma de viajar.',
    beauty: 'No conoces sus preferencias de ingredientes, aromas o texturas.',
    games: 'No coincide con su edad, sus gustos o el número de jugadores.',
    creative: 'No le apetece dedicar tiempo a una actividad o proyecto.',
    style: 'No tienes claro su talla, medidas o estilo personal.',
    home: 'No sabes si tiene espacio o algo parecido en casa.'
  },
  en: {
    label: 'Skip it if',
    generic: 'It does not connect with anything they already enjoy or you cannot picture where it fits.',
    tech: 'You are not sure it works with their devices.',
    kitchen: 'They do not enjoy cooking or already own something similar.',
    travel: 'You do not know whether it fits their measurements or travel style.',
    beauty: 'You do not know their preferences for ingredients, scents or textures.',
    games: 'It does not match their age, tastes or the number of players.',
    creative: 'They are unlikely to want the time commitment of an activity or project.',
    style: 'You are not sure about their size, measurements or personal style.',
    home: 'You do not know whether they have space or something similar at home.'
  },
  de: {
    label: 'Besser vermeiden, wenn',
    generic: 'die Idee nicht zu etwas passt, das diese Person bereits gerne macht.',
    tech: 'du nicht weißt, ob es mit den Geräten kompatibel ist.',
    kitchen: 'die Person nicht gerne kocht oder etwas Ähnliches schon besitzt.',
    travel: 'du Maße oder Reisegewohnheiten nicht einschätzen kannst.',
    beauty: 'du Vorlieben für Inhaltsstoffe, Düfte oder Texturen nicht kennst.',
    games: 'Alter, Geschmack oder Spielerzahl nicht dazu passen.',
    creative: 'die Person wahrscheinlich keine Zeit für ein Projekt aufbringen möchte.',
    style: 'du Größe, Maße oder persönlichen Stil nicht kennst.',
    home: 'du nicht weißt, ob Platz vorhanden ist oder es schon etwas Ähnliches gibt.'
  },
  fr: {
    label: 'À éviter si',
    generic: 'vous ne voyez pas le lien avec ce que cette personne aime déjà.',
    tech: 'vous ne savez pas si le produit est compatible avec ses appareils.',
    kitchen: 'elle n’aime pas cuisiner ou possède déjà quelque chose de similaire.',
    travel: 'vous ne connaissez pas ses dimensions ou sa façon de voyager.',
    beauty: 'vous ignorez ses préférences d’ingrédients, de parfum ou de texture.',
    games: 'l’âge, les goûts ou le nombre de joueurs ne correspondent pas.',
    creative: 'elle n’a probablement pas envie de consacrer du temps à un projet.',
    style: 'vous n’êtes pas sûr de sa taille, de ses mesures ou de son style.',
    home: 'vous ne savez pas si elle a la place ou possède déjà un équivalent.'
  },
  it: {
    label: 'Meglio evitarlo se',
    generic: 'non si collega a qualcosa che ama già o non riesci a immaginare come lo userebbe.',
    tech: 'non sai se è compatibile con i suoi dispositivi.',
    kitchen: 'non ama cucinare o possiede già qualcosa di simile.',
    travel: 'non conosci le sue misure o il suo modo di viaggiare.',
    beauty: 'non conosci le sue preferenze su ingredienti, profumi o texture.',
    games: 'età, gusti o numero di giocatori non sono adatti.',
    creative: 'probabilmente non vuole dedicare tempo a un progetto o attività.',
    style: 'non conosci bene taglia, misure o stile personale.',
    home: 'non sai se ha spazio o possiede già qualcosa di simile.'
  }
};

var PRODUCT_COPY = {
  es: {
    loading: 'Buscando productos concretos en Amazon…',
    ready: '{count} productos concretos consultados en Amazon.',
    fallback: 'No hemos podido cargar una ficha concreta ahora; puedes abrir una búsqueda afinada y comparar las opciones disponibles en Amazon.',
    direct: 'Ver producto en Amazon',
    similar: 'Ver similares',
    badge: 'Producto concreto',
    price: 'precio en Amazon',
    updated: 'Consultado {time}',
    exactDisclosure: 'El enlace principal lleva al producto concreto consultado en Amazon. “Ver similares” abre una búsqueda afinada. El precio y la disponibilidad pueden cambiar.',
    mixedDisclosure: 'Algunas ideas llevan a un producto concreto y otras a una búsqueda afinada. El precio y la disponibilidad pueden cambiar.'
  },
  en: {
    loading: 'Finding specific products on Amazon…',
    ready: '{count} specific products checked on Amazon.',
    fallback: 'We could not load a specific product right now; you can open a focused search and compare the options available on Amazon.',
    direct: 'View product on Amazon',
    similar: 'See similar',
    badge: 'Specific product',
    price: 'Amazon price',
    updated: 'Checked {time}',
    exactDisclosure: 'The main link goes to the specific product checked on Amazon. “See similar” opens a refined search. Price and availability can change.',
    mixedDisclosure: 'Some ideas link to a specific product and others to a refined search. Price and availability can change.'
  },
  de: {
    loading: 'Konkrete Produkte auf Amazon werden gesucht…',
    ready: '{count} konkrete Produkte auf Amazon geprüft.',
    fallback: 'Eine konkrete Produktseite konnte gerade nicht geladen werden; du kannst eine passende Suche öffnen und die verfügbaren Optionen auf Amazon vergleichen.',
    direct: 'Produkt auf Amazon ansehen',
    similar: 'Ähnliche ansehen',
    badge: 'Konkretes Produkt',
    price: 'Amazon-Preis',
    updated: 'Geprüft um {time}',
    exactDisclosure: 'Der Hauptlink führt zum geprüften Produkt auf Amazon. „Ähnliche ansehen“ öffnet eine passende Suche. Preis und Verfügbarkeit können sich ändern.',
    mixedDisclosure: 'Einige Ideen führen zu einem konkreten Produkt, andere zu einer passenden Suche. Preis und Verfügbarkeit können sich ändern.'
  },
  fr: {
    loading: 'Recherche de produits précis sur Amazon…',
    ready: '{count} produits précis vérifiés sur Amazon.',
    fallback: 'Une fiche produit précise n’est pas disponible pour le moment ; vous pouvez ouvrir une recherche affinée et comparer les options sur Amazon.',
    direct: 'Voir le produit sur Amazon',
    similar: 'Voir similaires',
    badge: 'Produit précis',
    price: 'prix Amazon',
    updated: 'Vérifié à {time}',
    exactDisclosure: 'Le lien principal mène vers le produit vérifié sur Amazon. « Voir similaires » ouvre une recherche affinée. Le prix et la disponibilité peuvent changer.',
    mixedDisclosure: 'Certaines idées mènent à un produit précis, d’autres à une recherche affinée. Le prix et la disponibilité peuvent changer.'
  },
  it: {
    loading: 'Cerchiamo prodotti concreti su Amazon…',
    ready: '{count} prodotti concreti verificati su Amazon.',
    fallback: 'Una scheda prodotto precisa non è disponibile in questo momento; puoi aprire una ricerca mirata e confrontare le opzioni su Amazon.',
    direct: 'Vedi prodotto su Amazon',
    similar: 'Vedi simili',
    badge: 'Prodotto concreto',
    price: 'prezzo Amazon',
    updated: 'Verificato alle {time}',
    exactDisclosure: 'Il link principale porta al prodotto verificato su Amazon. “Vedi simili” apre una ricerca mirata. Prezzo e disponibilità possono cambiare.',
    mixedDisclosure: 'Alcune idee portano a un prodotto concreto, altre a una ricerca mirata. Prezzo e disponibilità possono cambiare.'
  }
};

function productCopy(key) {
  var copy = PRODUCT_COPY[state.language] || PRODUCT_COPY.es;
  return copy[key] || PRODUCT_COPY.es[key] || '';
}

function catalogNote() {
  var template = CATALOG_NOTE_COPY[state.language] || CATALOG_NOTE_COPY.es;
  return interpolate(template, { count: COMPOSITION_COUNT || CATALOG_COUNT });
}

var CAMPAIGN_COPY = {
  es: 'Has llegado desde La Mami Hacker. En menos de un minuto tendrás una selección de regalos para la persona que tienes en mente.',
  en: 'You came from La Mami Hacker. In under a minute, you will have a gift selection for the person in mind.',
  de: 'Du kommst von La Mami Hacker. In weniger als einer Minute hast du eine Geschenkauswahl für diese Person.',
  fr: 'Vous arrivez de La Mami Hacker. En moins d’une minute, vous aurez une sélection pour la personne à laquelle vous pensez.',
  it: 'Arrivi da La Mami Hacker. In meno di un minuto avrai una selezione di regali per la persona che hai in mente.'
};

function renderCampaignContext() {
  if (!hero) return;
  var source = '';
  var campaign = '';
  try {
    var params = new URLSearchParams(window.location.search || '');
    source = String(params.get('utm_source') || '').toLowerCase();
    campaign = String(params.get('utm_campaign') || '').toLowerCase();
  } catch (error) {}
  var isLaMamiHacker = source === 'lamamihacker' || campaign === 'regalazo-launch' || campaign === 'lamamihacker';
  var note = document.getElementById('campaign-note');
  if (!isLaMamiHacker) {
    if (note) note.hidden = true;
    return;
  }
  if (!note) {
    note = document.createElement('p');
    note.id = 'campaign-note';
    note.className = 'campaign-note';
    var notes = document.querySelector('.hero-notes');
    if (notes && notes.parentNode) notes.parentNode.insertBefore(note, notes.nextSibling);
    else hero.appendChild(note);
  }
  note.textContent = CAMPAIGN_COPY[state.language] || CAMPAIGN_COPY.es;
  note.hidden = false;
}

function purchaseCategory(gift) {
  var category = String(gift && gift.category || '').toLowerCase();
  if (/tecnolog|gaming|escritorio/.test(category)) return 'tech';
  if (/cocin|sabor/.test(category)) return 'kitchen';
  if (/viaj/.test(category)) return 'travel';
  if (/cuidado|bienestar/.test(category)) return 'beauty';
  if (/juego|plan/.test(category)) return 'games';
  if (/creativ|papeler|lectura/.test(category)) return 'creative';
  if (/estilo|detalle|movimiento/.test(category)) return 'style';
  if (/casa|hogar|calma|moment/.test(category)) return 'home';
  return 'generic';
}

function buildPurchaseTip(gift) {
  var copy = PURCHASE_GUIDANCE_COPY[state.language] || PURCHASE_GUIDANCE_COPY.es;
  return { label: copy.label, text: copy[purchaseCategory(gift)] || copy.generic };
}

function buildAvoidTip(gift) {
  var copy = NOT_FOR_COPY[state.language] || NOT_FOR_COPY.es;
  return { label: copy.label, text: copy[purchaseCategory(gift)] || copy.generic };
}

Object.keys(LANGUAGE_COPY).forEach(function (language) {
  LANGUAGE_COPY[language].results = Object.assign({}, LANGUAGE_COPY[language].results, FEEDBACK_COPY[language] || FEEDBACK_COPY.es);
});
var OPEN_GENDER_COPY = {
  es: { label: 'Cualquiera', detail: 'dejamos el género abierto' },
  en: { label: 'Any', detail: 'keep gender open' },
  de: { label: 'Beliebig', detail: 'Geschlecht offen lassen' },
  fr: { label: 'Peu importe', detail: 'laissons le genre ouvert' },
  it: { label: 'Qualsiasi', detail: 'lasciamo aperto il genere' }
};
Object.keys(OPEN_GENDER_COPY).forEach(function (language) {
  if (LANGUAGE_COPY[language] && LANGUAGE_COPY[language].questions.gender) LANGUAGE_COPY[language].questions.gender.options.any = OPEN_GENDER_COPY[language];
});

var LANGUAGE_STORAGE_KEY = 'regalazo-language-v1';
var state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], dismissedBaseIds: [], language: readLanguage(), recommendationMode: 'fit', analyticsStarted: false, answers: { interests: [] } };
var currentRecommendations = [];
var currentAmazonProducts = Object.create(null);
var amazonProductPending = Object.create(null);
var amazonProductStatus = 'idle';
var amazonProductHydrationToken = 0;
var sharedRecommendations = null;
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
var currentWeeklyProduct = null;
var currentWeeklyProductCountry = '';
var currentWeeklyProductRotation = '';
var weeklyHydrationKey = '';
var weeklyHydrationObserver = null;
var analyticsConsentBanner = document.getElementById('regalazo-privacy-choice');
var analyticsConsentTitle = document.getElementById('analytics-consent-title');
var analyticsConsentText = document.getElementById('analytics-consent-text');
var analyticsConsentAcceptButton = document.getElementById('analytics-consent-accept');
var analyticsConsentRejectButton = document.getElementById('analytics-consent-reject');
var analyticsPreferencesButton = document.getElementById('analytics-preferences');
var analyticsConsentMoreButton = document.getElementById('analytics-consent-more');
var pwaPrompt = document.getElementById('pwa-prompt');
var pwaInstallButton = document.getElementById('pwa-install');
var pwaDismissButton = document.getElementById('pwa-dismiss');
var deferredInstallPrompt = null;
var trackedQuestionSteps = Object.create(null);
var quizExitTracked = false;
var trackedGiftImpressions = Object.create(null);
var giftImpressionObserver = null;
analyticsConsentState = window.RegalazoAnalyticsCore ? window.RegalazoAnalyticsCore.getConsent() : readAnalyticsConsent();

function escapeHtml(value) {
  var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(value).replace(/[&<>"']/g, function (character) { return map[character]; });
}

function calculateCompositionCount() {
  if (!GIFT_CATALOG.length || !Array.isArray(GIFT_RECIPES)) return 0;
  return GIFT_CATALOG.reduce(function (total, gift) {
    return total + GIFT_RECIPES.filter(function (recipe) { return isRecipeCompatible(gift, recipe); }).length;
  }, 0);
}

function installCatalog() {
  var catalog = window.RegalazoCatalog && window.RegalazoCatalog.gifts;
  if (!Array.isArray(catalog) || !catalog.length) throw new Error('catalog_unavailable');
  GIFT_CATALOG = catalog;
  CATALOG_COUNT = GIFT_CATALOG.length;
  COMPOSITION_COUNT = calculateCompositionCount() || COMPOSITION_COUNT;
  catalogReady = true;
  renderWeeklyDiscovery();
  return GIFT_CATALOG;
}

function ensureCatalog() {
  if (catalogReady) return Promise.resolve(GIFT_CATALOG);
  if (catalogLoadPromise) return catalogLoadPromise;
  catalogLoadPromise = new Promise(function (resolve, reject) {
    if (window.RegalazoCatalog && Array.isArray(window.RegalazoCatalog.gifts)) {
      try { resolve(installCatalog()); } catch (error) { reject(error); }
      return;
    }
    if (typeof document === 'undefined' || !document.createElement || !document.head) {
      reject(new Error('catalog_loader_unavailable'));
      return;
    }
    catalogScriptElement = document.createElement('script');
    catalogScriptElement.async = true;
    catalogScriptElement.src = APP_CONFIG.catalogScript;
    catalogScriptElement.onload = function () {
      try { resolve(installCatalog()); } catch (error) { reject(error); }
    };
    catalogScriptElement.onerror = function () { reject(new Error('catalog_load_failed')); };
    document.head.appendChild(catalogScriptElement);
  }).catch(function (error) {
    catalogLoadPromise = null;
    throw error;
  });
  return catalogLoadPromise;
}

function scheduleCatalogWarmup() {
  var warmup = function () { ensureCatalog().catch(function () {}); };
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(warmup, { timeout: 2200 });
  else window.setTimeout(warmup, 1200);
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
    var forced = new URLSearchParams(window.location.search).get('lang');
    if (LANGUAGE_COPY[forced]) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, forced);
      return forced;
    }
  } catch (error) {}
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
  page_viewed: ['path'],
  quiz_started: [],
  quiz_step_viewed: ['questionId', 'step'],
  quiz_answered: ['questionId', 'step'],
  quiz_abandoned: ['questionId', 'step'],
  quiz_completed: ['genderProvided', 'interestCount'],
  recommendations_viewed: ['resultCount', 'variant', 'mode'],
  recommendations_refreshed: ['variant', 'mode'],
  gift_outbound_clicked: ['giftId', 'position', 'store', 'mode', 'linkType'],
  language_changed: ['from', 'to'],
  share_clicked: ['mode', 'ideaCount'],
  share_completed: ['method', 'mode'],
  shared_result_opened: ['mode'],
  weekly_discovery_viewed: ['giftId'],
  weekly_discovery_clicked: ['giftId', 'store', 'linkType'],
  weekly_discovery_product_ready: ['giftId', 'linkType'],
  gift_impression: ['giftId', 'position'],
  share_card_created: ['ideaCount'],
  share_card_downloaded: ['ideaCount'],
  pwa_ready: [],
  pwa_install_prompt_viewed: [],
  pwa_install_prompted: [],
  pwa_install_choice: ['outcome'],
  pwa_installed: [],
  pwa_install_dismissed: [],
  quiz_reset: [],
  analytics_loaded: [],
  gift_feedback: ['giftId', 'feedback']
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
  if (analyticsConsentMoreButton) analyticsConsentMoreButton.textContent = copy.more;
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
  if (!Object.prototype.hasOwnProperty.call(ANALYTICS_SAFE_PROPERTIES, eventName)) return {};
  var safeKeys = ANALYTICS_SAFE_PROPERTIES[eventName] || [];
  var safeProperties = {};
  safeKeys.forEach(function (key) {
    if (!properties || !Object.prototype.hasOwnProperty.call(properties, key)) return;
    var value = properties[key];
    if (key === 'position' || key === 'step' || key === 'resultCount' || key === 'variant' || key === 'ideaCount') {
      var number = Number(value);
      if (Number.isFinite(number)) safeProperties[key] = number;
      return;
    }
    var allowed = key === 'path' ? /[^a-z0-9/_:.~-]/gi : /[^a-z0-9:_.-]/gi;
    var text = String(value || '').replace(allowed, '').slice(0, key === 'path' ? 200 : 100);
    if (text) safeProperties[key] = text;
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
    autocapture: false,
    opt_out_tracking_by_default: true,
    ip: false,
    persistence: 'localStorage',
    property_blacklist: ['$current_url', '$referrer', '$initial_referrer', '$initial_referring_domain']
  });
  if (analyticsConsentState === 'granted' && typeof window.mixpanel.opt_in_tracking === 'function') window.mixpanel.opt_in_tracking();
  analyticsReady = true;
  ANALYTICS_QUEUE.splice(0).forEach(sendMixpanelEvent);
  return true;
}

function loadMixpanel() {
  if (window.RegalazoAnalyticsCore) {
    analyticsConsentState = window.RegalazoAnalyticsCore.getConsent();
    window.RegalazoAnalyticsCore.load();
    return;
  }
  if (analyticsConsentState !== 'granted' || !ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.token || analyticsReady || analyticsScriptLoading) return;
  if (initializeMixpanel()) {
    trackPageView();
    return;
  }
  analyticsScriptLoading = true;
  var script = document.createElement('script');
  script.async = true;
  script.src = ANALYTICS_CONFIG.scriptUrl;
  script.onload = function () {
    analyticsScriptLoading = false;
    if (initializeMixpanel()) {
      trackEvent('analytics_loaded', {});
      trackPageView();
    }
  };
  script.onerror = function () {
    analyticsScriptLoading = false;
  };
  document.head.appendChild(script);
}

function setAnalyticsConsent(value) {
  if (value !== 'granted' && value !== 'denied') return;
  if (window.RegalazoAnalyticsCore) {
    window.RegalazoAnalyticsCore.setConsent(value);
    analyticsConsentState = window.RegalazoAnalyticsCore.getConsent();
    return;
  }
  analyticsConsentState = value;
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch (error) {}
  if (value === 'denied') {
    ANALYTICS_QUEUE.length = 0;
    analyticsPageViewTracked = false;
    if (window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
  }
  hideAnalyticsConsent();
  if (value === 'granted') {
    if (analyticsReady && window.mixpanel && typeof window.mixpanel.opt_in_tracking === 'function') window.mixpanel.opt_in_tracking();
    loadMixpanel();
    if (analyticsReady) trackPageView();
  }
}

function openAnalyticsPreferences() {
  if (window.RegalazoAnalyticsCore) {
    window.RegalazoAnalyticsCore.openPreferences();
    analyticsConsentState = window.RegalazoAnalyticsCore.getConsent();
    return;
  }
  analyticsConsentState = null;
  try {
    localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
  } catch (error) {}
  analyticsPageViewTracked = false;
  if (analyticsReady && window.mixpanel && typeof window.mixpanel.opt_out_tracking === 'function') window.mixpanel.opt_out_tracking();
  showAnalyticsConsent();
  if (analyticsConsentBanner && typeof analyticsConsentBanner.focus === 'function') analyticsConsentBanner.focus();
}

function trackPageView() {
  if (window.RegalazoAnalyticsCore) {
    window.RegalazoAnalyticsCore.trackPageView();
    return;
  }
  if (analyticsPageViewTracked) return;
  analyticsPageViewTracked = true;
  trackEvent('page_viewed', { path: window.location.pathname || '/' });
}

function trackEvent(eventName, properties) {
  if (window.RegalazoAnalyticsCore) {
    window.RegalazoAnalyticsCore.track(eventName, properties || {});
    return;
  }
  if (analyticsConsentState !== 'granted' || !Object.prototype.hasOwnProperty.call(ANALYTICS_SAFE_PROPERTIES, eventName)) return;
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

if (!window.RegalazoAnalytics) {
  window.RegalazoAnalytics = Object.freeze({
    track: trackEvent,
    getConsent: function () { return analyticsConsentState; },
    setConsent: setAnalyticsConsent,
    getQueue: function () { return ANALYTICS_QUEUE.slice(); }
  });
}

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
  var heroCatalogNote = document.getElementById('hero-catalog-note');
  if (heroEyebrow) heroEyebrow.textContent = copy.heroEyebrow;
  if (heroTitle) heroTitle.textContent = copy.heroTitle;
  if (heroCopy) heroCopy.textContent = copy.heroCopy;
  if (heroCatalogNote) heroCatalogNote.textContent = catalogNote();

  var notes = document.querySelectorAll('.hero-notes > span');
  copy.heroNotes.forEach(function (note, index) {
    if (notes[index]) notes[index].innerHTML = '<strong>' + escapeHtml(note.value) + '</strong> ' + escapeHtml(note.label);
  });
  renderCampaignContext();

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

function weeklyDiscoveryInfo() {
  var rotationDays = Math.max(1, Number(APP_CONFIG.discoveryRotationDays) || 7);
  var rotation = Math.floor((Date.now() - Date.UTC(2024, 0, 1)) / (rotationDays * 86400000));
  return { rotation: rotation, gift: GIFT_CATALOG[Math.abs(rotation) % GIFT_CATALOG.length] };
}

function queueWeeklyProductHydration(gift, rotation, country) {
  if (!weeklyDiscovery || !gift || !canLoadAmazonProducts({ country: country })) return;
  var key = String(rotation) + '|' + String(country);
  if (weeklyHydrationKey === key) return;
  weeklyHydrationKey = key;
  var start = function () { hydrateWeeklyProduct(gift, rotation, country); };
  if (typeof window.IntersectionObserver === 'function') {
    if (weeklyHydrationObserver) weeklyHydrationObserver.disconnect();
    weeklyHydrationObserver = new window.IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      weeklyHydrationObserver.disconnect();
      weeklyHydrationObserver = null;
      start();
    }, { rootMargin: '360px 0px' });
    weeklyHydrationObserver.observe(weeklyDiscovery);
  } else if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(start, { timeout: 2800 });
  } else {
    window.setTimeout(start, 1800);
  }
}

function hydrateWeeklyProduct(gift, rotation, country) {
  var requestToken = amazonProductHydrationToken;
  fetch('/api/amazon-products', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ country: country, queries: [{ id: gift.id, query: gift.amazonQuery, maxPrice: Math.max(20, Math.round(gift.price * 1.6)) }] })
  }).then(function (response) {
    return response.json().catch(function () { return {}; }).then(function (payload) { return { ok: response.ok, payload: payload }; });
  }).then(function (result) {
    if (requestToken !== amazonProductHydrationToken || !result.ok || !result.payload || !Array.isArray(result.payload.products)) return;
    var product = result.payload.products.find(function (item) { return item && item.requestId === gift.id; });
    if (!product) return;
    var info = weeklyDiscoveryInfo();
    if (info.rotation !== rotation || info.gift.id !== gift.id || country !== (state.answers.country || APP_CONFIG.defaultCountry)) return;
    currentWeeklyProduct = product;
    currentWeeklyProductCountry = country;
    currentWeeklyProductRotation = String(rotation);
    trackEvent('weekly_discovery_product_ready', { giftId: gift.id, linkType: 'product' });
    renderWeeklyDiscovery();
  }).catch(function () {});
}

function renderWeeklyDiscovery() {
  if (!weeklyDiscovery || !GIFT_CATALOG.length) return;
  var info = weeklyDiscoveryInfo();
  var rotation = info.rotation;
  var gift = info.gift;
  var answers = state.answers || { budget: '20to40', country: APP_CONFIG.defaultCountry };
  var country = answers.country || APP_CONFIG.defaultCountry;
  var titles = GIFT_TITLE_COPY[state.language] || {};
  var growth = currentCopy().growth || GROWTH_COPY.es;
  var product = currentWeeklyProduct && currentWeeklyProductCountry === country && currentWeeklyProductRotation === String(rotation) ? currentWeeklyProduct : null;
  if (!product && currentWeeklyProduct && (currentWeeklyProductCountry !== country || currentWeeklyProductRotation !== String(rotation))) currentWeeklyProduct = null;
  var title = product ? product.title : (titles[gift.id] || gift.title);
  var badge = document.getElementById('weekly-badge');
  var heading = document.getElementById('weekly-title');
  var copy = document.getElementById('weekly-copy');
  var price = document.getElementById('weekly-price');
  var link = document.getElementById('weekly-link');
  var similar = document.getElementById('weekly-similar-link');
  var media = document.getElementById('weekly-media');
  var image = document.getElementById('weekly-image');
  var productBadge = document.getElementById('weekly-product-badge');
  if (badge) badge.textContent = growth.weeklyBadge;
  if (heading) heading.textContent = title;
  if (copy) copy.textContent = interpolate(growth.weeklyIntro, { title: title });
  if (price) price.textContent = product ? product.priceDisplay + ' · ' + productCopy('price') : growth.weeklyPricePrefix + ': ≈ ' + String(gift.price) + ' €';
  if (media) media.hidden = !(product && product.imageUrl);
  if (image && product && product.imageUrl) {
    image.src = product.imageUrl;
    image.alt = title;
    if (product.imageWidth) image.width = product.imageWidth;
    if (product.imageHeight) image.height = product.imageHeight;
  }
  if (productBadge) productBadge.textContent = growth.weeklyProductBadge || productCopy('badge');
  if (link) {
    link.innerHTML = escapeHtml(product ? productCopy('direct') : growth.weeklyLink) + ' <span aria-hidden="true">→</span>';
    link.setAttribute('href', product ? product.detailPageURL : buildAmazonUrl(gift, answers));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'sponsored nofollow noopener');
    link.setAttribute('data-gift-id', gift.id);
    link.setAttribute('data-discovery-rotation', String(rotation));
    link.setAttribute('data-discovery-link-type', product ? 'product' : 'similar');
  }
  if (similar) {
    similar.hidden = !product;
    similar.textContent = growth.weeklySimilar || productCopy('similar');
    similar.innerHTML = escapeHtml(growth.weeklySimilar || productCopy('similar')) + ' <span aria-hidden="true">↗</span>';
    similar.setAttribute('href', buildAmazonUrl(gift, answers));
    similar.setAttribute('data-gift-id', gift.id);
    similar.setAttribute('data-discovery-rotation', String(rotation));
    similar.setAttribute('data-discovery-link-type', 'similar');
  }
  weeklyDiscovery.dataset.discoveryId = gift.id;
  weeklyDiscovery.dataset.discoveryRotation = String(rotation);
  weeklyDiscovery.dataset.discoveryProduct = product ? 'true' : 'false';
  if (!weeklyDiscovery.dataset.tracked) {
    weeklyDiscovery.dataset.tracked = 'true';
    trackEvent('weekly_discovery_viewed', { giftId: gift.id });
  }
  queueWeeklyProductHydration(gift, rotation, country);
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
  if (question.id === 'age' && state.answers.relation === 'partner' && state.answers.age === 'child') {
    state.answers.age = 'unknown';
  }
  var options = question.options.filter(function (option) {
    return !(question.id === 'age' && state.answers.relation === 'partner' && option.value === 'child');
  });
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
    options.map(function (option) { return optionMarkup(question, option); }).join('') +
    '</div>' + (question.multiple ? '<p class="multi-hint"><span aria-hidden="true">＋</span> ' + escapeHtml(copy.messages.multiHint) + '</p>' : '');
  questionRegion.classList.remove('question-transition');
  void questionRegion.offsetWidth;
  questionRegion.classList.add('question-transition');
  var questionStepKey = question.id + ':' + String(state.step + 1);
  if (!trackedQuestionSteps[questionStepKey]) {
    trackedQuestionSteps[questionStepKey] = true;
    trackEvent('quiz_step_viewed', { questionId: question.id, step: state.step + 1 });
  }
}

function render() {
  if (state.step >= QUESTIONS.length) {
    if (!catalogReady) {
      hero.hidden = true;
      wizard.hidden = true;
      trustStrip.hidden = true;
      seoContent.hidden = true;
      results.hidden = false;
      results.innerHTML = '<div class="catalog-loading" role="status" aria-live="polite"><span class="catalog-loading-mark" aria-hidden="true">✦</span><p>' + escapeHtml((currentCopy().results || {}).catalogLoading || 'Preparing your ideas…') + '</p></div>';
      ensureCatalog().then(function () {
        if (state.step >= QUESTIONS.length) renderResults();
      }).catch(function () {
        state.step = QUESTIONS.length - 1;
        hero.hidden = false;
        wizard.hidden = false;
        trustStrip.hidden = false;
        seoContent.hidden = false;
        results.hidden = true;
        renderQuestion();
      });
      return;
    }
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

function rawInterests(answers) {
  var value = answers && answers.interests;
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function selectedInterests(answers) {
  var interests = rawInterests(answers);
  return interests.indexOf('any') !== -1 ? [] : interests;
}

function hashString(value) {
  var hash = 2166136261;
  String(value).split('').forEach(function (character) { hash = Math.imul(hash ^ character.charCodeAt(0), 16777619); });
  return hash >>> 0;
}

var VARIETY_STORAGE_KEY = 'regalazo-variety-v4';
var GIFT_RECIPES = [{"id":"smart-fit","querySuffix":"regalo bien elegido","copy":{"es":"Apuesta afinada","en":"Fine-tuned pick","de":"Treffsichere Wahl","fr":"Choix bien ciblé","it":"Scelta mirata"},"reason":{"es":"La ruta segura: buscar una versión que encaje con lo que ya disfruta.","en":"The reliable route: look for a version that fits what they already enjoy.","de":"Der sichere Weg: eine Variante finden, die zu dem passt, was diese Person bereits mag.","fr":"La valeur sûre : chercher une version qui correspond à ce que cette personne aime déjà.","it":"La strada sicura: cercare una versione in linea con ciò che questa persona ama già."}},{"id":"personal-touch","querySuffix":"personalizable","copy":{"es":"Con un toque personal","en":"Personal touch","de":"Persönliche Note","fr":"Touche personnelle","it":"Tocco personale"},"reason":{"es":"Busca una variante personalizable para que una idea conocida se sienta hecha a medida.","en":"Look for a customisable version so a familiar idea feels made for them.","de":"Eine personalisierbare Variante macht aus einer bekannten Idee etwas Persönliches.","fr":"Une version personnalisable donne à une idée connue une vraie touche personnelle.","it":"Una versione personalizzabile rende personale anche un’idea già conosciuta."}},{"id":"make-a-plan","querySuffix":"plan experiencia","copy":{"es":"Hazlo un plan","en":"Turn it into a plan","de":"Als Erlebnis verschenken","fr":"À vivre ensemble","it":"Da vivere insieme"},"reason":{"es":"La clave es añadir un plan: que el regalo provoque algo que podáis hacer o disfrutar.","en":"The key is adding a plan: let the gift create something you can do or enjoy together.","de":"Der eigentliche Wert ist das Erlebnis: ein Geschenk, das ihr gemeinsam nutzen oder genießen könnt.","fr":"L’idée est d’en faire un moment à vivre : un cadeau qui crée une activité ou un plaisir partagé.","it":"Il punto è aggiungere un piano: un regalo che crea qualcosa da fare o vivere insieme."}},{"id":"gift-set","querySuffix":"set pack regalo","copy":{"es":"En formato pack","en":"Gift-set angle","de":"Als Geschenkset","fr":"En coffret","it":"In formato set"},"reason":{"es":"Un pack bien elegido multiplica la sensación de regalo y deja más de una forma de usarlo.","en":"A well-chosen set feels more gift-like and gives them more than one way to use it.","de":"Ein gut gewähltes Set wirkt besonders und bietet mehr als eine Möglichkeit, es zu nutzen.","fr":"Un coffret bien choisi renforce l’effet cadeau et offre plusieurs façons de l’utiliser.","it":"Un set scelto bene amplifica l’effetto regalo e offre più di un modo per usarlo."}},{"id":"fresh-twist","querySuffix":"regalo original diferente","copy":{"es":"Giro inesperado","en":"Unexpected twist","de":"Unerwarteter Dreh","fr":"Touche inattendue","it":"Svolta inaspettata"},"reason":{"es":"Cambiamos la ruta habitual por una versión más inesperada, sin alejarnos de sus gustos.","en":"We take a less obvious route without drifting away from what they like.","de":"Eine weniger offensichtliche Richtung, die trotzdem bei den Interessen dieser Person bleibt.","fr":"On sort du chemin évident sans s’éloigner de ce que cette personne aime.","it":"Una strada meno ovvia, ma sempre coerente con ciò che piace a questa persona."}},{"id":"new-find","querySuffix":"novedades tendencia regalo","copy":{"es":"Descubrimiento reciente","en":"Fresh discovery","de":"Neue Entdeckung","fr":"Nouvelle découverte","it":"Scoperta recente"},"reason":{"es":"Ponemos el foco en lo que acaba de aparecer o está ganando tracción en la búsqueda.","en":"We focus on items that are newly appearing or gaining traction in the search.","de":"Der Fokus liegt auf Dingen, die neu auftauchen oder in der Suche an Aufmerksamkeit gewinnen.","fr":"On privilégie ce qui apparaît récemment ou gagne en visibilité dans la recherche.","it":"Diamo priorità a ciò che compare da poco o sta guadagnando attenzione nella ricerca."}},{"id":"small-luxury","querySuffix":"premium calidad","copy":{"es":"Pequeño lujo","en":"Small luxury","de":"Kleiner Luxus","fr":"Petit luxe","it":"Piccolo lusso"},"reason":{"es":"Si el presupuesto lo permite, buscamos una versión con mejores materiales o más presencia.","en":"When the budget allows, look for a version with better materials or more presence.","de":"Wenn das Budget es erlaubt, suchen wir nach besseren Materialien und mehr Präsenz.","fr":"Quand le budget le permet, on cherche une version avec de meilleurs matériaux ou plus de présence.","it":"Se il budget lo permette, cerchiamo una versione con materiali migliori o più presenza."}}];

/*
 * These extra editorial angles expand the recommendation space without pretending
 * that they are new SKUs. Each angle changes the search intent and the explanation;
 * Amazon remains the source of truth for the concrete product, price and stock.
 */
GIFT_RECIPES = GIFT_RECIPES.concat([
  { id: 'value-pick', querySuffix: 'calidad precio regalo', copy: { es: 'Calidad sin pasarse', en: 'Good value', de: 'Gutes Preis-Leistungs-Verhältnis', fr: 'Bon rapport qualité-prix', it: 'Buon rapporto qualità-prezzo' }, reason: { es: 'Priorizamos una opción que se sienta bien elegida sin pagar de más.', en: 'Prioritise something that feels well chosen without overspending.', de: 'Eine gut gewählte Option, ohne unnötig viel auszugeben.', fr: 'Une option bien choisie sans dépasser inutilement le budget.', it: 'Un’opzione scelta bene senza spendere più del necessario.' } },
  { id: 'daily-upgrade', querySuffix: 'mejora uso diario regalo', copy: { es: 'Mejora el día a día', en: 'Everyday upgrade', de: 'Besser im Alltag', fr: 'Pour le quotidien', it: 'Migliora ogni giorno' }, reason: { es: 'Buscamos algo que tenga muchas oportunidades de ser usado de verdad.', en: 'Look for something with plenty of chances to be genuinely useful.', de: 'Etwas, das im Alltag wirklich oft genutzt werden kann.', fr: 'Quelque chose qui a de vraies chances d’être utilisé souvent.', it: 'Qualcosa che abbia molte occasioni per essere usato davvero.' } },
  { id: 'last-minute', querySuffix: 'regalo cumpleaños entrega rápida', copy: { es: 'Llega a tiempo', en: 'Ready in time', de: 'Rechtzeitig da', fr: 'À temps pour le jour J', it: 'In tempo per il giorno giusto' }, reason: { es: 'Una ruta práctica para cuando el cumpleaños está más cerca de lo previsto.', en: 'A practical route when the birthday is closer than expected.', de: 'Eine praktische Richtung, wenn der Geburtstag näher ist als gedacht.', fr: 'Une piste pratique quand l’anniversaire approche plus vite que prévu.', it: 'Una strada pratica quando il compleanno è più vicino del previsto.' } },
  { id: 'conversation-starter', querySuffix: 'regalo divertido original', copy: { es: 'Da pie a una historia', en: 'Starts a story', de: 'Sorgt für Gesprächsstoff', fr: 'Donne envie d’en parler', it: 'Fa nascere una storia' }, reason: { es: 'Elegimos algo con un pequeño giro que dé conversación al abrirlo.', en: 'Choose something with a small twist that sparks conversation when opened.', de: 'Ein kleiner Dreh, der beim Auspacken Gesprächsstoff liefert.', fr: 'Une petite surprise qui donne envie d’en parler dès l’ouverture.', it: 'Un piccolo tocco che fa nascere una conversazione quando si apre.' } },
  { id: 'understated', querySuffix: 'regalo minimalista elegante', copy: { es: 'Sorpresa discreta', en: 'Understated surprise', de: 'Dezente Überraschung', fr: 'Surprise discrète', it: 'Sorpresa discreta' }, reason: { es: 'Una alternativa con presencia, pero sin caer en algo estridente o difícil de usar.', en: 'A thoughtful alternative with presence, without becoming loud or hard to use.', de: 'Eine besondere, aber zurückhaltende Alternative, die leicht zu nutzen ist.', fr: 'Une alternative soignée, sans être voyante ni difficile à utiliser.', it: 'Un’alternativa curata, senza essere vistosa o difficile da usare.' } },
  { id: 'hobby-deep-dive', querySuffix: 'accesorio afición regalo', copy: { es: 'Para meterse más en su afición', en: 'Go deeper into their hobby', de: 'Für das liebste Hobby', fr: 'Pour aller plus loin dans sa passion', it: 'Per vivere ancora di più la sua passione' }, reason: { es: 'Partimos de algo que ya le gusta y buscamos una forma nueva de disfrutarlo.', en: 'Start from something they already enjoy and find a new way to enjoy it.', de: 'Aus einem bestehenden Interesse wird eine neue Art, es zu genießen.', fr: 'On part d’un intérêt existant pour trouver une nouvelle façon d’en profiter.', it: 'Partiamo da una passione che ha già per trovare un modo nuovo di viverla.' } },
  { id: 'small-delight', querySuffix: 'detalle bonito regalo cumpleaños', copy: { es: 'Pequeño detalle con intención', en: 'Small thoughtful detail', de: 'Kleine Aufmerksamkeit', fr: 'Petite attention', it: 'Piccola attenzione' }, reason: { es: 'Una idea sencilla que gana valor por el momento y por cómo se entrega.', en: 'A simple idea whose value comes from the moment and the way it is given.', de: 'Eine einfache Idee, die durch den Moment und die Übergabe gewinnt.', fr: 'Une idée simple qui prend de la valeur grâce au moment et à la façon de l’offrir.', it: 'Un’idea semplice che acquista valore grazie al momento e al modo in cui viene regalata.' } },
  { id: 'better-materials', querySuffix: 'mejores materiales regalo', copy: { es: 'Una versión que dure', en: 'Built to last', de: 'Für lange Freude', fr: 'Fait pour durer', it: 'Fatto per durare' }, reason: { es: 'La misma intuición, llevada a una versión que prioriza materiales y uso prolongado.', en: 'The same idea, steered towards a version that prioritises materials and longevity.', de: 'Dieselbe Idee, aber mit Fokus auf Material und lange Nutzung.', fr: 'La même idée, orientée vers une version plus durable et mieux finie.', it: 'La stessa idea, orientata verso una versione più durevole e meglio rifinita.' } },
  { id: 'modern-choice', querySuffix: 'regalo tendencia actual', copy: { es: 'Con un aire más actual', en: 'More current', de: 'Zeitgemäßer', fr: 'Plus actuel', it: 'Più attuale' }, reason: { es: 'Mantenemos el encaje, pero abrimos la búsqueda hacia diseños y formatos actuales.', en: 'Keep the fit while opening the search to current designs and formats.', de: 'Die Passung bleibt, aber Design und Format dürfen zeitgemäßer sein.', fr: 'On garde la pertinence en ouvrant la recherche aux formats actuels.', it: 'Manteniamo la pertinenza, cercando design e formati più attuali.' } },
  { id: 'surprise-safe', querySuffix: 'sorpresa segura regalo', copy: { es: 'Sorpresa con red', en: 'Safe surprise', de: 'Sichere Überraschung', fr: 'Surprise sans risque', it: 'Sorpresa senza rischi' }, reason: { es: 'Una vuelta distinta, pero dentro de una familia de productos fácil de entender.', en: 'A different direction, still within a product family that is easy to understand.', de: 'Eine andere Richtung, aber in einer verständlichen Produktfamilie.', fr: 'Une autre direction, mais dans une famille de produits facile à comprendre.', it: 'Una direzione diversa, ma all’interno di una categoria facile da capire.' } },
  { id: 'weekend-ritual', querySuffix: 'regalo para disfrutar fin de semana', copy: { es: 'Para disfrutar sin prisa', en: 'For unhurried weekends', de: 'Für entspannte Wochenenden', fr: 'Pour les week-ends tranquilles', it: 'Per weekend senza fretta' }, reason: { es: 'Una idea pensada para convertirse en un pequeño ritual fuera de la rutina.', en: 'An idea that can become a small ritual outside the daily routine.', de: 'Eine Idee, die außerhalb des Alltags zu einem kleinen Ritual werden kann.', fr: 'Une idée qui peut devenir un petit rituel loin de la routine.', it: 'Un’idea che può diventare un piccolo rituale fuori dalla routine.' } },
  { id: 'giftable-design', querySuffix: 'presentación bonita regalo', copy: { es: 'Entra por los ojos', en: 'Looks gift-worthy', de: 'Schön zum Verschenken', fr: 'Beau à offrir', it: 'Bello da regalare' }, reason: { es: 'Además de encajar, buscamos una opción que se sienta especial desde que se abre.', en: 'Beyond the fit, look for something that feels special from the moment it is opened.', de: 'Nicht nur passend, sondern schon beim Öffnen besonders.', fr: 'Au-delà de la pertinence, une option qui paraît spéciale dès l’ouverture.', it: 'Oltre alla pertinenza, un’opzione speciale già dal momento in cui si apre.' } }
]);

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

if (GIFT_CATALOG.length) COMPOSITION_COUNT = calculateCompositionCount() || COMPOSITION_COUNT;

function compositionCount() {
  return COMPOSITION_COUNT;
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

function baseIdForRecommendationId(id) {
  return String(id || '').split('::')[0];
}

function seenBaseIdsFor(answers) {
  var baseIds = {};
  seenIdsFor(answers).forEach(function (id) {
    baseIds[baseIdForRecommendationId(id)] = true;
  });
  return baseIds;
}

function seenCompositionIdsFor(answers) {
  var compositionIds = {};
  seenIdsFor(answers).forEach(function (id) {
    compositionIds[String(id)] = true;
  });
  return compositionIds;
}

function rememberRecommendations(answers, gifts) {
  if (!Array.isArray(gifts) || !gifts.length) return;
  var store = readVarietyStore();
  var key = profileKeyFor(answers);
  var ids = Array.isArray(store.profiles[key]) ? store.profiles[key].slice() : [];
  var knownIds = {};
  ids.forEach(function (id) { knownIds[String(id)] = true; });
  gifts.forEach(function (gift) {
    var baseId = gift && (gift.baseId || baseIdForRecommendationId(gift.id));
    var recommendationId = gift && (gift.id || baseId);
    if (recommendationId && !knownIds[String(recommendationId)]) {
      ids.push(String(recommendationId));
      knownIds[String(recommendationId)] = true;
    }
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
  var occasionSignal = !answers.occasion || answers.occasion === 'any' || gift.occasions.indexOf(answers.occasion) !== -1 ? 1 : 0.42;
  var styleSignal = !answers.style || answers.style === 'any' || gift.styles.indexOf(answers.style) !== -1 ? 1 : 0.42;
  var ageSignal = !answers.age || answers.age === 'unknown' ? 0.78 : (gift.ages.indexOf(answers.age) !== -1 ? 1 : 0.35);
  var genderSignal = 0.8;
  if (gift.genders && gift.genders.length && answers.gender) genderSignal = gift.genders.indexOf(answers.gender) !== -1 ? 1 : 0.3;
  return Math.round(relationSignal * 20 + interestSignal * 25 + budgetSignal * 20 + occasionSignal * 14 + styleSignal * 10 + ageSignal * 8 + genderSignal * 3);
}

function giftMatchRate(gift, answers) {
  var fit = giftFitScore(gift, answers);
  return Math.max(0, Math.min(100, Math.round(fit)));
}

var MATCH_RATE_LABELS = { es: 'Encaje estimado', en: 'Estimated fit', de: 'Geschätzte Passung', fr: 'Adéquation estimée', it: 'Corrispondenza stimata' };
var MATCH_RATE_DISCLOSURES = { es: 'El encaje es una estimación basada en tus respuestas; no es una puntuación de Amazon.', en: 'The fit is an estimate based on your answers; it is not an Amazon rating.', de: 'Die Passung ist eine Schätzung auf Basis deiner Antworten und keine Amazon-Bewertung.', fr: 'L’adéquation est une estimation basée sur vos réponses, pas une note Amazon.', it: 'La corrispondenza è una stima basata sulle tue risposte, non una valutazione Amazon.' };
function formatMatchRate(rate) { return String(rate) + '% · ' + (MATCH_RATE_LABELS[state.language] || MATCH_RATE_LABELS.es); }
function matchRateDisclosure() { return MATCH_RATE_DISCLOSURES[state.language] || MATCH_RATE_DISCLOSURES.es; }

function buildFitHighlights(gift, answers) {
  var copy = FIT_REASON_COPY[state.language] || FIT_REASON_COPY.es;
  var highlights = [];
  var budget = budgetFor(answers && answers.budget);
  var interests = selectedInterests(answers);
  var matches = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; });
  if (gift.price <= budget.max) highlights.push(copy.budget);
  if (matches.length) highlights.push(interpolate(copy.interest, { value: getLabel('interests', matches[0]) }));
  if (answers && answers.relation && answers.relation !== 'other' && gift.relations.indexOf(answers.relation) !== -1) highlights.push(interpolate(copy.relation, { value: getLabel('relation', answers.relation) }));
  if (answers && answers.style && answers.style !== 'any' && gift.styles.indexOf(answers.style) !== -1) highlights.push(interpolate(copy.style, { value: getLabel('style', answers.style) }));
  if (answers && answers.age && answers.age !== 'unknown' && gift.ages.indexOf(answers.age) !== -1) highlights.push(interpolate(copy.age, { value: getLabel('age', answers.age) }));
  if (answers && answers.occasion && answers.occasion !== 'any' && gift.occasions.indexOf(answers.occasion) !== -1) highlights.push(interpolate(copy.occasion, { value: getLabel('occasion', answers.occasion) }));
  if (!highlights.length) highlights.push(copy.open);
  return highlights.slice(0, 3);
}

function giftClusterKey(gift) {
  var stopWords = { regalo: true, gift: true, set: true, pack: true, kit: true, para: true, con: true, una: true, the: true, and: true, for: true, version: true, premium: true, portable: true, portatil: true, portátil: true, pequeño: true, pequena: true, pequeño: true, small: true };
  var text = String((gift && gift.title || '') + ' ' + (gift && gift.amazonQuery || '')).toLowerCase();
  var tokens = text.replace(/[^a-záéíóúüñ0-9]+/gi, ' ').split(/\s+/).filter(function (token) {
    return token.length >= 4 && !stopWords[token];
  });
  var unique = [];
  tokens.forEach(function (token) { if (unique.indexOf(token) === -1) unique.push(token); });
  return unique.slice(0, 3).sort().join('|') || String(gift && gift.category || 'other');
}

function isGiftAgeCompatible(gift, answers) {
  if (!answers || !answers.age || answers.age === 'unknown') return true;
  return !Array.isArray(gift.ages) || !gift.ages.length || gift.ages.indexOf(answers.age) !== -1;
}

function isGiftContextCompatible(gift, answers) {
  if (!isGiftAgeCompatible(gift, answers)) return false;
  if (!answers || !answers.relation || answers.relation === 'other') return true;
  return !Array.isArray(gift.relations) || !gift.relations.length || gift.relations.indexOf(answers.relation) !== -1;
}

function eligibleCatalogFor(answers) {
  var ageEligible = GIFT_CATALOG.filter(function (gift) { return isGiftAgeCompatible(gift, answers); });
  var contextEligible = ageEligible.filter(function (gift) { return isGiftContextCompatible(gift, answers); });
  var dismissed = state && Array.isArray(state.dismissedBaseIds) ? state.dismissedBaseIds : [];
  var available = contextEligible.filter(function (gift) { return dismissed.indexOf(gift.id) === -1; });
  if (available.length >= 10) return available;
  var ageAvailable = ageEligible.filter(function (gift) { return dismissed.indexOf(gift.id) === -1; });
  return ageAvailable.length ? ageAvailable : ageEligible;
}

function resolveRecommendationId(id, answers, variant) {
  var parts = String(id || '').split('::');
  var baseId = parts[0];
  var recipeId = parts[1] || 'smart-fit';
  var baseGift = GIFT_CATALOG.find(function (gift) { return gift.id === baseId; });
  var recipe = GIFT_RECIPES.find(function (item) { return item.id === recipeId; });
  if (!baseGift || !recipe || !isRecipeCompatible(baseGift, recipe) || !isGiftContextCompatible(baseGift, answers)) return null;
  return composeGift(baseGift, recipe, answers, variant);
}

function readSharedRecommendations(answers, variant) {
  try {
    var params = new URLSearchParams(window.location.search);
    var ids = (params.get('ideas') || '').split(',').filter(Boolean).slice(0, 10);
    if (ids.length !== 10) return null;
    var seen = {};
    var recommendations = [];
    ids.forEach(function (id) {
      var gift = resolveRecommendationId(id, answers, variant);
      var baseId = gift && (gift.baseId || gift.id);
      if (gift && !seen[baseId]) {
        recommendations.push(gift);
        seen[baseId] = true;
      }
    });
    return recommendations.length === 10 ? recommendations : null;
  } catch (error) {
    return null;
  }
}

function scoreGift(gift, answers, budget, interests, mode) {
  var score = (gift.editorialScore || 0) * 2;
  var overlap = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; }).length;
  score += Math.min(overlap * 8, 20);
  if (gift.price <= budget.max) score += 8;
  else if (gift.price <= budget.max * 1.15) score += 3;
  else if (gift.price <= budget.max * 1.4) score -= 1;
  else score -= 8;
  if (budget.max >= 150 && gift.price >= 80) score += 3;
  if (answers.style && answers.style !== 'any' && gift.styles.indexOf(answers.style) !== -1) score += 7;
  if (answers.relation && answers.relation !== 'other' && gift.relations.indexOf(answers.relation) !== -1) score += 6;
  if (!answers.age || answers.age === 'unknown' || gift.ages.indexOf(answers.age) !== -1) score += 4;
  if (!answers.occasion || answers.occasion === 'any' || gift.occasions.indexOf(answers.occasion) !== -1) score += 4;
  if (answers.relation === 'child' && gift.ages.indexOf('child') !== -1) score += 5;
  score += giftFitScore(gift, answers, budget, interests) * 0.12;
  score += recipeBoost(gift, mode, answers);
  return score;
}

function chooseDiverseGiftItems(items, limit) {
  var result = [];
  var categoryCounts = {};
  var baseCounts = {};
  var clusterCounts = {};
  [1, 2].forEach(function (maxPerCategory) {
    items.forEach(function (item) {
      if (result.length >= limit || result.indexOf(item) !== -1) return;
      var category = item.gift.category;
      var baseId = item.gift.baseId || item.gift.id;
      var cluster = item.cluster || giftClusterKey(item.gift);
      var count = categoryCounts[category] || 0;
      if (baseCounts[baseId] || clusterCounts[cluster] || count >= maxPerCategory) return;
      result.push(item);
      categoryCounts[category] = count + 1;
      baseCounts[baseId] = 1;
      clusterCounts[cluster] = 1;
    });
  });
  if (result.length < limit) {
    items.forEach(function (item) {
      var baseId = item.gift.baseId || item.gift.id;
      var cluster = item.cluster || giftClusterKey(item.gift);
      var clusterCount = clusterCounts[cluster] || 0;
      if (result.length < limit && result.indexOf(item) === -1 && !baseCounts[baseId] && clusterCount < 2) {
        result.push(item);
        baseCounts[baseId] = 1;
        clusterCounts[cluster] = clusterCount + 1;
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
  var seenBaseIds = seenBaseIdsFor(answers);
  var seenCompositionIds = seenCompositionIdsFor(answers);
  var recentIds = state && Array.isArray(state.lastRecommendationIds) ? state.lastRecommendationIds : [];
  var recentBaseIds = {};
  recentIds.forEach(function (id) { recentBaseIds[baseIdForRecommendationId(id)] = true; });
  var mode = state && state.recommendationMode || 'fit';
  var candidateItems = [];
  eligibleCatalogFor(answers).forEach(function (baseGift, index) {
    GIFT_RECIPES.forEach(function (recipe, recipeIndex) {
      if (!isRecipeCompatible(baseGift, recipe)) return;
      var gift = composeGift(baseGift, recipe, answers, variant);
      var baseScore = scoreGift(gift, answers, budget, interests, mode);
      var variety = (hashString(profileKey + '|' + String(variant) + '|' + gift.id) % 10000) / 10000;
      var baseId = gift.baseId || gift.id;
      var fresh = !seenBaseIds[baseId];
      // Keep the first pass broad across product families. Once all base
      // families have appeared, allow a new editorial angle of an old family
      // instead of recycling the exact same composition.
      var compositionFresh = !seenCompositionIds[gift.id] && !seenCompositionIds[baseId];
      var recent = !!recentBaseIds[baseId];
      var modeBoost = mode === 'new' && gift._isDiscovery ? 12 : 0;
      candidateItems.push({ gift: gift, baseId: baseId, cluster: giftClusterKey(gift), baseScore: baseScore, fresh: fresh, compositionFresh: compositionFresh, recent: recent, selectionScore: baseScore * 3 + variety * 14 + modeBoost, index: index * 10 + recipeIndex });
    });
  });
  candidateItems.sort(function (a, b) { return b.baseScore - a.baseScore || b.selectionScore - a.selectionScore || a.index - b.index; });
  var budgetRanked = candidateItems.filter(function (item) { return item.gift.price <= budget.max; });
  var ranked = budgetRanked.length ? budgetRanked : candidateItems;
  var topScore = ranked.length ? ranked[0].baseScore : 0;
  var freshStrong = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 12; });
  var freshGood = ranked.filter(function (item) { return item.fresh && item.baseScore >= topScore - 20; });
  var candidatePool = freshStrong.length >= 10 ? freshStrong : (freshGood.length >= 10 ? freshGood : freshGood.slice());
  var alreadyIncluded = candidatePool.map(function (item) { return item.baseId; });
  var seenGood = ranked.filter(function (item) {
    return !item.fresh && item.compositionFresh && item.baseScore >= topScore - 14 && alreadyIncluded.indexOf(item.baseId) === -1;
  });
  if (candidatePool.length < 10) {
    seenGood.forEach(function (item) {
      if (candidatePool.length < 24 && alreadyIncluded.indexOf(item.baseId) === -1) {
        candidatePool.push(item);
        alreadyIncluded.push(item.baseId);
      }
    });
  }
  if (candidatePool.length < 10) {
    ranked.filter(function (item) {
      return item.compositionFresh && item.baseScore >= topScore - 20;
    }).forEach(function (item) {
      if (candidatePool.length < 24 && alreadyIncluded.indexOf(item.baseId) === -1) {
        candidatePool.push(item);
        alreadyIncluded.push(item.baseId);
      }
    });
  }
  if (candidatePool.length < 10) {
    ranked.forEach(function (item) {
      if (candidatePool.length < 24 && alreadyIncluded.indexOf(item.baseId) === -1 && item.compositionFresh && item.baseScore >= topScore - 28) {
        candidatePool.push(item);
        alreadyIncluded.push(item.baseId);
      }
    });
  }
  candidatePool.forEach(function (item) {
    item.selectionScore += item.fresh ? 12 : 0;
    if (!item.fresh && item.compositionFresh) item.selectionScore += 8;
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
      if (selected.length < 10 && !selectedBases[baseId] && item.compositionFresh) {
        selected.push(item);
        selectedBases[baseId] = 1;
      }
    });
  }
  if (selected.length < 10) {
    var fallbackBases = {};
    selected.forEach(function (item) { fallbackBases[item.gift.baseId || item.gift.id] = 1; });
    ranked.forEach(function (item) {
      var baseId = item.gift.baseId || item.gift.id;
      if (selected.length < 10 && !fallbackBases[baseId]) {
        selected.push(item);
        fallbackBases[baseId] = 1;
      }
    });
  }
  return selected.slice(0, 10).map(function (item) { return item.gift; });
}

function amazonDomain(country) {
  return ({ ES: 'amazon.es', US: 'amazon.com', GB: 'amazon.co.uk', DE: 'amazon.de', FR: 'amazon.fr', IT: 'amazon.it', CA: 'amazon.ca' })[country] || 'amazon.com';
}

function affiliateTagFor(country) {
  var countryTag = APP_CONFIG.affiliateTags && APP_CONFIG.affiliateTags[country];
  // Never reuse an ID from another Amazon marketplace. A missing tag is
  // deliberately an honest, non-attributed link until that marketplace is
  // configured and verified.
  return countryTag || '';
}

function buildAmazonUrl(gift, answers) {
  var params = new URLSearchParams();
  params.set('k', gift.amazonQuery);
  params.set('high-price', String(budgetFor(answers.budget).max));
  var affiliateTag = affiliateTagFor(answers.country || APP_CONFIG.defaultCountry);
  if (affiliateTag) params.set('tag', affiliateTag);
  if (state && state.recommendationMode === 'new') {
    params.set('s', 'date-desc-rank');
    params.set('ref', 'sr_st_date-desc-rank');
  }
  return 'https://' + amazonDomain(answers.country || APP_CONFIG.defaultCountry) + '/s?' + params.toString();
}

function exactProductFor(gift, answers) {
  var product = gift && currentAmazonProducts[gift.id];
  if (!product || !product.detailPageURL) return null;
  try {
    var url = new URL(product.detailPageURL);
    var expectedHost = amazonDomain((answers && answers.country) || APP_CONFIG.defaultCountry);
    if (url.protocol !== 'https:' || (url.hostname !== expectedHost && url.hostname !== 'www.' + expectedHost)) return null;
  } catch (error) {
    return null;
  }
  return product;
}

function formatProductTime(value) {
  try {
    var date = new Date(value);
    if (!Number.isFinite(date.getTime())) return '';
    return new Intl.DateTimeFormat(state.language, { hour: '2-digit', minute: '2-digit' }).format(date);
  } catch (error) {
    return '';
  }
}

function productCountForCurrentResults() {
  return currentRecommendations.filter(function (gift) { return !!exactProductFor(gift, state.answers); }).length;
}

function canLoadAmazonProducts(answers) {
  return !!affiliateTagFor((answers && answers.country) || APP_CONFIG.defaultCountry);
}

function amazonProductStatusMarkup() {
  if (!canLoadAmazonProducts(state.answers) && productCountForCurrentResults() === 0) return '';
  var message = productCopy('loading');
  var statusClass = ' amazon-products-status-loading';
  if (amazonProductStatus === 'ready') {
    message = interpolate(productCopy(productCountForCurrentResults() === currentRecommendations.length ? 'ready' : 'mixedDisclosure'), { count: productCountForCurrentResults() });
    statusClass = ' amazon-products-status-ready';
  } else if (amazonProductStatus === 'unavailable') {
    message = productCopy('fallback');
    statusClass = ' amazon-products-status-fallback';
  }
  return '<p id="amazon-products-status" class="amazon-products-status' + statusClass + '" role="status" aria-live="polite">' + escapeHtml(message) + '</p>';
}

function updateAmazonProductStatus() {
  var status = document.getElementById('amazon-products-status');
  if (!status) return;
  var exactCount = productCountForCurrentResults();
  var message = productCopy('loading');
  if (amazonProductStatus === 'ready') {
    message = interpolate(productCopy(exactCount === currentRecommendations.length ? 'ready' : 'mixedDisclosure'), { count: exactCount });
  } else if (amazonProductStatus === 'unavailable') {
    message = productCopy('fallback');
  }
  status.textContent = message;
  status.className = 'amazon-products-status amazon-products-status-' + (amazonProductStatus === 'ready' ? 'ready' : amazonProductStatus === 'unavailable' ? 'fallback' : 'loading');
}

function hydrateAmazonProducts(recommendations) {
  if (!canLoadAmazonProducts(state.answers) || typeof fetch !== 'function') return;
  var items = (recommendations || currentRecommendations).filter(function (gift) {
    return gift && !exactProductFor(gift, state.answers) && !amazonProductPending[gift.id];
  });
  if (!items.length) return;
  var requestToken = amazonProductHydrationToken;
  var country = state.answers.country || APP_CONFIG.defaultCountry;
  items.forEach(function (gift) { amazonProductPending[gift.id] = true; });
  amazonProductStatus = 'loading';
  updateAmazonProductStatus();
  fetch('/api/amazon-products', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      country: country,
      queries: items.map(function (gift) {
        return { id: gift.id, query: gift.amazonQuery, maxPrice: budgetFor(state.answers.budget).max };
      })
    })
  }).then(function (response) {
    return response.json().catch(function () { return {}; }).then(function (payload) {
      return { ok: response.ok, payload: payload };
    });
  }).then(function (result) {
    items.forEach(function (gift) { delete amazonProductPending[gift.id]; });
    if (requestToken !== amazonProductHydrationToken || country !== (state.answers.country || APP_CONFIG.defaultCountry)) return;
    var payload = result.payload || {};
    if (!result.ok || !payload.ok || !Array.isArray(payload.products) || !payload.products.length) {
      amazonProductStatus = 'unavailable';
      updateAmazonProductStatus();
      return;
    }
    payload.products.forEach(function (product) {
      if (!product || !product.requestId || !currentRecommendations.some(function (gift) { return gift.id === product.requestId; })) return;
      currentAmazonProducts[product.requestId] = product;
    });
    amazonProductStatus = productCountForCurrentResults() ? 'ready' : 'unavailable';
    renderResults(false, true, getScrollPosition(), false);
  }).catch(function () {
    items.forEach(function (gift) { delete amazonProductPending[gift.id]; });
    if (requestToken !== amazonProductHydrationToken) return;
    amazonProductStatus = 'unavailable';
    updateAmazonProductStatus();
  });
}

function buildReason(gift, answers) {
  var interests = selectedInterests(answers);
  var matches = gift.interests.filter(function (interest) { return interests.indexOf(interest) !== -1; });
  var angleReason = gift._recipe && gift._recipe.reason ? recipeCopy(gift._recipe, 'reason') : '';
  var reason = angleReason ? angleReason + ' ' + gift.reason : gift.reason;
  if (matches.length) {
    var labels = matches.slice(0, 2).map(function (interest) { return getLabel('interests', interest).toLowerCase(); });
    var styleLabel = answers.style && answers.style !== 'any' ? getLabel('style', answers.style).toLowerCase() : '';
    return 'Conecta con ' + labels.join(' y ') + (styleLabel ? ' y mantiene un tono ' + styleLabel : '') + '. ' + reason;
  }
  return reason;
}

function summaryChips(answers) {
  var chips = [getLabel('relation', answers.relation), getLabel('gender', answers.gender), getLabel('age', answers.age), getLabel('occasion', answers.occasion), getLabel('budget', answers.budget), getLabel('style', answers.style), getLabel('country', answers.country)];
  rawInterests(answers).slice(0, 3).forEach(function (interest) { chips.push(getLabel('interests', interest)); });
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

function renderResults(shouldCelebrate, preserveRecommendations, preservePosition, requestProducts) {
  var savedPosition = preservePosition ? getScrollPosition() : null;
  var copy = currentCopy();
  renderWeeklyDiscovery();
  if (!preserveRecommendations || !currentRecommendations.length) {
    amazonProductHydrationToken += 1;
    currentAmazonProducts = Object.create(null);
    amazonProductPending = Object.create(null);
    amazonProductStatus = 'idle';
    trackedGiftImpressions = Object.create(null);
    currentRecommendations = sharedRecommendations || rankGifts(state.answers, state.variant);
    sharedRecommendations = null;
    state.lastRecommendationIds = currentRecommendations.map(function (gift) { return gift.id; });
    rememberRecommendations(state.answers, currentRecommendations);
    trackEvent('recommendations_viewed', { resultCount: currentRecommendations.length, variant: state.variant, mode: state.recommendationMode || 'fit' });
    trackEvent('quiz_completed', {
      genderProvided: !!state.answers.gender && ['any', 'unknown', 'prefer-not'].indexOf(state.answers.gender) === -1,
      interestCount: selectedInterests(state.answers).length
    });
    quizExitTracked = true;
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
    amazonProductStatusMarkup() +
    '<div class="summary-chips" aria-label="' + escapeHtml(copy.results.chips) + '">' + summaryChips(state.answers) + '</div>' +
    '</div>' +
    '<div class="results-toolbar"><button class="button button-ghost" type="button" data-action="adjust">' + escapeHtml(copy.results.adjust) + '</button><button class="button button-ghost" type="button" data-action="refresh">' + escapeHtml(copy.results.refresh) + '</button></div>' +
    '<aside class="results-share-card" aria-labelledby="share-card-title"><div class="share-card-copy"><span class="share-card-icon" aria-hidden="true">↗</span><div><strong id="share-card-title">' + escapeHtml(copy.results.shareCardTitle || copy.results.share) + '</strong><p>' + escapeHtml(copy.results.shareCardText || copy.results.shareText) + '</p></div></div><div class="share-card-actions"><button class="button button-primary" type="button" data-action="share">' + escapeHtml(copy.results.share) + '</button><button class="button button-ghost share-card-download" type="button" data-action="download-share-card">' + escapeHtml(shareActionCopy('download')) + '</button></div></aside>' +
    '<div class="gift-list">' + currentRecommendations.map(function (gift, index) {
      var localized = localizedGift(gift);
      var exactProduct = exactProductFor(gift, state.answers);
      var displayTitle = exactProduct ? exactProduct.title : localized.title;
      var tags = localized.tags.map(function (tag) { return '<span class="gift-tag">' + escapeHtml(tag) + '</span>'; }).join('');
      var discovery = activeMode === 'new' || localized.isDiscovery;
      var cardClass = 'gift-card' + (index === 0 ? ' gift-card-featured' : '') + (discovery ? ' gift-card-discovery' : '');
      var angle = localized.angle ? '<p class="gift-angle"><span class="gift-angle-mark" aria-hidden="true">✦</span>' + escapeHtml(localized.angle) + (discovery ? ' <span class="gift-new-badge">' + escapeHtml(copy.results.newBadge) + '</span>' : '') + '</p>' : '';
      var highlights = buildFitHighlights(gift, state.answers).map(function (item) { return '<span class="gift-fit-highlight">' + escapeHtml(item) + '</span>'; }).join('');
      var purchaseTip = buildPurchaseTip(gift);
      var avoidTip = buildAvoidTip(gift);
      var productMedia = exactProduct && exactProduct.imageUrl ? '<div class="gift-product-media"><img src="' + escapeHtml(exactProduct.imageUrl) + '" alt="" loading="lazy" decoding="async"' + (index === 0 ? ' fetchpriority="high"' : '') + (exactProduct.imageWidth ? ' width="' + String(exactProduct.imageWidth) + '"' : '') + (exactProduct.imageHeight ? ' height="' + String(exactProduct.imageHeight) + '"' : '') + '><span class="gift-product-badge">' + escapeHtml(productCopy('badge')) + '</span></div>' : '';
      var priceText = exactProduct ? exactProduct.priceDisplay + ' · ' + productCopy('price') : interpolate(copy.results.price, { price: gift.price });
      var updatedTime = exactProduct ? formatProductTime(exactProduct.refreshedAt) : '';
      var updatedMarkup = updatedTime ? '<span class="gift-price-updated">' + escapeHtml(interpolate(productCopy('updated'), { time: updatedTime })) + '</span>' : '';
      var primaryUrl = exactProduct ? exactProduct.detailPageURL : buildAmazonUrl(gift, state.answers);
      var primaryLabel = exactProduct ? productCopy('direct') : copy.results.link;
      var similarLink = exactProduct ? '<a class="gift-similar-link" href="' + escapeHtml(buildAmazonUrl(gift, state.answers)) + '" target="_blank" rel="sponsored nofollow noopener" data-gift-id="' + escapeHtml(gift.id) + '" data-gift-position="' + String(index + 1) + '" data-gift-store="' + escapeHtml(amazonDomain(state.answers.country || APP_CONFIG.defaultCountry)) + '" data-gift-link-type="similar">' + escapeHtml(productCopy('similar')) + ' <span aria-hidden="true">↗</span></a>' : '';
      return '<article class="' + cardClass + '" data-gift-card-id="' + escapeHtml(gift.id) + '" data-gift-card-position="' + String(index + 1) + '" style="--gift-index: ' + index + ';">' +
        (index === 0 ? '<p class="gift-badge">' + escapeHtml(copy.results.badge) + '</p>' : '') +
        '<div class="gift-card-top"><span class="gift-number">' + String(index + 1).padStart(2, '0') + '</span><span class="gift-icon" aria-hidden="true">' + gift.icon + '</span></div>' +
        productMedia + '<h3>' + escapeHtml(displayTitle) + '</h3><p class="gift-price">' + escapeHtml(priceText) + '</p>' + updatedMarkup + angle +
        '<div class="gift-match" aria-label="' + escapeHtml(formatMatchRate(giftMatchRate(gift, state.answers))) + '"><span class="gift-match-label">' + escapeHtml(formatMatchRate(giftMatchRate(gift, state.answers))) + '</span><span class="gift-match-track" aria-hidden="true"><span class="gift-match-fill" style="width: ' + String(giftMatchRate(gift, state.answers)) + '%;"></span></span></div>' +
        '<div class="gift-fit-highlights" aria-label="' + escapeHtml((FIT_REASON_COPY[state.language] || FIT_REASON_COPY.es).open) + '">' + highlights + '</div>' +
        '<p class="gift-reason">' + escapeHtml(buildReason(gift, state.answers)) + '</p>' +
        '<p class="gift-buying-tip"><strong>' + escapeHtml(purchaseTip.label) + ':</strong> ' + escapeHtml(purchaseTip.text) + '</p>' +
        '<p class="gift-avoid-tip"><strong>' + escapeHtml(avoidTip.label) + ':</strong> ' + escapeHtml(avoidTip.text) + '</p>' +
        '<div class="gift-tags">' + tags + '</div>' +
        '<div class="gift-card-actions"><a class="gift-link" href="' + escapeHtml(primaryUrl) + '" target="_blank" rel="sponsored nofollow noopener" data-gift-id="' + escapeHtml(gift.id) + '" data-gift-position="' + String(index + 1) + '" data-gift-store="' + escapeHtml(amazonDomain(state.answers.country || APP_CONFIG.defaultCountry)) + '" data-gift-link-type="product">' + escapeHtml(primaryLabel) + ' <span aria-hidden="true">↗</span></a>' + similarLink + '<div class="gift-feedback"><button class="gift-feedback-button" type="button" data-action="feedback" data-feedback="owned" data-gift-id="' + escapeHtml(gift.id) + '">' + escapeHtml(copy.results.owned) + '</button><button class="gift-feedback-button" type="button" data-action="feedback" data-feedback="not-fit" data-gift-id="' + escapeHtml(gift.id) + '">' + escapeHtml(copy.results.notFit) + '</button></div></div></article>';
    }).join('') + '</div>' +
    '<p class="results-note">' + escapeHtml((productCountForCurrentResults() ? (productCountForCurrentResults() === currentRecommendations.length ? productCopy('exactDisclosure') : productCopy('mixedDisclosure')) : copy.results.note) + ' ' + matchRateDisclosure()) + ' ' + escapeHtml(catalogNote()) + '</p>' + (currentRecommendations.length < 10 ? '<p class="results-exhaustion">' + escapeHtml(copy.results.noMore) + '</p>' : '');
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
  if (requestProducts !== false && !preserveRecommendations) hydrateAmazonProducts(currentRecommendations);
  trackGiftImpressions();
}

function trackGiftImpressions() {
  if (!results || !window.IntersectionObserver) {
    if (results) Array.prototype.slice.call(results.querySelectorAll('[data-gift-card-id]'), 0, 3).forEach(trackGiftImpression);
    return;
  }
  if (giftImpressionObserver) giftImpressionObserver.disconnect();
  giftImpressionObserver = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      trackGiftImpression(entry.target);
      giftImpressionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  Array.prototype.forEach.call(results.querySelectorAll('[data-gift-card-id]'), function (card) {
    giftImpressionObserver.observe(card);
  });
}

function trackGiftImpression(card) {
  if (!card) return;
  var giftId = card.getAttribute('data-gift-card-id');
  if (!giftId || trackedGiftImpressions[giftId]) return;
  trackedGiftImpressions[giftId] = true;
  trackEvent('gift_impression', { giftId: giftId, position: Number(card.getAttribute('data-gift-card-position')) || null });
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
      ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country', 'interests', 'mode', 'v', 'ideas', 'utm_source', 'utm_medium', 'utm_campaign'].forEach(function (key) { resetUrl.searchParams.delete(key); });
      window.history.replaceState({}, '', resetUrl.pathname + (resetUrl.search ? resetUrl.search : '') + resetUrl.hash);
    }
  } catch (error) {}
  state = { step: 0, variant: Math.floor(Math.random() * 1000000), lastRecommendationIds: [], language: state.language, recommendationMode: 'fit', analyticsStarted: false, answers: { interests: [] } };
  trackedQuestionSteps = Object.create(null);
  trackedGiftImpressions = Object.create(null);
  if (giftImpressionObserver) {
    giftImpressionObserver.disconnect();
    giftImpressionObserver = null;
  }
  quizExitTracked = false;
  amazonProductHydrationToken += 1;
  currentRecommendations = [];
  currentAmazonProducts = Object.create(null);
  amazonProductPending = Object.create(null);
  amazonProductStatus = 'idle';
  applyLanguage();
  hero.hidden = false;
  wizard.hidden = false;
  trustStrip.hidden = false;
  seoContent.hidden = false;
  results.hidden = true;
  render();
}

function recordClick(giftId, position, linkType) {
  var country = state.answers.country || APP_CONFIG.defaultCountry;
  var store = amazonDomain(country);
  var safeLinkType = linkType === 'similar' ? 'similar' : 'product';
  var consent = window.RegalazoAnalyticsCore ? window.RegalazoAnalyticsCore.getConsent() : analyticsConsentState;
  if (consent === 'granted') {
    try {
      var clicks = JSON.parse(localStorage.getItem(APP_CONFIG.clickStorageKey) || '[]');
      clicks.push({ id: giftId, position: position ? Number(position) : null, at: new Date().toISOString(), store: store, linkType: safeLinkType });
      localStorage.setItem(APP_CONFIG.clickStorageKey, JSON.stringify(clicks.slice(-100)));
    } catch (error) {
      // Private browsing or blocked storage should never stop an outbound link.
    }
  }
  trackEvent('gift_outbound_clicked', { giftId: giftId, position: position ? Number(position) : null, store: store, mode: state.recommendationMode || 'fit', linkType: safeLinkType });
}

function buildShareUrl() {
  var params = new URLSearchParams();
  params.set('r', '1');
  ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country'].forEach(function (key) {
    if (state.answers[key]) params.set(key, state.answers[key]);
  });
  params.set('interests', rawInterests(state.answers).join(','));
  params.set('v', String(state.variant));
  if (currentRecommendations.length === 10) params.set('ideas', currentRecommendations.map(function (gift) { return gift.id; }).join(','));
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
    if (answers.relation === 'partner' && answers.age === 'child') return null;
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

function roundedCanvasRect(context, x, y, width, height, radius) {
  var r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function canvasTextLines(context, value, maxWidth, maxLines) {
  var words = String(value || '').split(/\s+/).filter(Boolean);
  var lines = [];
  var line = '';
  words.forEach(function (word) {
    var candidate = line ? line + ' ' + word : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    var last = lines[maxLines - 1] || '';
    while (last && context.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
    lines[maxLines - 1] = last.replace(/\s+$/, '') + '…';
  }
  return lines;
}

function drawCanvasLines(context, value, x, y, maxWidth, lineHeight, maxLines) {
  var lines = canvasTextLines(context, value, maxWidth, maxLines);
  lines.forEach(function (line, index) { context.fillText(line, x, y + index * lineHeight); });
  return y + lines.length * lineHeight;
}

function buildShareCardBlob() {
  return new Promise(function (resolve, reject) {
    if (!document || !document.createElement || typeof URL === 'undefined') {
      reject(new Error('share_card_unavailable'));
      return;
    }
    var canvas = document.createElement('canvas');
    if (!canvas || typeof canvas.getContext !== 'function' || typeof canvas.toBlob !== 'function') {
      reject(new Error('share_card_unavailable'));
      return;
    }
    canvas.width = 1200;
    canvas.height = 1500;
    var context = canvas.getContext('2d');
    if (!context) {
      reject(new Error('share_card_unavailable'));
      return;
    }
    var background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, '#fff9f2');
    background.addColorStop(0.58, '#fff0eb');
    background.addColorStop(1, '#eee9f8');
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#e46c57';
    context.beginPath();
    context.arc(1060, 150, 88, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 0.18;
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(1060, 150, 48, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;

    context.fillStyle = '#b64b3c';
    context.font = '800 28px Arial, sans-serif';
    context.letterSpacing = '4px';
    context.fillText('REGALAZO', 86, 108);
    context.letterSpacing = '0px';
    context.fillStyle = '#29241f';
    context.font = '800 74px Arial, sans-serif';
    var titleBottom = drawCanvasLines(context, '10 ideas de regalo', 86, 230, 880, 82, 2);
    context.fillStyle = '#756d65';
    context.font = '400 31px Arial, sans-serif';
    var introBottom = drawCanvasLines(context, 'Una selección pensada para encontrar algo que encaje de verdad.', 86, titleBottom + 42, 820, 45, 2);

    var labels = [];
    ['relation', 'occasion', 'budget'].forEach(function (key) {
      if (state.answers && state.answers[key]) labels.push(getLabel(key, state.answers[key]));
    });
    if (labels.length) {
      var labelX = 86;
      var labelY = introBottom + 40;
      context.font = '700 24px Arial, sans-serif';
      labels.forEach(function (label) {
        var width = context.measureText(label).width + 38;
        roundedCanvasRect(context, labelX, labelY - 30, width, 46, 23);
        context.fillStyle = '#dfe9dc';
        context.fill();
        context.fillStyle = '#5f5147';
        context.fillText(label, labelX + 19, labelY);
        labelX += width + 14;
      });
    }

    var cardY = Math.max(introBottom + 132, 470);
    var cardWidth = 1028;
    var cardHeight = 220;
    currentRecommendations.slice(0, 3).forEach(function (gift, index) {
      var y = cardY + index * (cardHeight + 24);
      roundedCanvasRect(context, 86, y, cardWidth, cardHeight, 28);
      context.fillStyle = '#ffffff';
      context.globalAlpha = 0.83;
      context.fill();
      context.globalAlpha = 1;
      context.fillStyle = '#e46c57';
      context.font = '800 28px Arial, sans-serif';
      context.fillText(String(index + 1).padStart(2, '0'), 122, y + 60);
      context.fillStyle = '#29241f';
      context.font = '800 37px Arial, sans-serif';
      drawCanvasLines(context, localizedGift(gift).title, 220, y + 64, 820, 44, 2);
      context.fillStyle = '#b64b3c';
      context.font = '700 25px Arial, sans-serif';
      context.fillText('Mejor encaje', 220, y + 145);
      context.fillStyle = '#756d65';
      context.font = '400 23px Arial, sans-serif';
      context.fillText('regalazo.xyz', 220, y + 183);
    });

    context.fillStyle = '#29241f';
    context.font = '800 34px Arial, sans-serif';
    context.fillText('Encuentra el tuyo en regalazo.xyz', 86, 1395);
    context.fillStyle = '#756d65';
    context.font = '400 22px Arial, sans-serif';
    context.fillText('Gratis · sin cuenta · en 8 toques', 86, 1438);
    context.fillStyle = '#b64b3c';
    context.font = '800 28px Arial, sans-serif';
    context.fillText('🎁', 1030, 1438);
    canvas.toBlob(function (blob) {
      if (!blob) {
        reject(new Error('share_card_unavailable'));
        return;
      }
      trackEvent('share_card_created', { ideaCount: currentRecommendations.length });
      resolve(blob);
    }, 'image/png');
  });
}

function copyShareUrl(url, copy) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      showToast(copy.messages.copied);
      trackEvent('share_completed', { method: 'clipboard', mode: state.recommendationMode || 'fit' });
    }).catch(function () { showToast(copy.messages.copyHint); });
  } else {
    showToast(copy.messages.copyHint);
  }
}

function downloadShareCard() {
  var copy = currentCopy();
  buildShareCardBlob().then(function (blob) {
    var objectUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = objectUrl;
    link.download = 'regalazo-seleccion.png';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
    trackEvent('share_card_downloaded', { ideaCount: currentRecommendations.length });
    showToast(shareActionCopy('saved'));
  }).catch(function () { showToast(shareActionCopy('unavailable')); });
}

function shareSelection() {
  var copy = currentCopy();
  var url = buildShareUrl();
  trackEvent('share_clicked', { mode: state.recommendationMode || 'fit', ideaCount: currentRecommendations.length });
  var shareData = { title: copy.results.share, text: buildShareMessage(), url: url };
  var canShareFiles = false;
  if (navigator.share && typeof navigator.canShare === 'function' && typeof File !== 'undefined') {
    try { canShareFiles = navigator.canShare({ files: [new File([''], 'regalazo-test.png', { type: 'image/png' })] }); } catch (error) { canShareFiles = false; }
  }
  if (navigator.share && canShareFiles) {
    buildShareCardBlob().then(function (blob) {
      var file = new File([blob], 'regalazo-seleccion.png', { type: 'image/png' });
      return navigator.share(Object.assign({}, shareData, { files: [file] }));
    }).then(function () {
      trackEvent('share_completed', { method: 'native-image', mode: state.recommendationMode || 'fit' });
    }).catch(function (error) {
      if (error && error.name === 'AbortError') return;
      navigator.share(shareData).then(function () {
        trackEvent('share_completed', { method: 'native', mode: state.recommendationMode || 'fit' });
      }).catch(function () {});
    });
    return;
  }
  if (navigator.share) {
    navigator.share(shareData).then(function () {
      trackEvent('share_completed', { method: 'native', mode: state.recommendationMode || 'fit' });
    }).catch(function () {});
    return;
  }
  copyShareUrl(url, copy);
}

function findReplacementGift(giftId) {
  var currentBaseIds = {};
  currentRecommendations.forEach(function (gift) {
    currentBaseIds[gift.baseId || baseIdForRecommendationId(gift.id)] = true;
  });
  var candidates = rankGifts(state.answers, state.variant + 1);
  return candidates.find(function (gift) {
    var baseId = gift.baseId || baseIdForRecommendationId(gift.id);
    return baseId !== baseIdForRecommendationId(giftId) && !currentBaseIds[baseId];
  }) || null;
}

function replaceGift(giftId, feedback) {
  var baseId = baseIdForRecommendationId(giftId);
  if (!baseId) return;
  if (!Array.isArray(state.dismissedBaseIds)) state.dismissedBaseIds = [];
  if (state.dismissedBaseIds.indexOf(baseId) === -1) state.dismissedBaseIds.push(baseId);
  trackEvent('gift_feedback', { giftId: giftId, feedback: feedback });
  var replacement = findReplacementGift(giftId);
  if (!replacement) {
    showToast((currentCopy().results || {}).noMore || FEEDBACK_COPY.es.noMore);
    return;
  }
  state.variant += 1;
  currentRecommendations = currentRecommendations.map(function (gift) {
    return gift.id === giftId ? replacement : gift;
  });
  state.lastRecommendationIds = currentRecommendations.map(function (gift) { return gift.id; });
  rememberRecommendations(state.answers, currentRecommendations);
  trackEvent('recommendations_refreshed', { variant: state.variant, mode: state.recommendationMode || 'fit' });
  renderResults(false, true, getScrollPosition());
  hydrateAmazonProducts([replacement]);
  showToast((currentCopy().results || {}).saved || FEEDBACK_COPY.es.saved);
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
    if (actionName === 'download-share-card') downloadShareCard();
    if (actionName === 'feedback') replaceGift(action.getAttribute('data-gift-id'), action.getAttribute('data-feedback'));
    return;
  }
  var link = event.target.closest('[data-gift-id]');
  if (link) recordClick(link.getAttribute('data-gift-id'), link.getAttribute('data-gift-position'), link.getAttribute('data-gift-link-type'));
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
    var link = event.target.closest('a');
    if (link) trackEvent('weekly_discovery_clicked', { giftId: link.getAttribute('data-gift-id'), store: amazonDomain(state.answers.country || APP_CONFIG.defaultCountry), linkType: link.getAttribute('data-discovery-link-type') || 'similar' });
  });
}

function trackQuizAbandonment() {
  if (quizExitTracked || !state.analyticsStarted || state.step >= QUESTIONS.length) return;
  quizExitTracked = true;
  var question = QUESTIONS[state.step];
  trackEvent('quiz_abandoned', { questionId: question ? question.id : 'unknown', step: state.step + 1 });
}

window.addEventListener('pagehide', trackQuizAbandonment);

if (!window.RegalazoAnalyticsCore && analyticsConsentAcceptButton && !analyticsConsentAcceptButton.dataset.analyticsBound) {
  analyticsConsentAcceptButton.dataset.analyticsBound = 'true';
  analyticsConsentAcceptButton.addEventListener('click', function () {
    setAnalyticsConsent('granted');
  });
}

if (!window.RegalazoAnalyticsCore && analyticsConsentRejectButton && !analyticsConsentRejectButton.dataset.analyticsBound) {
  analyticsConsentRejectButton.dataset.analyticsBound = 'true';
  analyticsConsentRejectButton.addEventListener('click', function () {
    setAnalyticsConsent('denied');
  });
}

if (!window.RegalazoAnalyticsCore && analyticsPreferencesButton && !analyticsPreferencesButton.dataset.analyticsBound) {
  analyticsPreferencesButton.dataset.analyticsBound = 'true';
  analyticsPreferencesButton.addEventListener('click', openAnalyticsPreferences);
}

var sharedAnswers = readSharedAnswers();
if (sharedAnswers) {
  state.answers = sharedAnswers;
  state.step = QUESTIONS.length;
  state.recommendationMode = 'fit';
  state.variant = readSharedVariant();
}

registerPwa();
applyLanguage();
if (sharedAnswers) {
  render();
  ensureCatalog().then(function () {
    sharedRecommendations = readSharedRecommendations(sharedAnswers, state.variant);
    trackEvent('shared_result_opened', { mode: state.recommendationMode });
    render();
  }).catch(function () {});
} else {
  render();
  scheduleCatalogWarmup();
}
if (analyticsConsentState === 'granted') loadMixpanel();
else if (!analyticsConsentState) showAnalyticsConsent();
