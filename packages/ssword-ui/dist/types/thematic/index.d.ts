import React, { PropsWithChildren } from "react";
type UserWithName<N extends string> = {
    [key in N]: string;
};
interface ThematicAgentProps<N extends string> {
    themeReadApi?: string | URL;
    themeWriteApi?: string | URL;
    usernameProperty: N;
    themeProperty?: string;
    user: UserWithName<N>;
}
interface ThematicAgentMiddleman<N extends string> {
    agentProps: ThematicAgentProps<N>;
    currentTheme: string;
    getTheme(): Promise<string>;
    setTheme(theme: string): Promise<void>;
}
interface ThematicAgentContext<N extends string> {
    middleman: ThematicAgentMiddleman<N> | null;
    setMiddleman: (middleMan: ThematicAgentMiddleman<N>) => void;
}
declare const ThematicAgentContext: React.Context<ThematicAgentContext<any> | undefined>;
declare function ThematicAgentProvider<N extends string>({ children, }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
declare function useThematicAgent<N extends string = string>(): ThematicAgentContext<N>;
declare function ThematicAgent<N extends string>(props: ThematicAgentProps<N>): null;
/**
 * Warning: This is made to be rendered only in the server
 */
declare function ThematicInitScript(): import("react/jsx-runtime").JSX.Element;
export { ThematicAgentProvider, useThematicAgent, ThematicAgent, ThematicAgentContext, ThematicInitScript, };
//# sourceMappingURL=index.d.ts.map