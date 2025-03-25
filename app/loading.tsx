'use client';
const LoadingPage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <style jsx>{`
                @keyframes slide {
                    0% { transform: translateY(-50px); }
                    100% { transform: translateY(50px); }
                }
                @keyframes escalade {
                    0% { stroke-dasharray: 0 157px; stroke-dashoffset: 0; }
                    50% { stroke-dasharray: 157px 157px; stroke-dashoffset: 0; }
                    100% { stroke-dasharray: 157px 157px; stroke-dashoffset: -156px; }
                }
                .animate-slide {
                    animation: slide 2s linear infinite;
                }
                .animate-escalade {
                    animation: escalade 2s cubic-bezier(0.8, 0, 0.2, 1) infinite;
                }
            `}</style>
            <svg className="w-[100px] h-[150px] overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <g className="animate-slide">
                    <path d="M 50,100 A 1,1 0 0 1 50,0" className="stroke-[url(#gradient)] stroke-[20px] stroke-round fill-none animate-escalade"/>
                </g>
                <g className="animate-slide" style={{animationDelay: '0.5s'}}>
                    <path d="M 50,75 A 1,1 0 0 0 50,-25" className="stroke-[url(#gradient)] stroke-[20px] stroke-round fill-none animate-escalade" style={{animationDelay: '0.5s', strokeDasharray: '0 158px', strokeDashoffset: '1px'}}/>
                </g>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#FF56A1", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#FF9350", stopOpacity:1}} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default LoadingPage;
