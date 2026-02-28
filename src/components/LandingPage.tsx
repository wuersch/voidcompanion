import { useAuth } from '../hooks/useAuth'
import bgImage from '../../assets/key-art-against-the-void.jpg'
import logoImage from '../../assets/wow-midnight-logo.png'

export default function LandingPage() {
  const { login } = useAuth()
  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg-deep">
      {/* Background key art */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Radial gradient overlay — dark center, lighter edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, #0a0b14dd 0%, #0a0b1488 70%, #0a0b14aa 100%)',
        }}
      />

      {/* Centered content */}
      <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-15">
        {/* Logo */}
        <img
          src={logoImage}
          alt="World of Warcraft: Midnight"
          className="h-auto w-[420px] max-w-full"
        />

        {/* Subtitle */}
        <h1
          className="mt-0 font-display text-lg font-semibold tracking-[6px] text-gold-dark"
        >
          LEVELING COMPANION
        </h1>

        {/* Spacer */}
        <div className="h-10" />

        {/* Tagline */}
        <p className="text-lg text-text-secondary">
          Track your journey through Quel'Thalas
        </p>

        {/* Spacer */}
        <div className="h-8" />

        {/* Login button — gold gradient matching Button/Primary component */}
        <button
          type="button"
          onClick={login}
          className="cursor-pointer rounded-xl bg-linear-to-b from-gold to-gold-dark px-6 py-3 font-body text-base font-semibold text-bg-deep transition-all duration-200 hover:brightness-110 active:brightness-95"
        >
          Login with Battle.net
        </button>

        {/* Push footer to bottom */}
        <div className="flex-1" />

        {/* Footer */}
        <p className="text-xs text-text-dim">
          A fan-made companion app. Not affiliated with Blizzard Entertainment.
        </p>
      </div>
    </div>
  )
}
