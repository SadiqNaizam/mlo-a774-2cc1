import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemStatementDisplayProps {
  title: string;
  statement: string;
  inputSpecification: string;
  outputSpecification: string;
  constraints: string[];
  examples: Example[];
}

const ProblemStatementDisplay: React.FC<ProblemStatementDisplayProps> = ({
  title,
  statement,
  inputSpecification,
  outputSpecification,
  constraints,
  examples,
}) => {
  console.log('ProblemStatementDisplay loaded for problem:', title);

  // Helper to render multi-line text (e.g., from \n separated strings) as paragraphs
  const renderMultiLineText = (text: string | undefined) => {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
      <p key={index} className="mb-2 last:mb-0 text-gray-700 dark:text-gray-300">
        {paragraph}
      </p>
    ));
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <CardHeader className="border-b dark:border-gray-700">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Problem Statement Section */}
        <section aria-labelledby="problem-statement-heading">
          <h3 id="problem-statement-heading" className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Problem Statement
          </h3>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {renderMultiLineText(statement)}
          </div>
        </section>

        <Separator className="dark:bg-gray-700" />

        {/* Input Specification Section */}
        <section aria-labelledby="input-spec-heading">
          <h3 id="input-spec-heading" className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Input Specification
          </h3>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {renderMultiLineText(inputSpecification)}
          </div>
        </section>

        <Separator className="dark:bg-gray-700" />

        {/* Output Specification Section */}
        <section aria-labelledby="output-spec-heading">
          <h3 id="output-spec-heading" className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Output Specification
          </h3>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {renderMultiLineText(outputSpecification)}
          </div>
        </section

        <Separator className="dark:bg-gray-700" />

        {/* Constraints Section */}
        <section aria-labelledby="constraints-heading">
          <h3 id="constraints-heading" className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Constraints
          </h3>
          <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 dark:text-gray-300">
            {constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </section>

        {examples && examples.length > 0 && <Separator className="dark:bg-gray-700" />}

        {/* Examples Section */}
        {examples && examples.length > 0 && (
          <section aria-labelledby="examples-heading">
            <h3 id="examples-heading" className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Examples
            </h3>
            <div className="space-y-6">
              {examples.map((example, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/60 shadow-sm">
                  <h4 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">Example {index + 1}</h4>
                  
                  <div className="mb-3">
                    <p className="font-semibold text-sm mb-1 text-gray-600 dark:text-gray-400">Input:</p>
                    <pre className="bg-gray-100 dark:bg-gray-900/80 p-3 rounded-md text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                      <code className="whitespace-pre-wrap">{example.input}</code>
                    </pre>
                  </div>

                  <div className="mb-3">
                    <p className="font-semibold text-sm mb-1 text-gray-600 dark:text-gray-400">Output:</p>
                    <pre className="bg-gray-100 dark:bg-gray-900/80 p-3 rounded-md text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                      <code className="whitespace-pre-wrap">{example.output}</code>
                    </pre>
                  </div>

                  {example.explanation && (
                    <div>
                      <p className="font-semibold text-sm mb-1 text-gray-600 dark:text-gray-400">Explanation:</p>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {renderMultiLineText(example.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default ProblemStatementDisplay;