import PageWrapper from "@/components/layout/PageWrapper.vue";
import { mount } from "@vue/test-utils";

describe("PageWrapper", () => {
 it("renders the correct class names", () => {
  const wrapper = mount(PageWrapper);

  expect(wrapper.classes().join(" ")).toBe("px-6 lg:px-40 py-10 w-full flex justify-center");
 });

 it("renders a slot", () => {
  const wrapper = mount(PageWrapper, {
   slots: {
    default: "<p>Test Slot</p>"
   }
  });

  expect(wrapper.find("p").text()).toBe("Test Slot");
 });
});
