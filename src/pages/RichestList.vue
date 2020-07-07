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
            <div class="table-responsive m-0" v-if="!isMobileDevice">
              <b-table dark :fields="fields" :items="richestList" class="rich-list-table">
                <template v-slot:cell(address)="data">
                  <router-link
                    :to="{ name: 'address', params: { addr: data.item.address } }"
                  >{{ data.item.address }}</router-link>
                </template>
              </b-table>
              <back-to-top-btn :visibleoffset="850"></back-to-top-btn>
            </div>
            <div v-else>
              <b-card class="rich-list" v-for="(rich, index) in richestList" :key="index">
                <b-card-text class="rich-label mt-0">Rank #{{ getRichestRank(rich.address) }}</b-card-text>
                <div class="text-truncate">
                  <router-link
                    :to="{ name: 'address', params: { addr: rich.address } }"
                    class="rich-address"
                  >{{ rich.address }}</router-link>
                </div>
                <b-row>
                  <b-col>
                    <b-card-text class="rich-label">Minted</b-card-text>
                    <span>{{ rich.blocks_mined | numberWithCommas }}</span>
                  </b-col>
                  <b-col>
                    <b-card-text class="rich-label">
                      Balance
                      <span>(ECOC)</span>
                    </b-card-text>
                    <span>
                      {{ rich.balance | numberWithCommas }}
                      <span class="rich-token-symbol">ECOC</span>
                    </span>
                  </b-col>
                </b-row>
              </b-card>
              <back-to-top-btn></back-to-top-btn>
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
import BackToTopBtn from '../components/BackToTopBtn.vue'


@Component({
  components: {
    BackToTopBtn,
  }
})
export default class RichestList extends Vue {
  richestList: RichList[] = []

  fields: any[] = []


  created() {
    this.fields = [
      { key: 'address', label: this.$t('views.rich_list.address'), thClass: 'th-custom' },
      {
        key: 'balance',
        label: this.$t('views.rich_list.balance'),
        sortable: true,
        formatter: (value: number) => {
          return `${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} ECOC`
        },
        thClass: 'th-custom',
        class: 'text-right'
      },
      {
        key: 'blocks_mined',
        label: this.$t('views.rich_list.minted'),
        sortable: true,
        formatter: (value: number) => {
          return value.toLocaleString()
        },
        thClass: 'th-custom',
        class: 'text-right'
      }
    ]
  }

  async mounted() {
    this.richestList = await statisticsModule.getRichestList()
    console.log(this.richestList)
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
  }

  getRichestRank(addr: string) {
    let rankNumber = this.richestList.findIndex(el => el.address === addr)
    return rankNumber + 1
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

.card {
  padding-bottom: 0;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-bottom-color: #282b35;
  background-color: #171b29 !important;
}

.rich-list {
  .rich-address {
    font-weight: 600;
  }
  .rich-label {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 14px;
    color: #ffffff3b !important;
    span {
      display: none;
    }
  }

  .rich-token-symbol {
    font-size: 13px;
    font-weight: 600;
    color: #54575f;
  }
}

@media (max-width: 991px) {
  .rich-list-table {
    font-size: 14px !important;
  }
}

@media (max-width: 463px) {
  .rich-list {
    .rich-address {
      font-size: 14px;
    }

    .rich-label {
      font-size: 12px;
      span {
        font-size: 12px;
      }
    }

    span {
      font-size: 14px;
    }

    .rich-token-symbol {
      font-size: 11px !important;
    }
  }
}

@media (max-width: 419px) {
  .rich-list {
    .rich-label {
      span {
        display: inline;
      }
    }
    .rich-token-symbol {
      display: none;
    }
  }
}
</style>
