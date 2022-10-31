import '../../styles/main.scss';
import { setAttributes } from '../helperComponents/setAttributes';
import { createElem } from '../helperComponents/setElement';

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

	// const projList = document.createElement('ul');
	// const projListItem = document.createElement('li');

	// setAttributes(projList, {
	// 	class: 'sideBarContainer__projectList'
	// });

	// setAttributes(projListItem, {
	// 	class: 'sideBarContainer__projectList--item'
	// });

	// subHeadWrapper.appendChild(projList);
	// projList.appendChild(projListItem);

	setAttributes(btnInput, { class: 'projWrapper__input', id: 'projValue' });
	setAttributes(btnConfirm, {
		class: 'projWrapper__confirm fas fa-plus-square'
	});
	setAttributes(btnCancel, {
		class: 'projWrapper__cancel fas fa-times-circle'
	});

	// TESTING PURPOSES
	// const promptTest = prompt('Insert new Sidebar');
	// objProject.push({ test: promptTest });
	// const lastArr = [objProject.slice(-1).pop()];
	// console.log(objProject);
	// console.log(lastArr);
	projWrapper.appendChild(btnInput);
	projWrapper.appendChild(btnConfirm);
	projWrapper.appendChild(btnCancel);

	return paramTarget.appendChild(projWrapper);
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

	return paramTarget.appendChild(subHeadWrapper);
};
