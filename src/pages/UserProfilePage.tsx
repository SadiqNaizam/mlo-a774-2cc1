import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgressTracker from '@/components/ProgressTracker';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { User, Settings, ListChecks, Bookmark as BookmarkIcon, LayoutDashboard, Edit3, KeyRound, Bell, Save, ArrowRight } from 'lucide-react';

// Placeholder Data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=alexjohnson", // Placeholder avatar
  joinDate: "January 15, 2023",
  bio: "Passionate developer and lifelong learner, exploring the depths of computer science.",
  stats: {
    problemsSolved: 78,
    articlesRead: 120,
    rank: 1234,
  }
};

const progressData = {
  overallProgress: 65,
  categories: [
    { name: "Data Structures", progress: 75 },
    { name: "Algorithms", progress: 60 },
    { name: "Python Programming", progress: 80 },
    { name: "System Design", progress: 45 },
    { name: "Interview Prep", progress: 70 },
  ],
};

type SubmissionStatus = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
interface Submission {
  id: string;
  problemName: string;
  problemLink: string; 
  status: SubmissionStatus;
  date: string;
  language: string;
}
const submissionHistory: Submission[] = [
  { id: "sub1", problemName: "Two Sum Challenge", problemLink: "/practice-problem?id=two-sum", status: "Accepted", date: "2024-07-20", language: "Python" },
  { id: "sub2", problemName: "Reverse Linked List", problemLink: "/practice-problem?id=reverse-linked-list", status: "Wrong Answer", date: "2024-07-18", language: "JavaScript" },
  { id: "sub3", problemName: "Binary Tree Inorder Traversal", problemLink: "/practice-problem?id=btt", status: "Accepted", date: "2024-07-15", language: "C++" },
  { id: "sub4", problemName: "Longest Common Subsequence", problemLink: "/practice-problem?id=lcs", status: "Time Limit Exceeded", date: "2024-07-12", language: "Java" },
  { id: "sub5", problemName: "Graph Depth First Search", problemLink: "/practice-problem?id=dfs", status: "Runtime Error", date: "2024-07-10", language: "Python" },
];

interface Bookmark {
  id: string;
  title: string;
  type: "Article" | "Problem";
  link: string; 
  dateBookmarked: string;
  description?: string;
}
const bookmarkedItems: Bookmark[] = [
  { id: "bm1", title: "Mastering Big O Notation", type: "Article", link: "/article-detail?slug=big-o-notation", dateBookmarked: "2024-07-01", description: "A comprehensive guide to understanding time and space complexity." },
  { id: "bm2", title: "Introduction to Dynamic Programming", type: "Article", link: "/article-detail?slug=dp-basics", dateBookmarked: "2024-06-25", description: "Core concepts and examples of dynamic programming techniques." },
  { id: "bm3", title: "Advanced Graph Traversal Problem", type: "Problem", link: "/practice-problem?id=graph-traversal-adv", dateBookmarked: "2024-06-10", description: "A challenging problem on graph algorithms." },
  { id: "bm4", title: "Sorting Algorithms Compared", type: "Article", link: "/article-detail?slug=sorting-compared", dateBookmarked: "2024-05-15", description: "Comparison of common sorting algorithms like Merge Sort, Quick Sort, etc." },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const getBadgeVariant = (status: SubmissionStatus) => {
    switch (status) {
      case "Accepted": return "default"; // 'default' for success often uses primary color
      case "Wrong Answer": return "destructive";
      case "Runtime Error": return "destructive";
      case "Time Limit Exceeded": return "secondary"; // 'secondary' for warning-like
      default: return "outline";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-muted/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* User Greeting and Avatar Section */}
        <section className="mb-8 p-6 bg-card text-card-foreground rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-primary shadow-md">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="text-4xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{userData.name}</h1>
              <p className="text-muted-foreground mt-1">{userData.email}</p>
              <p className="text-sm text-muted-foreground mt-0.5">Joined: {userData.joinDate}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">{userData.bio}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 sm:mt-0 sm:ml-auto">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-card shadow-sm rounded-lg p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/>Overview</TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2"><ListChecks className="h-4 w-4"/>Submissions</TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2"><BookmarkIcon className="h-4 w-4"/>Bookmarks</TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2"><Settings className="h-4 w-4"/>Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <CardDescription>Your performance at a glance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-2xl font-semibold text-primary">{userData.stats.problemsSolved}</h3>
                    <p className="text-sm text-muted-foreground">Problems Solved</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-2xl font-semibold text-primary">{userData.stats.articlesRead}</h3>
                    <p className="text-sm text-muted-foreground">Articles Read</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-2xl font-semibold text-primary">#{userData.stats.rank}</h3>
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <ProgressTracker userName={userData.name} overallProgress={progressData.overallProgress} categories={progressData.categories} />
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Submission History</CardTitle>
                <CardDescription>Track all your problem-solving attempts and successes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <Table>
                    <TableCaption>A list of your recent submissions.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Problem</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissionHistory.length > 0 ? submissionHistory.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            <Link to={submission.problemLink} className="hover:text-primary hover:underline">
                              {submission.problemName}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(submission.status)}>{submission.status}</Badge>
                          </TableCell>
                          <TableCell>{submission.language}</TableCell>
                          <TableCell className="text-right">{submission.date}</TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                            No submissions yet. Start solving problems!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>My Bookmarks</CardTitle>
                <CardDescription>Your saved articles and problems for quick access.</CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarkedItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookmarkedItems.map((item) => (
                      <Card key={item.id} className="flex flex-col">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg hover:text-primary">
                               <Link to={item.link}>{item.title}</Link>
                            </CardTitle>
                            <Badge variant="outline" className="ml-2 shrink-0">{item.type}</Badge>
                          </div>
                           {item.description && <CardDescription className="text-xs mt-1 line-clamp-2">{item.description}</CardDescription>}
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-xs text-muted-foreground">Bookmarked on: {item.dateBookmarked}</p>
                        </CardContent>
                        <div className="p-4 border-t">
                           <Link to={item.link}>
                            <Button variant="link" className="p-0 h-auto text-sm">
                              View {item.type} <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">You haven't bookmarked any items yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5" />Profile Settings</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileName">Full Name</Label>
                  <Input id="profileName" defaultValue={userData.name} />
                </div>
                <div>
                  <Label htmlFor="profileEmail">Email Address</Label>
                  <Input id="profileEmail" type="email" defaultValue={userData.email} />
                </div>
                 <div>
                  <Label htmlFor="profileBio">Bio</Label>
                  <Input id="profileBio" defaultValue={userData.bio} placeholder="Tell us a bit about yourself" />
                </div>
                <Button><Save className="mr-2 h-4 w-4" />Save Profile Changes</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><KeyRound className="mr-2 h-5 w-5" />Account Security</CardTitle>
                <CardDescription>Manage your password and account security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button><Save className="mr-2 h-4 w-4" />Change Password</Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" />Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications from the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for notification settings */}
                <p className="text-sm text-muted-foreground">Notification settings will be available here.</p>
                <Button disabled><Save className="mr-2 h-4 w-4" />Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;