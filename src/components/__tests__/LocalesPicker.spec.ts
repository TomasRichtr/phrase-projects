import LocalesPicker from "@/components/LocalesPicker.vue";
import { mount } from "@vue/test-utils";

describe("LocalesPicker", () => {
 it("pickerLabel returns the correct language name", async () => {
  const wrapper = mount(LocalesPicker);

  wrapper.vm.changeLocales("cs");
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.pickerLabel).toBe("EN");

  wrapper.vm.changeLocales("en");
  await wrapper.vm.$nextTick();

  expect(wrapper.vm.pickerLabel).toBe("CS");
 });

 it("changeLocales sets the correct locale and updates the router", () => {
  const wrapper = mount(LocalesPicker);
  wrapper.vm.changeLocales("cs");

  expect(wrapper.vm.$i18n.global.locale.value).toBe("cs");
  expect(localStorage.getItem("phrase-project-locale")).toBe("cs");
 });

 it("onMounted sets the correct initial locale", () => {
  localStorage.setItem("phrase-project-locale", "cs");
  const wrapper = mount(LocalesPicker);

  expect(wrapper.vm.$i18n.global.locale.value).toBe("cs");
 });
});
