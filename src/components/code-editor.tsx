"use client";

import {
  forwardRef,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { tv, type VariantProps } from "tailwind-variants";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";
import { cn } from "@/lib/utils";

const codeEditorVariants = tv({
  slots: {
    root: "w-[780px] border border-border-primary bg-bg-input overflow-hidden",
    header: "flex h-10 w-full items-center border-b border-border-primary px-4",
    dots: "flex gap-2",
    content: "relative flex overflow-hidden",
    lineNumbersContainer:
      "flex w-12 flex-shrink-0 flex-col border-r border-border-primary bg-bg-surface overflow-y-auto",
    lineNumber:
      "font-mono text-xs leading-6 text-text-tertiary h-6 pr-3 text-right",
    editorWrapper: "relative flex-1 overflow-y-auto",
    textarea:
      "absolute inset-0 h-full w-full resize-none bg-transparent px-4 py-4 font-mono text-sm leading-6 text-transparent caret-accent-green outline-none placeholder:text-text-tertiary",
    highlighted:
      "pointer-events-none absolute inset-0 overflow-hidden px-4 py-4 font-mono text-sm leading-6 whitespace-pre",
    languageBadge:
      "ml-auto rounded-full bg-bg-surface px-2 py-0.5 font-mono text-xs text-text-secondary",
    footer:
      "flex h-8 items-center justify-between border-t border-border-primary px-4",
    charCounter: "font-mono text-xs",
    charCounterValid: "text-accent-green",
    charCounterInvalid: "text-accent-red",
  },
  variants: {
    height: {
      default: "h-[300px]",
      sm: "h-[300px]",
      lg: "h-[500px]",
    },
  },
  defaultVariants: {
    height: "default",
  },
});

const MAX_CODE_LINES = 500;
export const MAX_CODE_CHARACTERS = 2000;

export interface CodeEditorProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "className" | "onChange"
    >,
    VariantProps<typeof codeEditorVariants> {
  showLineNumbers?: boolean;
  className?: string;
  language?: string;
  detectedLanguage?: string | null;
  onLanguageChange?: (lang: string) => void;
  onChange?: (value: string) => void;
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  (
    {
      className,
      height,
      showLineNumbers = true,
      value,
      language,
      detectedLanguage,
      onChange,
      onLanguageChange,
      ...props
    },
    ref,
  ) => {
    const codeValue = typeof value === "string" ? value : "";
    const {
      root,
      header,
      dots,
      content,
      lineNumbersContainer,
      lineNumber,
      editorWrapper,
      textarea,
      highlighted,
      languageBadge,
      footer,
      charCounter,
      charCounterValid,
      charCounterInvalid,
    } = codeEditorVariants({ height });

    const charCount = codeValue.length;
    const isValid = charCount <= MAX_CODE_CHARACTERS;

    const [highlightedHtml, setHighlightedHtml] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightedRef = useRef<HTMLDivElement>(null);

    const { highlight, isReady } = useShikiHighlighter();

    useEffect(() => {
      if (!codeValue || !isReady) {
        setHighlightedHtml("");
        return;
      }

      const lang = language ?? detectedLanguage ?? "plaintext";
      const html = highlight(codeValue, lang);
      setHighlightedHtml(html);
    }, [codeValue, isReady, language, detectedLanguage, highlight]);

    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLTextAreaElement>) => {
        if (highlightedRef.current) {
          highlightedRef.current.scrollTop = e.currentTarget.scrollTop;
          highlightedRef.current.scrollLeft = e.currentTarget.scrollLeft;
        }
      },
      [],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const lines = e.target.value.split("\n").length;
        if (lines > MAX_CODE_LINES) {
          const truncated = e.target.value
            .split("\n")
            .slice(0, MAX_CODE_LINES)
            .join("\n");
          onChange?.(truncated);
        } else {
          onChange?.(e.target.value);
        }
      },
      [onChange],
    );

    const lineCount = codeValue?.split("\n").length || 1;
    const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

    const handleLineNumbersScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        if (highlightedRef.current) {
          highlightedRef.current.scrollTop = e.currentTarget.scrollTop;
        }
        if (textareaRef.current) {
          textareaRef.current.scrollTop = e.currentTarget.scrollTop;
        }
      },
      [],
    );

    const displayLang = language ?? detectedLanguage;
    const langName = displayLang
      ? displayLang.charAt(0).toUpperCase() + displayLang.slice(1)
      : null;

    return (
      <div className={cn(root({ className }))}>
        <div className={header()}>
          <div className={dots()}>
            <span className="h-3 w-3 rounded-full bg-accent-red" />
            <span className="h-3 w-3 rounded-full bg-accent-amber" />
            <span className="h-3 w-3 rounded-full bg-accent-green" />
          </div>
          {langName && <span className={languageBadge()}>{langName}</span>}
        </div>

        <div className={cn(content(), editorWrapper(), root({ height }))}>
          {showLineNumbers && (
            <div
              className={lineNumbersContainer()}
              onScroll={handleLineNumbersScroll}
            >
              {lines.map((line) => (
                <span key={line} className={lineNumber()}>
                  {line}
                </span>
              ))}
            </div>
          )}

          <div className="relative flex-1">
            <div
              ref={highlightedRef}
              className={highlighted()}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
            <textarea
              ref={(node) => {
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                (
                  textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
                ).current = node;
              }}
              className={cn(
                textarea(),
                showLineNumbers && "w-[calc(100%-48px)]",
              )}
              placeholder="// paste your code here..."
              value={codeValue}
              onChange={handleChange}
              onScroll={handleScroll}
              spellCheck={false}
              {...props}
            />
          </div>
        </div>

        <div className={footer()}>
          <span />
          <span
            className={cn(
              charCounter(),
              isValid ? charCounterValid() : charCounterInvalid(),
            )}
          >
            {charCount.toLocaleString()} /{" "}
            {MAX_CODE_CHARACTERS.toLocaleString()} chars
          </span>
        </div>
      </div>
    );
  },
);

CodeEditor.displayName = "CodeEditor";

export { CodeEditor, codeEditorVariants };
