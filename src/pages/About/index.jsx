import React from 'react';

import {
    Grid,
    Card,
    CardContent
} from '@material-ui/core';

import iot from '../../assets/iot.png';
import smartcity from '../../assets/cidade-inteligente.png';
import smartphone from '../../assets/smartphone.png';
import comunicacao from '../../assets/comunicacao.png';
import gestao from '../../assets/gestao.png';
import { classes } from './styles';

export default function About() {

    return (
        <Card style={classes.root}>
            <CardContent >
                <Grid container spacing={10} justify='center' alignItems='center'>

                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} alignItems='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h2 style={classes.textTitle}>
                                Comunicação direta com a prefeitura de Canaã dos Carajás
                            </h2>

                            <div style={classes.content}>
                                O Conecta Canaã foi concebido para viabilizar um canal de comunicação
                                direto entre os cidadãos e a Prefeitura de Canaã dos Carajás.Através
                                deste canal, você pode solicitar serviços à Prefeitura, registrando
                                ocorrências, como por exemplo, falta de iluminação pública, despejo
                                de entulho / lixo em local inapropriado, necessidade de serviço de
                                atendimento móvel de urgência - SAMU.
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img
                                style={classes.image}
                                src={comunicacao}
                                alt=""
                            />
                        </Grid>
                    </Grid>


                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} alignItems='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img
                                style={classes.image}
                                src={smartphone}
                                alt=""
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h2 style={classes.textTitle}>
                                Agilidade para solicitar serviços e consultar seu andamento
                            </h2>

                            <div style={classes.content}>
                                Pelo aplicativo móvel do Conecta Canaã instalado em seu smartphone,
                                você pode em poucos minutos solicitar serviços à Prefeitura, registrando
                                ocorrências, passando informações do tipo de serviço necessário, do local
                                e também enviando foto. As ocorrências ficam registradas no aplicativo e
                                você pode acompanhar se a Prefeitura já atendeu sua solicitação.
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} alignItems='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h2 style={classes.textTitle}>
                                Gestão eficiente das ocorrências registradas
                            </h2>

                            <div style={classes.content}>
                                As ocorrências realizadas serão recebidas pela Prefeitura em um sistema
                                Web, a partir do qual é possível realizar a gerência dos serviços solicitados,
                                alocando responsáveis para atendimento das solicitações, dando resposta ao
                                cidadão sobre o serviço solicitado e visualizando estatísticas de ocorrências
                                por bairro, período, etc.
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img
                                style={classes.image}
                                src={gestao}
                                alt=""
                            />
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} alignItems='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img
                                style={classes.image}
                                src={smartcity}
                                alt=""
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h2 style={classes.textTitle}>
                                Tornando Canaã dos Carajás uma cidade Inteligente
                            </h2>

                            <div style={classes.content}>
                                O Conecta Canaã foi desenvolvido no âmbito do projeto que visa a implantação
                                e gestão de uma plataforma de Cidades Inteligentes baseada em Internet das
                                Coisas(IoT) para o Município de Canaã dos Carajás, o qual é realizado por meio
                                de parceria entre a Prefeitura de Canaã dos Carajás e a Universidade Federal do
                                Pará. O projeto contempla as principais áreas do cotidiano da cidade, como:
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} alignItems='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div style={classes.content}>
                                <ul>
                                    <li>
                                        Saúde Pública: aplicações em home - care, monitoramento de doenças
                                        negligenciadas, telemedicina e segunda opinião médica;
                                    </li>

                                    <li>
                                        Segurança Pública: monitoramento da cidade por câmeras, drones e
                                        inteligência artificial;
                                    </li>

                                    <li>
                                        Educação: integração de serviços da rede pública municipal,
                                        Educação a Distância, integração com o Polo Universitário de Canaã
                                        dos Carajás;
                                    </li>

                                    <li>
                                        Meio Ambiente: monitoramento de qualidade do ar, água, mineração
                                        e poluentes.
                                    </li>
                                </ul>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img
                                style={classes.image}
                                src={iot}
                                alt=""
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};
