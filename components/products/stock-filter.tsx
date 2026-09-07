'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function StockFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const onlyInStock = searchParams.get('inStock') === 'true';

  const handleStockChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (checked) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-6 flex items-center space-x-2">
      <Checkbox
        id="stock"
        checked={onlyInStock}
        onCheckedChange={handleStockChange}
      />
      <Label htmlFor="stock" className="text-sm cursor-pointer">
        Solo en Stock
      </Label>
    </div>
  );
}