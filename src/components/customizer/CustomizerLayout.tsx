
import React from 'react';
import { StepNavigator } from './StepNavigator';
import { PreviewDisplay } from './PreviewDisplay';

interface CustomizerLayoutProps {
    children: React.ReactNode;
}

export const CustomizerLayout = ({ children }: CustomizerLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <StepNavigator />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 h-full">

                    {/* Left Column: Preview (Sticky on desktop, static on mobile) */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <div className="lg:sticky lg:top-24 h-auto lg:h-[600px]">
                            <PreviewDisplay />
                        </div>
                    </div>

                    {/* Right Column: Controls */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col mt-6 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-grow">
                            {children}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
