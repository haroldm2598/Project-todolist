import '../../styles/main.scss';
import { inboxComponents } from '../contentComponents/inboxIndex';

const objItem = [
	{ icon: 'fa-inbox', title: 'Inbox' },
	{ icon: 'fa-calendar-check', title: 'Today' },
	{ icon: 'fa-calendar-alt', title: 'This Week' }
];

export const sidebarComponents = () => {
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');

	for (let i = 0; i < objItem.length; i++) {
		const createList = document.createElement('li');
		const createButton = document.createElement('button');

		createList.innerHTML = `<i class="fas ${objItem[i].icon}"></i>`;
		createButton.textContent = objItem[i].title;

		createList.classList.add('sideBarContainer__list--item');

		createButton.addEventListener('click', () => {
			inboxComponents();
			console.log('clicked');
			console.log(inboxComponents);
		});

		createList.appendChild(createButton);
		listItem.appendChild(createList);
	}

	sidebarContainer.classList.add('sideBarContainer');
	listItem.classList.add('sideBarContainer__list');
	sidebarContainer.appendChild(listItem);

	return sidebarContainer;
};
