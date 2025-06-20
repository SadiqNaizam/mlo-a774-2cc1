import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CommentThread from '@/components/CommentThread'; // Assuming CommentThreadProps: itemId: string, currentUser: User

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // For related articles or feedback section

// Lucide Icons
import { Home, ChevronRight, BookOpen, Clock, UserCircle, Bookmark, Share2, ExternalLink } from 'lucide-react';

// Placeholder SyntaxHighlighterComponent (as it's in layout_info but not provided as custom/shadcn)
interface SyntaxHighlighterProps {
  code: string;
  language: string;
  className?: string;
}

const SyntaxHighlighterComponent: React.FC<SyntaxHighlighterProps> = ({ code, language, className = '' }) => {
  console.log(`SyntaxHighlighterComponent rendering for language: ${language}`);
  return (
    <div className={`bg-gray-900 dark:bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-6 shadow-md ${className}`}>
      <pre><code className={`language-${language}`}>{code}</code></pre>
    </div>
  );
};

// Mock data for the page
const articleData = {
  title: "Understanding Linked Lists: A Comprehensive Guide",
  slug: "understanding-linked-lists",
  author: {
    name: "Dr. Code Alchemist",
    avatarUrl: "https://i.pravatar.cc/150?u=drCodeAlchemist",
    bio: "Passionate about data structures and algorithms, helping aspiring developers master complex topics.",
  },
  publicationDate: "October 26, 2023",
  readTime: "Approx. 10 min read",
  bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  content: [
    { type: 'paragraph', text: "Linked lists are one of the most fundamental data structures in computer science. Unlike arrays, linked lists are not stored in contiguous memory locations. Instead, they consist of nodes, where each node contains data and a pointer (or link) to the next node in the sequence. This structure allows for dynamic memory allocation and efficient insertions and deletions, especially in the middle of the list." },
    { type: 'heading', level: 2, text: "What is a Node?" },
    { type: 'paragraph', text: "A node in a linked list typically has two components: \n1. Data: The actual value stored in the node (e.g., an integer, a string, or a more complex object). \n2. Next Pointer: A reference to the next node in the list. For the last node, this pointer is usually null, indicating the end of the list." },
    { type: 'code', language: 'javascript', code: "class Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}\n\n// Example usage:\nconst node1 = new Node(10);\nconst node2 = new Node(20);\nnode1.next = node2;\n\nconsole.log('Node 1 data:', node1.data);\nconsole.log('Node 1 points to Node 2 data:', node1.next.data);" },
    { type: 'heading', level: 2, text: "Types of Linked Lists" },
    { type: 'list', items: ["Singly Linked List: Each node points only to the next node.", "Doubly Linked List: Each node points to both the next and the previous node.", "Circular Linked List: The last node points back to the first node, forming a circle."] },
    { type: 'image', src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60", alt: "Abstract representation of code logic", caption: "Fig 1: Visualizing complex data flows." },
    { type: 'paragraph', text: "Operations on linked lists include insertion (at the beginning, end, or a specific position), deletion, searching, and traversal. Understanding their time complexities is crucial for choosing the right data structure for a given problem." },
  ],
};

const relatedArticles = [
  { slug: "mastering-big-o-notation", title: "Mastering Big O Notation for Algorithm Analysis" },
  { slug: "introduction-to-hash-tables", title: "An Introduction to Hash Tables" },
  { slug: "binary-search-trees-explained", title: "Binary Search Trees Explained Simply" },
];

const currentUserForComments = {
  id: 'user-gfg-001',
  name: 'CuriousLearner123',
  avatarUrl: 'https://i.pravatar.cc/150?u=CuriousLearner123',
};


const ArticleDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || articleData.slug; // Use slug from URL or default

  console.log('ArticleDetailPage loaded for slug:', slug);

  // For a real app, you would fetch articleData based on the slug
  // For this example, we'll use the static articleData and just log the slug.

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-6 sm:py-10 px-4 md:px-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6 text-sm">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center hover:text-primary">
                    <Home className="h-4 w-4 mr-1.5" /> Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/article-list" className="hover:text-primary">Articles</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-foreground line-clamp-1" title={articleData.title}>
                  {articleData.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article className="bg-background dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
            {articleData.bannerUrl && (
                <img src={articleData.bannerUrl} alt={`${articleData.title} banner`} className="w-full h-48 sm:h-64 md:h-80 object-cover" />
            )}
            <div className="p-6 md:p-8 lg:p-12">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                  {articleData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground dark:text-gray-400">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-2.5 border-2 border-primary/50">
                      <AvatarImage src={articleData.author.avatarUrl} alt={articleData.author.name} />
                      <AvatarFallback>{articleData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>By {articleData.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>Published on {articleData.publicationDate}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    <span>{articleData.readTime}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center space-x-3">
                     <Button variant="outline" size="sm" className="dark:border-gray-700 dark:hover:bg-gray-800">
                        <Bookmark className="mr-2 h-4 w-4" /> Bookmark
                     </Button>
                     <Button variant="outline" size="sm" className="dark:border-gray-700 dark:hover:bg-gray-800">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                     </Button>
                </div>
              </header>
              
              <Separator className="my-8 dark:bg-gray-700" />

              {/* Article Body */}
              <div className="prose prose-stone dark:prose-invert lg:prose-lg xl:prose-xl max-w-none">
                {articleData.content.map((item, index) => {
                  if (item.type === 'paragraph') {
                    return <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.text.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>;
                  }
                  if (item.type === 'heading') {
                    const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={index} className="mt-8 mb-4 font-semibold text-gray-800 dark:text-gray-200">{item.text}</HeadingTag>;
                  }
                  if (item.type === 'code') {
                    return <SyntaxHighlighterComponent key={index} code={item.code} language={item.language} />;
                  }
                  if (item.type === 'list') {
                    return <ul key={index} className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      {item.items.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>;
                  }
                  if (item.type === 'image') {
                    return (
                      <figure key={index} className="my-8">
                        <img src={item.src} alt={item.alt} className="rounded-lg shadow-lg mx-auto max-w-full h-auto border dark:border-gray-700" />
                        {item.caption && <figcaption className="text-center text-sm text-muted-foreground dark:text-gray-400 mt-2">{item.caption}</figcaption>}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>

              <Separator className="my-12 dark:bg-gray-700" />

              {/* Author Bio Box */}
              <Card className="bg-muted/50 dark:bg-gray-800/50 border dark:border-gray-700/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={articleData.author.avatarUrl} alt={articleData.author.name} />
                            <AvatarFallback>{articleData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl text-gray-800 dark:text-gray-200">{articleData.author.name}</CardTitle>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Author</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{articleData.author.bio}</p>
                </CardContent>
              </Card>


              <Separator className="my-12 dark:bg-gray-700" />

              {/* Related Articles Section */}
              <section aria-labelledby="related-articles-title" className="mt-12">
                <h2 id="related-articles-title" className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Keep Learning
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map(related => (
                    <Link 
                      key={related.slug} 
                      to={`/article-detail?slug=${related.slug}`}
                      className="block p-5 bg-background dark:bg-gray-800/70 border dark:border-gray-700/50 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-primary/50 dark:hover:border-primary/70 group"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-2 group-hover:underline line-clamp-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3 line-clamp-3">
                        Explore more concepts related to {articleData.title.substring(0,20)}...
                      </p>
                      <div className="flex items-center text-sm text-primary font-medium group-hover:underline">
                        Read article <ExternalLink className="ml-1.5 h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </article>

          {/* Feedback Section - Using standalone Button/Textarea */}
          <Card className="mt-12 shadow-lg rounded-xl bg-background dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">Feedback or Suggestions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Found an error, have a suggestion, or want to praise the author? Let us know!
              </p>
              <Textarea 
                placeholder="Your valuable feedback helps us improve..." 
                className="mb-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary" 
                rows={4} 
              />
              <Button className="w-full sm:w-auto" onClick={() => alert('Feedback submitted (mock)!')}>
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Comment Thread */}
          <CommentThread itemId={slug} currentUser={currentUserForComments} />
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;