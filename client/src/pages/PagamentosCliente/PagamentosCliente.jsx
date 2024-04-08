import { SidebarCliente, Header } from "../../components/"
import "./PagamentosCliente.css"
import imgPerfil from "../../assets/icone-perfil.png"

const PagamentosCliente = () => {
    return (
        <>
            <Header />
            <SidebarCliente />
            <div className="content-midia">
                <div className="conteudo-pagamento">
                    <div className="pag-pesq">
                        <h2>Pagamentos</h2>
                        <div className="input-procurar">
                            <input type="text" placeholder="procurar" />
                                <i className="ri-search-line"></i>
                        </div>
                    </div>

                    <div className="area-pagamento">
                        <div className="pagamentos">
                            <div className="pag-cabecalho">
                                <div className="alinhadorPag">
                                    <p>Usuário</p>
                                </div>
                                <div className="alinhadorPag">
                                    <p>Data</p>
                                </div>
                                <div className="alinhadorPag">
                                    <p>Método de pagamento</p>
                                </div>
                                <div className="alinhadorPag">
                                    <p>Status</p>
                                </div>
                                <div className="alinhadorPag">
                                    <p>Valor</p>
                                </div>
                            </div>

                            <div className="card-pagamento">
                                <div className="alinhadorPag">
                                    <div className="info-prof-pag">
                                        <img src={imgPerfil} alt="imagem de perfil" />
                                            <p>Vitor Roque</p>
                                    </div>
                                </div>

                                <div className="alinhadorPag">
                                    <p>10/02/2020 15:00h</p>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="met-pag">
                                        <i className="ri-file-text-fill"></i>
                                        <p>Boleto</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="stt2">
                                        <p>Não pago</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <p>R$900,90</p>
                                </div>
                            </div>

                            <div className="card-pagamento">
                                <div className="alinhadorPag">
                                    <div className="info-prof-pag">
                                        <img src={imgPerfil} alt="imagem de perfil" />
                                            <p>João Kleber</p>
                                    </div>
                                </div>

                                <div className="alinhadorPag">
                                    <p>21/08/2020 20:00h</p>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="met-pag">
                                        <i className="ri-bank-card-fill"></i>
                                        <p>Cartão de crédito</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="status">
                                        <p>Pago</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <p>R$300,30</p>
                                </div>
                            </div>

                            <div className="card-pagamento">
                                <div className="alinhadorPag">
                                    <div className="info-prof-pag">
                                        <img src={imgPerfil} alt="imagem de perfil" />
                                            <p>João Kleber</p>
                                    </div>
                                </div>

                                <div className="alinhadorPag">
                                    <p>21/08/2020 20:00h</p>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="met-pag">
                                        <i className="ri-bank-card-fill"></i>
                                        <p>Cartão de crédito</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="status">
                                        <p>Pago</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <p>R$300,30</p>
                                </div>
                            </div>

                            <div className="card-pagamento">
                                <div className="alinhadorPag">
                                    <div className="info-prof-pag">
                                        <img src={imgPerfil} alt="imagem de perfil" />
                                            <p>João Kleber</p>
                                    </div>
                                </div>

                                <div className="alinhadorPag">
                                    <p>21/08/2020 20:00h</p>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="met-pag">
                                        <i className="ri-bank-card-fill"></i>
                                        <p>Cartão de crédito</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <div className="status">
                                        <p>Pago</p>
                                    </div>
                                </div>

                                <div className=" alinhadorPag">
                                    <p>R$300,30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PagamentosCliente