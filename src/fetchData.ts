export default async function fetchDatas<T>(): Promise<T[] | null> {
  let response;
  let json;
  try {
    response = await fetch("https://api.origamid.dev/json/transacoes.json?");
    if (!response.ok) throw new Error("FetchData");
    json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
}
