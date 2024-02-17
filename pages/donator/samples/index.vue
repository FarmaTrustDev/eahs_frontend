<template>
    <PageLayout
    :create="false"
    :back="false"
    >
        <div slot="content">
            <img :src="getImageUrl('/images/map.png')" />
        </div>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import imagesHelper from '~/mixins/images-helper';
export default({
    components:{PageLayout},
    mixins:[imagesHelper]
})
</script>