export async function getLists({
  order = "",
  cursor = "",
  LIMIT = 10,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${LIMIT}&search=${search}`;
  const response = await fetch(`https://learn.codeit.kr/1031/foods?${query}`);
  if (!response.ok) {
    throw new Error("Failed to load data.");
  }
  const body = await response.json();
  return body;
}
