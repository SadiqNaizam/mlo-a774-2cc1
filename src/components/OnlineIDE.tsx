import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Send, ChevronDown, Terminal, FileText, ListChecks, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Language {
  id: string;
  name: string;
  defaultCode: string;
}

const availableLanguages: Language[] = [
  { id: 'javascript', name: 'JavaScript', defaultCode: 'console.log("Hello, JavaScript!");' },
  { id: 'python', name: 'Python', defaultCode: 'print("Hello, Python!")' },
  { id: 'java', name: 'Java', defaultCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}' },
];

interface OnlineIDEProps {
  problemId?: string;
  initialCode?: string;
  initialLanguageId?: string;
  onCodeRun?: (data: { code: string; language: string; input: string; problemId?: string }) => Promise<{ output: string; error?: string; executionTime?: string; memoryUsed?: string }>;
  onCodeSubmit?: (data: { code: string; language: string; problemId?: string }) => Promise<{ status: string; message: string; testResults?: { name: string; status: 'passed' | 'failed'; output?: string; error?: string }[] }>;
}

const OnlineIDE: React.FC<OnlineIDEProps> = ({
  problemId,
  initialCode,
  initialLanguageId,
  onCodeRun,
  onCodeSubmit,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    availableLanguages.find(lang => lang.id === initialLanguageId) || availableLanguages[0]
  );
  const [code, setCode] = useState<string>(initialCode || selectedLanguage.defaultCode);
  const [customInput, setCustomInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [results, setResults] = useState<string>(''); // Could be structured for test cases
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log('OnlineIDE loaded. Problem ID:', problemId);
  }, [problemId]);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      setCode(selectedLanguage.defaultCode);
    }
  }, [selectedLanguage, initialCode]);

  const handleLanguageChange = (languageId: string) => {
    const newLang = availableLanguages.find(lang => lang.id === languageId);
    if (newLang) {
      setSelectedLanguage(newLang);
      // Optionally reset code or load language-specific template
      // setCode(newLang.defaultCode); 
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setResults('');
    console.log('Running code:', { language: selectedLanguage.name, code, customInput, problemId });
    
    if (onCodeRun) {
      try {
        const response = await onCodeRun({ code, language: selectedLanguage.id, input: customInput, problemId });
        setOutput(response.output || '');
        setResults(response.error ? `Error: ${response.error}` : `Execution Time: ${response.executionTime || 'N/A'}\nMemory Used: ${response.memoryUsed || 'N/A'}`);
        toast({ title: "Code Execution Finished", description: response.error ? "Completed with errors." : "Completed successfully."});
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during execution.";
        setResults(`Runtime Error: ${errorMessage}`);
        toast({ title: "Execution Failed", description: errorMessage, variant: "destructive" });
      }
    } else {
      // Mock behavior
      setTimeout(() => {
        setOutput(`Mock Output for ${selectedLanguage.name}:\nInput: ${customInput}\nCode: ${code.substring(0, 50)}...`);
        setResults('Mock execution successful.');
        toast({ title: "Mock Run Complete", description: "Using placeholder execution." });
      }, 1000);
    }
    setIsRunning(false);
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setOutput('');
    setResults('');
    console.log('Submitting code:', { language: selectedLanguage.name, code, problemId });

    if (onCodeSubmit) {
      try {
        const response = await onCodeSubmit({ code, language: selectedLanguage.id, problemId });
        setResults(`Submission Status: ${response.status}\nMessage: ${response.message}\n\nTest Cases:\n${(response.testResults || []).map(tc => `${tc.name}: ${tc.status.toUpperCase()}${tc.error ? ` - Error: ${tc.error}` : ''}${tc.output ? ` - Output: ${tc.output}` : ''}`).join('\n')}`);
        toast({ title: "Code Submission Finished", description: response.message });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during submission.";
        setResults(`Submission Error: ${errorMessage}`);
        toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" });
      }
    } else {
      // Mock behavior
      setTimeout(() => {
        setResults(`Mock Submission Successful for problem ${problemId}:\nLanguage: ${selectedLanguage.name}\nStatus: Accepted`);
        toast({ title: "Mock Submission Complete", description: "Using placeholder submission." });
      }, 1500);
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl">Online IDE</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px]">
                  {selectedLanguage.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableLanguages.map((lang) => (
                  <DropdownMenuItem key={lang.id} onSelect={() => handleLanguageChange(lang.id)}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleRunCode} disabled={isRunning || isSubmitting} variant="secondary">
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button onClick={handleSubmitCode} disabled={isRunning || isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Code'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="p-1 h-full flex flex-col">
              <label htmlFor="code-editor" className="sr-only">Code Editor</label>
              <Textarea
                id="code-editor"
                placeholder="// Write your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow font-mono text-sm p-3 rounded-md border resize-none h-full"
                aria-label="Code Editor"
              />
              {/* Note: For a real IDE, replace Textarea with a proper code editor like Monaco or CodeMirror */}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} minSize={20}>
            <Tabs defaultValue="input" className="h-full flex flex-col p-1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="input"><FileText className="mr-2 h-4 w-4 inline-block"/>Custom Input</TabsTrigger>
                <TabsTrigger value="output"><Terminal className="mr-2 h-4 w-4 inline-block"/>Output</TabsTrigger>
                <TabsTrigger value="results"><ListChecks className="mr-2 h-4 w-4 inline-block"/>Results</TabsTrigger>
              </TabsList>
              <TabsContent value="input" className="flex-grow mt-1">
                <ScrollArea className="h-full rounded-md border">
                  <Textarea
                    placeholder="Enter custom input for your code..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="font-mono text-sm p-3 h-full resize-none border-0"
                    aria-label="Custom Input Area"
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="output" className="flex-grow mt-1">
                <ScrollArea className="h-full rounded-md border">
                  <pre className="font-mono text-sm p-3 whitespace-pre-wrap break-all min-h-full">
                    {output || "// Program output will appear here..."}
                  </pre>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="results" className="flex-grow mt-1">
                <ScrollArea className="h-full rounded-md border">
                   <pre className="font-mono text-sm p-3 whitespace-pre-wrap break-all min-h-full">
                    {results || "// Compilation errors, runtime errors, or test case results will appear here..."}
                  </pre>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default OnlineIDE;