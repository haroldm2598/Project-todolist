import '../../styles/main.scss';

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

const addProject = (paramTarget) => {
	const subHeadWrapper = document.createElement('div');
	const titleSubHead = document.createElement('h1');
	const icon = document.createElement('i');
	const addBtn = document.createElement('button');

	setAttributes(titleSubHead, {
		class: 'sideBarContainer__subHeading'
	});
	setAttributes(subHeadWrapper, { class: 'sidebarContainer__Wrapper' });
	setAttributes(icon, {
		class: 'sideBarContainer__Wrapper--icon fas fa-plus-square'
	});
	setAttributes(addBtn, {
		class: 'sideBarContainer__Wrapper--btn'
	});

	titleSubHead.textContent = 'Project';
	addBtn.textContent = 'Add Project Test';

	subHeadWrapper.addEventListener('click', () => {
		console.log(`just clicked`);
	});

	subHeadWrapper.appendChild(icon);
	subHeadWrapper.appendChild(addBtn);

	return (
		paramTarget.appendChild(titleSubHead) &&
		paramTarget.appendChild(subHeadWrapper)
	);
};

export const sidebarComponents = () => {
	const sidebarContainer = document.createElement('div');
	const listItem = document.createElement('ul');

	setAttributes(sidebarContainer, {
		class: 'sideBarContainer'
	});
	setAttributes(listItem, {
		class: 'sideBarContainer__list',
		id: 'sideBarContainer'
	});

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
	sidebarContainer.appendChild(addProject(sidebarContainer));

	return sidebarContainer;
};
