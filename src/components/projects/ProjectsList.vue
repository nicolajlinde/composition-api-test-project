<template>
  <base-container v-if="props.user">
    <h2>{{ props.user.fullName }}: Projects</h2>
    <base-search @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <ul v-if="hasProjects">
      <project-item v-for="prj in availableProjects" :key="prj.id" :title="prj.title"></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script setup>
import {computed, defineProps, ref, toRefs, watch} from "vue";
import ProjectItem from './ProjectItem.vue';

const props = defineProps(['user'])
const enteredSearchTerm = ref('')
const activeSearchTerm = ref('')

const hasProjects = computed(() => {
  return props.user.projects && availableProjects.value.length > 0;
})

const availableProjects = computed(() => {
  if (activeSearchTerm.value) {
    return props.user.projects.filter((prj) =>
        prj.title.includes(activeSearchTerm.value)
    );
  }
  return props.user.projects;
})

const updateSearch = (val) => {
  enteredSearchTerm.value = val
}

watch(enteredSearchTerm, (newValue) => {
  setTimeout(() => {
    if (newValue === enteredSearchTerm.value) {
      activeSearchTerm.value = newValue;
    }
  }, 300);
})

const {user} = toRefs(props)

watch(user, () => {
  enteredSearchTerm.value = ''
})
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>