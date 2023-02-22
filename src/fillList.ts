export function fillList(list: { [key: string]: number }, elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    Object.keys(list).forEach((key) => {
      element.innerHTML += `<p>${key}: ${list[key]}</p>`;
    });
  }
}
