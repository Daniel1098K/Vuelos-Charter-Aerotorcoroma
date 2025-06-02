document.addEventListener("DOMContentLoaded", () => {
    const listaCompras = document.getElementById("lista-compras");
  
    function cargarBoletos() {
      const boletos = JSON.parse(localStorage.getItem("boletos") || "[]");
      listaCompras.innerHTML = "";
  
      if (boletos.length === 0) {
        listaCompras.innerHTML = "<p>No hay boletos seleccionados.</p>";
        return;
      }console.log("Boletos guardados:", JSON.parse(localStorage.getItem("boletos")));

  
      boletos.forEach((boleto, index) => {
        const div = document.createElement("div");
        div.classList.add("plan-card");
        div.innerHTML = `
          <h3>${boleto.plan}</h3>
          <p><strong>Ruta:</strong> ${boleto.origen} → ${boleto.destino}</p>
          <p><strong>Fecha:</strong> ${boleto.fecha}</p>
          <p><strong>Hora:</strong> ${boleto.hora}</p>
          <p><strong>Precio:</strong> ${boleto.precio}</p>
          <button class="cancelar-btn" data-index="${index}">Cancelar</button>
        `;
        listaCompras.appendChild(div);
      });
  
      // Asociar botones de cancelar
      document.querySelectorAll(".cancelar-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const i = parseInt(e.target.dataset.index);
          eliminarBoleto(i);
        });
      });
    }
  
    function eliminarBoleto(index) {
      let boletos = JSON.parse(localStorage.getItem("boletos") || "[]");
      boletos.splice(index, 1);
      localStorage.setItem("boletos", JSON.stringify(boletos));
      cargarBoletos();
    }
  
    document.getElementById("formulario-pago").addEventListener("submit", function(e) {
      e.preventDefault();
      alert("✅ Pago procesado exitosamente. ¡Gracias por su compra!");
      localStorage.removeItem("boletos");
      cargarBoletos();
    });
  
    cargarBoletos();
  });
  