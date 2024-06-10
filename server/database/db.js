const { password, name, usu } = require("../config/connectInfo.js");
const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Construa o caminho completo para o arquivo JSON
const filePath = path.join(__dirname, 'estados-cidades.json');
const flagFilePath = path.join(__dirname, 'script-rodado.txt');

// Conexão com o banco de dados
const connectionDataBase = new Sequelize(
    name,
    usu,
    password,
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        pool: {
            acquire: 60000 // 60 seconds 
        }
    }
);

module.exports = { connectionDataBase };

// Verificação do arquivo de flag
if (fs.existsSync(flagFilePath)) {
    console.log('Script já foi executado anteriormente. Saindo');
    return;
}

fs.writeFileSync(flagFilePath, '');

// Leitura do arquivo JSON
const { estados } = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log(estados);

// Iteração sobre cada estado e cidade no JSON e realização do insert
estados.forEach(estado => {
    estado.cidades.forEach(cidade => {
        const query = 'INSERT INTO tb_cidade (sg_estado, nm_cidade) VALUES (?, ?)';
        const valores = [estado.sigla, cidade];
        connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT })
            .then(result => {
                console.log(`Cidade ${cidade} do estado ${estado.sigla} inserida com sucesso.`);
            })
            .catch(err => {
                console.error(`Erro ao inserir cidade ${cidade} do estado ${estado.sigla}: ${err.message}`);
            });
    });
});
 
const profissionais = [
    ['João Silva', '12345678901', 'M', 30, '999999999', 'joao@exemplo.com', 'senha123', '2hGf9JkL3p'],
    ['Maria Souza', '98765432109', 'F', 25, '888888888', 'maria@exemplo.com', 'senha456', '5sRt8YbN6w'],
    ['Pedro Santos', '45678912356', 'M', 40, '777777777', 'pedro@exemplo.com', 'senha789', '9aZx3QcV1o'],
    ['Ana Oliveira', '65432198765', 'F', 35, '666666666', 'ana@exemplo.com', 'senha012', '4dFs7GhT2m'],
    ['Carlos Lima', '78912345603', 'M', 28, '555555555', 'carlos@exemplo.com', 'senha345', '8pLo5KjI9u'],
    ['Fernanda Oliveira', '12345678910', 'F', 32, '123456789', 'fernanda@exemplo.com', 'senha789', '7kLm5NjH8b'],
    ['Roberto Silva', '98765432101', 'M', 45, '234567890', 'roberto@exemplo.com', 'senha012', '3aZx7QwE9r'],
    ['Camila Santos', '45678912310', 'F', 29, '345678901', 'camila@exemplo.com', 'senha345', '6pLo4KjI7u'],
    ['Lucas Lima', '65432198701', 'M', 38, '456789012', 'lucas@exemplo.com', 'senha678', '2yHt5RfG8i'],
    ['Mariana Souza', '78912345610', 'F', 26, '101010101', 'mariana@exemplo.com', 'senha901', '1oKi6LjU7h'],
    ['Rafael Oliveira', '23456789012', 'M', 31, '111111111', 'rafael@exemplo.com', 'senha234', '0zXc3VbN6m'],
    ['Patricia Fernandes', '54321098723', 'F', 42, '222222222', 'patricia@exemplo.com', 'senha567', '9pLo1KjM4n'],
    ['Gustavo Silva', '43210987654', 'M', 27, '333333333', 'gustavo@exemplo.com', 'senha890', '8oKi2LjH9g'],
    ['Aline Santos', '32109876545', 'F', 34, '444444444', 'aline@exemplo.com', 'senha123', '5aZx6QwE7r'],
    ['Daniel Lima', '21098765436', 'M', 33, '678901234', 'daniel@exemplo.com', 'senha456', '4sDf8GhJ3k'],
    ['Fernando Oliveira', '10987654327', 'M', 39, '789012345', 'fernando@exemplo.com', 'senha789', '3pLo5KjI2u'],
    ['Larissa Silva', '09876543218', 'F', 28, '890123456', 'larissa@exemplo.com', 'senha012', '7hGt9YbN1m'],
    ['Matheus Santos', '98765432189', 'M', 36, '901234567', 'matheus@exemplo.com', 'senha345', '2mNj4KlO6b'],
    ['Beatriz Lima', '87654321098', 'F', 30, '012345678', 'beatriz@exemplo.com', 'senha678', '4lPo7KjI3u'],
    ['Vinicius Oliveira', '76543210987', 'M', 37, '101010103', 'vinicius@exemplo.com', 'senha901', '5vCn8MbL2s'],
    ['Nome de Profissional', '99999999998', 'M', 25, '222222224', 'sidequest@profissional.com', 'sidequest123', 'Hj7Kl3Mn9c']
];

const infoProfissional = [
    [1, 'Sou eletricista há 5 anos e tenho vasta experiência em instalações elétricas residenciais e comerciais.', 'Formado em Eletricidade pela Universidade XYZ.', 'Trabalhei em diversas empresas renomadas da área, onde pude aprimorar minhas habilidades.', 'Curso de Segurança em Instalações Elétricas, Curso Avançado de Eletricista Industrial.'],
    [2, 'Atuo como encanador há 8 anos, realizando serviços de conserto e instalação de sistemas hidráulicos.', 'Participei de diversos cursos de aprimoramento na área de encanamento e saneamento básico.', 'Trabalhei em projetos de grande porte, atendendo demandas tanto residenciais quanto comerciais.', 'Curso de Encanamento Avançado, Curso de Instalação de Sistemas de Água Quente.'],
    [3, 'Tenho experiência de 10 anos em construção e reforma, realizando obras de diversos portes e complexidades.', 'Graduado em Engenharia Civil pela Universidade ABC.', 'Atuei como gerente de obras em grandes projetos, coordenando equipes e garantindo a qualidade das entregas.', 'Pós-graduação em Gestão de Projetos de Construção, Curso de Orçamento e Planejamento de Obras.'],
    [4, 'Especializado em limpeza residencial e comercial, ofereço serviços de alta qualidade e confiabilidade.', 'Certificado em Técnicas Avançadas de Limpeza pela Escola XYZ.', 'Trabalho com produtos e equipamentos de última geração, garantindo resultados impecáveis aos meus clientes.', 'Curso de Limpeza Profissional, Workshop de Organização de Ambientes.'],
    [5, 'Atuo como jardineiro há 7 anos, oferecendo serviços de paisagismo e manutenção de áreas verdes.', 'Participei de cursos de jardinagem em instituições renomadas, aprimorando minhas técnicas e conhecimentos.', 'Já trabalhei em diversos projetos de paisagismo residencial e empresarial, criando ambientes únicos e harmoniosos.', 'Curso de Paisagismo Urbano, Workshop de Cuidados com Plantas Ornamentais.'],
    [6, 'Atuo como pintor há 6 anos, especializado em pintura residencial e comercial.', 'Curso de Pintura Decorativa pela Escola XYZ.', 'Participei de diversos projetos de pintura, garantindo acabamento de qualidade e satisfação dos clientes.', 'Curso Avançado de Técnicas de Pintura, Workshop de Cores e Harmonia.'],
    [7, 'Sou vidraceiro há 9 anos, realizando instalações e reparos em vidros com segurança e precisão.', 'Certificado em Instalação de Vidros Temperados pela Associação de Vidraceiros.', 'Trabalhei em empresas líderes do mercado, adquirindo experiência em diferentes tipos de projetos.', 'Curso de Corte e Modelagem de Vidros, Treinamento em Segurança em Altura.'],
    [8, 'Especializada em serviços de serralheria, ofereço soluções criativas e funcionais em ferro e alumínio.', 'Participei de cursos de soldagem e ferramentaria, aprimorando minhas habilidades técnicas.', 'Já executei projetos de grande porte, como fabricação de portões, grades e estruturas metálicas.', 'Curso de Soldagem Industrial, Workshop de Design em Serralheria.'],
    [9, 'Atuo como dedetizador há 7 anos, oferecendo serviços de controle de pragas urbanas com eficiência.', 'Certificado em Controle de Pragas pela Associação Nacional de Dedetizadores.', 'Trabalho com produtos seguros e eficazes, seguindo todas as normas de segurança e ambientais.', 'Curso de Manejo Integrado de Pragas, Treinamento em Aplicação de Inseticidas.'],
    [10, 'Especializado em mudanças residenciais e comerciais, ofereço serviços de transporte com segurança e agilidade.', 'Experiência de 8 anos no ramo de mudanças, atendendo clientes em diversas localidades.', 'Conto com equipe treinada e equipamentos adequados para garantir o sucesso de cada mudança.', 'Curso de Direção Defensiva, Treinamento em Embalagem e Proteção de Móveis.'],
    [11, 'Atuo como carpinteiro há 10 anos, realizando trabalhos de marcenaria fina e estrutural.', 'Formado em Carpintaria pela Escola de Artes e Ofícios.', 'Participei de projetos de construção civil, fabricando móveis planejados e estruturas de madeira.', 'Curso Avançado de Marcenaria, Workshop de Design de Móveis.'],
    [12, 'Sou montador de móveis há 6 anos, oferecendo serviços de montagem e instalação de móveis com qualidade.', 'Certificado em Montagem de Móveis pela Associação de Marceneiros.', 'Trabalhei em lojas de móveis e empresas de montagem, adquirindo experiência em diversos tipos de mobiliário.', 'Curso de Montagem de Móveis Planejados, Treinamento em Montagem de Móveis Corporativos'],
    [13, 'Atuo como pintor há 6 anos, especializado em pintura residencial e comercial.', 'Curso de Pintura Decorativa pela Escola XYZ.', 'Participei de diversos projetos de pintura, garantindo acabamento de qualidade e satisfação dos clientes.', 'Curso Avançado de Técnicas de Pintura, Workshop de Cores e Harmonia.'],
    [14, 'Sou vidraceiro há 9 anos, realizando instalações e reparos em vidros com segurança e precisão.', 'Certificado em Instalação de Vidros Temperados pela Associação de Vidraceiros.', 'Trabalhei em empresas líderes do mercado, adquirindo experiência em diferentes tipos de projetos.', 'Curso de Corte e Modelagem de Vidros, Treinamento em Segurança em Altura.'],
    [15, 'Especializada em serviços de serralheria, ofereço soluções criativas e funcionais em ferro e alumínio.', 'Participei de cursos de soldagem e ferramentaria, aprimorando minhas habilidades técnicas.', 'Já executei projetos de grande porte, como fabricação de portões, grades e estruturas metálicas.', 'Curso de Soldagem Industrial, Workshop de Design em Serralheria.'],
    [16, 'Atuo como marceneiro há 8 anos, especializado em móveis planejados e projetos sob medida.', 'Formado em Marcenaria pela Escola de Artes e Ofícios.', 'Trabalhei em marcenarias renomadas, desenvolvendo habilidades em design e fabricação de móveis.', 'Curso Avançado de Design de Móveis, Workshop de Marcenaria Fina.'],
    [17, 'Sou instalador de eletrodomésticos há 6 anos, realizando montagem e manutenção de diversos equipamentos.', 'Certificado em Instalação de Eletrodomésticos pela Associação de Eletrotécnicos.', 'Trabalhei em lojas especializadas e atuei como autônomo, garantindo a satisfação dos clientes.', 'Curso de Manutenção Preventiva de Eletrodomésticos, Treinamento em Instalação de Equipamentos de Cozinha.'],
    [18, 'Especializado em conserto de eletrodomésticos, ofereço serviços de reparo com qualidade e agilidade.', 'Experiência de 9 anos na área de assistência técnica.', 'Atendi clientes residenciais e comerciais, solucionando problemas em diversos tipos de aparelhos.', 'Curso de Reparo de Eletrodomésticos, Workshop de Manutenção de Equipamentos Eletrônicos.'],
    [19, 'Atuo como pedreiro há 10 anos, realizando serviços de alvenaria e acabamento em obras residenciais e comerciais.', 'Formado em Construção Civil pela Escola Técnica Estadual.', 'Participei de projetos de grande porte, contribuindo para a construção de edifícios e casas.', 'Curso Avançado de Alvenaria, Treinamento em Acabamento e Revestimento.'],
    [20, 'Especializada em limpeza de estofados, ofereço serviços de higienização e revitalização de móveis.', 'Certificado em Limpeza de Estofados pela Associação de Limpeza Profissional.', 'Utilizo técnicas e produtos específicos para garantir a remoção de manchas e odores indesejados.', 'Curso de Higienização de Estofados, Treinamento em Remoção de Manchas e Odores.']
]; 

const clientes = [
    ['Ana Costa', '12345678901', 'F', 35, '111111111', 'ana.costa@exemplo.com', 'senha123', 'Rt5YnHjK2p'],
    ['Pedro Fernandes', '98765432109', 'M', 28, '222222222', 'pedro.fernandes@exemplo.com', 'senha456', 'Lm9Zx8Cv3b'],
    ['Carla Oliveira', '45678912356', 'F', 40, '333333333', 'carla.oliveira@exemplo.com', 'senha789', 'Qw4ErTg7Uy'],
    ['Ricardo Santos', '65432198765', 'M', 25, '444444444', 'ricardo.santos@exemplo.com', 'senha012', 'Po2Iu6Yt9r'],
    ['Juliana Lima', '78912345603', 'F', 30, '555555555', 'juliana.lima@exemplo.com', 'senha345', 'Hj8Bn5Ml3k'],
    ['Fernanda Oliveira', '12312312312', 'F', 25, '777777777', 'fernanda@exemplo.com', 'senha123', 'Gh3Df6Hj1k'],
    ['Marcos Silva', '45645645645', 'M', 30, '888888888', 'marcos@exemplo.com', 'senha456', 'Bn8Jk2Lm4p'],
    ['Roberta Santos', '78978978978', 'F', 35, '999999999', 'roberta@exemplo.com', 'senha789', 'Yt1Rv4Xc7z'],
    ['Lucas Souza', '98798798798', 'M', 28, '1010101010', 'lucas@exemplo.com', 'senha012', 'Np5Tg8Uy2w'],
    ['Mariana Lima', '65465465465', 'F', 23, '1111111111', 'mariana@exemplo.com', 'senha345', 'Jk9Pq3Ws6x'],
    ['Gustavo Oliveira', '32132132132', 'M', 40, '1212121212', 'gustavo@exemplo.com', 'senha678', 'Zx4Ec7Vb9n'],
    ['Carolina Fernandes', '98798798799', 'F', 29, '1313131313', 'carolina@exemplo.com', 'senha987', 'Rt6Yh2Nj5m'],
    ['Gabriel Silva', '12345678900', 'M', 27, '1414141414', 'gabriel@exemplo.com', 'senha654', 'Wq3As7Df9g'],
    ['Beatriz Santos', '98765432101', 'F', 32, '1515151515', 'beatriz@exemplo.com', 'senha321', 'Tk8Yh5Fg2b'],
    ['Rafaela Souza', '12312345678', 'F', 26, '1616161616', 'rafaela@exemplo.com', 'senha234', 'Hj7Kl3Mn9z'],
    ['Nome de Cliente', '99999999999', 'M', 25, '1717171717', 'sidequest@cliente.com', 'sidequest123', 'Hj7Kl3Mn9a']
];

const categorias = [
    'Elétrica',
    'Encanamento',
    'Construção e Reforma',
    'Limpeza',
    'Jardinagem',
    'Marcenaria',
    'Carpintaria',
    'Montagem de Móveis',
    'Instalação de Eletrodomésticos',
    'Conserto de Eletrodomésticos',
    'Mudanças',
    'Pintura',
    'Alvenaria',
    'Vidraçaria',
    'Serralheria',
    'Limpeza de Estofados',
    'Serviços de Piscina',
    'Serviços de Dedetização'
];

const profissionaisCategorias = [
    [1, 1], // João Silva - Elétrica
    [1, 6], // João Silva - Marcenaria
    [2, 2], // Maria Souza - Encanamento
    [2, 4], // Maria Souza - Limpeza
    [3, 3], // Pedro Santos - Construção e Reforma
    [3, 5], // Pedro Santos - Jardinagem
    [4, 4], // Ana Oliveira - Limpeza
    [4, 13], // Ana Oliveira - Alvenaria
    [5, 5], // Carlos Lima - Jardinagem
    [5, 3], // Carlos Lima - Construção e Reforma
    [6, 12], // Fernanda Oliveira - Pintura
    [6, 7], // Fernanda Oliveira - Carpintaria
    [7, 14], // Roberto Silva - Vidraçaria
    [7, 8], // Roberto Silva - Montagem de Móveis
    [8, 8], // Camila Santos - Montagem de Móveis
    [8, 6], // Camila Santos - Marcenaria
    [9, 17], // Lucas Lima - Serviços de Dedetização
    [9, 10], // Lucas Lima - Conserto de Eletrodomésticos
    [10, 11], // Mariana Souza - Mudanças
    [10, 14], // Mariana Souza - Vidraçaria
    [11, 7], // Rafael Oliveira - Carpintaria
    [11, 1], // Rafael Oliveira - Elétrica
    [12, 8], // Patricia Fernandes - Montagem de Móveis
    [12, 3], // Patricia Fernandes - Construção e Reforma
    [13, 12], // Gustavo Silva - Pintura
    [13, 5], // Gustavo Silva - Jardinagem
    [14, 14], // Aline Santos - Vidraçaria
    [14, 15], // Aline Santos - Serralheria
    [15, 15], // Daniel Lima - Serralheria
    [15, 16], // Daniel Lima - Limpeza de Estofados
    [16, 6], // Fernando Oliveira - Marcenaria
    [16, 12], // Fernando Oliveira - Pintura
    [17, 9], // Larissa Silva - Instalação de Eletrodomésticos
    [17, 17], // Larissa Silva - Serviços de Dedetização
    [18, 10], // Matheus Santos - Conserto de Eletrodomésticos
    [18, 9], // Matheus Santos - Instalação de Eletrodomésticos
    [19, 13], // Beatriz Lima - Alvenaria
    [19, 4], // Beatriz Lima - Limpeza
    [20, 16], // Vinicius Oliveira - Limpeza de Estofados
    [20, 13], // Vinicius Oliveira - Alvenaria
    [21, 4], // Nome de Profissional - Limpeza
    [21, 1]  // Nome de Profissional - Elétrica
];

const enderecos = [
    [1, 5356, 'Rua das Flores', '12345678', 'Centro', 123],
    [2, 5383, 'Avenida dos Girassóis', '23456789', 'Jardim', 456],
    [3, 5025, 'Rua das Palmeiras', '34567890', 'Vila', 789],
    [4, 4962, 'Alameda das Acácias', '45678901', 'Campo', 1011],
    [5, 5356, 'Travessa dos Lírios', '56789012', 'Sítio', 1213],
    [6, 6, 'Rua da Mata', '11700000', 'Floresta', 1415],
    [7, 7, 'Avenida das Flores', '11800000', 'Centro', 1617],
    [8, 8, 'Rua dos Coqueiros', '11900000', 'Praia', 1819],
    [9, 9, 'Avenida da Paz', '12000000', 'Centro', 2021],
    [10, 10, 'Rua da Amizade', '12100000', 'Centro', 2223],
    [11, 1, 'Avenida dos Sonhos', '11000000', 'Centro', 2425],
    [12, 2, 'Rua das Estrelas', '11300000', 'Centro', 2627],
    [13, 3, 'Avenida do Sol', '11400000', 'Praia', 2829],
    [14, 4, 'Rua do Mar', '11500000', 'Jardim', 3031],
    [15, 5, 'Avenida da Lua', '11600000', 'Centro', 3233]
];

const postagensServico = [
    [1, 1, 1, 'Instalação de lâmpadas', 'Instalação de Lâmpadas'],
    [2, 2, 2, 'Conserto de encanamento', 'Conserto de Encanamento'],
    [3, 3, 3, 'Reforma de cozinha', 'Reforma de Cozinha'],
    [4, 4, 4, 'Limpeza residencial', 'Limpeza Residencial'],
    [5, 5, 5, 'Manutenção de jardim', 'Manutenção de Jardim'],
    [6, 1, 6, 'Troca de tomadas', 'Troca de Tomadas'],
    [7, 2, 7, 'Instalação de tubulação', 'Instalação de Tubulação'],
    [8, 3, 8, 'Construção de edícula', 'Construção de Edícula'],
    [9, 4, 9, 'Limpeza comercial', 'Limpeza Comercial'],
    [10, 5, 10, 'Paisagismo residencial', 'Paisagismo Residencial'],
    [11, 1, 11, 'Manutenção elétrica', 'Manutenção Elétrica'],
    [12, 2, 12, 'Desentupimento de canos', 'Desentupimento de Canos'],
    [13, 3, 13, 'Reforma de banheiro', 'Reforma de Banheiro'],
    [14, 4, 14, 'Limpeza de carpetes', 'Limpeza de Carpetes'],
    [15, 5, 15, 'Podas de árvores', 'Podas de Árvores'],
    [1, 2, 2, 'Conserto de vazamento', 'Conserto de Vazamento'],
    [2, 3, 3, 'Construção de deck', 'Construção de Deck'],
    [3, 4, 4, 'Limpeza pós-obra', 'Limpeza Pós-Obra'],
    [4, 5, 5, 'Corte de grama', 'Corte de Grama'],
    [5, 1, 6, 'Instalação de chuveiro', 'Instalação de Chuveiro'],
    [6, 2, 7, 'Conserto de torneira', 'Conserto de Torneira'],
    [7, 3, 8, 'Pintura de fachada', 'Pintura de Fachada'],
    [8, 4, 9, 'Limpeza de escritório', 'Limpeza de Escritório'],
    [9, 5, 10, 'Manutenção de plantas', 'Manutenção de Plantas'],
    [10, 1, 11, 'Troca de disjuntor', 'Troca de Disjuntor'],
    [11, 2, 12, 'Reparo de esgoto', 'Reparo de Esgoto'],
    [12, 3, 13, 'Instalação de banheira', 'Instalação de Banheira'],
    [13, 4, 14, 'Limpeza de sofás', 'Limpeza de Sofás'],
    [14, 5, 15, 'Adubação de jardim', 'Adubação de Jardim'],
    [15, 2, 2, 'Reparo de esgoto', 'Reparo de Esgoto'],
    [1, 1, 1, 'Instalação de painel solar', 'Instalação de Painel Solar'],
    [2, 1, 2, 'Reparo de fiação elétrica', 'Reparo de Fiação Elétrica'],
    [3, 1, 3, 'Instalação de sistema de segurança', 'Instalação de Sistema de Segurança'],
    [4, 2, 4, 'Instalação de aquecedor de água', 'Instalação de Aquecedor de Água'],
    [5, 2, 5, 'Manutenção de encanamento', 'Manutenção de Encanamento'],
    [6, 2, 6, 'Reparo de vazamentos', 'Reparo de Vazamentos']
];

const confirmacoesServico = [
    [1, 1, "1994-01-01"],
    [2, 2, "1848-02-02"],
    [3, 3, "1931-03-03"],
    [4, 4, "1968-04-04"],
    [5, 5, "1961-05-05"],
    [6, 6, "1944-06-06"],
    [7, 7, "2005-07-07"],
    [8, 8, "1945-08-08"],
    [9, 9, "1948-09-09"],
    [10, 10, "1911-10-10"],
    [11, 11, "1918-11-11"],
    [12, 12, "1963-12-12"],
    [13, 13, "1914-06-28"],
    [14, 14, "1789-07-14"],
    [15, 15, "1947-08-15"],
    [16, 16, "1969-07-16"],
    [17, 17, "1989-10-17"],
    [18, 18, "1906-04-18"],
    [19, 19, "1536-05-19"],
    [20, 20, "1969-07-20"],
    [21, 1, "1936-09-21"],
    [22, 2, "1963-11-22"],
    [23, 3, "2001-03-23"],
    [24, 4, "1929-10-24"],
    [25, 5, "1991-12-25"],
    [26, 6, "1986-04-26"],
    [27, 7, "1945-01-27"],
    [28, 8, "1914-06-28"],
    [29, 9, "1929-10-29"],
    [30, 10, "1945-04-30"],
];

const terminosServico = [
    [1, '2024-03-20'],
    [2, '2024-03-21'],
    [3, '2024-03-22'],
    [4, '2024-03-23'],
    [5, '2024-03-24'],
    [6, '2024-03-25'],
    [7, '2024-03-26'],
    [8, '2024-03-27'],
    [9, '2024-03-28'],
    [10, '2024-03-29'],
    [11, '2024-03-30'],
    [12, '2024-03-31'],
    [13, '2024-04-01'],
    [14, '2024-04-02'],
    [15, '2024-04-03'],
    [16, '2024-04-04'],
    [17, '2024-04-05'],
    [18, '2024-04-06'],
    [19, '2024-04-07'],
    [20, '2024-04-08'],
    [21, '2024-04-09'],
    [22, '2024-04-10'],
    [23, '2024-04-11'],
    [24, '2024-04-12'],
    [25, '2024-04-13'],
    [26, '2024-04-14'],
    [27, '2024-04-15'],
    [28, '2024-04-16'],
    [29, '2024-04-17'],
    [30, '2024-04-18'],
];

const avaliacoes = [
    [1, 5, 'Excelente trabalho! Recomendo.'],
    [2, 1, 'Profissional extremamente limitada.'],
    [3, 3, 'Trabalho satisfatório, mas houve atrasos.'],
    [4, 4, 'Excelente trabalho, profissional pontual e eficiente.'],
    [5, 3, 'Bom serviço, porém houve atraso na entrega.'],
    [6, 5, 'Serviço impecável, profissional muito habilidoso.'],
    [7, 4, 'Profissional muito atencioso, serviço de qualidade.'],
    [8, 5, 'Superou minhas expectativas, trabalho de alta qualidade.'],
    [9, 3, 'Serviço satisfatório, mas houve alguns contratempos.'],
    [10, 4, 'Profissional dedicado e competente, recomendo.'],
    [11, 5, 'Excelente serviço, profissional muito experiente.'],
    [12, 4, 'Trabalho bem feito, profissional muito comprometido.'],
    [13, 3, 'Alguns detalhes poderiam ter sido melhorados.'],
    [14, 4, 'Boa experiência, profissional eficiente.'],
    [15, 5, 'Serviço de primeira, profissional muito prestativo.'],
    [16, 4, 'Profissional competente, trabalho entregue dentro do prazo.'],
    [17, 5, 'Melhor serviço que já contratei, profissional muito habilidoso.'],
    [18, 3, 'Serviço razoável, esperava um pouco mais de qualidade.'],
    [19, 4, 'Profissional educado e atencioso, serviço bem executado.'],
    [20, 5, 'Sem dúvidas, contrataria novamente, serviço excelente.'],
    [21, 4, 'Trabalho de qualidade, profissional muito responsável.'],
    [22, 5, 'Profissional extremamente competente, serviço perfeito.'],
    [23, 3, 'Algumas falhas, mas no geral foi satisfatório.'],
    [24, 4, 'Bom serviço, profissional comprometido.'],
    [25, 5, 'Serviço excepcional, profissional muito capacitado.'],
    [26, 4, 'Trabalho bem feito, profissional dedicado.'],
    [27, 5, 'Experiência incrível, profissional muito talentoso.'],
    [28, 3, 'Serviço aceitável, esperava um pouco mais.'],
    [29, 4, 'Profissional competente, recomendo.'],
    [30, 5, 'Superou minhas expectativas, serviço de alta qualidade.'],
];

// Função para inserir os profissionais no banco de dados
async function inserirProfissionais() {
    try {
        for (const profissional of profissionais) {
            const hashedPassword = await bcrypt.hash(profissional[6], 8);
            const query = 'INSERT INTO tb_profissional (nm_profissional, cd_cpfProfissional, sg_sexoProfissional, qt_idadeProfissional, nmr_telefoneProfissional, cd_emailProfissional, cd_senhaProfissional, cd_tokenProfissional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const valores = [...profissional.slice(0, 6), hashedPassword, profissional[7]];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Profissional ${profissional[0]} inserido com sucesso.`);
        }
        await inseririnfoProfissionais();
    } catch (error) {
        console.error('Erro ao inserir os profissionais:', error);
    }
}

async function inseririnfoProfissionais() {
    try {
        for (const info of infoProfissional) {
            const query = 'INSERT INTO tb_infoProfissional (id_profissional, ds_biografia, ds_curriculo, ds_historicoProfissional, ds_formacoes) VALUES (?, ?, ?, ?, ?)';
            const valores = [...info];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Informações do Profissional ${info[0]} inseridas com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as informações dos profissionais:', error);
    }
}

async function inserirClientes() {
    try {
        for (const cliente of clientes) {
            const hashedPassword = await bcrypt.hash(cliente[6], 8);
            const query = 'INSERT INTO tb_cliente (nm_cliente, cd_cpfCliente, sg_sexoCliente, qt_idadeCliente, nmr_telefoneCliente, cd_emailCliente, cd_senhaCliente, cd_tokenCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const valores = [...cliente.slice(0, 6), hashedPassword, cliente[7]];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Cliente ${cliente[0]} inserido com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir os clientes:', error);
    }
    
}

async function removerSexoIdadeNomeExemplo() {
    try {
        const queryCliente = 'UPDATE tb_cliente SET sg_sexoCliente = NULL, qt_idadeCliente = NULL WHERE nm_cliente = ?';
        const queryProfissional = 'UPDATE tb_profissional SET sg_sexoProfissional = NULL, qt_idadeProfissional = NULL WHERE nm_profissional = ?';
        const valoresCliente = ['Nome de Cliente'];
        const valoresProfissional = ['Nome de Profissional'];

        const [resultsCliente, metadataCliente] = await connectionDataBase.query(queryCliente, { replacements: valoresCliente, type: QueryTypes.UPDATE });
        if (metadataCliente.affectedRows > 0) {
            console.log('Sexo e idade do cliente "Nome de Cliente" removidos com sucesso.');
        } else {
            console.log('Cliente "Nome de Cliente" não encontrado.');
        }

        const [resultsProfissional, metadataProfissional] = await connectionDataBase.query(queryProfissional, { replacements: valoresProfissional, type: QueryTypes.UPDATE });
        if (metadataProfissional.affectedRows > 0) {
            console.log('Sexo e idade do profissional "Nome de Profissional" removidos com sucesso.');
        } else {
            console.log('Profissional "Nome de Profissional" não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o cliente ou profissional "Nome de Exemplo":', error);
    }
}

async function inserirCategorias() {
    try {
        for (const categoria of categorias) {
            const query = 'INSERT INTO tb_categoria (ds_categoria) VALUES (?)';
            const valores = [categoria];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Categoria '${categoria}' inserida com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as categorias:', error);
    }
}

async function inserirProfissionaisCategorias() {
    try {
        for (const [idProfissional, idCategoria] of profissionaisCategorias) {
            const query = 'INSERT INTO tb_profissional_categoria (id_profissional, id_categoria) VALUES (?, ?)';
            const valores = [idProfissional, idCategoria];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Profissional ${idProfissional} com categoria ${idCategoria} inserido com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir os profissionais com categorias:', error);
    }
}

async function inserirEnderecos() {
    try {
        for (const endereco of enderecos) {
            const query = 'INSERT INTO tb_endereco (id_cliente, id_cidade, nm_logradouro, cd_cep, nm_bairro, nmr_casa) VALUES (?, ?, ?, ?, ?, ?)';
            const valores = [...endereco];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Endereço do cliente ${endereco[0]} inserido com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir os endereços:', error);
    }
}

async function inserirPostagensServico() {
    try {
        for (const postagem of postagensServico) {
            const query = 'INSERT INTO tb_postagemServico (id_cliente, id_categoria, id_endereco, ds_servico, ds_titulo) VALUES (?, ?, ?, ?, ?)';
            const valores = [...postagem];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Postagem de serviço ${postagem[0]} inserida com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as postagens de serviço:', error);
    }
}

async function inserirConfirmacoesServico() {
    try {
        for (const confirmacao of confirmacoesServico) {
            const query = 'INSERT INTO tb_confirmacaoServico (id_postagemServico, id_profissional, dt_inicioServico) VALUES (?, ?, ?)';
            const valores = [...confirmacao];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Confirmação de serviço ${confirmacao[0]} inserida com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as confirmações de serviço:', error);
    }
}

async function inserirTerminosServico() {
    try {
        for (const termino of terminosServico) {
            const query = 'INSERT INTO tb_terminoServico (id_confirmacaoServico, dt_terminoServico) VALUES (?, ?)';
            const valores = [...termino];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Término de serviço ${termino[0]} inserido com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir os términos de serviço:', error);
    }
}

async function inserirAvaliacoes() {
    try {
        for (const avaliacao of avaliacoes) {
            const query = 'INSERT INTO tb_avaliacao (id_terminoServico, nmr_avaliacao, ds_comentario) VALUES (?, ?, ?)';
            const valores = [...avaliacao];
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });
            console.log(`Avaliação ${avaliacao[0]} inserida com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as avaliações:', error);
    }
}

// Função principal para inserir todos os dados sequencialmente
async function inserirTodosDados() {
    await inserirProfissionais();
    await inserirCategorias();
    await inserirProfissionaisCategorias();
    await inserirClientes();
    await removerSexoIdadeNomeExemplo();
    await inserirEnderecos();
    await inserirPostagensServico();
    await inserirConfirmacoesServico();
    await inserirTerminosServico();
    await inserirAvaliacoes();
}

// Chamando a função principal
inserirTodosDados().catch(console.error);