
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, X } from 'lucide-react';

export const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleComingSoon = (product: string) => {
        setModalContent(product);
        setIsModalOpen(true);
    };

    return (
        <>
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="relative w-48 h-12">
                        <Image
                            src="/design_assets/logo/Brandmakers_Logo-01.png"
                            alt="Brand Makers"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-gray-600">
                        <a href="#" className="text-black transition-colors">Custom Hats</a>
                        <button onClick={() => handleComingSoon('Custom Polos')} className="hover:text-black transition-colors">
                            Custom Polos
                        </button>
                        <button onClick={() => handleComingSoon('Custom T-Shirts')} className="hover:text-black transition-colors">
                            Custom T-Shirts
                        </button>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Removed Cart and Get Quote as requested */}
                    </div>
                </div>
            </header>

            {/* Coming Soon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">{modalContent} Coming Soon!</h3>
                            <p className="text-gray-600 mb-6">
                                We are currently building out our {modalContent.toLowerCase()} builder.
                                In the meantime, please contact Tyler directly for orders.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-3">
                                <p className="font-bold text-lg">Tyler Nelson</p>
                                <p className="text-blue-600 font-medium">tyler@brandmakers.com</p>
                                <p className="text-gray-800 font-bold">435-215-6601</p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-6 w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
