import { RefObject } from "react";

export type Arrayed<T> = T extends null | undefined
  ? []
  : T extends unknown[]
    ? T
    : [T];

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined; // matches both null and undefined
}
export function toArray<T extends unknown | unknown[] | null | undefined>(
  value: T,
): Arrayed<T> {
  return (
    Array.isArray(value) ? value : isNullish(value) ? [] : [value]
  ) as Arrayed<T>;
}

export type SetConverted<T extends unknown[] | null | undefined> = T extends
  | null
  | undefined
  ? Set<never>
  : T extends infer TItem
    ? Set<TItem>
    : Set<T>;
export function toSet<T extends unknown[] | null | undefined>(
  value: T,
): SetConverted<T> {
  return new Set(
    Array.isArray(value) ? value : isNullish(value) ? [] : [value],
  ) as SetConverted<T>;
}
export type Valued<T> = T extends RefObject<infer TUnrefed> ? TUnrefed : T;

function isRef<T = unknown>(obj: unknown): obj is React.RefObject<T> {
  return isNullish(obj) ? false : typeof obj === "object" && "current" in obj;
}

export function toValue<T>(value: T | RefObject<T>): Valued<T> {
  return (isRef(value) ? value.current : value) as Valued<T>;
}
