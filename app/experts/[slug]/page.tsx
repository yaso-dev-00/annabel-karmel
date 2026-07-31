import { ExpertProfileShell } from '@/components/ContentBlocks/expert-profile-shell';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  getPublishedExpertBySlug,
  getPublishedExperts,
} from '@/lib/admin/experts-store';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ExpertDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const experts = await getPublishedExperts();
  return experts.map((expert) => ({ slug: expert.slug }));
}

export default async function ExpertDetailPage({
  params,
}: ExpertDetailPageProps) {
  const { slug } = await params;
  const expert = await getPublishedExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <ExpertProfileShell expert={expert} />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
