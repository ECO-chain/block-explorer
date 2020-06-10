<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">
              <span>C</span>hain Status
            </h2>
          </div>
          <!-- END .group-head -->
          <b-row>
            <b-col cols="12" md="6">
              <b-row>
                <b-col>
                  <div class="group-head my-3 text-center text-md-left">
                    <h3 class="head-global my-3">Sync Status</h3>
                  </div>
                  <div class="block-global p-3 mb-3 rounded-lg">
                    <b-row class="align-items-center">
                      <b-col cols="6">
                        <div class="my-1">Sync Progress</div>
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
                        <div class="my-1">Current Sync Status</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ sync.status }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Start Date</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ now | timeFromNow }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Initial Block Chain Height</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">{{ sync.blockChainHeight }}</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Synced Blocks</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">-</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Skipped Blocks</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">-</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Sync Type</div>
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
                    <h3 class="head-global mb-0">Last Blocks</h3>
                  </div>
                  <div class="block-global p-3 mb-3 rounded-lg">
                    <b-row class="align-items-center">
                      <b-col cols="12">
                        <div class="my-1">Last Block Hash (ECOC)</div>
                      </b-col>
                      <b-col cols="12">
                        <div class="my-1 text-right">
                          <router-link
                            to="/block"
                            class="d-block text-truncate"
                          >{{ lastBlockHash.lastblockhash }}</router-link>
                        </div>
                      </b-col>
                      <b-col cols="12">
                        <div class="my-1">Current Blockchain Tip ()</div>
                      </b-col>
                      <b-col cols="12">
                        <div class="my-1 text-right">
                          <router-link
                            to="/block"
                            class="d-block text-truncate"
                          >{{ lastBlockHash.syncTipHash }}</router-link>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="6" class="d-flex flex-column">
              <div class="group-head my-3 text-center text-md-left">
                <h3 class="head-global mb-0">Ecochain node information</h3>
              </div>
              <div class="block-global p-3 mb-3 rounded-lg h-100">
                <b-row class="align-items-center">
                  <b-col cols="6">
                    <div class="my-1">Version</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.version }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Protocol Version</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.protocolversion }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Blocks</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.blocks | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Time Offset</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.timeoffset }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Connections to Other Nodes</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.connections }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Mining Difficulty</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.difficulty['proof-of-stake'] | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Network</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.network }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Proxy Settings</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ statusInfo.proxy ? statusInfo.proxy : '-' }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Info Errors</div>
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
