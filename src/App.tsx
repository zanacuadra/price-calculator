import React, { useState } from "react";
import "./styles.css"; // Asegúrate de que la ruta sea correcta

export default function PricingCalculator() {
  const [rmp, setRmp] = useState(0);

  // Nuevos datos de productos
  const productosData = [
    {
      pais: "BRASIL",
      producto: "ENTERO FRESCO",
      costoProceso: 0.47,
      costoLogistico: 0,
      costoEmpaque: 0.2662,
      rendimiento: 0.885,
      handling: 0.05,
      comision: 0.05,
    },
    {
      pais: "USA",
      producto: "TD FRESCO",
      costoProceso: 1.12,
      costoLogistico: 2.08,
      costoEmpaque: 0.36,
      rendimiento: 0.578,
      handling: 0.07,
      comision: 0.015,
    },
    {
      pais: "ASIA",
      producto: "ENTERO CONGELADO",
      costoProceso: 0.56,
      costoLogistico: 0.3,
      costoEmpaque: 0.09,
      rendimiento: 0.88,
      handling: 0.04,
      comision: 0.07,
    },
    {
      pais: "ASIA",
      producto: "FILETE TC S/OFF CONGELADO",
      costoProceso: 1.38,
      costoLogistico: 0.3,
      costoEmpaque: 0.39,
      rendimiento: 0.57,
      handling: 0.08,
      comision: 0.06,
    },
    {
      pais: "USA",
      producto: "FILETE TD CONGELADO",
      costoProceso: 1.38,
      costoLogistico: 0.43,
      costoEmpaque: 0.39,
      rendimiento: 0.575,
      handling: 0.07,
      comision: 0.015,
    },
    {
      pais: "USA",
      producto: "FILETE TE CONGELADO",
      costoProceso: 1.72,
      costoLogistico: 0.43,
      costoEmpaque: 0.39,
      rendimiento: 0.435,
      handling: 0.07,
      comision: 0.015,
    },
    {
      pais: "CHINA",
      producto: "ENTERO FRESCO",
      costoProceso: 0.47,
      costoLogistico: 0.36,
      costoEmpaque: 0.27,
      rendimiento: 0.885,
      handling: 0.06,
      comision: 0.04,
    },
  ];

  // Cálculo del precio con base en la fórmula proporcionada
  const calcularPrecio = (rmp: any, productoData: any) => {
    const {
      costoProceso,
      costoLogistico,
      costoEmpaque,
      rendimiento,
      handling,
      comision,
      pais,
      producto,
    } = productoData;

    let precio;
    if (pais === "USA" && producto === "TD FRESCO") {
      // Precio en USD/lb para el Filete Fresco USA
      precio =
        (rmp / rendimiento +
          costoProceso +
          costoLogistico +
          costoEmpaque +
          handling) /
        (1 - comision);
      precio = precio / 2.2046; // Conversión de USD/Kg a USD/lb
    } else if (pais === "USA") {
      // Para el resto de productos USA, no se aplica la conversión
      precio =
        (rmp / rendimiento +
          costoProceso +
          costoLogistico +
          costoEmpaque +
          handling) /
        (1 - comision);
    } else {
      precio = rmp / rendimiento + costoProceso + costoLogistico + costoEmpaque;
    }

    return precio.toFixed(2);
  };

  return (
    <div className="App p-6 max-w-full mx-auto bg-white rounded-xl shadow-md space-y-4 font-sans">
      <h1 className="text-xl font-bold text-center">Calculadora de Precios</h1>

      {/* Input de RMP */}
      <div className="text-center">
        <label className="block text-sm font-medium">
          RMP (Retorno Materia Prima)
        </label>
        <input
          type="number"
          value={rmp}
          onChange={(e) => setRmp(parseFloat(e.target.value))}
          className="w-full md:w-1/2 p-2 border rounded mx-auto"
        />
      </div>

      {/* Tabla de resultados */}
      {rmp > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border text-center">País</th>
                <th className="py-2 px-4 border text-center">Producto</th>
                <th className="py-2 px-4 border text-center">Conservación</th>
                <th className="py-2 px-4 border text-center">
                  Precio Calculado
                </th>
                <th className="py-2 px-4 border text-center">Unidad</th>
              </tr>
            </thead>
            <tbody>
              {productosData.map((producto, index) => {
                const precio = calcularPrecio(rmp, producto);
                const unidad =
                  producto.pais === "USA" && producto.producto === "TD FRESCO"
                    ? "USD/lb"
                    : "USD/Kg";
                return (
                  <tr key={index} className="border">
                    <td className="py-2 px-4 text-center">{producto.pais}</td>
                    <td className="py-2 px-4 text-center">
                      {producto.producto}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {producto.producto.includes("CONGELADO")
                        ? "Congelado"
                        : "Fresco"}
                    </td>
                    <td className="py-2 px-4 text-center font-bold text-blue-600">
                      {precio}
                    </td>
                    <td className="py-2 px-4 text-center">{unidad}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Texto adicional */}
      <p className="mt-4 text-sm text-gray-500 italic text-center">
        * Considera 0,30 cents de flete a Asia y 1,50% de Comisión en USA.
      </p>
    </div>
  );
}
