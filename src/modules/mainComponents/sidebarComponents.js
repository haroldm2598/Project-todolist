import '../../styles/main.scss';

const objItem = [
	{ icon: 'fa-inbox', title: 'Inbox' },
	{ icon: 'fa-calendar-check', title: 'Today' },
	{ icon: 'fa-calendar-alt', title: 'This Week' }
];

const arrItem = ['Inbox', 'Today', 'This Week'];

export const sidebarComponents = () => {
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');

	for (let i = 0; i < objItem.length; i++) {
		const createList = document.createElement('li');

		createList.innerHTML = `
			<i class="fas ${objItem[i].icon}"></i><a class='sideBarContainer__list--item__link' href='#'> ${objItem[i].title}</a>
		`;
		createList.classList.add('sideBarContainer__list--item');

		listItem.appendChild(createList);
	}

	sidebarContainer.classList.add('sideBarContainer');
	listItem.classList.add('sideBarContainer__list');
	sidebarContainer.appendChild(listItem);

	return sidebarContainer;
};
