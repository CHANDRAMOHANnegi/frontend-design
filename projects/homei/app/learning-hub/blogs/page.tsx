"use client"
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  BookOpen, 
  TrendingUp,
  Filter,
  Grid,
  List,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Hash,
  Type,
  FileText,
  Palette
} from 'lucide-react';

// Mock data based on your types
const mockBlogTopics = [
  { id: 1, name: 'Algorithms', count: 15, color: 'bg-blue-500', description: 'Algorithm design and analysis' },
  { id: 2, name: 'Data Structures', count: 12, color: 'bg-green-500', description: 'Core data structures' },
  { id: 3, name: 'System Design', count: 8, color: 'bg-purple-500', description: 'Large scale system architecture' },
  { id: 4, name: 'JavaScript', count: 20, color: 'bg-yellow-500', description: 'JavaScript tips and tricks' },
  { id: 5, name: 'Career', count: 6, color: 'bg-red-500', description: 'Career development advice' },
  { id: 6, name: 'Interview Prep', count: 18, color: 'bg-indigo-500', description: 'Technical interview preparation' }
];

const mockBlogPosts = [
  {
    id: 1,
    title: 'Mastering Dynamic Programming: From Beginner to Expert',
    excerpt: 'A comprehensive guide to understanding and implementing dynamic programming solutions for coding interviews.',
    date: '2024-06-15',
    readTime: '12 min read',
    topicId: 1,
    content: 'Dynamic programming is one of the most powerful algorithmic techniques used in computer science and competitive programming. It\'s a method for solving complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations.\n\n## Understanding the Core Concept\n\nThe key insight behind dynamic programming is that many problems have overlapping subproblems. Instead of solving the same subproblem multiple times, we can store the result and reuse it when needed.\n\n## Common Patterns\n\n1. **Top-down approach (Memoization)**: Start with the original problem and recursively break it down\n2. **Bottom-up approach (Tabulation)**: Start with the smallest subproblems and build up\n\n## Practice Problems\n\nStart with these classic problems:\n- Fibonacci sequence\n- Longest Common Subsequence\n- 0/1 Knapsack Problem\n- Edit Distance',
    tags: ['algorithms', 'dp', 'interview-prep']
  },
  {
    id: 2,
    title: 'Building Scalable APIs: Best Practices and Patterns',
    excerpt: 'Learn how to design and implement APIs that can handle millions of requests with proper architecture patterns.',
    date: '2024-06-12',
    readTime: '8 min read',
    topicId: 3,
    content: 'When building APIs for scale, there are several key considerations that can make or break your system\'s performance and maintainability.',
    tags: ['system-design', 'api', 'scalability']
  },
  {
    id: 3,
    title: 'JavaScript Closures Explained with Real Examples',
    excerpt: 'Understanding closures is crucial for JavaScript mastery. This post breaks down the concept with practical examples.',
    date: '2024-06-10',
    readTime: '6 min read',
    topicId: 4,
    content: 'Closures are one of the most important concepts in JavaScript that every developer should master.',
    tags: ['javascript', 'closures', 'fundamentals']
  },
  {
    id: 4,
    title: 'Data Structure Visualization: Trees and Graphs',
    excerpt: 'Visual approach to understanding complex tree and graph data structures with interactive examples.',
    date: '2024-06-08',
    readTime: '10 min read',
    topicId: 2,
    content: 'Visual learning is often the key to understanding complex data structures like trees and graphs.',
    tags: ['data-structures', 'trees', 'graphs', 'visualization']
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [topics, setTopics] = useState(mockBlogTopics);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showActions, setShowActions] = useState(null);

  // Form states for editing/creating
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    topicId: 1,
    tags: [],
    newTag: ''
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTopic = !selectedTopic || post.topicId === selectedTopic.id;
      
      return matchesSearch && matchesTopic;
    });
  }, [searchTerm, selectedTopic, posts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCreatePost = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      topicId: topics[0].id,
      tags: [],
      newTag: ''
    });
  };

  const handleEditPost = (post) => {
    setIsEditing(true);
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      topicId: post.topicId,
      tags: [...post.tags],
      newTag: ''
    });
    setShowActions(null);
  };

  const handleSavePost = () => {
    if (isCreating) {
      const newPost = {
        id: Math.max(...posts.map(p => p.id)) + 1,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        topicId: formData.topicId,
        tags: formData.tags,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(formData.content.length / 1000)} min read`
      };
      setPosts([newPost, ...posts]);
      
      // Update topic count
      setTopics(topics.map(topic => 
        topic.id === formData.topicId 
          ? { ...topic, count: topic.count + 1 }
          : topic
      ));
    } else {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData, tags: formData.tags }
          : post
      ));
    }
    
    setIsCreating(false);
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    const postToDelete = posts.find(p => p.id === postId);
    setPosts(posts.filter(post => post.id !== postId));
    
    // Update topic count
    if (postToDelete) {
      setTopics(topics.map(topic => 
        topic.id === postToDelete.topicId 
          ? { ...topic, count: Math.max(0, topic.count - 1) }
          : topic
      ));
    }
    setShowActions(null);
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      topicId: 1,
      tags: [],
      newTag: ''
    });
  };

  // Editor Form Component
  const EditorForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            {isCreating ? 'Create New Post' : 'Edit Post'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePost}
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Type size={16} />
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} />
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief description of the post..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Topic */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Palette size={16} />
                Topic
              </label>
              <select
                value={formData.topicId}
                onChange={(e) => setFormData({ ...formData, topicId: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash size={16} />
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleAddTag}
                  type="button"
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Edit3 size={16} />
              Content (Markdown supported)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your post content here... You can use Markdown formatting."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              Estimated read time: {Math.ceil(formData.content.length / 1000)} minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Post view with better formatting
  if (selectedPost && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </button>
            <button
              onClick={() => handleEditPost(selectedPost)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 size={16} />
              Edit Post
            </button>
          </div>
          
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(selectedPost.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedPost.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  Reading
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {selectedPost.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="px-8 py-8">
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.trim() === '') {
                    return <br key={index} />;
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {(isCreating || isEditing) && <EditorForm />}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedTopic ? selectedTopic.name : 'Tech Blog'}
            </h1>
            <p className="text-lg text-gray-600">
              {selectedTopic 
                ? selectedTopic.description 
                : 'Share insights, tutorials, and thoughts on software development'
              }
            </p>
          </div>
          <button
            onClick={handleCreatePost}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={20} />
            New Post
          </button>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-3">
              {selectedTopic && (
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <X size={16} />
                  Clear filter
                </button>
              )}
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-600'}`}
                  title="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-600'}`}
                  title="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>{topics.length} topic{topics.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Topics Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Topics</h2>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    !selectedTopic ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">All Topics</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {posts.length}
                    </span>
                  </div>
                </button>
                
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedTopic?.id === topic.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{topic.name}</span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {topic.count}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-left">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Blog Posts */}
          <div className="flex-1">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || selectedTopic ? 'No articles found' : 'No articles yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedTopic 
                    ? 'Try adjusting your search or topic filter.' 
                    : 'Start by creating your first blog post.'
                  }
                </p>
                {!searchTerm && !selectedTopic && (
                  <button
                    onClick={handleCreatePost}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus size={16} />
                    Create First Post
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredPosts.map(post => {
                  const topic = topics.find(t => t.id === post.topicId);
                  
                  return (
                    <div
                      key={post.id}
                      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group relative ${
                        viewMode === 'list' ? 'p-6' : 'overflow-hidden'
                      }`}
                    >
                      {viewMode === 'grid' && <div className={`h-1 ${topic?.color}`}></div>}
                      
                      {/* Action menu */}
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={() => setShowActions(showActions === post.id ? null : post.id)}
                          className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {showActions === post.id && (
                          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-40">
                            <button
                              onClick={() => setSelectedPost(post)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                            >
                              <Eye size={16} />
                              View
                            </button>
                            <button
                              onClick={() => handleEditPost(post)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                            >
                              <Edit3 size={16} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div className={viewMode === 'grid' ? 'p-6' : ''}>
                        {viewMode === 'list' && (
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${topic?.color} flex items-center justify-center flex-shrink-0`}>
                              <BookOpen size={20} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0 pr-12">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${topic?.color}`}>
                                  {topic?.name}
                                </span>
                              </div>
                              
                              <h3 
                                onClick={() => setSelectedPost(post)}
                                className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
                              >
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-3 line-clamp-2">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {formatDate(post.date)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {post.readTime}
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map(tag => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <span className="text-xs text-gray-500 px-2 py-1">
                                      +{post.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {viewMode === 'grid' && (
                          <div className="pr-12">
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${topic?.color}`}>
                                {topic?.name}
                              </span>
                            </div>
                            
                            <h3 
                              onClick={() => setSelectedPost(post)}
                              className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(post.date)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {post.readTime}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;