import {
  bufferCount,
  combineLatest,
  concatMap,
  delay,
  from,
  lastValueFrom,
  scan,
} from 'rxjs';

/**
 * Parallelize batch: a function that takes an array of promises and executes them in parallel in batches
 * given a concurrency limit and a delay between batches.
 *
 * Uses RxJS to achieve this but returns a promise.
 *
 * @param promises
 * @param concurrent
 * @param delayTime
 */
export function parallelizeBatch<T>(
  promises: Array<(...args: unknown[]) => Promise<T>>,
  concurrent = 2,
  delayTime = 1000,
) {
  if (!promises.length) {
    return Promise.resolve([]);
  }

  const stream$ = from(promises).pipe(
    bufferCount(concurrent),
    concatMap((items) => {
      return combineLatest(items.map((item) => item())).pipe(delay(delayTime));
    }),
    scan((acc, curr) => [...acc, ...curr], [] as T[]),
  );

  return lastValueFrom(stream$);
}
