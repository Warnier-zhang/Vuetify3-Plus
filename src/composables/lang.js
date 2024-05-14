import CMessage from '@/components/feedback/CMessage';
import CLoading from '@/components/feedback/CLoading';

// Axios
import Axios from 'axios';

// Utilities
import fileDownload from 'js-file-download';

export function useLang() {
    const Arrays = {
        isNotNull(data) {
            return data !== null &&
                typeof data !== 'undefined' &&
                Array.isArray(data);
        },

        isNotEmpty(data) {
            return data !== null &&
                typeof data !== 'undefined' &&
                Array.isArray(data) &&
                data.length > 0;
        },

        isEmpty(data) {
            return !this.isNotEmpty(data);
        },

        reassignTo(oldArray, newArray) {
            if (this.isNotNull(oldArray)) {
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
                if (this.isNotEmpty(newArray)) {
                    oldArray.push(...newArray);
                }
            }
        },

        clear(data) {
            if (this.isNotNull(data)) {
                data.length = 0;
            }
        },

        sortBy(data, key, order) {
            if (this.isNotEmpty(data)) {
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
                        if (StringUtils.isEmpty(sortA) && StringUtils.isEmpty(sortB)) {
                            return 0;
                        }
                        if (StringUtils.isEmpty(sortA)) {
                            return -1;
                        }
                        if (StringUtils.isEmpty(sortB)) {
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
        }
    };

    const StringUtils = {
        isNotEmpty(text) {
            return text !== null &&
                typeof text !== 'undefined' &&
                typeof text === 'string' &&
                text.length > 0;
        },

        isEmpty(text) {
            return !this.isNotEmpty(text);
        },

        isNotBlank(text) {
            return text !== null &&
                typeof text !== 'undefined' &&
                typeof text === 'string' &&
                text.trim().length > 0;
        },

        isBlank(text) {
            return !this.isNotBlank(text);
        },

        replaceLineBreaks(text) {
            return text ? text.replace(/\n/g, '<br/>') : null;
        },
    };

    const Objects = {
        isNotEmpty(obj) {
            return obj !== null &&
                typeof obj !== 'undefined' &&
                typeof obj === 'object' &&
                Object.keys(obj).length > 0;
        },

        isEmpty(obj) {
            return !this.isNotEmpty(obj);
        }
    };

    const FileUtils = {
        download(name, type, path) {
            Axios.get(path, {responseType: 'blob'})
                .then((data) => {
                    fileDownload(data, name, type);
                })
                .catch((error) => {
                    console.log(error);
                    CMessage.error(error.message);
                });
        }
    };

    function AsyncTask(promise) {
        CLoading.open();
        return promise
            .then((data) => {
                return [null, data];
            })
            .catch((error) => {
                return [error, null];
            })
            .finally(() => {
                CLoading.close();
            });
    }

    return {Arrays, StringUtils, Objects, FileUtils, AsyncTask};
}
