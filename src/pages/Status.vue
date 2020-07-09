<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">{{ $t('views.status.chain_status') }}</h2>
          </div>
          <!-- END .group-head -->
          <b-row>
            <b-col cols="12" md="6">
              <b-row>
                <b-col>
                  <div class="group-head my-3 text-center text-md-left">
                    <h3 class="head-global my-3">{{ $t('views.status.sync_status') }}</h3>
                  </div>
                  <div class="block-global p-3 mb-3 rounded-lg">
                    <b-row class="align-items-center">
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.sync_prog') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">
                          <b-progress
                            :value="sync.syncPercentage"
                            max="100"
                            show-progress
                            height="20px"
                          ></b-progress>
                        </div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.current_sync') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ sync.status }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.start_d') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ now | timeFromNow }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.init_block_height') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ sync.blockChainHeight }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.sync_block') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">-</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.skipped_block') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">-</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="status-label">{{ $t('views.status.sync_type') }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ sync.type }}</div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="group-head my-3 text-center text-md-left">
                    <h3 class="head-global mb-0">{{ $t('views.status.last_blocks') }}</h3>
                  </div>
                  <div class="block-global p-3 mb-3 rounded-lg">
                    <b-row class="align-items-center">
                      <b-col cols="12">
                        <div class="status-label">{{ $t('views.status.last_block_hash') }}</div>
                      </b-col>
                      <b-col cols="12">
                        <div class="my-1 text-right text-truncate">
                          <router-link
                            :to="{ name: 'block', params: { hash: lastBlockHash.lastblockhash } }"
                          >{{ lastBlockHash.lastblockhash }}</router-link>
                        </div>
                      </b-col>
                      <b-col cols="12">
                        <div class="status-label">{{ $t('views.status.current_block_tip') }}</div>
                      </b-col>
                      <b-col cols="12">
                        <div class="my-1 text-right text-truncate">
                          <router-link
                            :to="{ name: 'block', params: { hash: lastBlockHash.lastblockhash } }"
                          >{{ lastBlockHash.lastblockhash }}</router-link>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="6" class="d-flex flex-column">
              <div class="group-head my-3 text-center text-md-left">
                <h3 class="head-global mb-0">{{ $t('views.status.ecoc_node_info') }}</h3>
              </div>
              <div class="block-global p-3 mb-3 rounded-lg h-100">
                <b-row class="align-items-center">
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.version') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.version }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.protocol_ver') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.protocolversion }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.blocks') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.blocks | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.time_off') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.timeoffset }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.connect_to_other') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.connections }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.mine_diffi') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ statusInfo.difficulty['proof-of-stake'] | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.network') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.network }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.proxy_sett') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.proxy ? statusInfo.proxy : '-' }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="status-label">{{ $t('views.status.info_err') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.errors ? statusInfo.errors : '-' }}</div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import statusModule from '@/api/status/index'
// eslint-disable-next-line no-unused-vars
import { SyncStatus, LastBlockHash } from '../api/status/type'

@Component({})
export default class Status extends Vue {
  sync: SyncStatus = {} as SyncStatus
  lastBlockHash: LastBlockHash = {} as LastBlockHash
  now = Date.now()

  async mounted() {
    this.sync = await statusModule.getSyncStatus()
    this.lastBlockHash = await statusModule.getLastBlockHash()
  }

  get statusInfo() {
    return this.$store.state.status.info
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

.status-label {
  font-weight: 600;
}
</style>
