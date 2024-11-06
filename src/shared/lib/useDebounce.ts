import { useCallback, useRef } from "react"


export const useDebounce = <T>(callback: (...args: any[]) => T, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debounceCallback = useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debounceCallback
}