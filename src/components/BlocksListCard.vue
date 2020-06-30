<template>
  <b-card class="blocks-card mt-4" @click="goToBlock">
    <b-row>
      <b-col>
        <router-link
          class="block-height"
          :to="{ name: 'block', params: { hash: blockD.hash } }"
        >#{{ blockD.height }}</router-link>
      </b-col>
      <b-col class="block-time">{{ blockD.time | timeFormat('LLL') }}</b-col>
    </b-row>
    <b-row class="pt-2 block-mined">
      <b-col>Mined by</b-col>
      <b-col class="mined text-truncate">{{ blockD.minedBy }}</b-col>
    </b-row>
    <b-row>
      <b-col class="block-tx">
        <span>{{ blockD.txlength }}</span> Transaction(s)
      </b-col>
      <b-col class="block-size">
        <span>{{ blockD.size | numberWithCommas }}</span> bytes
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Block } from '../api/blocks/type'

@Component({})
export default class BlocksListCard extends Vue {
  @PropSync('block', { type: Object }) blockD!: Block

  goToBlock() {
    this.$router.push({ name: 'block', params: { hash: this.blockD.hash } })
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: none !important;
  background-color: transparent !important;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 3px 8px 0px;
}

.blocks-card {
  cursor: pointer;
  border-left: 6px solid $purple !important;
  font-weight: 600;
  background-color: #595979;
  background: linear-gradient(107deg, #181936 0%, #101013 100%);

  .block-height {
    font-size: 18px;
  }

  .block-time {
    font-size: 14px;
    color: #ffffff4a;
    text-align: right;
  }

  .block-mined {
    font-size: 14px;
    .mined {
      text-align: right;
      color: $purple;
    }
  }

  .block-tx {
    font-size: 13px;
  }
  .block-size {
    font-size: 13px;
    text-align: right;
  }
}

@media (max-width: 576px) {
  .blocks-card {
    margin-left: 1.35rem;
    margin-right: 1.35rem;
  }
}

@media (max-width: 461px) {
  .card-body {
    padding: 0.85rem;
  }

  .blocks-card {
    border-left: 4px solid $purple !important;

    .block-height {
      font-size: 16px;
    }

    .block-time {
      font-size: 12px;
    }

    .block-mined {
      font-size: 12px;
    }

    .block-tx {
      font-size: 12px;
    }
    .block-size {
      font-size: 12px;
    }
  }
}

@media (max-width: 375px) {
  .blocks-card {
    .block-time {
      font-size: 10px;
    }

  }
}
@media (max-width: 337px) {
  .blocks-card {
    .block-time {
      font-size: 8px;
    }
  }
}
</style>
