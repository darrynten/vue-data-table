<template>
  <div>
    <div
      class="tabs"
      role="tablist">
      <div
        v-if="getTitle(tab)"
        v-for="(tab, index) in filter.tabs"
        class="tab"
        :class="index + 1 === activeTab ? 'active' : ''"
        @click="setActive(index + 1)">
        {{ getTitle(tab) }}
      </div>
    </div>
    <div>
      <div
        v-if="activeTab > 0"
        v-for="(tab, index) in filter.tabs">
        <filter-date-range
          v-if="tab.type === 'date' && index + 1 === activeTab"
          :filter="tab"
          @close="setActive(0)" 
          class="filter-tab-content">
        </filter-date-range>
        <filter-number-range
          v-if="tab.type === 'range' && index + 1 === activeTab"
          :filter="tab"
          @close="setActive(0)"
          class="filter-tab-content">
        </filter-number-range>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .filter-tab-content {
    position: absolute;
    z-index: 9;
    left: calc(var(--padding) * 2);
    background: white;
    border: 1px solid var(--divider);
    padding: var(--padding);
    min-width: 300px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid var(--divider);
    align-items: center;

    .tab {
      padding: calc(var(--padding) / 2) var(--padding);
      border-top: 1px solid var(--divider);
      border-right: 1px solid var(--divider);
      border-left: 1px solid var(--divider);
      margin-left: -1px;
      border-radius: 3px 5px 0 0;
      min-width: 65px;
      height: auto;
      font-size: .9rem;
      overflow-wrap: normal;

      &:first-of-type {
        margin-left: 0;
        border-left: none;
      }

      &:hover {
        background: var(--hover);
        cursor: pointer;
      }

      &.active {
        background: var(--divider);
        color: var(--primary);
      }
    }
  }

  @media screen and (max-width: 500px) {
    .tabs {
      .tab {
        font-size: .7rem;
        padding: 0.7em;
        min-height: 48px;
        display: flex;
        align-items: center;
      }
    }
  }
</style>

<script>
  import FilterDateRange from './FilterDateRange.vue'
  import FilterNumberRange from './FilterNumberRange.vue'

  export default {
    components: {
      FilterDateRange,
      FilterNumberRange
    },
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeTab: 1
      }
    },
    methods: {
      setActive(selectedTab) {
        this.activeTab = selectedTab
      },
      getTitle(tab) {
        if (tab.type === 'null') {
          return tab.name
        }

        if (tab.type === 'date') {
          if (!tab.from && !tab.to) {
            return `${tab.name || 'Date'} (All)`
          }

          if (tab.from && !tab.to) {
            return `${tab.name || ''} (Since ${tab.from})`.trim()
          }

          if (!tab.from && tab.to) {
            return `${tab.name || ''} (Before ${tab.to})`.trim()
          }
        }

        if (tab.type === 'range') {
          if (!tab.from && !tab.to) {
            return `${tab.name || 'Range'} (All)`
          }

          if (tab.from && !tab.to) {
            return `${tab.name || ''} (Above ${tab.from})`.trim()
          }

          if (!tab.from && tab.to) {
            return `${tab.name || ''} (Below ${tab.to})`.trim()
          }
        }

        if (tab.from && tab.to) {
          return `${tab.name || 'From'} (${tab.from} to ${tab.to})`
        }

        return 'Error'
      }
    }
  }
</script>

