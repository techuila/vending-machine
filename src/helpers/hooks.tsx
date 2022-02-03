export const useClasses = <T extends {}>(classes: T, styles: any): any => {
	return Object.entries(classes).reduce((previousValue, currentValue) => {
		return { ...previousValue, [styles[currentValue[0]]]: currentValue[1] };
	}, {});
};
