import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lightbulb, Target, Code2, CheckCircle2, TrendingUp, Trophy } from 'lucide-react';

interface CategoryProgressItem {
  name: string;
  progress: number; // Percentage 0-100
}

interface ProgressTrackerProps {
  userName?: string;
  overallProgress: number; // Percentage 0-100
  categories: CategoryProgressItem[];
}

// Helper function to determine an icon based on category name
const getIconForCategory = (categoryName: string): React.ReactNode => {
  const lowerName = categoryName.toLowerCase();
  if (lowerName.includes("data structure")) return <BookOpen className="mr-3 h-5 w-5 text-blue-600" />;
  if (lowerName.includes("algorithm")) return <Lightbulb className="mr-3 h-5 w-5 text-yellow-500" />;
  if (lowerName.includes("problem solving") || lowerName.includes("practice")) return <Target className="mr-3 h-5 w-5 text-green-600" />;
  if (lowerName.includes("language") || lowerName.includes("python") || lowerName.includes("java") || lowerName.includes("javascript") || lowerName.includes("c++")) return <Code2 className="mr-3 h-5 w-5 text-purple-600" />;
  if (lowerName.includes("interview")) return <Trophy className="mr-3 h-5 w-5 text-red-500" />;
  return <CheckCircle2 className="mr-3 h-5 w-5 text-gray-500" />; // Default icon
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  userName,
  overallProgress,
  categories,
}) => {
  console.log('ProgressTracker loaded');

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <TrendingUp className="h-10 w-10 text-primary" />
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
              {userName ? `${userName}'s Learning Journey` : "Your Learning Progress"}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Track your achievements and see where to focus next.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-4 md:p-6">
        {/* Overall Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-700">Overall Completion</h3>
            <span className="text-xl md:text-2xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} aria-label={`Overall progress: ${overallProgress}%`} className="h-3 rounded-full" />
        </div>

        {/* Categories Progress Section */}
        {categories && categories.length > 0 && (
          <div className="space-y-5">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 border-t pt-4">Progress by Category</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {categories.map((category, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md border">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center">
                      {getIconForCategory(category.name)}
                      <span className="text-sm font-medium text-gray-700 line-clamp-1" title={category.name}>{category.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} aria-label={`${category.name} progress: ${category.progress}%`} className="h-2 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        )}
         {(!categories || categories.length === 0) && (
            <p className="text-center text-gray-500 py-4">No category progress to display yet. Keep learning!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;