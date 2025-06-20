import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/ArticleCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { Search, ArrowRight, BookOpen, Zap, Code, Cpu, Lightbulb, Database } from 'lucide-react';

// Placeholder data for Featured Articles
const featuredArticles = [
  {
    slug: 'mastering-linked-lists',
    title: 'Mastering Linked Lists: A Comprehensive Guide',
    snippet: 'Dive deep into linked lists, understanding their types, operations, and common use cases in software development.',
    tags: ['Data Structures', 'Beginner', 'Core Concept'],
    authorName: 'Dr. Algo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop',
    authorImageUrl: 'https://i.pravatar.cc/150?u=dr_algo'
  },
  {
    slug: 'understanding-recursion',
    title: 'Understanding Recursion for Beginners',
    snippet: 'Recursion can be tricky, but this guide breaks it down with simple examples and practical tips for problem-solving.',
    tags: ['Algorithms', 'Problem Solving', 'Tutorial'],
    authorName: 'Code Wizard',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=400&auto=format&fit=crop',
    authorImageUrl: 'https://i.pravatar.cc/150?u=code_wizard'
  },
  {
    slug: 'python-decorators-explained',
    title: 'Python Decorators Explained with Examples',
    snippet: 'Unlock the power of Python decorators to write more concise and reusable code. Includes practical examples.',
    tags: ['Python', 'Intermediate', 'Best Practices'],
    authorName: 'Py Sorceress',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d9a58fbf0338?q=80&w=400&auto=format&fit=crop',
    authorImageUrl: 'https://i.pravatar.cc/150?u=py_sorceress'
  },
];

// Placeholder data for Categories
const categories = [
  { name: 'Data Structures', description: 'Learn about arrays, linked lists, trees, graphs, and more.', icon: BookOpen, link: '/article-list?category=Data%20Structures' },
  { name: 'Algorithms', description: 'Explore sorting, searching, dynamic programming, and other algorithms.', icon: Zap, link: '/article-list?category=Algorithms' },
  { name: 'Programming Languages', description: 'Tutorials for Python, JavaScript, Java, C++, etc.', icon: Code, link: '/article-list?category=Languages' },
  { name: 'Web Development', description: 'Master front-end and back-end technologies.', icon: Cpu, link: '/article-list?category=Web%20Development' },
  { name: 'Interview Prep', description: 'Ace your technical interviews with targeted guides.', icon: Lightbulb, link: '/article-list?category=Interview%20Prep' },
  { name: 'Databases', description: 'Understand SQL, NoSQL, and database design principles.', icon: Database, link: '/article-list?category=Databases' },
];


const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="py-20 md:py-32 bg-cover bg-center text-white"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="container mx-auto px-4 md:px-6 text-center bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Unlock Your CS Potential
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore a vast library of articles, tutorials, and practice problems to master computer science concepts.
            </p>
            <div className="max-w-xl mx-auto flex gap-2">
              <Input 
                type="search" 
                placeholder="Search for articles, topics, problems..." 
                className="flex-grow text-lg p-4 rounded-md border-gray-300 focus:ring-primary focus:border-primary text-gray-900"
                aria-label="Search content"
              />
              <Button size="lg" className="text-lg p-4 bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Explore Key Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card key={category.name} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                    <category.icon className="h-10 w-10 text-primary" />
                    <div>
                      <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Link to={category.link}>
                      <Button variant="outline" className="w-full">
                        Explore {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Separator />

        {/* Featured Articles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  snippet={article.snippet}
                  tags={article.tags}
                  authorName={article.authorName}
                  thumbnailUrl={article.thumbnailUrl}
                  authorImageUrl={article.authorImageUrl}
                  className="h-full" // Ensure cards in a row take full height
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/article-list">
                <Button size="lg" variant="outline">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Separator />

        {/* Trending Topics Section - Simplified */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">AI and Machine Learning Demystified</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Explore the latest advancements and foundational concepts in Artificial Intelligence and Machine Learning.</p>
                        <Link to="/article-list?category=AI">
                            <Button variant="link" className="p-0 h-auto">Learn about AI <ArrowRight className="ml-1 h-4 w-4" /></Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">The Future of Quantum Computing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Get insights into how quantum computers are set to revolutionize technology and problem-solving.</p>
                        <Link to="/article-list?category=Quantum%20Computing">
                             <Button variant="link" className="p-0 h-auto">Explore Quantum Computing <ArrowRight className="ml-1 h-4 w-4" /></Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Dive Deeper?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Start your learning journey today. Browse our extensive collection of articles or jump straight into solving practice problems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/article-list">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse All Articles
                </Button>
              </Link>
              <Link to="/practice-problem">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Start Practicing Problems
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;