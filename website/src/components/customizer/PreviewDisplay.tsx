
'use client';

import React from 'react';
import Image from 'next/image';
import { useCustomizerStore } from '@/store/customizer-store';
import { Ban } from 'lucide-react';

export const PreviewDisplay = () => {
    const store = useCustomizerStore();
    const { currentStep } = store;

    // Determine which image to show based on the active step
    const getDisplayImage = () => {
        switch (currentStep) {
            case 0: // Panel
                return store.selectedPanel.image;
            case 1: // Structure
                return store.selectedStructure.image;
            case 2: // Fabric
                return store.selectedFabric.image;
            case 3: // Bill
                return store.selectedBill.image;
            case 4: // Closure
                return store.selectedClosure.image;
            case 5: // Front Deco Location
                return store.frontDecoLocation.image; // Should match "Headwear_Deco Locations.png"
            case 6: // Front Deco Style
                return store.frontDecoType.image;
            case 7: // 2nd Deco Location
                return store.secondDecoLocation.image; // Should match "Headwear_Deco Locations.png"
            case 8: // 2nd Deco Style
                return store.secondDecoType.image;
            default:
                return store.selectedStructure.image;
        }
    };

    const displayImage = getDisplayImage();

    return (
        <div className="w-full h-full min-h-[300px] lg:min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center p-8 relative overflow-hidden group">
            {/* Background */}
            <div className="absolute inset-0 bg-neutral-100 opacity-50 pointer-events-none" />

            {/* Main Image Area */}
            <div className="relative w-full max-w-lg aspect-square transition-transform duration-500 hover:scale-105 flex items-center justify-center">
                {displayImage ? (
                    // specific check for "none" image path if it exists, or handle if displayImage is valid
                    // But here we want to handle the specific case where we want to show the Ban icon
                    // faster to just check the store state or if displayImage is a specific value?
                    // Let's rely on the store state for precision.
                    (currentStep === 7 && store.secondDecoLocation.id === 'none') ? (
                        <Ban className="w-32 h-32 text-gray-300" strokeWidth={1} />
                    ) : (
                        <Image
                            key={displayImage}
                            src={displayImage}
                            alt="Preview"
                            fill
                            className="object-contain drop-shadow-xl"
                            priority
                        />
                    )
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-400">No Image Available</span>
                    </div>
                )}
            </div>

            {/* HUD / Step Indicator */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 shadow-sm border border-gray-200">
                Step {currentStep + 1}: {store.steps[currentStep]}
            </div>
        </div>
    );
};
