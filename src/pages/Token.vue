<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>T</span>oken tracker summary
            </h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Total supply:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">79840501 BCST</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Name:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">BlockChainStore Token</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Token Holders:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">61</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Contract Address:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <router-link to="/address" class="d-block text-truncate">0abd9012fc9495d94346cbaded83f9e33be2ae07</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">No.Of.Transfers:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">2262</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">Token Decimals:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">8</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <b-tabs nav-class="tabs-global">
            <b-tab title="TOKEN TRANSFERS" active>
              <div class="block-global p-3 my-0 rounded-lg">
                <p>
                  A Total of
                  <span class="text-green">2262</span> found
                </p>
                <div class="table-responsive m-0">
                  <table class="table table-hover table-dark table-fix-td">
                    <thead>
                      <tr>
                        <th style="width:25%" class="text-nowrap">TxHash</th>
                        <th style="width:10%" class="text-nowrap text-center">AGE</th>
                        <th style="width:20%" class="text-nowrap">FROM</th>
                        <th style="width:10%" class="text-nowrap text-center"></th>
                        <th style="width:25%" class="text-nowrap">TO</th>
                        <th style="width:10%" class="text-nowrap text-center">Quantity</th>
                      </tr>
                    </thead>
                    <tbody class="small">
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                      <tr>
                        <td>
                          <router-link
                            to="/tx"
                            class="d-block text-truncate w-200px"
                          >88c9ca186c24a847701137a8afca822d8ff8aba3134fc21bbb538a602f3d0e47</router-link>
                        </td>
                        <td class="text-center">a day ago</td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                        </td>
                        <td class="text-right">
                          <router-link
                            to="/address"
                            class="d-block text-truncate w-200px"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td class="text-center">8094.39</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="my-2 d-flex justify-content-center">
                  <b-pagination
                    class="pagination-dark"
                    v-model="currentPage"
                    :total-rows="rows"
                    size="sm"
                  ></b-pagination>
                </div>
              </div>
              <!-- END .block-global -->
            </b-tab>
            <b-tab title="TOKEN HOLDERS">
              <div class="block-global p-3 my-0 rounded-lg">
                <p>
                  A Total of
                  <span class="text-green">61</span> Token holders found:
                </p>
                <div class="table-responsive m-0">
                  <table class="table table-hover table-dark table-fix-td">
                    <thead>
                      <tr>
                        <th class="text-nowrap text-center">Rank</th>
                        <th class="text-nowrap">Address</th>
                        <th class="text-nowrap">Quantity</th>
                        <th class="text-nowrap">Percentage</th>
                      </tr>
                    </thead>
                    <tbody class="small">
                      <tr>
                        <td class="text-center">1</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">2</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">3</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">4</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">5</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">6</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">7</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                      <tr>
                        <td class="text-center">8</td>
                        <td>
                          <router-link
                            to="/address"
                            class="d-block text-truncate"
                          >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                        </td>
                        <td>8094.39</td>
                        <td>78.409075521707835977 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="my-2 d-flex justify-content-center">
                  <b-pagination
                    class="pagination-dark"
                    v-model="currentPage"
                    :total-rows="rows"
                    size="sm"
                  ></b-pagination>
                </div>
              </div>
              <!-- END .block-global -->
            </b-tab>
            <b-tab title="READ SMART CONTRACT">
              <div class="block-global p-3 my-0 rounded-lg">
                <b-row class="align-items-center">
                  <b-col cols="auto">1. Name</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">BlockChainStore Token</b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">2. TotalSupply</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">7984050100000000</b-col>
                  <b-col cols="auto" class="text-purple-light">uint256</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">3. Decimals</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">8</b-col>
                  <b-col cols="auto" class="text-purple-light">uint8</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">4. Version</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">5. BalanceOf</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" md="auto">
                    <b-input-group size="sm">
                      <b-form-input placeholder="_owner (address)"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary">Query</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12">
                    <div class="block-line">
                      <div class="my-2">
                        Balance
                        <span class="text-purple-light">uint256</span>
                      </div>
                      <div class="my-2">
                        <div>[ balanceOf method Response ]</div>
                        <b-row class="align-items-center no-gutters">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                          <b-col cols="auto" class="pr-1">
                            balance
                            <span class="text-purple-light">uint256</span> 0
                          </b-col>
                          <b-col
                            cols="auto"
                            class="d-block text-truncate"
                          >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">6. Symbol</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">BCST</b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">7. Allowance</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" md="auto">
                    <b-input-group size="sm">
                      <b-form-input placeholder="_owner (address)"></b-form-input>
                      <b-form-input placeholder="_spender (address)"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary">Query</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12">
                    <div class="block-line">
                      <div class="my-2">
                        Remaining
                        <span class="text-purple-light">uint256</span>
                      </div>
                      <div class="my-2">
                        <div>[ balanceOf method Response ]</div>
                        <b-row class="align-items-center no-gutters">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                          <b-col cols="auto" class="pr-1">
                            balance
                            <span class="text-purple-light">uint256</span> 0
                          </b-col>
                          <b-col
                            cols="auto"
                            class="d-block text-truncate"
                          >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Token extends Vue {
  rows = 100
  currentPage = 1
}
</script>