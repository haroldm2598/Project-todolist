import '../../styles/main.scss';
// import { inboxComponents } from '../contentComponents/inboxIndex';

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
			class: 'sideBarContainer__list--item',
			id: objItem[i].id
		});
		// createButton.addEventListener('click', () => {
		// 	inboxComponents();
		// 	console.log('clicked');
		// 	console.log(inboxComponents);
		// });

		createList.appendChild(createButton);
		listItem.appendChild(createList);
	}

	sidebarContainer.classList.add('sideBarContainer');
	listItem.classList.add('sideBarContainer__list');
	sidebarContainer.appendChild(listItem);

	return sidebarContainer;
};
