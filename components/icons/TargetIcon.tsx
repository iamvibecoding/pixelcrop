// components/icons/TargetIcon.tsx
import { memo } from 'react';

const TargetIcon = memo(({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
    </svg>
));
TargetIcon.displayName = 'TargetIcon';

export { TargetIcon };