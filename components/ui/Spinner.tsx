// components/ui/Spinner.tsx
import { memo } from 'react';

const Spinner = memo(() => (
    <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-[#F25912] border-r-[#F25912] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-b-[#F25912] border-l-[#F25912] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
    </div>
));
Spinner.displayName = 'Spinner';

export { Spinner };