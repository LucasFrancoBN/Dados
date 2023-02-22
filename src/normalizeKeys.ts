import { moedaToNumber } from "./currencyToNumber";
import stringToData from "./stringToDate";

type SellStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornada";

type SellPayment = "Cartão de Crédito" | "Boleto";

export interface Sell {
  ["Cliente Novo"]: number;
  Data: string;
  Email: string;
  ["Forma de Pagamento"]: SellPayment;
  ID: number;
  Nome: string;
  Status: SellStatus;
  ["Valor (R$)"]: string;
}

export interface SellNormalized {
  cliente_novo: boolean;
  data: Date;
  email: string;
  forma_de_pagament: SellPayment;
  id: number;
  nome: string;
  status: SellStatus;
  valor: number | null;
  moeda: string;
}

export default function normalizedKeys(array: Sell[]) {
  return array.map((obj) => {
    const normalizedKeys: SellNormalized = {
      cliente_novo: Boolean(obj["Cliente Novo"]),
      data: stringToData(obj.Data),
      email: obj.Email,
      forma_de_pagament: obj["Forma de Pagamento"],
      id: obj.ID,
      nome: obj.Nome,
      status: obj.Status,
      valor: moedaToNumber(obj["Valor (R$)"]),
      moeda: obj["Valor (R$)"],
    };
    return normalizedKeys;
  });
}
