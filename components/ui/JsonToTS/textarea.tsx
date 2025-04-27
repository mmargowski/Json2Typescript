"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import JsonToTS from "json-to-ts";
import { useSearchParams } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 font-mono text-sm min-h-[240px] w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-100 resize-none",
        className
      )}
      {...props}
    />
  );
}

function TextareaWithButton() {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const formatJsonError = (error: Error, jsonString: string): string => {
    if (error instanceof SyntaxError) {
      const match = error.message.match(/position (\d+)/);
      if (match && match[1]) {
        const position = parseInt(match[1], 10);
        const lines = jsonString.slice(0, position).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return `JSON Syntax Error at line ${line}, column ${column}: ${error.message}`;
      }
    }
    return `Invalid JSON format: ${error.message}`;
  };

  const handleClick = () => {
    setError(null);
    try {
      const json = JSON.parse(content);
      const generatedInterfaces = JsonToTS(json);

      // Update URL with interfaces
      const params = new URLSearchParams(searchParams.toString());
      params.set("interfaces", JSON.stringify(generatedInterfaces));

      // Update the URL without refreshing the page
      router.push(`?${params.toString()}`, { scroll: false });

      // Reset the textarea
      setContent("");
    } catch (error) {
      console.error("Error parsing JSON:", error);
      if (error instanceof Error) {
        setError(formatJsonError(error, content));
      } else {
        setError("Invalid JSON format. Please check your input.");
      }
    }
  };

  const reset = () => {
    setContent("");
    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("interfaces");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid w-full gap-2">
      <div className="relative bg-slate-50 rounded-md min-h-[240px] w-full font-mono text-sm">
        <Textarea
          placeholder={`Insert JSON here. For example:
{
  "user": {
    "name": "John Doe",
    "age": 30,
    "isActive": true,
    "roles": ["admin", "editor"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown"
    }
  }
}`}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError(null);
          }}
          spellCheck="false"
          className={cn(
            "text-slate-800 bg-slate-50 border-slate-200 h-[240px] resize-none focus:ring-blue-600/25",
            error && "border-red-300 focus:ring-red-200"
          )}
        />
      </div>

      {error && (
        <div className="text-red-500 text-xs bg-red-50 p-2 rounded-md border border-red-200">
          <p className="font-medium mb-1">Error</p>
          <p className="font-mono">{error}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!content.trim()}
        >
          Convert to Interfaces
        </Button>
        <Button
          variant="destructive"
          onClick={reset}
          disabled={
            !content.trim() && !searchParams.has("interfaces") && !error
          }
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function TextareaDisabled() {
  const searchParams = useSearchParams();
  const interfaces = searchParams.get("interfaces");
  const [copied, setCopied] = useState(false);

  const formattedInterfaces = React.useMemo(() => {
    if (!interfaces) return "";
    try {
      const parsedInterfaces = JSON.parse(interfaces);
      return parsedInterfaces.join("\n\n");
    } catch (error) {
      console.error("Error parsing interfaces:", error);
      return "Error parsing interfaces";
    }
  }, [interfaces]);

  const handleCopy = () => {
    if (formattedInterfaces) {
      navigator.clipboard.writeText(formattedInterfaces);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <div className="bg-slate-50 rounded-md w-full text-sm font-mono border border-slate-200">
        {formattedInterfaces ? (
          <SyntaxHighlighter
            language="typescript"
            style={oneLight}
            customStyle={{
              margin: 0,
              padding: "12px",
              height: "240px",
              borderRadius: "0.375rem",
              background: "#F8FAFC",
              overflow: "auto",
            }}
          >
            {formattedInterfaces}
          </SyntaxHighlighter>
        ) : (
          <div className="p-3 text-slate-400 h-[240px] flex items-center justify-center">
            TypeScript interfaces will appear here.
          </div>
        )}
      </div>
      {formattedInterfaces && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs py-1 px-2 rounded transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}

export { Textarea, TextareaWithButton, TextareaDisabled };
