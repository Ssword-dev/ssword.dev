import { toArray } from "./utils";
import { Ref, RefObject, useEffect, useRef } from "react";

type Target = EventTarget | null | undefined;
type WindowMaybe = Window | null;
type Listener<E extends Event = Event> = (event: E) => void;

interface UseEventListenerOptions extends AddEventListenerOptions {}

/**
 * Overloads for specific DOM target types with event type keys.
 */
function useEventListener<K extends keyof HTMLElementEventMap>(
  target:
    | HTMLElement
    | RefObject<HTMLElement>
    | (() => HTMLElement | null | undefined),
  type: K | K[],
  listener: Listener<HTMLElementEventMap[K]>,
  options?: UseEventListenerOptions,
): void;

function useEventListener<K extends keyof DocumentEventMap>(
  target: Document | RefObject<Document> | (() => Document | null | undefined),
  type: K | K[],
  listener: Listener<DocumentEventMap[K]>,
  options?: UseEventListenerOptions,
): void;

function useEventListener<K extends keyof WindowEventMap>(
  target:
    | WindowMaybe
    | RefObject<WindowMaybe>
    | (() => WindowMaybe | null | undefined),
  type: K | K[],
  listener: Listener<WindowEventMap[K]>,
  options?: UseEventListenerOptions,
): void;

/**
 * Generic overload for any EventTarget with string event names and Event objects.
 */
function useEventListener<E extends Event = Event>(
  target: Target | RefObject<Target> | (() => Target),
  type: string | string[],
  listener: Listener<E>,
  options?: UseEventListenerOptions,
): void;

//~~~~~~~~~~~~~~~~~~~~~~~~~//
//                         //
//  React Implementation   //
//                         //
//~~~~~~~~~~~~~~~~~~~~~~~~~//
function useEventListener(...args: Parameters<typeof useEventListener>) {
  const [target, type, listener, options] = args;
  // like how vueuse does it, we normalize the types to array
  const allTypes = toArray(type);
  const savedHandler = useRef(listener);

  // we start with no clean ups
  const cleanUpRef: RefObject<(() => void)[]> = useRef([]);
  const runCleanups = () => {
    cleanUpRef.current.forEach((fn) => fn());
    cleanUpRef.current = [];
  };
  const controller = useRef(new AbortController()).current;
  useEffect(() => {
    savedHandler.current = listener;
  }, [listener]);
  useEffect(() => {
    const semiResolved: Target | RefObject<Target> =
      typeof target === "function"
        ? target()
        : target && "current" in target
          ? target.current
          : target !== null && target !== undefined
            ? target
            : null;

    const resolvedTarget = (
      semiResolved && "current" in semiResolved ? semiResolved.current : window
    ) as Target;
    if (!resolvedTarget?.addEventListener) return;

    const register = (
      el: EventTarget,
      event: string,
      listener: Listener<Event>,
      options: boolean | AddEventListenerOptions | undefined,
    ) => {
      if (!el) {
        return () => undefined;
      }
      el.addEventListener(event, listener, options);
      return () => el.removeEventListener(event, listener, options);
    };

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    const cleanUp = allTypes.map((type) => {
      return register(resolvedTarget, type, eventListener, options);
    });

    cleanUpRef.current = cleanUp;
    return () => {
      runCleanups();
    };
  }, [target, type, options]);

  useEffect(() => {
    const { signal } = controller;
    const handler = () => {
      // Leaves no traces behind
      signal.removeEventListener("abort", handler);
      if (!cleanUpRef.current) return;
      runCleanups();
    };
    signal.addEventListener("abort", handler);
    return () => controller.abort();
  }, []);
}

export { useEventListener };
