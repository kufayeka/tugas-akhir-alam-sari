<script setup>
// Import components and variables
import { Tabbar, TabbarLink } from "konsta/vue";
import {
  goToTab,
  activeTab,
  arrTabView,
  appNavigationEventBus,
  TabView,
  bottomNavbarVisible,
} from "@/composables/app-navigation-event-bus";

// Set the first active tab to tabMonitor
activeTab.value = TabView.Monitor;

// Emit the first active tab to the appNavigationEventBus
appNavigationEventBus.emit(TabView.Monitor);
</script>

<template>
  <Tabbar
    v-if="bottomNavbarVisible"
    class="bottom-0 left-0 fixed shadow-bottomNav"
  >
    <TabbarLink :active="activeTab === arrTabView[0]" @click="goToTab(0)">
      Monitor
    </TabbarLink>
    <TabbarLink :active="activeTab === arrTabView[1]" @click="goToTab(1)">
      Kontrol
    </TabbarLink>
    <TabbarLink :active="activeTab === arrTabView[2]" @click="goToTab(2)">
      Info
    </TabbarLink>
  </Tabbar>
</template>
