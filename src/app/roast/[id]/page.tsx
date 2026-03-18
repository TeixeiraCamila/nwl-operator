import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ui/score-ring";
import { LANGUAGES } from "@/lib/languages";

interface RoastResultPageProps {
  params: Promise<{ id: string }>;
}

const STATIC_CODE = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.price > 0) {
      total += item.price;
    }
  }
  return total;
}`;

const STATIC_ANALYSES = [
  {
    severity: "critical" as const,
    title: "using var instead of const/let",
    description:
      "The var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. Use const or let for better scoping.",
  },
  {
    severity: "warning" as const,
    title: "missing return type annotation",
    description:
      "Consider adding a return type to the function signature. TypeScript can help catch bugs at compile time with explicit types.",
  },
  {
    severity: "warning" as const,
    title: "empty block in conditional",
    description:
      "Empty conditional blocks can be confusing. Consider adding an early return or logging for better code clarity.",
  },
  {
    severity: "good" as const,
    title: "basic input validation",
    description:
      "Checking for positive prices shows good awareness of data validation patterns.",
  },
] as const;

function getScoreColor(score: number) {
  if (score >= 7) return "accent-green";
  if (score >= 4) return "accent-amber";
  return "accent-red";
}

function getVerdict(score: number) {
  if (score >= 7) return "needs_some_polish";
  if (score >= 4) return "could_be_better";
  return "needs_serious_help";
}

function getRoastMessage(score: number) {
  if (score >= 7) return '"not bad... but we have notes."';
  if (score >= 4) return '"this code walks so future maintainers can run... away from it."';
  return '"this code looks like it was written during a power outage... in 2005."';
}

export default async function RoastResultPage({
  params,
}: RoastResultPageProps) {
  const { id } = await params;

  const lang = "javascript";
  const languageName = LANGUAGES[lang]?.name ?? lang;
  const overallScore = 3.5;
  const scoreColor = getScoreColor(overallScore);
  const verdict = getVerdict(overallScore);
  const roastMessage = getRoastMessage(overallScore);

  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-5xl flex-col items-center gap-12">
        <div className="flex items-center gap-12">
          <ScoreRing score={overallScore} maxScore={10}>
            <ScoreRing.Value>{overallScore}</ScoreRing.Value>
            <ScoreRing.Label>/10</ScoreRing.Label>
          </ScoreRing>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BadgeDot className={`h-2 w-2 rounded-full bg-${scoreColor}`} />
              <Badge variant={scoreColor as "critical" | "warning" | "good"}>
                verdict: {verdict}
              </Badge>
            </div>

            <p className="max-w-md font-mono text-xl leading-relaxed text-text-primary">
              {roastMessage}
            </p>

            <div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
              <span>lang: {languageName}</span>
              <span>·</span>
              <span>7 lines</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 border border-border-primary px-4 py-2">
                <span className="font-mono text-xs text-text-primary">
                  $ share_roast
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              issues_found
            </span>
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            {STATIC_ANALYSES.map((analysis, index) => (
              <div
                key={index}
                className="flex w-full flex-col gap-3 border border-border-primary p-5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant={analysis.severity}>{analysis.severity}</Badge>
                </div>
                <span className="font-mono text-sm text-text-primary">
                  {analysis.title}
                </span>
                <span className="w-full font-mono text-xs leading-relaxed text-text-secondary">
                  {analysis.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              your_code
            </span>
          </div>

          <CodeBlock
            code={STATIC_CODE}
            lang={lang}
            languageName={languageName}
          />
        </div>

        <div className="flex w-full max-w-3xl items-center justify-between">
          <Link href="/">
            <Button variant="ghost">$ back_to_home</Button>
          </Link>
          <Button variant="default">$ roast_another</Button>
        </div>
      </div>
    </main>
  );
}
