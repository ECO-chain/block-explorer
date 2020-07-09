<template>
  <div>
    <transition name="back-to-top-fade">
      <div
        class="vue-back-to-top"
        :style="`bottom:${this.bottom};right:${this.right};`"
        v-show="visible"
        @click="backToTop"
      >
        <slot>
          <div class="default">
            <i class="fas fa-arrow-up top-btn"></i>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

declare global {
  interface Window {
    smoothScroll: any
  }
}

@Component
export default class BackToTopBtn extends Vue {
  @Prop({ default: 600 }) visibleoffset!: number
  @Prop({ default: '30px' }) right!: string
  @Prop({ default: '40px' }) bottom!: string

  visible = false

  mounted() {
    window.smoothScroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothScroll)
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.catchScroll)
  }

  catchScroll() {
    this.visible = window.pageYOffset > this.visibleoffset
  }

  backToTop() {
    window.smoothScroll()
    this.$emit('scrolled')
  }
}
</script>

<style lang="scss" scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity 0.7s;
}
.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  opacity: 0;
}

.vue-back-to-top {
  position: fixed;
  z-index: 1000;
  cursor: pointer;
}

.vue-back-to-top .default {
  width: 60px;
  height: 50px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  background: linear-gradient(to right bottom, #69006e, #4d1a5f, #36204c, #262035, #1c1c1c);
  background-color: #501769;
  border-radius: 4px;
  box-shadow: 0 6px 12px #080808;
  display: flex;
}

.vue-back-to-top .default span {
  color: #ffffff;
}

.top-btn {
  margin: auto;
}
</style>
