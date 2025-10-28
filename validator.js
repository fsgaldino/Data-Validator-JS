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
    if (typeof value !== 'string') {
        return '';
    }
    // Remove espaços no início e fim
    let cleaned = value.trim(); 
    // Remove caracteres especiais para fins de validação (mantém letras e números)
    cleaned = cleaned.replace(/[^\w\s]/gi, ''); 
    return cleaned;
}

// 2. FUNÇÃO DE VALIDAÇÃO DE E-MAIL
// Verifica se a string segue um padrão de e-mail básico.
export function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    // Regex simples para padrão básico: algo@algo.algo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase().trim());
}

// 3. FUNÇÃO DE VALIDAÇÃO DE CPF (SIMPLIFICADA)
// Verifica se o CPF tem o tamanho e o formato esperado
export function validateCPF(cpf) {
    if (typeof cpf !== 'string') {
        return false;
    }
    // Remove a pontuação para verificar apenas os números
    const cleanCPF = cpf.replace(/[^\d]/g, ''); 

    // O foco é garantir o tamanho correto (11 dígitos)
    if (cleanCPF.length !== 11) {
        return false;
    }

    // Impede sequências simples (ex: "11111111111")
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    // Se passou nas checagens básicas, retorna true.
    return true;
}

// 4. FUNÇÃO PRINCIPAL (EXEMPLO DE USO)
export function validateInput(type, value) {
    const cleanedValue = sanitizeString(value);

    switch (type.toLowerCase()) {
        case 'email':
            // Usa a função específica para e-mail
            return validateEmail(value); 
        case 'cpf':
            // Usa a função específica para CPF
            return validateCPF(value);
        case 'string':
            // Apenas verifica se a string não está vazia após a limpeza
            return cleanedValue.length > 0;
        default:
            return false;
    }
}
