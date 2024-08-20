async function getLists(flag) {
  try {
    const response = await fetch(
      `https://learn.codeit.kr/1012/foods?order=${flag}`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("ERRRORORORORROR");
  }
}

export default getLists;
