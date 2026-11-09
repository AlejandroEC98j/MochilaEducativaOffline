/**
 * Mochila Educativa Offline - Manejo del Estado Local (State Management)
 * Permite reactividad y consistencia entre pantallas e interacciones.
 */

window.MochilaState = {
  // Estado actual
  rol: "estudiante", // 'estudiante' | 'docente'
  pantallaActual: "pantalla-1", // 'pantalla-1' a 'pantalla-8'
  historialPantallas: ["pantalla-1"],

  // Estado del diagnóstico
  diagnostico: {
    preguntaActual: 0, // 0 a 9
    respuestas: {}, // { 1: 'B', 2: 'C', ... }
    completado: false,
    puntajeMatematica: 60,
    puntajeLectura: 80,
    aciertosMatematica: 3,
    aciertosLectura: 4,
    temaReforzar: "Operaciones con fracciones en la cosecha",
    temaDestacado: "Comprensión de textos descriptivos e inferenciales"
  },

  // Estado del recomendador inteligente
  recomendacion: {
    enProceso: false,
    faseActual: 0, // 0: inicio, 1: analizando nivel, 2: cruzando intereses, 3: ponderando lengua, 4: completado
    generada: false,
    materiales: []
  },

  // Estado de la ruta semanal
  rutaSemanal: {
    actividades: [],
    avancePorcentaje: 0
  },

  // Estado de modales y visores
  modalActivo: null, // null | 'material' | 'docente-alumno' | 'usb-transfer'
  materialSeleccionadoModal: null,
  alumnoSeleccionadoDocente: null,

  // Estado de transferencia USB simulada
  usb: {
    conectado: true,
    transfiriendo: false,
    progreso: 0,
    completado: false
  },

  // Suscriptores a cambios de estado
  listeners: [],

  // Inicialización del estado
  init() {
    // Clonar actividades iniciales de data
    this.rutaSemanal.actividades = JSON.parse(JSON.stringify(window.MOCHILA_DATA.planSemanal));
    this.recomendacion.materiales = JSON.parse(JSON.stringify(window.MOCHILA_DATA.materialesRecomendados));
    this.calcularAvanceSemanal();
  },

  // Suscribirse a cambios
  subscribe(callback) {
    this.listeners.push(callback);
  },

  notify(evento, payload) {
    this.listeners.forEach(cb => cb(evento, payload, this));
  },

  // Cambiar pantalla
  irAPantalla(pantallaId) {
    if (this.pantallaActual !== pantallaId) {
      this.historialPantallas.push(this.pantallaActual);
    }
    this.pantallaActual = pantallaId;
    this.notify("cambio_pantalla", { pantallaId });
  },

  // Cambiar rol (estudiante o docente)
  setRol(nuevoRol) {
    this.rol = nuevoRol;
    if (nuevoRol === "estudiante") {
      this.irAPantalla("pantalla-2");
    } else {
      this.irAPantalla("pantalla-7");
    }
    this.notify("cambio_rol", { rol: nuevoRol });
  },

  // Registrar respuesta del diagnóstico
  responderPregunta(preguntaId, opcionId) {
    this.diagnostico.respuestas[preguntaId] = opcionId;
    this.notify("respuesta_registrada", { preguntaId, opcionId });
  },

  // Cambiar pregunta en el diagnóstico
  setPreguntaIndex(index) {
    if (index >= 0 && index < window.MOCHILA_DATA.preguntasDiagnostico.length) {
      this.diagnostico.preguntaActual = index;
      this.notify("cambio_pregunta", { index });
    }
  },

  // Calcular y finalizar diagnóstico
  finalizarDiagnostico() {
    const preguntas = window.MOCHILA_DATA.preguntasDiagnostico;
    let aciertosMat = 0;
    let aciertosLec = 0;

    preguntas.forEach(p => {
      const respUser = this.diagnostico.respuestas[p.id];
      const opcionCorrecta = p.opciones.find(o => o.correcta);
      if (respUser && opcionCorrecta && respUser === opcionCorrecta.id) {
        if (p.area === "Matemática") aciertosMat++;
        if (p.area === "Comprensión Lectora") aciertosLec++;
      }
    });

    // Si el usuario no respondió todas, cargamos valores didácticos simulados que demuestran la necesidad de refuerzo
    const matTotal = 5;
    const lecTotal = 5;

    // Asignar puntajes reales o calculados
    this.diagnostico.aciertosMatematica = aciertosMat > 0 ? aciertosMat : window.MOCHILA_DATA.resultadosSimulados.aciertosMatematica;
    this.diagnostico.aciertosLectura = aciertosLec > 0 ? aciertosLec : window.MOCHILA_DATA.resultadosSimulados.aciertosLectura;

    this.diagnostico.puntajeMatematica = Math.round((this.diagnostico.aciertosMatematica / matTotal) * 100);
    this.diagnostico.puntajeLectura = Math.round((this.diagnostico.aciertosLectura / lecTotal) * 100);
    this.diagnostico.completado = true;

    // Actualizar también en la lista de alumnos del docente para coherencia global
    const alumnoMaria = window.MOCHILA_DATA.aulaDocente.listaEstudiantes.find(e => e.id === "EST-01");
    if (alumnoMaria) {
      alumnoMaria.puntajeMat = this.diagnostico.puntajeMatematica;
      alumnoMaria.puntajeLec = this.diagnostico.puntajeLectura;
      alumnoMaria.diagnosticoEstado = "Realizado";
    }

    this.notify("diagnostico_finalizado", this.diagnostico);
    this.irAPantalla("pantalla-4");
  },

  // Simulación del recomendador inteligente
  iniciarSimulacionRecomendador(onStep, onComplete) {
    this.recomendacion.enProceso = true;
    this.recomendacion.faseActual = 1;
    this.notify("recomendador_iniciado", { fase: 1 });

    if (onStep) onStep(1, "Analizando resultados del diagnóstico académico...");

    setTimeout(() => {
      this.recomendacion.faseActual = 2;
      this.notify("recomendador_progreso", { fase: 2 });
      if (onStep) onStep(2, "Cruzando debilidades con intereses: Agricultura y Naturaleza...");

      setTimeout(() => {
        this.recomendacion.faseActual = 3;
        this.notify("recomendador_progreso", { fase: 3 });
        if (onStep) onStep(3, "Priorizando formatos bilingües y lengua originaria Quechua...");

        setTimeout(() => {
          this.recomendacion.faseActual = 4;
          this.recomendacion.enProceso = false;
          this.recomendacion.generada = true;
          this.notify("recomendador_completado", { materiales: this.recomendacion.materiales });
          if (onComplete) onComplete(this.recomendacion.materiales);
        }, 1200);
      }, 1200);
    }, 1200);
  },

  // Marcar/Desmarcar actividad de la ruta semanal
  toggleActividadSemanal(index) {
    if (this.rutaSemanal.actividades[index]) {
      this.rutaSemanal.actividades[index].completado = !this.rutaSemanal.actividades[index].completado;
      this.calcularAvanceSemanal();

      // Sincronizar con el estado de los materiales
      const act = this.rutaSemanal.actividades[index];
      const mat = this.recomendacion.materiales.find(m => m.id === act.materialId);
      if (mat) {
        // Si al menos una tarea del material está completada
        const algunaCompleta = this.rutaSemanal.actividades.some(a => a.materialId === mat.id && a.completado);
        mat.estado = algunaCompleta ? "completado" : "pendiente";
      }

      // Sincronizar con la lista del docente para María Quispe
      const maria = window.MOCHILA_DATA.aulaDocente.listaEstudiantes.find(e => e.id === "EST-01");
      if (maria) {
        maria.avanceRuta = this.rutaSemanal.avancePorcentaje;
      }

      this.notify("actividad_toggle", { index, actividad: act, avance: this.rutaSemanal.avancePorcentaje });
    }
  },

  // Calcular porcentaje de avance
  calcularAvanceSemanal() {
    const total = this.rutaSemanal.actividades.length;
    if (total === 0) return 0;
    const completadas = this.rutaSemanal.actividades.filter(a => a.completado).length;
    this.rutaSemanal.avancePorcentaje = Math.round((completadas / total) * 100);
    return this.rutaSemanal.avancePorcentaje;
  },

  // Abrir modal de vista previa de material
  abrirModalMaterial(materialId) {
    const mat = this.recomendacion.materiales.find(m => m.id === materialId) ||
                 window.MOCHILA_DATA.materialesRecomendados.find(m => m.id === materialId);
    if (mat) {
      this.materialSeleccionadoModal = mat;
      this.modalActivo = "material";
      this.notify("abrir_modal", { tipo: "material", data: mat });
    }
  },

  // Abrir modal de estudiante para el docente
  abrirModalDocenteEstudiante(estudianteId) {
    const est = window.MOCHILA_DATA.aulaDocente.listaEstudiantes.find(e => e.id === estudianteId);
    if (est) {
      this.alumnoSeleccionadoDocente = est;
      this.modalActivo = "docente-alumno";
      this.notify("abrir_modal", { tipo: "docente-alumno", data: est });
    }
  },

  // Cerrar cualquier modal
  cerrarModal() {
    this.modalActivo = null;
    this.materialSeleccionadoModal = null;
    this.alumnoSeleccionadoDocente = null;
    this.notify("cerrar_modal", {});
  },

  // Simular transferencia USB
  iniciarTransferenciaUSB(onProgress, onDone) {
    if (this.usb.transfiriendo) return;
    this.usb.transfiriendo = true;
    this.usb.progreso = 0;
    this.usb.completado = false;
    this.notify("usb_inicio", {});

    const interval = setInterval(() => {
      this.usb.progreso += 10;
      if (onProgress) onProgress(this.usb.progreso);
      this.notify("usb_progreso", { progreso: this.usb.progreso });

      if (this.usb.progreso >= 100) {
        clearInterval(interval);
        this.usb.transfiriendo = false;
        this.usb.completado = true;
        this.notify("usb_completado", {});
        if (onDone) onDone();
      }
    }, 250);
  },

  // Reiniciar estado para demostración académica
  reiniciarDemo() {
    this.rol = "estudiante";
    this.diagnostico.preguntaActual = 0;
    this.diagnostico.respuestas = {};
    this.diagnostico.completado = false;
    this.diagnostico.puntajeMatematica = 60;
    this.diagnostico.puntajeLectura = 80;
    this.recomendacion.enProceso = false;
    this.recomendacion.faseActual = 0;
    this.recomendacion.generada = false;
    this.rutaSemanal.actividades = JSON.parse(JSON.stringify(window.MOCHILA_DATA.planSemanal));
    this.recomendacion.materiales = JSON.parse(JSON.stringify(window.MOCHILA_DATA.materialesRecomendados));
    this.calcularAvanceSemanal();
    this.usb.transfiriendo = false;
    this.usb.progreso = 0;
    this.usb.completado = false;
    this.cerrarModal();
    this.irAPantalla("pantalla-1");
    this.notify("demo_reiniciada", {});
  }
};
