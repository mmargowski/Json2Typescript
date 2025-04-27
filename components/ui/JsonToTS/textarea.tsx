"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import JsonToTS from "json-to-ts";
import { useSearchParams } from "next/navigation";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

function TextareaWithButton() {
  const [content, setContent] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
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
      alert("Invalid JSON format. Please check your input.");
    }
  };

  const reset = () => {
    setContent("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("interfaces");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid w-full gap-2">
      <Textarea
        placeholder="Insert JSON here."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <Button onClick={handleClick}>Convert to Type</Button>
        <Button variant="destructive" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function TextareaDisabled() {
  const searchParams = useSearchParams();
  const interfaces = searchParams.get("interfaces");

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

  return (
    <Textarea
      placeholder="Type your message here."
      value={formattedInterfaces}
      disabled
    />
  );
}

export { Textarea, TextareaWithButton, TextareaDisabled };
