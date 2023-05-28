import LocalesPicker from "@/components/LocalesPicker.vue";
import { mount } from "@vue/test-utils";

import { LOCALES } from "../../enums";

describe("LocalesPicker", () => {
  it("pickerLabel returns the correct language name", async () => {
    const wrapper = mount(LocalesPicker);

    wrapper.vm.changeLocales(LOCALES.CS);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pickerLabel).toBe(LOCALES.EN.toUpperCase());

    wrapper.vm.changeLocales(LOCALES.EN);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pickerLabel).toBe(LOCALES.CS);
  });

  it("changeLocales sets the correct locale and updates the router", () => {
    const wrapper = mount(LocalesPicker);
    wrapper.vm.changeLocales(LOCALES.CS);

    expect(wrapper.vm.$i18n.global.locale.value).toBe(LOCALES.CS);
    expect(localStorage.getItem("phrase-project-locale")).toBe(LOCALES.CS);
  });

  it("onMounted sets the correct initial locale", () => {
    localStorage.setItem("phrase-project-locale", LOCALES.CS);
    const wrapper = mount(LocalesPicker);

    expect(wrapper.vm.$i18n.global.locale.value).toBe(LOCALES.CS);
  });
});
