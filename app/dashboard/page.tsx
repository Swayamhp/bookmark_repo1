import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabaseServer"
import BookmarkForm from "../../components/BookmarkForm"
import LogoutButton from "@/components/LogoutButton"
import BookmarkList from "@/components/BookmarkList"
import BookmarkManager from "@/components/BookmarkManager"

export default async function DashboardPage() {

    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/")
    }

    const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false })
    console.log(bookmarks)

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

            {/* Background glow effects */}
            <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-pink-500 opacity-30 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-indigo-500 opacity-30 blur-[120px] rounded-full"></div>


            {/* Navbar */}
            <header className="
    sticky top-0 z-50
    backdrop-blur-xl
    bg-white/10
    border-b border-white/20
    shadow-xl
  ">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo and title */}
                    <div className="flex items-center gap-4">

                        <div className="
          w-12 h-12
          flex items-center justify-center
          rounded-2xl
          bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
          shadow-lg
          text-white text-xl
        ">
                            🔖
                        </div>

                        <div>
                            <h1 className="
            text-3xl font-extrabold
            bg-gradient-to-r from-white to-indigo-200
            bg-clip-text text-transparent
          ">
                                Bookmark Hub
                            </h1>

                            <p className="text-indigo-200 text-xs">
                                Your personal link universe
                            </p>
                        </div>

                    </div>


                    {/* User section */}
                    <div className="flex items-center gap-4">

                        <div className="
          flex items-center gap-3
          bg-white/10
          px-4 py-2
          rounded-xl
          border border-white/20
          backdrop-blur-md
          shadow-lg
        ">

                            <div className="
            w-9 h-9
            rounded-full
            bg-gradient-to-br from-yellow-400 to-pink-500
            flex items-center justify-center
            text-white font-bold
          ">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>

                            <span className="text-white text-sm font-medium">
                                {user.email}
                            </span>

                        </div>

                        <div className="
          bg-white/10 hover:bg-white/20
          px-4 py-2 rounded-xl
          border border-white/20
          transition shadow-lg
        ">
                            <LogoutButton />
                        </div>

                    </div>

                </div>

            </header>



            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Welcome Card */}
                <div className="
      mb-8
      p-6
      rounded-3xl
      bg-white/10
      backdrop-blur-xl
      border border-white/20
      shadow-xl
    ">

                    <h2 className="
        text-2xl font-bold text-white mb-2
      ">
                        Welcome back 👋
                    </h2>

                    <p className="text-indigo-200">
                        Add, manage, and access your bookmarks instantly.
                    </p>

                </div>



                {/* Add Bookmark Card */}
                <div className="
      mb-10
      p-8
      rounded-3xl
      bg-gradient-to-br from-white/90 to-white/70
      backdrop-blur-xl
      shadow-2xl
      border border-white/40
      hover:shadow-indigo-500/20
      transition
    ">

                    <h2 className="
        text-xl font-bold
        bg-gradient-to-r from-indigo-600 to-pink-600
        bg-clip-text text-transparent
        mb-6
      ">
                        ➕ Add New Bookmark
                    </h2>

                    <BookmarkManager
                        initialBookmarks={bookmarks || []}
                        userId={user.id}
                    />

                </div>



                {/* Footer */}
                <div className="text-center text-indigo-200 text-sm mt-12 opacity-80">
                    Built with Next.js + Supabase Realtime ⚡
                </div>

            </main>

        </div>



    )
}
