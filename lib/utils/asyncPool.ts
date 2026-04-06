/**
 * Async Pool - Concurrent Promise Execution with Limit
 * 
 * Executes an async function on an array of items with a concurrency limit.
 * Useful for controlling parallel API requests to prevent overwhelming services.
 * 
 * Based on: https://github.com/rxaviers/async-pool
 * 
 * @example
 * // Process 100 items, but only 3 at a time
 * const results = await asyncPool(3, items, async (item) => {
 *   return await processItem(item);
 * });
 */

/**
 * Executes async operations with controlled concurrency.
 * 
 * @param poolLimit - Maximum number of concurrent operations
 * @param array - Array of items to process
 * @param iteratorFn - Async function to execute for each item
 * @returns Promise that resolves to array of results
 * 
 * @example
 * // Rewrite 3 chunks at once instead of sequentially
 * const rewritten = await asyncPool(3, chunks, async (chunk) => {
 *   return await rewriteChunk(chunk.text);
 * });
 */
export async function asyncPool<T, R>(
  poolLimit: number,
  array: T[],
  iteratorFn: (item: T, index: number, array: T[]) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<void>[] = [];

  for (const [index, item] of array.entries()) {
    // Create promise for this item
    const promise = Promise.resolve().then(() => iteratorFn(item, index, array));
    
    // Store result (preserves order)
    results.push(promise as unknown as R);

    // Limit concurrency
    if (poolLimit <= array.length) {
      // Create a tracking promise that removes itself when done
      const executingPromise: Promise<void> = promise.then(() => {
        executing.splice(executing.indexOf(executingPromise), 1);
      }) as Promise<void>;
      
      executing.push(executingPromise);

      // If we've reached the limit, wait for one to finish
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }

  // Wait for all promises to complete
  return Promise.all(results);
}

/**
 * Similar to asyncPool but provides progress tracking.
 * 
 * @param poolLimit - Maximum number of concurrent operations
 * @param array - Array of items to process
 * @param iteratorFn - Async function to execute for each item
 * @param onProgress - Callback for progress updates
 * @returns Promise that resolves to array of results
 * 
 * @example
 * await asyncPoolWithProgress(3, chunks, 
 *   async (chunk) => await rewriteChunk(chunk.text),
 *   (completed, total) => console.log(`Progress: ${completed}/${total}`)
 * );
 */
export async function asyncPoolWithProgress<T, R>(
  poolLimit: number,
  array: T[],
  iteratorFn: (item: T, index: number, array: T[]) => Promise<R>,
  onProgress?: (completed: number, total: number) => void
): Promise<R[]> {
  let completed = 0;
  const total = array.length;

  const wrappedIterator = async (item: T, index: number, arr: T[]): Promise<R> => {
    const result = await iteratorFn(item, index, arr);
    completed++;
    if (onProgress) {
      onProgress(completed, total);
    }
    return result;
  };

  return asyncPool(poolLimit, array, wrappedIterator);
}
