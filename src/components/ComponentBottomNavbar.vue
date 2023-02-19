<script setup>
import { kTabbar, kTabbarLink } from "konsta/vue";
import {
  appNavigationEventBus,
  tabMonitor,
  tabKontrol,
  tabInfo,
  activeTab,
  arr,
  arrPointer,
} from "@/composables/app-navigation-event-bus";

// set first activeTab = tabMonitor
activeTab.value = tabMonitor;
appNavigationEventBus.emit(tabMonitor);

function goToTab(index) {
  arrPointer.value = index;
  activeTab.value = arr[index];
  appNavigationEventBus.emit(arr[index]);
  //console.log(activeTab.value);
}
</script>

<template>
  <k-tabbar class="bottom-0 left-0 fixed shadow-bottomNav">
    <k-tabbar-link :active="activeTab === tabMonitor" @click="goToTab(0)">
      Monitor
    </k-tabbar-link>
    <k-tabbar-link :active="activeTab === tabKontrol" @click="goToTab(1)">
      Kontrol
    </k-tabbar-link>
    <k-tabbar-link :active="activeTab === tabInfo" @click="goToTab(2)">
      Info
    </k-tabbar-link>
  </k-tabbar>
</template>
