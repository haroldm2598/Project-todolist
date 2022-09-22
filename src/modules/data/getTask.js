export const getStore = (task) => {
	const getStoreTask = JSON.parse(localStorage.getItem(task));

	return getStoreTask;
};
