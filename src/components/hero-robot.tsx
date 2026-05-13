"use client";

export function HeroRobot({ accent = "#0ea5e9" }: { accent?: string }) {
  return (
    <svg
      viewBox="0 0 500 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Gradients for metallic white/silver look */}
        <linearGradient id="helmetMain" x1="250" y1="20" x2="250" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8e8ec" />
          <stop offset="40%" stopColor="#d4d4d8" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
        <linearGradient id="helmetSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8c8cc" />
          <stop offset="100%" stopColor="#8a8a90" />
        </linearGradient>
        <linearGradient id="visorGrad" x1="250" y1="85" x2="250" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#0f0f1a" />
          <stop offset="100%" stopColor="#2a2a3e" />
        </linearGradient>
        <linearGradient id="bodyMain" x1="250" y1="200" x2="250" y2="650" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0e0e4" />
          <stop offset="30%" stopColor="#d0d0d4" />
          <stop offset="70%" stopColor="#b8b8bc" />
          <stop offset="100%" stopColor="#909098" />
        </linearGradient>
        <linearGradient id="chestPlate" x1="250" y1="280" x2="250" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dcdce0" />
          <stop offset="100%" stopColor="#a8a8b0" />
        </linearGradient>
        <linearGradient id="darkPanel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a42" />
          <stop offset="100%" stopColor="#28282e" />
        </linearGradient>
        <linearGradient id="shoulderGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d0d0d5" />
          <stop offset="100%" stopColor="#9a9aa0" />
        </linearGradient>
        <linearGradient id="neckGrad" x1="250" y1="170" x2="250" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a4a52" />
          <stop offset="50%" stopColor="#3a3a42" />
          <stop offset="100%" stopColor="#4a4a52" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="40%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8c8cc" />
          <stop offset="100%" stopColor="#8a8a92" />
        </linearGradient>
        {/* Ambient light from top */}
        <radialGradient id="ambientTop" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Reflection highlight */}
        <linearGradient id="highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ══════ AMBIENT LIGHT ══════ */}
      <rect x="0" y="0" width="500" height="650" fill="url(#ambientTop)" />

      {/* ══════════════════════════════════════ */}
      {/*  HELMET / HEAD                         */}
      {/* ══════════════════════════════════════ */}

      {/* Helmet main shell */}
      <path
        d="M170 130 C170 55, 195 20, 250 15 C305 20, 330 55, 330 130 L330 150 C330 165, 320 175, 305 178 L195 178 C180 175, 170 165, 170 150 Z"
        fill="url(#helmetMain)"
        stroke="#b0b0b5"
        strokeWidth="0.5"
      />
      {/* Helmet top ridge */}
      <path
        d="M220 18 C230 12, 270 12, 280 18"
        fill="none"
        stroke="#c0c0c5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Helmet center crest */}
      <path
        d="M245 15 L245 60 Q250 65 255 60 L255 15"
        fill="#c8c8cc"
        stroke="#aaa"
        strokeWidth="0.3"
      />
      {/* Side panels - left */}
      <path
        d="M170 100 C165 90, 162 105, 160 125 C158 140, 162 155, 170 160"
        fill="url(#helmetSide)"
        stroke="#999"
        strokeWidth="0.5"
      />
      {/* Side panels - right */}
      <path
        d="M330 100 C335 90, 338 105, 340 125 C342 140, 338 155, 330 160"
        fill="url(#helmetSide)"
        stroke="#999"
        strokeWidth="0.5"
      />

      {/* ── VISOR ── */}
      <path
        d="M185 88 C185 78, 200 70, 250 70 C300 70, 315 78, 315 88 L315 130 C315 142, 300 148, 250 148 C200 148, 185 142, 185 130 Z"
        fill="url(#visorGrad)"
        stroke="#555"
        strokeWidth="0.8"
      />
      {/* Visor reflection */}
      <path
        d="M195 82 C195 76, 210 72, 250 72 C270 72, 285 74, 295 78"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.15"
      />

      {/* Eyes behind visor */}
      <ellipse cx="222" cy="108" rx="12" ry="8" fill="url(#eyeGlow)">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="278" cy="108" rx="12" ry="8" fill="url(#eyeGlow)">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Eye cores */}
      <circle cx="222" cy="108" r="3" fill={accent} opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="278" cy="108" r="3" fill={accent} opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Chin guard */}
      <path
        d="M200 148 C200 155, 210 165, 250 168 C290 165, 300 155, 300 148"
        fill="#c0c0c5"
        stroke="#aaa"
        strokeWidth="0.5"
      />

      {/* ══════════════════════════════════════ */}
      {/*  NECK                                   */}
      {/* ══════════════════════════════════════ */}
      <path
        d="M215 175 L215 215 Q215 225 225 228 L275 228 Q285 225 285 215 L285 175"
        fill="url(#neckGrad)"
        stroke="#505058"
        strokeWidth="0.5"
      />
      {/* Neck segments */}
      <line x1="218" y1="185" x2="282" y2="185" stroke="#555" strokeWidth="0.5" />
      <line x1="218" y1="195" x2="282" y2="195" stroke="#555" strokeWidth="0.5" />
      <line x1="218" y1="205" x2="282" y2="205" stroke="#555" strokeWidth="0.5" />
      {/* Neck cables */}
      <path d="M225 178 Q220 195, 222 215" fill="none" stroke="#3a3a42" strokeWidth="2" />
      <path d="M275 178 Q280 195, 278 215" fill="none" stroke="#3a3a42" strokeWidth="2" />

      {/* ══════════════════════════════════════ */}
      {/*  TORSO / CHEST                          */}
      {/* ══════════════════════════════════════ */}

      {/* Main torso shell */}
      <path
        d="M140 260 C130 245, 180 225, 250 225 C320 225, 370 245, 360 260 L370 430 C375 460, 340 480, 250 480 C160 480, 125 460, 130 430 Z"
        fill="url(#bodyMain)"
        stroke="#a0a0a5"
        strokeWidth="0.5"
      />

      {/* Upper chest plate */}
      <path
        d="M175 250 L175 340 Q175 360, 195 370 L250 385 L305 370 Q325 360, 325 340 L325 250 Q325 240, 300 235 L250 230 L200 235 Q175 240, 175 250 Z"
        fill="url(#chestPlate)"
        stroke="#b0b0b5"
        strokeWidth="0.5"
      />

      {/* Center chest line */}
      <line x1="250" y1="235" x2="250" y2="385" stroke="#b8b8bd" strokeWidth="0.8" />

      {/* Chest dark accent panels - left */}
      <path
        d="M185 270 L185 330 Q185 340, 195 345 L240 360 L240 260 L200 262 Q185 264, 185 270Z"
        fill="url(#darkPanel)"
        stroke="#4a4a50"
        strokeWidth="0.3"
      />
      {/* Chest dark accent panels - right */}
      <path
        d="M315 270 L315 330 Q315 340, 305 345 L260 360 L260 260 L300 262 Q315 264, 315 270Z"
        fill="url(#darkPanel)"
        stroke="#4a4a50"
        strokeWidth="0.3"
      />

      {/* ── CORE EMBLEM ── */}
      <circle cx="250" cy="400" r="28" fill="#1a1a20" stroke="#444" strokeWidth="1" />
      <circle cx="250" cy="400" r="22" fill="#111118" stroke="#333" strokeWidth="0.5" />
      {/* Dexio "D" emblem */}
      <text x="250" y="408" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="#666">D</text>
      {/* Core glow ring */}
      <circle cx="250" cy="400" r="30" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.15;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="400" r="35" fill="url(#coreGlow)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Chest vents */}
      <rect x="195" y="430" width="110" height="2" rx="1" fill="#a0a0a5" opacity="0.5" />
      <rect x="200" y="438" width="100" height="2" rx="1" fill="#a0a0a5" opacity="0.4" />
      <rect x="205" y="446" width="90" height="2" rx="1" fill="#a0a0a5" opacity="0.3" />

      {/* Side body panels */}
      <path
        d="M140 270 C130 270, 125 280, 125 300 L120 380 C118 400, 125 420, 135 430"
        fill="none"
        stroke="#a0a0a5"
        strokeWidth="0.8"
      />
      <path
        d="M360 270 C370 270, 375 280, 375 300 L380 380 C382 400, 375 420, 365 430"
        fill="none"
        stroke="#a0a0a5"
        strokeWidth="0.8"
      />

      {/* ══════════════════════════════════════ */}
      {/*  SHOULDERS                               */}
      {/* ══════════════════════════════════════ */}

      {/* Left shoulder */}
      <ellipse cx="128" cy="248" rx="35" ry="28" fill="url(#shoulderGrad)" stroke="#a0a0a5" strokeWidth="0.5" />
      {/* Shoulder detail ring */}
      <ellipse cx="128" cy="248" rx="22" ry="18" fill="none" stroke="#888" strokeWidth="0.5" />
      {/* Shoulder joint */}
      <circle cx="128" cy="248" r="10" fill="#4a4a52" stroke="#666" strokeWidth="0.5" />
      <circle cx="128" cy="248" r="4" fill="#333" />
      {/* Shoulder accent */}
      <path d="M108 230 Q100 248, 108 266" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.25" />

      {/* Right shoulder */}
      <ellipse cx="372" cy="248" rx="35" ry="28" fill="url(#shoulderGrad)" stroke="#a0a0a5" strokeWidth="0.5" />
      <ellipse cx="372" cy="248" rx="22" ry="18" fill="none" stroke="#888" strokeWidth="0.5" />
      <circle cx="372" cy="248" r="10" fill="#4a4a52" stroke="#666" strokeWidth="0.5" />
      <circle cx="372" cy="248" r="4" fill="#333" />
      <path d="M392 230 Q400 248, 392 266" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.25" />

      {/* ══════════════════════════════════════ */}
      {/*  ARMS (upper portion visible)            */}
      {/* ══════════════════════════════════════ */}

      {/* Left upper arm */}
      <path
        d="M105 270 C95 275, 88 290, 85 320 L80 400 C78 420, 82 435, 90 445"
        fill="none"
        stroke="url(#armGrad)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      {/* Left arm panel overlay */}
      <path
        d="M95 280 L90 370"
        stroke="#b8b8bc"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Left arm dark accent */}
      <path
        d="M100 290 L96 350"
        stroke="url(#darkPanel)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Left elbow */}
      <circle cx="85" cy="400" r="12" fill="#4a4a52" stroke="#666" strokeWidth="0.5" />
      <circle cx="85" cy="400" r="5" fill="#333" />

      {/* Right upper arm */}
      <path
        d="M395 270 C405 275, 412 290, 415 320 L420 400 C422 420, 418 435, 410 445"
        fill="none"
        stroke="url(#armGrad)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M405 280 L410 370"
        stroke="#b8b8bc"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M400 290 L404 350"
        stroke="url(#darkPanel)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="415" cy="400" r="12" fill="#4a4a52" stroke="#666" strokeWidth="0.5" />
      <circle cx="415" cy="400" r="5" fill="#333" />

      {/* ══════════════════════════════════════ */}
      {/*  FOREARMS (partial, fading out)          */}
      {/* ══════════════════════════════════════ */}
      <path
        d="M85 415 L78 520"
        stroke="#a0a0a5"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M415 415 L422 520"
        stroke="#a0a0a5"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* ══════════════════════════════════════ */}
      {/*  HIGHLIGHT REFLECTIONS                   */}
      {/* ══════════════════════════════════════ */}

      {/* Helmet highlight */}
      <path
        d="M200 30 C210 22, 240 18, 250 17"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.12"
        strokeLinecap="round"
      />

      {/* Chest highlight left */}
      <path
        d="M185 252 L185 300"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.08"
      />

      {/* Shoulder highlight */}
      <path
        d="M110 232 Q128 222, 146 232"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.1"
      />
      <path
        d="M354 232 Q372 222, 390 232"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.1"
      />

      {/* ══════════════════════════════════════ */}
      {/*  TEXT / BRANDING                         */}
      {/* ══════════════════════════════════════ */}
      <text x="250" y="48" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="3" fill="#999" opacity="0.6">DEXIO</text>
      <text x="250" y="470" textAnchor="middle" fontFamily="monospace" fontSize="11" letterSpacing="2" fill="#777" opacity="0.5">T800</text>

      {/* Bottom fade to black */}
      <rect x="0" y="520" width="500" height="130" fill="url(#bottomFade)" />
      <defs>
        <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
