export function autoId(params) {
	const getData = params.projectTitle;
	const splitData = getData.toLowerCase().split(' ')[0];

	return splitData;
}
