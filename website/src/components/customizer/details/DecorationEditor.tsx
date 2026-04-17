
'use client';

import React, { useState } from 'react';
import { HAT_OPTIONS } from '@/config/hat-options';
import { useCustomizerStore } from '@/store/customizer-store';
import clsx from 'clsx';
import { Plus, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';

export const DecorationEditor = () => {
    const { decorations, addDecoration, removeDecoration } = useCustomizerStore();
    const [activeTab, setActiveTab] = useState<'type' | 'upload'>('type');
    const [selectedType, setSelectedType] = useState(HAT_OPTIONS.decorationTypes[0].id);

    // Simplified handler for demo
    const handleAddStub = () => {
        addDecoration({
            id: Math.random().toString(36).substr(2, 9),
            typeId: selectedType,
            location: 'front', // Default
            file: '/design_assets/brand-makers-logo-placeholder.png' // Placeholder until proper upload
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Add Decoration</h2>
                <p className="text-gray-500 text-sm">
                    Choose a decoration technique and upload your artwork.
                </p>
            </div>

            {/* Active Decorations List */}
            {decorations.length > 0 && (
                <div className="mb-6 space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Applied Decorations</h3>
                    {decorations.map((deco) => {
                        const type = HAT_OPTIONS.decorationTypes.find(t => t.id === deco.typeId);
                        return (
                            <div key={deco.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden relative">
                                        {/* Preview thumbnail */}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{type?.name || 'Unknown Type'}</p>
                                        <p className="text-xs text-gray-500 capitalize">{deco.location}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeDecoration(deco.id)}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Editor Controls */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Technique</label>
                <div className="grid grid-cols-2 gap-3">
                    {HAT_OPTIONS.decorationTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={clsx(
                                "flex flex-col text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all",
                                selectedType === type.id ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500" : "bg-white"
                            )}
                        >
                            <span className="font-bold text-sm block">{type.name}</span>
                            <span className="text-[10px] text-gray-500">{type.description}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleAddStub}
                    className="w-full py-3 bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add Decoration
                </button>
            </div>
        </div>
    );
};
