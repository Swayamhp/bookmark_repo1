import LoginButton from "../components/LoginButton"

export default function Home() {

  return (

    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      {/* Background glow effects */}
      <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-pink-500 opacity-30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-indigo-500 opacity-30 blur-[120px] rounded-full"></div>


      {/* Login Card */}
      <div className="
        relative z-10
        w-full max-w-md
        p-8
        rounded-3xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-2xl
      ">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">

          <div className="
            w-16 h-16
            flex items-center justify-center
            rounded-2xl
            bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
            shadow-lg
            text-white text-2xl
            mb-4
          ">
            🔖
          </div>

          <h1 className="
            text-3xl font-bold
            bg-gradient-to-r from-white to-indigo-200
            bg-clip-text text-transparent
          ">
            Bookmark Hub
          </h1>

          <p className="text-indigo-200 text-sm mt-2 text-center">
            Save, organize, and access your bookmarks instantly
          </p>

        </div>


        {/* Login Button */}
        <div className="mt-6">
          <LoginButton />
        </div>


        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-white/60 text-sm">Secure login</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>


        {/* Features */}
        <div className="space-y-3 text-sm text-indigo-200">

          <div className="flex items-center gap-2">
            ⚡ Realtime bookmark sync
          </div>

          <div className="flex items-center gap-2">
            🔒 Secure Google authentication
          </div>

          <div className="flex items-center gap-2">
            ☁️ Cloud storage with Supabase
          </div>

        </div>

      </div>


      {/* Footer */}
      <div className="absolute bottom-6 text-indigo-200 text-sm opacity-80">
        Built with Next.js + Supabase
      </div>

    </div>

  )
}
