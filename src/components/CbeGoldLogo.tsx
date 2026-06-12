import React from 'react';

export default function CbeGoldLogo({ className = "w-14 h-14" }: { className?: string }) {
  // Generate 60 dynamic high-fidelity gold wires swirling in an elegant spiral vortex around the central coin
  // To match the beautiful helical shell/vortex pattern of CBE's official logo in Photo 1/Image 1:
  const wireLines = Array.from({ length: 60 }).map((_, i) => {
    // Elegant progression of ellipse dimensions
    const rx = 14 + i * 1.35;
    const ry = 8.5 + i * 0.95;
    
    // Centers of the wire loops are offset along a spiral path to create the fanning shell/wing whorl
    const spiralAngle = (i * 7.2 * Math.PI) / 180;
    const rOffset = i * 0.45;
    const ecx = 100 - rOffset * Math.cos(spiralAngle);
    const ecy = 100 - rOffset * Math.sin(spiralAngle);
    
    // Rotation of each ellipse spreads the wires into a layered 3D bundle
    const rotate = i * 5.8;

    // Alternate stroke thicknesses and opacities for brilliant 3D wire bundle depth
    const strokeWidth = 0.35 + (i % 3) * 0.16;
    const opacity = 0.35 + (i / 60) * 0.55;

    return (
      <ellipse
        key={i}
        cx={ecx}
        cy={ecy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="url(#goldMetallic)"
        strokeWidth={strokeWidth}
        opacity={opacity}
        transform={`rotate(${rotate}, ${ecx}, ${ecy})`}
      />
    );
  });

  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Multi-stop metallic linear gradient for ultra-realistic reflective gold finish */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDE9" />
          <stop offset="20%" stopColor="#E5C158" />
          <stop offset="40%" stopColor="#AA7C11" />
          <stop offset="60%" stopColor="#FCEAA7" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6405" />
        </linearGradient>

        <linearGradient id="goldBevel" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6E4E05" />
          <stop offset="30%" stopColor="#AA7C11" />
          <stop offset="50%" stopColor="#FFF2B5" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#FFEAA7" />
        </linearGradient>

        {/* Realistic 3D Sphere/Conic lighting simulation for the Coin background disc */}
        <radialGradient id="coinGoldRadial" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFEE3" />
          <stop offset="20%" stopColor="#FCE17F" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="80%" stopColor="#AA7C11" />
          <stop offset="95%" stopColor="#6E4E05" />
          <stop offset="100%" stopColor="#3F2B00" />
        </radialGradient>

        {/* High-fidelity drop shadow filter to float the central coin over the wire meshes */}
        <filter id="coinDropShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#1B041C" floodOpacity="0.85" />
        </filter>

        {/* Perfect text circular coordinate paths around 100,100 with radius 27 */}
        {/* Top Arc (Clockwise Left-to-Right over the top, radius ~27) */}
        <path id="topTextPath" d="M 73,100 A 27,27 0 0,1 127,100" fill="none" stroke="none" />
        
        {/* Bottom Arc (Clockwise Right-to-Left under the bottom, radius ~27) */}
        <path id="bottomTextPath" d="M 127,100 A 27,27 0 0,1 73,100" fill="none" stroke="none" />
      </defs>

      {/* 1. Behind-medallion elegant sweeping spiral wire-bundle */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {wireLines}
      </g>

      {/* 2. Floating Golden Medallion Coin Group */}
      <g filter="url(#coinDropShadow)">
        {/* Rounded border 3D bevelled edge */}
        <circle cx="100" cy="100" r="32.5" fill="url(#goldBevel)" stroke="#59145A" strokeWidth="0.5" />
        
        {/* Beautiful polished golden surface */}
        <circle cx="100" cy="100" r="31" fill="url(#coinGoldRadial)" />

        {/* Recessed inscription channel border line */}
        <circle cx="100" cy="100" r="28" stroke="url(#goldBevel)" strokeWidth="0.8" fill="none" />
        <circle cx="100" cy="100" r="22" stroke="url(#goldBevel)" strokeWidth="0.8" fill="none" />

        {/* 3. Official Curve Inscriptions (Amharic top & bottom) */}
        <g>
          {/* Top Text: "የኢትዮጵያ" */}
          <text 
            fill="#59145A" 
            fontSize="5.2" 
            fontWeight="900" 
            fontFamily='"Noto Sans Ethiopic", "Noto Sans", "Inter", sans-serif' 
            letterSpacing="0.8"
          >
            <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
              የኢትዮጵያ
            </textPath>
          </text>

          {/* Bottom Text: "ንግድ ባንክ" */}
          <text 
            fill="#59145A" 
            fontSize="5.2" 
            fontWeight="900" 
            fontFamily='"Noto Sans Ethiopic", "Noto Sans", "Inter", sans-serif' 
            letterSpacing="0.8"
          >
            <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
              ንግድ ባንክ
            </textPath>
          </text>

          {/* High luxury diamond or circle dots separating top & bottom strings */}
          <circle cx="73" cy="100" r="1.1" fill="url(#goldBevel)" stroke="#59145A" strokeWidth="0.4" />
          <circle cx="127" cy="100" r="1.1" fill="url(#goldBevel)" stroke="#59145A" strokeWidth="0.4" />
        </g>

        {/* 4. Elegant inner medallion gold-rim and deep purple velvet monogram backing */}
        <circle cx="100" cy="100" r="19" fill="#59145A" stroke="url(#goldBevel)" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="17" stroke="url(#goldMetallic)" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />

        {/* 5. Central 3D embossed CBE Intertwined Monogram letters */}
        <g transform="translate(100, 100)">
          {/* Serif Crescent "C" wrapping leftward */}
          <path 
            d="M 6.5,-12.5 C -2.5,-12.5 -10,-7 -10,0 C -10,7 -2.5,12.5 6.5,12.5 C 9.5,12.5 11.5,10.2 12,7.8 L 9.2,7.4 C 8.5,8.8 6.5,9.8 3,9.8 C -3,9.8 -7,5 -7,0 C -7,-5 -3,-9.8 3,-9.8 C 6.5,-9.8 8.5,-8.8 9.2,-7.4 L 12,-7.8 C 11.5,-10.2 9.5,-12.5 6.5,-12.5 Z" 
            fill="url(#goldMetallic)"
            stroke="#AA7C11"
            strokeWidth="0.3"
          />
          
          {/* High-end vertical stem for "B" and "E" */}
          <rect x="-1" y="-11" width="2.4" height="22" rx="0.4" fill="url(#goldMetallic)" stroke="#AA7C11" strokeWidth="0.3" />
          
          {/* Top and Bottom elegant bar serif slabs */}
          <path d="M -3.5,-11 L 2,-11 L 2,-9.5 L -3.5,-9.5 Z" fill="url(#goldMetallic)" />
          <path d="M -3.5,9.5 L 2,9.5 L 2,11 L -3.5,11 Z" fill="url(#goldMetallic)" />

          {/* Interlocked "B" loops (thick serif curves) */}
          <path 
            d="M 1.4,-11 C 5.5,-11 7.8,-9.2 7.8,-6 C 7.8,-2.8 5.5,-1 1.4,-1 L 1.4,-11 Z" 
            fill="none" 
            stroke="url(#goldMetallic)" 
            strokeWidth="2.1" 
          />
          <path 
            d="M 1.4,-11 C 5.5,-11 7.8,-9.2 7.8,-6 C 7.8,-2.8 5.5,-1 1.4,-1 L 1.4,-11 Z" 
            fill="none" 
            stroke="#AA7C11" 
            strokeWidth="0.4" 
          />

          {/* Interlocked "E" bottom horizontal bars */}
          <path d="M 1.4,-1.5 L 6.5,-1.5 L 6.5,0.2 L 1.4,0.2 Z" fill="url(#goldMetallic)" stroke="#AA7C11" strokeWidth="0.2" />
          <path d="M 1.4,4 L 5.5,4 L 5.5,5.7 L 1.4,5.7 Z" fill="url(#goldMetallic)" stroke="#AA7C11" strokeWidth="0.2" />
          <path d="M 1.4,9 L 7.5,9 L 7.5,10.7 L 1.4,10.7 Z" fill="url(#goldMetallic)" stroke="#AA7C11" strokeWidth="0.2" />
        </g>
      </g>
    </svg>
  );
}
