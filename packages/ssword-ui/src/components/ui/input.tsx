import * as React from "react";

import { cn } from "@/utils";
import { baseVariantAuthority, WithVariant } from "./base";

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
function Input({
  color,
  background,
  accent,
  accentForeground,
  outline,
  accentOutline,
  className,
  ...props
}: WithVariant<React.ComponentProps<"input">>) {
  return (
    <input
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        baseVariantAuthority({
          color,
          background,
          accent,
          accentForeground,
          outline,
          accentOutline,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
