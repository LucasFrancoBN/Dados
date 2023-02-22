import { SellNormalized } from "./normalizeKeys";

export default function infoPayments(data: SellNormalized[]) {
  const pagasNum = data.filter(({ status }) => status === "Paga").length;
  const recusadasNum = data.filter(
    ({ status }) => status === "Recusada pela operadora de cartão"
  ).length;
  const aguardandoPagNum = data.filter(
    ({ status }) => status === "Aguardando pagamento"
  ).length;
  const estornadoNum = data.filter(
    ({ status }) => status === "Estornada"
  ).length;
  return {
    ["Pagas"]: pagasNum,
    ["Recusada pela operadora de cartão"]: recusadasNum,
    ["Aguardando pagamento"]: aguardandoPagNum,
    ["Estornada"]: estornadoNum,
  };
}
