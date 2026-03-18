import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { AnalysisCard } from "@/components/ui/analysis-card";
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

export default async function RoastResultPage({
  params,
}: RoastResultPageProps) {
  const { id } = await params;

  const lang = "javascript";
  const languageName = LANGUAGES[lang]?.name ?? lang;
  const overallScore = 42;

  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-5xl flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-mono text-2xl font-bold text-text-primary">
            roast_complete
          </h1>
          <p className="font-mono text-xs text-text-secondary">
            {"//"} analysis for {id}
          </p>
        </div>

        <div className="flex w-full items-center justify-center gap-16">
          <ScoreRing score={overallScore}>
            <ScoreRing.Value>{overallScore}</ScoreRing.Value>
            <ScoreRing.Label>score</ScoreRing.Label>
          </ScoreRing>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">
                roast mode:
              </span>
              <span className="font-mono text-xs text-accent-green">enabled</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">
                language:
              </span>
              <span className="font-mono text-xs text-text-primary">
                {languageName}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">lines:</span>
              <span className="font-mono text-xs text-text-primary">14</span>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-6">
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
              <AnalysisCard
                key={index}
                severity={analysis.severity}
                className="w-full"
              >
                <AnalysisCard.Badge severity={analysis.severity} />
                <AnalysisCard.Title>{analysis.title}</AnalysisCard.Title>
                <AnalysisCard.Description>
                  {analysis.description}
                </AnalysisCard.Description>
              </AnalysisCard>
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

          <CodeBlock code={STATIC_CODE} lang={lang} languageName={languageName} />
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
