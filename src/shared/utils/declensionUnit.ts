export const declensionUnit = (n: number) => {
	const value = Math.abs(n) % 100
	const num = value % 10
	const formatNumber = n.toLocaleString('ru-RU')

	if (value > 10 && value < 20) {
		return `${formatNumber} километров`
	}
	if (value > 1 && num < 5) {
		return `${formatNumber} километра`
	}

	if (num === 1) {
		return `${formatNumber} километр`
	}

	return `${formatNumber} километров`
}
