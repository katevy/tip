export function saveToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
    const storedData = localStorage.getItem(key)
    return storedData ? JSON.parse(storedData) : defaultValue
}