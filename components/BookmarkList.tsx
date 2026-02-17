"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
}

export default function BookmarkList({
    initialBookmarks,
}: {
    initialBookmarks: Bookmark[]
}) {

    const [bookmarks, setBookmarks] = useState(initialBookmarks)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    // DELETE FUNCTION
    const deleteBookmark = async (id: string) => {

        const confirmDelete = confirm("Delete this bookmark?")

        if (!confirmDelete) return

        setDeletingId(id)

        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id)

        if (error) {
            console.error(error)
        }

        setDeletingId(null)
    }


    useEffect(() => {

        const channel = supabase
            .channel("bookmarks-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                },
                (payload) => {

                    if (payload.eventType === "INSERT") {
                        setBookmarks(prev => [
                            payload.new as Bookmark,
                            ...prev,
                        ])
                    }

                    if (payload.eventType === "DELETE") {
                        setBookmarks(prev =>
                            prev.filter(b => b.id !== payload.old.id)
                        )
                    }

                    if (payload.eventType === "UPDATE") {
                        setBookmarks(prev =>
                            prev.map(b =>
                                b.id === payload.new.id
                                    ? payload.new as Bookmark
                                    : b
                            )
                        )
                    }

                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [])


    return (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {bookmarks.map((bookmark, index) => {

                const gradients = [
                    "from-indigo-500 via-purple-500 to-pink-500",
                    "from-blue-500 via-cyan-400 to-teal-400",
                    "from-emerald-500 via-green-400 to-lime-400",
                    "from-orange-500 via-red-400 to-pink-500",
                    "from-yellow-400 via-orange-500 to-red-500",
                    "from-violet-500 via-purple-500 to-indigo-500",
                    "from-cyan-500 via-blue-500 to-indigo-500",
                    "from-pink-500 via-rose-500 to-red-500",
                ]

                const gradient = gradients[index % gradients.length]

                const favicon =
                    `https://www.google.com/s2/favicons?sz=64&domain=${bookmark.url}`

                return (

                    <div
                        key={bookmark.id}
                        className={`
              group relative
              rounded-2xl p-[2px]
              bg-gradient-to-br ${gradient}
              shadow-xl
              hover:scale-[1.03]
              hover:shadow-2xl
              transition-all duration-300
            `}
                    >

                        {/* Inner card */}
                        <div className="
              h-full
              bg-white/10 backdrop-blur-xl
              rounded-2xl
              p-5
              border border-white/20
              relative
            ">


                            {/* DELETE BUTTON */}
                            <button
                                onClick={() => deleteBookmark(bookmark.id)}
                                disabled={deletingId === bookmark.id}
                                className="
                  absolute top-3 right-3
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200

                  bg-white/20 hover:bg-red-500
                  backdrop-blur-md

                  p-2 rounded-lg
                  shadow-lg

                  hover:scale-110
                "
                            >

                                {deletingId === bookmark.id ? (
                                    <span className="text-white text-xs">
                                        ...
                                    </span>
                                ) : (

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0
                      0116.138 21H7.862a2 2 0
                      01-1.995-1.858L5 7m5
                      4v6m4-6v6M9 7h6m-7
                      0V4a1 1 0 011-1h4a1 1 0
                      011 1v3"
                                        />
                                    </svg>

                                )}

                            </button>


                            {/* Top */}
                            <div className="flex items-center gap-3 mb-3">

                                <img
                                    src={favicon}
                                    className="w-10 h-10 rounded-lg bg-white p-1 shadow-md"
                                />

                                <h3 className="
                  font-bold text-white text-lg
                  group-hover:text-yellow-200
                ">
                                    {bookmark.title}
                                </h3>

                            </div>


                            {/* URL */}
                            <a
                                href={bookmark.url}
                                target="_blank"
                                className="
                  text-white/80 text-sm
                  break-all hover:text-white hover:underline
                "
                            >
                                {bookmark.url.substring(0, 30)}
                                {bookmark.url.length > 30 ? "..." : ""}
                            </a>


                            {/* Footer */}
                            <div className="
                flex justify-between items-center
                mt-4 text-xs text-white/70
              ">

                                <span>
                                    {new Date(bookmark.created_at)
                                        .toLocaleDateString("en-GB")}
                                </span>

                                <span className="
                  opacity-0 group-hover:opacity-100
                ">
                                    ↗ Open
                                </span>

                            </div>

                        </div>

                    </div>

                )

            })}

        </div>

    )

}
