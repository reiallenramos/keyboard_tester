const DEFAULT_SIZE = 24;
const INCREASE_IN_SIZE = 5;

class Button {
  constructor(label) {
    this.label = label;
    this.updateState(false);
    this.resetSize();
  }

  updateState(state) {
    this.isPressed = state;
  }

  increaseSize() {
    this.size += INCREASE_IN_SIZE;
  }

  resetSize() {
    this.size = DEFAULT_SIZE;
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
    findButtonObject(char) {
      return BUTTONS.find((button => button.label === char ));
    },

    increaseSize(e) {
      let characterPressed = toCharacter(e.which);
      let buttonPressed = this.findButtonObject(characterPressed);
      if (buttonPressed) {
        buttonPressed.increaseSize();
      }
    },

    resetAllButtons() {
      BUTTONS.forEach((button => {
        button.updateState(false);
        button.resetSize();
      }));
      this.updateButtonArray();
      this.resetInput();
    },

    resetInput() {
      this.inputString = '';
    },

    updateButtonState(e) {
      let characterPressed = toCharacter(e.which);
      let buttonPressed = this.findButtonObject(characterPressed);
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