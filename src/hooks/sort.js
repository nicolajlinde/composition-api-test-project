import {computed, ref} from "vue";

export default function useSort(items, sortProperty) {
    const sorting = ref(null)

    const sort = (mode) => {
        sorting.value = mode;
    }

    const displayedUsers = computed(() => {
        if (sorting.value) {
            return items;
        }
        return items.slice().sort((u1, u2) => {
            if (sorting.value === 'asc' && u1[sortProperty] > u2[sortProperty]) {
                return 1;
            } else if (sorting.value === 'asc') {
                return -1;
            } else if (sorting.value === 'desc' && u1[sortProperty] > u2[sortProperty]) {
                return -1;
            } else {
                return 1;
            }
        })
    })
    
    return [sort, sorting, displayedUsers]
}