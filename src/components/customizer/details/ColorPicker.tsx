
'use client';

import React from 'react';
import { HAT_OPTIONS } from '@/config/hat-options';
import { useCustomizerStore } from '@/store/customizer-store';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export const ColorPicker = () => {
    const { selectedColor, setColor } = useCustomizerStore();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Select Color</h2>
                <p className="text-gray-500 text-sm">
                    Choose the fabric color for the hat panels and visor.
                </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {HAT_OPTIONS.colors.map((color) => {
                    const isSelected = selectedColor.id === color.id;

                    return (
                        <button
                            key={color.id}
                            onClick={() => setColor(color.id)}
                            className="group flex flex-col items-center gap-2"
                            title={color.name}
                        >
                            <div
                                className={clsx(
                                    "w-12 h-12 rounded-full border border-gray-200 shadow-sm transition-transform duration-200 relative flex items-center justify-center",
                                    isSelected ? "scale-110 ring-2 ring-offset-2 ring-black" : "group-hover:scale-105"
                                )}
                                style={{ backgroundColor: color.hex }}
                            >
                                {isSelected && (
                                    <Check
                                        className={clsx(
                                            "w-5 h-5 drop-shadow-md",
                                            // Invert check color based on background logic could go here, simplistic for now
                                            ['white', 'yellow'].includes(color.id) ? "text-black" : "text-white"
                                        )}
                                    />
                                )}
                            </div>
                            <span className={clsx(
                                "text-xs font-medium text-center",
                                isSelected ? "text-black" : "text-gray-500"
                            )}>
                                {color.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
