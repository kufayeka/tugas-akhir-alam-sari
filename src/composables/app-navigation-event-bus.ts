import { SwipeDirection, useEventBus } from "@vueuse/core";
import { ref } from "vue";

export const appNavigationEventBus = useEventBus<any>("appNavigation");

export const tabMonitor = "tabMonitor";
export const tabKontrol = "tabKontrol";
export const tabInfo = "tabInfo";
export const arr = [tabMonitor, tabKontrol, tabInfo];
export const arrPointer = ref(0);
export const activeTab = ref("");

export function filterSwipeAction(
  swipe: boolean,
  direction: SwipeDirection | null
) {
  if (swipe && direction === SwipeDirection.LEFT) {
    arrPointer.value = Math.min(arrPointer.value + 1, 2);
  } else if (swipe && direction === SwipeDirection.RIGHT) {
    arrPointer.value = Math.max(arrPointer.value - 1, 0);
  }
  activeTab.value = arr[arrPointer.value];
  appNavigationEventBus.emit(activeTab.value);
  //   console.log("swipe:" + activeTab.value);
}
