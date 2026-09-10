import type React from "react"

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-950 via-[#071521] to-blue-950 z-[9999]">
      <div className="relative flex flex-col items-center">
        {/* Animated research vessel on polar water */}
        <div className="relative w-40 h-32 mb-6">
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-ship-move">
            <div className="relative h-12 w-40 rounded-b-[45%] rounded-t-xl bg-gradient-to-b from-cyan-300 to-blue-700 shadow-[0_12px_24px_rgba(34,211,238,.3)]">
              <div className="absolute -top-8 left-12 h-8 w-16 rounded-t-lg border border-cyan-200/40 bg-sky-800"><div className="absolute left-2 top-2 h-3 w-10 rounded bg-cyan-100/80" /></div>
              <div className="absolute -bottom-3 left-[-18px] h-5 w-52 rounded-full bg-cyan-300/30 blur-sm" />
            </div>
          </div>
        </div>

        {/* GPS Signal Indicators */}
        <div className="relative w-32 h-4 mb-8">
          <div className="absolute inset-0 flex justify-around items-end">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="bg-cyan-300 rounded-t-sm animate-signal" 
                style={{ 
                  height: `${(i+1) * 4 + 4}px`, 
                  width: '4px',
                  animationDelay: `${i * 0.15}s` 
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-300 to-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <style>{`
        @keyframes ship-move {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-3px); }
        }
        
        @keyframes road {
          0% { transform: translateX(0); }
          100% { transform: translateX(-48px); }
        }
        
        @keyframes signal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        @keyframes progress {
          0% { width: 10%; }
          50% { width: 70%; }
          100% { width: 90%; }
        }
        
        .animate-road {
          animation: road 1s linear infinite;
        }
        
        .animate-ship-move {
          animation: ship-move 1.4s ease-in-out infinite;
        }
        
        .animate-signal {
          animation: signal 1.5s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Loader