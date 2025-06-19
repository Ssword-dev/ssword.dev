import * as React from "react";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";

interface CodeProps {
  lang: string;
  children: ReactNode;
  /**
   * @unit Time-ms (milliseconds)
   */
  copyResetDelay?: number;
}

function Code({ lang, copyResetDelay = 3000, children }: CodeProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = () => {
    const text =
      codeRef.current?.[
        process.env.NODE_ENV === "test" ? "textContent" : "innerText"
      ];
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), copyResetDelay);
    }
  };

  return (
    <div
      role="region"
      data-slot="code"
      className="bg-code-background text-code-foreground outline-primary-fg -any-interaction:outline-accent-foreground mt-1 flex w-full flex-col rounded-lg shadow-sm"
    >
      {/* top bar */}
      <div
        data-slot="code-language"
        className="border-muted flex w-full items-center justify-between rounded-t-lg border-b px-3 py-2 text-sm"
      >
        <span className="text-muted-foreground font-mono">{lang}</span>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          role="button"
          className="hover:text-accent inline-flex items-center gap-1 text-xs font-medium transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* code block */}
      <div
        ref={codeRef}
        data-explicit-code
        data-explicit-level="inline"
        data-slot="code-block"
        className="bg-code-inner overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed"
      >
        {children}
      </div>
    </div>
  );
}

export { Code };
