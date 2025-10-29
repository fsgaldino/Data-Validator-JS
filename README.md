# 🛠 Data-Validator-JS (Validador Simples de Dados)

### 🎯 O Problema que Solucionamos (Foco na Agilidade)

Muitas empresas e formulários web sofrem com a entrada de dados em formatos incorretos (e-mails inválidos, CPFs mal formatados, datas erradas). Corrigir esses erros manualmente consome tempo do Analista de Suporte e causa falhas em sistemas.

Este repositório oferece uma **solução JavaScript *Vanilla*** (puro) leve, que pode ser integrada em *qualquer* projeto HTML/JS existente para **validar e limpar os dados na hora**, economizando horas de retrabalho.

---

### ✨ MVP (Mínimo Produto Viável) - O que está Pronto

O foco do MVP é **entregar valor imediato**. As seguintes validações estão implementadas e prontas para uso:

* **Validação de E-mail:** Verifica o padrão básico `nome@dominio.com`.
* **Validação de CPF:** Verifica a estrutura de 11 dígitos e o formato (ex: `000.000.000-00`).
* **Limpeza (Sanitização) de Strings:** Remove espaços extras, caracteres especiais e formata a *string* para uso em *backend*.

---

### ⚙️ Como Usar (Para o Desenvolvedor)

O código é 100% JavaScript puro, sem dependências. Basta importar a função `validateInput(type, value)` no seu projeto.

```javascript
// Exemplo de uso:
// Importe o script no seu HTML
// <script src="validator.js"></script>

// Função que valida o CPF (exemplo)
const isCpfValid = validateInput('cpf', '12345678900');

if (isCpfValid) {
    console.log("CPF OK");
} else {
    console.log("CPF Inválido. Falha de Sistema!");
}

---

**👋 Precisa de uma ferramenta personalizada para otimizar a produtividade da sua equipe?**
Meu _background_ em Suporte/Agilidade garante que eu entendo sua dor de negócio. Entre em contato no meu perfil do 99Freelas: https://www.99freelas.com.br/user/fabiogaldino
