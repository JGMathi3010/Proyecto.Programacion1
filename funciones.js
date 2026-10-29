const botones = document.querySelectorAll(".boton:not([type='submit'])");

for (let i = 0; i < botones.length; i++) {
  const boton = botones[i];
  boton.addEventListener("click", function () {
    boton.textContent = "Agregado ✓";
    boton.style.backgroundColor = "#12293B";
  });
}

const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro");

if (buscador && filtro) {
  const tarjetas = document.querySelectorAll("#listaTarjetas .tarjeta");
  const mensajeVacio = document.getElementById("mensajeVacio");

  function filtrarTarjetas() {
    const texto = buscador.value.toLowerCase();
    const categoria = filtro.value;
    let visibles = 0;

    for (let i = 0; i < tarjetas.length; i++) {
      const tarjeta = tarjetas[i];
      const titulo = tarjeta.querySelector("h3").textContent.toLowerCase();
      const coincideTexto = titulo.includes(texto);
      const coincideCategoria = categoria === "todos" || tarjeta.dataset.categoria === categoria;

      if (coincideTexto && coincideCategoria) {
        tarjeta.style.display = "block";
        visibles = visibles + 1;
      } else {
        tarjeta.style.display = "none";
      }
    }

    mensajeVacio.hidden = visibles !== 0;
  }

  buscador.addEventListener("input", filtrarTarjetas);
  filtro.addEventListener("change", filtrarTarjetas);
}

const formulario = document.getElementById("formularioContacto");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeFormulario = document.getElementById("mensajeFormulario");

    if (nombre === "" || correo === "" || telefono === "" || asunto === "" || mensaje === "") {
      mensajeFormulario.textContent = "⚠ Debe llenar todos los campos.";
      mensajeFormulario.style.color = "#C1552E";
    } else if (!correo.includes("@") || !correo.includes(".")) {
      mensajeFormulario.textContent = "⚠ El correo electrónico no es válido.";
      mensajeFormulario.style.color = "#C1552E";
    } else if (mensaje.length < 10) {
      mensajeFormulario.textContent = "⚠ El mensaje debe tener al menos 10 caracteres.";
      mensajeFormulario.style.color = "#C1552E";
    } else {
      mensajeFormulario.textContent = "✓ Formulario enviado correctamente.";
      mensajeFormulario.style.color = "#12293B";
      formulario.reset();
    }
  });
}