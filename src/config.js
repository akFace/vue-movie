const debug = process.env.NODE_ENV === 'production' ? false : true;

// debug调试
// export const API_ROOT = '/api';


// build构建
// export const API_ROOT = 'https://www.ifilm.ltd/api';

export const API_ROOT = debug ? '/api': 'https://www.ifilm.ltd/api';