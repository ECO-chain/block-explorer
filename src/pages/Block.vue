<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>B</span>
              lock #{{ block.height }}
            </h2>
            <p class="my-0 text-truncate">
              BLOCKHASH:
              <span class="text-purple">{{ block.hash }}</span>
            </p>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              Summary
              <span class="small text-purple">[ Confirmed ]</span>
            </h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Number Of Transactions</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.tx.length }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Difficulty</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ block.difficulty | numberWithCommas }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Height</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      {{ block.height }}
                      <span class="text-green">[ Mainchain ]</span>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Bits</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.bits }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Block Reward</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.reward }} ECOC</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Size (bytes)</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.size }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Timestamp</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ block.time | timeFormat('MMMM Do YYYY, h:mm:ss a') }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Version</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.version }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Mined by</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.minedBy }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Nonce</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.nonce }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Merkle Root</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.merkleroot }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Previous Block</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <router-link :to="`/block${block.previousblockhash}`">{{ block.height - 1 }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6" v-if="'nextblockhash' in block">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Next Block</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <router-link :to="`/block${block.nextblockhash}`">{{ block.height + 1 }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">Transactions</h3>
          </div>

          <div class="block-global p-3 my-3 rounded-lg">
            <b-row class="align-items-end mb-3">
              <b-col
                cols="12"
                md
                class="text-truncate"
              >ac8a3348a82e4aedf6177264e216a81a032fc9df2fd6feb32e56495037b9ee4c</b-col>
              <b-col cols="12" md class="text-md-right small">mined April 6, 2020 8:19:52 PM</b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-row class="justify-content-center no-gutters">
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">309.49 ECOC</b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" lg="1" class="text-center">
                    <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">Unparsed address [0]</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">0 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">319.49 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">ELYmtXKWZFCg6GTUg2WXW1GhEfPdbYSJw8</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">40 ECOC (U)</b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md class="text-center text-md-right">
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">CONFIRMATIONS: 43</div>
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">359.49 ECOC</div>
              </b-col>
            </b-row>
          </div>
          <!-- END .block-global -->

          <div class="block-global p-3 my-3 rounded-lg">
            <b-row class="align-items-end mb-3">
              <b-col
                cols="12"
                md
                class="text-truncate"
              >ac8a3348a82e4aedf6177264e216a81a032fc9df2fd6feb32e56495037b9ee4c</b-col>
              <b-col cols="12" md class="text-md-right small">mined April 6, 2020 8:19:52 PM</b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-row class="justify-content-center no-gutters">
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">309.49 ECOC</b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" lg="1" class="text-center">
                    <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">Unparsed address [0]</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">0 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">319.49 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">ELYmtXKWZFCg6GTUg2WXW1GhEfPdbYSJw8</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">40 ECOC (U)</b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md class="text-center text-md-right">
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">CONFIRMATIONS: 43</div>
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">359.49 ECOC</div>
              </b-col>
            </b-row>
          </div>
          <!-- END .block-global -->
          <div class="block-global p-3 my-3 rounded-lg">
            <b-row class="align-items-end mb-3">
              <b-col
                cols="12"
                md
                class="text-truncate"
              >ac8a3348a82e4aedf6177264e216a81a032fc9df2fd6feb32e56495037b9ee4c</b-col>
              <b-col cols="12" md class="text-md-right small">mined April 6, 2020 8:19:52 PM</b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-row class="justify-content-center no-gutters">
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">309.49 ECOC</b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" lg="1" class="text-center">
                    <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" lg>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">Unparsed address [0]</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">0 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">319.49 ECOC (U)</b-col>
                    </b-row>
                    <b-row class="align-items-center no-gutters">
                      <b-col cols="8" class="text-truncate">
                        <router-link to="/address">ELYmtXKWZFCg6GTUg2WXW1GhEfPdbYSJw8</router-link>
                      </b-col>
                      <b-col cols="4" class="text-right small text-purple-light">40 ECOC (U)</b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md class="text-center text-md-right">
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">CONFIRMATIONS: 43</div>
                <div class="d-inline-block small text-purple-light mx-3 mr-md-0">359.49 ECOC</div>
              </b-col>
            </b-row>
          </div>
          <!-- END .block-global -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import blocksModule from '@/api/blocks/index'
// eslint-disable-next-line no-unused-vars
import { BlockDetail } from '../api/blocks/type'

@Component
export default class Block extends Vue {
  @Prop() hash!: string

  block: BlockDetail = {} as BlockDetail

  async mounted() {
    this.block = await blocksModule.getBlockDetail(this.hash)

    console.log('block', this.block)
  }
}
</script>
