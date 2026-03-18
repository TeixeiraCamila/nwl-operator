import { CodeBlock } from "./code-block";
import { LANGUAGES } from "@/lib/languages";

interface CodePreviewProps {
  code: string | string[];
  lang: string;
}

export function CodePreview({ code, lang }: CodePreviewProps) {
  const codeString = Array.isArray(code) ? code.join("\n") : code;
  const languageName = LANGUAGES[lang]?.name ?? lang;

  return (
    <CodeBlock
      code={codeString}
      lang={lang}
      languageName={languageName}
    />
  );
}
