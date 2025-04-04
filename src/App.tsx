import React, { useState } from "react";
import "./styles.css"; // Asegúrate de que la ruta sea correcta

export default function PricingCalculator() {
  const [rmp, setRmp] = useState<number>(0);

  // Datos de productos
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

  const calcularPrecio = (rmp: number, productoData: any): string => {
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

    let precio: number;

    if (pais === "USA" && producto === "TD FRESCO") {
      precio =
        (rmp / rendimiento +
          costoProceso +
          costoLogistico +
          costoEmpaque +
          handling) /
        (1 - comision);
      precio = precio / 2.2046; // Conversión de USD/Kg a USD/lb
    } else if (pais === "USA") {
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
    <div className="App">
      {/* Encabezado con logo y título/eslogan */}
      <header className="app-header">
        {/* Logo Marine Farm en blanco */}
        <img
          src="/logo-marinefarm-blanco.png"
          alt="Marine Farm Logo"
          className="logo"
        />
        <div className="header-text">
          <h1 className="app-title">Marine Farm Calculator</h1>
          <p className="app-tagline">Inspired by nature, driven by people</p>
        </div>
      </header>

      {/* Contenedor de la calculadora */}
      <div className="calculator-container">
        <div className="input-section">
          <label className="input-label">RMP (Retorno Materia Prima)</label>
          <input
            type="number"
            value={rmp}
            onChange={(e) => setRmp(parseFloat(e.target.value))}
            className="input-field"
            placeholder="Ingresa el valor de RMP"
          />
        </div>

        {rmp > 0 && (
          <div className="table-container">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>País</th>
                  <th>Producto</th>
                  <th>Conservación</th>
                  <th>Precio Calculado</th>
                  <th>Unidad</th>
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
                    <tr key={index}>
                      <td>{producto.pais}</td>
                      <td>{producto.producto}</td>
                      <td>
                        {producto.producto.includes("CONGELADO")
                          ? "Congelado"
                          : "Fresco"}
                      </td>
                      <td className="price">{precio}</td>
                      <td>{unidad}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pie de página */}
      <footer className="app-footer">
        <p>* Considera 0,30 cents de flete a Asia y 1,50% de Comisión en USA.</p>
      </footer>
    </div>
  );
}
