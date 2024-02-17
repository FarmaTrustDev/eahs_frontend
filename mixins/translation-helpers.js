
export default {
    data() {
        return {
            // translation: this.$store.getters.getTranslation
        }
    },
    methods: {
        getTranslations() {
            return this.$store.getters.getTranslation
        },
    },
    computed: {
        translation() {
            return this.$store.getters.getTranslation
        },
        selectedLanguage() {
            return this.$store.getters.getSelectedLanguage
        }
    }
}
