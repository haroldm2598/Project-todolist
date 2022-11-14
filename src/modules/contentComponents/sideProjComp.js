import '../../styles/main.scss';
import { setAttributes } from '../helperComponents/setAttributes';
import { createElem } from '../helperComponents/setElement';
/*
	Still having an error try to understand the inboxIndex js flow work
*/
const getStoreProj = JSON.parse(localStorage.getItem('storeProj') || '[]');

const addProjList = (paramTarget) => {
	const objProject = [];

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

	const removeAddTask = (target) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(target);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	};

	btnConfirm.addEventListener('click', async () => {
		const selectValue = btnInput.value;
		const currentTask = getStoreProj;

		if (selectValue === null || selectValue === '') {
			alert('Input some text');
		} else {
			objProject.push({ projectTitle: selectValue, projectTask: [{}] });
			const lastArr = [objProject.slice(-1).pop()];

			localStorage.setItem(
				'storeProj',
				JSON.stringify(currentTask.concat(lastArr))
			);

			await removeAddTask('#projIdTask');
			await removeAddTask('#sbProjectList');

			paramTarget.appendChild(showAllItem(paramTarget));
			paramTarget.appendChild(addProject(paramTarget));

			// ERROR NODE PLEASE COPY THE INBOXINDEX THE WAY IT LOOP AND ITERATE THE OBJECT
			// lastArr.forEach((data) => {
			// 	return projListItem.appendChild(data.projectTitle);
			// });
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
		id: 'sbProjectList'
	});

	for (const data of getStoreProj) {
		getElement(data, projList);
	}

	paramTarget.appendChild(projList);

	return projList;
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

	return (
		paramTarget.appendChild(showAllItem(paramTarget)) &&
		paramTarget.appendChild(subHeadWrapper)
	);

	// STATIC RETURN VALUE FOR TESTING PURPOSE
	// return paramTarget.appendChild(addProjList(paramTarget));
};
