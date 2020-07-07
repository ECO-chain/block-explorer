<template>
  <div class="block-global p-3 mb-3 rounded-lg add-border-top">
    <div v-for="(entry, index) in limitedEntries" :key="index">
      <b-row class="align-items-center text-center my-2">
        <b-col cols="12" md="2">
          <b-button
            class="change-data-btn my-2 my-md-0"
            @click="changeDataType(entry.typeKey, index, 'key')"
          >{{ entry.typeKey }}</b-button>
        </b-col>
        <b-col cols="12" md>
          <b-row class="justify-content-center align-items-center no-gutters">
            <b-col
              cols="12"
              md="5"
              class="text-center text-md-right text-truncate"
              :id="`tooltip-key-${index}`"
            >{{ entry.displayedKey }}</b-col>
            <b-tooltip :target="`tooltip-key-${index}`">
              {{ entry.displayedKey }}
            </b-tooltip>
            <b-col cols="12" md="2" class="text-center">
              <b-icon-arrow-right-short class="h3 mb-0 rotate-sm-90"></b-icon-arrow-right-short>
            </b-col>
            <b-col
              cols="12"
              md="5"
              class="text-center text-md-left text-truncate"
              :id="`tooltip-value-${index}`"
            >{{ entry.displayedValue }}</b-col>
            <b-tooltip :target="`tooltip-value-${index}`">{{ entry.displayedValue }}</b-tooltip>
          </b-row>
        </b-col>
        <b-col cols="12" md="2">
          <b-button
            class="change-data-btn my-2 my-md-0"
            v-model="currentView"
            @click="changeDataType(entry.typeValue, index, 'value')"
          >{{ entry.typeValue }}</b-button>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-row>
        <b-col cols="12">
          <div class="my-2 text-center" v-if="limit < dataEntries.length">
            <b-button
              class="change-data-btn mx-2 text-uppercase"
              @click="displayMore(5)"
            >{{ $t('components.storage_log.more' )}}</b-button>
            <b-button
              class="change-data-btn mx-2 text-uppercase"
              @click="displayAll"
            >{{ $t('components.storage_log.view_all' )}}</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface LogEntries {
  key: any
  value: any
  displayedKey: any
  displayedValue: any
  typeKey: any
  typeValue: any
}

@Component({})
export default class StorageLog extends Vue {
  @Prop() entries!: object
  dataEntries: LogEntries[] = []
  limit = 5
  currentView = 'data'

  STORAGE_CONST = {
    STRING: 'string',
    NUMBER: 'number',
    ADDRESS: 'address',
    DATA: 'data'
  }

  storageViews = [
    this.STORAGE_CONST.DATA,
    this.STORAGE_CONST.STRING,
    this.STORAGE_CONST.NUMBER,
    this.STORAGE_CONST.ADDRESS
  ]

  async mounted() {
    this.dataEntries = await this.aggregateEntries(this.entries)
    console.log('ent', this.dataEntries)
  }

  get limitedEntries() {
    return this.dataEntries.slice(0, this.limit)
  }

  aggregateEntries(entries: object) {
    let dataEnt = []
    for (let k in entries) {
      //@ts-ignore
      let [key, value] = Object.entries(entries[k])[0]
      dataEnt.push({
        key,
        value,
        displayedKey: key,
        displayedValue: value,
        typeKey: this.STORAGE_CONST.DATA,
        typeValue: this.STORAGE_CONST.NUMBER
      })
    }

    return dataEnt
  }

  displayMore(more: number) {
    this.limit += more
  }

  displayAll() {
    this.limit = this.dataEntries.length
  }

  changeDataType(type: string, index: number, data: string) {
    const currentIndex = this.storageViews.indexOf(type)
    const isLastIndex = currentIndex === this.storageViews.length - 1
    const firstType = this.storageViews[0]
    const nextType = this.storageViews[currentIndex + 1]
    const props = data === 'key' ? 'typeKey' : 'typeValue'
    const entryDisplayProp = data === 'key' ? 'displayedKey' : 'displayedValue'
    const entryData = data === 'key' ? 'key' : 'value'

    console.log('before click', type)

    if (isLastIndex) {
      this.limitedEntries[index][props] = firstType
    } else {
      this.limitedEntries[index][props] = nextType
    }

    console.log('after click', this.limitedEntries[index][props])

    this.limitedEntries[index][entryDisplayProp] = this.parseDataType(
      this.limitedEntries[index][entryData],
      this.limitedEntries[index][props]
    )

    console.log('now', this.limitedEntries[index][entryDisplayProp])
  }

  parseDataType(data: any, type: string) {
    switch (type) {
      case 'string': {
        var str = ''
        var i = 0,
          l = data.length

        if (data.substring(0, 2) === '0x') {
          i = 2
        }

        for (; i < l; i += 2) {
          var code = parseInt(data.substr(i, 2), 16)

          if (code === 0 && str) break

          str += String.fromCharCode(code)
        }

        return str
      }
      case 'number': {
        return parseInt(data, 16)
      }
      case 'address': {
        return data.substr(-40)
      }
      case 'data': {
        return data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-inner {
  max-width: unset !important;
}

.change-data-btn {
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #323646;
}
</style>
