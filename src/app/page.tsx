"use client";

import { useState } from "react";
import {
  Button,
  CodeWindow,
  FooterHint,
  Hero,
  LeaderboardPreview,
  LeaderboardTable,
  Toggle,
} from "@/components";

export default function Home() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState("");

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
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <Hero>
          <Hero.Title prefix="> ">paste your code. get roasted.</Hero.Title>
          <Hero.Description>
            drop your code below and we'll rate it — brutally honest or full
            roast mode
          </Hero.Description>
        </Hero>

        <CodeWindow
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// paste your code here..."
        />

        <div className="flex w-[780px] items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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
          <Button variant="default">$ roast_my_code</Button>
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
            <Button variant="ghost" size="sm">
              $ view_all &gt;&gt;
            </Button>
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
