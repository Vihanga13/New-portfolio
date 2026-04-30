export default function FilmCountdown() {
  return (
    <div className="fixed inset-0 bg-black-deep z-[10000] flex items-center justify-center pointer-events-none"
         style={{
           animation: 'fadeOutCountdown 0.5s ease-out 3.5s forwards'
         }}>
      <div className="relative w-36 h-36">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold opacity-0"
             style={{
               animation: 'countdownSequence 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
             }}>
          3
        </div>
      </div>

      <style>{`
        @keyframes fadeOutCountdown {
          to {
            opacity: 0;
            pointer-events: none;
          }
        }

        @keyframes countdownSequence {
          0% {
            opacity: 1;
            transform: scale(1.2);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  )
}
