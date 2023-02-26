import { SwipeDirection, useEventBus } from "@vueuse/core";
import { ref } from "vue";

// Define an enum for tab views.
export enum TabView {
  Monitor = "tabMonitor",
  Kontrol = "tabKontrol",
  Info = "tabInfo",
}

// Create an event bus for the app navigation.
export const appNavigationEventBus = useEventBus<any>("appNavigation");

// Store the tab views in an array.
export const arrTabView = [TabView.Monitor, TabView.Kontrol, TabView.Info];

// Use a ref to keep track of the active tab view.
export const arrTabViewPointer = ref(0);
export const activeTab = ref("");
export const bottomNavbarVisible = ref(true);

// Define a function that changes the active tab
export function goToTab(index: number) {
  // Set the current tab index
  arrTabViewPointer.value = index;

  // Set the current active tab
  activeTab.value = arrTabView[index];

  // Emit the active tab to the appNavigationEventBus
  appNavigationEventBus.emit(arrTabView[index]);

  // Log the active tab to the console
  // console.log(activeTab.value);
}

// A function to handle swipes and change the active tab view accordingly.
export function filterSwipeAction(
  swipe: boolean,
  direction: SwipeDirection | null
) {
  // Cache the length of the array for better performance.
  const length = arrTabView.length;

  if (swipe && direction === SwipeDirection.LEFT) {
    // Increase the pointer to switch to the next tab view.
    arrTabViewPointer.value = Math.min(arrTabViewPointer.value + 1, length - 1);
  } else if (swipe && direction === SwipeDirection.RIGHT) {
    // Decrease the pointer to switch to the previous tab view.
    arrTabViewPointer.value = Math.max(arrTabViewPointer.value - 1, 0);
  }
  // Update the active tab view with the current pointer.
  activeTab.value = arrTabView[arrTabViewPointer.value];

  // Emit the active tab view through the event bus.
  appNavigationEventBus.emit(activeTab.value);
}
