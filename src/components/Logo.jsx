import React from 'react';

export default function LogoIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="zerooLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        d="M13 4H29L20 15H27L10 32L14 20H7L13 4Z"
        fill="url(#zerooLogoGradient)"
      />
    </svg>
  );
}
