import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  languageName?: string;
}

export async function CodeBlock({
  code,
  lang = "javascript",
  languageName,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div className="w-full border border-border-primary bg-bg-input">
      <div className="flex h-10 w-full items-center gap-3 border-b border-border-primary px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        <span className="flex-1" />
        {languageName && (
          <span className="font-mono text-xs text-text-secondary">
            {languageName}
          </span>
        )}
      </div>
      <div
        className="[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-3 [&_pre]:!font-mono [&_pre]:!text-xs"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
