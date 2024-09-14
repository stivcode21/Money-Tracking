//OBJETOS
const ingresos = [
  new Ingreso("salario", 3000),
  new Ingreso("venta coche", 1500),
];

const egresos = [
  new Egreso("Renta departamento", 900),
  new Egreso("Ropa", 400),
];

//las funciones que cargan a el momento de cargar la pagina
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
  chartInstance = initEChart(); // Inicializa el gráfico con gradiente
};

//TOTAL INGRESOS
let totalIngresos = () => {
  let totalIngreso = 0;

  for (let ingreso of ingresos) {
    totalIngreso += ingreso._valor;
  }
  return totalIngreso;
};

//TOTAL EGRESOS
let totalEgresos = () => {
  let totalEgreso = 0;

  for (let egreso of egresos) {
    totalEgreso += egreso._valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcetajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcetajeEgreso);
  document.getElementById("ingresos").innerHTML = `${formatoMoneda(
    totalIngresos()
  )}`;
  document.getElementById("egresos").innerHTML = `${formatoMoneda(
    totalEgresos()
  )}`;
};

// Función para actualizar el gráfico
const updateChart = () => {
  chartInstance.setOption({
    series: [
      {
        data: [
          { value: totalIngresos(), name: "Ingresos" },
          { value: totalEgresos(), name: "Egresos" },
        ],
      },
    ],
  });
};

const formatoMoneda = (valor) => {
  // toLocalString se utiliza para convertir un valor numerico a una cadena string de typo moneda
  return valor.toLocaleString("en-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
  });
};

let agregarDato = () => {
  let forma = document.forms["forma"]; //seleccion de formulario forma
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    //condicionales para la creacion de dato
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value)); // con el + va tomar el valor pero tipo string
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
    updateChart(); // Actualiza el gráfico después de agregar un dato
  }
};
