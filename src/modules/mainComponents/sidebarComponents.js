import '../../styles/main.scss';
import { inboxComponents } from '../contentComponents/inboxIndex';

const setAttributes = (elem, attr) => {
	for (const key in attr) {
		elem.setAttribute(key, attr[key]);
	}
};

const objItem = [
	{ icon: 'fa-inbox', title: 'Inbox', id: 'inboxId' },
	{ icon: 'fa-calendar-check', title: 'Today', id: 'todayId' },
	{ icon: 'fa-calendar-alt', title: 'This Week', id: 'weekId' }
];

export const sidebarComponents = () => {
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');

	for (let i = 0; i < objItem.length; i++) {
		const createList = document.createElement('li');
		const createButton = document.createElement('button');

		createList.innerHTML = `<i class="fas ${objItem[i].icon}"></i>`;
		createButton.textContent = objItem[i].title;

		setAttributes(createList, {
			class: 'sideBarContainer__list--item'
		});

		setAttributes(createButton, { id: objItem[i].id });

		// createButton.addEventListener('click', () => {
		// 	document.body.append(inboxComponents());
		// 	console.log('clicked');
		// });

		createList.appendChild(createButton);
		listItem.appendChild(createList);
	}

	setAttributes(sidebarContainer, {
		class: 'sideBarContainer'
	});
	setAttributes(listItem, {
		class: 'sideBarContainer__list',
		id: 'sideBarContainer'
	});
	sidebarContainer.appendChild(listItem);

	return sidebarContainer;
};
