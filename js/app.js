/**
 * Mochila Educativa Offline - Archivo Principal de Inicialización (App.js)
 * Conecta eventos, listeners del State y atajos de teclado para la exposición.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar el estado de la aplicación
  window.MochilaState.init();

  // 2. Suscribir la interfaz a los cambios de estado
  window.MochilaState.subscribe((evento, payload, state) => {
    switch (evento) {
      case "cambio_pantalla":
        window.MochilaUI.renderPantalla(payload.pantallaId);
        break;

      case "abrir_modal":
        if (payload.tipo === "material") {
          window.MochilaUI.abrirModalMaterial(payload.data);
        } else if (payload.tipo === "docente-alumno") {
          window.MochilaUI.abrirModalDocenteEstudiante(payload.data);
        }
        break;

      case "cerrar_modal":
        window.MochilaUI.cerrarModales();
        break;

      case "demo_reiniciada":
        window.MochilaUI.renderPantalla("pantalla-1");
        break;

      case "actividad_toggle":
        // Reflejar en el panel del estudiante si está activo
        window.MochilaUI.renderPanelEstudiante();
        break;
    }
  });

  // 3. Inicializar la Interfaz de Usuario
  window.MochilaUI.init();

  // 4. Vincular Botones de Pantalla 1 (Bienvenida)
  document.getElementById("btn-welcome-estudiante").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.setRol("estudiante");
  });

  document.getElementById("btn-welcome-docente").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.setRol("docente");
  });

  // 5. Vincular Botones de Pantalla 2 (Panel Estudiante)
  const irADiagnosticoOResultados = () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    if (window.MochilaState.diagnostico.completado) {
      window.MochilaState.irAPantalla("pantalla-4");
    } else {
      window.MochilaState.irAPantalla("pantalla-3");
    }
  };

  document.getElementById("btn-iniciar-diagnostico-p2").addEventListener("click", irADiagnosticoOResultados);
  document.getElementById("btn-card-diagnostico").addEventListener("click", irADiagnosticoOResultados);

  document.getElementById("btn-card-ruta").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.irAPantalla("pantalla-6");
  });

  document.getElementById("btn-card-materiales").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.irAPantalla("pantalla-5");
  });

  // 6. Vincular Botones de Pantalla 3 (Diagnóstico)
  document.getElementById("btn-quiz-prev").addEventListener("click", () => {
    const idx = window.MochilaState.diagnostico.preguntaActual;
    window.MochilaState.setPreguntaIndex(idx - 1);
    window.MochilaUI.renderPreguntaActual();
  });

  document.getElementById("btn-quiz-next").addEventListener("click", () => {
    const idx = window.MochilaState.diagnostico.preguntaActual;
    window.MochilaState.setPreguntaIndex(idx + 1);
    window.MochilaUI.renderPreguntaActual();
  });

  document.getElementById("btn-quiz-finish").addEventListener("click", () => {
    window.MochilaUI.playBeep(700, "sine", 0.2);
    window.MochilaState.finalizarDiagnostico();
  });

  // 7. Vincular Botón de Pantalla 4 (Resultados -> Disparar IA)
  document.getElementById("btn-generar-ruta-ia").addEventListener("click", () => {
    window.MochilaUI.playBeep(550, "sine", 0.1);
    window.MochilaState.irAPantalla("pantalla-5");
    // Iniciar automáticamente la simulación visual del recomendador
    setTimeout(() => {
      window.MochilaUI.ejecutarSimulacionIA();
    }, 300);
  });

  // 8. Vincular Botón de Pantalla 5 (Recomendador -> Ruta Semanal)
  document.getElementById("btn-ir-ruta-calendario").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.irAPantalla("pantalla-6");
  });

  // 9. Vincular Botón de Pantalla 7 (Docente -> Atajo a Distribución)
  document.getElementById("btn-docente-distrib-shortcut").addEventListener("click", () => {
    window.MochilaUI.playBeep(520, "sine", 0.08);
    window.MochilaState.irAPantalla("pantalla-8");
  });

  // 10. Vincular Botón de Pantalla 8 (Iniciar USB Transfer)
  document.getElementById("btn-iniciar-usb").addEventListener("click", () => {
    window.MochilaUI.ejecutarTransferenciaUSB();
  });

  // 11. Atajos de teclado para la presentación académica
  document.addEventListener("keydown", e => {
    // Si hay un modal abierto, cerrar con Escape
    if (e.key === "Escape") {
      window.MochilaUI.cerrarModales();
      return;
    }

    // Tecla 1 a 8 para saltar directamente a pantallas durante la exposición
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 1 && num <= 8 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // Solo si el usuario no está en un input
      if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        window.MochilaState.irAPantalla(`pantalla-${num}`);
      }
    }
  });

  console.log("✅ Mochila Educativa Offline inicializada con éxito.");
});
