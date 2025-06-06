// planes.js

const rutas = [
    { destino: "Bogotá", fecha: "2025-06-01", hora: "09:00", plan: "Plan Básico", precio: 3200000 },
    { destino: "Cúcuta", fecha: "2025-06-01", hora: "17:00", plan: "Plan Ejecutivo", precio: 6800000 },
    { destino: "Santa Marta", fecha: "2025-06-02", hora: "11:30", plan: "Plan Ejecutivo", precio: 6800000 },
    { destino: "Medellín", fecha: "2025-05-30", hora: "08:00", plan: "Plan Básico", precio: 3200000 }, // Ya salió
    { destino: "Barranquilla", fecha: "2025-06-03", hora: "10:00", plan: "Avión Ambulancia", precio: 9500000, agotado: true }
  ];
  
  const carrito = [];
  
  function cargarRutas() {
  const tabla = document.getElementById('tabla-rutas');
  const ahora = new Date();

  rutas.forEach((ruta) => {
    const fechaHoraVuelo = new Date(`${ruta.fecha}T${ruta.hora}`);
    let estado = "";

    if (fechaHoraVuelo < ahora) {
      estado = "Vuelo ya salió";
    } else if (ruta.agotado) {
      estado = "Agotado";
    } else {
      estado = "Disponible";
    }

    const fila = `
      <tr>
        <td>Ocaña</td>
        <td>${ruta.destino}</td>
        <td>${ruta.fecha}</td>
        <td>${ruta.hora}</td>
        <td>${ruta.plan}</td>
        <td>${estado}</td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

  
  function agregarAlCarrito(index) {
    const boleto = rutas[index];
    carrito.push(boleto);
    actualizarCarritoUI();
  
    // Guardar en localStorage para la página de compra
    const boletosGuardados = JSON.parse(localStorage.getItem("boletos") || "[]");
    boletosGuardados.push({
      destino: boleto.destino,
      fecha: boleto.fecha,
      hora: boleto.hora,
      plan: boleto.plan,
      precio: boleto.precio,
      origen: "Ocaña" // puedes cambiar el origen si es variable
    });
    localStorage.setItem("boletos", JSON.stringify(boletosGuardados));
  }
  
  
  function actualizarCarritoUI() {
    const detalle = document.getElementById('detalle-carrito');
    if (carrito.length === 0) {
      detalle.innerHTML = "<p>No hay boletos en el carrito.</p>";
    } else {
      detalle.innerHTML = carrito.map((item, i) => `
        <div>
          ${item.destino} - ${item.fecha} ${item.hora}<br>
          ${item.plan} - $${item.precio.toLocaleString()} COP
        </div>
      `).join("");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    cargarRutas();
  
    const carritoBtn = document.getElementById('carrito-flotante');
    const detalle = document.getElementById('detalle-carrito');
  
    carritoBtn.addEventListener("mouseenter", () => {
      detalle.classList.remove('oculto');
    });
  
    carritoBtn.addEventListener("mouseleave", () => {
      detalle.classList.add('oculto');
    });
  
    carritoBtn.addEventListener("click", () => {
      window.location.href = "comprar.html";
    });
  });

  const planes = document.querySelectorAll('.plan-card');
const tooltip = document.getElementById('tooltip');
const tooltipTitle = document.getElementById('tooltip-title');
const tooltipText = document.getElementById('tooltip-text');
const tooltipImages = document.getElementById('tooltip-images');

const datosTooltip = {

  "Servicio Ejecutivo": {
    texto: "Comodidad y eficiencia para ejecutivos en movimiento.",
    imagenes: ["file/500736831_1233923131431341_6699981947240523130_n.webp", "file/plan.webp"]
  },
  "Servicio Jet SABRE 65": {
    texto: "Lujo, velocidad y alcance para vuelos VIP nacionales e internacionales.",
    imagenes: ["file/JetSabre2.webp", "file/JetSabre1.webp"]
  },
  "Servicio Jetstream 32": {
  texto: "El Jetstream 32 es ideal para vuelos chárter de corto alcance con grupos medianos. Cuenta con capacidad para 19 pasajeros, cabina presurizada y excelente rendimiento en pistas cortas.",
  imagenes: ["file/JetSteam322.webp", "file/JetStrean321.webp"]
}
};

planes.forEach(card => {
  const title = card.querySelector('h3').textContent;

  card.addEventListener('mouseenter', (e) => {
    const datos = datosTooltip[title];
    if (!datos) return;

    tooltipTitle.textContent = title;
    tooltipText.textContent = datos.texto;

    tooltipImages.innerHTML = ""; 
    datos.imagenes.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      tooltipImages.appendChild(img);
    });

    tooltip.classList.remove('hidden');
  });

  card.addEventListener('mousemove', (e) => {
    tooltip.style.top = e.pageY + 15 + "px";
    tooltip.style.left = e.pageX + 15 + "px";
  });

  card.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
  });
});

  
