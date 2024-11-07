const recursos = {
  guias: [
    {
      id: 1,
      titulo: "Manos con voz",
      descripcion: "Diccionario de Lengua de Señas Mexicana",
      formato: "PDF",
      tamaño: "15.7 MB",
      url: "http://localhost/SITIOWEBLSM/guias/DiccionarioLSM.pdf",
    },
    {
      id: 2,
      titulo: "LSM",
      descripcion: "DICCIONARIO DE LENGUA DE SEÑAS MEXICANA DE LA CIUDAD DE MÉXICO",
      formato: "PDF",
      tamaño: "19.8 MB",
      url: "http://localhost/SITIOWEBLSM/guias/Dic_LSM2.pdf",
    },
  ],
  apps: [
    {
      id: 1,
      nombre: "LSM Aprende",
      plataforma: "Android",
      descripcion: "Aplicación interactiva para aprender LSM",
      url: "https://play.google.com/store/apps/details?id=app.benygz.lsmaprende",
    },
    {
      id: 2,
      nombre: "Intersign - Aprende LSM",
      plataforma: "Android",
      descripcion: "Aprende Lengua de Señas de una manera Divertida",
      url: "https://play.google.com/store/apps/details?id=intersign.aprender.lsm",
    },
  ],
  enlaces: [
    {
      id: 1,
      nombre: "Academia de LSM",
      descripcion: "Recursos oficiales y certificaciones",
      url: "https://www.lsm.cdmx.gob.mx",
    },
    {
      id: 2,
      nombre: "Día Nacional de la Lengua de Señas Mexicana (LSM)",
      descripcion: "Foro de información",
      url: "https://www.gob.mx/conadis/articulos/dia-nacional-de-la-lengua-de-senas-mexicana-lsm?idiom=es",
    },
  ],
};

// Función para cargar los recursos
function cargarRecursos() {
  // Cargar guías
  const guiasContainer = document.getElementById("guias-container");
  recursos.guias.forEach((guia) => {
    const guiaHTML = `
        <div class="resource-card">
            <div class="d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-file-pdf me-2"></i>${guia.titulo}</h5>
                <button class="btn btn-sm btn-primary" onclick="descargarGuia('${guia.url}')">
                    <i class="fas fa-download"></i>
                </button>
            </div>
            <p class="mb-2">${guia.descripcion}</p>
            <small class="text-muted">
                <i class="fas fa-info-circle me-1"></i>
                ${guia.formato} - ${guia.tamaño}
            </small>
        </div>
    `;
    guiasContainer.innerHTML += guiaHTML;
  });

  // Cargar apps
  const appsContainer = document.getElementById("apps-container");
  recursos.apps.forEach((app) => {
    const appHTML = `
        <div class="resource-card">
            <div class="d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-mobile-alt me-2"></i>${app.nombre}</h5>
                <a href="${app.url}" class="btn btn-sm btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <p class="mb-2">${app.descripcion}</p>
            <small class="text-muted">
                <i class="fas fa-mobile-screen me-1"></i>
                Disponible para ${app.plataforma}
            </small>
        </div>
    `;
    appsContainer.innerHTML += appHTML;
  });

  // Cargar enlaces
  const enlacesContainer = document.getElementById("enlaces-container");
  recursos.enlaces.forEach((enlace) => {
    const enlaceHTML = `
        <div class="resource-card">
            <div class="d-flex justify-content-between align-items-center">
                <h5><i class="fas fa-link me-2"></i>${enlace.nombre}</h5>
                <a href="${enlace.url}" class="btn btn-sm btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <p class="mb-0">${enlace.descripcion}</p>
        </div>
    `;
    enlacesContainer.innerHTML += enlaceHTML;
  });
}

// Función para descargar guías
function descargarGuia(url) {
  alert("Iniciando descarga de: " + url); // Mensaje de alerta
  const a = document.createElement('a'); // Crea un elemento de enlace
  a.href = url; // Establece la URL del archivo
  a.download = ''; // El atributo 'download' inicia la descarga en lugar de abrir el archivo
  document.body.appendChild(a); // Añade el enlace al DOM
  a.click(); // Simula un clic en el enlace
  document.body.removeChild(a); // Elimina el enlace después de la descarga
}


// Manejo del formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    mensaje: formData.get("mensaje"),
  };

  // Validación básica
  if (!data.nombre || !data.email || !data.mensaje) {
    mostrarAlerta("Por favor, completa todos los campos requeridos", "error");
    return;
  }

  //deshabilitar el botón de envío
  const submitButton = document.getElementById("submitButton"); // Asegúrate de que tu botón tenga este ID
  submitButton.disabled = true;

  // Aquí iría la llamada al backend
  //enviarFormulario(data);
  enviarFormulario(data).finally(() => {
    // Reactivar el botón después de 10 segundos
    setTimeout(() => {
      submitButton.disabled = false;
    }, 10000);
  });
});

async function enviarFormulario(data) {
  try {
    const response = await fetch("enviarCorreo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });

    const result = await response.text();
    if (result === "success") {
      // Limpiar formulario
      document.getElementById("contactForm").reset();
      mostrarAlerta(
        "¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.",
        "success"
      );
    } else {
      mostrarAlerta("Hubo un error al enviar el mensaje: " + result, "error");
    }
  } catch (error) {
    mostrarAlerta(
      "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",
      "error"
    );
  }
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
  const alertaDiv = document.createElement("div");
  alertaDiv.className = `alert alert-${
    tipo === "error" ? "danger" : "success"
  } alert-dismissible fade show`;
  alertaDiv.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
`;

  const container = document.querySelector(".contact-form-container");
  container.insertBefore(alertaDiv, container.firstChild);

  // Auto-cerrar después de 5 segundos
  setTimeout(() => {
    alertaDiv.remove();
  }, 5000);
}

function mostrarMensaje() {
  alert("Estamos trabajando sobre la versión beta. Si deseas más información, por favor contáctame a través de mi correo: ");
}

// Cargar recursos cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
  console.log("Funciones.js cargado correctamente.");
  cargarRecursos(); // Llama a la función para cargar recursos
});
