function convertirUnidades(etiqueta, ingreso) {
  // chequeo rápido del texto que llega
  console.log(ingreso);
  console.log(isNaN(ingreso));

  let medidaM, medidaPie, medidaPulg, medidaYar;

  if (String(ingreso).includes(",")) {
    ingreso = ingreso.replace(",", ".");
  }

  if (isNaN(ingreso)) {
    alert("El dato ingresado no es válido");
    medidaM = "";
    medidaPie = "";
    medidaPulg = "";
    medidaYar = "";
  } else if (etiqueta == "unid_metro") {
    medidaM = ingreso;
    medidaPie = 3.28 * medidaM;
    medidaPulg = 39.37 * medidaM;
    medidaYar = 1.0936 * medidaM;
  } else if (etiqueta == "unid_pie") {
    medidaPie = ingreso;
    medidaM = 0.3048 * medidaPie;
    medidaPulg = 12 * medidaPie;
    medidaYar = 0.3333 * medidaPie;
  } else if (etiqueta == "unid_pulgada") {
    medidaPulg = ingreso;
    medidaM = 0.0254 * medidaPulg;
    medidaPie = 0.08333 * medidaPulg;
    medidaYar = 0.027778 * medidaPulg;
  } else if (etiqueta == "unid_yarda") {
    medidaYar = ingreso;
    medidaM = 0.9144 * medidaYar;
    medidaPie = 3 * medidaYar;
    medidaPulg = 36 * medidaYar;
  }

  // dejo así la salida para no cambiar el comportamiento externo
  document.getElementById("metro").value = Number(medidaM).toFixed(2);
  document.getElementById("pulgada").value = Math.round(medidaPie * 100) / 100;
  document.getElementById("pie").value = Number(medidaPulg).toFixed(2);
  document.getElementById("yarda").value = Math.round(medidaYar * 100) / 100;
}

let convertirGR = (clave, medida) => {
  // conversión básica, nada raro
  let angDeg, angRad;

  if (clave === "grados") {
    angDeg = medida;
    angRad = (angDeg * Math.PI) / 180;
    document.getElementById("radianes").value = angRad;
  } else if (clave === "radianes") {
    angRad = medida;
    angDeg = (angRad * 180) / Math.PI;
    document.getElementById("grados").value = angDeg;
  }
};

let MostrarOcultarDiv = (clave) => {
  // toggle simple de visibilidad
  const estado = clave == "mostrarDiv" ? "block" : "none";
  document.getElementsByName("unDiv")[0].style.display = estado;
};

let sumar = () => {
  // no estoy seguro si conviene parsear antes, pero por ahora va así
  let a = document.getElementById("nums1").value;
  let b = document.getElementById("nums2").value;

  if (isNaN(a) || isNaN(b)) {
    alert("Alguno de los valores no es numérico");
  } else {
    document.getElementById("totalS").value = Number(a) + Number(b);
  }
};

let restar = () => {
  let a = document.getElementById("numr1").value;
  let b = document.getElementById("numr2").value;

  if (isNaN(a) || isNaN(b)) {
    alert("Alguno de los valores no es numérico");
  } else {
    document.getElementById("totalR").value = Number(a) - Number(b);
  }
};

let multiplicar = () => {
  let a = document.getElementById("numm1").value;
  let b = document.getElementById("numm2").value;

  if (isNaN(a) || isNaN(b)) {
    alert("Alguno de los valores no es numérico");
  } else {
    document.getElementById("totalM").value = Number(a) * Number(b);
  }
};

let dividir = () => {
  let a = document.getElementById("numd1").value;
  let b = document.getElementById("numd2").value;

  if (isNaN(a) || isNaN(b)) {
    alert("Alguno de los valores no es numérico");
  } else if (Number(b) === 0) {
    alert("No es posible dividir por cero");
  } else {
    document.getElementById("totalD").value = Number(a) / Number(b);
  }
};
