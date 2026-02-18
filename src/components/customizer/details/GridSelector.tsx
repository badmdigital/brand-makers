
'use client';

import React from 'react';
import clsx from 'clsx';
import { Check, Ban } from 'lucide-react';
import Image from 'next/image';

interface Option {
    id: string;
    name: string;
    description?: string;
    image: string;
}

interface GridSelectorProps {
    title: string;
    description: string;
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export const GridSelector = ({ title, description, options, selectedId, onSelect }: GridSelectorProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-black text-sm">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = selectedId === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => onSelect(option.id)}
                            className={clsx(
                                "group relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left hover:border-gray-300",
                                isSelected ? "border-black bg-gray-50 ring-1 ring-black/5" : "border-gray-100 bg-white"
                            )}
                        >
                            <div className="relative w-full aspect-[4/3] mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                {option.id === 'none' ? (
                                    <Ban className="w-16 h-16 text-gray-400 opacity-20" strokeWidth={1.5} />
                                ) : (
                                    <Image
                                        src={option.image}
                                        alt={option.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-sm">{option.name}</h3>
                                    {isSelected && (
                                        <div className="bg-black text-white rounded-full p-1">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                {option.description && (
                                    <p className="text-xs text-black line-clamp-2">
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
