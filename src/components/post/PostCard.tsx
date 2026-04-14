"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  level: "BASIC" | "ADVANCED";
  createdAt: string;
  readTime: string;
}

export default function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100"
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            post.level === "BASIC"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {post.level === "BASIC" ? "Cơ bản" : "Nâng cao"}
        </span>
        <div className="flex items-center text-slate-400 text-xs font-medium">
          <Clock className="w-3 h-3 mr-1" />
          {post.readTime}
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>
      <p className="text-slate-500 text-sm mb-6 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <span className="text-xs text-slate-400">{post.createdAt}</span>
        <Link
          href={`/post/${post.slug}`}
          className="text-sm font-medium text-blue-600 flex items-center group-hover:underline"
        >
          Đọc tiếp
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
