import { formsOfPayment } from "./formsOfPayment";
import infoPayments from "./infoPayments";
import { SellNormalized } from "./normalizeKeys";

type SellWithValor = SellNormalized & { valor: number };

function FilterValor(sell: SellNormalized): sell is SellWithValor {
  return sell.valor !== null;
}

export default class Statistics {
  private datas;
  readonly total;
  readonly payments;
  readonly infoPayments;
  readonly week;
  readonly bestDay;
  constructor(datas: SellNormalized[]) {
    this.datas = datas;
    this.total = this.setTotal();
    this.payments = this.setPayments();
    this.infoPayments = this.setInfoPayments();
    this.week = this.setWeek();
    this.bestDay = this.setBestDay();
  }
  private setTotal() {
    return this.datas
      .filter(FilterValor)
      .reduce((acc, { valor }) => acc + valor, 0);
  }

  private setPayments() {
    return formsOfPayment(this.datas);
  }

  private setInfoPayments() {
    return infoPayments(this.datas);
  }

  private setWeek() {
    const week = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].data.getDay() === 0) week["Domingo"] += 1;
      else if (this.datas[i].data.getDay() === 1) week["Segunda"] += 1;
      else if (this.datas[i].data.getDay() === 2) week["Terça"] += 1;
      else if (this.datas[i].data.getDay() === 3) week["Quarta"] += 1;
      else if (this.datas[i].data.getDay() === 4) week["Quinta"] += 1;
      else if (this.datas[i].data.getDay() === 5) week["Sexta"] += 1;
      else if (this.datas[i].data.getDay() === 6) week["Sábado"] += 1;
    }
    return week;
  }

  private setBestDay() {
    return Object.entries(this.week).sort(
      (next, actual) => actual[1] - next[1]
    )[0];
  }
}
