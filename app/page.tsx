import {
  TextareaWithButton,
  TextareaDisabled,
} from "@/components/ui/JsonToTS/textarea";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Simple Title */}
      <div className="container mx-auto px-4 pt-6 pb-3 text-center">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">
          JSON to TypeScript Interfaces
        </h1>
        <p className="text-sm text-slate-700 max-w-2xl mx-auto">
          Transform JSON objects into TypeScript interfaces instantly
        </p>
      </div>

      {/* How to Use Section - Centered above textareas */}
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white rounded-lg p-3 shadow-sm max-w-md mx-auto mb-4">
          <h2 className="text-base font-semibold mb-2 text-slate-900 text-center">
            How to Use
          </h2>
          <ol className="space-y-1 text-sm">
            <li className="flex gap-2">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="text-slate-700">
                  Paste your JSON data in the input field
                </p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="text-slate-700">
                  Click &quot;Convert to Interfaces&quot; to generate TypeScript
                  interfaces
                </p>
              </div>
            </li>
            <li className="flex gap-2">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="text-slate-700">
                  Copy the generated TypeScript interfaces
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Main Layout - Input and Output */}
      <div className="container mx-auto px-4 py-2">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column: Input */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h2 className="text-sm font-medium text-slate-500">input.json</h2>
            </div>
            <TextareaWithButton />
          </div>

          {/* Right column: Output */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h2 className="text-sm font-medium text-slate-500">
                interfaces.ts
              </h2>
            </div>
            <TextareaDisabled />
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="container mx-auto py-2 text-center text-slate-500 text-xs">
        Built with Next.js and Tailwind CSS by{" "}
        <a
          href="https://mariusmargowski.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Marius Margowski
        </a>
      </footer>
    </div>
  );
}
