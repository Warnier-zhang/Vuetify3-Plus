// Axios
import Axios from "axios";

export class CKEditor5UploadAdapter {
    constructor(loader, uploadFileUrl, browseFileUrl) {
        this.loader = loader;
        this.uploadFileUrl = uploadFileUrl;
        this.browseFileUrl = browseFileUrl;
    }

    async upload() {
        let self = this;
        let file = await self.loader.file;
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append("upload", file);

            Axios.post(self.uploadFileUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: function (progressEvent) {
                    self.loader.uploadTotal = progressEvent.total;
                    self.loader.uploaded = progressEvent.loaded;
                },
            })
                .then((response) => {
                    if (response.errorCode === 1) {
                        resolve({
                            urls: {
                                default: `${self.browseFileUrl}?id=${response.data.id}`
                            }
                        });
                    } else {
                        reject({
                            message: response.msg
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    abort() {
    }
}
