"use client";
import { Calendar, ChevronLeft, Clock, Hash } from "lucide-react";
import { Card, Badge, Button } from "../components";

export const BlogView = ({ state, dispatch }) => {
  console.log(state);
  
  const filteredPosts = state.blogsData.blogs?.filter(
    (post) => post.topicId === state.selectedBlogTopic.id
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded-lg ${state.selectedBlogTopic.color
                .replace("text-", "bg-")
                .replace("100", "500")}`}
            >
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {state.selectedBlogTopic.name}
              </h1>
              <p className="text-gray-600">
                {state.selectedBlogTopic.description}
              </p>
            </div>
          </div>
        </div>

        {state.selectedBlogPost ? (
          <div className="bg-white">
            <Button
              variant="primary"
              onClick={() => dispatch({ type: "SET_BLOG_POST", payload: null })}
              className="mb-4"
              icon={ChevronLeft}
            >
              Back to {state.selectedBlogTopic.name}
            </Button>

            <article>
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {state.selectedBlogPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {state.selectedBlogPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {state.selectedBlogPost.readTime}
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {state.selectedBlogPost.tags.map((tag) => (
                    <Badge key={tag} variant="info">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>
              <div className="text-gray-700 whitespace-pre-line">
                {state.selectedBlogPost.content}
              </div>
            </article>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts?.map((post) => (
              <Card
                key={post.id}
                hover
                onClick={() =>
                  dispatch({ type: "SET_BLOG_POST", payload: post })
                }
                className="p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="info">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};