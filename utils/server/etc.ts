export function flattenObject(obj: any, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && !(obj[k] instanceof Date) && !(obj[k] instanceof Array)) {
            Object.assign(acc, flattenObject(obj[k], pre + k))
        }
        else acc[pre + k] = obj[k];
        return acc;
    }, {});
}

// export function filterObject(target: any, filter: string[]) {
//     Object.fromEntries(Object.entries(flattenObject(target)).filter(([key]) => filter.includes(key)))
// }

export function filterObject(target: any, filters: string[]) {
    const result: any = {}
    const keys = Object.keys(target)
    for (let filter of filters) {
        if (keys.includes(filter)) {
            result[filter] = target[filter]
        }
    }
    return result
}