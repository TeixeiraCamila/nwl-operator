"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  CodeEditor,
  FooterHint,
  Hero,
  LeaderboardPreview,
  LeaderboardTable,
  Toggle,
} from "@/components";
import { MAX_CODE_CHARACTERS } from "@/components/code-editor";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { LANGUAGE_OPTIONS, LANGUAGES } from "@/lib/languages";

function getLanguageName(key: string): string {
  return LANGUAGES[key]?.name ?? key;
}

export default function Home() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState("");
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);

  const { detectedLanguage } = useLanguageDetection(code);

  const isCodeValid = code.length > 0 && code.length <= MAX_CODE_CHARACTERS;

  const mockEntries = [
    {
      rank: 1,
      score: 1.2,
      code: [
        'eval(prompt("enter code"))',
        "document.write(response)",
        "// trust the user lol",
      ],
      lang: "javascript",
    },
    {
      rank: 2,
      score: 1.8,
      code: [
        "if (x == true) { return true; }",
        "else if (x == false) { return false; }",
        "else { return !false; }",
      ],
      lang: "typescript",
    },
    {
      rank: 3,
      score: 2.1,
      code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
      lang: "sql",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-5xl flex-col gap-8 items-center">
        <Hero>
          <Hero.Title prefix="> ">paste your code. get roasted.</Hero.Title>
          <Hero.Description>
            drop your code below and we'll rate it — brutally honest or full
            roast mode
          </Hero.Description>
        </Hero>

        <CodeEditor
          value={code}
          onChange={setCode}
          language={manualLanguage ?? undefined}
          detectedLanguage={detectedLanguage}
          placeholder="// paste your code here..."
        />

        <div className="flex w-[780px] items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <select
                className="h-8 appearance-none rounded border border-border-primary bg-bg-surface pl-2 pr-8 font-mono text-xs text-text-primary outline-none"
                value={manualLanguage ?? detectedLanguage ?? ""}
                onChange={(e) =>
                  setManualLanguage(e.target.value ? e.target.value : null)
                }
              >
                <option value="">
                  Auto-detect
                  {detectedLanguage
                    ? ` (${getLanguageName(detectedLanguage)})`
                    : ""}
                </option>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 h-3 w-3 text-text-tertiary pointer-events-none" />
            </div>
            <Toggle checked={roastMode} onChange={setRoastMode}>
              <span
                className={
                  roastMode ? "text-accent-green" : "text-text-secondary"
                }
              >
                roast mode
              </span>
            </Toggle>
            <span className="font-mono text-xs text-text-tertiary">
              maximum sarcasm enabled
            </span>
          </div>
          <Button variant="default" disabled={!isCodeValid}>
            $ roast_my_code
          </Button>
        </div>

        <FooterHint>
          <FooterHint.Item>2,847 codes roasted</FooterHint.Item>
          <FooterHint.Separator />
          <FooterHint.Item>avg score: 4.2/10</FooterHint.Item>
        </FooterHint>

        <div className="h-[60px]" />

        <LeaderboardPreview>
          <LeaderboardPreview.Header>
            <LeaderboardPreview.Title>
              shame_leaderboard
            </LeaderboardPreview.Title>
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm">
                $ view_all &gt;&gt;
              </Button>
            </Link>
          </LeaderboardPreview.Header>
          <LeaderboardPreview.Description>
            the worst code on the internet, ranked by shame
          </LeaderboardPreview.Description>
          <LeaderboardTable entries={mockEntries} />
        </LeaderboardPreview>

        <div className="h-16" />
      </div>
    </main>
  );
}
