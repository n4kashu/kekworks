export default function Home() {
    return (
        <div className="relative min-h-screen">
            {/* Background Layer */}
            <iframe 
                src="/yhghh.HTML" 
                className="absolute inset-0 w-full h-full z-0" 
                style={{
                    border: 'none',
                    pointerEvents: 'none'
                }}
            />
            
            {/* Content Layer */}
            <div className="relative z-10 p-4">
                {/* Your page content will go here */}
                <div className={"flex justify-center z-10"}>
                    kekworks
                    <svg width="400" height="200">
                        <g id="frontText"></g>
                        <circle class="logo" cx="200" cy="100" r="40" fill="rgba(0, 255, 0, 0.2)"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
