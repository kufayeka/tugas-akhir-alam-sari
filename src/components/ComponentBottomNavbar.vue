<script setup>
import { kTabbar, kTabbarLink } from "konsta/vue";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
import { ref } from "vue";

const tabMonitor = "tabMonitor";
const tabKontrol = "tabKontrol";
const tabInfo = "tabInfo";

let activeTab = ref("");

// set first activeTab = tabMonitor
activeTab.value = tabMonitor;
appNavigationEventBus.emit(tabMonitor);

function goToMonitor() {
  activeTab.value = tabMonitor;
  appNavigationEventBus.emit(tabMonitor);
}

function goToKontrol() {
  activeTab.value = tabKontrol;
  appNavigationEventBus.emit(tabKontrol);
}

function goToInfo() {
  activeTab.value = tabInfo;
  appNavigationEventBus.emit(tabInfo);
}
</script>
<template>
  <k-tabbar class="bottom-0 left-0 fixed shadow-card1">
    <k-tabbar-link :active="activeTab === tabMonitor" @click="goToMonitor()">
      Monitor
    </k-tabbar-link>
    <k-tabbar-link :active="activeTab === tabKontrol" @click="goToKontrol()">
      Kontrol
    </k-tabbar-link>
    <k-tabbar-link :active="activeTab === tabInfo" @click="goToInfo()">
      Info
    </k-tabbar-link>
  </k-tabbar>
</template>
