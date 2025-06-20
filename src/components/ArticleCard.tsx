import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardHeader, // Not used directly, content structured manually
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UserCircle } from 'lucide-react';

interface ArticleCardProps {
  slug: string; // Used for navigation, e.g., /article-detail?slug=my-article-slug
  title: string;
  snippet: string;
  tags: string[];
  authorName?: string;
  authorImageUrl?: string;
  thumbnailUrl?: string; // URL for the article's thumbnail image
  className?: string; // Allow additional Tailwind classes
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  snippet,
  tags,
  authorName,
  authorImageUrl,
  thumbnailUrl,
  className = '',
}) => {
  console.log(`ArticleCard loaded for slug: ${slug}, title: ${title}`);

  const articleLink = `/article-detail?slug=${slug}`;

  return (
    <Card className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col group ${className}`}>
      {thumbnailUrl && (
        <Link to={articleLink} aria-label={`Read more about ${title}`} className="block">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={thumbnailUrl}
              alt={`Thumbnail for ${title}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </Link>
      )}

      {/* Replaces CardHeader and CardContent for more flexible layout */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <Link to={articleLink} className="hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
          <CardTitle className="text-lg md:text-xl font-semibold hover:text-primary line-clamp-2">
            {title}
          </CardTitle>
        </Link>

        <CardDescription className="text-sm text-muted-foreground line-clamp-3 flex-grow">
          {snippet}
        </CardDescription>

        {authorName && (
          <div className="flex items-center text-xs text-muted-foreground pt-1">
            {authorImageUrl ? (
              <Avatar className="h-6 w-6 mr-2 border">
                <AvatarImage src={authorImageUrl} alt={authorName} />
                <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle className="h-4 w-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">By {authorName}</span>
          </div>
        )}
      </div>

      {tags && tags.length > 0 && (
        <CardFooter className="p-4 border-t">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              // Using index as key assuming tags in a single article card won't change order/content dynamically
              <Badge key={`${tag}-${index}`} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ArticleCard;