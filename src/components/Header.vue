<template>
  <header class="wrap-header">
    <b-container>
      <b-row>
        <b-col cols="12">
          <div class="header d-flex justify-content-between align-items-center">
            <router-link to="/" class="logo">
              <img alt="Ecochain Explorer" src="~@/assets/images/logo-ecoc.png" />
            </router-link>
            <transition name="am-topnav">
              <nav class="topnav" v-if="menuActive">
                <ul class="list-unstyled d-md-flex m-0 topnav-list align-items-center">
                  <li class="ml-3">
                    <router-link
                      to="/"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.home') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/blocks"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.blocks') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/status"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.status') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/stats"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.stats') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/charts"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.charts') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/tokens"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.token') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <router-link
                      to="/richest-list"
                      @click.native="toggleShow()"
                    >{{ $t('components.header.top_list') }}</router-link>
                  </li>
                  <li class="ml-3">
                    <language-switcher></language-switcher>
                  </li>
                </ul>
              </nav>
            </transition>
            <div
              class="hamburger hamburger--spring js-hamburger d-md-none"
              id="btn-hamburger"
              :class="{ 'is-active': menuActive }"
              v-on:click="menuActive = !menuActive"
            >
              <div class="hamburger-box">
                <div class="hamburger-inner"></div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LanguageSwitcher from './LanguageSwitcher.vue'

@Component({
  components: {
    LanguageSwitcher
  }
})
export default class BlockHeader extends Vue {
  menuActive = screen.width <= 767.98 ? false : true

  toggleShow() {
    this.menuActive = screen.width <= 767.98 ? false : true
  }
}
</script>

<style lang="scss" scoped>
.wrap-header {
  background: $purple-dark;
  box-shadow: 0 0 10px rgba($purple-light, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
}
.header {
  height: 60px;
  @include media-breakpoint-down(md) {
    font-size: rem(12);
  }
  @include media-breakpoint-down(sm) {
    font-size: rem(16);
  }
  a {
    color: $white;
    &.router-link-exact-active,
    &:hover {
      color: $purple;
    }
    @include media-breakpoint-down(sm) {
      &.router-link-exact-active {
        font-size: rem(20);
      }
    }
  }
}
.topnav-list {
  text-transform: uppercase;
}
.logo {
  width: 150px;
  @include media-breakpoint-down(sm) {
    width: 100px;
  }
}
@include media-breakpoint-down(sm) {
  .topnav {
    background: $purple-dark;
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    text-align: center;
    padding: 2rem 0;
    li {
      padding: 0.5rem 0;
    }
  }
}

@include media-breakpoint-down(md) {
  .am-topnav-enter {
    opacity: 0;
    .topnav-list {
      transform: translate3d(0, 5px, 0);
      @include transition(transform 0.2s);
    }
  }
  .am-topnav-enter-to {
    opacity: 1;
    .topnav-list {
      transform: translate3d(0, 0, 0);
      @include transition(transform 0.2s);
    }
  }
  .am-topnav-leave {
    opacity: 1;
    .topnav-list {
      transform: translate3d(0, 0, 0);
      @include transition(transform 0.2s);
    }
  }
  .am-topnav-leave-to {
    opacity: 0;
    .topnav-list {
      transform: translate3d(0, 5px, 0);
      @include transition(transform 0.2s);
    }
  }
  .am-topnav-leave-active,
  .am-topnav-enter-active {
    @include transition(opacity 0.4s);
  }
}
</style>
