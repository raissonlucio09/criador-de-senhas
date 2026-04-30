export function calculatePasswordStrength(password, poolSize) {
  const entropy = calculateEntropy(password.length, poolSize);

  if (entropy < 45) {
    return createStrengthResult("Fraca", 28, "#dc2626", "Aumente o tamanho e combine mais tipos de caracteres.");
  }

  if (entropy < 70) {
    return createStrengthResult("Média", 56, "#f59e0b", "Boa para usos simples, mas ainda pode melhorar com mais caracteres.");
  }

  if (entropy < 95) {
    return createStrengthResult("Forte", 78, "#16a34a", "Combinação sólida para a maioria dos usos pessoais.");
  }

  return createStrengthResult("Excelente", 100, "#0f766e", "Senha longa, variada e com alta entropia estimada.");
}

function calculateEntropy(length, poolSize) {
  if (length <= 0 || poolSize <= 0) {
    return 0;
  }

  return Math.round(length * Math.log2(poolSize));
}

function createStrengthResult(label, percentage, color, hint) {
  return {
    label,
    percentage,
    color,
    hint,
  };
}
