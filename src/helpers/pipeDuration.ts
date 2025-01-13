export const pipeDuration = (duration: number): string => {
	const hours = Math.floor(duration / 60);
	const mins = duration % 60;
	return `${hours.toString().padStart(2, '0')}:${mins
		.toString()
		.padStart(2, '0')} hours`;
};
