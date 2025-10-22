// components/icons/ShieldIcon.tsx
import { memo } from 'react';

const ShieldIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

export { ShieldIcon };