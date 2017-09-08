const filters = {
	getType(tag) {
		if (tag === '1') {
			return '电影'
		}
		if (tag === '2') {
			return '电视剧'
		}
	}
};

export default filters;