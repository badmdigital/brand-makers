
import React from 'react';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                    {/* Logo Section */}
                    <div className="space-y-4">
                        <div className="relative w-40 h-10">
                            <Image
                                src="/design_assets/logo/Brandmakers_Logo-01.png"
                                alt="Brand Makers"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Premium custom headwear and apparel for brands that demand quality.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col md:items-end gap-2 text-sm text-gray-600">
                        <h4 className="font-bold text-black uppercase tracking-wider mb-2">Contact</h4>
                        <p className="font-medium">Tyler Nelson</p>
                        <a href="mailto:tyler@brandmakers.com" className="hover:text-blue-600 transition-colors">
                            tyler@brandmakers.com
                        </a>
                        <a href="tel:4352156601" className="hover:text-black transition-colors font-mono">
                            435-215-6601
                        </a>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Brand Makers. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
