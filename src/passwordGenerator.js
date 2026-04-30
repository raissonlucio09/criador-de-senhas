const CHARACTER_GROUPS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%&*()-_=+[]{};:,.<>?",
};

const AMBIGUOUS_CHARACTERS = new Set(["O", "0", "I", "l", "1", "|", "`", "'"]);

export function generatePassword(options) {
  const characterSets = getSelectedCharacterSets(options);

  if (characterSets.length === 0) {
    throw new Error("Selecione pelo menos um tipo de caractere.");
  }

  const requiredCharacters = characterSets.map((set) => getRandomCharacter(set));
  const availableCharacters = characterSets.join("");
  const remainingLength = Math.max(options.length - requiredCharacters.length, 0);
  const randomCharacters = Array.from({ length: remainingLength }, () => getRandomCharacter(availableCharacters));

  return shuffleCharacters([...requiredCharacters, ...randomCharacters]).slice(0, options.length).join("");
}

export function getCharacterPoolSize(options) {
  return getSelectedCharacterSets(options).join("").length;
}

function getSelectedCharacterSets(options) {
  return Object.entries(CHARACTER_GROUPS)
    .filter(([groupName]) => options[groupName])
    .map(([, characters]) => removeAmbiguousCharacters(characters, options.avoidAmbiguous));
}

function removeAmbiguousCharacters(characters, shouldAvoidAmbiguous) {
  if (!shouldAvoidAmbiguous) {
    return characters;
  }

  return [...characters].filter((character) => !AMBIGUOUS_CHARACTERS.has(character)).join("");
}

function getRandomCharacter(characters) {
  const randomIndex = getSecureRandomNumber(characters.length);
  return characters[randomIndex];
}

function getSecureRandomNumber(maximum) {
  const randomValues = new Uint32Array(1);
  window.crypto.getRandomValues(randomValues);
  return randomValues[0] % maximum;
}

function shuffleCharacters(characters) {
  const shuffledCharacters = [...characters];

  for (let index = shuffledCharacters.length - 1; index > 0; index -= 1) {
    const randomIndex = getSecureRandomNumber(index + 1);
    [shuffledCharacters[index], shuffledCharacters[randomIndex]] = [shuffledCharacters[randomIndex], shuffledCharacters[index]];
  }

  return shuffledCharacters;
}
