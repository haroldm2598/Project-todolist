import '../../styles/main.scss';
import { addProject } from '../contentComponents/sideProjComp';
import { setAttributes } from '../helperComponents/setAttributes';

const objItem = [
	{ icon: 'fa-inbox', title: 'Inbox', id: 'inboxId' },
	{ icon: 'fa-calendar-check', title: 'Today', id: 'todayId' },
	{ icon: 'fa-calendar-alt', title: 'This Week', id: 'weekId' }
];

export const sidebarComponents = () => {
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');
	const titleSubHead = document.createElement('h1');

	setAttributes(sidebarContainer, {
		class: 'sideBarContainer',
		id: 'sideBarContainer'
	});
	setAttributes(listItem, {
		class: 'sideBarContainer__list'
	});
	setAttributes(titleSubHead, {
		class: 'sideBarContainer__subHeader'
	});

	titleSubHead.textContent = 'Project';

	for (let i = 0; i < objItem.length; i++) {
		const createList = document.createElement('li');
		const createButton = document.createElement('button');

		createList.innerHTML = `<i class="fas ${objItem[i].icon}"></i>`;
		createButton.textContent = objItem[i].title;

		setAttributes(createList, {
			class: 'sideBarContainer__list--item'
		});

		setAttributes(createButton, { id: objItem[i].id });

		createList.appendChild(createButton);
		listItem.appendChild(createList);
	}

	sidebarContainer.appendChild(listItem);
	sidebarContainer.appendChild(titleSubHead);
	sidebarContainer.appendChild(addProject(sidebarContainer));

	return sidebarContainer;
};
