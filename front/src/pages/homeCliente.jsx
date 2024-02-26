import React from 'react'
import NavbarCliente from '../components/navbarCliente'

const homeCliente = () => {
  return (
    <div>
      <NavbarCliente/>

      <div class="content-midia">
        <div class="menu-profissionais">
            <div class="menu-topo">
                <div class="actions">
                    <div class="info-action">
                        <p>Adicionar serviço</p>
                        <div class="action">
                            <p>Publique um serviço e receba orçamentos</p>
                            <img src="../img/aproved.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <div class="info-action">
                        <p>Serviços Ativos</p>
                        <div class="action">
                            <p>Você possui 3 serviços ativos</p>
                            <img src="../img/reload.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <div class="info-action">
                        <p>Serviços Pendentes</p>
                        <div class="action">
                            <p>Vizualize os serviços pendentes</p>
                            <img src="../img/calendario1.png" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <h1>Encontre os melhores profissionais para seu problema</h1>


            <div class="input-filtros">
                <div class="content-input">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="busque por serviços" />
                </div>
                <div class="filtros">
                    <p>Filtros</p>
                    <i class="fa-solid fa-sliders"></i>
                </div>
            </div>

            <section class="area-servicos">
                <div class="card-servico">
                    <div class="tamplate-img">
                        <img src="../img/icone-perfil.png" alt="Imagem de perfil">
                    </div>
                    <div class="desc-cliente">
                        <div class="perfil-avaliado">
                            <h2>Default<h2>
                            <div class="stars">
                                <i class="ri-star-s-fill ava"></i>
                                <i class="ri-star-s-fill ava"></i>
                                <i class="ri-star-s-fill ava"></i>
                                <i class="ri-star-s-fill ava"></i>
                                <i class="ri-star-s-fill"></i>
                            </div>
                        </div>
                        <div class="emblemas">
                            <img src="../img/medalha10k.png" alt="Medalha 10k">
                            <img src="../img/medalhaouro.png" alt="Medalha de Ouro">
                            <img src="../img/medelhabronze.png" alt="Medalha de Bronze">
                        </div>
                        <div class="content-desc">
                            <p class="desc" id="maix">
                                Eu sou um eletricista formado pela FATEC e tenho 5 anos de experiência em instalações
                                elétricas e manutenção. Sou especializado em reparos elétricos residenciais e
                                comerciais,
                                incluindo a instalação de novos sistemas elétricos, reparos de fiação e iluminação.
                            </p>
                            <span class="vma-vme" onclick="verMaisEMenos()">ver mais</span>
                        </div>
                    </div>
                    <div class="contrate">
                        <button class="btn-contratar">Contratar</button>
                        <div class="serv-realizados">
                            <img src="../img/certificado.png" alt="certificado">
                            <p>Serviços realizados: 964984</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    </div>
  )
}

export default homeCliente
