<template>
  <div>
    <b-card header-tag="header" class="mb-4">
      <template v-slot:header>
        <span class="text-uppercase pr-2 tier-label">Balance Tier</span>
        <span class="tier-level">{{ balance.balance }}</span>
      </template>
      <b-row class="text-center">
        <b-col cols="6" md="4" class="mb-3">
          <div>
            <div class="tier-detail">{{ balance.coins }}</div>
            <div class="tier-detail-label">ECOC</div>
          </div>
        </b-col>
        <b-col cols="6" md="4" class="mb-3">
          <div>
            <div class="tier-detail">{{ balance.addresses }}</div>
            <div class="tier-detail-label">Address(es)</div>
          </div>
        </b-col>
        <b-col cols="6" md="4">
          <div>
            <div class="tier-detail">{{ balance.percentCoins | numberWithCommas }}%</div>
            <div class="tier-detail-label">% Coins</div>
          </div>
        </b-col>
        <b-col cols="6" md="4">
          <div>
            <div class="tier-detail">{{ balance.percentAddresses | numberWithCommas }}</div>
            <div class="tier-detail-label">% Addresses</div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { BalanceIntervals } from '../api/statistics/type'
@Component
export default class BalanceListCard extends Vue {
  @Prop() balance!: BalanceIntervals
}
</script>

<style lang="scss" scoped>
.card {
  border: none !important;
  background-color: #1d1e2f !important;
  border-radius: 0.35rem !important;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 3px 8px 0px;

  .card-header {
    background: linear-gradient(151deg, rgba(89, 23, 112, 1) 0%, rgba(39, 4, 56, 1) 100%);
    text-align: center;
    padding: 0.6rem 1.25rem;

    .tier-label {
      font-size: 12px;
      font-weight: 600;
      color: #ffffff91;
    }

    .tier-level {
      font-weight: 600;
      color: white;
    }
  }

  .card-body {
    padding-top: 1.35rem 1rem 1rem 1rem;

    .tier-detail {
      font-size: 14px;
    }

    .tier-detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #4d465f;
    }
  }
}
</style>
