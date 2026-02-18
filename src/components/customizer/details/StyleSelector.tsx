
'use client';

import React from 'react';
import { HAT_OPTIONS } from '@/config/hat-options';
import { useCustomizerStore } from '@/store/customizer-store';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import Image from 'next/image';

export const StyleSelector = () => {
    const { selectedStyle, setStyle } = useCustomizerStore();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Select Style</h2>
                <p className="text-gray-500 text-sm">
                    Choose the base silhouette for your custom hat.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {HAT_OPTIONS.styles.map((style) => {
                    const isSelected = selectedStyle.id === style.id;

                    return (
                        <button
                            key={style.id}
                            onClick={() => setStyle(style.id)}
                            className={clsx(
                                "group relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left hover:border-gray-300",
                                isSelected ? "border-black bg-gray-50 ring-1 ring-black/5" : "border-gray-100 bg-white"
                            )}
                        >
                            <div className="relative w-full aspect-[4/3] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={style.image}
                                    alt={style.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-sm">{style.name}</h3>
                                    {isSelected && (
                                        <div className="bg-black text-white rounded-full p-1">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {style.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
