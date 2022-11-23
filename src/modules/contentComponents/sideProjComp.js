import '../../styles/main.scss';
import { getProj } from '../data/getProj';
import { setAttributes } from '../helperComponents/setAttributes';
import { createElem } from '../helperComponents/setElement';

const removeAddTask = (target) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const targetNode = document.querySelector(target);
			const result = targetNode.parentNode.removeChild(targetNode);
			resolve(result);
		}, 500);
	});
};

const addProjList = (paramTarget, paramTarget2 = false) => {
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

	btnConfirm.addEventListener('click', async () => {
		const selectValue = btnInput.value;
		const currentTask = getProj('storeProj');

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
			paramTarget.appendChild(paramTarget2);
			// ERROR NODE PLEASE COPY THE INBOXINDEX THE WAY IT LOOP AND ITERATE THE OBJECT
			// lastArr.forEach((data) => {
			// 	return projListItem.appendChild(data.projectTitle);
			// });
		}
	});

	btnCancel.addEventListener('click', async () => {
		await removeAddTask('#projIdTask');
		paramTarget.appendChild(paramTarget2);
	});

	projWrapper.appendChild(btnInput);
	projWrapper.appendChild(btnConfirm);
	projWrapper.appendChild(btnCancel);

	return paramTarget.appendChild(projWrapper);
};

const getElement = (params1, paramTarget) => {
	const projListItem = document.createElement('li');
	const projListBtn = document.createElement('button');

	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});
	setAttributes(projListBtn, {
		class: 'sideBarContainer__projectList--item__btn'
	});

	projListBtn.textContent = params1.projectTitle;

	projListItem.addEventListener('mouseover', () => {
		const deleteIcon = document.createElement('i');
		setAttributes(deleteIcon, {
			class: ' fas fa-times',
			id: 'deleteIconId'
		});

		// EVENT FOR DELETING ARRAY DATA IN LOCALSTORAGE
		const delFuncEvt = async () => {
			const currentTask = getProj('storeProj');
			const newTask = currentTask.filter(
				(task) => task.projectTitle != params1.projectTitle
			);

			localStorage.setItem('storeProj', JSON.stringify(newTask));

			await removeAddTask('#sbProjectList');
			// paramsTarget.appendChild(showAllItem());
			// paramsTarget.appendChild(buttonWrapper);
		};

		deleteIcon.addEventListener('click', delFuncEvt());

		return projListItem.appendChild(deleteIcon);
	});

	projListItem.addEventListener('mouseout', (event) => {
		// CODE FOR FADEOUT OF DELETEICON
		const targetNode = document.querySelector('#deleteIconId');
		const result = targetNode.parentNode.removeChild(targetNode);

		// setAttributes(targetNode, {
		// 	class: 'sideBarContainer__projectList--item__icon fas fa-times',
		// 	id: 'deleteIconId'
		// });

		return result;
	});

	projListItem.appendChild(projListBtn);
	paramTarget.appendChild(projListItem);
};

const showAllItem = (paramTarget) => {
	const projList = document.createElement('ul');
	setAttributes(projList, {
		class: 'sideBarContainer__projectList',
		id: 'sbProjectList'
	});

	for (const data of getProj('storeProj')) {
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

		paramTarget.appendChild(addProjList(paramTarget, subHeadWrapper));
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
