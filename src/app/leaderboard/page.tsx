import type { Metadata } from "next";
import Link from "next/link";
import { Button, FooterHint, Hero, LeaderboardEntry } from "@/components";

export const metadata: Metadata = {
  title: "Shame Leaderboard | devroast",
  description:
    "the most roasted code on the internet. see the worst code submissions ranked by shame.",
  openGraph: {
    title: "Shame Leaderboard | devroast",
    description: "the most roasted code on the internet",
    type: "website",
  },
};

export default function LeaderboardPage() {
  const entries = [
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
    {
      rank: 4,
      score: 2.5,
      code: ["function getItem(arr, index) {", "  return arr[index];", "}"],
      lang: "javascript",
    },
    {
      rank: 5,
      score: 2.8,
      code: [
        "try { } catch(e) { }",
        "// error? what error?",
        "// moving on...",
      ],
      lang: "python",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-3xl flex-col gap-10 items-center">
        <Hero>
          <Hero.Title prefix="> ">shame_leaderboard</Hero.Title>
          <Hero.Description>
            the most roasted code on the internet
          </Hero.Description>
        </Hero>

        <div className="flex w-full flex-col gap-5">
          {entries.map((entry) => (
            <LeaderboardEntry
              key={entry.rank}
              rank={entry.rank}
              score={entry.score}
              code={entry.code}
              lang={entry.lang}
            />
          ))}
        </div>


        <div className="h-16" />
      </div>
    </main>
  );
}
