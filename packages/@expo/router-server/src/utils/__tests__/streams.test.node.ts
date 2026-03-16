import { PassThrough } from 'node:stream';

import { pipeableStreamToReadable } from '../streams';

const MOCK_HTML = '<html><head></head><body><div id="root">Hello</div></body></html>';

function createFakePipeableStream(html: string) {
  const source = new PassThrough();
  const abort = jest.fn(() => source.destroy());
  const pipe = jest.fn((destination: NodeJS.WritableStream) => {
    source.pipe(destination);
    process.nextTick(() => source.end(html));
  });
  return { pipe, abort };
}

async function readStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }
  result += decoder.decode();
  return result;
}

describe(pipeableStreamToReadable, () => {
  it('returns a ReadableStream', () => {
    const { pipe, abort } = createFakePipeableStream(MOCK_HTML);
    const stream = pipeableStreamToReadable(pipe, abort);

    expect(stream).toBeInstanceOf(ReadableStream);
  });

  it('streams rendered HTML with `<!DOCTYPE html>` prepended', async () => {
    const { pipe, abort } = createFakePipeableStream(MOCK_HTML);
    const stream = pipeableStreamToReadable(pipe, abort);
    const text = await readStream(stream);

    expect(text).toBe('<!DOCTYPE html>' + MOCK_HTML);
  });

  it('wires `AbortController.signal` to the `abort()` callback', () => {
    const controller = new AbortController();
    const { pipe, abort } = createFakePipeableStream(MOCK_HTML);

    pipeableStreamToReadable(pipe, abort, controller.signal);
    controller.abort();

    expect(abort).toHaveBeenCalled();
  });

  it('calls `abort()` immediately when signal is already aborted', () => {
    const controller = new AbortController();
    controller.abort();
    const { pipe, abort } = createFakePipeableStream(MOCK_HTML);

    pipeableStreamToReadable(pipe, abort, controller.signal);

    expect(abort).toHaveBeenCalled();
  });

  it('does not call `abort()` when no signal is provided', async () => {
    const { pipe, abort } = createFakePipeableStream(MOCK_HTML);
    const stream = pipeableStreamToReadable(pipe, abort);

    await readStream(stream);

    expect(abort).not.toHaveBeenCalled();
  });
});
