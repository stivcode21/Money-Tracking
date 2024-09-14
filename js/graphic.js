// Inicialización del gráfico ECharts
const initEChart = () => {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);

  // Configuración de la opción para el gráfico
  const option = {
    title: {
      text: "Grafico",
      left: "center",
      textStyle: {
        color: "#ffffff",
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Ingresos vs Egresos",
        type: "pie",
        radius: ["50%", "70%"], // Configuración para el estilo "doughnut"
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#ccc",
          borderWidth: "none",
          color: function (params) {
            // Gradientes radiales personalizados
            const colorList = [
              {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: "#000022" }, // Ingreso: color de inicio
                  { offset: 1, color: "#003AAE" }, // Ingreso: color final
                ],
              },
              {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: "red" }, // Egreso: color de inicio
                  { offset: 1, color: "#810000" }, // Egreso: color final
                ],
              },
            ];
            return colorList[params.dataIndex];
          },
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b}: {d}%",
          color: "#000", // Color del texto
          backgroundColor: "#fff", // Color de fondo detrás del texto
          borderRadius: 4, // Bordes redondeados para el fondo
          padding: [5, 7], // Espaciado interno (padding) del texto
          shadowColor: "rgba(0, 0, 0, 0.5)", // Color de la sombra
          shadowBlur: 5, // Difuminado de la sombra
        },
        data: [
          { value: totalIngresos(), name: "Ingresos" },
          { value: totalEgresos(), name: "Egresos" },
        ],
      },
    ],
  };

  myChart.setOption(option); // Establece la opción configurada para el gráfico

  return myChart; // Retorna el gráfico para futuras actualizaciones
};

let chartInstance; // Almacena la instancia del gráfico
