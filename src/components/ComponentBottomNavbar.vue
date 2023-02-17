<script setup>
import {
  kPage,
  kNavbar,
  kNavbarBackLink,
  kTabbar,
  kTabbarLink,
  kBlock,
  kIcon,
  kList,
  kListItem,
  kToggle,
} from "konsta/vue";
import { bottomNavbarEventBus } from "@/composables/bottom-navbar-event-bus";
import { ref } from "vue";
const tabHome = "tabHome";
const tabKontrol = "tabKontrol";

let activeTab = ref("");

activeTab.value = tabHome;

function goToHome() {
  activeTab.value = tabHome;
  bottomNavbarEventBus.emit(tabHome);
}

function goToKontrol() {
  activeTab.value = tabKontrol;
  bottomNavbarEventBus.emit(tabKontrol);
}
</script>
<template>
  <k-tabbar class="bottom-0 left-0 fixed">
    <k-tabbar-link :active="activeTab === tabHome" @click="goToHome()">
      Home
    </k-tabbar-link>
    <k-tabbar-link :active="activeTab === tabKontrol" @click="goToKontrol()">
      Kontrol
    </k-tabbar-link>
  </k-tabbar>
</template>
