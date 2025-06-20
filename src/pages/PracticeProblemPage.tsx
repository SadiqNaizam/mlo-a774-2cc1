import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProblemStatementDisplay from '@/components/ProblemStatementDisplay';
import OnlineIDE from '@/components/OnlineIDE';
import CommentThread from '@/components/CommentThread';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data for the page
const problemDetails = {
  title: "Two Sum Challenge",
  statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.",
  inputSpecification: "The first line contains an integer `n` (2 <= n <= 10^4), the number of elements in the array `nums`.\nThe second line contains `n` space-separated integers `nums[i]` (-10^9 <= nums[i] <= 10^9).\nThe third line contains an integer `target` (-10^9 <= target <= 10^9).",
  outputSpecification: "Return a list or array of two integers, representing the 0-based indices of the two numbers.",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: ""
    }
  ]
};

const mockSubmissions = [
  { id: "sub1", timestamp: "2024-07-28 10:30", language: "JavaScript", status: "Accepted", runtime: "76ms", memory: "42.5MB" },
  { id: "sub2", timestamp: "2024-07-28 10:15", language: "Python", status: "Wrong Answer", runtime: "50ms", memory: "16.3MB" },
  { id: "sub3", timestamp: "2024-07-28 09:50", language: "JavaScript", status: "Time Limit Exceeded", runtime: "2000ms", memory: "43.0MB" },
];

const mockCurrentUserForComments = {
  id: 'user-practice-page-001',
  name: 'Current Learner',
  avatarUrl: 'https://i.pravatar.cc/150?u=learner001', // Placeholder avatar
};

const problemId = "two-sum-challenge"; // Placeholder problem ID

const PracticeProblemPage = () => {
  console.log('PracticeProblemPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/10 dark:bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-4 sm:mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* Link to /practice-problem as per App.tsx for generic practice section access from Header */}
              <BreadcrumbLink asChild>
                <Link to="/practice-problem">Practice</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{problemDetails.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <ResizablePanelGroup 
          direction="horizontal" 
          className="my-6 min-h-[600px] md:min-h-[700px] rounded-lg border bg-card dark:bg-gray-950 shadow-sm"
        >
          <ResizablePanel defaultSize={40} minSize={30} className="flex flex-col">
            <ScrollArea className="h-full">
              <div className="p-4 md:p-6"> {/* Add padding inside scroll area */}
                <ProblemStatementDisplay {...problemDetails} />
              </div>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={40} className="flex flex-col">
            {/* OnlineIDE should handle its own internal layout and fill the panel */}
            <OnlineIDE 
              problemId={problemId}
              initialLanguageId="python" // Default to Python or any preferred language
              initialCode={`# Problem: ${problemDetails.title}\n# Start your Python code here\n\ndef solve():\n    # Your solution logic\n    pass\n`}
            />
          </ResizablePanel>
        </ResizablePanelGroup>

        <Tabs defaultValue="submissions" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:w-auto">
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="editorial">Editorial</TabsTrigger>
          </TabsList>
          <TabsContent value="submissions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Submission History</CardTitle>
              </CardHeader>
              <CardContent>
                {mockSubmissions.length > 0 ? (
                  <Table>
                    <TableCaption>A list of your recent submissions for this problem.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Timestamp</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Runtime</TableHead>
                        <TableHead className="text-right">Memory</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.timestamp}</TableCell>
                          <TableCell>{submission.language}</TableCell>
                          <TableCell
                            className={
                              submission.status === "Accepted" ? "text-green-600 dark:text-green-500" : 
                              submission.status === "Wrong Answer" ? "text-red-600 dark:text-red-500" :
                              submission.status === "Time Limit Exceeded" ? "text-yellow-600 dark:text-yellow-500" : ""
                            }
                          >
                            {submission.status}
                          </TableCell>
                          <TableCell className="text-right">{submission.runtime}</TableCell>
                          <TableCell className="text-right">{submission.memory}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No submissions yet for this problem.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="solution" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Official Solution</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h4>Approach: Using a Hash Map</h4>
                <p>For the "Two Sum" problem, a common and efficient approach is to use a hash map (or dictionary in Python, object in JavaScript) to store the numbers encountered so far and their indices.</p>
                <p>Iterate through the array `nums` once. For each element `num` at index `i`:</p>
                <ol>
                  <li>Calculate the complement: `complement = target - num`.</li>
                  <li>Check if `complement` exists as a key in the hash map.
                      <ul>
                        <li>If it exists, you have found the two numbers. The first number is `complement` (its index is stored in the hash map), and the second number is `num` (at current index `i`). Return their indices.</li>
                      </ul>
                  </li>
                  <li>If `complement` does not exist in the hash map, add the current number `num` and its index `i` to the hash map: `map[num] = i`.</li>
                </ol>
                <p>This approach ensures that you find the solution in a single pass through the array, leading to a time complexity of O(n) on average, as hash map operations (insertion and lookup) take O(1) on average. The space complexity is O(n) in the worst case, as the hash map might store up to n-1 elements.</p>
                <pre><code>{`// Example (Python)
def twoSum(nums, target):
    numMap = {} # Stores number -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in numMap:
            return [numMap[complement], i]
        numMap[num] = i
    return [] # Should not be reached based on problem statement (exactly one solution)
`}</code></pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="editorial" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Problem Editorial</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>The "Two Sum" problem is a classic introductory problem often used in technical interviews to assess understanding of basic data structures and algorithms. While a brute-force approach (checking every pair of numbers) would work, it has a time complexity of O(n^2), which is usually too slow for typical constraints.</p>
                <h4>Key Insights:</h4>
                <ul>
                  <li><strong>Reducing Lookups:</strong> The core idea to optimize from O(n^2) is to reduce the time taken to find the "complement" (i.e., `target - current_number`). Instead of iterating again to find it, we need a faster way.</li>
                  <li><strong>Hash Maps for Speed:</strong> Hash maps (or dictionaries) provide average O(1) time complexity for insertions and lookups. This makes them ideal for storing previously seen numbers and quickly checking for the existence of their complements.</li>
                </ul>
                <h4>Alternative Approaches (and why they might be less optimal here):</h4>
                <ul>
                  <li><strong>Sorting and Two Pointers:</strong> If modifying the array or returning values instead of indices were allowed, sorting the array (O(n log n)) and then using a two-pointer approach (O(n)) could also solve it. However, sorting changes indices, which is not allowed here.</li>
                </ul>
                <h4>Common Pitfalls:</h4>
                <ul>
                  <li>Forgetting to handle the case where the two numbers might be the same element used twice (e.g., if `nums = [3, 5, 3]` and `target = 6`, using the first `3` twice is not allowed). The hash map approach naturally handles this if you add the current number to the map *after* checking for its complement.</li>
                  <li>Index issues: Ensuring 0-based or 1-based indexing is handled correctly as per problem requirements.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <CommentThread itemId={problemId} currentUser={mockCurrentUserForComments} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeProblemPage;