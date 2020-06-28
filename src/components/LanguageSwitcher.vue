<template>
  <b-dropdown size="sm" id="dropdown-right" right :text="locale" class="switch-language">
    <b-dropdown-item v-for="lang in langs" :key="lang.key" @click="switchLang(lang.key)">{{
      lang.localizedName
    }}</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Watch } from 'vue-property-decorator'
import { loadLocale } from '../i18n'

@Component
export default class LanguageSwitcher extends Vue {
  langs = [
    {
      key: 'en',
      localizedName: 'English'
    },
    {
      key: 'zh',
      localizedName: '中文'
    }
  ]

  locale = 'en'

  async mounted() {
    this.locale = this.selectedLocaleName(this.currentLocale)
    await loadLocale(this.currentLocale)
  }

  get currentLocale() {
    let locale = localStorage.getItem('locale')
    if (locale) {
      return locale
    }
    let defaultLocale = this.langs[0].key
    localStorage.setItem('locale', defaultLocale)
    return defaultLocale
  }

  selectedLocaleName(locale: string) {
    const localeName = this.langs.find(lang => lang.key === locale)
    return localeName!.localizedName
  }

  async switchLang(locale: string) {
    localStorage.setItem('locale', locale)
    this.locale = this.selectedLocaleName(locale)
    await loadLocale(locale)
  }
}
</script>

<style lang="scss" scoped></style>
