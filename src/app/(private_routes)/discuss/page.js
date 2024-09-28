"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, ThumbsUp, Send } from 'lucide-react'

export default function DiscussionPage() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Alice Johnson',
      avatar: '',
      content: 'What are your thoughts on the latest React 18 features?',
      likes: 15,
      comments: [
        { id: 1, author: 'Bob', content: 'I love the new concurrent rendering!' },
        { id: 2, author: 'Charlie', content: 'The automatic batching is a game-changer.' },
      ],
      showComments:false,
    },
    {
      id: 2,
      author: 'Bob Smith',
      avatar: '',
      content: 'Has anyone tried the new Next.js App Router? How does it compare to the Pages Router?',
      likes: 8,
      comments: [
        { id: 1, author: 'Alice', content: 'It\'s more intuitive for complex layouts.' },
        { id: 2, author: 'David', content: 'I find it easier to manage server-side logic now.' },
      ],
      showComments:false,
    },
    {
      id: 3,
      author: 'Charlie Brown',
      avatar: '',
      content: 'Just deployed my first Next.js app on Vercel. The process was surprisingly smooth!',
      likes: 12,
      comments: [
        { id: 1, author: 'Eve', content: 'Vercel\'s integration with Next.js is unbeatable!' },
        { id: 2, author: 'Frank', content: 'Did you encounter any issues with environment variables?' },
      ],
      showComments:false,
    },
  ])

  const handleNewPost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          author: 'Current User',
          avatar: '',
          content: newPost,
          likes: 0,
          comments: [],
          showComments: false,
        },
        ...posts,
      ])
      setNewPost('')
    }
  }

  const toggleComments = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-800 via-sky-400 to-sky-800   dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 p-4 flex justify-center items-start">
      <div className="w-full max-w-5xl 2xl:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-transparent dark:bg-gray-800 border-gray-700 shadow-md">
              <CardHeader className="p-4">
                <h2 className="text-lg font-semibold text-gray-100">Start a Discussion</h2>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full text-black  p-2 text-sm lg:text-md 2xl:text-lg rounded-md border border-gray-600 bg-sky-300 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  rows={3}
                />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button onClick={handleNewPost} className="w-full bg-sky-400 hover:bg-sky-500  dark:bg-purple-600 dark:hover:bg-purple-700 text-white text-sm">
                  Post
                </Button>
              </CardFooter>
            </Card>
            {posts.map((post) => (
              <Card key={post.id} className="bg-transparent dark:bg-gray-800 border-gray-700 shadow-md">
                <CardHeader className="p-4 flex items-center space-x-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm text-center lg:text-md 2xl:text-lg text-gray-100">{post.author}</h3>
                    <p className="text-xs text-gray-500 text-center dark:text-gray-400">Posted recently</p>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm lg:text-md 2xl:text-lg text-white dark:text-gray-300">{post.content}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-wrap justify-between items-center gap-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-300 hover:text-purple-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-300 hover:text-purple-400"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments?.length}</span>
                  </Button>
                  <div className="flex items-center space-x-2 flex-grow">
                    <Input placeholder="Comment..." className="flex-grow text-xs lg:text-sm h-8 bg-sky-400 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-600 dark:focus:ring-purple-500" />
                    <Button size="icon" className="h-8 w-8 text-black dark:text-white bg-sky-500 hover:bg-sky-600 dark:bg-purple-600 dark:hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
                {post.showComments && (
                  <div className="px-4 pb-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-transparent border-[1px] dark:bg-gray-700 rounded-md p-2">
                        <p className="text-xs xl:text-sm 2xl:text-sm font-semibold text-white dark:text-gray-300">{comment.author}</p>
                        <p className="text-sm xl:text-md 2xl:text-lg dark:text-gray-400">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
          <div className="space-y-4 lg:sticky lg:top-4">
            <Card className="dark:bg-gray-800 bg-transparent border-gray-700 shadow-md p-4">
              <h3 className="font-semibold text-sm xl:text-[16px] mb-2 text-gray-100">Trending Topics</h3>
              <ul className="space-y-1">
                <li className="text-sm lg:text-md 2xl:text-lg text-gray-200 hover:text-blue-900 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer">#ReactJS</li>
                <li className="text-sm lg:text-md 2xl:text-lg text-gray-200 hover:text-blue-900 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer">#NextJS</li>
                <li className="text-sm lg:text-md 2xl:text-lg text-gray-200 hover:text-blue-900 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer">#WebDev</li>
                <li className="text-sm lg:text-md 2xl:text-lg text-gray-200 hover:text-blue-900 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer">#JavaScript</li>
              </ul>
            </Card>
            <Card className="bg-transparent dark:bg-gray-800 border-gray-700 shadow-md p-4">
              <h3 className="font-semibold text-sm mb-2 text-gray-100">Active Users</h3>
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-blue-700 dark:border-purple-500">
                    <AvatarImage src={'assets/user.svg'} alt={`User ${i + 1}`} />
                    <AvatarFallback className="bg-blue-500 dark:bg-purple-600 text-white">{`U${i + 1}`}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}