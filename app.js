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
      let found = {
        index: null,
        buttonObject: null
      }

      const currentButtons = [...this.availableKeys];
      found.index = currentButtons.findIndex((button => button.label === char ));
      found.buttonObject = currentButtons[found.index];

      return found;
    },

    increaseSize(e) {
      let characterPressed = toCharacter(e.which);
      let buttonPressed = this.findButtonObject(characterPressed);
      if (buttonPressed.buttonObject) {
        buttonPressed.buttonObject.increaseSize();
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

    moveButtonToFront(buttonIndex) {
      const buttonToMove = this.availableKeys[buttonIndex];
      const tempButtons = [...this.availableKeys];
      tempButtons.splice(buttonIndex, 1);
      tempButtons.splice(0, 0, buttonToMove);
      this.availableKeys = tempButtons;
    },

    updateButtonState(e) {
      let characterPressed = toCharacter(e.which);
      let buttonPressed = this.findButtonObject(characterPressed);
      if (buttonPressed.buttonObject) {
        this.moveButtonToFront(buttonPressed.index);
        buttonPressed.buttonObject.updateState(true);
        this.updateButtonArray();
      }
    },

    updateButtonArray() {
      const tempButtons = [...this.availableKeys];
      this.availableKeys = tempButtons;
    }
  }
}).mount('#app')