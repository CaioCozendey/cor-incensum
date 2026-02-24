export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin">
          <defs>
            <radialGradient id="spinHeart" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#7a1c1c" />
            </radialGradient>
          </defs>
          <path
            d="M50 85 C50 85 10 55 10 32 C10 18 20 10 35 10 C42 10 48 14 50 18 C52 14 58 10 65 10 C80 10 90 18 90 32 C90 55 50 85 50 85Z"
            fill="url(#spinHeart)"
            opacity="0.3"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
