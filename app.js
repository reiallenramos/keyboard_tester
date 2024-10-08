class Button {
  constructor(label) {
    this.isPressed = false;
    this.label = label;
  }

  updateState(state) {
    this.isPressed = state;
  }
}

// A - Z
const KEYS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const BUTTONS = KEYS.map(key => new Button(key));

function toCharacter(numValue) {
  return String.fromCharCode(numValue);
}

const vm = Vue.createApp({
  data() {
    return {
      availableKeys: BUTTONS,
      inputString: '',
    }
  },

  methods: {
    resetAllButtons() {
      BUTTONS.forEach((button => button.updateState(false)));
      this.updateButtonArray();
      this.resetInput();
    },

    resetInput() {
      this.inputString = '';
    },

    updateButtonState(e) {
      let characterPressed = toCharacter(e.which);
      let buttonPressed = BUTTONS.find((button => button.label === characterPressed ));
      if (buttonPressed) {
        buttonPressed.updateState(true);
        this.updateButtonArray();
      }
    },

    updateButtonArray() {
      const updatedButtons = [...this.availableKeys];
      this.availableKeys = updatedButtons;
    }
  }
}).mount('#app')