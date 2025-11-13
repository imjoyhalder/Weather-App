// components/SearchBox.tsx - Fixed version
import { cn } from '@/utils/cn';
import React, { useState, useRef, useEffect } from 'react';
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

type Props = {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    onSubmit: (value: string) => void;
    loading?: boolean;
    placeholder?: string;
}

const SearchBox = (props: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(props.value);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync with parent value
    useEffect(() => {
        setLocalValue(props.value);
    }, [props.value]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedValue = localValue.trim();
        if (trimmedValue && !props.loading) {
            props.onSubmit(trimmedValue);
            inputRef.current?.blur();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalValue(value);
        props.onChange(value);
    };

    const handleClear = () => {
        setLocalValue('');
        props.onChange('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            if (localValue) {
                handleClear();
            } else {
                inputRef.current?.blur();
            }
        } else if (e.key === 'Enter' && !props.loading) {
            handleSubmit(e as any);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'flex relative items-center justify-center h-12 bg-white rounded-xl shadow-sm border transition-all duration-300 group',
                isFocused
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
                props.loading && 'opacity-80 cursor-not-allowed',
                props.className
            )}
        >
            <div className='flex items-center w-full h-full'>
                {/* Search Icon */}
                <div className='pl-4 pr-3 flex-shrink-0'>
                    <IoSearchOutline className={cn(
                        'text-lg transition-colors duration-200',
                        isFocused ? 'text-blue-500' : 'text-gray-400',
                        props.loading && 'animate-pulse'
                    )} />
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={localValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder={props.placeholder || 'Search city in Bangladesh...'}
                    className={cn(
                        'w-full h-full bg-transparent outline-none text-gray-800 placeholder-gray-500',
                        'text-sm md:text-base transition-colors duration-200 pr-2',
                        'disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                    disabled={props.loading}
                    autoComplete="off"
                    spellCheck="false"
                    enterKeyHint="search"
                />

                {/* Clear Button */}
                {localValue && !props.loading && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 mr-2"
                        aria-label="Clear search"
                    >
                        <IoCloseOutline className="text-lg" />
                    </button>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    disabled={props.loading || !localValue.trim()}
                    className={cn(
                        'px-4 h-10 mx-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg',
                        'focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2',
                        'transition-all duration-200 flex items-center justify-center min-w-[90px]',
                        'font-medium text-sm whitespace-nowrap',
                        (props.loading || !localValue.trim())
                            ? 'opacity-50 cursor-not-allowed'
                            : cn(
                                'hover:from-blue-600 hover:to-blue-700',
                                'active:scale-95 active:shadow-inner',
                                'shadow-sm hover:shadow-md'
                            )
                    )}
                    aria-label="Search location"
                >
                    {props.loading ? (
                        <div className="flex items-center gap-2">
                            <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                            <span className="hidden sm:inline">Searching</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <IoSearchOutline className="text-sm" />
                            <span>Search</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Loading overlay */}
            {props.loading && (
                <div className="absolute inset-0 bg-white/50 rounded-xl backdrop-blur-[1px] pointer-events-none" />
            )}
        </form>
    );
}

export default SearchBox;