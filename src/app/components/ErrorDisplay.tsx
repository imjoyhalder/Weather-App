// components/ErrorDisplay.tsx
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <FaExclamationTriangle className="text-6xl text-white/90" />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">Weather Data Unavailable</h2>
                <p className="text-white/80 mb-6 leading-relaxed">{message}</p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                        <FaRedo className="text-sm" />
                        Try Again
                    </button>
                )}

                <div className="mt-6 text-sm text-white/60">
                    <p>Please check:</p>
                    <ul className="mt-2 space-y-1">
                        <li>• Your internet connection</li>
                        <li>• Location name spelling</li>
                        <li>• API service status</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}