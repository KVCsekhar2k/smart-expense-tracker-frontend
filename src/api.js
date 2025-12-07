// frontend/src/api.js
const API_BASE =  "https://smartexpensetracker-backend-gi3f.onrender.com/api" ;

async function request(path, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const api = {
  signup: (body) => request("/auth/signup", "POST", body),
  login: (body) => request("/auth/login", "POST", body),

  getExpenses: (token) => request("/expenses", "GET", null, token),
  getExpense: (id, token) => request(`/expenses/${id}`, "GET", null, token),
  createExpense: (body, token) => request("/expenses", "POST", body, token),
  updateExpense: (id, body, token) =>
    request(`/expenses/${id}`, "PUT", body, token),
  deleteExpense: (id, token) =>
    request(`/expenses/${id}`, "DELETE", null, token),
  deleteAllExpenses: (token) =>
    request("/expenses", "DELETE", null, token),

  searchExpenses: (keyword, token) =>
    request(`/expenses/search?keyword=${encodeURIComponent(keyword)}`, "GET", null, token),

  filterExpenses: (category, month, token) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (month) params.append("month", month);
    return request(`/expenses/filter?${params.toString()}`, "GET", null, token);
  },

  sortExpenses: (by, order, token) =>
    request(`/expenses/sort?by=${by}&order=${order}`, "GET", null, token),

  getSummary: (token) => request("/expenses/summary", "GET", null, token),
  getStatistics: (token) =>
    request("/expenses/statistics", "GET", null, token),
};
