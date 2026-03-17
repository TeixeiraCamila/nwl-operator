import {
  AnalysisCard,
  Badge,
  BadgeDot,
  Button,
  CodeBlock,
  DiffLine,
  ScoreRing,
  TableRow,
  Toggle,
} from "@/components";

const codeExample = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export default function ExamplesPage() {
  return (
    <div className="container mx-auto min-h-screen bg-bg-page p-16">
      <h1 className="mb-16 font-mono text-4xl font-bold text-text-primary">
        {"// component_library"}
      </h1>

      <div className="flex flex-col gap-16">
        {/* Button Variants */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              button_variants
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Different visual styles for buttons
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              button_sizes
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Different sizes for buttons
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">Icon</Button>
          </div>
        </section>

        {/* Toggle */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              toggle
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Switch component with label
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Toggle>roast mode</Toggle>
            <Toggle>roast mode</Toggle>
          </div>
        </section>

        {/* Badge */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              badge
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Status badges with dot indicator
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <BadgeDot className="bg-accent-red" />
              <Badge variant="critical">critical</Badge>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDot className="bg-accent-amber" />
              <Badge variant="warning">warning</Badge>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDot className="bg-accent-green" />
              <Badge variant="good">good</Badge>
            </div>
          </div>
        </section>

        {/* Analysis Card */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              analysis_card
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Card component for code analysis
          </p>
          <AnalysisCard
            severity="critical"
            title="using var instead of const/let"
            description="the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs."
          />
        </section>

        {/* Code Block */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              code_block
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Server component with syntax highlighting
          </p>
          <CodeBlock
            code={codeExample}
            lang="javascript"
            filename="calculate.js"
          />
        </section>

        {/* Diff Line */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              diff_line
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Visual diff lines for code changes
          </p>
          <div className="flex flex-col">
            <DiffLine prefix="-" code="var total = 0;" type="removed" />
            <DiffLine prefix="+" code="const total = 0;" type="added" />
          </div>
        </section>

        {/* Table Row */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              table_row
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Layout component for table rows
          </p>
          <TableRow>
            <span className="w-10 font-mono text-text-tertiary">#1</span>
            <span className="flex-1 font-mono text-text-primary">
              devroast_user
            </span>
            <span className="font-mono text-accent-green">850</span>
          </TableRow>
        </section>

        {/* Score Ring */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-xl font-bold text-text-primary">
              score_ring
            </h2>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            Circular score indicator
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <ScoreRing score={85} label="Score" />
            <ScoreRing score={45} label="Score" />
            <ScoreRing score={15} label="Score" />
          </div>
        </section>
      </div>
    </div>
  );
}
