import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Flag, SendHorizonal } from 'lucide-react';

// Define types for User and Comment
interface User {
  id: string;
  name: string;
  avatarUrl?: string; // URL to user's avatar
}

interface CommentData {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
  replies: CommentData[];
  upvotes: number;
  downvotes: number;
  parentId?: string | null; // To help with adding replies
}

interface CommentThreadProps {
  itemId: string; // ID of the article or problem this comment thread belongs to
  currentUser: User; // Assume we know the current user for posting comments
  initialComments?: CommentData[];
}

// Mock initial comments for demonstration if not provided
const defaultMockCurrentUser: User = {
  id: 'current-user-007',
  name: 'Current User',
  avatarUrl: 'https://i.pravatar.cc/150?u=currentUser',
};

const mockInitialComments: CommentData[] = [
  {
    id: 'comment-1',
    user: { id: 'user-1', name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
    text: 'Great article! Really helped me understand the concept.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    replies: [
      {
        id: 'reply-1-1',
        user: { id: 'user-2', name: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
        text: "I agree, the examples were very clear.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        replies: [],
        upvotes: 5,
        downvotes: 0,
        parentId: 'comment-1',
      },
    ],
    upvotes: 15,
    downvotes: 1,
    parentId: null,
  },
  {
    id: 'comment-2',
    user: { id: 'user-3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
    text: "Could you elaborate on the time complexity part?",
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
    replies: [],
    upvotes: 8,
    downvotes: 0,
    parentId: null,
  },
];


const CommentThread: React.FC<CommentThreadProps> = ({ 
  itemId, 
  currentUser = defaultMockCurrentUser, // Provide a default if not passed
  initialComments = mockInitialComments 
}) => {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null); // ID of comment to reply to
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    console.log(`CommentThread loaded for itemId: ${itemId}, currentUser: ${currentUser.name}`);
    // In a real app, you might fetch comments for itemId here if initialComments is not provided
  }, [itemId, currentUser]);

  const findCommentAndMutate = (
    commentsList: CommentData[],
    targetCommentId: string,
    mutateFn: (comment: CommentData) => CommentData
  ): CommentData[] => {
    return commentsList.map(comment => {
      if (comment.id === targetCommentId) {
        return mutateFn(comment);
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: findCommentAndMutate(comment.replies, targetCommentId, mutateFn) };
      }
      return comment;
    });
  };
  
  const handleVote = (commentId: string, voteType: 'up' | 'down') => {
    setComments(prevComments => 
      findCommentAndMutate(prevComments, commentId, (comment) => {
        if (voteType === 'up') {
          // Basic toggle: if already upvoted, remove vote, else add. For simplicity, just incrementing.
          return { ...comment, upvotes: comment.upvotes + 1 };
        } else {
          return { ...comment, downvotes: comment.downvotes + 1 };
        }
      })
    );
    console.log(`Voted ${voteType} for comment ${commentId}`);
  };

  const handleReport = (commentId: string) => {
    console.log(`Reported comment ${commentId} for item ${itemId}`);
    // In a real app, this would trigger a modal or API call to the backend
    alert(`Comment ${commentId} reported. (This is a placeholder action)`);
  };

  const addCommentRecursive = (
    commentsList: CommentData[],
    parentId: string | null,
    newComment: CommentData
  ): CommentData[] => {
    if (parentId === null) { // Adding a top-level comment
      return [...commentsList, newComment];
    }
    // Adding a reply to an existing comment
    return commentsList.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newComment] };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: addCommentRecursive(comment.replies, parentId, newComment) };
      }
      return comment;
    });
  };

  const handleSubmitComment = (text: string, parentId: string | null) => {
    if (!text.trim() || !currentUser) return;

    const newCommentData: CommentData = {
      id: crypto.randomUUID(), // Generate a unique ID for the new comment
      user: currentUser,
      text: text.trim(),
      timestamp: new Date(),
      replies: [],
      upvotes: 0,
      downvotes: 0,
      parentId: parentId,
    };

    setComments(prevComments => addCommentRecursive(prevComments, parentId, newCommentData));

    if (parentId) { // It was a reply
      setReplyText('');
      setActiveReplyBox(null); // Close the reply box
    } else { // It was a top-level comment
      setNewCommentText('');
    }
  };

  const countTotalComments = (commentsList: CommentData[]): number => {
    let count = 0;
    for (const comment of commentsList) {
      count++; // Count the comment itself
      if (comment.replies && comment.replies.length > 0) {
        count += countTotalComments(comment.replies); // Recursively count replies
      }
    }
    return count;
  };
  const totalComments = countTotalComments(comments);

  const renderComment = (comment: CommentData, level: number = 0) => (
    <div key={comment.id} className={`py-3 ${level > 0 ? 'ml-6 sm:ml-8 pl-3 sm:pl-4 border-l border-gray-200 dark:border-gray-700' : ''}`}>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{comment.user.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {comment.timestamp.toLocaleDateString()} {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-wrap">{comment.text}</p>
          <div className="flex items-center space-x-1 sm:space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleVote(comment.id, 'up')}>
              <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> {comment.upvotes}
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleVote(comment.id, 'down')}>
              <ThumbsDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> {comment.downvotes}
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => { setActiveReplyBox(comment.id === activeReplyBox ? null : comment.id); setReplyText(''); }}>
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> Reply
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-auto text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500" onClick={() => handleReport(comment.id)}>
              <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> Report
            </Button>
          </div>

          {activeReplyBox === comment.id && (
            <div className="mt-3">
              <Textarea
                placeholder={`Replying to ${comment.user.name}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="mb-2 bg-white dark:bg-gray-800"
                rows={2}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setActiveReplyBox(null)}>Cancel</Button>
                <Button size="sm" onClick={() => handleSubmitComment(replyText, comment.id)} disabled={!replyText.trim()}>
                  <SendHorizonal className="h-4 w-4 mr-1" /> Post Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className={`mt-3 ${level > 4 ? '' : 'border-gray-200 dark:border-gray-700'}`}> {/* Avoid excessive border nesting visually */}
          {comment.replies.map(reply => renderComment(reply, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-900 dark:text-gray-100 dark:border-gray-700">
        Comments ({totalComments})
      </h3>
      
      <div className="mb-6 p-3 border rounded-md dark:border-gray-700">
        <h4 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">Leave a comment</h4>
        <div className="flex items-start space-x-2 sm:space-x-3">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mt-1">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Textarea
                    placeholder="Write your comment here..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    rows={3}
                />
                <div className="flex justify-end">
                    <Button onClick={() => handleSubmitComment(newCommentText, null)} disabled={!newCommentText.trim()}>
                        <SendHorizonal className="h-4 w-4 mr-2" /> Post Comment
                    </Button>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => renderComment(comment))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentThread;