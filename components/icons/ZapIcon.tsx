// components/icons/ZapIcon.tsx
import { memo } from 'react';

const ZapIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
));
ZapIcon.displayName = 'ZapIcon';

export { ZapIcon };