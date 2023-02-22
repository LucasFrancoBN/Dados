import fetchDatas from "./fetchData";
import { fillList } from "./fillList";
import normalizedKeys, { Sell } from "./normalizeKeys";
import Statistics from "./Statistics";

const total = document.querySelector<HTMLParagraphElement>(".total");
const bestDayElement = document.querySelector<HTMLParagraphElement>(".bestDay");
const tableBody =
  document.querySelector<HTMLTableSectionElement>(".table-body");

const datas = await fetchDatas<Sell>();

if (datas) {
  const dataNormalizedKeys = normalizedKeys(datas);
  if (tableBody) {
    tableBody.innerHTML = dataNormalizedKeys
      .map((data) => {
        return `
        <tr>
          <td>${data.nome}</td>
          <td>${data.email}</td>
          <td>R$ ${data.moeda}</td>
          <td>${data.forma_de_pagament}</td>
          <td>${data.status}</td>
        </tr>
      `;
      })
      .join(" ");
  }
}

if (datas) {
  const dataNormalizedKeys = normalizedKeys(datas);
  const statis = new Statistics(dataNormalizedKeys);
  if (total) {
    total.innerText += ` ${statis.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  }
  fillList(statis.payments, "payments");
  fillList(statis.infoPayments, "infoPayments");
  if (bestDayElement) bestDayElement.innerText += ` ${statis.bestDay[0]}`;
  console.log(statis.bestDay[0]);
}
