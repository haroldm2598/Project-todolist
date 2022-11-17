export const getProj = (task) => {
	const getStoreProj = JSON.parse(localStorage.getItem(task) || '[]');

	return getStoreProj;
};
