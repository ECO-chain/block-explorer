<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row class="mb-3">
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1"><span>R</span>ichest Addresses</h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 my-3 rounded-lg">
            <div class="table-responsive m-0">
              <b-table dark :fields="fields" :items="richestList"></b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import statisticsModule from '@/api/statistics/index'
// eslint-disable-next-line no-unused-vars
import { RichList } from '@/api/statistics/type'

@Component({})
export default class RichestList extends Vue {
  richestList: RichList[] = []

  fields = [
    { key: 'address' },
    { key: 'balance', sortable: true, formatter: (value: number) => {
      return `${value.toLocaleString()} ECOC`
    }},
    { key: 'blocks_mined', label: 'Minted', sortable: true, formatter: (value: number) => {
      return value.toLocaleString()
    }}
  ]

  async mounted() {
    this.richestList = await statisticsModule.getRichestList()
    console.log(this.richestList)
  }
}
</script>
