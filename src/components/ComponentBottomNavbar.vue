<script setup>
import { bottomNavbarEventBus } from "@/composables/bottom-navbar-event-bus";
import { IonButton, IonFooter } from "@ionic/vue";

function goToHome() {
  bottomNavbarEventBus.emit("viewHome");
}

function goToKontrol() {
  bottomNavbarEventBus.emit("viewKontrol");
}
</script>
<template>
  <IonFooter>
    <IonButton @click="goToHome()">Home</IonButton>
    <IonButton @click="goToKontrol()">Kontrol</IonButton>
  </IonFooter>
</template>
