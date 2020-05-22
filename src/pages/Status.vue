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
                          <b-progress :value="value" :max="max" show-progress height="20px"></b-progress>
                        </div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Current Sync Status</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">finished</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Start Date</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">19 minutes ago</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1">Initial Block Chain Height</div>
                      </b-col>
                      <b-col cols="6">
                        <div class="my-1 text-right">434043</div>
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
                        <div class="my-1 text-right">ecochain's core node</div>
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
                          >d896fb8bb843c6c1f2d7c2ee228bee1286c3a73062c00d9580885e6c79b3dd6a</router-link>
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
                          >b620e613d0d655b2ba080f08743d05925c92d55b851402c7cc91160b6d1265b2</router-link>
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
                    <div class="my-1 text-right">1000000</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Protocol Version</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">70016</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Blocks</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">434043</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Time Offset</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">0</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Connections to Other Nodes</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">108</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Mining Difficulty</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">6057655.990523677</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Network</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">livenet</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Proxy Settings</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">-</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Info Errors</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">-</div>
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
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Status extends Vue {
  value = 80
  max = 100
}
</script>