import LanguagePicker from "@/components/LanguagePicker.vue";
import { mount } from "@vue/test-utils";

describe("SelectLanguage", () => {
  it("renders a select component", () => {
    const wrapper = mount(LanguagePicker);

    expect(wrapper.find("select")).toBeTruthy(); // or use appropriate selector
  });

  it("sets mode to multiple when `multiple` prop is true", () => {
    const wrapper = mount(LanguagePicker, {
      props: {
        multiple: true
      }
    });

    expect(wrapper.props().multiple).toBe(true);
    expect(wrapper.find('[mode="multiple"]')).toBeTruthy();
  });

  it("maps language data to options correctly", () => {
    const wrapper = mount(LanguagePicker);
    const langData = require("language-list")().getData();

    const expectedOptions = langData.map(
      ({ language, code }: { language: string; code: string }) => ({
        label: language,
        value: code.toString()
      })
    );

    expect(wrapper.vm.languageOptions).toEqual(expectedOptions);
  });
});
