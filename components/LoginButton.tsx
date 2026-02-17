"use client"

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function LoginButton() {

  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback"
      }
    })

    setLoading(false)
  }

  return (

    <button
      onClick={login}
      disabled={loading}
      className="
        w-full
        flex items-center justify-center gap-3

        bg-white
        text-gray-700
        font-medium

        px-6 py-3
        rounded-xl

        border border-gray-300
        shadow-sm

        hover:shadow-md
        hover:bg-gray-50

        active:scale-[0.98]

        transition-all duration-200

        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >

      {/* Google Logo */}
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />

      {loading ? "Signing in..." : "Continue with Google"}

    </button>

  )
}
