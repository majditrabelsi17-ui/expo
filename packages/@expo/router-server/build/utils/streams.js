"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeableStreamToReadable = pipeableStreamToReadable;
const node_stream_1 = require("node:stream");
/**
 * Converts a React pipeable stream into a web `ReadableStream` with
 * `<!DOCTYPE html>` prepended.
 *
 * If `signal` is provided, aborting it calls the React `abort()` to stop
 * rendering work.
 */
function pipeableStreamToReadable(pipe, abort, signal) {
    const passthrough = new node_stream_1.PassThrough();
    passthrough.write('<!DOCTYPE html>');
    pipe(passthrough);
    if (signal) {
        if (signal.aborted) {
            abort();
        }
        else {
            signal.addEventListener('abort', () => abort(), { once: true });
        }
    }
    const readable = passthrough;
    return node_stream_1.Readable.toWeb(readable);
}
//# sourceMappingURL=streams.js.map