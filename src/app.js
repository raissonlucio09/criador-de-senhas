import { copyTextToClipboard } from "./clipboard.js";
import { generatePassword, getCharacterPoolSize } from "./passwordGenerator.js";
import { calculatePasswordStrength } from "./strengthMeter.js";

const DEFAULT_OPTIONS = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  avoidAmbiguous: true,
};

const elements = {
  form: document.querySelector("#passwordForm"),
  lengthInput: document.querySelector("#lengthInput"),
  lengthValue: document.querySelector("#lengthValue"),
  uppercaseInput: document.querySelector("#uppercaseInput"),
  lowercaseInput: document.querySelector("#lowercaseInput"),
  numbersInput: document.querySelector("#numbersInput"),
  symbolsInput: document.querySelector("#symbolsInput"),
  avoidAmbiguousInput: document.querySelector("#avoidAmbiguousInput"),
  passwordOutput: document.querySelector("#passwordOutput"),
  copyButton: document.querySelector("#copyButton"),
  copyFeedback: document.querySelector("#copyFeedback"),
  resetButton: document.querySelector("#resetButton"),
  strengthLabel: document.querySelector("#strengthLabel"),
  strengthBar: document.querySelector("#strengthBar"),
  strengthHint: document.querySelector("#strengthHint"),
};

let feedbackTimeoutId;

initializeApp();

function initializeApp() {
  bindEvents();
  applyOptionsToForm(DEFAULT_OPTIONS);
  updatePassword();
}

function bindEvents() {
  elements.form.addEventListener("submit", handleFormSubmit);
  elements.lengthInput.addEventListener("input", updatePassword);
  elements.copyButton.addEventListener("click", handleCopyButtonClick);
  elements.resetButton.addEventListener("click", handleResetButtonClick);

  getOptionInputs().forEach((input) => {
    input.addEventListener("change", updatePassword);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  updatePassword();
}

async function handleCopyButtonClick() {
  try {
    await copyTextToClipboard(elements.passwordOutput.value);
    showFeedback("Senha copiada para a área de transferência.", "success");
  } catch (error) {
    showFeedback(error.message, "error");
  }
}

function handleResetButtonClick() {
  applyOptionsToForm(DEFAULT_OPTIONS);
  updatePassword();
  showFeedback("Configurações restauradas.", "success");
}

function updatePassword() {
  const options = getOptionsFromForm();
  elements.lengthValue.value = options.length;
  elements.lengthValue.textContent = options.length;

  try {
    const password = generatePassword(options);
    elements.passwordOutput.value = password;
    updateStrength(password, options);
    clearFeedback();
  } catch (error) {
    elements.passwordOutput.value = "";
    updateEmptyStrengthState(error.message);
    showFeedback(error.message, "error");
  }
}

function updateStrength(password, options) {
  const poolSize = getCharacterPoolSize(options);
  const strength = calculatePasswordStrength(password, poolSize);

  elements.strengthLabel.textContent = strength.label;
  elements.strengthLabel.style.color = strength.color;
  elements.strengthBar.style.width = `${strength.percentage}%`;
  elements.strengthBar.style.background = strength.color;
  elements.strengthHint.textContent = strength.hint;
}

function updateEmptyStrengthState(message) {
  elements.strengthLabel.textContent = "Indisponível";
  elements.strengthLabel.style.color = "#dc2626";
  elements.strengthBar.style.width = "0%";
  elements.strengthHint.textContent = message;
}

function getOptionsFromForm() {
  return {
    length: Number(elements.lengthInput.value),
    uppercase: elements.uppercaseInput.checked,
    lowercase: elements.lowercaseInput.checked,
    numbers: elements.numbersInput.checked,
    symbols: elements.symbolsInput.checked,
    avoidAmbiguous: elements.avoidAmbiguousInput.checked,
  };
}

function applyOptionsToForm(options) {
  elements.lengthInput.value = options.length;
  elements.uppercaseInput.checked = options.uppercase;
  elements.lowercaseInput.checked = options.lowercase;
  elements.numbersInput.checked = options.numbers;
  elements.symbolsInput.checked = options.symbols;
  elements.avoidAmbiguousInput.checked = options.avoidAmbiguous;
}

function getOptionInputs() {
  return [
    elements.uppercaseInput,
    elements.lowercaseInput,
    elements.numbersInput,
    elements.symbolsInput,
    elements.avoidAmbiguousInput,
  ];
}

function showFeedback(message, type) {
  window.clearTimeout(feedbackTimeoutId);
  elements.copyFeedback.textContent = message;
  elements.copyFeedback.style.color = type === "error" ? "#dc2626" : "#16a34a";

  feedbackTimeoutId = window.setTimeout(() => {
    clearFeedback();
  }, 2800);
}

function clearFeedback() {
  window.clearTimeout(feedbackTimeoutId);
  elements.copyFeedback.textContent = "";
}
