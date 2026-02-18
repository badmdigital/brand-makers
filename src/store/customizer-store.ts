
import { create } from 'zustand';
import { HAT_OPTIONS, HatOption } from '@/config/hat-options';

interface CustomizerState {
    // Selections
    selectedPanel: HatOption;
    selectedStructure: HatOption;
    selectedFabric: HatOption;
    selectedBill: HatOption;
    selectedClosure: HatOption;

    frontDecoLocation: HatOption;
    frontDecoType: HatOption;

    secondDecoLocation: HatOption;
    secondDecoType: HatOption;

    // Navigation
    currentStep: number;
    steps: string[];

    // Actions
    setPanel: (id: string) => void;
    setStructure: (id: string) => void;
    setFabric: (id: string) => void;
    setBill: (id: string) => void;
    setClosure: (id: string) => void;

    setFrontDecoLocation: (id: string) => void;
    setFrontDecoType: (id: string) => void; // "Front Deco Style"

    setSecondDecoLocation: (id: string) => void;
    setSecondDecoType: (id: string) => void; // "2nd Style"

    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useCustomizerStore = create<CustomizerState>((set) => ({
    // Defaults
    selectedPanel: HAT_OPTIONS.panelStyles[0],
    selectedStructure: HAT_OPTIONS.structures[0],
    selectedFabric: HAT_OPTIONS.fabrics[0],
    selectedBill: HAT_OPTIONS.billStyles[0],
    selectedClosure: HAT_OPTIONS.closureStyles[0],

    frontDecoLocation: HAT_OPTIONS.frontDecoLocations[0], // Center
    frontDecoType: HAT_OPTIONS.decorationTypes[0],

    secondDecoLocation: HAT_OPTIONS.secondDecoLocations[0], // None
    secondDecoType: HAT_OPTIONS.decorationTypes[0],

    currentStep: 0,
    steps: [
        'Panel Style',
        'Structure',
        'Fabric',
        'Bill Style',
        'Closure',
        'Front Deco',
        'Front Style',
        '2nd Deco',
        '2nd Style',
        'Review'
    ],

    // Actions
    setPanel: (id) => set((state) => ({ selectedPanel: HAT_OPTIONS.panelStyles.find(s => s.id === id) || state.selectedPanel })),
    setStructure: (id) => set((state) => ({ selectedStructure: HAT_OPTIONS.structures.find(s => s.id === id) || state.selectedStructure })),
    setFabric: (id) => set((state) => ({ selectedFabric: HAT_OPTIONS.fabrics.find(s => s.id === id) || state.selectedFabric })),
    setBill: (id) => set((state) => ({ selectedBill: HAT_OPTIONS.billStyles.find(s => s.id === id) || state.selectedBill })),
    setClosure: (id) => set((state) => ({ selectedClosure: HAT_OPTIONS.closureStyles.find(s => s.id === id) || state.selectedClosure })),

    setFrontDecoLocation: (id) => set((state) => ({ frontDecoLocation: HAT_OPTIONS.frontDecoLocations.find(s => s.id === id) || state.frontDecoLocation })),
    setFrontDecoType: (id) => set((state) => ({ frontDecoType: HAT_OPTIONS.decorationTypes.find(s => s.id === id) || state.frontDecoType })),

    setSecondDecoLocation: (id) => set((state) => ({ secondDecoLocation: HAT_OPTIONS.secondDecoLocations.find(s => s.id === id) || state.secondDecoLocation })),
    setSecondDecoType: (id) => set((state) => ({ secondDecoType: HAT_OPTIONS.decorationTypes.find(s => s.id === id) || state.secondDecoType })),

    setStep: (step) => set({ currentStep: step }),

    nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.steps.length - 1)
    })),

    prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0)
    }))
}));
