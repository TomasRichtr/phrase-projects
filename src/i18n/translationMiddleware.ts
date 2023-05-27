import { DEFAULT_LOCALE, LOCALES } from "@/enums";
import i18n from "@/i18n";
import { type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";

const Trans = {
 i18nRoute(to: { name: string; params?: any }) {
  return {
   ...to,
   params: {
    locale: i18n.global.locale.value,
    ...to.params
   }
  };
 },

 async routeMiddleware(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
 ) {
  if (to.params.locale && Object.values(LOCALES).includes(DEFAULT_LOCALE)) return next();

  i18n.global.locale.value = DEFAULT_LOCALE;
  return next(DEFAULT_LOCALE);
 }
};

export default Trans;
