import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  lang = "javascript",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div className="w-[560px] border border-border-primary bg-bg-input">
      <div className="flex h-10 w-full items-center gap-3 border-b border-border-primary px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        <span className="flex-1" />
        {filename && (
          <span className="font-mono text-xs text-text-tertiary">
            {filename}
          </span>
        )}
      </div>
      <div
        className="[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-3 [&_pre]:!font-mono [&_pre]:!text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
