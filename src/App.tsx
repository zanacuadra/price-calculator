// src/App.tsx

import React, { useState, useEffect } from "react";
import "./styles.css";

type Producto = {
  species: "Atlantico" | "Coho";
  pais: string;
  producto: string;
  costoProceso: number;
  costoLogistico: number;
  costoEmpaque: number;
  rendimiento: number;
  handling: number;
  comision: number;
};

const productosData: Producto[] = [
  {
    species: "Atlantico",
    pais: "BRASIL",
    producto: "ENTERO FRESCO",
    costoProceso: 0.47,
    costoLogistico: 0,
    costoEmpaque: 0.266,
    rendimiento: 0.885,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Atlantico",
    pais: "CHINA",
    producto: "ENTERO FRESCO",
    costoProceso: 0.47,
    costoLogistico: 0.38,
    costoEmpaque: 0.266,
    rendimiento: 0.885,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Atlantico",
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
    species: "Atlantico",
    pais: "ASIA",
    producto: "ENTERO CONGELADO",
    costoProceso: 0.561,
    costoLogistico: 0.3,
    costoEmpaque: 0.09,
    rendimiento: 0.88,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Atlantico",
    pais: "RUSIA",
    producto: "ENTERO CONGELADO",
    costoProceso: 0.561,
    costoLogistico: 0.65,
    costoEmpaque: 0.09,
    rendimiento: 0.88,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Atlantico",
    pais: "ASIA",
    producto: "FILETE TC S/OFF CONGELADO",
    costoProceso: 1.371,
    costoLogistico: 0.3,
    costoEmpaque: 0.392,
    rendimiento: 0.585,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Atlantico",
    pais: "USA",
    producto: "FILETE TD CONGELADO",
    costoProceso: 1.381,
    costoLogistico: 0.4,
    costoEmpaque: 0.392,
    rendimiento: 0.575,
    handling: 0.07,
    comision: 0.015,
  },
  {
    species: "Atlantico",
    pais: "USA",
    producto: "FILETE TE CONGELADO",
    costoProceso: 1.703,
    costoLogistico: 0.4,
    costoEmpaque: 0.392,
    rendimiento: 0.46,
    handling: 0.07,
    comision: 0.015,
  },
  {
    species: "Coho",
    pais: "JAPON",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    costoLogistico: 0.27,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "BRASIL",
    producto: "HG FRESCO",
    costoProceso: 0.534,
    costoLogistico: 0.0,
    costoEmpaque: 0.244,
    rendimiento: 0.748,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "BRASIL",
    producto: "HON FRESCO",
    costoProceso: 0.573,
    costoLogistico: 0.0,
    costoEmpaque: 0.224,
    rendimiento: 0.86,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    costoLogistico: 0.3,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "HON CONGELADO",
    costoProceso: 0.573,
    costoLogistico: 0.3,
    costoEmpaque: 0.097,
    rendimiento: 0.86,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "FILETE TC S/OFF CONGELADO",
    costoProceso: 1.547,
    costoLogistico: 0.3,
    costoEmpaque: 0.362,
    rendimiento: 0.57,
    handling: 0.0,
    comision: 0.0,
  },
  {
    species: "Coho",
    pais: "RUSIA",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    costoLogistico: 0.648,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0.0,
    comision: 0.0,
  },
];

export default function PricingCalculator() {
  const [species, setSpecies] = useState<"Atlantico" | "Coho">("Atlantico");
  const [rmpValues, setRmpValues] = useState<string[]>([]);
  const [priceValues, setPriceValues] = useState<string[]>([]);

  const filtered = productosData.filter((p) => p.species === species);

  useEffect(() => {
    setRmpValues(filtered.map(() => ""));
    setPriceValues(filtered.map(() => ""));
  }, [species]);

  // Utility to sanitize leading zeros
  const sanitize = (val: string) => val.replace(/^0+(?=[1-9])/, "");

  // Parse string with comma or dot to number
  const parseNumber = (val: string) => parseFloat(val.replace(",", ".")) || 0;

  // Price calculation numeric
  const calcPriceNum = (rmp: number, p: Producto) => {
    let precio: number;
    if (p.pais === "USA" && p.producto === "TD FRESCO") {
      precio =
        (rmp / p.rendimiento +
          p.costoProceso +
          p.costoLogistico +
          p.costoEmpaque +
          p.handling) /
        (1 - p.comision);
      precio = precio / 2.2046;
    } else if (p.pais === "USA") {
      precio =
        (rmp / p.rendimiento +
          p.costoProceso +
          p.costoLogistico +
          p.costoEmpaque +
          p.handling) /
        (1 - p.comision);
    } else {
      precio =
        rmp / p.rendimiento +
        p.costoProceso +
        p.costoLogistico +
        p.costoEmpaque;
    }
    return precio;
  };

  // RMP inverse calculation numeric
  const calcRmpNum = (price: number, p: Producto) => {
    const sumCosts =
      p.costoProceso +
      p.costoLogistico +
      p.costoEmpaque +
      (p.pais === "USA" ? p.handling : 0);
    if (p.pais === "USA" && p.producto === "TD FRESCO") {
      const pre = price * 2.2046 * (1 - p.comision) - sumCosts;
      return pre * p.rendimiento;
    } else if (p.pais === "USA") {
      const pre = price * (1 - p.comision) - sumCosts;
      return pre * p.rendimiento;
    } else {
      return (price - sumCosts) * p.rendimiento;
    }
  };

  const handleRmpChange = (idx: number, value: string) => {
    const sanitized = sanitize(value);
    const rmpNum = parseNumber(sanitized);
    const newPriceNum = calcPriceNum(rmpNum, filtered[idx]);
    const priceStr = newPriceNum.toFixed(2).replace(".", ",");
    setRmpValues((vals) => {
      const c = [...vals];
      c[idx] = sanitized;
      return c;
    });
    setPriceValues((vals) => {
      const c = [...vals];
      c[idx] = priceStr;
      return c;
    });
  };

  const handlePriceChange = (idx: number, value: string) => {
    const sanitized = sanitize(value);
    const priceNum = parseNumber(sanitized);
    const newRmpNum = calcRmpNum(priceNum, filtered[idx]);
    const rmpStr = newRmpNum.toFixed(2).replace(".", ",");
    setPriceValues((vals) => {
      const c = [...vals];
      c[idx] = sanitized;
      return c;
    });
    setRmpValues((vals) => {
      const c = [...vals];
      c[idx] = rmpStr;
      return c;
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <img
          src={`${process.env.PUBLIC_URL}/marinefarm-logo-white.png`}
          alt="Marine Farm Logo"
          className="logo"
        />
        <div className="header-text">
          <h1 className="app-title">Marine Farm Calculator</h1>
          <p className="app-tagline">Inspired by nature, driven by people</p>
        </div>
      </header>

      <div className="species-selector">
        <button
          className={species === "Atlantico" ? "active" : ""}
          onClick={() => setSpecies("Atlantico")}
        >
          Atlántico
        </button>
        <button
          className={species === "Coho" ? "active" : ""}
          onClick={() => setSpecies("Coho")}
        >
          Coho
        </button>
      </div>

      <div className="table-container">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>RMP</th>
              <th>País</th>
              <th>Producto</th>
              <th>Conservación</th>
              <th>Precio Calculado</th>
              <th>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod, idx) => {
              const rmpStr = rmpValues[idx] || "";
              const priceStr = priceValues[idx] || "";
              const unidad =
                prod.pais === "USA" && prod.producto === "TD FRESCO"
                  ? "USD/lb"
                  : "USD/Kg";
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      className="row-input"
                      value={rmpStr}
                      placeholder="0,00"
                      onChange={(e) => handleRmpChange(idx, e.target.value)}
                    />
                  </td>
                  <td>{prod.pais}</td>
                  <td>{prod.producto}</td>
                  <td>
                    {prod.producto.includes("CONGELADO")
                      ? "Congelado"
                      : "Fresco"}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="row-input price-input"
                      value={priceStr}
                      placeholder="0,00"
                      onChange={(e) => handlePriceChange(idx, e.target.value)}
                    />
                  </td>
                  <td>{unidad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="app-footer">
        <p>
          * Considera 0,30 cents de flete a Asia y 1,50% de Comisión en USA.
        </p>
      </footer>
    </div>
  );
}


