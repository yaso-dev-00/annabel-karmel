import { FrozenProductPageContent } from '@/components/ProductScreen/detail/FrozenProductPage';
import { mightyBologneseMacAndCheesePageData } from '@/data/mighty-bolognese-mac-and-cheese-page';

export function MightyBologneseMacAndCheesePageContent() {
  return (
    <FrozenProductPageContent data={mightyBologneseMacAndCheesePageData} />
  );
}
