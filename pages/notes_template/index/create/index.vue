<template>
    <app-form />
</template>

<script>
import formTemplates from '@/components/form/notesTemplate'
export default {
    async fetch({store}) {
        await Promise.all([
            store.dispatch('getDokter'),
            store.dispatch('getPerawat')
        ])
    },
    components: {
        'app-form' : formTemplates
    }
}
</script>