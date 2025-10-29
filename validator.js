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
  // Partes da expressão regular
  const caracteresProibidos = '[ \\*\\?\\(\\)\\[\\]\\{\\}\\\\\\|;:,<>"]';
  const parteLocal = "[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+";
  const dominio = "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";
  const subdominios = "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*";

  const regex = new RegExp(
    `^(?!.*${caracteresProibidos})${parteLocal}@${dominio}${subdominios}$`
  );

  return regex.test(email);
}

// 3. FUNÇÃO DE VALIDAÇÃO DE CPF
// Verifica se o CPF tem o tamanho e o formato esperado, e faz a checagem de DV
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

  const calcularDV = (cpfParcial, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < cpfParcial.length; i++) {
      soma += parseInt(cpfParcial.charAt(i)) * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const dv1 = calcularDV(cleanCPF.substring(0, 9), 10);
  const dv2 = calcularDV(cleanCPF.substring(0, 10), 11);

  return (
    dv1 === parseInt(cleanCPF.charAt(9)) &&
    dv2 === parseInt(cleanCPF.charAt(10))
  );
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
