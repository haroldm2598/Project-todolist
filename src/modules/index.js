import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';
import { constructorComponent } from './contentComponents/constructorComp';
import { setAttributes } from './helperComponents/setAttributes';
// testOnly
function menuBarComponents() {
	const menuWrapper = document.createElement('div');
	const menuBar = document.createElement('i');

	setAttributes(menuWrapper, {
		class: 'menuBarWrapper',
		id: 'menuBarWrapper'
	});
	setAttributes(menuBar, {
		class: 'fas fa-bars'
	});

	menuBar.addEventListener('click', () => {
		const selectElem = document.querySelector('#sideBarContainer');
		selectElem.classList.toggle('menuBarShow');
	});

	menuWrapper.appendChild(menuBar);

	return menuWrapper;
}

export function mainComponents() {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	divWrapper.appendChild(inboxComponents());

	// ------------- ROUTERS ------------------

	document.addEventListener('DOMContentLoaded', (event) => {
		const body = document.getElementById('sideBarContainer');
		const targetSideProject = document.getElementsByClassName(
			'sideBarContainer__projectList--item__btn'
		);

		body.addEventListener('click', async (e) => {
			let params = e.target.id;

			switch (params) {
				case 'inboxId':
					await removeAddElement('.contentContainer');
					divWrapper.appendChild(inboxComponents());
					break;

				case 'todayId':
					await removeAddElement('.contentContainer');
					divWrapper.appendChild(todayComponents());
					break;

				case 'weekId':
					await removeAddElement('.contentContainer');
					divWrapper.appendChild(weekComponents());
					break;

				case params:
					for (const componentChildren of targetSideProject) {
						if (params === componentChildren.id) {
							await removeAddElement('.contentContainer');
							divWrapper.appendChild(constructorComponent(params));
						}
					}
					break;

				default:
					console.log('not found');
					break;
			}
		});
	});

	function removeAddElement(target) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(target);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	}

	document.body.appendChild(headerComponents());
	document.body.appendChild(menuBarComponents());
	document.body.appendChild(divWrapper);
}
