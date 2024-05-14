export function useArrays() {
    const isNotEmpty = (data) => {
        return data !== null &&
            typeof data !== 'undefined' &&
            Array.isArray(data) &&
            data.length > 0;
    };

    const isEmpty = (data) => {
        return !isNotEmpty(data);
    };

    const sortBy = (data, key, order) => {
        if (isNotEmpty(data)) {
            data.sort((a, b) => {
                let sortA = key ? a[key] : a;
                let sortB = key ? b[key] : b;

                // 降序
                if (order === 'desc') {
                    [sortA, sortB] = [sortB, sortA]
                }

                // 日期
                if (sortA instanceof Date && sortB instanceof Date) {
                    return sortA.getTime() - sortB.getTime();
                }

                // 转换成字符串
                [sortA, sortB] = [sortA, sortB].map(value => value != null ? value.toString().toLocaleLowerCase() : value);
                if (sortA !== sortB) {
                    if (!sortA && !sortB) {
                        return 0;
                    }
                    if (!sortA) {
                        return -1;
                    }
                    if (!sortB) {
                        return 1;
                    }
                    if (!isNaN(sortA) && !isNaN(sortB)) {
                        return Number(sortA) - Number(sortB);
                    }
                    return (new Intl.Collator()).compare(sortA, sortB);
                }
                return 0
            });
        }
    };

    const isNotNull = (data) => {
        return data !== null &&
            typeof data !== 'undefined' &&
            Array.isArray(data);
    };

    const reassignTo = (oldArray, newArray) => {
        if (isNotNull(oldArray)) {
            // 方式一
            // oldArray.splice(0, oldArray.length, ...newArray);

            // 方式二
            // oldArray.length = 0;
            // if (this.isNotEmpty(newArray)) {
            //     newArray.forEach((newItem) => {
            //         oldArray.push(cloneDeep(newItem));
            //     });
            // }

            // 方式三
            oldArray.length = 0;
            if (isNotEmpty(newArray)) {
                oldArray.push(...newArray);
            }
        }
    };

    const clear = (data) => {
        if (isNotNull(data)) {
            data.length = 0;
        }
    };

    return {
        isNotEmpty,
        isEmpty,
        sortBy,
        isNotNull,
        reassignTo,
        clear,
    };
}
