// src/App.tsx

import React, { useState, useEffect } from "react";
import "./styles.css";

type Producto = {
  species: "Atlantico" | "Coho";
  pais: string;
  producto: string;
  costoProceso: number;
  tarifa: number; // principal logistic component (air or sea)
  terrestre: number; // terrestrial freight
  costoEmpaque: number;
  rendimiento: number;
  handling: number;
  comision: number;
  arancel?: number;
  camaraFrio?: number;
  rayosX?: number;
  comex: number;
};

const productosData: Producto[] = [
  {
    species: "Atlantico",
    pais: "BRASIL",
    producto: "ENTERO FRESCO",
    costoProceso: 0.47,
    tarifa: 0,
    terrestre: 0,
    costoEmpaque: 0.266,
    rendimiento: 0.885,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Atlantico",
    pais: "CHINA",
    producto: "ENTERO FRESCO",
    costoProceso: 0.47,
    tarifa: 0.0,
    terrestre: 0.15,
    costoEmpaque: 0.266,
    rendimiento: 0.885,
    handling: 0,
    comision: 0,
    arancel: 0.1,
    camaraFrio: 0.1,
    comex: 0.03,
  },
  {
    species: "Atlantico",
    pais: "USA",
    producto: "TD FRESCO",
    costoProceso: 1.116,
    tarifa: 1.76, // aéreo
    terrestre: 0.15,
    costoEmpaque: 0.365,
    rendimiento: 0.585,
    handling: 0.07,
    comision: 0.02,
    arancel: 0.1,
    camaraFrio: 0.1,
    rayosX: 0.1,
    comex: 0.03,
  },
  {
    species: "Atlantico",
    pais: "ASIA",
    producto: "ENTERO CONGELADO",
    costoProceso: 0.561,
    tarifa: 0.3,
    terrestre: 0,
    costoEmpaque: 0.086,
    rendimiento: 0.88,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Atlantico",
    pais: "RUSIA",
    producto: "ENTERO CONGELADO",
    costoProceso: 0.561,
    tarifa: 0.65,
    terrestre: 0,
    costoEmpaque: 0.086,
    rendimiento: 0.88,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Atlantico",
    pais: "ASIA",
    producto: "FILETE TC S/OFF CONGELADO",
    costoProceso: 1.371,
    tarifa: 0.3,
    terrestre: 0,
    costoEmpaque: 0.392,
    rendimiento: 0.585,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Atlantico",
    pais: "USA",
    producto: "FILETE TD CONGELADO",
    costoProceso: 1.381,
    tarifa: 0.38,
    terrestre: 0,
    costoEmpaque: 0.392,
    rendimiento: 0.58,
    handling: 0.07,
    comision: 0.02,
    comex: 0.03,
  },
  {
    species: "Atlantico",
    pais: "USA",
    producto: "FILETE TE CONGELADO",
    costoProceso: 1.703,
    tarifa: 0.38,
    terrestre: 0,
    costoEmpaque: 0.392,
    rendimiento: 0.46,
    handling: 0.07,
    comision: 0.02,
    comex: 0.03,
  },
  {
    species: "Coho",
    pais: "JAPON",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    tarifa: 0.27,
    terrestre: 0,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "BRASIL",
    producto: "HG FRESCO",
    costoProceso: 0.534,
    tarifa: 0,
    terrestre: 0,
    costoEmpaque: 0.244,
    rendimiento: 0.748,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "BRASIL",
    producto: "HON FRESCO",
    costoProceso: 0.573,
    tarifa: 0,
    terrestre: 0,
    costoEmpaque: 0.224,
    rendimiento: 0.86,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    tarifa: 0.3,
    terrestre: 0,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "HON CONGELADO",
    costoProceso: 0.573,
    tarifa: 0.3,
    terrestre: 0,
    costoEmpaque: 0.097,
    rendimiento: 0.86,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "ASIA",
    producto: "FILETE TC S/OFF CONGELADO",
    costoProceso: 1.547,
    tarifa: 0.3,
    terrestre: 0,
    costoEmpaque: 0.362,
    rendimiento: 0.57,
    handling: 0,
    comision: 0,
    comex: 0.0,
  },
  {
    species: "Coho",
    pais: "RUSIA",
    producto: "HG CONGELADO",
    costoProceso: 0.625,
    tarifa: 0.65,
    terrestre: 0,
    costoEmpaque: 0.084,
    rendimiento: 0.74,
    handling: 0,
    comision: 0,
    comex: 0.0,
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

  const sanitize = (val: string) => val.replace(/^0+(?=[1-9])/, "");
  const parseNumber = (val: string) => parseFloat(val.replace(",", ".")) || 0;

  const calcPriceNum = (rmp: number, p: Producto): number => {
    const isTDUSA = p.pais === "USA" && p.producto === "TD FRESCO";
    const isCongeladoUSA = p.pais === "USA" && p.producto.includes("CONGELADO");

    if (isTDUSA) {
      // Fórmula específica TD FRESCO USA
      let A = rmp / p.rendimiento + p.costoProceso + p.costoEmpaque;
      A = A * (1 + (p.arancel || 0));
      let C =
        A +
        p.tarifa +
        p.terrestre +
        (p.camaraFrio! + p.rayosX!) +
        p.comex +
        p.handling;
      C = C * (1 + p.comision);
      return C / 2.20462;
    } else if (isCongeladoUSA) {
      // USA congelado: marítimo (tarifa) + terrestre + handling + comex + comisión + arancel
      let A = rmp / p.rendimiento + p.costoProceso + p.costoEmpaque;
      A = A * (1 + (p.arancel || 0));
      let C = A + p.tarifa + p.terrestre + p.comex + p.handling;
      C = C * (1 + p.comision);
      return C;
    } else if (p.pais === "USA") {
      // Otros USA frescos
      const A =
        rmp / p.rendimiento +
        p.costoProceso +
        p.costoEmpaque +
        p.tarifa +
        p.terrestre +
        p.handling;
      return A / (1 - p.comision);
    } else {
      // Resto de mercados
      return (
        rmp / p.rendimiento +
        p.costoProceso +
        p.tarifa +
        p.terrestre +
        p.costoEmpaque
      );
    }
  };

  const calcRmpNum = (price: number, p: Producto): number => {
    const isTDUSA = p.pais === "USA" && p.producto === "TD FRESCO";
    const isCongeladoUSA = p.pais === "USA" && p.producto.includes("CONGELADO");

    if (isTDUSA) {
      let A = (price * 2.20462) / (1 + p.comision);
      A =
        A -
        p.tarifa -
        p.terrestre -
        (p.camaraFrio! + p.rayosX!) -
        p.comex -
        p.handling;
      const D = A / (1 + (p.arancel || 0));
      return (D - p.costoProceso - p.costoEmpaque) * p.rendimiento;
    } else if (isCongeladoUSA) {
      let A = price / (1 + p.comision);
      A = A - p.tarifa - p.terrestre - p.comex - p.handling;
      const D = A / (1 + (p.arancel || 0));
      return (D - p.costoProceso - p.costoEmpaque) * p.rendimiento;
    } else if (p.pais === "USA") {
      const A =
        price * (1 - p.comision) -
        (p.costoProceso + p.costoEmpaque + p.tarifa + p.terrestre + p.handling);
      return A * p.rendimiento;
    } else {
      return (
        (price - (p.costoProceso + p.tarifa + p.terrestre + p.costoEmpaque)) *
        p.rendimiento
      );
    }
  };

  const handleRmpChange = (idx: number, value: string) => {
    const s = sanitize(value);
    const num = parseNumber(s);
    const pr = calcPriceNum(num, filtered[idx]);
    setRmpValues((vals) => vals.map((v, i) => (i === idx ? s : v)));
    setPriceValues((vals) =>
      vals.map((v, i) => (i === idx ? pr.toFixed(2).replace(".", ",") : v))
    );
  };

  const handlePriceChange = (idx: number, value: string) => {
    const s = sanitize(value);
    const num = parseNumber(s);
    const rm = calcRmpNum(num, filtered[idx]);
    setPriceValues((vals) => vals.map((v, i) => (i === idx ? s : v)));
    setRmpValues((vals) =>
      vals.map((v, i) => (i === idx ? rm.toFixed(2).replace(".", ",") : v))
    );
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
              const rmp = rmpValues[idx] || "";
              const price = priceValues[idx] || "";
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
                      value={rmp}
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
                      value={price}
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
