const listadoArticulos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal pensado para prácticas de combate.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Dobok autorizado para torneos de nivel internacional.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo resistente para rutinas de entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos 25×25 cm ideal para práctica.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description: "Guantes de 10 oz aptos para competencias oficiales.",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de pie homologados para torneos.",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-pie.webp",
  },
];

let mostrarDetalle = (indiceElegido) => {
  document.getElementById("titulo-prod").innerText = listadoArticulos[indiceElegido].nombre;
  document.getElementById("descr-prod").innerText = listadoArticulos[indiceElegido].description;
  document.getElementById("detalle").style.display = "block";
};

let cerrarModal = () => {
  document.getElementById("detalle").style.display = "none";
};

let mostrarCatalogo = (coleccion = listadoArticulos) => {
  // armo el bloque de tarjetas
  let bloque = "";

  coleccion.forEach((art, pos) => {
    bloque += `
    <div class="card">
      <img src="images/${art.imagen}" alt="${art.nombre}" />
      <h3>${art.nombre}</h3>
      <p>${formatearPrecio(art.precio)}</p>
      <button type="button" onclick="mostrarDetalle(${pos})"> Ver Detalle </button>
      <button type="button" onclick="agregarAlCarrito(${pos})"> Agregar al Carrito </button>
    </div>`;
  });

  document.getElementById("catalogo").innerHTML = bloque;
};

let agregarAlCarrito = (posicion) => {
  // guardo ids en localStorage, nada sofisticado
  let bolsa = localStorage.getItem("carrito");

  if (!bolsa || bolsa === "undefined") {
    bolsa = [];
  } else {
    bolsa = JSON.parse(bolsa);
  }

  bolsa.push(posicion);
  localStorage.setItem("carrito", JSON.stringify(bolsa));
  contarProductos();
};

let cargarCarrito = () => {
  const crudo = localStorage.getItem("carrito");

  if (!crudo || crudo === "undefined") {
    document.getElementById("carrito").innerHTML = "<div>Tu carrito no tiene artículos.</div>";
    return;
  }

  const carrito = JSON.parse(crudo);

  const idsUnicos = [];
  const cantidades = [];
  let html = "";
  let montoTotal = 0;

  carrito.forEach((codigo) => {
    if (!idsUnicos.includes(codigo)) {
      idsUnicos.push(codigo);
      cantidades.push(1);
    } else {
      const donde = idsUnicos.indexOf(codigo);
      cantidades[donde] += 1;
    }
  });

  idsUnicos.forEach((codigo, i) => {
    const prod = listadoArticulos[codigo];
    const indiceParaQuitar = carrito.indexOf(codigo);

    html += `
      <div>
        <h3>${prod.nombre}</h3>
        <p>${formatearPrecio(prod.precio)}</p>
        <p>Cantidad: ${cantidades[i]}</p>
        <button type="button" onclick="eliminarProducto(${indiceParaQuitar})">Quitar producto</button>
      </div>
    `;
    montoTotal += prod.precio * cantidades[i];
  });

  html += `<div>Total: ${formatearPrecio(montoTotal)}</div>`;
  html += `<button type="button" onclick="vaciarCarrito()">Vaciar Carrito</button>`;
  document.getElementById("carrito").innerHTML = html;
};

let vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  contarProductos();
  window.location.reload();
};

let eliminarProducto = (indice) => {
  let bolsa = localStorage.getItem("carrito");
  bolsa = JSON.parse(bolsa);
  bolsa.splice(indice, 1);

  if (bolsa.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(bolsa));
  } else {
    localStorage.removeItem("carrito");
  }

  contarProductos();
  window.location.reload();
};

let filtrarProductos = () => {
  let termino = document.getElementById("search").value;
  let minimo = document.getElementById("price-min").value;
  let maximo = document.getElementById("price-max").value;
  let marcaElegida = document.getElementById("marca").value;
  let esProt = document.getElementById("protectores").checked;
  let esEntr = document.getElementById("entrenamiento").checked;
  let esDob = document.getElementById("dobok").checked;

  let filtrados = listadoArticulos;

  if (termino) {
    const q = termino.toLowerCase();
    filtrados = filtrados.filter(
      (x) => x.nombre.toLowerCase().includes(q) || x.description.toLowerCase().includes(q)
    );
  }

  if (minimo) {
    filtrados = filtrados.filter((x) => x.precio >= minimo);
  }

  if (maximo) {
    filtrados = filtrados.filter((x) => x.precio < maximo);
  }

  if (marcaElegida !== "Todas") {
    filtrados = filtrados.filter((x) => x.marca === marcaElegida);
  }

  const tipos = [];
  esProt ? tipos.push("Protectores") : "";
  esEntr ? tipos.push("Entrenamiento") : "";
  esDob ? tipos.push("Dobok") : "";

  if (tipos.length > 0) {
    filtrados = filtrados.filter((x) => tipos.includes(x.categoria));
  }

  mostrarCatalogo(filtrados);
};

let formatearPrecio = (monto) => {
  return new Intl.NumberFormat("es-AR", {
    currency: "ARS",
    style: "currency",
  }).format(monto);
};

let contarProductos = () => {
  const bolsa = JSON.parse(localStorage.getItem("carrito"));
  if (bolsa !== null) {
    document.getElementById("cant-prod").innerText = bolsa.length;
  }
};

let orderCatalogo = () => {
  const eleccion = document.getElementById("order").value;
  let ordenados;

  switch (eleccion) {
    case "menor":
      ordenados = listadoArticulos.sort((a, b) => a.precio - b.precio);
      break;
    case "mayor":
      ordenados = listadoArticulos.sort((a, b) => b.precio - a.precio);
      break;
    case "a-z":
      ordenados = listadoArticulos.sort((a, b) => {
        return a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1 : 1;
      });
      break;
    case "z-a":
      ordenados = listadoArticulos.sort((a, b) => {
        return a.nombre.toUpperCase() > b.nombre.toUpperCase() ? -1 : 1;
      });
      break;
    default:
      ordenados = listadoArticulos.sort((a, b) => a.precio - b.precio);
  }

  mostrarCatalogo(ordenados);
};
