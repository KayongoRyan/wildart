"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "fr" | "es";

export const translations = {
  en: {
    nav: {
      studio:     "The Studio",
      wild:       "The Wild",
      tuzivugire: "Tuzivugire",
      commission: "Commission",
      shop:       "Shop",
    },
    hero: {
      headline: "Welcome to Africa's best wildlife with a contemporary art.",
      subtitle: "Original graphite and charcoal wildlife art by three Rwandan artists living minutes from Volcanoes National Park.",
      cta:      "Book",
      viewAll:  "View all works",
    },
    intro: {
      label:    "The Studio",
      headline: "Open the studio door and step into the wild",
      body1:    "A place apart from the world, where the silence of dawn in the bamboo zone speaks louder than any city. Here, in Musanze, Rwanda — three artists press graphite and charcoal to paper and pull the living forest onto the page.",
      body2:    "SAWA draws the wild not from photographs, but from what we see at dawn — the silverback's exhale in cold mountain air, the matriarch's tracks still wet beside the watering hole. Every line is earned in the field.",
    },
    collection: {
      label: "The Collection",
      tabs: {
        gorillas:  "Gorillas",
        elephants: "Elephants",
        bigcats:   "Big Cats",
        eagles:    "Eagles",
      },
      bodies: {
        gorillas:  "The mountain gorilla lives only here — in the Virungas, a chain of volcanoes straddling Rwanda, Uganda and DRC. Christine draws them from habituation zones she has visited since childhood. The silverback carries the whole group's story in his posture. She has learned to read it.",
        elephants: "Josue spent years as a ranger guide in Akagera National Park before he picked up a pen. His elephants move across the paper with the slow confidence of animals who remember every waterhole for a hundred kilometres. Memory is his subject.",
        bigcats:   "Rigobert works in deep shadow. His charcoal technique — pressing hard on rough paper, lifting with an eraser — gives his big cats a cinematic quality: half-emerged from darkness, as they always are in the real savannah. Fear is not the point. Awe is.",
        eagles:    "The crowned eagle is Africa's most powerful aerial predator. Rigobert draws it in mixed media — ink underline, charcoal shadow — catching the moment just before the stoop, when the world below the raptor narrows to a single point of focus.",
      },
    },
    place: {
      label:    "Essence of Place",
      title:    "Musanze, Rwanda",
      stats:    ["to Volcanoes National Park", "drive to Kigali", "altitude · Musanze"],
      body1:    "Musanze sits at the foot of the Virunga Massif in Rwanda's Northern Province. At this altitude, mornings are cold and clear. The forest line begins at the edge of town. Mountain gorillas are not a myth here — they are a fact of life, visible on the hillsides above the market.",
      body2:    "Breathe in the altitude and the mist. Do you feel the stillness? Don't look away. As the gorilla group moves through the bamboo, every moment shifts — a glance, a sound, a play-charge that becomes a yawn. Set your attention and hold it.",
      body3:    "Easy reach of the park that belongs, in some sense, to all of us. A landscape of velvet green that belongs only to those willing to climb for it.",
    },
    artists: {
      label:    "The Artists",
      headline: "Three artists. One forest. Infinite subjects.",
      since:    "Since",
    },
    works: {
      label:    "The Works",
      headline: "Selected originals",
      filters:  ["All", "Graphite", "Charcoal", "Ink", "Mixed Media"],
      viewAll:  "View full gallery",
    },
    wild: {
      label:    "Lightness of Observation",
      headline: "The Wild",
      body1:    "Here, the wild is not a destination. It is a neighbour. The Virunga volcanoes rise above Musanze at night. In the morning, the forest mist rolls down into the streets. Every artwork begins before the pen touches paper — it begins with hours of watching.",
      body2:    "Immerse yourself in the intimacy of the wild. Not a safari — a study. Not a photograph — a conversation between the artist and the animal, conducted in silence and graphite dust.",
      body3:    "Acacia groves and bamboo slopes, savannah at dusk and high-altitude frost. Rwanda holds three of Africa's distinct ecosystems within two hours of Musanze. Our artists move through all of them.",
      ecosystems: [
        { label: "Virunga Volcanoes", desc: "Mountain gorilla habitat. The artists visit habituation groups three times weekly." },
        { label: "Akagera Savannah",  desc: "Home to elephant, lion, hippo and buffalo. Three-hour drive east of Musanze." },
        { label: "Nyungwe Forest",    desc: "Canopy walks above the oldest rainforest in Central Africa. Eagles, chimps, colobus." },
      ],
    },
    process: {
      label:    "Materials & Process",
      headline: "How we draw the wild",
      body1:    "Our tools are chosen with a precise understanding of the animal and the light. Each material was tested in the field before it was accepted into the studio. Time, observation, and repetition — this is how the wild is translated to paper.",
      body2:    "The three artists at SAWA work together with deliberate attention to material and duration — time that will soon become history, a story of habitat observed and documented with fidelity. Natural graphite, warm charcoal, aged ink, and textured heavy paper. This is how we create a visual and tactile record of animals that may not exist in the same numbers a generation from now.",
      quote:    "Muted observation, patient stillness, smooth lines. The discipline of looking is the new luxury.",
      materials: [
        { name: "Graphite",  grade: "H2 → 8B",    desc: "The foundation. Christine grades each pencil before a session, selecting hardness by animal — H4 for elephant hide, 6B for gorilla fur." },
        { name: "Charcoal",  grade: "Compressed",  desc: "Rigobert favours compressed over vine for his big cats. The density allows for deep, velvety shadows that no graphite can match." },
        { name: "Ink",       grade: "Carbon",      desc: "Josue uses Japanese carbon ink for his elephant studies — permanent, deep, with a slight sheen that catches light on thick paper." },
        { name: "Paper",     grade: "200–300 gsm", desc: "Fabriano Artistico 300gsm cold-press. Heavy enough to take abuse. The tooth holds graphite dust the way high-altitude moss holds mist." },
        { name: "Blending",  grade: "Tortillon",   desc: "Hand-rolled paper stumps, not fingers. Fingerprints leave oil. The tortillon leaves nothing but smoothness." },
        { name: "Erasers",   grade: "Kneaded",     desc: "The kneaded eraser is a drawing tool as much as a correction tool — used to lift graphite into highlights, to suggest the whites of eyes." },
      ],
    },
    cta: {
      commissionLabel:  "Commission a Piece",
      commissionH2:     "Your encounter.\nOur graphite.",
      commissionBody:   "Tell us about the animal you saw — where, when, what it was doing. We will translate that memory into a work you can live with for a lifetime.",
      steps:            ["Describe your wildlife encounter", "Choose your size and medium", "Receive a unique original work"],
      commissionCta:    "Begin your commission →",
      circleLabel:      "Join the Collector's Circle",
      circleH3:         "First to know.\nFirst to collect.",
      circleBody:       "34 collectors across 18 countries receive early access to new works, studio stories from Musanze, and Tuzivugire program updates before anyone else.",
      circleWelcome:    "Welcome to the circle.",
      emailPlaceholder: "Your email",
      joinBtn:          "Join",
      perks:            ["First access", "Commission priority", "Tuzivugire reports"],
    },
    footer: {
      explore:    "Explore",
      services:   "Services",
      kinyarwanda:"In Kinyarwanda",
      copyright:  "© 2025 SAWA · Studio of African Wildlife Art",
      madeIn:     "Made in 🇷🇼 Rwanda",
      links: {
        explore:  ["Collection", "The Wild", "The Artists", "The Works", "The Process"],
        services: ["Commission a Piece", "Buy Original Works", "Tuzivugire Program", "WhatsApp Studio →"],
      },
      legal: ["Privacy", "Terms", "Shipping"],
    },
    common: {
      addToCart:        "Add to Cart",
      sold:             "Sold",
      featured:         "Featured",
      startCommission:  "Start a Commission",
      browseShop:       "Browse the Shop",
      proceedCheckout:  "Proceed to Checkout",
      continueShopping: "Continue Shopping",
      donateLabel:      "Add 5% to Tuzivugire",
      donate:           "Donate",
      support:          "Support the Programme",
      submitBrief:      "Submit Brief",
      orderSummary:     "Order Summary",
      subtotal:         "Subtotal",
      shipping:         "Shipping",
      total:            "Total",
      free:             "Free",
      remove:           "Remove",
      promoCode:        "Promo code",
      apply:            "Apply",
      emptyCart:        "Your cart is empty.",
      emptyCartSub:     "Explore original wildlife works by our three resident artists.",
    },
  },

  fr: {
    nav: {
      studio:     "Le Studio",
      wild:       "La Faune",
      tuzivugire: "Tuzivugire",
      commission: "Commander",
      shop:       "Boutique",
    },
    hero: {
      headline: "Bienvenue dans le meilleur art contemporain animalier d'Afrique.",
      subtitle: "Art animalier original au graphite et au fusain par trois artistes rwandais vivant à quelques minutes du Parc des Volcans.",
      cta:      "Réserver",
      viewAll:  "Voir toutes les œuvres",
    },
    intro: {
      label:    "Le Studio",
      headline: "Ouvrez la porte du studio et entrez dans le sauvage",
      body1:    "Un lieu à part du monde, où le silence de l'aube dans la zone de bambous parle plus fort que n'importe quelle ville. Ici, à Musanze au Rwanda — trois artistes pressent graphite et fusain sur le papier pour faire vivre la forêt.",
      body2:    "SAWA dessine le sauvage non pas à partir de photographies, mais de ce que nous voyons à l'aube — le souffle du silverback dans l'air froid de la montagne, les traces encore humides de la matriarche près du point d'eau. Chaque trait est gagné sur le terrain.",
    },
    collection: {
      label: "La Collection",
      tabs: {
        gorillas:  "Gorilles",
        elephants: "Éléphants",
        bigcats:   "Grands Félins",
        eagles:    "Aigles",
      },
      bodies: {
        gorillas:  "Le gorille de montagne ne vit que là — dans les Virunga, une chaîne de volcans à cheval entre le Rwanda, l'Ouganda et la RDC. Christine les dessine depuis les zones d'habituation qu'elle fréquente depuis son enfance. Le silverback porte toute l'histoire du groupe dans sa posture. Elle a appris à la lire.",
        elephants: "Josue a passé des années comme guide forestier au Parc National d'Akagera avant de prendre un stylo. Ses éléphants traversent le papier avec la lente assurance d'animaux qui se souviennent de chaque point d'eau sur cent kilomètres. La mémoire est son sujet.",
        bigcats:   "Rigobert travaille dans l'ombre profonde. Sa technique au fusain — appuyer fort sur du papier rugueux, lever avec une gomme — donne à ses grands félins une qualité cinématographique : à demi émergés de l'obscurité, comme ils le sont toujours dans la vraie savane.",
        eagles:    "L'aigle couronné est le plus puissant prédateur aérien d'Afrique. Rigobert le dessine en techniques mixtes — encre en dessous, ombre au fusain — saisissant l'instant juste avant le plongeon, quand le monde sous le rapace se réduit à un seul point de focalisation.",
      },
    },
    place: {
      label:    "Essence du Lieu",
      title:    "Musanze, Rwanda",
      stats:    ["jusqu'au Parc des Volcans", "trajet jusqu'à Kigali", "altitude · Musanze"],
      body1:    "Musanze est situé au pied du Massif des Virunga dans la Province Nord du Rwanda. À cette altitude, les matins sont froids et clairs. La lisière de la forêt commence au bord de la ville. Les gorilles des montagnes ne sont pas un mythe ici — ils sont une réalité visible sur les collines au-dessus du marché.",
      body2:    "Respirez l'altitude et la brume. Sentez-vous l'immobilité ? Ne détournez pas le regard. Tandis que le groupe de gorilles se déplace dans les bambous, chaque instant change — un regard, un son, une fausse charge qui devient un bâillement. Posez votre attention et tenez-la.",
      body3:    "Accessible depuis le parc qui appartient, en un sens, à nous tous. Un paysage de velours vert qui n'appartient qu'à ceux qui sont prêts à grimper pour le voir.",
    },
    wild: {
      label:    "Légèreté de l'Observation",
      headline: "La Faune",
      body1:    "Ici, le sauvage n'est pas une destination. C'est un voisin. Les volcans des Virunga s'élèvent au-dessus de Musanze la nuit. Le matin, la brume de la forêt descend dans les rues. Chaque œuvre commence avant que le stylo touche le papier — elle commence par des heures d'observation.",
      body2:    "Plongez-vous dans l'intimité du sauvage. Pas un safari — une étude. Pas une photographie — une conversation entre l'artiste et l'animal, menée dans le silence et la poussière de graphite.",
      body3:    "Bosquets d'acacias et pentes de bambou, savane au crépuscule et givre d'altitude. Le Rwanda abrite trois des écosystèmes distincts d'Afrique à deux heures de Musanze. Nos artistes les parcourent tous.",
      ecosystems: [
        { label: "Volcans des Virunga", desc: "Habitat du gorille de montagne. Les artistes visitent les groupes d'habituation trois fois par semaine." },
        { label: "Savane d'Akagera",    desc: "Demeure des éléphants, lions, hippopotames et buffles. À trois heures à l'est de Musanze." },
        { label: "Forêt de Nyungwe",    desc: "Promenades dans la canopée au-dessus de la plus ancienne forêt pluviale d'Afrique centrale. Aigles, chimpanzés, colobes." },
      ],
    },
    process: {
      label:    "Matériaux & Processus",
      headline: "Comment nous dessinons le sauvage",
      body1:    "Nos outils sont choisis avec une compréhension précise de l'animal et de la lumière. Chaque matériau a été testé sur le terrain avant d'être accepté dans le studio. Temps, observation et répétition — c'est ainsi que le sauvage est traduit sur papier.",
      body2:    "Les trois artistes de SAWA travaillent ensemble avec une attention délibérée aux matériaux et à la durée — un temps qui deviendra bientôt de l'histoire, un témoignage de l'habitat observé et documenté avec fidélité.",
      quote:    "Observation silencieuse, immobilité patiente, lignes douces. La discipline du regard est le nouveau luxe.",
      materials: [
        { name: "Graphite",   grade: "H2 → 8B",    desc: "Le fondement. Christine classe chaque crayon avant une session, en sélectionnant la dureté selon l'animal — H4 pour la peau d'éléphant, 6B pour la fourrure de gorille." },
        { name: "Fusain",     grade: "Compressé",   desc: "Rigobert préfère le compressé pour ses grands félins. La densité permet des ombres profondes et veloutées qu'aucun graphite ne peut égaler." },
        { name: "Encre",      grade: "Carbone",     desc: "Josue utilise de l'encre de carbone japonaise pour ses études d'éléphants — permanente, profonde, avec un léger reflet qui capte la lumière." },
        { name: "Papier",     grade: "200–300 g/m²", desc: "Fabriano Artistico 300g grain froid. Assez épais pour résister. Le grain retient la poussière de graphite comme la mousse d'altitude retient la brume." },
        { name: "Estompe",    grade: "Tortillon",   desc: "Stumps en papier roulé à la main, pas les doigts. Les empreintes laissent de l'huile. Le tortillon ne laisse que de la douceur." },
        { name: "Gommes",     grade: "Pétrie",      desc: "La gomme malléable est un outil de dessin autant que de correction — utilisée pour lever le graphite en lumières, pour suggérer le blanc des yeux." },
      ],
    },
    artists: {
      label:    "Les Artistes",
      headline: "Trois artistes. Une forêt. Des sujets infinis.",
      since:    "Depuis",
    },
    works: {
      label:    "Les Œuvres",
      headline: "Originaux sélectionnés",
      filters:  ["Tout", "Graphite", "Fusain", "Encre", "Techniques mixtes"],
      viewAll:  "Voir la galerie complète",
    },
    cta: {
      commissionLabel:  "Commander une Œuvre",
      commissionH2:     "Votre rencontre.\nNotre graphite.",
      commissionBody:   "Parlez-nous de l'animal que vous avez vu — où, quand, ce qu'il faisait. Nous translaterons ce souvenir en une œuvre avec laquelle vous pourrez vivre toute une vie.",
      steps:            ["Décrivez votre rencontre animalière", "Choisissez votre taille et medium", "Recevez une œuvre originale unique"],
      commissionCta:    "Commencer votre commande →",
      circleLabel:      "Rejoindre le Cercle des Collectionneurs",
      circleH3:         "Les premiers à savoir.\nLes premiers à collectionner.",
      circleBody:       "34 collectionneurs dans 18 pays reçoivent un accès anticipé aux nouvelles œuvres, aux histoires du studio à Musanze, et aux mises à jour du programme Tuzivugire avant tout le monde.",
      circleWelcome:    "Bienvenue dans le cercle.",
      emailPlaceholder: "Votre email",
      joinBtn:          "Rejoindre",
      perks:            ["Premier accès", "Priorité commande", "Rapports Tuzivugire"],
    },
    footer: {
      explore:    "Explorer",
      services:   "Services",
      kinyarwanda:"En Kinyarwanda",
      copyright:  "© 2025 SAWA · Studio d'Art Animalier Africain",
      madeIn:     "Fabriqué au 🇷🇼 Rwanda",
      links: {
        explore:  ["Collection", "La Faune", "Les Artistes", "Les Œuvres", "Le Processus"],
        services: ["Commander une œuvre", "Acheter des originaux", "Programme Tuzivugire", "WhatsApp Studio →"],
      },
      legal: ["Confidentialité", "Conditions", "Livraison"],
    },
    common: {
      addToCart:        "Ajouter au panier",
      sold:             "Vendu",
      featured:         "À la une",
      startCommission:  "Commencer une commande",
      browseShop:       "Parcourir la boutique",
      proceedCheckout:  "Passer à la caisse",
      continueShopping: "Continuer mes achats",
      donateLabel:      "Ajouter 5% à Tuzivugire",
      donate:           "Faire un don",
      support:          "Soutenir le programme",
      submitBrief:      "Envoyer le brief",
      orderSummary:     "Récapitulatif de commande",
      subtotal:         "Sous-total",
      shipping:         "Livraison",
      total:            "Total",
      free:             "Gratuit",
      remove:           "Supprimer",
      promoCode:        "Code promo",
      apply:            "Appliquer",
      emptyCart:        "Votre panier est vide.",
      emptyCartSub:     "Explorez les œuvres originales de nos trois artistes résidents.",
    },
  },

  es: {
    nav: {
      studio:     "El Estudio",
      wild:       "Lo Salvaje",
      tuzivugire: "Tuzivugire",
      commission: "Encargar",
      shop:       "Tienda",
    },
    hero: {
      headline: "Bienvenido al mejor arte contemporáneo de vida salvaje de África.",
      subtitle: "Arte original de vida silvestre en grafito y carboncillo por tres artistas ruandeses que viven a minutos del Parque Nacional Volcanes.",
      cta:      "Reservar",
      viewAll:  "Ver todas las obras",
    },
    intro: {
      label:    "El Estudio",
      headline: "Abre la puerta del estudio y entra en lo salvaje",
      body1:    "Un lugar apartado del mundo, donde el silencio del amanecer en la zona de bambú habla más fuerte que cualquier ciudad. Aquí, en Musanze, Ruanda — tres artistas presionan grafito y carboncillo sobre el papel y traen el bosque vivo a la página.",
      body2:    "SAWA dibuja lo salvaje no a partir de fotografías, sino de lo que vemos al amanecer — el aliento del silverback en el aire frío de la montaña, las huellas aún húmedas de la matriarca junto al abrevadero. Cada línea se gana en el campo.",
    },
    collection: {
      label: "La Colección",
      tabs: {
        gorillas:  "Gorilas",
        elephants: "Elefantes",
        bigcats:   "Grandes Felinos",
        eagles:    "Águilas",
      },
      bodies: {
        gorillas:  "El gorila de montaña vive solo aquí — en las Virunga, una cadena de volcanes que atraviesa Ruanda, Uganda y la RDC. Christine los dibuja desde las zonas de habituación que ha frecuentado desde la infancia. El silverback lleva toda la historia del grupo en su postura. Ella ha aprendido a leerla.",
        elephants: "Josue pasó años como guía guardabosques en el Parque Nacional Akagera antes de coger un lápiz. Sus elefantes se mueven por el papel con la lenta confianza de animales que recuerdan cada abrevadero durante cien kilómetros. La memoria es su tema.",
        bigcats:   "Rigobert trabaja en la sombra profunda. Su técnica con carboncillo — presionar fuerte sobre papel rugoso, levantar con una goma — da a sus grandes felinos una calidad cinematográfica: a medio emerger de la oscuridad, como siempre están en la sabana real.",
        eagles:    "El águila coronada es el depredador aéreo más poderoso de África. Rigobert la dibuja en técnica mixta — tinta por debajo, sombra de carboncillo — capturando el instante justo antes del picado, cuando el mundo bajo el rapaz se reduce a un único punto de enfoque.",
      },
    },
    place: {
      label:    "Esencia del Lugar",
      title:    "Musanze, Ruanda",
      stats:    ["hasta el Parque Volcanes", "en coche a Kigali", "altitud · Musanze"],
      body1:    "Musanze se asienta al pie del Macizo Virunga en la Provincia Norte de Ruanda. A esta altitud, las mañanas son frías y despejadas. La línea forestal comienza al borde de la ciudad. Los gorilas de montaña no son un mito aquí — son una realidad de vida, visibles en las colinas sobre el mercado.",
      body2:    "Respira la altitud y la niebla. ¿Sientes la quietud? No apartes la mirada. Mientras el grupo de gorilas avanza entre los bambúes, cada momento cambia — una mirada, un sonido, una carga de juego que se convierte en un bostezo. Pon tu atención y mantenla.",
      body3:    "Fácil acceso al parque que pertenece, en cierto sentido, a todos nosotros. Un paisaje de terciopelo verde que solo pertenece a quienes están dispuestos a trepar para verlo.",
    },
    wild: {
      label:    "Ligereza de la Observación",
      headline: "Lo Salvaje",
      body1:    "Aquí, lo salvaje no es un destino. Es un vecino. Los volcanes Virunga se elevan sobre Musanze por la noche. Por la mañana, la niebla del bosque baja a las calles. Cada obra comienza antes de que el bolígrafo toque el papel — comienza con horas de observación.",
      body2:    "Sumérgete en la intimidad de lo salvaje. No un safari — un estudio. No una fotografía — una conversación entre el artista y el animal, llevada en silencio y polvo de grafito.",
      body3:    "Arboledas de acacias y laderas de bambú, sabana al atardecer y escarcha de altura. Ruanda alberga tres ecosistemas distintos de África a dos horas de Musanze. Nuestros artistas se mueven por todos ellos.",
      ecosystems: [
        { label: "Volcanes Virunga",    desc: "Hábitat del gorila de montaña. Los artistas visitan grupos de habituación tres veces por semana." },
        { label: "Sabana de Akagera",   desc: "Hogar de elefantes, leones, hipopótamos y búfalos. A tres horas en coche al este de Musanze." },
        { label: "Bosque de Nyungwe",   desc: "Paseos por el dosel sobre la selva tropical más antigua de África central. Águilas, chimpancés, colobos." },
      ],
    },
    process: {
      label:    "Materiales & Proceso",
      headline: "Cómo dibujamos lo salvaje",
      body1:    "Nuestras herramientas se eligen con una comprensión precisa del animal y la luz. Cada material fue probado en el campo antes de ser aceptado en el estudio. Tiempo, observación y repetición — así se traduce lo salvaje al papel.",
      body2:    "Los tres artistas de SAWA trabajan juntos con atención deliberada al material y la duración — tiempo que pronto se convertirá en historia, un registro del hábitat observado y documentado con fidelidad.",
      quote:    "Observación silenciosa, quietud paciente, líneas suaves. La disciplina de mirar es el nuevo lujo.",
      materials: [
        { name: "Grafito",      grade: "H2 → 8B",    desc: "La base. Christine clasifica cada lápiz antes de una sesión, seleccionando la dureza según el animal — H4 para la piel del elefante, 6B para el pelaje del gorila." },
        { name: "Carboncillo",  grade: "Comprimido",  desc: "Rigobert prefiere el comprimido para sus grandes felinos. La densidad permite sombras profundas y aterciopeladas que ningún grafito puede igualar." },
        { name: "Tinta",        grade: "Carbono",     desc: "Josue usa tinta de carbono japonesa para sus estudios de elefantes — permanente, profunda, con un ligero brillo que capta la luz en papel grueso." },
        { name: "Papel",        grade: "200–300 g/m²", desc: "Fabriano Artistico 300g grano frío. Suficientemente grueso para aguantar. El grano retiene el polvo de grafito como el musgo de altura retiene la niebla." },
        { name: "Difuminado",   grade: "Tortillón",   desc: "Stumps de papel enrollados a mano, no dedos. Las huellas dejan aceite. El tortillón no deja más que suavidad." },
        { name: "Gomas",        grade: "Moldeable",   desc: "La goma moldeable es una herramienta de dibujo tanto como de corrección — usada para levantar grafito en luces, para sugerir el blanco de los ojos." },
      ],
    },
    artists: {
      label:    "Los Artistas",
      headline: "Tres artistas. Un bosque. Sujetos infinitos.",
      since:    "Desde",
    },
    works: {
      label:    "Las Obras",
      headline: "Originales seleccionados",
      filters:  ["Todo", "Grafito", "Carboncillo", "Tinta", "Técnica Mixta"],
      viewAll:  "Ver galería completa",
    },
    cta: {
      commissionLabel:  "Encargar una Obra",
      commissionH2:     "Tu encuentro.\nNuestro grafito.",
      commissionBody:   "Cuéntanos sobre el animal que viste — dónde, cuándo, qué estaba haciendo. Traduciremos ese recuerdo en una obra con la que puedas vivir toda una vida.",
      steps:            ["Describe tu encuentro con la fauna", "Elige tu tamaño y técnica", "Recibe una obra original única"],
      commissionCta:    "Comenzar tu encargo →",
      circleLabel:      "Únete al Círculo de Coleccionistas",
      circleH3:         "Los primeros en saber.\nLos primeros en coleccionar.",
      circleBody:       "34 coleccionistas en 18 países reciben acceso anticipado a nuevas obras, historias del estudio en Musanze y actualizaciones del programa Tuzivugire antes que nadie.",
      circleWelcome:    "Bienvenido al círculo.",
      emailPlaceholder: "Tu email",
      joinBtn:          "Unirse",
      perks:            ["Acceso prioritario", "Prioridad encargos", "Informes Tuzivugire"],
    },
    footer: {
      explore:    "Explorar",
      services:   "Servicios",
      kinyarwanda:"En Kinyarwanda",
      copyright:  "© 2025 SAWA · Estudio de Arte Africano de Vida Silvestre",
      madeIn:     "Hecho en 🇷🇼 Ruanda",
      links: {
        explore:  ["Colección", "Lo Salvaje", "Los Artistas", "Las Obras", "El Proceso"],
        services: ["Encargar una obra", "Comprar originales", "Programa Tuzivugire", "WhatsApp Estudio →"],
      },
      legal: ["Privacidad", "Términos", "Envío"],
    },
    common: {
      addToCart:        "Añadir al carrito",
      sold:             "Vendido",
      featured:         "Destacado",
      startCommission:  "Iniciar un encargo",
      browseShop:       "Explorar la tienda",
      proceedCheckout:  "Ir al pago",
      continueShopping: "Seguir comprando",
      donateLabel:      "Añadir 5% a Tuzivugire",
      donate:           "Donar",
      support:          "Apoyar el programa",
      submitBrief:      "Enviar solicitud",
      orderSummary:     "Resumen del pedido",
      subtotal:         "Subtotal",
      shipping:         "Envío",
      total:            "Total",
      free:             "Gratis",
      remove:           "Eliminar",
      promoCode:        "Código promocional",
      apply:            "Aplicar",
      emptyCart:        "Tu carrito está vacío.",
      emptyCartSub:     "Explora las obras originales de nuestros tres artistas residentes.",
    },
  },
};

export type Translations = typeof translations["en"];

interface LanguageContextType {
  lang:    Lang;
  setLang: (l: Lang) => void;
  t:       Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang:    "en",
  setLang: () => {},
  t:       translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("sawa-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
