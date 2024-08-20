async function getLists({ order = "calorie", cursor = "", LIMIT = 10 }) {
  try {
    const response = await fetch(
      `https://learn.codeit.kr/1012/foods?order=${order}&cursor=${cursor}&limit=${LIMIT}`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("ERRRORORORORROR");
  }
}

export default getLists;
