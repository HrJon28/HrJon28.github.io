/* =====================================================
   GUITARJON - JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCTOS
   ===================================================== */

   const productos = [

    {
      id: 1,
      nombre: "Fender Stratocaster",
      tipo: "guitarra",
      precio: 12000,
      stock: 5,
      rating: 5,
      img: "Fender Stratocaster.jpg",
      descripcion:
        "Icono del rock con tres pastillas single-coil, mástil cómodo y sonido brillante y versátil para blues, pop y rock."
    },
  
    {
      id: 2,
      nombre: "Gibson Les Paul",
      tipo: "guitarra",
      precio: 35000,
      stock: 3,
      rating: 5,
      img: "Gibson Les Paul.jpg",
      descripcion:
        "Cuerpo de caoba y tapa de arce, humbuckers cálidos y sustain largo; ideal para rock duro, jazz y leads densos."
    },
  
    {
      id: 3,
      nombre: "Boss DS-1",
      tipo: "pedal",
      precio: 1200,
      stock: 10,
      rating: 4,
      img: "Boss DS-1.jpg",
      descripcion:
        "Distorsión clásica y asequible con tono definido; perfecta como primera distorsión o para riff y ritmos cortantes."
    },
  
    {
      id: 4,
      nombre: "MXR Phase 90",
      tipo: "pedal",
      precio: 3000,
      stock: 6,
      rating: 5,
      img: "mxr phase 90.jpg",
      descripcion:
        "Efecto de fase de una sola perilla, textura ondulante setentera; deja brillar acordes limpios y solos cantables."
    },
  
    {
      id: 5,
      nombre: "Valeton GP-5",
      tipo: "pedal",
      precio: 2999,
      stock: 8,
      rating: 4,
      img: "Valeton GP5.jpg",
      descripcion:
        "Multiefectos compacto con amplis, IRs y carga de modelos; muchas opciones de sonido en un pedal de pedalera."
    }
  
  ];
  
  
  /* =====================================================
     VARIABLES
     ===================================================== */
  
  let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];
  
  let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];
  
  let modoOscuro =
    localStorage.getItem("modoOscuro") !== "false";
  
  let categoriaActual = "todos";
  
  
  /* =====================================================
     ELEMENTOS HTML
     ===================================================== */
  
  const contenedor =
    document.getElementById("productos");
  
  const lista =
    document.getElementById("lista");
  
  const total =
    document.getElementById("total");
  
  const panelCarrito =
    document.getElementById("carrito");
  
  const backdropCarrito =
    document.getElementById("carritoBackdrop");
  
  const btnCarrito =
    document.getElementById("btnCarrito");
  
  const btnCerrarCarrito =
    document.getElementById("btnCerrarCarrito");
  
  const btnTema =
    document.getElementById("btnTema");
  
  const btnFavoritos =
    document.getElementById("btnFavoritos");
  
  const busqueda =
    document.getElementById("busqueda");
  
  const filtro =
    document.getElementById("filtro");
  
  let timerOcultarBackdrop = null;
  
  
  /* =====================================================
     FORMATO DE PRECIO
     ===================================================== */
  
  function formatearPrecio(precio) {
  
    return new Intl.NumberFormat(
      "es-MX"
    ).format(precio);
  
  }
  
  
  /* =====================================================
     MOSTRAR PRODUCTOS
     ===================================================== */
  
  function mostrarProductos() {
  
    const texto =
      busqueda.value
        .toLowerCase()
        .trim();
  
    contenedor.innerHTML = "";
  
  
    const resultados =
      productos.filter(producto => {
  
        const categoriaCorrecta =
          categoriaActual === "todos" ||
          producto.tipo === categoriaActual;
  
        const busquedaCorrecta =
          producto.nombre
            .toLowerCase()
            .includes(texto) ||
  
          producto.descripcion
            .toLowerCase()
            .includes(texto) ||
  
          producto.tipo
            .toLowerCase()
            .includes(texto);
  
        return (
          categoriaCorrecta &&
          busquedaCorrecta
        );
  
      });
  
  
    resultados.forEach(producto => {
  
      const index =
        productos.indexOf(producto);
  
      const favorito =
        favoritos.includes(producto.id);
  
      const estrellas =
        "★".repeat(producto.rating) +
        "☆".repeat(5 - producto.rating);
  
      const agotado =
        producto.stock <= 0;
  
  
      contenedor.innerHTML += `
  
        <div class="card">
  
          <div
            class="card-media"
            tabindex="0"
            role="group"
            aria-label="Imagen y descripción de ${producto.nombre}"
          >
  
            <img
              src="${producto.img}"
              alt="${producto.nombre}"
            >
  
            <p class="card-descripcion">
              ${producto.descripcion}
            </p>
  
          </div>
  
  
          <button
            type="button"
            class="btn-favorito ${
              favorito
                ? "favorito-activo"
                : ""
            }"
            onclick="toggleFavorito(${producto.id})"
            aria-label="Agregar a favoritos"
          >
            ${
              favorito
                ? "♥"
                : "♡"
            }
          </button>
  
  
          <h3>
            ${producto.nombre}
          </h3>
  
  
          <p class="rating">
            ${estrellas}
  
            <span>
              (${producto.rating}/5)
            </span>
          </p>
  
  
          <p class="precio">
            $${formatearPrecio(producto.precio)}
          </p>
  
  
          <p
            class="stock ${
              producto.stock <= 2
                ? "stock-bajo"
                : ""
            }"
          >
            ${
              agotado
                ? "Agotado"
                : `Stock: ${producto.stock} unidades`
            }
          </p>
  
  
          <button
            type="button"
            class="btn-agregar"
            onclick="agregar(${index})"
            ${agotado ? "disabled" : ""}
          >
            ${
              agotado
                ? "Agotado"
                : "Agregar al carrito"
            }
          </button>
  
        </div>
  
      `;
  
    });
  
  
    if (
      contenedor.children.length === 0
    ) {
  
      contenedor.innerHTML = `
  
        <p class="sin-resultados">
          No se encontraron productos.
        </p>
  
      `;
  
    }
  
  }
  
  
  /* =====================================================
     FILTROS
     ===================================================== */
  
  function filtrarCategoria(categoria) {
  
    categoriaActual =
      categoria;
  
    filtro.value =
      categoria;
  
    mostrarProductos();
  
  }
  
  
  /* =====================================================
     AGREGAR AL CARRITO
     ===================================================== */
  
  function agregar(index) {
  
    const producto =
      productos[index];
  
    if (
      !producto ||
      producto.stock <= 0
    ) {
  
      return;
  
    }
  
  
    const existente =
      carrito.find(
        item =>
          item.id === producto.id
      );
  
  
    const cantidad =
      existente
        ? existente.cantidad
        : 0;
  
  
    if (
      cantidad >= producto.stock
    ) {
  
      mostrarNotificacion(
        "No hay más unidades disponibles.",
        "error"
      );
  
      return;
  
    }
  
  
    if (existente) {
  
      existente.cantidad++;
  
    } else {
  
      carrito.push({
        ...producto,
        cantidad: 1
      });
  
    }
  
  
    guardar();
  
  
    mostrarNotificacion(
      `${producto.nombre} agregado al carrito 🛒`
    );
  
  }
  
  
  /* =====================================================
     GUARDAR CARRITO
     ===================================================== */
  
  function guardar() {
  
    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );
  
    actualizar();
  
  }
  
  
  /* =====================================================
     ACTUALIZAR CARRITO
     ===================================================== */
  
  function actualizar() {
  
    lista.innerHTML = "";
  
    let suma = 0;
  
    let cantidadTotal = 0;
  
  
    carrito.forEach(
      (item, index) => {
  
        const cantidad =
          item.cantidad || 1;
  
        const subtotal =
          item.precio * cantidad;
  
  
        suma += subtotal;
  
        cantidadTotal +=
          cantidad;
  
  
        lista.innerHTML += `
  
          <li class="item-carrito">
  
            <div class="item-info">
  
              <strong>
                ${item.nombre}
              </strong>
  
              <span>
                $${formatearPrecio(item.precio)}
                c/u
              </span>
  
              <span>
                Subtotal:
                $${formatearPrecio(subtotal)}
              </span>
  
            </div>
  
  
            <div class="controles-cantidad">
  
              <button
                type="button"
                onclick="cambiarCantidad(${index}, -1)"
              >
                −
              </button>
  
              <span>
                ${cantidad}
              </span>
  
              <button
                type="button"
                onclick="cambiarCantidad(${index}, 1)"
              >
                +
              </button>
  
              <button
                type="button"
                class="btn-eliminar"
                onclick="eliminar(${index})"
              >
                🗑️
              </button>
  
            </div>
  
          </li>
  
        `;
  
      }
    );
  
  
    total.textContent =
      formatearPrecio(suma);
  
  
    const badge =
      document.getElementById(
        "badgeCarrito"
      );
  
  
    badge.textContent =
      cantidadTotal;
  
    badge.hidden =
      cantidadTotal === 0;
  
  }
  
  
  /* =====================================================
     CAMBIAR CANTIDAD
     ===================================================== */
  
  function cambiarCantidad(
    index,
    cambio
  ) {
  
    const item =
      carrito[index];
  
    if (!item) {
      return;
    }
  
  
    const producto =
      productos.find(
        producto =>
          producto.id === item.id
      );
  
  
    const nuevaCantidad =
      (item.cantidad || 1) +
      cambio;
  
  
    if (
      nuevaCantidad <= 0
    ) {
  
      eliminar(index);
  
      return;
  
    }
  
  
    if (
      producto &&
      nuevaCantidad >
        producto.stock
    ) {
  
      mostrarNotificacion(
        "Has alcanzado el límite de stock.",
        "error"
      );
  
      return;
  
    }
  
  
    item.cantidad =
      nuevaCantidad;
  
    guardar();
  
  }
  
  
  /* =====================================================
     ELIMINAR DEL CARRITO
     ===================================================== */
  
  function eliminar(index) {
  
    if (!carrito[index]) {
      return;
    }
  
  
    const nombre =
      carrito[index].nombre;
  
  
    carrito.splice(
      index,
      1
    );
  
  
    guardar();
  
  
    mostrarNotificacion(
      `${nombre} eliminado del carrito`
    );
  
  }
  
  
  /* =====================================================
     FAVORITOS
     ===================================================== */
  
  function toggleFavorito(id) {
  
    if (
      favoritos.includes(id)
    ) {
  
      favoritos =
        favoritos.filter(
          favoritoId =>
            favoritoId !== id
        );
  
      mostrarNotificacion(
        "Producto eliminado de favoritos"
      );
  
    } else {
  
      favoritos.push(id);
  
      mostrarNotificacion(
        "Producto agregado a favoritos ❤️"
      );
  
    }
  
  
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  
  
    mostrarProductos();
  
  }
  
  
  /* =====================================================
     MOSTRAR FAVORITOS
     ===================================================== */
  
  function mostrarSoloFavoritos() {
  
    const texto =
      busqueda.value
        .toLowerCase()
        .trim();
  
  
    contenedor.innerHTML = "";
  
  
    const resultados =
      productos.filter(
        producto =>
          favoritos.includes(
            producto.id
          ) &&
  
          (
            producto.nombre
              .toLowerCase()
              .includes(texto) ||
  
            producto.descripcion
              .toLowerCase()
              .includes(texto)
          )
      );
  
  
    resultados.forEach(producto => {
  
      const index =
        productos.indexOf(producto);
  
      const estrellas =
        "★".repeat(producto.rating) +
        "☆".repeat(
          5 - producto.rating
        );
  
  
      contenedor.innerHTML += `
  
        <div class="card">
  
          <div
            class="card-media"
            tabindex="0"
          >
  
            <img
              src="${producto.img}"
              alt="${producto.nombre}"
            >
  
            <p class="card-descripcion">
              ${producto.descripcion}
            </p>
  
          </div>
  
  
          <button
            type="button"
            class="btn-favorito favorito-activo"
            onclick="toggleFavorito(${producto.id})"
          >
            ♥
          </button>
  
  
          <h3>
            ${producto.nombre}
          </h3>
  
  
          <p class="rating">
            ${estrellas}
  
            <span>
              (${producto.rating}/5)
            </span>
          </p>
  
  
          <p class="precio">
            $${formatearPrecio(producto.precio)}
          </p>
  
  
          <p class="stock">
            Stock:
            ${producto.stock}
            unidades
          </p>
  
  
          <button
            type="button"
            class="btn-agregar"
            onclick="agregar(${index})"
          >
            Agregar al carrito
          </button>
  
        </div>
  
      `;
  
    });
  
  
    if (
      resultados.length === 0
    ) {
  
      contenedor.innerHTML = `
  
        <p class="sin-resultados">
          No tienes productos favoritos todavía.
        </p>
  
      `;
  
    }
  
  }
  
  
  /* =====================================================
     NOTIFICACIONES
     ===================================================== */
  
  function mostrarNotificacion(
    mensaje,
    tipo = "exito"
  ) {
  
    const anterior =
      document.querySelector(
        ".notificacion"
      );
  
  
    if (anterior) {
      anterior.remove();
    }
  
  
    const notificacion =
      document.createElement(
        "div"
      );
  
  
    notificacion.className =
      `notificacion ${tipo}`;
  
  
    notificacion.textContent =
      mensaje;
  
  
    document.body.appendChild(
      notificacion
    );
  
  
    requestAnimationFrame(() => {
  
      notificacion.classList.add(
        "mostrar"
      );
  
    });
  
  
    setTimeout(() => {
  
      notificacion.classList.remove(
        "mostrar"
      );
  
  
      setTimeout(() => {
  
        notificacion.remove();
  
      }, 300);
  
    }, 2500);
  
  }
  
  
  /* =====================================================
     MODO CLARO / OSCURO
     ===================================================== */
  
  function aplicarTema() {
  
    document.body.classList.toggle(
      "modo-oscuro",
      modoOscuro
    );
  
  
    document.body.classList.toggle(
      "modo-claro",
      !modoOscuro
    );
  
  
    btnTema.textContent =
      modoOscuro
        ? "☀️"
        : "🌙";
  
  
    btnTema.setAttribute(
      "aria-label",
      modoOscuro
        ? "Cambiar a modo claro"
        : "Cambiar a modo oscuro"
    );
  
  
    localStorage.setItem(
      "modoOscuro",
      modoOscuro
    );
  
  }
  
  
  function toggleModoOscuro() {
  
    modoOscuro =
      !modoOscuro;
  
    aplicarTema();
  
  }
  
  
  /* =====================================================
     CARRITO LATERAL
     ===================================================== */
  
  function carritoEstaAbierto() {
  
    return panelCarrito
      .classList
      .contains("abierto");
  
  }
  
  
  function abrirCarrito() {
  
    clearTimeout(
      timerOcultarBackdrop
    );
  
  
    panelCarrito.classList.add(
      "abierto"
    );
  
  
    backdropCarrito.hidden =
      false;
  
  
    requestAnimationFrame(() => {
  
      backdropCarrito.classList.add(
        "visible"
      );
  
    });
  
  
    panelCarrito.setAttribute(
      "aria-hidden",
      "false"
    );
  
  
    btnCarrito.setAttribute(
      "aria-expanded",
      "true"
    );
  
  
    btnCarrito.setAttribute(
      "aria-label",
      "Cerrar carrito"
    );
  
  }
  
  
  function cerrarCarrito() {
  
    clearTimeout(
      timerOcultarBackdrop
    );
  
  
    panelCarrito.classList.remove(
      "abierto"
    );
  
  
    backdropCarrito.classList.remove(
      "visible"
    );
  
  
    panelCarrito.setAttribute(
      "aria-hidden",
      "true"
    );
  
  
    btnCarrito.setAttribute(
      "aria-expanded",
      "false"
    );
  
  
    btnCarrito.setAttribute(
      "aria-label",
      "Abrir carrito"
    );
  
  
    timerOcultarBackdrop =
      setTimeout(() => {
  
        backdropCarrito.hidden =
          true;
  
      }, 280);
  
  }
  
  
  function toggleCarrito() {
  
    if (
      carritoEstaAbierto()
    ) {
  
      cerrarCarrito();
  
    } else {
  
      abrirCarrito();
  
    }
  
  }
  
  
  /* =====================================================
     PAGAR
     ===================================================== */
  
  function pagar() {
  
    if (
      carrito.length === 0
    ) {
  
      mostrarNotificacion(
        "Tu carrito está vacío.",
        "error"
      );
  
      return;
  
    }
  
  
    const cantidad =
      carrito.reduce(
        (total, item) =>
          total +
          (item.cantidad || 1),
        0
      );
  
  
    const totalCompra =
      carrito.reduce(
        (total, item) =>
          total +
          item.precio *
          (item.cantidad || 1),
        0
      );
  
  
    alert(
      `Pago simulado realizado 🎉
  
  Productos: ${cantidad}
  
  Total: $${formatearPrecio(totalCompra)}`
    );
  
  
    carrito = [];
  
  
    guardar();
  
  
    cerrarCarrito();
  
  }
  
  
  /* =====================================================
     EVENTOS
     ===================================================== */
  
  btnCarrito.addEventListener(
    "click",
    toggleCarrito
  );
  
  
  btnCerrarCarrito.addEventListener(
    "click",
    cerrarCarrito
  );
  
  
  backdropCarrito.addEventListener(
    "click",
    cerrarCarrito
  );
  
  
  btnTema.addEventListener(
    "click",
    toggleModoOscuro
  );
  
  
  btnFavoritos.addEventListener(
    "click",
    mostrarSoloFavoritos
  );
  
  
  busqueda.addEventListener(
    "input",
    mostrarProductos
  );
  
  
  filtro.addEventListener(
    "change",
    event => {
  
      filtrarCategoria(
        event.target.value
      );
  
    }
  );
  
  
  /* =====================================================
     INTERACCIÓN CON IMÁGENES
     ===================================================== */
  
  contenedor.addEventListener(
    "click",
    event => {
  
      if (
        event.target.closest(
          ".btn-agregar"
        ) ||
  
        event.target.closest(
          ".btn-favorito"
        )
      ) {
  
        return;
  
      }
  
  
      const media =
        event.target.closest(
          ".card-media"
        );
  
  
      contenedor
        .querySelectorAll(
          ".card-media.descripcion-mostrada"
        )
        .forEach(elemento => {
  
          if (
            elemento !== media
          ) {
  
            elemento.classList.remove(
              "descripcion-mostrada"
            );
  
          }
  
        });
  
  
      if (media) {
  
        media.classList.toggle(
          "descripcion-mostrada"
        );
  
      }
  
    }
  );
  
  
  contenedor.addEventListener(
    "keydown",
    event => {
  
      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
  
        return;
  
      }
  
  
      const media =
        event.target.closest(
          ".card-media"
        );
  
  
      if (
        !media ||
        !contenedor.contains(
          media
        )
      ) {
  
        return;
  
      }
  
  
      event.preventDefault();
  
  
      media.classList.toggle(
        "descripcion-mostrada"
      );
  
    }
  );
  
  
  /* =====================================================
     TECLA ESC
     ===================================================== */
  
  document.addEventListener(
    "keydown",
    event => {
  
      if (
        event.key !== "Escape"
      ) {
  
        return;
  
      }
  
  
      if (
        carritoEstaAbierto()
      ) {
  
        cerrarCarrito();
  
      } else {
  
        document
          .querySelectorAll(
            ".card-media.descripcion-mostrada"
          )
          .forEach(elemento => {
  
            elemento.classList.remove(
              "descripcion-mostrada"
            );
  
          });
  
      }
  
    }
  );
  
  
  /* =====================================================
     INICIAR APP
     ===================================================== */
  
  aplicarTema();
  
  mostrarProductos();
  
  actualizar();