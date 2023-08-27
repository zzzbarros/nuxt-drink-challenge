export function useDebounce(callback: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  function debounceFunction() {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      callback()
    }, delay)
  }

  return debounceFunction
}
