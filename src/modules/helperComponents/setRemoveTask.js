export function truncateResult(data, size) {
	return data.length > size ? `${data.slice(0, size - 1)} ...` : data;
}
