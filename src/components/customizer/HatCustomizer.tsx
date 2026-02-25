
'use client';

import React from 'react';
import { useCustomizerStore } from '@/store/customizer-store';
import { GridSelector } from './details/GridSelector';
import { HAT_OPTIONS } from '@/config/hat-options';
import { ArrowLeft, ArrowRight, Upload, X, CalendarDays } from 'lucide-react';

export const HatCustomizer = () => {
    const store = useCustomizerStore();
    const { currentStep, steps, nextStep, prevStep } = store;

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        orderNumber: '',
        deadline: '',
        notes: '',
        rushOrder: false,
    });

    const [frontDecoFile, setFrontDecoFile] = React.useState<File | null>(null);
    const [secondDecoFile, setSecondDecoFile] = React.useState<File | null>(null);
    const frontDecoInputRef = React.useRef<HTMLInputElement>(null);
    const secondDecoInputRef = React.useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const payload = new FormData();
            // Contact info
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('phone', formData.phone);
            payload.append('company', formData.company);
            payload.append('quantity', formData.quantity);
            payload.append('orderNumber', formData.orderNumber);
            payload.append('deadline', formData.deadline);
            payload.append('notes', formData.notes);
            payload.append('rushOrder', String(formData.rushOrder));
            // Hat config
            payload.append('panel', JSON.stringify(store.selectedPanel));
            payload.append('structure', JSON.stringify(store.selectedStructure));
            payload.append('fabric', JSON.stringify(store.selectedFabric));
            payload.append('bill', JSON.stringify(store.selectedBill));
            payload.append('closure', JSON.stringify(store.selectedClosure));
            payload.append('frontDecoLocation', JSON.stringify(store.frontDecoLocation));
            payload.append('frontDecoType', JSON.stringify(store.frontDecoType));
            payload.append('secondDecoLocation', JSON.stringify(store.secondDecoLocation));
            payload.append('secondDecoType', store.secondDecoLocation.id === 'none' ? 'null' : JSON.stringify(store.secondDecoType));
            // File uploads
            if (frontDecoFile) payload.append('frontDecoFile', frontDecoFile);
            if (secondDecoFile) payload.append('secondDecoFile', secondDecoFile);

            const response = await fetch('/api/submit-customization', {
                method: 'POST',
                body: payload,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }

            setSubmitStatus('success');
            // Optional: Clear form or redirect
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
            alert('Failed to submit. Please check your details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };



    const renderStepContent = () => {
        switch (currentStep) {
            // ... (cases 0-8 unchanged)
            case 0: // Panel Style
                return (
                    <GridSelector
                        title="Panel Style"
                        description="Choose the panel style for your hat."
                        options={HAT_OPTIONS.panelStyles}
                        selectedId={store.selectedPanel.id}
                        onSelect={store.setPanel}
                    />
                );
            case 1: // Structure
                return (
                    <GridSelector
                        title="Structure"
                        description="Select the structure of your hat."
                        options={HAT_OPTIONS.structures}
                        selectedId={store.selectedStructure.id}
                        onSelect={store.setStructure}
                    />
                );
            case 2: // Fabric
                return (
                    <GridSelector
                        title="Fabric"
                        description="Choose the fabric material."
                        options={HAT_OPTIONS.fabrics}
                        selectedId={store.selectedFabric.id}
                        onSelect={store.setFabric}
                    />
                );
            case 3: // Bill Style
                return (
                    <GridSelector
                        title="Bill Style"
                        description="Select the style of the bill."
                        options={HAT_OPTIONS.billStyles}
                        selectedId={store.selectedBill.id}
                        onSelect={store.setBill}
                    />
                );
            case 4: // Closure
                return (
                    <GridSelector
                        title="Closure"
                        description="Choose the closure type."
                        options={HAT_OPTIONS.closureStyles}
                        selectedId={store.selectedClosure.id}
                        onSelect={store.setClosure}
                    />
                );
            case 5: // Front Deco Location
                return (
                    <GridSelector
                        title="Front Decoration Location"
                        description="Where would you like your front decoration?"
                        options={HAT_OPTIONS.frontDecoLocations}
                        selectedId={store.frontDecoLocation.id}
                        onSelect={store.setFrontDecoLocation}
                    />
                );
            case 6: // Front Deco Style
                return (
                    <GridSelector
                        title="Front Decoration Style"
                        description="Choose the style format for the front decoration."
                        options={HAT_OPTIONS.decorationTypes}
                        selectedId={store.frontDecoType.id}
                        onSelect={store.setFrontDecoType}
                    />
                );
            case 7: // 2nd Deco Location
                return (
                    <GridSelector
                        title="Second Decoration Location"
                        description="Where would you like your second decoration?"
                        options={HAT_OPTIONS.secondDecoLocations}
                        selectedId={store.secondDecoLocation.id}
                        onSelect={store.setSecondDecoLocation}
                    />
                );
            case 8: // 2nd Deco Style
                return (
                    <GridSelector
                        title="Second Decoration Style"
                        description="Choose the style format for the second decoration."
                        options={HAT_OPTIONS.decorationTypes}
                        selectedId={store.secondDecoType.id}
                        onSelect={store.setSecondDecoType}
                    />
                );
            case 9: // Review
                return (
                    <div className="text-center py-12 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8">Review Your Design</h2>

                        <div className="flex flex-col gap-8 text-left">
                            {/* Design Summary */}
                            <div className="bg-gray-100 p-6 rounded-lg h-fit">
                                <h3 className="font-bold mb-4 text-lg">Configuration</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Panel:</strong> {store.selectedPanel.name}</p>
                                    <p><strong>Structure:</strong> {store.selectedStructure.name}</p>
                                    <p><strong>Fabric:</strong> {store.selectedFabric.name}</p>
                                    <p><strong>Bill:</strong> {store.selectedBill.name}</p>
                                    <p><strong>Closure:</strong> {store.selectedClosure.name}</p>
                                    <hr className="border-gray-300 my-2" />
                                    <p><strong>Front Decoration:</strong> {store.frontDecoLocation.name} - {store.frontDecoType.name}</p>
                                    <p><strong>2nd Decoration:</strong> {store.secondDecoLocation.id === 'none' ? 'None' : `${store.secondDecoLocation.name} - ${store.secondDecoType.name}`}</p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="font-bold mb-4 text-lg">Contact Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Order # (Optional)</label>
                                            <input
                                                type="text"
                                                name="orderNumber"
                                                value={formData.orderNumber}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="Old Order #"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Est. Quantity *</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="e.g. 50"
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    {/* Deadline */}
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Deadline</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        />
                                    </div>

                                    {/* Rush Order */}
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="rushOrder"
                                                checked={formData.rushOrder}
                                                onChange={handleCheckboxChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00BFFF]" />
                                        </label>
                                        <span className="text-sm font-semibold text-gray-700">🚀 Rush Order</span>
                                    </div>

                                    {/* Front Deco File Upload */}
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Front Decoration Artwork</label>
                                        {frontDecoFile ? (
                                            <div className="flex items-center justify-between border border-[#00BFFF] bg-sky-50 rounded-md p-2 text-sm">
                                                <span className="truncate text-gray-700">{frontDecoFile.name}</span>
                                                <button type="button" onClick={() => { setFrontDecoFile(null); if (frontDecoInputRef.current) frontDecoInputRef.current.value = ''; }} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => frontDecoInputRef.current?.click()}
                                                className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-sm text-gray-400 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Upload className="w-4 h-4" /> Upload file (PNG, JPG, AI, PDF)
                                            </button>
                                        )}
                                        <input
                                            ref={frontDecoInputRef}
                                            type="file"
                                            accept=".png,.jpg,.jpeg,.svg,.ai,.pdf,.eps"
                                            className="hidden"
                                            onChange={(e) => setFrontDecoFile(e.target.files?.[0] || null)}
                                        />
                                    </div>

                                    {/* 2nd Deco File Upload */}
                                    {store.secondDecoLocation.id !== 'none' && (
                                        <div>
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">2nd Decoration Artwork</label>
                                            {secondDecoFile ? (
                                                <div className="flex items-center justify-between border border-[#00BFFF] bg-sky-50 rounded-md p-2 text-sm">
                                                    <span className="truncate text-gray-700">{secondDecoFile.name}</span>
                                                    <button type="button" onClick={() => { setSecondDecoFile(null); if (secondDecoInputRef.current) secondDecoInputRef.current.value = ''; }} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => secondDecoInputRef.current?.click()}
                                                    className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-sm text-gray-400 hover:border-[#00BFFF] hover:text-[#00BFFF] transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Upload className="w-4 h-4" /> Upload file (PNG, JPG, AI, PDF)
                                                </button>
                                            )}
                                            <input
                                                ref={secondDecoInputRef}
                                                type="file"
                                                accept=".png,.jpg,.jpeg,.svg,.ai,.pdf,.eps"
                                                className="hidden"
                                                onChange={(e) => setSecondDecoFile(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    )}

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Notes</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
                                            placeholder="Any special instructions, color callouts, thread preferences, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {submitStatus === 'success' ? (
                            <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold text-green-800 mb-2">Quote Request Sent!</h3>
                                <p className="text-green-700">
                                    Thank you for your submission. One of our brand experts will be in touch shortly to finalize your design.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 text-sm text-green-800 hover:text-green-900 underline"
                                >
                                    Start a New Design
                                </button>
                            </div>
                        ) : (
                            <div className="mt-8">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-[#00BFFF] text-white px-12 py-4 rounded-full font-bold shadow-lg hover:bg-[#00ace6] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                                >
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Submit Customizations</>
                                    )}
                                </button>
                                {submitStatus === 'error' && (
                                    <p className="text-red-500 text-sm mt-2">There was an error sending your request. Please try again.</p>
                                )}
                            </div>
                        )}
                        <div className="mt-8">
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };


    const handleNext = () => {
        if (currentStep === 7 && store.secondDecoLocation.id === 'none') {
            // If on "2nd Deco Location" (index 7) and selected "None", skip "2nd Deco Style" (index 8) and go to "Review" (index 9)
            store.setStep(9);
        } else {
            nextStep();
        }
    };

    const handleBack = () => {
        if (currentStep === 9 && store.secondDecoLocation.id === 'none') {
            // If on "Review" (index 9) and "None" was selected, skip back to "2nd Deco Location" (index 7)
            store.setStep(7);
        } else {
            prevStep();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                {renderStepContent()}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className={`flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${currentStep === steps.length - 1 ? 'hidden' : ''}`}
                >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
