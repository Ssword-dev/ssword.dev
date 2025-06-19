import { cleanup, render } from "@testing-library/react";
import * as TestingLibrary from "@testing-library/react";
import { createElement, FC, ReactElement } from "react";

const __globals__ = ["TestingLibrary", "perfSync", "perfAsync", "perf"];

beforeEach(function () {
  jest.useFakeTimers();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  // jest.useRealTimers(); // call jest.useRealTimers() inline when needed
});

function perfSync(fn: Function): number {
  const t1 = performance.now();
  fn();
  const t2 = performance.now();
  return t2 - t1;
}

async function perfAsync(fn: Function): Promise<number> {
  const t1 = performance.now();
  await fn();
  const t2 = performance.now();
  return t2 - t1;
}

function perf(fn: Function) {
  const t1 = performance.now();
  const result = fn();
  if (result instanceof Promise) {
    return new Promise((res, rej) => {
      result
        .then((_) => {
          const t2 = performance.now();
          res(t2 - t1);
        })
        .catch(rej);
    });
  }

  return performance.now() - t1;
}

expect.extend({
  toRunForApproximately<T>(received: () => T, maxRuntime: number) {
    const perfResult = globalThis.perf<T>(received);

    const makeResult = (pass: boolean, msg: string) => ({
      pass,
      message: () => msg,
    });

    if (perfResult instanceof Promise) {
      return perfResult.then((val) => {
        if (val > maxRuntime) {
          return makeResult(
            false,
            "Function ran for longer than expected duration",
          );
        } else {
          return makeResult(true, "Function ran within the expected duration");
        }
      });
    }

    if ((perfResult as number) > maxRuntime) {
      return makeResult(
        false,
        "Function ran for longer than expected duration",
      );
    } else {
      return makeResult(true, "Function ran within the expected duration");
    }
  },
});

// attach to global
(globalThis as any).TestingLibrary = TestingLibrary;
(globalThis as any).perfSync = perfSync;
(globalThis as any).perfAsync = perfAsync;
(globalThis as any).perf = perf;
(globalThis as any).__globals__ = __globals__;

declare global {
  var TestingLibrary: typeof import("@testing-library/react");
  var __globals__: Array<string>;

  namespace Setup {
    /**
     * A perf fn,
     * Type Parameters: [A]
     *
     *  A - Whether the callback being tested is async or not
     */
    interface PerfFn<A extends boolean = true> {
      (cb: Function): A extends true ? Promise<number> : number;
    }

    interface ComplexPerfFn {
      <T>(cb: () => T): T extends Promise<unknown> ? Promise<number> : number;
    }

    interface ComplexPerfMatcher {
      <T>(): T extends Promise<unknown>
        ? Promise<{ pass: boolean; message?: string }>
        : { pass: boolean; message?: string };
    }
  }

  var perfSync: Setup.PerfFn<false>;
  var perfAsync: Setup.PerfFn<true>;
  var perf: Setup.ComplexPerfFn;
  namespace jest {
    interface Matchers<R> {
      toRunForApproximately(maxRuntime: number): R;
    }
  }
}
