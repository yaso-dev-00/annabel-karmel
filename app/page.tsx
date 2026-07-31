import { HomePageContent } from '@/components/HomeScreen/HomePage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HomePageContent />
      <SiteFooter />
    </>
  );
}
