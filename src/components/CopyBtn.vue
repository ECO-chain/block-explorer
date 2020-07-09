<template>
  <div>
    <i id="copy-btn" class="far fa-copy" @click="copyAddress"></i>
    <b-tooltip target="copy-btn" triggers="click" :show.sync="visible">Copied to clipboard</b-tooltip>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CopyBtn extends Vue {
  @Prop() target!: any

  visible = false

  copyAddress() {
    const el = document.createElement('textarea')
    el.value = this.target
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    this.showMsg()
  }

  showMsg() {
    this.visible = true
    setTimeout(() => {
      this.visible = false
    }, 4000)
  }
}
</script>

<style lang="scss" scoped>
div {
  display: inline-flex;
}

.fa-copy {
  cursor: pointer;
}

.fa-copy:hover {
  font-family: 'Font Awesome\ 5 Free';
  content: '\f0c5'; /* FontAwesome Unicode */
  font-weight: 900;
}
</style>
