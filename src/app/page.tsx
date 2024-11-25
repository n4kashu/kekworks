export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <iframe 
        src="/yhghh.HTML" 
        className="fixed inset-0 w-full h-full z-0" 
        style={{
          border: 'none',
          pointerEvents: 'none',
          transform: 'scale(1.1)', // Slight zoom to cover potential edges
          transformOrigin: 'center center'
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">kekworks</h1>
              <svg width="400" height="200" className="mx-auto">
                <g id="frontText"></g>
                <circle 
                  className="logo" 
                  cx="200" 
                  cy="100" 
                  r="40" 
                  fill="rgba(0, 255, 0, 0.2)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
