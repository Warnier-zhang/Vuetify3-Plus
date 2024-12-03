export function useArrays() {
    function isNotEmpty(array) {
        return array !== null && typeof array !== 'undefined' && Array.isArray(array) && array.length > 0;
    }

    function isEmpty(array) {
        return !isNotEmpty(array);
    }

    function multisort(array, sortState) {
        if (isEmpty(array)) {
            return;
        }

        let sortKeys = [];
        if (sortState !== null && typeof sortState !== 'undefined') {
            sortKeys = Object.keys(sortState);
        }
        array.sort((a, b) => {
            for (let sortKey of sortKeys) {
                let sortOrder = sortState[sortKey] ? sortState[sortKey] : 'asc';
                let sortA = a[sortKey];
                let sortB = b[sortKey];

                // 降序
                if (sortOrder === 'desc') {
                    [sortA, sortB] = [sortB, sortA];
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
            }
            return 0;
        });
    }

    function sortBy(array, key, order) {
        if (isEmpty(array)) {
            return;
        }
        array.sort((a, b) => {
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

    function findIndexes(array, predicate) {
        return array.filter(predicate)
            .map((item) => {
                return array.indexOf(item);
            });
    }

    function sum(array, key) {
        return array.reduce((sum, item) => sum + item[key], 0);
    }

    function reassignTo(oldArray, newArray) {
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
    };

    return {
        isNotEmpty,
        isEmpty,
        multisort,
        sortBy,
        findIndexes,
    };
}
