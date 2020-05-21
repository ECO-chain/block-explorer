<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">
              <span>T</span>oken Contracts
            </h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-search p-3 mb-2 rounded-lg d-flex">
            <b-form-input class="rounded-0" placeholder="Enter an ERC20 Contract Address or Token Name"></b-form-input>
            <b-button variant="primary" class="rounded-0">Search</b-button>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 my-3 rounded-lg">
            <div class="table-responsive m-0">
              <table class="table table-hover table-dark">
                <thead>
                  <tr>
                    <th class="text-nowrap">TOKENS INFORMATION</th>
                    <th class="text-nowrap">CONTRACT ADDRESS</th>
                    <th class="text-nowrap text-center">TOTAL SUPPLY</th>
                    <th class="text-nowrap text-center">HOLDERS</th>
                  </tr>
                </thead>
                <tbody class="small">
                  <tr>
                    <td>
                      <router-link to="/token">BCST - BlockChainStore Token</router-link>
                    </td>
                    <td>
                      <router-link to="/address">EMEg71KGAbMueuUNuhTacifqm4dEbt2KN5</router-link>
                    </td>
                    <td class="text-center">79840501</td>
                    <td class="text-center">128</td>
                  </tr>
                  <tr>
                    <td>
                      <router-link to="/token">BCST - BlockChainStore Token</router-link>
                    </td>
                    <td>
                      <router-link to="/address">EMEg71KGAbMueuUNuhTacifqm4dEbt2KN5</router-link>
                    </td>
                    <td class="text-center">37827162</td>
                    <td class="text-center">1</td>
                  </tr>
                  <tr>
                    <td>
                      <router-link to="/token">BCST - BlockChainStore Token</router-link>
                    </td>
                    <td>
                      <router-link to="/address">EMEg71KGAbMueuUNuhTacifqm4dEbt2KN5</router-link>
                    </td>
                    <td class="text-center">76876227</td>
                    <td class="text-center">23,453</td>
                  </tr>
                  <tr>
                    <td>
                      <router-link to="/token">BCST - BlockChainStore Token</router-link>
                    </td>
                    <td>
                      <router-link to="/address">EMEg71KGAbMueuUNuhTacifqm4dEbt2KN5</router-link>
                    </td>
                    <td class="text-center">43211739</td>
                    <td class="text-center">61</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-col>
        
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "Tokens",
  components: {},
  data() {
    return {};
  },
  mounted: function() {},
  computed: {},
  methods: {}
};
</script>