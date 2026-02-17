"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookmarkForm({
    userId,
}: {
    userId: string
}) {

    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const addBookmark = async () => {

        if (!title || !url) return

        setLoading(true)

        await supabase.from("bookmarks").insert({
            title,
            url,
            user_id: userId,
        })

        setTitle("")
        setUrl("")
        setLoading(false)
    }

    return (

        <div className="flex flex-col md:flex-row gap-4 items-end">

            {/* Title Input */}
            <div className="relative flex-1 group">

                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Bookmark Title
                </label>

                <div className="
          flex items-center gap-2
          bg-white/70 backdrop-blur-md
          border border-gray-200
          rounded-xl px-4 py-3
          shadow-sm
          transition
          focus-within:ring-2 focus-within:ring-indigo-400
          focus-within:border-indigo-400
          group-hover:shadow-md
        ">

                    <span className="text-indigo-500 text-lg">
                        📝
                    </span>

                    <input
                        type="text"
                        placeholder="My favorite website"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="
              w-full
              outline-none
              bg-transparent
              text-gray-700
              placeholder-gray-400
              font-medium
            "
                    />

                </div>

            </div>


            {/* URL Input */}
            <div className="relative flex-1 group">

                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Website URL
                </label>

                <div className="
          flex items-center gap-2
          bg-white/70 backdrop-blur-md
          border border-gray-200
          rounded-xl px-4 py-3
          shadow-sm
          transition
          focus-within:ring-2 focus-within:ring-pink-400
          focus-within:border-pink-400
          group-hover:shadow-md
        ">

                    <span className="text-pink-500 text-lg">
                        🔗
                    </span>

                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="
              w-full
              outline-none
              bg-transparent
              text-gray-700
              placeholder-gray-400
              font-medium
            "
                    />

                </div>

            </div>


            {/* Add Button */}
            <button
                onClick={addBookmark}
                disabled={loading}
                className="
          h-[54px]
          px-8
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-indigo-500
          via-purple-500
          to-pink-500
          shadow-lg
          hover:scale-105
          active:scale-95
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
            >
                {loading ? "Adding..." : "Add"}
            </button>

        </div>

    )
}
