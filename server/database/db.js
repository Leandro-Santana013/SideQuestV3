const { password, name, usu } = require("../config/connectInfo.js")
const { Sequelize, QueryTypes } = require("sequelize")
const bcrypt = require('bcrypt');

const connectionDataBase = new Sequelize(
    name, // Nome do banco de dados
    usu, // Nome de usuário
    password, // Senha
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        // Definindo o tempo limite de requisição de conexão para 60 segundos (em milissegundos)
        pool: {
            acquire:  60000000
        }
    }
); 

module.exports = { connectionDataBase }

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
 
// Construa o caminho completo para o arquivo JSON
const filePath = path.join(__dirname, 'estados-cidades.json');
const flagFilePath = path.join(__dirname, 'script-rodado.txt');

// Verificação do arquivo de flag
if (fs.existsSync(flagFilePath)) {
  console.log('Script já foi executado anteriormente. Saindo');
  return;
}

fs.writeFileSync(flagFilePath, '');

// Leitura do arquivo JSON
const { estados } = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log(estados); // Adicione esta linha para verificar o conteúdo

// Conexão com o MySQL
const conexao = connectionDataBase;

// Iteração sobre cada estado e cidade no JSON e realização do insert
estados.forEach(estado => {
    estado.cidades.forEach(cidade => {
        // Substitua os valores das colunas pelos campos correspondentes no seu JSON
        const query = 'INSERT INTO tb_cidade (sg_estado, nm_cidade) VALUES (?, ?)';
        const valores = [estado.sigla, cidade];

        // Execução da query
        conexao.query(query, { replacements: valores, type: QueryTypes.INSERT })
            .then(result => {
                console.log(`{Cidade ${cidade} do estado ${estado.sigla} inserida com sucesso.}`);
            })
            .catch(err => {
                console.error(`Erro ao inserir cidade ${cidade} do estado ${estado.sigla}: ${err.messag}`);
            });
    });
});

// Array com os dados dos profissionais
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
    ['Vinicius Oliveira', '76543210987', 'M', 37, '101010103', 'vinicius@exemplo.com', 'senha901', '5vCn8MbL2s']
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

// Array com os dados dos clientes
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
    ['Rafaela Souza', '12312345678', 'F', 26, '1616161616', 'rafaela@exemplo.com', 'senha234', 'Hj7Kl3Mn9z']
];

// Função para inserir os profissionais no banco de dados
// Função para inserir os profissionais no banco de dados
async function inserirProfissionais() {
    try {
        // Iterando sobre cada profissional
        for (const profissional of profissionais) {
            // Hash da senha usando bcrypt
            const hashedPassword = await bcrypt.hash(profissional[6], 8); // 10 é o número de rounds de hashing

            // Substitua os valores das colunas pelos campos correspondentes no seu array de profissionais,
            // incluindo o hash da senha no lugar da senha em texto plano
            const query = 'INSERT INTO tb_profissional (nm_profissional, cd_cpfProfissional, sg_sexoProfissional, qt_idadeProfissional, nmr_telefoneProfissional, cd_emailProfissional, cd_senhaProfissional, cd_tokenProfissional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const valores = [...profissional.slice(0, 6), hashedPassword, profissional[7]];

            // Execução da query
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });

            console.log(`Profissional ${profissional[0]} inserido com sucesso.`);
        }

        // Após a inserção dos profissionais, chama a função para inserir as informações dos profissionais
        await inseririnfoProfissionais();
    } catch (error) {
        console.error('Erro ao inserir os profissionais:', error);
    }
}


async function inseririnfoProfissionais() {
    try {
        // Iterando sobre cada profissional
        for (const info of infoProfissional) {
            // Substitua os valores das colunas pelos campos correspondentes no seu array de informações de profissionais
            const query = 'INSERT INTO tb_infoProfissional (id_profissional, ds_biografia, ds_curriculo, ds_historicoProfissional, ds_formacoes) VALUES (?, ?, ?, ?, ?)';
            const valores = [...info];

            // Execução da query
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });

            console.log(`Informações do Profissional ${info[0]} inseridas com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir as informações dos profissionais:', error);
    }
}


// Função para inserir os clientes no banco de dados
async function inserirClientes() {
    try {
        // Iterando sobre cada cliente
        for (const cliente of clientes) {
            // Hash da senha usando bcrypt
            const hashedPassword = await bcrypt.hash(cliente[6], 8); // 10 é o número de rounds de hashing

            // Substitua os valores das colunas pelos campos correspondentes no seu array de clientes,
            // incluindo o hash da senha no lugar da senha em texto plano
            const query = 'INSERT INTO tb_cliente (nm_cliente, cd_cpfCliente, sg_sexoCliente, qt_idadeCliente, nmr_telefoneCliente, cd_emailCliente, cd_senhaCliente, cd_tokenCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const valores = [...cliente.slice(0, 6), hashedPassword, cliente[7]];

            // Execução da query
            await connectionDataBase.query(query, { replacements: valores, type: QueryTypes.INSERT });

            console.log(`Cliente ${cliente[0]} inserido com sucesso.`);
        }
    } catch (error) {
        console.error('Erro ao inserir os clientes:', error);
    }
}

// Chamada da função para inserir os profissionais
inserirProfissionais();

// Chamada da função para inserir os clientes
inserirClientes();
