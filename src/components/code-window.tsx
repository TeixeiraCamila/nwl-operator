import {
  forwardRef,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const codeWindowVariants = tv({
  slots: {
    root: "w-[780px] border border-border-primary bg-bg-input overflow-hidden",
    header: "flex h-10 w-full items-center border-b border-border-primary px-4",
    dots: "flex gap-2",
    content: "flex h-[calc(100%-40px)]",
    lineNumbers:
      "flex w-12 flex-col border-r border-border-primary bg-bg-surface px-3 py-4 text-right",
    lineNumber: "font-mono text-xs leading-6 text-text-tertiary",
    textarea:
      "flex-1 resize-none bg-transparent px-4 py-4 font-mono text-sm leading-6 text-text-primary outline-none placeholder:text-text-tertiary",
  },
  variants: {
    height: {
      default: "h-[360px]",
      sm: "h-[200px]",
      lg: "h-[500px]",
    },
  },
  defaultVariants: {
    height: "default",
  },
});

export interface CodeWindowRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeWindowVariants> {}

const CodeWindowRoot = forwardRef<HTMLDivElement, CodeWindowRootProps>(
  ({ className, height, children, ...props }, ref) => {
    const { root } = codeWindowVariants({ height });

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        {children}
      </div>
    );
  },
);

CodeWindowRoot.displayName = "CodeWindowRoot";

export interface CodeWindowProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">,
    VariantProps<typeof codeWindowVariants> {
  showLineNumbers?: boolean;
  className?: string;
}

const CodeWindow = forwardRef<HTMLTextAreaElement, CodeWindowProps>(
  ({ className, height, showLineNumbers = true, value, ...props }, ref) => {
    const { root, header, dots, content, lineNumbers, lineNumber, textarea } =
      codeWindowVariants({ height });

    const lineCount = (value as string)?.split("\n").length || 1;
    const lines = Array.from(
      { length: Math.max(lineCount, 10) },
      (_, i) => i + 1,
    );

    return (
      <div className={cn(root({ className }))}>
        <div className={header()}>
          <div className={dots()}>
            <span className="h-3 w-3 rounded-full bg-accent-red" />
            <span className="h-3 w-3 rounded-full bg-accent-amber" />
            <span className="h-3 w-3 rounded-full bg-accent-green" />
          </div>
        </div>

        <div className={content()}>
          {showLineNumbers && (
            <div className={lineNumbers()}>
              {lines.map((line) => (
                <span key={line} className={lineNumber()}>
                  {line}
                </span>
              ))}
            </div>
          )}
          <textarea
            ref={ref}
            className={cn(textarea(), showLineNumbers && "w-[calc(100%-48px)]")}
            placeholder="// paste your code here..."
            value={value}
            {...props}
          />
        </div>
      </div>
    );
  },
);

CodeWindow.displayName = "CodeWindow";

export interface CodeWindowHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CodeWindowHeader = forwardRef<HTMLDivElement, CodeWindowHeaderProps>(
  ({ className, ...props }, ref) => {
    const { header, dots } = codeWindowVariants();

    return (
      <div ref={ref} className={cn(header({ className }))} {...props}>
        <div className={dots()}>
          <span className="h-3 w-3 rounded-full bg-accent-red" />
          <span className="h-3 w-3 rounded-full bg-accent-amber" />
          <span className="h-3 w-3 rounded-full bg-accent-green" />
        </div>
      </div>
    );
  },
);

CodeWindowHeader.displayName = "CodeWindowHeader";

export interface CodeWindowContentProps extends HTMLAttributes<HTMLDivElement> {
  showLineNumbers?: boolean;
  lineCount?: number;
}

const CodeWindowContent = forwardRef<HTMLDivElement, CodeWindowContentProps>(
  (
    { className, showLineNumbers = true, lineCount = 10, children, ...props },
    ref,
  ) => {
    const { content, lineNumbers, lineNumber, textarea } = codeWindowVariants();

    const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

    return (
      <div ref={ref} className={cn(content({ className }))} {...props}>
        {showLineNumbers && (
          <div className={lineNumbers()}>
            {lines.map((line) => (
              <span key={line} className={lineNumber()}>
                {line}
              </span>
            ))}
          </div>
        )}
        {children || (
          <textarea
            className={cn(textarea(), showLineNumbers && "w-[calc(100%-48px)]")}
            placeholder="// paste your code here..."
          />
        )}
      </div>
    );
  },
);

CodeWindowContent.displayName = "CodeWindowContent";

export interface CodeWindowLineNumbersProps
  extends HTMLAttributes<HTMLDivElement> {
  lineCount?: number;
}

const CodeWindowLineNumbers = forwardRef<
  HTMLDivElement,
  CodeWindowLineNumbersProps
>(({ className, lineCount = 10, ...props }, ref) => {
  const { lineNumbers, lineNumber } = codeWindowVariants();

  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div ref={ref} className={cn(lineNumbers({ className }))} {...props}>
      {lines.map((line) => (
        <span key={line} className={lineNumber()}>
          {line}
        </span>
      ))}
    </div>
  );
});

CodeWindowLineNumbers.displayName = "CodeWindowLineNumbers";

const CodeWindowCompound = Object.assign(CodeWindow, {
  Root: CodeWindowRoot,
  Header: CodeWindowHeader,
  Content: CodeWindowContent,
  LineNumbers: CodeWindowLineNumbers,
});

export {
  CodeWindowCompound as CodeWindow,
  CodeWindowContent,
  CodeWindowHeader,
  CodeWindowLineNumbers,
  CodeWindowRoot,
  codeWindowVariants,
};
