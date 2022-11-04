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

	const projList = document.createElement('ul');
	const projListItem = document.createElement('li');

	setAttributes(projWrapper, { class: 'projWrapper', id: 'projIdTask' });
	setAttributes(btnInput, { class: 'projWrapper__input', id: 'projValue' });
	setAttributes(btnConfirm, {
		class: 'projWrapper__confirm fas fa-plus-square'
	});
	setAttributes(btnCancel, {
		class: 'projWrapper__cancel fas fa-times-circle'
	});
	setAttributes(projList, {
		class: 'sideBarContainer__projectList'
	});
	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});

	btnConfirm.addEventListener('click', async () => {
		const selectValue = btnInput.value;

		if (selectValue === null || selectValue === '') {
			alert('Input some text');
		} else {
			objProject.push({ projectTitle: selectValue, projectTask: [{}] });
			const lastArr = [objProject.slice(-1).pop()];

			// ERROR NODE PLEASE COPY THE INBOXINDEX THE WAY IT LOOP AND ITERATE THE OBJECT
			lastArr.forEach((data) => {
				return projListItem.appendChild(data.projectTitle);
			});

			// REMOVE THE CURRENT MODAL
			// await removeAddTask('#projIdTask');
			// THEN REPLACE THE DEFAULT MODAL
			// ---- CODE HERE ----
			// ---------------------------------------------------

			// THEN ADD SHOWALL ITEM FOR THE LIST OF ARRAY
			// projListItem.appendChild(lastArr);
		}
	});

	projWrapper.appendChild(btnInput);
	projWrapper.appendChild(btnConfirm);
	projWrapper.appendChild(btnCancel);
	paramTarget.appendChild(projList);
	projList.appendChild(projListItem);

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

	// ORIGINAL RETURN VALUE
	// return paramTarget.appendChild(subHeadWrapper);

	// STATIC RETURN VALUE FOR TESTING PURPOSE
	return paramTarget.appendChild(addProjList(paramTarget));
};
