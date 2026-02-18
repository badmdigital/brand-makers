
'use client';

import React, { useEffect, useRef } from 'react';
import { useCustomizerStore } from '@/store/customizer-store';
import { Check } from 'lucide-react';
import clsx from 'clsx';


export const StepNavigator = () => {
    const { currentStep, steps, setStep } = useCustomizerStore();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        if (scrollContainerRef.current && stepRefs.current[currentStep]) {
            const container = scrollContainerRef.current;
            const activeStep = stepRefs.current[currentStep];

            if (activeStep) {
                const containerWidth = container.offsetWidth;
                const stepLeft = activeStep.offsetLeft;
                const stepWidth = activeStep.offsetWidth;

                // Calculate scroll position to center the active step
                const scrollLeft = stepLeft - (containerWidth / 2) + (stepWidth / 2);

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentStep]);

    return (
        <div className="w-full py-4 border-b border-gray-200 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
            <div
                ref={scrollContainerRef}
                className="container mx-auto px-4 overflow-x-auto no-scrollbar"
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto relative min-w-[900px] pb-12 pt-2">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0" />

                    {/* Progress Bar Active */}
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-black -z-0 transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, index) => {
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <button
                                key={step}
                                ref={el => { stepRefs.current[index] = el }}
                                onClick={() => setStep(index)}
                                className="relative z-10 flex flex-col items-center group focus:outline-none"
                                disabled={!isCompleted && !isCurrent} // Optional: block jumping ahead
                            >
                                <div
                                    className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                                        isCompleted ? "bg-black border-black text-white" :
                                            isCurrent ? "bg-white border-black text-black scale-110" :
                                                "bg-white border-gray-300 text-gray-400"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <span
                                    className={clsx(
                                        "absolute top-10 text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 w-32 text-center -ml-16 left-1/2 leading-tight",
                                        isCurrent ? "text-black" : "text-gray-400 group-hover:text-gray-600"
                                    )}
                                >
                                    {step}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
