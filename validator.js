/**
 * Módulo de Validação e Sanitização de Dados (Data-Validator-JS)
 *
 * Objetivo: Fornecer funções leves em JS Puro para garantir a integridade dos dados
 * em formulários e inputs.
 *
 * Fábio Galdino - Desenvolvedor JavaScript/Analista de Soluções
 */

// 1. FUNÇÃO DE LIMPEZA (SANITIZAÇÃO) DE STRING
// Remove espaços desnecessários e caracteres especiais comuns.
export function sanitizeString(value) {
  if (typeof value !== "string") {
    return "";
  }
  // Remove espaços no início e fim
  let cleaned = value.trim();
  // Remove caracteres especiais para fins de validação (mantém letras e números)
  cleaned = cleaned.replace(/[^\w\s]/gi, "");
  return cleaned;
}

// 2. FUNÇÃO DE VALIDAÇÃO DE E-MAIL
// Verifica se a string segue um padrão de e-mail básico.
export function validateEmail(email) {
  if (typeof email !== "string") {
    return false;
  }
  const trimmedEmail = email.toLowerCase().trim();
  // Regex para checar caracteres válidos (letras, números, ponto, hífen, e underscore)
  // Exclui acentuação, espaços e outros caracteres especiais comuns antes do @
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return emailRegex.test(trimmedEmail);
}

// 3. FUNÇÃO DE VALIDAÇÃO DE CPF (SIMPLIFICADA)
// Verifica se o CPF tem o tamanho e o formato esperado
export function validateCPF(cpf) {
  if (typeof cpf !== "string") {
    return false;
  }
  // 1. Limpeza e Verificação de Tamanho
  const cleanCPF = cpf.replace(/[^\d]/g, ""); // Remove pontuação
  if (cleanCPF.length !== 11) {
    return false;
  }

  // 2. Impedir Sequências Repetidas (Filtro simples de fraudes)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  let sum = 0;
  let remainder;

  // 3. Cálculo do Primeiro Dígito Verificador (DV1)
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false; // DV1 Incorreto
  }

  sum = 0;

  // 4. Cálculo do Segundo Dígito Verificador (DV2)
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false; // DV2 Incorreto
  }

  return true; // CPF Válido (Formato e DVs conferem)
}

// 4. FUNÇÃO PRINCIPAL (EXEMPLO DE USO)
export function validateInput(type, value) {
  const cleanedValue = sanitizeString(value);

  switch (type.toLowerCase()) {
    case "email":
      // Usa a função específica para e-mail
      return validateEmail(value);
    case "cpf":
      // Usa a função específica para CPF
      return validateCPF(value);
    case "string":
      // Apenas verifica se a string não está vazia após a limpeza
      return cleanedValue.length > 0;
    default:
      return false;
  }
}
