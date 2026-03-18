"use client";

import { useState } from "react";
import { Button, CodeEditor, Toggle } from "@/components";
import { MAX_CHARACTERS } from "@/components/code-editor";
import { useLanguageDetection } from "@/hooks/use-language-detection";

export function HomeClient() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState("");
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const { detectedLanguage } = useLanguageDetection(code);
  const language = manualLanguage ?? detectedLanguage;

  const isCodeValid = code.length > 0 && code.length <= MAX_CHARACTERS;

  return (
    <>
      <CodeEditor
        value={code}
        onChange={setCode}
        language={language}
        onLanguageChange={setManualLanguage}
        className="w-full max-w-3xl"
      />

      <div className="flex w-[780px] items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Toggle
            checked={roastMode}
            onCheckedChange={setRoastMode}
            label="roast mode"
          />
          <span className="font-mono text-xs text-text-tertiary">
            maximum sarcasm enabled
          </span>
        </div>
        <Button variant="default" disabled={!isCodeValid}>
          $ roast_my_code
        </Button>
      </div>
    </>
  );
}
