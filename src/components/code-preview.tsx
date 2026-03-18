import type { BundledLanguage } from "shiki";
import { CodeBlock, CodeBlockHeader } from "./code-block";
import { LANGUAGES } from "@/lib/languages";

interface CodePreviewProps {
  code: string | string[];
  lang: string;
}

export function CodePreview({ code, lang }: CodePreviewProps) {
  const codeString = Array.isArray(code) ? code.join("\n") : code;
  const languageName = LANGUAGES[lang]?.name ?? lang;

  return (
    <div className="border border-border-primary overflow-hidden">
      <CodeBlockHeader filename={languageName} />
      <div className="flex bg-bg-input">
        <div className="flex flex-col items-end gap-1.5 py-3 px-2.5 w-10 border-r border-border-primary bg-bg-surface select-none">
          {codeString.split("\n").map((_, i) => (
            <span
              key={`ln-${i}`}
              className="font-mono text-[13px] leading-tight text-text-tertiary"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <CodeBlock
          code={codeString}
          lang={lang as BundledLanguage}
        />
      </div>
    </div>
  );
}
