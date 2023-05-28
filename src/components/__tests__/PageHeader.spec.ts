import PageHeader from "@/components/PageHeader.vue";
import { mount } from "@vue/test-utils";

describe("PageHeader", () => {
  it("renders", () => {
    const wrapper = mount(PageHeader);

    expect(wrapper).toBeTruthy();
  });
});
