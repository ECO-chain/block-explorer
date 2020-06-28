<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row class="mb-3">
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">{{ $t('views.rich_list.richest_addr') }}</h2>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 my-3 rounded-lg">
            <div class="table-responsive m-0">
              <b-table dark :fields="fields" :items="richestList">
                <template v-slot:cell(address)="data">
                  <router-link :to="{ name: 'address', params: { addr: data.item.address } }">{{
                    data.item.address
                  }}</router-link>
                </template>
              </b-table>
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

  fields: any[] = []

  created() {
    this.fields = [
      { key: 'address', label: this.$t('views.rich_list.address') },
      {
        key: 'balance',
        label: this.$t('views.rich_list.balance'),
        sortable: true,
        formatter: (value: number) => {
          return `${value.toLocaleString()} ECOC`
        }
      },
      {
        key: 'blocks_mined',
        label: this.$t('views.rich_list.minted'),
        sortable: true,
        formatter: (value: number) => {
          return value.toLocaleString()
        }
      }
    ]
  }

  async mounted() {
    this.richestList = await statisticsModule.getRichestList()
    console.log(this.richestList)
  }
}
</script>

<style lang="scss" scoped>
.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}
</style>
