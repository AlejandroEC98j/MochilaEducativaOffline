/**
 * Mochila Educativa Offline - Controlador de Interfaz de Usuario (UI Controller)
 * Maneja renderizado de pantallas, componentes interactivos y simuladores.
 */

window.MochilaUI = {
  // Web Audio Context para sonidos de interacción opcionales y realismo offline
  audioCtx: null,
  audioPlayingTimer: null,
  isAudioSimPlaying: false,

  init() {
    this.initAudioContext();
    this.renderPantalla(window.MochilaState.pantallaActual);
    this.bindGlobalEvents();
  },

  // Inicializar Web Audio API para simulación de reproducción de audio sin archivos externos
  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API no soportada en este entorno.", e);
    }
  },

  // Reproducir tono sutil de confirmación
  playBeep(freq = 520, type = "sine", duration = 0.1) {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  },

  // =========================================================================
  // NAVEGACIÓN Y CAMBIO DE PANTALLA
  // =========================================================================
  renderPantalla(pantallaId) {
    // 1. Ocultar todas las pantallas y mostrar la activa
    document.querySelectorAll(".screen-view").forEach(s => {
      s.classList.remove("active-screen");
    });
    const target = document.getElementById(pantallaId);
    if (target) {
      target.classList.add("active-screen");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 2. Actualizar píldoras de la barra de exposición (Tour Bar)
    document.querySelectorAll(".tour-step-pill").forEach(p => {
      if (p.getAttribute("data-step") === pantallaId) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    // 3. Actualizar selector de rol en cabecera
    const btnEst = document.getElementById("btn-role-estudiante");
    const btnDoc = document.getElementById("btn-role-docente");
    if (pantallaId === "pantalla-7") {
      btnEst.classList.remove("active");
      btnDoc.classList.add("active");
    } else if (pantallaId !== "pantalla-1" && pantallaId !== "pantalla-8") {
      btnDoc.classList.remove("active");
      btnEst.classList.add("active");
    }

    // 4. Renderizar contenido específico según la pantalla
    switch (pantallaId) {
      case "pantalla-2":
        this.renderPanelEstudiante();
        break;
      case "pantalla-3":
        this.renderPreguntaActual();
        break;
      case "pantalla-4":
        this.renderResultados();
        break;
      case "pantalla-5":
        this.renderRecomendaciones();
        break;
      case "pantalla-6":
        this.renderRutaSemanal();
        break;
      case "pantalla-7":
        this.renderPanelDocente();
        break;
      case "pantalla-8":
        this.renderDistribucionOffline();
        break;
    }
  },

  // =========================================================================
  // PANTALLA 2: PANEL DEL ESTUDIANTE
  // =========================================================================
  renderPanelEstudiante() {
    const diagBadge = document.getElementById("p2-diag-status-badge");
    const rutaBadge = document.getElementById("p2-ruta-progress-badge");
    const btnDiagCard = document.getElementById("btn-card-diagnostico");
    const btnIniciarDiagP2 = document.getElementById("btn-iniciar-diagnostico-p2");

    if (window.MochilaState.diagnostico.completado) {
      diagBadge.textContent = "Completado (60% Mat / 80% Lec)";
      diagBadge.style.backgroundColor = "#e8f5e9";
      diagBadge.style.color = "#15803d";
      btnDiagCard.textContent = "Ver resultados y análisis →";
      btnIniciarDiagP2.textContent = "📊 Ver mis resultados";
    } else {
      diagBadge.textContent = "Pendiente";
      diagBadge.style.backgroundColor = "var(--color-verde-menta)";
      diagBadge.style.color = "var(--color-verde-oscuro)";
      btnDiagCard.textContent = "Comenzar diagnóstico →";
      btnIniciarDiagP2.textContent = "📝 Realizar diagnóstico";
    }

    const avance = window.MochilaState.calcularAvanceSemanal();
    rutaBadge.textContent = `${avance}% completado`;
  },

  // =========================================================================
  // PANTALLA 3: DIAGNÓSTICO ACADÉMICO (10 PREGUNTAS)
  // =========================================================================
  renderPreguntaActual() {
    const state = window.MochilaState;
    const index = state.diagnostico.preguntaActual;
    const total = window.MOCHILA_DATA.preguntasDiagnostico.length;
    const p = window.MOCHILA_DATA.preguntasDiagnostico[index];

    // Actualizar encabezados
    document.getElementById("quiz-counter-text").textContent = `Pregunta ${index + 1} de ${total}`;
    const areaBadge = document.getElementById("quiz-area-badge");
    areaBadge.textContent = `${p.area} • ${p.competencia}`;
    if (p.area === "Matemática") {
      areaBadge.className = "tag-materia-mat";
    } else {
      areaBadge.className = "tag-materia-lec";
    }

    // Barra de progreso
    const percent = Math.round(((index + 1) / total) * 100);
    document.getElementById("quiz-progress-bar").style.width = `${percent}%`;

    // Contexto y pregunta
    document.getElementById("quiz-context-text").textContent = p.contexto;
    document.getElementById("quiz-question-title").textContent = p.pregunta;

    // Renderizar opciones
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";

    const respuestaGuardada = state.diagnostico.respuestas[p.id];
    const feedbackBox = document.getElementById("quiz-feedback-box");
    feedbackBox.style.display = "none";

    p.opciones.forEach(op => {
      const isSelected = respuestaGuardada === op.id;
      const item = document.createElement("div");
      item.className = `option-item ${isSelected ? "selected" : ""}`;
      item.innerHTML = `
        <span class="option-letter">${op.id}</span>
        <span style="font-size: 0.98rem; font-weight: 500; flex: 1;">${op.texto}</span>
      `;

      item.addEventListener("click", () => {
        this.playBeep(440, "sine", 0.08);
        state.responderPregunta(p.id, op.id);
        this.renderPreguntaActual();
      });

      container.appendChild(item);

      // Mostrar feedback si ya fue seleccionada
      if (isSelected && op.feedback) {
        feedbackBox.style.display = "block";
        feedbackBox.style.backgroundColor = op.correcta ? "var(--color-exito-bg)" : "#fff3e0";
        feedbackBox.style.border = `1px solid ${op.correcta ? "#81c784" : "#ffb74d"}`;
        feedbackBox.style.color = op.correcta ? "#1b5e20" : "#b45309";
        feedbackBox.innerHTML = `<strong>Explicación formativa:</strong> ${op.feedback}`;
      }
    });

    // Control de botones de navegación
    const btnPrev = document.getElementById("btn-quiz-prev");
    const btnNext = document.getElementById("btn-quiz-next");
    const btnFinish = document.getElementById("btn-quiz-finish");

    btnPrev.disabled = index === 0;
    btnPrev.style.opacity = index === 0 ? "0.5" : "1";

    if (index === total - 1) {
      btnNext.style.display = "none";
      btnFinish.style.display = "inline-flex";
    } else {
      btnNext.style.display = "inline-flex";
      btnFinish.style.display = "none";
    }
  },

  // =========================================================================
  // PANTALLA 4: RESULTADOS DEL DIAGNÓSTICO
  // =========================================================================
  renderResultados() {
    const diag = window.MochilaState.diagnostico;
    const sim = window.MOCHILA_DATA.resultadosSimulados;

    const puntajeMat = diag.completado ? diag.puntajeMatematica : sim.puntajeMatematica;
    const puntajeLec = diag.completado ? diag.puntajeLectura : sim.puntajeLectura;

    document.getElementById("label-score-mat").textContent = `${puntajeMat}%`;
    document.getElementById("label-score-lec").textContent = `${puntajeLec}%`;

    // Circunferencia = 2 * PI * 42 = ~264
    const offsetMat = 264 - (264 * puntajeMat) / 100;
    const offsetLec = 264 - (264 * puntajeLec) / 100;

    const circleMat = document.getElementById("circle-mat-fill");
    const circleLec = document.getElementById("circle-lec-fill");

    if (circleMat) circleMat.style.strokeDashoffset = offsetMat;
    if (circleLec) circleLec.style.strokeDashoffset = offsetLec;

    document.getElementById("p4-tema-reforzar").textContent = sim.temaReforzar;
    document.getElementById("p4-tema-destacado").textContent = sim.temaDestacado;
  },

  // =========================================================================
  // PANTALLA 5: SIMULADOR DE RECOMENDACIÓN CON INTELIGENCIA ARTIFICIAL
  // =========================================================================
  renderRecomendaciones() {
    const container = document.getElementById("recommended-materials-list");
    container.innerHTML = "";

    const mats = window.MochilaState.recomendacion.materiales;
    mats.forEach(m => {
      const card = document.createElement("div");
      card.className = "material-card";
      card.innerHTML = `
        <div>
          <div class="material-card-header">
            <div class="material-type-icon">${m.icono}</div>
            <span class="tag-${m.colorTag === 'quechua' ? 'quechua' : m.colorTag === 'matematica' ? 'materia-mat' : 'materia-lec'}">
              ${m.area}
            </span>
          </div>

          <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--color-azul-noche); line-height: 1.3;">
            ${m.titulo}
          </h4>
          <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-top: 0.35rem;">
            ${m.subtitulo}
          </p>

          <ul class="material-meta-list">
            <li>🗣️ <strong>Idioma:</strong> ${m.idioma}</li>
            <li>⏱️ <strong>Duración:</strong> ${m.duracion}</li>
            <li>💾 <strong>Tamaño:</strong> ${m.tamanoOffline}</li>
            <li>📍 <strong>Asignado a:</strong> ${m.diaSemana}</li>
          </ul>
        </div>

        <div>
          <button type="button" class="btn btn-terracota btn-block btn-ver-material" data-mat-id="${m.id}">
            ${m.tipo === 'audio' ? '🎧 Escuchar audio' : m.tipo === 'video' ? '🎬 Ver video animado' : '📄 Abrir ficha didáctica'}
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Vincular botones de ver material
    container.querySelectorAll(".btn-ver-material").forEach(btn => {
      btn.addEventListener("click", e => {
        const matId = e.currentTarget.getAttribute("data-mat-id");
        window.MochilaState.abrirModalMaterial(matId);
      });
    });
  },

  // Ejecución animada de la simulación del recomendador de IA
  ejecutarSimulacionIA(onComplete) {
    const card1 = document.getElementById("ai-card-1");
    const card2 = document.getElementById("ai-card-2");
    const card3 = document.getElementById("ai-card-3");
    const title = document.getElementById("ai-processing-status-title");
    const desc = document.getElementById("ai-processing-status-desc");

    title.textContent = "Iniciando análisis heurístico inteligente...";
    desc.textContent = "Examinando diagnóstico académico (Matemática: 60%)...";
    card1.classList.add("analyzing");

    window.MochilaState.iniciarSimulacionRecomendador(
      (fase, mensaje) => {
        this.playBeep(480 + fase * 60, "triangle", 0.1);
        if (fase === 1) {
          title.textContent = "1. Nivel académico evaluado: Se detecta necesidad en Fracciones.";
          desc.textContent = mensaje;
          card1.classList.add("analyzing");
        } else if (fase === 2) {
          card1.classList.remove("analyzing");
          card2.classList.add("analyzing");
          title.textContent = "2. Cruzando con el perfil de María: Agricultura y Maíz de Calca.";
          desc.textContent = mensaje;
        } else if (fase === 3) {
          card2.classList.remove("analyzing");
          card3.classList.add("analyzing");
          title.textContent = "3. Ponderando lengua materna: Quechua Collao EIB.";
          desc.textContent = mensaje;
        }
      },
      () => {
        this.playBeep(720, "sine", 0.2);
        card3.classList.remove("analyzing");
        title.textContent = "✅ ¡Recomendación completada con éxito! (Sin necesidad de internet)";
        desc.textContent = "Se generó una ruta óptima de 3 materiales adaptados para María Quispe.";
        this.renderRecomendaciones();
        if (onComplete) onComplete();
      }
    );
  },

  // =========================================================================
  // PANTALLA 6: MI RUTA SEMANAL (LUNES A VIERNES)
  // =========================================================================
  renderRutaSemanal() {
    const state = window.MochilaState;
    const actividades = state.rutaSemanal.actividades;
    const container = document.getElementById("weekly-schedule-container");
    container.innerHTML = "";

    const completadas = actividades.filter(a => a.completado).length;
    const total = actividades.length;
    const avance = state.calcularAvanceSemanal();

    document.getElementById("weekly-status-text").textContent = `${completadas} de ${total} actividades completadas`;
    document.getElementById("weekly-percent-label").textContent = `${avance}%`;
    document.getElementById("weekly-progress-fill").style.width = `${avance}%`;

    actividades.forEach((act, idx) => {
      const mat = window.MOCHILA_DATA.materialesRecomendados.find(m => m.id === act.materialId);
      const item = document.createElement("div");
      item.className = `day-activity-item ${act.completado ? "completed" : ""}`;
      item.innerHTML = `
        <div class="day-badge-col">
          <span class="day-title">${act.dia}</span>
          <span class="day-date">${act.fecha}</span>
          <span class="tag-calca" style="font-size: 0.72rem; margin-top: 0.35rem; width: fit-content;">${act.materia}</span>
        </div>

        <div>
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-azul-noche); text-decoration: ${act.completado ? 'line-through' : 'none'};">
            ${act.tarea}
          </h4>
          <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-top: 0.35rem;">
            📦 <strong>Material:</strong> ${mat ? mat.titulo : 'Material asignado'} (⏱️ ${act.tiempoEstimado})
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          ${mat ? `<button type="button" class="btn btn-outline btn-abrir-recurso" data-mat-id="${mat.id}" style="font-size: 0.8rem; padding: 0.4rem 0.75rem;">Ver</button>` : ''}
          <button type="button" class="btn ${act.completado ? 'btn-primary' : 'btn-terracota'} btn-toggle-act" data-index="${idx}" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
            ${act.completado ? '✓ Completado' : 'Marcar completado'}
          </button>
        </div>
      `;

      container.appendChild(item);
    });

    // Vincular botones de marcar actividad
    container.querySelectorAll(".btn-toggle-act").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        this.playBeep(600, "sine", 0.12);
        state.toggleActividadSemanal(index);
        this.renderRutaSemanal();
      });
    });

    // Vincular botones de ver recurso
    container.querySelectorAll(".btn-abrir-recurso").forEach(btn => {
      btn.addEventListener("click", e => {
        const matId = e.currentTarget.getAttribute("data-mat-id");
        state.abrirModalMaterial(matId);
      });
    });
  },

  // =========================================================================
  // PANTALLA 7: PANEL DEL DOCENTE TUTOR
  // =========================================================================
  renderPanelDocente() {
    const aula = window.MOCHILA_DATA.aulaDocente;

    // Métricas
    const matCompletadosKpi = document.getElementById("kpi-materiales-completados");
    // Calcular si María completó algo
    const mariaCompletadas = window.MochilaState.rutaSemanal.actividades.filter(a => a.completado).length;
    matCompletadosKpi.textContent = 15 + (mariaCompletadas > 0 ? 1 : 0);

    // Gráfico 1: Temas con mayor refuerzo
    const chartTemas = document.getElementById("chart-temas-refuerzo");
    chartTemas.innerHTML = "";
    aula.temasRefuerzoPrioritarios.forEach(t => {
      const row = document.createElement("div");
      row.className = "bar-chart-row";
      row.innerHTML = `
        <div class="bar-chart-label">
          <span>${t.tema}</span>
          <span style="color: var(--color-terracota); font-weight: 700;">${t.porcentajeDificultad}% de alumnos (${t.estudiantesAfectados} estudiantes)</span>
        </div>
        <div class="bar-chart-track">
          <div class="bar-chart-fill" style="width: ${t.porcentajeDificultad}%;"></div>
        </div>
      `;
      chartTemas.appendChild(row);
    });

    // Gráfico 2: Materiales recomendados
    const chartMats = document.getElementById("chart-materiales-recomendados");
    chartMats.innerHTML = "";
    aula.materialesMasRecomendados.forEach(m => {
      const row = document.createElement("div");
      row.className = "bar-chart-row";
      const pct = Math.round((m.recomendaciones / 20) * 100);
      row.innerHTML = `
        <div class="bar-chart-label">
          <span>${m.titulo}</span>
          <span style="color: var(--color-azul-medio); font-weight: 700;">${m.recomendaciones} alumnos (${pct}%)</span>
        </div>
        <div class="bar-chart-track">
          <div class="bar-chart-fill" style="width: ${pct}%; background-color: var(--color-azul-medio);"></div>
        </div>
      `;
      chartMats.appendChild(row);
    });

    // Tabla de Estudiantes
    const tbody = document.getElementById("student-table-body");
    tbody.innerHTML = "";
    aula.listaEstudiantes.forEach(est => {
      const tr = document.createElement("tr");
      // Si es María, actualizamos su avance con el estado real
      if (est.id === "EST-01") {
        est.avanceRuta = window.MochilaState.rutaSemanal.avancePorcentaje;
        if (window.MochilaState.diagnostico.completado) {
          est.puntajeMat = window.MochilaState.diagnostico.puntajeMatematica;
          est.puntajeLec = window.MochilaState.diagnostico.puntajeLectura;
        }
      }

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: var(--color-azul-noche);">${est.nombre}</div>
          <div style="font-size: 0.75rem; color: var(--color-texto-apagado);">${est.id}</div>
        </td>
        <td>${est.comunidad}</td>
        <td><span class="tag-quechua" style="font-size: 0.75rem;">${est.lengua}</span></td>
        <td>
          <span class="tag-calca" style="background: ${est.diagnosticoEstado === 'Realizado' ? '#e8f5e9' : '#fff3e0'}; color: ${est.diagnosticoEstado === 'Realizado' ? '#1b5e20' : '#b45309'}; border: none;">
            ${est.diagnosticoEstado}
          </span>
        </td>
        <td><strong>${est.puntajeMat !== null ? est.puntajeMat + '%' : '-'}</strong></td>
        <td><strong>${est.puntajeLec !== null ? est.puntajeLec + '%' : '-'}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="progress-track" style="width: 60px; height: 8px; margin-bottom: 0;">
              <div class="progress-bar-fill" style="width: ${est.avanceRuta}%;"></div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700;">${est.avanceRuta}%</span>
          </div>
        </td>
        <td>
          <button type="button" class="btn btn-outline btn-ver-estudiante" data-est-id="${est.id}" style="font-size: 0.78rem; padding: 0.35rem 0.7rem;">
            Detalle →
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".btn-ver-estudiante").forEach(btn => {
      btn.addEventListener("click", e => {
        const estId = e.currentTarget.getAttribute("data-est-id");
        window.MochilaState.abrirModalDocenteEstudiante(estId);
      });
    });
  },

  // =========================================================================
  // PANTALLA 8: DISTRIBUCIÓN RADIO Y USB (OFFLINE)
  // =========================================================================
  renderDistribucionOffline() {
    const wrapper = document.getElementById("usb-transfer-progress-wrapper");
    const alertBox = document.getElementById("usb-success-alert");
    const btnUsb = document.getElementById("btn-iniciar-usb");

    if (window.MochilaState.usb.completado) {
      wrapper.style.display = "none";
      alertBox.style.display = "block";
      btnUsb.textContent = "✓ Paquete sincronizado (Volver a copiar)";
    } else {
      wrapper.style.display = "none";
      alertBox.style.display = "none";
      btnUsb.textContent = "📥 Transferir paquete a la memoria USB";
    }
  },

  ejecutarTransferenciaUSB() {
    const wrapper = document.getElementById("usb-transfer-progress-wrapper");
    const alertBox = document.getElementById("usb-success-alert");
    const bar = document.getElementById("usb-progress-bar");
    const label = document.getElementById("usb-progress-label");
    const pctLabel = document.getElementById("usb-percent-label");
    const btnUsb = document.getElementById("btn-iniciar-usb");

    wrapper.style.display = "block";
    alertBox.style.display = "none";
    btnUsb.disabled = true;
    btnUsb.textContent = "⏳ Copiando archivos...";

    const pasosTexto = [
      "Verificando formato de archivo FAT32...",
      "Copiando Ficha_Fracciones_Cosecha_Calca.pdf...",
      "Copiando Audio_Chakra_Yupaykuna_Quechua.mp3...",
      "Copiando Video_Condor_Lluvia_Sagrado.mp4...",
      "Verificando sumas de comprobación offline...",
      "¡Transferencia completada!"
    ];

    window.MochilaState.iniciarTransferenciaUSB(
      progreso => {
        bar.style.width = `${progreso}%`;
        pctLabel.textContent = `${progreso}%`;
        const stepIndex = Math.min(Math.floor((progreso / 100) * pasosTexto.length), pasosTexto.length - 1);
        label.textContent = pasosTexto[stepIndex];
        this.playBeep(300 + progreso * 4, "square", 0.04);
      },
      () => {
        this.playBeep(660, "sine", 0.3);
        wrapper.style.display = "none";
        alertBox.style.display = "block";
        btnUsb.disabled = false;
        btnUsb.textContent = "✓ Paquete sincronizado (Volver a copiar)";
      }
    );
  },

  // =========================================================================
  // MODALES (FICHA, AUDIO EN QUECHUA, VIDEO, DETALLE ALUMNO)
  // =========================================================================
  abrirModalMaterial(mat) {
    const modal = document.getElementById("modal-material-viewer");
    document.getElementById("modal-material-title").textContent = mat.titulo;
    document.getElementById("modal-material-type-icon").textContent = mat.icono;
    document.getElementById("modal-material-meta").textContent = `${mat.area} • Idioma: ${mat.idioma} • ⏱️ ${mat.duracion}`;

    const body = document.getElementById("modal-material-content-body");
    body.innerHTML = "";

    // Contenido según el tipo
    if (mat.tipo === "ficha") {
      // Ficha pedagógica de fracciones
      body.innerHTML = `
        <div style="background-color: #ffffff; border: 1px solid var(--color-tierra-borde); padding: 1.5rem; border-radius: var(--radio-lg);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--color-verde-medio); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
            <div>
              <span class="tag-calca">Ficha Curricular N.° 04 • 2.° Secundaria</span>
              <h3 style="color: var(--color-verde-oscuro); margin-top: 0.35rem; font-size: 1.3rem;">
                Fracciones en la Cosecha de Maíz Blanco y Papa Nativa
              </h3>
            </div>
            <div style="text-align: right; font-size: 0.8rem; color: var(--color-texto-apagado);">
              I.E. San Jerónimo de Calca<br>Área de Matemática
            </div>
          </div>

          <div style="background: var(--color-tierra-suave); padding: 1rem; border-radius: var(--radio-md); margin-bottom: 1rem; line-height: 1.6;">
            <strong>Propósito de aprendizaje:</strong> Comprender y aplicar la adición y sustracción de fracciones en situaciones de cultivo y distribución de tierras en el Valle Sagrado.
          </div>

          <h4 style="color: var(--color-azul-noche); margin: 1rem 0 0.5rem 0;">1. ¿Qué es una fracción en la agricultura andina?</h4>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-texto-secundario);">
            El denominador indica en cuántas parcelas iguales dividimos la chakra (el todo comunal). El numerador indica cuántas partes tomamos para sembrar maíz o papa nativa.
          </p>

          <div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: center; justify-content: center; background: #fdfbf7; padding: 1rem; border: 1px dashed var(--color-ocre-dorado); border-radius: var(--radio-md);">
            <div style="text-align: center;">
              <div style="display: grid; grid-template-columns: repeat(4, 30px); grid-template-rows: repeat(2, 30px); gap: 4px;">
                <div style="background: #2d6a4f; border-radius: 4px;" title="Maíz"></div>
                <div style="background: #2d6a4f; border-radius: 4px;" title="Maíz"></div>
                <div style="background: #2d6a4f; border-radius: 4px;" title="Maíz"></div>
                <div style="background: #e07a5f; border-radius: 4px;" title="Papa"></div>
                <div style="background: #e07a5f; border-radius: 4px;" title="Papa"></div>
                <div style="background: #e2d9cc; border-radius: 4px;" title="Libre"></div>
                <div style="background: #e2d9cc; border-radius: 4px;" title="Libre"></div>
                <div style="background: #e2d9cc; border-radius: 4px;" title="Libre"></div>
              </div>
              <span style="font-size: 0.75rem; color: var(--color-texto-apagado); margin-top: 4px; display: block;">Terreno dividido en 8 partes</span>
            </div>
            <div style="font-size: 0.9rem; line-height: 1.5;">
              <span style="color: #2d6a4f; font-weight: 700;">■ 3/8 Maíz blanco</span><br>
              <span style="color: #e07a5f; font-weight: 700;">■ 2/8 Papa nativa</span><br>
              <span style="color: #1b4332; font-weight: 800;">Total cultivado: 3/8 + 2/8 = 5/8</span>
            </div>
          </div>

          <h4 style="color: var(--color-azul-noche); margin: 1rem 0 0.5rem 0;">2. Reto para resolver en tu cuaderno:</h4>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-texto-secundario);">
            En la comunidad de Arin, don Mateo tiene un reservorio lleno de agua. Durante la mañana riega 3/10 del huerto escolar y por la tarde riega 2/5. ¿Qué fracción del huerto regó en total?
          </p>

          <div style="margin-top: 1.25rem; padding: 0.75rem; background: #fff8e1; border-radius: var(--radio-md); font-size: 0.82rem; color: #78350f;">
            📖 <strong>Glosario bilingüe:</strong> Chakra (terreno de cultivo) • Sara (maíz) • Yaku (agua) • Ayni (trabajo recíproco).
          </div>
        </div>
      `;
    } else if (mat.tipo === "audio") {
      // Reproductor de Audio en Quechua simulado
      body.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
          <span class="tag-quechua">Microprograma Radial Bilingüe • Calca FM</span>
          <h4 style="font-size: 1.2rem; color: var(--color-azul-noche); margin-top: 0.5rem;">
            Chakra llamk'aypi yupaykuna: Matemáticas en el campo
          </h4>
          <p style="font-size: 0.88rem; color: var(--color-texto-secundario);">
            Locución: Radio Comunitaria Valle Sagrado • Episodio 4
          </p>
        </div>

        <div class="simulated-audio-player" id="audio-player-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: #94a3b8;">📻 Transmisión Offline Local</span>
            <span style="font-size: 0.85rem; color: var(--color-verde-claro);" id="audio-current-time">00:00 / 12:00</span>
          </div>

          <!-- Ondas de Audio Animadas -->
          <div class="audio-waveform-bars">
            ${Array.from({ length: 28 }).map(() => '<div class="waveform-bar"></div>').join('')}
          </div>

          <!-- Controles del reproductor -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem; margin-top: 1rem;">
            <button type="button" class="btn btn-outline" id="btn-audio-rewind" style="color: #fff; border-color: #475569; padding: 0.4rem 0.8rem;">
              ⏪ -15s
            </button>
            <button type="button" class="btn btn-terracota btn-lg" id="btn-audio-play-toggle" style="border-radius: 50%; width: 56px; height: 56px; padding: 0;">
              ▶
            </button>
            <button type="button" class="btn btn-outline" id="btn-audio-forward" style="color: #fff; border-color: #475569; padding: 0.4rem 0.8rem;">
              +15s ⏩
            </button>
          </div>
        </div>

        <!-- Pestañas de Transcripción Bilingüe Quechua / Castellano -->
        <div style="margin-top: 1.25rem;">
          <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-tierra-borde); padding-bottom: 0.5rem;">
            <button type="button" class="btn btn-primary" id="tab-quechua-btn" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">
              🗣️ Transcripción en Quechua
            </button>
            <button type="button" class="btn btn-outline" id="tab-castellano-btn" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">
              Traducción al Castellano
            </button>
          </div>

          <div id="transcript-quechua-box" style="padding: 1rem 0; font-style: italic; line-height: 1.6; color: #334155;">
            «Allillanchu wawaykuna Calca suyumanta. Kunan punchaw yachasunchis imaynatam yupaykunata chakranchejpi llamk'achinchis. Mamacha Lorenzam willawasunchis imaynatam sarata rakinchik...»
          </div>

          <div id="transcript-castellano-box" style="padding: 1rem 0; line-height: 1.6; color: #334155; display: none;">
            «¿Cómo están, jóvenes de Calca? Hoy aprenderemos cómo las matemáticas viven en nuestros surcos de siembra y en el reparto justo de nuestras cosechas comunales...»
          </div>
        </div>
      `;

      // Lógica de reproducción simulada del audio
      this.bindAudioModalControls();
    } else if (mat.tipo === "video") {
      // Reproductor de Video Simulado
      body.innerHTML = `
        <div style="background-color: #0f172a; border-radius: var(--radio-lg); overflow: hidden; position: relative; aspect-ratio: 16/9; display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem; color: #ffffff;">
          <!-- Badge superior de calidad optimizada offline -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="tag-calca" style="background: rgba(0,0,0,0.6); color: #fff; border: none;">
              🎬 Video Educativo Ligero (Bajo Consumo)
            </span>
            <span style="font-size: 0.8rem; background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 4px;">
              720p Offline • 14.2 MB
            </span>
          </div>

          <!-- Centro con carátula del Nevado Pitusiray y el Cóndor -->
          <div style="text-align: center; margin: auto;" id="video-center-art">
            <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🦅🏔️</div>
            <h4 style="font-size: 1.3rem; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
              Cuentos del Valle Sagrado: El cóndor y la lluvia
            </h4>
            <button type="button" class="btn btn-terracota" id="btn-play-sim-video" style="margin-top: 0.75rem; border-radius: var(--radio-full); padding: 0.6rem 1.4rem;">
              ▶ Reproducir video
            </button>
          </div>

          <!-- Barra de controles simulada -->
          <div style="background: rgba(0,0,0,0.7); padding: 0.5rem 0.75rem; border-radius: var(--radio-md); margin-top: auto;">
            <div class="progress-track" style="height: 6px; margin-bottom: 0.5rem; background: #334155;">
              <div class="progress-bar-fill" id="video-progress-bar" style="width: 35%; background: var(--color-terracota);"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
              <span>02:45 / 08:00</span>
              <span>Subtítulos: Quechua / Castellano [CC]</span>
            </div>
          </div>
        </div>

        <div style="margin-top: 1.25rem; line-height: 1.6;">
          <h4 style="color: var(--color-azul-noche); font-size: 1.05rem;">Sinopsis pedagógica:</h4>
          <p style="font-size: 0.9rem; color: var(--color-texto-secundario);">
            Relato tradicional ambientado en las faldas del nevado Pitusiray de Calca. Enseña cómo los ancestros cuidaban las lagunas altoandinas (qochas) y la importancia ecológica de los bosques de queñuales para atraer la lluvia.
          </p>
        </div>
      `;

      const btnPlayVideo = document.getElementById("btn-play-sim-video");
      btnPlayVideo.addEventListener("click", () => {
        this.playBeep(550, "sine", 0.15);
        btnPlayVideo.textContent = "⏸️ Pausar reproducción";
        btnPlayVideo.style.backgroundColor = "var(--color-verde-medio)";
      });
    }

    modal.classList.add("active");
  },

  bindAudioModalControls() {
    const playBtn = document.getElementById("btn-audio-play-toggle");
    const playerBox = document.getElementById("audio-player-box");
    const timeLabel = document.getElementById("audio-current-time");
    let seconds = 0;

    playBtn.addEventListener("click", () => {
      this.isAudioSimPlaying = !this.isAudioSimPlaying;
      if (this.isAudioSimPlaying) {
        this.playBeep(440, "sine", 0.1);
        playBtn.textContent = "⏸";
        playerBox.classList.add("playing");
        this.audioPlayingTimer = setInterval(() => {
          seconds++;
          const min = Math.floor(seconds / 60).toString().padStart(2, "0");
          const sec = (seconds % 60).toString().padStart(2, "0");
          if (timeLabel) timeLabel.textContent = `${min}:${sec} / 12:00`;
        }, 1000);
      } else {
        this.playBeep(330, "sine", 0.1);
        playBtn.textContent = "▶";
        playerBox.classList.remove("playing");
        clearInterval(this.audioPlayingTimer);
      }
    });

    // Pestañas de idioma
    const tabQuechua = document.getElementById("tab-quechua-btn");
    const tabCastellano = document.getElementById("tab-castellano-btn");
    const boxQuechua = document.getElementById("transcript-quechua-box");
    const boxCastellano = document.getElementById("transcript-castellano-box");

    tabQuechua.addEventListener("click", () => {
      tabQuechua.className = "btn btn-primary";
      tabCastellano.className = "btn btn-outline";
      boxQuechua.style.display = "block";
      boxCastellano.style.display = "none";
    });

    tabCastellano.addEventListener("click", () => {
      tabCastellano.className = "btn btn-primary";
      tabQuechua.className = "btn btn-outline";
      boxQuechua.style.display = "none";
      boxCastellano.style.display = "block";
    });
  },

  // Modal para el docente con la ficha del alumno
  abrirModalDocenteEstudiante(est) {
    const modal = document.getElementById("modal-docente-student");
    document.getElementById("modal-doc-student-name").textContent = est.nombre;
    document.getElementById("modal-doc-student-community").textContent = `Comunidad de ${est.comunidad}, Calca • Lengua: ${est.lengua}`;

    const body = document.getElementById("modal-doc-student-body");
    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div class="card" style="padding: 1rem; text-align: center;">
          <span style="font-size: 0.8rem; color: var(--color-texto-apagado);">Rendimiento Matemática</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--color-terracota); margin-top: 0.2rem;">
            ${est.puntajeMat !== null ? est.puntajeMat + '%' : 'Sin evaluar'}
          </div>
        </div>

        <div class="card" style="padding: 1rem; text-align: center;">
          <span style="font-size: 0.8rem; color: var(--color-texto-apagado);">Rendimiento Lectura</span>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--color-verde-medio); margin-top: 0.2rem;">
            ${est.puntajeLec !== null ? est.puntajeLec + '%' : 'Sin evaluar'}
          </div>
        </div>
      </div>

      <div class="focus-card-alert reforzar" style="margin-bottom: 1rem;">
        <strong>Diagnóstico de necesidades de aprendizaje:</strong>
        <p style="font-size: 0.88rem; margin-top: 0.25rem;">${est.necesidadClave}</p>
      </div>

      <div style="background: var(--color-tierra-suave); padding: 1rem; border-radius: var(--radio-md); margin-bottom: 1rem; font-size: 0.88rem;">
        <strong>Intereses y contexto cultural:</strong>
        <p style="margin-top: 0.25rem;">${est.interes} • Recomendación prioritaria en formatos offline (Radio / USB).</p>
      </div>

      <div style="border-top: 1px solid var(--color-borde); padding-top: 0.85rem;">
        <strong>Estado de alerta temprana:</strong>
        <span class="tag-calca" style="margin-left: 0.5rem; background: ${est.alerta === 'Estable' ? '#e8f5e9' : est.alerta === 'Excelente' ? '#e0f2fe' : '#fee2e2'}; color: ${est.alerta === 'Estable' ? '#166534' : est.alerta === 'Excelente' ? '#075985' : '#991b1b'};">
          ${est.alerta}
        </span>
      </div>
    `;

    modal.classList.add("active");
  },

  cerrarModales() {
    if (this.audioPlayingTimer) {
      clearInterval(this.audioPlayingTimer);
      this.isAudioSimPlaying = false;
    }
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  },

  // =========================================================================
  // VINCULACIÓN DE EVENTOS GLOBALES
  // =========================================================================
  bindGlobalEvents() {
    // Botones de cierre de modales
    document.getElementById("btn-close-material-modal").addEventListener("click", () => this.cerrarModales());
    document.getElementById("btn-modal-entendido").addEventListener("click", () => this.cerrarModales());
    document.getElementById("btn-close-docente-student-modal").addEventListener("click", () => this.cerrarModales());
    document.getElementById("btn-modal-docente-cerrar").addEventListener("click", () => this.cerrarModales());
    document.getElementById("btn-close-guide-modal").addEventListener("click", () => this.cerrarModales());
    document.getElementById("btn-modal-guide-cerrar").addEventListener("click", () => this.cerrarModales());

    // Clic fuera del modal para cerrar
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", e => {
        if (e.target === overlay) this.cerrarModales();
      });
    });

    // Barra de exposición académica (Píldoras 1 a 8)
    document.querySelectorAll(".tour-step-pill").forEach(pill => {
      pill.addEventListener("click", e => {
        const step = e.currentTarget.getAttribute("data-step");
        this.playBeep(500, "sine", 0.05);
        window.MochilaState.irAPantalla(step);
      });
    });

    // Botón Guía en la barra de tour
    document.getElementById("btn-open-guide").addEventListener("click", () => {
      document.getElementById("modal-presentation-guide").classList.add("active");
    });

    // Botón Reiniciar Demo
    document.getElementById("btn-reset-demo").addEventListener("click", () => {
      if (confirm("¿Deseas reiniciar el recorrido del prototipo al estado inicial?")) {
        window.MochilaState.reiniciarDemo();
      }
    });

    // Navegación cabecera
    document.getElementById("nav-brand-home").addEventListener("click", () => {
      window.MochilaState.irAPantalla("pantalla-1");
    });
    document.getElementById("btn-header-home").addEventListener("click", () => {
      window.MochilaState.irAPantalla("pantalla-1");
    });

    // Switcher de rol en cabecera
    document.getElementById("btn-role-estudiante").addEventListener("click", () => {
      window.MochilaState.setRol("estudiante");
    });
    document.getElementById("btn-role-docente").addEventListener("click", () => {
      window.MochilaState.setRol("docente");
    });
  }
};
