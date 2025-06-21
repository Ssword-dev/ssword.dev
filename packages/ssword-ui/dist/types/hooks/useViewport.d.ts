interface Nothing {
}
type Union<U extends G, G> = U | (G & Nothing);
declare const enum Orientation {
    Landscape = "landscape",
    Portrait = "portrait",
    Server = ""
}
type DimensionalOrientation = Union<Orientation, string>;
interface ClientViewport {
    vh: number;
    vw: number;
    dimensionalOrientation: DimensionalOrientation;
}
interface NullViewport extends ClientViewport {
    vh: 0;
    vw: 0;
    dimensionalOrientation: Orientation.Server;
}
declare const nullViewport: NullViewport;
/**
 * A react hook that returns either a null viewport or a
 * client viewport
 *
 * Specifically, a null viewport in the server (just incase next.js)
 * because there is no viewport in the server
 *
 * A client viewport in the client
 * @returns Either a null viewport or a client viewport depending on context
 */
declare function useViewport(): Readonly<ClientViewport | NullViewport>;
export { useViewport, nullViewport, Orientation };
export type { ClientViewport, NullViewport };
//# sourceMappingURL=useViewport.d.ts.map