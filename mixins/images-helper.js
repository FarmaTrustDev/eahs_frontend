import { BASE_URL } from '~/services/Constant'
import { isEmpty } from '~/services/Utilities'
export default {
    methods: {
        getImageUrl(slug) {
            return `${BASE_URL}${slug}`
        },
        uploadedFiles(files) {
            if (!isEmpty(files)) {
                return files.map((file) => {
                    file.url = this.getImageUrl(file.url)
                    return file
                })
            }
        },
    },
}
