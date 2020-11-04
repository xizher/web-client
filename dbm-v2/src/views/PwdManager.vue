<template>
  <div>
    <v-data-table
      :headers="tableHeader"
      :items="tableDataset"
      item-key="id"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading"
    >
    </v-data-table>
  </div>
</template>

<script>
import { toRefs } from '@vue/composition-api'
import { useTable } from '../hooks/useVuetify'
export default {
  name: 'PwdManager',
  setup () {
    const { tableState } = useTable('/pwd')

    return {
      ...toRefs(tableState),
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
