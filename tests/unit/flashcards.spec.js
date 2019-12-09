import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Flashcards from "@/components/Flashcards";

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(Flashcards, {
    propsData: {
      flashcards: [
        {
          question: "Are you able to render this test question?",
          answer: "Yes, it appears to be working correctly."
        },
        {
          question: "Are you able to render this second test question?",
          answer: "Yes, we are two for two."
        }
      ],
      flashcardsCount: 2,
      showFlashcards: true
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Flashcards", () => {
  // takes predefined set of q and a's
  it("renders question when passed in props", () => {
    expect(wrapper.props().flashcards[0].question).toBe(
      "Are you able to render this test question?"
    );
  });

  it("renders answer when passed in props", () => {
    expect(wrapper.props().flashcards[0].answer).toBe(
      "Yes, it appears to be working correctly."
    );
  });

  // presents each q and a, one at a time
  it("renders each flashcard, one at a time", () => {
    const questions = wrapper.findAll(".question");
    expect(questions).toHaveLength(1);
  });

  // presented in flashcard format
  it("presented in flashcard format", () => {
    const flashcard = wrapper.findAll(".flashcards").at(0);
    expect(flashcard.html()).toContain("question");
    expect(flashcard.html()).not.toContain("answer");
  });

  // on question, interact w/card to show answer (click/enter)
  it("renders answer when user clicks question", async () => {
    const flashcard = wrapper.findAll(".flashcards").at(0);
    flashcard.trigger("click");
    await Vue.nextTick();
    expect(flashcard.html()).toContain("answer");
  });

  // on answer, interact w/card to show next question (click/enter)
  it("renders next question when user clicks answer", async () => {
    const flashcard = wrapper.findAll(".flashcards").at(0);
    flashcard.setData({ showQuestion: false });
    flashcard.trigger("click");
    await Vue.nextTick();
    expect(flashcard.html()).toContain("question");
  });

  // on last answer, interact w/app to run again (click/enter)
  it("renders new deck when user click on last card", () => {});

  // shuffles order on every start
  it("renders a different order on every start", () => {});
});
