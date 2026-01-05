// /src/details.js
// Storage helpers for checklist details

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function loadDetails(date = todayKey()) {
  const raw = localStorage.getItem(`lifeos:details:${date}`);
  return raw ? JSON.parse(raw) : {};
}

export function saveDetails(details, date = todayKey()) {
  localStorage.setItem(`lifeos:details:${date}`, JSON.stringify(details));
}

export { todayKey };
