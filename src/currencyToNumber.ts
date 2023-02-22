/**
 * Recebe uma String: '1.200,00" returna number: 1200.00
 */

export function moedaToNumber(moeda: string): number | null {
  const num: number = Number(moeda.replaceAll(".", "").replace(",", "."));
  return isNaN(num) ? null : num;
}
