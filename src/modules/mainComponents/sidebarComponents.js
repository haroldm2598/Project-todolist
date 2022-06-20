import '../../styles/main.scss';

export const sidebarComponents = () => {
	const arrItem = ['Inbox', 'Today', 'This Week'];
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');

	for (let i = 0; i < arrItem.length; i++) {
		const createList = document.createElement('li');

		createList.innerHTML = arrItem[i];

		listItem.appendChild(createList);
	}

	sidebarContainer.appendChild(listItem);

	return sidebarContainer;
};
