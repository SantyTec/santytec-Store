'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  defaultMin?: number;
  defaultMax?: number;
}

export default function PriceRangeFilter({ 
  defaultMin = 0, 
  defaultMax = 0 
}: PriceRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  
  const [minValue, setMinValue] = useState(minPrice || '');
  const [maxValue, setMaxValue] = useState(maxPrice || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      const min = minValue.trim();
      const max = maxValue.trim();
      
      if (min && !isNaN(Number(min)) && Number(min) >= 0) {
        params.set('minPrice', min);
      } else {
        params.delete('minPrice');
      }
      
      if (max && !isNaN(Number(max)) && Number(max) >= 0) {
        params.set('maxPrice', max);
      } else {
        params.delete('maxPrice');
      }
      
      router.push(`?${params.toString()}`, { scroll: false });
    }, 800); // Debounce de 800ms para dar tiempo a escribir

    return () => clearTimeout(timer);
  }, [minValue, maxValue, router, searchParams]);

  return (
    <div className="mt-6 space-y-3">
      <Label className="text-sm font-medium">Rango de Precio</Label>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="minPrice" className="text-xs text-muted-foreground">
            Mínimo
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="minPrice"
              type="number"
              min="0"
              placeholder={defaultMin ? defaultMin.toString() : "0"}
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">
            Máximo
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="maxPrice"
              type="number"
              min="0"
              placeholder={defaultMax ? defaultMax.toString() : "Sin límite"}
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}