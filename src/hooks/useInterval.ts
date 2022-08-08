import { useEffect, useRef } from "react"

interface Props {
	callback: () => void;
	delay: number | null;
}

export const useInterval = (callback: Props['callback'], delay: Props['delay']) => {
	const savedCallback = useRef<null | (() => void)>(null);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const tick = (): void => {
			if (savedCallback.current) {
				savedCallback.current();
			};
		};
		if (delay !== null) {
			const interval = setInterval(tick, delay);
			return () => clearInterval(interval);
		}
	}, [delay]);
}