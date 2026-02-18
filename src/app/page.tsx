
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CustomizerLayout } from '@/components/customizer/CustomizerLayout';
import { HatCustomizer } from '@/components/customizer/HatCustomizer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <CustomizerLayout>
        <HatCustomizer />
      </CustomizerLayout>

      <Footer />
    </div>
  );
}
