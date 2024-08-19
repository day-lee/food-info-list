async function getLists() {
  const response = await fetch("https://learn.codeit.kr/1012/foods");
  const body = await response.json();
  return body;
}

export default getLists;
