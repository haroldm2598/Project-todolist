import '../../styles/main.scss';
import { setAttributes } from '../helperComponents/setAttributes';
import { createElem } from '../helperComponents/setElement';
/*
	HOW CAN I USE LIKE localStorage setItem in Vanilla JS
	and use the showAllItem for append the UI Projects
*/

const objProject = [];
const removeAddTask = (target) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const targetNode = document.querySelector(target);
			const result = targetNode.parentNode.removeChild(targetNode);
			resolve(result);
		}, 500);
	});
};

const addProjList = (paramTarget) => {
	const projWrapper = createElem('div');
	const btnInput = createElem('input');
	const btnConfirm = createElem('button');
	const btnCancel = createElem('button');

	setAttributes(projWrapper, { class: 'projWrapper', id: 'projIdTask' });
	setAttributes(btnInput, { class: 'projWrapper__input', id: 'projValue' });
	setAttributes(btnConfirm, {
		class: 'projWrapper__confirm fas fa-plus-square'
	});
	setAttributes(btnCancel, {
		class: 'projWrapper__cancel fas fa-times-circle'
	});

	btnConfirm.addEventListener('click', async () => {
		const selectValue = btnInput.value;
		const getStoreProj = JSON.parse(localStorage.getItem('storeProj') || '[]');

		if (selectValue === null || selectValue === '') {
			alert('Input some text');
		} else {
			objProject.push({ projectTitle: selectValue, projectTask: [{}] });
			const lastArr = [objProject.slice(-1).pop()];

			localStorage.setItem(
				'storeProj',
				JSON.stringify(getStoreProj.concat(lastArr))
			);

			// ERROR NODE PLEASE COPY THE INBOXINDEX THE WAY IT LOOP AND ITERATE THE OBJECT
			// lastArr.forEach((data) => {
			// 	return projListItem.appendChild(data.projectTitle);
			// });

			// REMOVE THE CURRENT MODAL
			await removeAddTask('#projIdTask');
			await removeAddTask('#sideBarContainer__projectList');

			paramTarget.appendChild(showAllItem(paramTarget));
			// paramTarget.appendChild(addProjList(paramTarget));
		}
	});

	projWrapper.appendChild(btnInput);
	projWrapper.appendChild(btnConfirm);
	projWrapper.appendChild(btnCancel);

	return paramTarget.appendChild(projWrapper);
};

const getElement = (params1, paramTarget) => {
	const projListItem = document.createElement('li');

	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});

	projListItem.textContent = params1.projectTitle;

	paramTarget.appendChild(projListItem);
};

const showAllItem = (paramTarget) => {
	const projList = document.createElement('ul');
	setAttributes(projList, {
		class: 'sideBarContainer__projectList',
		id: '#sideBarContainer__projectList'
	});

	for (const data of objProject) {
		getElement(data, projList);
	}

	paramTarget.appendChild(projList);
};

export const addProject = (paramTarget) => {
	const subHeadWrapper = document.createElement('div');
	const icon = document.createElement('i');
	const addBtn = document.createElement('button');

	setAttributes(subHeadWrapper, {
		class: 'sideBarContainer__wrapper',
		id: 'projectAddBtn'
	});
	setAttributes(icon, {
		class: 'sideBarContainer__wrapper--icon fas fa-plus-square'
	});
	setAttributes(addBtn, {
		class: 'sideBarContainer__wrapper--btn'
	});

	addBtn.textContent = 'Add Project';

	subHeadWrapper.addEventListener('click', () => {
		const targetElement = document.querySelector('#projectAddBtn');

		paramTarget.appendChild(addProjList(paramTarget));
		targetElement.parentElement.removeChild(targetElement);
	});

	subHeadWrapper.appendChild(icon);
	subHeadWrapper.appendChild(addBtn);

	// ORIGINAL RETURN VALUE
	// return paramTarget.appendChild(subHeadWrapper);

	// STATIC RETURN VALUE FOR TESTING PURPOSE
	return paramTarget.appendChild(addProjList(paramTarget));
};
