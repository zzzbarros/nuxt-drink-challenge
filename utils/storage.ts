const KEYS = {
  FAVORITES: '@drink:favorites',
}

function get<T = any>(key: string) {
  const data = localStorage.getItem(key)
  if (!!data) return JSON.parse(data) as T
}

function set<T>(key: string, value: T) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const Storage = { get, set, KEYS }
