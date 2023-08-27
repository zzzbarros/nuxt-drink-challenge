import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useDebounce } from 'composables/useDebounce'

describe('test debounce', async () => {
  const delay = 500
  let debouncedFunction: Function
  let callback: Function

  beforeEach(() => {
    callback = vi.fn()
    debouncedFunction = useDebounce(callback, delay)
  })

  test('should must callback after delay', async () => {
    debouncedFunction()
    await new Promise((resolve) => setTimeout(resolve, delay + 100))
    expect(callback).toHaveBeenCalled()
  })

  test('should not return call before delay', async () => {
    expect(callback).not.toHaveBeenCalled()
  })
})
