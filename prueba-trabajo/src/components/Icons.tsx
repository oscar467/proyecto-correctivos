import React from 'react';

// Atajo para las props de los iconos
type IconProps = React.SVGProps<SVGSVGElement>;

export const BusIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path fill="#87a6ba" d="m57.56 55.06-3.38 3.31H9.81l-3.38-3.31.72-16.35s5.55 4.95 24.84 4.95 24.84-4.95 24.84-4.95l.72 16.35z" data-original="#87a6ba" />
        <path fill="#e2fcfd" d="M44.29 51.2s-.71-3.32 1.16-4.09c5.56-2.27 7.81-3.38 8.68-3.86.25-.14.56.04.56.33 0 1.08-.32 3.34-2.74 5.07-3.3 2.36-7.65 2.55-7.65 2.55zm-24.58 0s.71-3.32-1.16-4.09c-5.56-2.27-7.81-3.38-8.68-3.86a.376.376 0 0 0-.56.33c0 1.08.32 3.34 2.74 5.07 3.3 2.36 7.65 2.55 7.65 2.55z" data-original="#e2fcfd" />
        <path fill="#0b2037" d="M56.84 38.71S51.29 43.66 32 43.66 7.16 38.71 7.16 38.71l.24-5.48c.02.14.27 1.64 3.73 2.65C15.41 37.11 32 37.11 32 37.11s16.6 0 20.87-1.23c3.46-1 3.71-2.5 3.73-2.65z" data-original="#0b2037" />
        <path fill="#87a6ba" d="M14.66 16.88c-2.03.01-3.41.02-3.85.03-2.35.07-2.75 2.39-2.81 2.96l.31-7.18s-.01-.22.02-.55c0-.02.01-.03.01-.05.1-.89.56-2.43 2.47-2.49.49-.01 2.08-.02 4.39-.03 0 0 .71 5.15-.54 7.32zM56 19.86c-.06-.57-.47-2.88-2.81-2.96-.44-.01-1.83-.02-3.85-.03-1.19-2.06-.63-6.65-.54-7.32 2.31 0 3.91.02 4.39.03 1.91.06 2.37 1.6 2.47 2.49 0 .02.01.03.01.05.03.33.02.55.02.55l.31 7.18z" data-original="#87a6ba" />
        <path fill="#0b2037" d="M49.34 16.88c-1.02 0-2.21-.01-3.51-.01-3.9-.01-8.86-.01-13.83-.01-6.63 0-13.27 0-17.34.02 1.25-2.17.54-7.32.54-7.32 8.2-.03 25.4-.03 33.6-.01-.09.67-.65 5.27.54 7.33z" data-original="#0b2037" />
        <path fill="#2c485d" d="M55.66 12.08c-.1-.89-.56-2.43-2.47-2.49-.49-.01-2.08-.03-4.39-.04-8.2-.02-25.4-.02-33.6.01-2.31.01-3.91.02-4.39.03-1.91.06-2.37 1.6-2.47 2.49l.08-1.98a5.345 5.345 0 0 1 3.18-4.67c.48-.22 1-.36 1.55-.42 2.56-.3 6.47-.59 12.37-.71 1.94-.04 4.09-.06 6.48-.06s4.54.02 6.48.06c.29.01.58.01.86.02s.55.01.82.02l1.86.06c.4.01.8.03 1.17.04l1.35.06c.49.03.94.05 1.38.08.34.02.68.04 1 .07.3.02.58.04.85.06.31.02.61.04.9.07.27.02.52.04.76.07.26.02.5.04.73.07.24.02.47.05.68.07a5.345 5.345 0 0 1 4.73 5.09l.08 1.98z" data-original="#2c485d" />
        <path fill="#2fd1f7" d="M56.6 33.22c-.02.15-.27 1.65-3.73 2.66C48.59 37.11 32 37.11 32 37.11V16.86c4.96 0 9.93 0 13.83.01 1.3 0 2.49.01 3.51.01 2.03.01 3.41.02 3.85.03 2.35.07 2.75 2.39 2.81 2.96.01.08.01.13.01.13l.59 13.23z" data-original="#2fd1f7" /><path fill="#26c0f2" d="M32 16.86v20.25s-16.6 0-20.87-1.23c-3.46-1-3.71-2.5-3.73-2.65s.59-13.24.59-13.24 0-.05.01-.13c.06-.57.47-2.88 2.81-2.96 1.33-.04 11.26-.05 21.19-.05z" data-original="#26c0f2" /><path fill="#0b2037" d="m23.68 50.68-.66-2.84a1.03 1.03 0 0 1 1-1.26h15.96c.66 0 1.15.61 1 1.26l-.66 2.84c-.11.47-.52.79-1 .79H24.67c-.48 0-.89-.33-1-.79z" data-original="#0b2037" />
        <path fill="#cd8b47" d="M25.52 4.29c-5.9.12-9.81.41-12.37.71a5.3 5.3 0 0 0-1.55.42c6.37-6.04 13.48-1.44 13.92-1.14zM52.4 5.43c-.48-.22-1-.36-1.55-.42-.22-.02-.44-.05-.68-.07-.24-.03-.48-.05-.73-.07-.25-.03-.5-.05-.76-.07-.29-.03-.59-.05-.9-.07-.27-.03-.55-.05-.85-.06-.32-.03-.66-.05-1-.07-.44-.03-.9-.05-1.38-.08l-1.35-.06c-.37-.01-.76-.03-1.17-.04l-1.86-.06c-.27-.01-.54-.01-.82-.02s-.57-.01-.86-.02c.43-.3 7.55-4.91 13.92 1.14z" data-original="#cd8b47" /><circle cx="50.89" cy="54.24" r="1.66" fill="#e2fcfd" data-original="#e2fcfd" /><circle cx="13.11" cy="54.24" r="1.66" fill="#e2fcfd" data-original="#e2fcfd" /><g fill="#0b2037"><path d="M52.87 58.36v2.18c0 .62-.51 1.13-1.13 1.13h-3.92c-.62 0-1.12-.51-1.12-1.13v-2.18h6.16zm-35.58 0v2.18c0 .62-.5 1.13-1.12 1.13h-3.92c-.62 0-1.13-.51-1.13-1.13v-2.18h6.16z" data-original="#0b2037" /><rect width="4.08" height="8.33" x="58.92" y="18.82" data-original="#0b2037" rx=".88" /></g><path fill="#2c485d" d="M62.09 14.63v4.18h-2.25v-3.9H55.8l-.1-2.24h4.44c1.07 0 1.95.88 1.95 1.95z" data-original="#2c485d" />
        <rect width="4.08" height="8.33" x="1" y="18.82" fill="#0b2037" data-original="#0b2037" rx=".88" />
        <path fill="#2c485d" d="m8.31 12.68-.1 2.24H4.17v3.9H1.91v-4.18c0-1.07.88-1.95 1.95-1.95H8.3z" data-original="#2c485d" />
    </svg>
);

export const WrongIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </g>
    </svg>
);

export const UserIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </g>
    </svg>
);

export const LockIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </g>
    </svg>
);

export const LicensePlateIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M8 12h2m4 0h2" />
    </g>
  </svg>
);

export const IdCardIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h.01M7 15h10M11 9h6" />
    </g>
  </svg>
);