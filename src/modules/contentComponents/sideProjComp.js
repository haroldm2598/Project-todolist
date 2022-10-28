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

const addProjList = async (paramTarget) => {
	const projWrapper = createElem('div');
	const btnInput = createElem('input');
	const btnConfirm = createElem('button');
	const btnCancel = createElem('button');

	setAttributes(btnInput, { class: 'projWrapper__input', id: 'addProjID' });
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
	const titleSubHead = document.createElement('h1');
	const icon = document.createElement('i');
	const addBtn = document.createElement('button');
	// const projList = document.createElement('ul');
	const projListItem = document.createElement('li');

	setAttributes(titleSubHead, {
		class: 'sideBarContainer__subHeading'
	});
	setAttributes(subHeadWrapper, {
		class: 'sideBarContainer__Wrapper',
		id: 'projectAddBtn'
	});
	setAttributes(icon, {
		class: 'sideBarContainer__Wrapper--icon fas fa-plus-square'
	});
	setAttributes(addBtn, {
		class: 'sideBarContainer__Wrapper--btn'
	});
	// setAttributes(projList, {
	// 	class: 'sideBarContainer__projectList'
	// });
	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});

	titleSubHead.textContent = 'Project';
	addBtn.textContent = 'Add Project';

	subHeadWrapper.addEventListener('click', () => {
		const targetElement = document.querySelector('#projectAddBtn');

		subHeadWrapper.appendChild(addProjList(subHeadWrapper));
		targetElement.parentElement.removeChild(targetElement);
	});

	// subHeadWrapper.appendChild(projList);
	subHeadWrapper.appendChild(icon);
	subHeadWrapper.appendChild(addBtn);
	// projList.appendChild(projListItem);

	return (
		paramTarget.appendChild(titleSubHead) &&
		paramTarget.appendChild(subHeadWrapper)
	);
};
