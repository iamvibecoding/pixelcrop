// components/icons/SparklesIcon.tsx
import { memo } from 'react';

const SparklesIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"></path>
        <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"></path>
    </svg>
));
SparklesIcon.displayName = 'SparklesIcon';

export { SparklesIcon };