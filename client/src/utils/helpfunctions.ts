export const handleCPFChange = (e: string) => {
  let cpfValue = e.replace(/\D/g, "");
  cpfValue = cpfValue.slice(0, 11); // Remove todos os caracteres não numéricos
  cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
  cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
  cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
  return cpfValue; // Atualiza o estado com o CPF formatado
};
