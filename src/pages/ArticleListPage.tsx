import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/ArticleCard';

// Shadcn/UI Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Placeholder data for articles
const placeholderArticles = [
  {
    slug: 'introduction-to-linked-lists',
    title: 'Introduction to Linked Lists: Concepts and Implementation',
    snippet: 'Learn the fundamentals of linked lists, a core data structure. Understand nodes, pointers, and basic operations like insertion, deletion, and traversal.',
    tags: ['Data Structures', 'Linked List', 'Beginner'],
    authorName: 'Dr. Code Algo',
    authorImageUrl: 'https://i.pravatar.cc/150?u=dr_code_algo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 15),
  },
  {
    slug: 'advanced-linked-list-techniques',
    title: 'Advanced Linked List Techniques: Circular & Doubly Linked Lists',
    snippet: 'Explore more complex linked list variations including circular linked lists and doubly linked lists, their use cases, and implementation details.',
    tags: ['Data Structures', 'Linked List', 'Intermediate', 'Advanced'],
    authorName: 'Jane Structs',
    authorImageUrl: 'https://i.pravatar.cc/150?u=jane_structs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 12),
  },
  {
    slug: 'solving-problems-with-linked-lists',
    title: 'Common Interview Problems Using Linked Lists',
    snippet: 'Practice solving common interview questions that involve linked lists. Includes problems on reversing a list, detecting cycles, and more.',
    tags: ['Interview Prep', 'Linked List', 'Problem Solving', 'Intermediate'],
    authorName: 'Inter Viewer',
    authorImageUrl: 'https://i.pravatar.cc/150?u=inter_viewer',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 10),
  },
  {
    slug: 'big-o-notation-basics',
    title: 'Understanding Big O Notation: A Beginner\'s Guide',
    snippet: 'Grasp the essentials of Big O notation for analyzing algorithm efficiency. Learn how to assess time and space complexity with practical examples.',
    tags: ['Algorithms', 'Complexity', 'Beginner'],
    authorName: 'Prof. Efficiency',
    authorImageUrl: 'https://i.pravatar.cc/150?u=prof_efficiency',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 8),
  },
  {
    slug: 'getting-started-with-react-hooks',
    title: 'Getting Started with React Hooks: useState and useEffect',
    snippet: 'A comprehensive introduction to React Hooks, focusing on useState and useEffect for managing state and side effects in functional components.',
    tags: ['React', 'JavaScript', 'Frontend', 'Beginner', 'Web Development'],
    authorName: 'Dev Frontend',
    authorImageUrl: 'https://i.pravatar.cc/150?u=dev_frontend',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 5),
  },
   {
    slug: 'python-for-data-science',
    title: 'Python for Data Science: A Crash Course',
    snippet: 'Dive into using Python for data science. Covers essential libraries like NumPy, Pandas, and Matplotlib for data analysis and visualization.',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Intermediate'],
    authorName: 'Data Sci Guy',
    authorImageUrl: 'https://i.pravatar.cc/150?u=data_sci_guy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 5, 2),
  },
  {
    slug: 'mastering-css-grid-layout',
    title: 'Mastering CSS Grid Layout for Modern Web Design',
    snippet: 'A deep dive into CSS Grid, covering everything from basic concepts to advanced techniques for creating complex, responsive layouts.',
    tags: ['Web Development', 'CSS', 'Frontend', 'Intermediate'],
    authorName: 'Grid Master',
    authorImageUrl: 'https://i.pravatar.cc/150?u=grid_master',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421ac462?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 28),
  },
  {
    slug: 'intro-to-machine-learning-concepts',
    title: 'Introduction to Machine Learning Concepts',
    snippet: 'Understand the fundamental concepts of Machine Learning, including supervised vs. unsupervised learning, common algorithms, and model evaluation.',
    tags: ['Machine Learning', 'AI', 'Beginner', 'Concepts'],
    authorName: 'AI Scholar',
    authorImageUrl: 'https://i.pravatar.cc/150?u=ai_scholar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593349480500-79209159009f?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 25),
  },
  {
    slug: 'javascript-es6-features-you-should-know',
    title: 'JavaScript ES6+ Features You Should Know',
    snippet: 'Explore powerful ES6+ features like arrow functions, destructuring, promises, async/await, and modules to write modern JavaScript.',
    tags: ['JavaScript', 'ES6', 'Web Development', 'Intermediate'],
    authorName: 'JS Ninja',
    authorImageUrl: 'https://i.pravatar.cc/150?u=js_ninja',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 22),
  },
  {
    slug: 'dynamic-programming-patterns',
    title: 'Dynamic Programming Patterns for Interviews',
    snippet: 'Learn to identify and apply common dynamic programming patterns to solve complex algorithmic problems often asked in coding interviews.',
    tags: ['Algorithms', 'Dynamic Programming', 'Interview Prep', 'Advanced'],
    authorName: 'DP Guru',
    authorImageUrl: 'https://i.pravatar.cc/150?u=dp_guru',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534685785742-437593909107?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 20),
  },
   {
    slug: 'building-restful-apis-nodejs',
    title: 'Building RESTful APIs with Node.js and Express',
    snippet: 'A practical guide to designing and building robust RESTful APIs using Node.js and the Express framework, covering routing, middleware, and error handling.',
    tags: ['Node.js', 'Backend', 'API', 'Web Development', 'Intermediate'],
    authorName: 'Backend Dev',
    authorImageUrl: 'https://i.pravatar.cc/150?u=backend_dev',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610986603166-f7a0859a0c04?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 18),
  },
  {
    slug: 'data-visualization-with-d3js',
    title: 'Interactive Data Visualization with D3.js',
    snippet: 'An introduction to D3.js for creating powerful and interactive data visualizations for the web. Learn to bind data, create SVGs, and add interactivity.',
    tags: ['JavaScript', 'Data Visualization', 'D3.js', 'Advanced'],
    authorName: 'Viz Wizard',
    authorImageUrl: 'https://i.pravatar.cc/150?u=viz_wizard',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=800&auto=format&fit=crop',
    publishedDate: new Date(2024, 4, 15),
  }
];

const categories = ['All', 'Data Structures', 'Algorithms', 'Web Development', 'Python', 'JavaScript', 'Interview Prep', 'Machine Learning', 'CSS', 'Node.js', 'AI', 'Frontend', 'Backend'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
];

const ArticleListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    console.log('ArticleListPage loaded');
  }, []);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulties([]);
    setSortBy('newest');
    setCurrentPage(1);
  };
  
  const processedArticles = useMemo(() => {
    let filtered = [...placeholderArticles]; // Create a copy to sort

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.tags.includes(selectedCategory));
    }

    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(article =>
        selectedDifficulties.some(difficulty => article.tags.includes(difficulty))
      );
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
    } else if (sortBy === 'title_asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title_desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    // 'relevance' can be the initial order or a more complex logic if needed

    return filtered;
  }, [selectedCategory, selectedDifficulties, sortBy]);

  const totalPages = Math.ceil(processedArticles.length / articlesPerPage);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return processedArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [processedArticles, currentPage, articlesPerPage]);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
       window.scrollTo(0, 0); // Scroll to top on page change
    }
  };
  
  // Generate pagination items (simplified)
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Max number of page links to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
        items.push(
            <PaginationItem key="first">
                <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
        );
        if (startPage > 2) {
            items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <PaginationItem key={i}>
                <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
        }
        items.push(
            <PaginationItem key="last">
                <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
        );
    }
    return items;
  };


  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-muted/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Articles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Explore Articles & Tutorials
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
            Dive into our comprehensive collection of CS topics, from beginner guides to advanced concepts.
          </p>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Filters & Sorting</CardTitle>
                <CardDescription>Refine your search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="category-select" className="text-sm font-medium">Category</Label>
                  <Select value={selectedCategory} onValueChange={(value) => {setSelectedCategory(value); setCurrentPage(1);}}>
                    <SelectTrigger id="category-select" className="w-full mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Difficulty</Label>
                  <div className="space-y-2 mt-1">
                    {difficulties.map(difficulty => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty.toLowerCase()}`}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => handleDifficultyChange(difficulty)}
                        />
                        <Label htmlFor={`difficulty-${difficulty.toLowerCase()}`} className="font-normal text-sm">{difficulty}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="sort-select" className="text-sm font-medium">Sort By</Label>
                  <Select value={sortBy} onValueChange={(value) => {setSortBy(value); setCurrentPage(1);}}>
                    <SelectTrigger id="sort-select" className="w-full mt-1">
                      <SelectValue placeholder="Sort articles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                    Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          <section className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Showing {paginatedArticles.length} of {processedArticles.length} articles
                </p>
                {/* View toggle could go here */}
            </div>
            {paginatedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedArticles.map(article => (
                    <ArticleCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    snippet={article.snippet}
                    tags={article.tags}
                    authorName={article.authorName}
                    authorImageUrl={article.authorImageUrl}
                    thumbnailUrl={article.thumbnailUrl}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Articles Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later!</p>
                </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleListPage;