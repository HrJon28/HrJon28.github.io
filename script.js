// =====================================================
// GUITARJON - JAVASCRIPT
// =====================================================

const productos = [

  {
    nombre: "Fender Stratocaster",
    tipo: "guitarra",
    precio: 12000,
    img: "Fender Stratocaster.jpg",
    descripcion:
      "Icono del rock con tres pastillas single-coil, mástil cómodo y sonido brillante y versátil."
  },

  {
    nombre: "Gibson Les Paul",
    tipo: "guitarra",
    precio: 35000,
    img: "Gibson Les Paul.jpg",
    descripcion:
      "Cuerpo de caoba, tapa de arce, humbuckers cálidos y sustain largo."
  },

  {
    nombre: "Boss DS-1",
    tipo: "pedal",
    precio: 1200,
    img: "Boss DS-1.jpg",
    descripcion:
      "Distorsión clásica perfecta para rock y riffs."
  },

  {
    nombre: "MXR Phase 90",
    tipo: "pedal",
    precio: 3000,
    img: "mxr phase 90.jpg",
    descripcion:
      "Efecto de fase clásico con sonido amplio y dinámico."
  },

  {
    nombre: "Valeton GP-5",
    tipo: "pedal",
    precio: 2999,
    img: "Valeton GP5.jpg",
    descripcion:
      "Multiefectos compacto con amplificadores, efectos e IRs."
  }

];


// =====================================================
// VARIABLES
// =====================================================

let carrito =
  JSON.parse(
    localStorage.getItem("carrito")
  ) || [];

let categoriaActual = "todos";


// =====================================================
// MOSTRAR PRODUCTOS
// =====================================================

function mostrarProductos() {

  const contenedor =
    document.getElementById("productos");

  if (!contenedor) return;

  const busqueda =
    document.getElementById("busqueda");

  const texto =
    busqueda
      ? busqueda.value.toLowerCase()
      : "";

  contenedor.innerHTML = "";

  const encontrados =
    productos.filter(producto => {

      const categoriaCorrecta =
        categoriaActual === "todos" ||
        producto.tipo === categoriaActual;

      const textoCorrecto =
        producto.nombre
          .toLowerCase()
          .includes(texto);

      return categoriaCorrecta &&
        textoCorrecto;

    });


  if (encontrados.length === 0) {

    contenedor.innerHTML = `
      <div class="sin-resultados">
        <h2>🔎 No encontramos productos</h2>
        <p>Prueba con otra búsqueda.</p>
      </div>
    `;

    return;
  }


  encontrados.forEach(producto => {

    const index =
      productos.indexOf(producto);

    const card =
      document.createElement("article");

    card.className = "card";

    card.innerHTML = `

      <div
        class="card-media"
        tabindex="0"
        role="group"
        aria-label="Información de ${producto.nombre}"
      >

        <img
          src="${producto.img}"
          alt="${producto.nombre}"
        >

        <p class="card-descripcion">
          ${producto.descripcion}
        </p>

      </div>


      <h3>
        ${producto.nombre}
      </h3>


      <p>
        $${producto.precio.toLocaleString("es-MX")}
      </p>


      <button
        type="button"
        class="btn-agregar"
        onclick="agregar(${index})"
      >
        Agregar al carrito 🛒
      </button>

    `;

    contenedor.appendChild(card);

  });

}


// =====================================================
// FILTROS
// =====================================================

function filtrarCategoria(categoria) {

  categoriaActual = categoria;

  const filtro =
    document.getElementById("filtro");

  if (filtro) {
    filtro.value = categoria;
  }

  mostrarProductos();
}


const filtro =
  document.getElementById("filtro");

if (filtro) {

  filtro.addEventListener(
    "change",
    () => {

      filtrarCategoria(
        filtro.value
      );

    }
  );

}


const busqueda =
  document.getElementById("busqueda");

if (busqueda) {

  busqueda.addEventListener(
    "input",
    mostrarProductos
  );

}


// =====================================================
// CARRITO
// =====================================================

function guardarCarrito() {

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

  actualizarCarrito();
}


function agregar(index) {

  if (!productos[index]) return;

  carrito.push(
    productos[index]
  );

  guardarCarrito();

  mostrarNotificacion(
    `${productos[index].nombre} agregado al carrito 🛒`
  );

}


function eliminar(index) {

  carrito.splice(index, 1);

  guardarCarrito();

}


function actualizarCarrito() {

  const lista =
    document.getElementById("lista");

  const total =
    document.getElementById("total");

  const badge =
    document.getElementById("badgeCarrito");

  if (lista) {

    lista.innerHTML = "";

    let suma = 0;


    carrito.forEach(
      (producto, index) => {

        suma +=
          Number(producto.precio);


        const li =
          document.createElement("li");

        li.className =
          "item-carrito";


        li.innerHTML = `

          <div class="item-info">

            <strong>
              ${producto.nombre}
            </strong>

            <span>
              $${producto.precio.toLocaleString("es-MX")}
            </span>

          </div>


          <button
            type="button"
            class="btn-eliminar"
            onclick="eliminar(${index})"
            aria-label="Eliminar producto"
          >
            🗑️
          </button>

        `;


        lista.appendChild(li);

      }
    );


    if (total) {

      total.textContent =
        suma.toLocaleString("es-MX");

    }

  }


  if (badge) {

    badge.textContent =
      carrito.length;

    badge.hidden =
      carrito.length === 0;

  }

}


// =====================================================
// PAGAR
// =====================================================

function pagar() {

  if (carrito.length === 0) {

    mostrarNotificacion(
      "El carrito está vacío.",
      true
    );

    return;

  }


  alert(
    "Pago simulado realizado 🎉"
  );


  carrito = [];

  guardarCarrito();

}


// =====================================================
// CARRITO LATERAL
// =====================================================

const panelCarrito =
  document.getElementById("carrito");

const backdropCarrito =
  document.getElementById("carritoBackdrop");

const btnCarrito =
  document.getElementById("btnCarrito");

const btnCerrarCarrito =
  document.getElementById(
    "btnCerrarCarrito"
  );


function abrirCarrito() {

  if (!panelCarrito) return;

  panelCarrito.classList.add(
    "abierto"
  );

  panelCarrito.setAttribute(
    "aria-hidden",
    "false"
  );


  if (backdropCarrito) {

    backdropCarrito.hidden =
      false;

    requestAnimationFrame(
      () => {

        backdropCarrito.classList.add(
          "visible"
        );

      }
    );

  }


  if (btnCarrito) {

    btnCarrito.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


function cerrarCarrito() {

  if (!panelCarrito) return;

  panelCarrito.classList.remove(
    "abierto"
  );

  panelCarrito.setAttribute(
    "aria-hidden",
    "true"
  );


  if (backdropCarrito) {

    backdropCarrito.classList.remove(
      "visible"
    );

    setTimeout(
      () => {

        backdropCarrito.hidden =
          true;

      },
      250
    );

  }


  if (btnCarrito) {

    btnCarrito.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function toggleCarrito() {

  if (!panelCarrito) return;

  if (
    panelCarrito.classList.contains(
      "abierto"
    )
  ) {

    cerrarCarrito();

  } else {

    abrirCarrito();

  }

}


if (btnCarrito) {

  btnCarrito.addEventListener(
    "click",
    toggleCarrito
  );

}


if (btnCerrarCarrito) {

  btnCerrarCarrito.addEventListener(
    "click",
    cerrarCarrito
  );

}


if (backdropCarrito) {

  backdropCarrito.addEventListener(
    "click",
    cerrarCarrito
  );

}


// =====================================================
// MODO OSCURO / CLARO
// =====================================================

const btnTema =
  document.getElementById("btnTema");


const temaGuardado =
  localStorage.getItem("tema");


if (
  temaGuardado === "claro"
) {

  document.body.classList.add(
    "modo-claro"
  );

}


function actualizarBotonTema() {

  if (!btnTema) return;

  const claro =
    document.body.classList.contains(
      "modo-claro"
    );


  btnTema.textContent =
    claro ? "🌙" : "☀️";


  btnTema.setAttribute(
    "aria-label",
    claro
      ? "Activar modo oscuro"
      : "Activar modo claro"
  );

}


if (btnTema) {

  btnTema.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "modo-claro"
      );


      const claro =
        document.body.classList.contains(
          "modo-claro"
        );


      localStorage.setItem(
        "tema",
        claro
          ? "claro"
          : "oscuro"
      );


      actualizarBotonTema();

    }
  );

}


actualizarBotonTema();


// =====================================================
// FORMULARIO DE CONTACTO
// =====================================================

const formulario =
  document.getElementById(
    "formContacto"
  );


if (formulario) {

  formulario.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const nombre =
        document.getElementById(
          "nombre"
        );

      const correo =
        document.getElementById(
          "correo"
        );

      const mensaje =
        document.getElementById(
          "mensaje"
        );


      if (
        !nombre.value.trim() ||
        !correo.value.trim() ||
        !mensaje.value.trim()
      ) {

        mostrarNotificacion(
          "Completa todos los campos.",
          true
        );

        return;

      }


      if (
        !correo.value.includes("@")
      ) {

        mostrarNotificacion(
          "Introduce un correo válido.",
          true
        );

        return;

      }


      mostrarNotificacion(
        "Mensaje enviado correctamente 📩"
      );


      formulario.reset();

    }
  );

}


// =====================================================
// NOTIFICACIONES
// =====================================================

function mostrarNotificacion(
  mensaje,
  error = false
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
    "notificacion";


  if (error) {

    notificacion.classList.add(
      "error"
    );

  }


  notificacion.textContent =
    mensaje;


  document.body.appendChild(
    notificacion
  );


  setTimeout(
    () => {

      notificacion.classList.add(
        "mostrar"
      );

    },
    10
  );


  setTimeout(
    () => {

      notificacion.classList.remove(
        "mostrar"
      );


      setTimeout(
        () => {

          notificacion.remove();

        },
        300
      );

    },
    2500
  );

}


// =====================================================
// ESCAPE
// =====================================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      cerrarCarrito();

    }

  }
);


// =====================================================
// DESCRIPCIÓN DE PRODUCTOS
// =====================================================

const contenedorProductos =
  document.getElementById(
    "productos"
  );


if (contenedorProductos) {

  contenedorProductos.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          ".btn-agregar"
        )
      ) {
        return;
      }


      const media =
        event.target.closest(
          ".card-media"
        );


      if (!media) return;


      contenedorProductos
        .querySelectorAll(
          ".card-media.descripcion-mostrada"
        )
        .forEach(elemento => {

          if (elemento !== media) {

            elemento.classList.remove(
              "descripcion-mostrada"
            );

          }

        });


      media.classList.toggle(
        "descripcion-mostrada"
      );

    }
  );


  contenedorProductos.addEventListener(
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


      if (!media) return;


      event.preventDefault();


      media.classList.toggle(
        "descripcion-mostrada"
      );

    }
  );

}


// =====================================================
// INICIAR
// =====================================================

mostrarProductos();

actualizarCarrito();