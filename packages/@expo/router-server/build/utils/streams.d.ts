export type PipeFunction = (destination: NodeJS.WritableStream) => void;
/**
 * Converts a React pipeable stream into a web `ReadableStream` with
 * `<!DOCTYPE html>` prepended.
 *
 * If `signal` is provided, aborting it calls the React `abort()` to stop
 * rendering work.
 */
export declare function pipeableStreamToReadable(pipe: PipeFunction, abort: () => void, signal?: AbortSignal | null): ReadableStream;
//# sourceMappingURL=streams.d.ts.map