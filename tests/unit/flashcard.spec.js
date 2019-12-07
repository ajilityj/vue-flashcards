import { shallowMount } from "@vue/test-utils";
import Flashcard from "@/components/Flashcard.vue";

describe("Flashcard.vue", () => {
  const wrapper = shallowMount(Flashcard, {
    propsData: {
      flashcard: {
        question: "Hello?",
        answer: "Hello."
      }
    }
  });

  it("renders props.question when passed", () => {
    expect(wrapper.props().flashcard.question).toBe("Hello?");
  });

  it("renders props.answer when passed", () => {
    expect(wrapper.props().flashcard.answer).toBe("Hello.");
  });
});
