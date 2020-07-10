<template>
  <div>
    <div
      class="blocks-list-card-wrapper"
      v-for="(block, index) in cBlocks.blocks.slice(0, limit)"
      :key="index"
    >
      <b-card class="blocks-card mt-4" @click="goToBlock(block)">
        <b-row>
          <b-col>
            <router-link
              class="block-height"
              :to="{ name: 'block', params: { hash: block.hash } }"
            >#{{ block.height }}</router-link>
          </b-col>
          <b-col class="block-time">{{ utcFormat(block.time) | timeFormat('LLL') }}</b-col>
        </b-row>
        <b-row class="pt-2 block-mined">
          <b-col>Mined by</b-col>
          <b-col class="mined text-truncate">{{ block.minedBy }}</b-col>
        </b-row>
        <b-row>
          <b-col class="block-tx">
            <span>{{ block.txlength }}</span> Transaction(s)
          </b-col>
          <b-col class="block-size">
            <span>{{ block.size | numberWithCommas }}</span> bytes
          </b-col>
        </b-row>
      </b-card>
    </div>
    <infinite-loading
      slot="append"
      :identifier="blocksID"
      @infinite="infiniteHandler"
      force-use-infinite-wrapper="blocks-list-card-wrapper"
    >
      <div class="mt-4" slot="error">Fetching blocks went wrong, try again later :(</div>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'
// eslint-disable-next-line no-unused-vars
import { Block, Blocks } from '../api/blocks/type'
import moment from 'moment'

@Component({
  components: {
    InfiniteLoading
  }
})
export default class BlocksListCard extends Vue {
  @PropSync('blocks', { type: Object }) bBlocks!: Blocks

  limit = 50

  get cBlocks() {
    return this.bBlocks
  }

  get blocksID() {
    return this.cBlocks.pagination.current
  }

  async infiniteHandler($state: any) {
    if (this.limit < this.cBlocks.length) {
      setTimeout(() => {
        this.limit += 50
        $state.loaded()
      }, 500)
    } else {
      $state.complete()
    }
  }

  goToBlock(block: Block) {
    this.$router.push({ name: 'block', params: { hash: block.hash } })
  }

  utcFormat(time: any) {
    return moment.unix(time).utc()
  }

  @Watch('cBlocks.pagination.current')
  async dateChanged() {
    this.limit = 50
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: none !important;
  background-color: transparent !important;
  box-shadow: 0 6px 12px #080808;
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
