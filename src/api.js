const BASE_URL = "https://learn.codeit.kr/api";

export async function getLists({
  order = "",
  cursor = "",
  LIMIT = 10,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${LIMIT}&search=${search}`;
  const response = await fetch(`${BASE_URL}/foods?${query}`);
  if (!response.ok) {
    throw new Error("Failed to load data.");
  }
  const body = await response.json();
  return body;
}

export async function createList(formData) {
  const response = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to create data.");
  }
  const body = await response.json();
  return body;
}

export async function updateList(id, formData) {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to update data.");
  }
  const body = await response.json();
  return body;
}

export async function deleteList(postId) {
  const response = await fetch(`${BASE_URL}/foods/${postId}`, {
    method: "DELETE",
  });
  const body = await response.json();
  return body;
}
