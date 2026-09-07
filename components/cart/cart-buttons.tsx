'use client';

import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';

import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddToCartProductPage({
	item,
	onAddToCart,
}: {
	item: FullProduct;
	onAddToCart?: () => void;
}) {
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);
	const { addItem } = useCartStore((state) => state);

  const outOfStock = item.stock === 0;
  
  const showConfetti = () => {
    // Crear confetti particles
    const colors = ["#FB826A", "#CFCCFF", "#FCF403"]
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "confetti-particle"
      particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: 50%;
        top: 50%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: confetti-fall ${0.8 + Math.random() * 0.5}s ease-out forwards;
        transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg);
        opacity: 1;
      `
      document.body.appendChild(particle)

      setTimeout(() => particle.remove(), 1500)
    }
  }

	function onAdd(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();

		setIsAdding(true);

		addItem({
			...item,
			quantity,
			image: item.images[0]?.url || '',
			price: Number(item.price),
		});

    onAddToCart?.();
    showConfetti()
		setIsAdding(false);
	}

	const handleQuantityChange = (delta: number) => {
		setQuantity((prev) => Math.max(1, Math.min(item.stock, prev + delta)));
	};

	return (
		<>
			{!outOfStock && (
				<div className="space-y-2">
					<label
						htmlFor="quantity"
						className="text-sm font-medium text-muted-foreground"
					>
						Cantidad
					</label>
					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							size="icon"
							className="transition-transform bg-transparent border-2 rounded-full h-14 w-14 active:scale-90"
							onClick={() => handleQuantityChange(-1)}
							disabled={quantity <= 1}
						>
							<Minus className="w-5 h-5" />
						</Button>
						<div className="flex-1 text-center">
							<span className="text-3xl font-bold">{quantity}</span>
						</div>
						<Button
							variant="outline"
							size="icon"
							className="transition-transform bg-transparent border-2 rounded-full h-14 w-14 active:scale-90"
							onClick={() => handleQuantityChange(1)}
							disabled={quantity >= item.stock}
						>
							<Plus className="w-5 h-5" />
						</Button>
					</div>
				</div>
			)}

			<Button
				size="lg"
				className={cn(
					'w-full h-16 text-xl text-bg font-semibold rounded-2xl transition-all duration-300',
					'bg-gradient-to-r cursor-pointer from-accent to-primary bg-size-200 hover:bg-right',
					'hover:shadow-2xl hover:shadow-accent/50 hover:scale-105',
					'active:scale-95',
					outOfStock && 'opacity-50 cursor-not-allowed'
				)}
				onClick={onAdd}
				disabled={outOfStock || isAdding}
			>
				{isAdding ? (
					<>
						<div className="w-6 h-6 mr-3 border-4 border-white rounded-full border-t-transparent animate-spin" />
						Agregando...
					</>
				) : (
					<>
						<ShoppingCart
							className={cn(
								'h-6 w-6 mr-3 transition-transform',
								isAdding && 'animate-bounce'
							)}
						/>
						{outOfStock ? 'Sin Stock' : 'Agregar al Carrito'}
					</>
				)}
			</Button>
		</>
	);
}

export function AddToCart({
	item,
	showQuantityInput = false,
	className,
	text,
	onAddToCart,
}: {
	item: FullProduct;
	showQuantityInput?: boolean;
	className?: string;
	text?: string;
	onAddToCart?: () => void;
}) {
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCartStore((state) => state);

	const outOfStock = item.stock === 0;

	function onAdd(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();

		addItem({
			...item,
			quantity,
			image: item.images[0]?.url || '',
			price: Number(item.price),
		});

		onAddToCart?.();
	}

	function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
		setQuantity(event.target.valueAsNumber);
	}

	return (
		<div className="flex flex-col w-full gap-y-4">
			{showQuantityInput && (
				<div className="flex items-center justify-between">
					<label htmlFor="quantity" className="font-semibold">
						Cantidad
					</label>
					<Input
						className="block p-2.5 w-36 border-none text-txt-300 text-center rounded-md bg-primary-50/10"
						defaultValue={1}
						min={1}
						name="quantity"
						onChange={handleInput}
						type="number"
					/>
				</div>
			)}
			<Button
				onClick={onAdd}
				className={cn(
					'inline-flex text-xl text-black rounded-md bg-linear-to-br from-accent-300 to-accent-500 gap-x-3 hover:to-accent-300 hover:shadow-[0px_22px_43px_-25px] hover:shadow-accent-800',
					outOfStock && 'cursor-not-allowed bg-accent-700',
					className
				)}
			>
				<ShoppingCart className="size-6" />
				{text ?? 'Añadir al carrito'}
			</Button>
		</div>
	);
}

export function DeleteFromCart({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	const { removeItem } = useCartStore((state) => state);

	function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();

		removeItem(id);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 text-muted-foreground hover:bg-red-900 hover:text-destructive-foreground"
			onClick={onDelete}
		>
			<X className="size-4" />
		</Button>
	);
}

export function EmptyCart({ className }: { className?: string }) {
	const { removeAll, items } = useCartStore((state) => state);

	return items.length > 0 ? (
		<Button
			onClick={removeAll}
			variant="outline"
			className={cn(
				'inline-flex text-lg rounded-md gap-x-3 hover:bg-bg-300',
				className
			)}
			size="sm"
		>
			<Trash2 className="size-4" />
			Vaciar carrito
		</Button>
	) : null;
}

export function InputHandler({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	const { setItemQuantity, items } = useCartStore((state) => state);
	const currentQuantity = items.find((item) => item.id === id)?.quantity || 0;

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="bg-transparent rounded-full size-10"
				onClick={() => setItemQuantity(id, currentQuantity - 1)}
				disabled={currentQuantity <= 1}
			>
				<Minus className="size-4" />
			</Button>
			<div className="w-12 text-center">
				<span className="text-lg font-semibold duration-200 animate-in fade-in">
					{currentQuantity}
				</span>
			</div>
			<Button
				variant="outline"
				size="icon"
				className="bg-transparent rounded-full size-10"
				onClick={() => setItemQuantity(id, currentQuantity + 1)}
			>
				<Plus className="size-4" />
			</Button>
		</>
	);
}
