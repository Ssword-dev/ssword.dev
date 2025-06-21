import * as React from "react";
import { WithVariant } from "./base";
/**
 * A styled input field
 *
 * @example
 * ```typescriptreact
 * "use client"; // again, Just in case you are on next.js, always include use client
 * import * as React from "react";
 * import { baseVariantAuthority, WithVariant, Card, CardTitle, CardContent, Input, Label } from "@ssword/ui/client"; // make sure you use this if you have radix deps and not client/standalone
 *
 * <Input />; // A simple input field.
 * <Input color="secondary" background="secondary" />; // An input field with secondary foreground and background
 * <Input color="secondary" accentForeground="accent" />; // An input field with secondary foreground and highlights on hover
 *
 * // Base
 * <Input name="name" />; // An input field used like an ordinary jsx <input />
 *
 * const MyLoginPage = () => {
 *  return <Card>
 *    <CardTitle>
 *      Login Page
 *    </CardTitle>
 *    <CardContent>
 *      <Label htmlFor="username">Username</Label>
 *      <Input name="username" placeholder="Your username"/>
 *      <Label htmlFor="password">Password</Label>
 *      <Input name="password" placeholder="Your password"/>
 *    </CardContent>
 *  </Card>
 * };
 *
 * ```
 */
declare function Input({ color, background, accent, accentForeground, outline, accentOutline, className, ...props }: WithVariant<React.ComponentProps<"input">>): import("react/jsx-runtime").JSX.Element;
export { Input };
//# sourceMappingURL=input.d.ts.map