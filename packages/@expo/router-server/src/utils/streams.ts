import { PassThrough, Readable } from 'node:stream';

export type PipeFunction = (destination: NodeJS.WritableStream) => void;

/**
 * Converts a React pipeable stream into a web `ReadableStream` with
 * `<!DOCTYPE html>` prepended.
 *
 * If `signal` is provided, aborting it calls the React `abort()` to stop
 * rendering work.
 */
export function pipeableStreamToReadable(
  pipe: PipeFunction,
  abort: () => void,
  signal?: AbortSignal | null
): ReadableStream {
  const passthrough = new PassThrough();
  passthrough.write('<!DOCTYPE html>');
  pipe(passthrough);

  if (signal) {
    if (signal.aborted) {
      abort();
    } else {
      signal.addEventListener('abort', () => abort(), { once: true });
    }
  }

  const readable: Readable = passthrough;
  return Readable.toWeb(readable) as ReadableStream;
}
