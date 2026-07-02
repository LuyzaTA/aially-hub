// Runs fn over items with at most `limit` requests in flight at once —
// keeps external job-search APIs from being hit with dozens of parallel
// requests at once while still finishing well within the function timeout.
export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let index = 0

  async function worker() {
    while (index < items.length) {
      const current = index++
      results[current] = await fn(items[current])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}
