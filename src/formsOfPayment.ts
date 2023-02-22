import { SellNormalized } from "./normalizeKeys";

export function formsOfPayment(datas: SellNormalized[]) {
  const cartaoDeCredito = datas.filter(
    ({ forma_de_pagament }) => forma_de_pagament === "Cartão de Crédito"
  ).length;
  const boleto = datas.filter(
    ({ forma_de_pagament }) => forma_de_pagament === "Boleto"
  ).length;
  return { ["Cartão de Crédito"]: cartaoDeCredito, ["Boleto"]: boleto };
}
