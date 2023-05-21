import { useEffect, useState } from "react"

export function useLocalStorage<T>(
    key: string,
    initialValue?: T | (() => T | undefined)
) {
    const [value, setValue] = useState<T | undefined>(() => {
        if (typeof window !== "undefined") {
            const jsonValue = localStorage.getItem(key)
            if (jsonValue == null) {
                if (typeof initialValue === "function") {
                    return (initialValue as () => T | undefined)()
                } else {
                    return initialValue
                }
            } else {
                return JSON.parse(jsonValue)
            }
        }
    })

    useEffect(() => {
        if (value === undefined) {
            localStorage.removeItem(key)
            return
        }

        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [value, key])

    return [value, setValue] as [T | undefined, typeof setValue]
}