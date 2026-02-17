"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import BookmarkForm from "./BookmarkForm"
import BookmarkList from "./BookmarkList"

export default function BookmarkManager({
    initialBookmarks,
    userId,
}: {
    initialBookmarks: any[]
    userId: string
}) {

    const [bookmarks, setBookmarks] = useState(initialBookmarks)

    useEffect(() => {

        console.log("Starting realtime subscription...")

        const channel = supabase
            .channel(`bookmarks-${userId}`)

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {

                    console.log("Realtime received:", payload)

                    if (payload.eventType === "INSERT") {
                        setBookmarks(prev => [
                            payload.new,
                            ...prev
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
                                    ? payload.new
                                    : b
                            )
                        )
                    }

                }
            )

            .subscribe((status) => {
                console.log("Realtime status:", status)
            })

        return () => {
            supabase.removeChannel(channel)
        }

    }, [userId])


    return (

        <div>

            <BookmarkForm userId={userId} />

            <div className="grid gap-4 mt-6">

                <BookmarkList initialBookmarks={bookmarks || []} />

            </div>

        </div>

    )
}
