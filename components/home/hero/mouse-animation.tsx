'use client';

import { useEffect, useRef } from 'react';

export default function MouseAnimation() {
	const trailerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleMouseMove(e: any) {
			if (trailerRef.current) {
				const x = e.clientX - trailerRef.current.offsetWidth / 2,
					y = e.clientY - trailerRef.current.offsetHeight / 2;

				const keyframes = {
					transform: `translate(${x}px, ${y}px)`,
				};

				trailerRef.current.animate(keyframes, {
					duration: 800,
					fill: 'forwards',
				});
			}
		}
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);
	return (
		<div
			id="trailer"
			ref={trailerRef}
			className="fixed top-0 left-0 z-50 transition-opacity ease-linear rounded-full backdrop-filter blur-lg opacity-0 pointer-events-none group-hover:opacity-100 size-12 bg-gradient-to-tr from-bg-50 to-primary-300"
		></div>
	);
}
