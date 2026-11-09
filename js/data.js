/**
 * Mochila Educativa Offline - Datos Ficticios y Catálogo Curricular
 * Diseñado para la comunidad educativa de Calca, Cusco, Perú.
 */

window.MOCHILA_DATA = {
  // Información de la Institución y Localidad
  institucion: {
    nombre: "I.E. N.° 50180 San Jerónimo de Calca",
    distrito: "Calca, Valle Sagrado de los Incas",
    region: "Cusco - Perú",
    modalidad: "Secundaria Rural con Enfoque Intercultural Bilingüe (EIB)",
    conectividad: "Zona rural sin cobertura de internet fijo - Modelo 100% Offline"
  },

  // Perfil del Estudiante Protagonista
  estudiante: {
    id: "EST-2026-042",
    nombre: "María",
    apellidos: "Quispe Huamán",
    nombreCompleto: "María Quispe Huamán",
    edad: 14,
    grado: "2.° de secundaria",
    seccion: "B",
    comunidad: "Comunidad Campesina de Arin, Calca",
    lenguaMaterna: "Quechua Collao",
    lenguaPreferida: "Quechua",
    nivelCastellano: "Intermedio bilingüe",
    intereses: ["Naturaleza y biodiversidad andina", "Agricultura y cultivo de maíz blanco", "Artesanía textil"],
    iconoInteres: "🌱🌾",
    fotoAvatar: "assets/avatar_maria.svg",
    tutor: "Prof. Carlos Mamani Yupanqui",
    estadoRuta: "Pendiente de diagnóstico"
  },

  // Perfil del Docente Tutor
  docente: {
    id: "DOC-2026-008",
    nombre: "Prof. Carlos",
    apellidos: "Mamani Yupanqui",
    nombreCompleto: "Prof. Carlos Mamani Yupanqui",
    especialidad: "Tutor y Docente de Matemática y Ciencias",
    institucion: "I.E. Rural de Calca",
    gradoACargo: "2.° de secundaria - Sección B",
    totalAlumnos: 25,
    alumnosDiagnosticados: 20,
    rutasGeneradas: 20,
    materialesCompletados: 15
  },

  // Banco de 10 Preguntas del Diagnóstico Académico (5 Matemática, 5 Comprensión Lectora)
  preguntasDiagnostico: [
    // --- MATEMÁTICA (1 - 5) ---
    {
      id: 1,
      area: "Matemática",
      competencia: "Resuelve problemas de cantidad",
      tema: "Operaciones con fracciones en la cosecha",
      contexto: "En la cosecha comunal de maíz blanco gigante de Calca, la familia Quispe dividió su terreno de cultivo en 8 partes iguales. Sembraron maíz en 3/8 y papas nativas en 2/8 del terreno.",
      pregunta: "¿Qué fracción total del terreno se encuentra cultivada?",
      opciones: [
        { id: "A", texto: "5/16 del terreno", correcta: false },
        { id: "B", texto: "5/8 del terreno", correcta: true, feedback: "¡Correcto! Como las fracciones tienen el mismo denominador (8), sumamos los numeradores: 3 + 2 = 5/8." },
        { id: "C", texto: "1/8 del terreno", correcta: false },
        { id: "D", texto: "6/8 del terreno", correcta: false }
      ]
    },
    {
      id: 2,
      area: "Matemática",
      competencia: "Resuelve problemas de cantidad",
      tema: "Fracciones equivalentes y distribución",
      contexto: "Un saco de abono orgánico (compost) pesa 24 kilogramos. Para preparar la tierra de tres parcelas de hortalizas, don Saturnino utiliza 3/4 del saco.",
      pregunta: "¿Cuántos kilogramos de abono utilizó don Saturnino?",
      opciones: [
        { id: "A", texto: "12 kg", correcta: false },
        { id: "B", texto: "16 kg", correcta: false },
        { id: "C", texto: "18 kg", correcta: true, feedback: "¡Exacto! (3/4) de 24 kg = (24 ÷ 4) × 3 = 6 × 3 = 18 kg." },
        { id: "D", texto: "20 kg", correcta: false }
      ]
    },
    {
      id: 3,
      area: "Matemática",
      competencia: "Resuelve problemas de cantidad",
      tema: "Resta de fracciones y trueque andino",
      contexto: "María tenía 7/10 de una arroba de quinua cosechada. En la feria dominical de Calca, intercambió (trueque) 2/5 de arroba por lana de oveja teñida.",
      pregunta: "¿Cuánta quinua le quedó a María después del intercambio?",
      opciones: [
        { id: "A", texto: "3/10 de arroba", correcta: true, feedback: "¡Muy bien! Homogeneizamos 2/5 a 4/10. Luego restamos: 7/10 - 4/10 = 3/10." },
        { id: "B", texto: "5/5 de arroba", correcta: false },
        { id: "C", texto: "1/10 de arroba", correcta: false },
        { id: "D", texto: "5/10 de arroba", correcta: false }
      ]
    },
    {
      id: 4,
      area: "Matemática",
      competencia: "Resuelve problemas de regularidad, equivalencia y cambio",
      tema: "Proporcionalidad y riego tecnificado",
      contexto: "Un canal de riego ancestral distribuye agua hacia los andenes. Por cada 15 minutos de compuerta abierta, ingresan 450 litros de agua al reservorio comunal.",
      pregunta: "¿Cuántos litros de agua ingresarán en 45 minutos si el caudal se mantiene constante?",
      opciones: [
        { id: "A", texto: "900 litros", correcta: false },
        { id: "B", texto: "1200 litros", correcta: false },
        { id: "C", texto: "1350 litros", correcta: true, feedback: "¡Excelente! 45 minutos es el triple de 15 min, por lo que ingresa 450 × 3 = 1350 litros." },
        { id: "D", texto: "1500 litros", correcta: false }
      ]
    },
    {
      id: 5,
      area: "Matemática",
      competencia: "Resuelve problemas de forma, movimiento y localización",
      tema: "Perímetros y linderos de chakras",
      contexto: "El huerto escolar de la I.E. tiene forma rectangular. Mide 12 metros de largo y 8 metros de ancho. Se desea cercar con malla para proteger las hortalizas de los animales menores.",
      pregunta: "¿Cuántos metros lineales de malla se necesitan en total para cercar todo el contorno?",
      opciones: [
        { id: "A", texto: "96 metros", correcta: false },
        { id: "B", texto: "40 metros", correcta: true, feedback: "¡Correcto! El perímetro es la suma de los cuatro lados: 12 + 8 + 12 + 8 = 40 metros." },
        { id: "C", texto: "20 metros", correcta: false },
        { id: "D", texto: "48 metros", correcta: false }
      ]
    },

    // --- COMPRENSIÓN LECTORA (6 - 10) ---
    {
      id: 6,
      area: "Comprensión Lectora",
      competencia: "Lee diversos tipos de textos en su lengua materna",
      tema: "Identificación de ideas principales sobre sabiduría andina",
      contexto: "Texto: «En las alturas de Calca, los abuelos observan el brillo de las Pléyades (Qutu en quechua) en las madrugadas de junio. Si las estrellas brillan con claridad, anuncian un año de lluvias tempranas y abundante cosecha. Este conocimiento astronómico ancestral guía los tiempos exactos de la siembra en el Valle Sagrado».",
      pregunta: "Según el texto, ¿para qué observan los agricultores el brillo de las estrellas Qutu?",
      opciones: [
        { id: "A", texto: "Para organizar las fiestas patronales de la provincia.", correcta: false },
        { id: "B", texto: "Para predecir el clima y determinar la época propicia de siembra.", correcta: true, feedback: "¡Muy bien! El texto explica que la observación astronómica permite pronosticar las lluvias y planificar la siembra." },
        { id: "C", texto: "Para medir la altura de las montañas del valle.", correcta: false },
        { id: "D", texto: "Para calcular el precio del maíz en el mercado.", correcta: false }
      ]
    },
    {
      id: 7,
      area: "Comprensión Lectora",
      competencia: "Infiere e interpreta información del texto",
      tema: "Deducción de relaciones de causa-efecto",
      contexto: "Texto: «El río Vilcanota alimenta los valles fértiles de Cusco. Sin embargo, cuando la tala indiscriminada debilita las riberas, las crecidas en época de lluvias arrastran los terraplenes agrícolas. Por ello, las comunidades organizan faenas de forestación con queñuales nativos, cuyas raíces afianzan la tierra y retienen el agua de montaña».",
      pregunta: "¿Por qué las comunidades siembran queñuales en las riberas?",
      opciones: [
        { id: "A", texto: "Porque sus raíces retienen la tierra evitando que el río arrastre los cultivos.", correcta: true, feedback: "¡Exacto! El texto señala directamente que las raíces de los queñuales afianzan el suelo y protegen los andenes." },
        { id: "B", texto: "Para vender la madera rápidamente en la ciudad.", correcta: false },
        { id: "C", texto: "Porque requieren menos sol que otras plantas.", correcta: false },
        { id: "D", texto: "Para cambiar el curso del río hacia otras provincias.", correcta: false }
      ]
    },
    {
      id: 8,
      area: "Comprensión Lectora",
      competencia: "Reflexiona y evalúa la forma, el contenido y contexto del texto",
      tema: "Propósito comunicativo de una infografía comunal",
      contexto: "Texto: «Aviso Comunal de Calca: 'Cuidemos nuestros canales de riego ancestrales (Asequias). Mantenerlos limpios de plásticos es deber de todos los ayllus. El agua limpia es salud para la chakra y vida para nuestras familias'».",
      pregunta: "¿Cuál es el propósito principal del mensaje comunal?",
      opciones: [
        { id: "A", texto: "Cobrar una tarifa por el uso del agua de riego.", correcta: false },
        { id: "B", texto: "Concientizar a la comunidad sobre la limpieza y cuidado colectivo de los canales de agua.", correcta: true, feedback: "¡Correcto! El aviso busca convocar la responsabilidad comunitaria para conservar el recurso hídrico." },
        { id: "C", texto: "Informar sobre el horario de las faenas agrícolas.", correcta: false },
        { id: "D", texto: "Describir cómo se construyen los canales de piedra.", correcta: false }
      ]
    },
    {
      id: 9,
      area: "Comprensión Lectora",
      competencia: "Obtiene información explícita del texto",
      tema: "Identificación de datos específicos en un relato tradicional",
      contexto: "Texto: «El colibrí gigante (Siwar Q'inti) es un ave sagrada que habita los bosques de polylepis en Calca. Los campesinos relatan que cuando el colibrí bate sus alas cerca de las flores de kantuta, es señal de que la helada nocturna no dañará los brotes tiernos».",
      pregunta: "¿Qué señal representa el colibrí gigante cerca de las kantutas según el relato?",
      opciones: [
        { id: "A", texto: "Que se avecina una sequía prolongada.", correcta: false },
        { id: "B", texto: "Que la helada de la noche no perjudicará los brotes tiernos.", correcta: true, feedback: "¡Excelente! La lectura explícita menciona que anuncia protección frente a las heladas." },
        { id: "C", texto: "Que los picaflores cambiarán de plumaje.", correcta: false },
        { id: "D", texto: "Que comenzará la recolección de leña.", correcta: false }
      ]
    },
    {
      id: 10,
      area: "Comprensión Lectora",
      competencia: "Infiere el significado de palabras en contexto bilingüe",
      tema: "Comprensión léxica y valores andinos (Ayni y Minka)",
      contexto: "Texto: «Cuando una familia concluye la construcción de su vivienda o la siembra de sus parcelas, los vecinos asisten con alegría bajo el principio del 'ayni': hoy por ti, mañana por mí. Esta reciprocidad fortalece la cohesión social de los pueblos de Calca frente a las adversidades».",
      pregunta: "En el texto, la palabra 'reciprocidad' hace referencia a:",
      opciones: [
        { id: "A", texto: "El pago en dinero por una labor realizada.", correcta: false },
        { id: "B", texto: "La ayuda mutua y compartida entre los integrantes de la comunidad.", correcta: true, feedback: "¡Muy bien! 'Hoy por ti, mañana por mí' simboliza la ayuda desinteresada y recíproca entre vecinos." },
        { id: "C", texto: "La competencia entre diferentes familias del pueblo.", correcta: false },
        { id: "D", texto: "La venta de terrenos comunales al mejor postor.", correcta: false }
      ]
    }
  ],

  // Resultados Estándar Simulados para María Quispe
  resultadosSimulados: {
    puntajeMatematica: 60, // 3 de 5 correctas
    puntajeLectura: 80,    // 4 de 5 correctas
    promedioGeneral: 70,
    aciertosMatematica: 3,
    totalMatematica: 5,
    aciertosLectura: 4,
    totalLectura: 5,
    temaReforzar: "Operaciones con fracciones y proporciones",
    temaReforzarDescripcion: "Se identificaron dificultades en sumas y restas de fracciones heterogéneas aplicadas a repartición de parcelas.",
    temaDestacado: "Comprensión de textos descriptivos e inferenciales",
    temaDestacadoDescripcion: "Excelente capacidad para deducir relaciones causa-efecto e interpretar valores comunitarios.",
    mensajeMotivador: "¡Buen trabajo, María! Vamos a reforzar juntos los temas que necesitas practicar mediante actividades inspiradas en el campo y la agricultura de Calca.",
    mensajeQuechua: "¡Allillam María! Kuska kallpachasunchis chakra llamk'aymanta yupaykunata."
  },

  // Los 3 Materiales Clave Recomendados por la IA
  materialesRecomendados: [
    {
      id: "MAT-01",
      tipo: "ficha",
      icono: "📄",
      area: "Matemática",
      colorTag: "matematica",
      titulo: "Ficha de aprendizaje: Fracciones en la cosecha de maíz y papa",
      subtitulo: "Aprende a sumar y restar fracciones repartiendo semillas y parcelas de Calca",
      idioma: "Castellano con glosario Quechua",
      duracion: "25 min de lectura y práctica",
      nivelRequerido: "2.° de secundaria (Refuerzo focalizado)",
      archivoSimulado: "ficha_fracciones_cosecha_v2.pdf",
      tamanoOffline: "2.4 MB (almacenado en dispositivo)",
      descripcionCorta: "Ficha gráfica ilustrada con ejercicios contextualizados en la producción de maíz blanco gigante del Valle Sagrado.",
      actividadAsignada: "Completar los ejercicios 1 al 4 de reparto de semillas",
      diaSemana: "Lunes y Martes",
      estado: "pendiente",
      // Contenido interactivo enriquecido para el modal demo
      contenidoDemo: {
        introduccion: "En esta ficha aprenderemos a representar las partes de un terreno agrícola mediante fracciones. Si una parcela comunal se divide entre varios ayllus, ¿cómo calculamos la porción de cada familia?",
        secciones: [
          {
            titulo: "1. ¿Qué es una fracción en la agricultura andina?",
            contenido: "El denominador indica en cuántas partes iguales dividimos la chakra (el todo). El numerador indica cuántas partes tomamos para sembrar maíz o papa nativa."
          },
          {
            titulo: "2. Ejemplo resuelto: Suma de fracciones de igual denominador",
            contenido: "En Arin, se sembraron 2/8 de terreno con habas y 3/8 con maíz. Total cultivado: 2/8 + 3/8 = (2+3)/8 = 5/8 del terreno."
          },
          {
            titulo: "3. Reto para resolver en tu cuaderno:",
            contenido: "Si don Quispe cosecha 3/4 de saco de maíz el lunes y 1/8 de saco el martes, ¿cuánto maíz cosechó en total? (Pista: Convierte 3/4 en octavos multiplicando por 2)."
          }
        ],
        glosario: "Chakra: Parcela de cultivo | Ayni: Trabajo recíproco | Sara: Maíz"
      }
    },
    {
      id: "MAT-02",
      tipo: "audio",
      icono: "🎧",
      area: "Ciencias, Cultura y Matemática",
      colorTag: "quechua",
      titulo: "Audio educativo: Chakra llamk'aypi yupaykuna (Matemáticas en el campo)",
      subtitulo: "Narración bilingüe sobre el cálculo de surcos, riego y lunas de siembra en Calca",
      idioma: "Quechua Collao (con subtítulos en Castellano)",
      duracion: "12 min (Episodio radial educativo)",
      nivelRequerido: "2.° de secundaria (Intercultural Bilingüe)",
      archivoSimulado: "audio_radio_calca_cap04.mp3",
      tamanoOffline: "5.8 MB (listo para reproducir sin datos)",
      descripcionCorta: "Microprograma radial dramatizado entre una abuela sabia y su nieta sobre cómo usar las matemáticas en los andenes de cultivo.",
      actividadAsignada: "Escuchar el audio y responder las 3 preguntas de reflexión",
      diaSemana: "Miércoles",
      estado: "pendiente",
      // Contenido del reproductor simulado
      contenidoDemo: {
        locutor: "Radio Comunitaria Valle Sagrado (Emisión Calca)",
        dialogoQuechua: "«Allillanchu wawaykuna. Kunan punchaw yachasunchis imaynatam yupaykunata chakranchejpi llamk'achinchis...»",
        traduccion: "«¿Cómo están, queridos jóvenes? Hoy aprenderemos cómo las matemáticas viven en nuestros surcos de siembra, en la distribución del agua de riego y en las medidas de nuestras semillas ancestrales...»",
        segmentos: [
          "00:00 - Saludo comunal y canto tradicional",
          "03:15 - El cálculo de las semillas por cada surco",
          "07:30 - Fracciones en el reparto del agua comunal",
          "11:00 - Pregunta del día para reflexionar con la familia"
        ]
      }
    },
    {
      id: "MAT-03",
      tipo: "video",
      icono: "🎬",
      area: "Comprensión Lectora y Comunicación",
      colorTag: "comunicacion",
      titulo: "Video interactivo: Cuentos del Valle Sagrado: El cóndor y la lluvia",
      subtitulo: "Relato visual animado sobre la preservación de los bosques de queñuales y el agua",
      idioma: "Castellano con diálogos en Quechua",
      duracion: "8 min (Video comprimido de bajo consumo)",
      nivelRequerido: "2.° de secundaria (Comprensión inferencial)",
      archivoSimulado: "video_condor_valle_sagrado.mp4",
      tamanoOffline: "14.2 MB (calidad optimizada para tablets)",
      descripcionCorta: "Historia tradicional animada que ilustra la relación ecológica entre los picos nevados del Pitusiray y las lagunas de Calca.",
      actividadAsignada: "Dibujar el mapa de causas y consecuencias del cuento",
      diaSemana: "Jueves y Viernes",
      estado: "pendiente",
      // Contenido del reproductor de video simulado
      contenidoDemo: {
        sinopsis: "Una animación ambientada en las faldas del nevado Pitusiray en Calca. Cuenta cómo un pastor y una joven aprenden a escuchar el canto del cóndor para saber cuándo recolectar el agua de lluvia en qochas ancestrales.",
        mensajeClave: "La conservación de las cabeceras de cuenca y el respeto por el medio ambiente garantizan el bienestar de las futuras generaciones.",
        preguntasReflexion: [
          "¿Por qué el cóndor desciende solo cuando las lagunas están limpias?",
          "¿Qué representa el nevado Pitusiray para los habitantes de Calca?"
        ]
      }
    }
  ],

  // Planificación Semanal (Lunes a Viernes)
  planSemanal: [
    {
      dia: "Lunes",
      fecha: "16 de Noviembre",
      materia: "Matemática",
      materialId: "MAT-01",
      tarea: "Leer la Ficha 1 y resolver los ejercicios 1 y 2 sobre fracciones en la siembra de maíz.",
      tiempoEstimado: "30 minutos",
      completado: false
    },
    {
      dia: "Martes",
      fecha: "17 de Noviembre",
      materia: "Matemática",
      materialId: "MAT-01",
      tarea: "Completar los ejercicios 3 y 4 de la Ficha 1 y compartir los resultados con un compañero.",
      tiempoEstimado: "25 minutos",
      completado: false
    },
    {
      dia: "Miércoles",
      fecha: "18 de Noviembre",
      materia: "Ciencia y Cultura (Quechua)",
      materialId: "MAT-02",
      tarea: "Escuchar el audio 'Chakra llamk'aypi yupaykuna' y anotar 3 palabras en Quechua sobre medidas.",
      tiempoEstimado: "20 minutos",
      completado: false
    },
    {
      dia: "Jueves",
      fecha: "19 de Noviembre",
      materia: "Comprensión Lectora",
      materialId: "MAT-03",
      tarea: "Ver el video 'El cóndor y la lluvia' e identificar el mensaje central sobre la naturaleza.",
      tiempoEstimado: "20 minutos",
      completado: false
    },
    {
      dia: "Viernes",
      fecha: "20 de Noviembre",
      materia: "Autoevaluación",
      materialId: "MAT-03",
      tarea: "Revisión semanal con el portafolio físico y preparación para la entrega al docente tutor.",
      tiempoEstimado: "15 minutos",
      completado: false
    }
  ],

  // Datos para el Panel Docente (Aula de 2.° B - Calca)
  aulaDocente: {
    resumen: {
      totalEstudiantes: 25,
      diagnosticados: 20,
      rutasGeneradas: 20,
      materialesCompletados: 15,
      porcentajeParticipacion: 80,
      riesgoDesercionBajo: 16,
      riesgoDesercionMedio: 6,
      riesgoDesercionAlto: 3
    },
    temasRefuerzoPrioritarios: [
      { tema: "Operaciones con fracciones y porcentajes", porcentajeDificultad: 65, estudiantesAfectados: 13, area: "Matemática" },
      { tema: "Ecuaciones lineales aplicadas a costos agrícolas", porcentajeDificultad: 48, estudiantesAfectados: 10, area: "Matemática" },
      { tema: "Inferencia y análisis de textos argumentativos", porcentajeDificultad: 38, estudiantesAfectados: 8, area: "Lectura" },
      { tema: "Vocabulario técnico bilingüe Quechua-Castellano", porcentajeDificultad: 30, estudiantesAfectados: 6, area: "Comunicación" }
    ],
    materialesMasRecomendados: [
      { titulo: "Ficha: Fracciones en la cosecha de maíz", recomendaciones: 14, tipo: "Ficha PDF" },
      { titulo: "Audio: Chakra llamk'aypi yupaykuna (Quechua)", recomendaciones: 12, tipo: "Audio MP3" },
      { titulo: "Video: Cuentos del Valle Sagrado (Naturaleza)", recomendaciones: 11, tipo: "Video MP4" },
      { titulo: "Ficha: Perímetros y linderos de andenes", recomendaciones: 9, tipo: "Ficha PDF" }
    ],
    listaEstudiantes: [
      {
        id: "EST-01",
        nombre: "María Quispe Huamán",
        comunidad: "Arin",
        lengua: "Quechua",
        interes: "Agricultura / Naturaleza",
        diagnosticoEstado: "Realizado",
        puntajeMat: 60,
        puntajeLec: 80,
        rutaGenerada: true,
        avanceRuta: 0, // Se actualizará reactivamente
        alerta: "Estable",
        necesidadClave: "Reforzar suma/resta de fracciones heterogéneas"
      },
      {
        id: "EST-02",
        nombre: "Juan Condori Ccapa",
        comunidad: "Lamay",
        lengua: "Castellano",
        interes: "Mecánica y herramientas",
        diagnosticoEstado: "Realizado",
        puntajeMat: 40,
        puntajeLec: 60,
        rutaGenerada: true,
        avanceRuta: 66,
        alerta: "Atención requerida",
        necesidadClave: "Acompañamiento en resolución de problemas aritméticos"
      },
      {
        id: "EST-03",
        nombre: "Rosa Huamán Ttito",
        comunidad: "Pisaq alta",
        lengua: "Quechua",
        interes: "Textilería tradicional",
        diagnosticoEstado: "Realizado",
        puntajeMat: 80,
        puntajeLec: 70,
        rutaGenerada: true,
        avanceRuta: 100,
        alerta: "Excelente",
        necesidadClave: "Potenciar habilidades de redacción en lengua originaria"
      },
      {
        id: "EST-04",
        nombre: "Edwin Mayta Champi",
        comunidad: "Coya",
        lengua: "Bilingüe",
        interes: "Ganadería y pastoreo",
        diagnosticoEstado: "Realizado",
        puntajeMat: 50,
        puntajeLec: 50,
        rutaGenerada: true,
        avanceRuta: 33,
        alerta: "Atención requerida",
        necesidadClave: "Refuerzo en lectura comprensiva y fracciones básicas"
      },
      {
        id: "EST-05",
        nombre: "Lucía Ccarita Paucar",
        comunidad: "Taray",
        lengua: "Quechua",
        interes: "Flora medicinal andina",
        diagnosticoEstado: "Pendiente",
        puntajeMat: null,
        puntajeLec: null,
        rutaGenerada: false,
        avanceRuta: 0,
        alerta: "Riesgo de desconexión",
        necesidadClave: "Pendiente de visita de tutor con dispositivo USB"
      },
      {
        id: "EST-06",
        nombre: "David Yucra Almirón",
        comunidad: "Huarán",
        lengua: "Castellano",
        interes: "Música y vientos andinos",
        diagnosticoEstado: "Realizado",
        puntajeMat: 70,
        puntajeLec: 90,
        rutaGenerada: true,
        avanceRuta: 66,
        alerta: "Estable",
        necesidadClave: "Desarrollar retos avanzados de geometría de andenes"
      }
    ]
  },

  // Catálogo para Radio Comunitaria y Transferencia USB
  distribucionOffline: {
    dispositivosDetectados: [
      { id: "USB-01", etiqueta: "Memoria USB Docente (Kingston 16GB)", espacioLibre: "12.4 GB", formato: "FAT32", conectada: true },
      { id: "USB-02", etiqueta: "Tablet Alumno Aula 2 (SD 32GB)", espacioLibre: "21.1 GB", formato: "exFAT", conectada: false }
    ],
    audiosRadio: [
      {
        id: "RAD-01",
        programa: "La Voz del Valle Educativo - Radio Calca 98.5 FM",
        frecuencia: "98.5 FM / Transmisión comunal",
        horario: "Lunes, Miércoles y Viernes - 4:30 p.m.",
        tema: "Matemática en la siembra y fracciones cotidianas",
        duracion: "15 min",
        alcance: "Cuenca media del río Vilcanota y comunidades altas de Calca",
        estadoTransmision: "Programado para próxima emisión"
      },
      {
        id: "RAD-02",
        programa: "Yachasun Allin Kawsayta - Radio Inti Raymi Calca",
        frecuencia: "102.1 FM / Onda corta comunitaria",
        horario: "Martes y Jueves - 5:00 p.m.",
        tema: "Cuentos y relatos orales en Quechua para secundaria",
        duracion: "18 min",
        alcance: "Comunidades de Arin, Lamay, San Salvador y Lares",
        estadoTransmision: "Transmitido con éxito ayer"
      }
    ],
    paquetesUSB: [
      {
        id: "PKG-01",
        nombre: "Paquete Semanal N.° 12: Matemática y Campo (2.° Secundaria)",
        tamano: "22.4 MB",
        archivos: [
          "Ficha_Fracciones_Cosecha.pdf (2.4 MB)",
          "Audio_Chakra_Yupaykuna_Quechua.mp3 (5.8 MB)",
          "Video_Condor_Lluvia_Ligero.mp4 (14.2 MB)"
        ]
      },
      {
        id: "PKG-02",
        nombre: "Banco Completo de Diagnósticos Curriculares Offline",
        tamano: "8.1 MB",
        archivos: [
          "Banco_Preguntas_1a3_Secundaria.dat (3.2 MB)",
          "Rubricas_Evaluacion_Docente_Calca.pdf (4.9 MB)"
        ]
      }
    ]
  }
};
