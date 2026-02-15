import React from 'react';
import { useData } from '../context/DataContext';
import { AlertCircle, X } from 'lucide-react';

const GlobalErrorBanner: React.FC = () => {
    const { error, loading } = useData();
    const [isVisible, setIsVisible] = React.useState(true);

    // Don't show if no error or if loading
    if (!error || loading || !isVisible) return null;

    const isMissingConfig = error.includes('Missing Supabase') || error.includes('Failed to load data');

    return (
        <div className="bg-red-50 border-b border-red-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 rounded-lg bg-red-100">
                            <AlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </span>
                        <div className="ml-3 font-medium text-red-700 truncate">
                            <span className="md:hidden">Connection Error</span>
                            <span className="hidden md:inline">
                                {isMissingConfig
                                    ? "Application Configuration Missing: Data cannot be loaded."
                                    : "Connection Error: Failed to load latest data."}
                            </span>
                        </div>
                    </div>

                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        {isMissingConfig && (
                            <a
                                href="https://vercel.com/docs/projects/environment-variables"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                            >
                                Fix Config
                            </a>
                        )}
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            type="button"
                            onClick={() => setIsVisible(false)}
                            className="-mr-1 flex p-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                        >
                            <span className="sr-only">Dismiss</span>
                            <X className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                {isMissingConfig && (
                    <div className="mt-2 text-sm text-red-600 pl-14">
                        <p>If you are the developer: You need to add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Project Settings.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalErrorBanner;
