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

const objProject = [];

const addProject = (paramTarget) => {
	const subHeadWrapper = document.createElement('div');
	const titleSubHead = document.createElement('h1');
	const icon = document.createElement('i');
	const addBtn = document.createElement('button');
	const projList = document.createElement('ul');
	const projListItem = document.createElement('li');

	setAttributes(titleSubHead, {
		class: 'sideBarContainer__subHeading'
	});
	setAttributes(subHeadWrapper, { class: 'sideBarContainer__Wrapper' });
	setAttributes(icon, {
		class: 'sideBarContainer__Wrapper--icon fas fa-plus-square'
	});
	setAttributes(addBtn, {
		class: 'sideBarContainer__Wrapper--btn'
	});
	setAttributes(projList, {
		class: 'sideBarContainer__projectList'
	});
	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});

	titleSubHead.textContent = 'Project';
	addBtn.textContent = 'Add Project';

	subHeadWrapper.addEventListener('click', () => {
		objProject.push({ test: 'testing only !' });
		projListItem.textContent = objProject[0].test;
		console.log(objProject[0].test);
	});

	subHeadWrapper.appendChild(projList);
	subHeadWrapper.appendChild(icon);
	subHeadWrapper.appendChild(addBtn);
	projList.appendChild(projListItem);

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
