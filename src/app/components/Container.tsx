import { cn } from '@/utils/cn'
import React from 'react'

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'inset' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export default function Container({ 
    variant = 'default',
    padding = 'md',
    hover = false,
    className,
    children,
    ...props 
}: ContainerProps) {
    const variantClasses = {
        default: 'bg-white border border-gray-100 shadow-sm',
        elevated: 'bg-white border border-gray-200 shadow-lg',
        inset: 'bg-gray-50 border border-gray-200 shadow-inner',
        glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg'
    };

    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const hoverClass = hover 
        ? 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-gray-300' 
        : '';

    return (
        <div 
            {...props} 
            className={cn(
                'w-full rounded-2xl transition-all duration-300',
                variantClasses[variant],
                paddingClasses[padding],
                hoverClass,
                className
            )}
        >
            {children}
        </div>
    );
}

// Additional Glass Container for Modern UI
export const GlassContainer = ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div 
            {...props}
            className={cn(
                'w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl',
                'transition-all duration-500 hover:bg-white/15 hover:border-white/30',
                className
            )}
        >
            {children}
        </div>
    );
};

// Card Component for consistent card layouts
export const Card = ({ 
    children, 
    className,
    title,
    action,
    ...props 
}: React.HTMLProps<HTMLDivElement> & { title?: string; action?: React.ReactNode }) => {
    return (
        <Container variant="elevated" hover className={cn('p-6', className)} {...props}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    )}
                    {action && (
                        <div className="flex items-center gap-2">
                            {action}
                        </div>
                    )}
                </div>
            )}
            {children}
        </Container>
    );
};