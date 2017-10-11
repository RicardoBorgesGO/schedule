/**
 * Created by ricardo on 27/03/17.
 */
/**
 * https://github.com/bpampuch/pdfmake/issues/24
 *
 *
 *
 */

var courseData;

function buildTableBody(data, columns) {
    var body = [];
    var dataRowHeader = [];

    columns.forEach(function(column) {
        dataRowHeader.push(column['id']);
    });

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        dataRowHeader.forEach(function(column) {
            dataRow.push(row[column]);
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*'],
            body: buildTableBody(data, columns)
        },
        layout: {
            fillColor: function (i, node) { return (i === 0) ?  '#C9DAF8' : null; },
            bold: true
        }
    };
}

function generateData(courseDataThis) {
    courseData = courseDataThis;

    var dd = {
        footer: function(currentPage, pageCount) {
            if (currentPage != 1)
                return {text: currentPage.toString(), alignment: 'center'};
        },
        content: [
            {
                image: images.brasao_republica,
                width: 65,
                alignment: 'center'
            },
            { text: '\nSERVIÇO PÚBLICO FEDERAL\n', alignment: 'center', fontSize: 17, lineHeight: 1.5},
            { text: 'UNIVERSIDADE FEDERAL DE GOIÁS\n', alignment: 'center', fontSize: 17, lineHeight: 1.5},
            { text: 'INSTITUTO DE INFORMÁTICA\n\n', alignment: 'center', fontSize: 17, lineHeight: 1.5},
            { text: '\nProjeto Pedagógico do Curso de Bacharelado em Ciências da Computação\n\n\n\n', alignment: 'center', fontSize: 20},
            {
                columns: [
                    {
                        // width: '100',
                        text: 'Diretor:', bold: true
                    },
                    {
                        text: courseData.diretor
                    }
                ],
                margin: [ 50, 0, 0, 0 ]
            },
            {
                columns: [
                    {
                        text: 'Vice-diretor:', bold: true
                    },
                    {
                        text: courseData.viceDiretor
                    }
                ],
                margin: [ 50, 0, 0, 0 ]
            },
            {
                columns: [
                    {
                        text: 'Coordenador do curso:', bold: true
                    },
                    {
                        text: courseData.coordenadorDoCurso
                    }
                ],
                margin: [ 50, 0, 0, 0 ],
                pageBreak: 'after'
            },
            // { text: '\n\nNúcleo Docente Estruturante do Curso: \n', bold: true, pageBreak: 'after'},
            apresentacaoDoProjeto(),
            exposicaoDeMotivos(),
            objetivos(),
            formacaoProfissional(),
            expectativaDaFormacaoDoProfissional(),
            estruturaCurricular(),
            gestaoCurricular(),
            tcc(),
            integracaoEnsinoPesquisaExtensao(),
            avaliacaoProcessoEnsinoAprendizagem(),
            avaliacaoProjetoCurso(),
            politicaQualificacaoDocenteTecnicoAdministrativoDaUnidadeAcademico(),
            requisitosLegaisNormativos()
        ],
        styles: {
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            table: {
                margin: [0, 5, 0, 15]
            },
            header: {
                bold: true,
                fontSize: 18,
                color: 'black'
            },
            subheader: {
                bold: true,
                fontSize: 16,
                color: 'black'
            },
            subsubheader: {
                bold: true,
                fontSize: 11,
                color: 'black'
            }
        },
        defaultStyle: {
            font: 'Calibri',
            fontSize: 13,
            lineHeight: 2
        },
        pageMargins: [80, 65, 65, 65]
    }

    return dd;
}

function apresentacaoDoProjeto() {
    var apresentacao = [];
    ParseHtml(apresentacao, courseData.apresentacao);

    var data = [
        {text: '1\tApresentação do projeto', style: 'header'},
        apresentacao,
        {text: 'Resumo:', style: 'subheader'},
        {text: 'Área de conhecimento: ' + courseData.area_conhecimento},
        {text: 'Modalidade: ' + courseData.modalidade_educacao},
        {text: 'Nome: ' + courseData.nome},
        {text: 'Grau acadêmico: ' + courseData.grau_academico},
        {text: 'Título a ser conferido: ' + courseData.titulacao_masculino},
        {text: 'HabilitacaoTítulo a ser conferido: '},
        {text: 'Unidade responsável pelo curso: ' + courseData.Unidade.nome},
        {text: 'Carga horária do curso: '},
        {text: 'Turno de funcionamento: '},
        {text: 'Número de vagas: '},
        {text: 'Duração do curso em semestres (quantidade mínima e máxima em conformidade com a Resolução CNE/CES No 02, de 18 de junho de 2007): '},
        {text: 'Forma de ingresso ao curso: '}];

    return data;
}

function exposicaoDeMotivos() {
    var motivo = [];

    if (courseData.motivo != undefined) {
        ParseHtml(motivo, courseData.motivo);

        var data = [
            {text: '2\tExposição de motivos: ', style: 'header'},
            motivo,
        ];

        return data;
    }
}

function objetivos() {
    var contentObjetivoGeral = [];
    ParseHtml(contentObjetivoGeral, courseData.objetivoGeral);

    var contentObjetivoEspecifico = [];
    ParseHtml(contentObjetivoEspecifico, courseData.objetivoEspecifico);

    var data = [
        {text: '3\tObjetivos', style: 'header'},
        {text: '3.1\tObjetivo geral', style: 'subheader'},
        contentObjetivoGeral,
        {text: '3.2\tObjetivo específico', style: 'subheader'},
        contentObjetivoEspecifico
    ];

    return data;
}

function formacaoProfissional() {
    var contentProfissionalGeral = [];
    ParseHtml(contentProfissionalGeral, courseData.profissional.geral);

    var contentProfissionalPratica = [];
    ParseHtml(contentProfissionalPratica, courseData.profissional.praticaProfissional);

    var contentProfissionalTecnica = [];
    ParseHtml(contentProfissionalTecnica, courseData.profissional.formacaoTecnica);

    var contentProfissionalEticaSocial = [];
    ParseHtml(contentProfissionalEticaSocial, courseData.profissional.formacaoEticaFuncaoSocialDoProfissional);

    var contentProfissionalInterdisciplinaridade = [];
    ParseHtml(contentProfissionalInterdisciplinaridade, courseData.profissional.interdisciplinaridade);

    var contentProfissionalTeoriaPratica = [];
    ParseHtml(contentProfissionalTeoriaPratica, courseData.profissional.articulacaoTeoriaPratica);

    var data = [
        {text: '4\tPrincípios norteadores para a formação do profissional', style: 'header'},
        contentProfissionalGeral,
        {text: '\tPrática profissional', style: 'subheader'},
        contentProfissionalPratica,
        {text: '\tA formação técnica', style: 'subheader'},
        contentProfissionalTecnica,
        {text: '\tA formação ética e a função social do profissional', style: 'subheader'},
        contentProfissionalEticaSocial,
        {text: '\tA interdisciplinaridade', style: 'subheader'},
        contentProfissionalInterdisciplinaridade,
        {text: '\tA articulação entre teoria e prática', style: 'subheader'},
        contentProfissionalTeoriaPratica

    ];

    return data;
}

function expectativaDaFormacaoDoProfissional() {
    var perfilDoCurso = [];
    ParseHtml(perfilDoCurso, courseData.perfilCurso);

    var perfilDoEgresso = [];
    ParseHtml(perfilDoEgresso, courseData.habilidadeEgresso);

    var data = [
        {text: '5\tExpectativa da formação do profissional', style: 'header'},
        {text: '\tPerfil do curso', style: 'subheader'},
        perfilDoCurso,
        {text: '\tPerfil do egresso', style: 'subheader'},
        perfilDoEgresso
    ];

    return data;
}

function gestaoCurricular() {
    var gestaoEstagioCurricular = [];
    ParseHtml(gestaoEstagioCurricular, courseData.politicaGestaoEstagio);

    var data = [
        {text: '7\tPolítica e gestão de estágio curricular', style: 'header'},
        gestaoEstagioCurricular
    ];

    return data;
}

function tcc() {
    var tcc = [];
    ParseHtml(tcc, courseData.tcc);

    var data = [
        {text: '8\tTrabalho de conclusão de curso', style: 'header'},
        tcc
    ];

    return data;
}

function integracaoEnsinoPesquisaExtensao() {
    var ensinoPesquisaExtensao = [];

    if (courseData.integracaoPesquisaExtensao != undefined) {
        ParseHtml(ensinoPesquisaExtensao, courseData.integracaoPesquisaExtensao);

        var data = [
            {text: '9\tIntegração ensino, pesquisa e extensão', style: 'header'},
            ensinoPesquisaExtensao
        ];

        return data;
    }

    return null;
}

function avaliacaoProcessoEnsinoAprendizagem() {
    var avaliacaoProcessoEnsinoAprendizagem = [];

    if (courseData.avaliacaoEnsinoAprendizagem != undefined) {
        ParseHtml(avaliacaoProcessoEnsinoAprendizagem, courseData.avaliacaoEnsinoAprendizagem);

        var data = [
            {text: '10\tSistema de avaliação do processo de ensino e de aprendizagem', style: 'header'},
            avaliacaoProcessoEnsinoAprendizagem
        ];

        return data;
    }

    return null;
}

function avaliacaoProjetoCurso() {
    var avaliacaoProjetoCurso = [];

    if (courseData.avaliacaoProjetoCurso != undefined) {
        ParseHtml(avaliacaoProjetoCurso, courseData.avaliacaoProjetoCurso);

        var data = [
            {text: '11\tSistema de avaliação do projeto de curso', style: 'header'},
            avaliacaoProjetoCurso
        ];

        return data;
    }

    return null;
}

function estruturaCurricular() {
    var estruturaCurricularGeral = [];
    var matrizCurricular = [];
    var componenteCurricular = [];
    var ementasObrigatoriasNC = [];
    var ementasObrigatoriasNE = [];
    var optativas = [];

    if (courseData.estruturaCurricular != undefined) {
        ParseHtml(estruturaCurricularGeral, courseData.estruturaCurricular.geral);
        ParseHtml(matrizCurricular, courseData.estruturaCurricular.matrizCurricular.descricao);
        ParseHtml(componenteCurricular, courseData.estruturaCurricular.componenteCurricular.geral);
        ParseHtml(ementasObrigatoriasNC, courseData.estruturaCurricular.componenteCurricular.nucleoComum);
        ParseHtml(ementasObrigatoriasNE, courseData.estruturaCurricular.componenteCurricular.nucleoEspecifico);
        ParseHtml(optativas, courseData.estruturaCurricular.componenteCurricular.optativas);

        var data = [
            {text: '6\tEstrutura Curricular', style: 'header'},
            estruturaCurricularGeral,
            {text: '6.1\tMatriz Curricular', style: 'subheader'},
            matrizCurricular,
            loadDisciplinas(),
            loadResumoCargaHoraria(),
            {text: '6.2\tComponentes curriculares', style: 'subheader'},
            componenteCurricular,
            {text: '6.2.1\tEmentas das disciplinas obrigatórias do núcleo comum', style: 'subsubheader'},
            ementasObrigatoriasNC,
            {text: '6.2.2\tEmentas das disciplinas obrigatórias do núcleo específico', style: 'subsubheader'},
            ementasObrigatoriasNE,
            {text: '6.2.3\tEmentas das disciplinas optativas', style: 'subsubheader'},
            optativas
        ];

        return data;
    }

    return null;
}

function politicaQualificacaoDocenteTecnicoAdministrativoDaUnidadeAcademico() {
    var politicaQualificacaoDocenteTecnicoAdministrativoDaUnidadeAcademico = [];

    if (courseData.polQualDocenteAdmUnidade != undefined) {
        ParseHtml(politicaQualificacaoDocenteTecnicoAdministrativoDaUnidadeAcademico, courseData.polQualDocenteAdmUnidade);

        var data = [
            {
                text: '12\tPolítica de qualificação de docentes e técnicoadministrativo da unidade acadêmica',
                style: 'header'
            },
            politicaQualificacaoDocenteTecnicoAdministrativoDaUnidadeAcademico
        ];

        return data;
    }

    return null;
}

function requisitosLegaisNormativos() {
    var requisitosLegaisNormativos = [];

    if (courseData.requisitosLegaisNormativos != undefined) {
        ParseHtml(requisitosLegaisNormativos, courseData.requisitosLegaisNormativos);

        var data = [
            {text: '13\tRequisitos legais e normativos obrigatórios', style: 'header'},
            requisitosLegaisNormativos
        ];

        return data;
    }

    return null;
}

function loadDisciplinas() {
    var obj = {};
    obj.style = 'table';
    obj.table = {};
    obj.table.widths = ["*", "auto","auto", "auto","auto", "auto","auto", "auto"];
    obj.table.body = [];

    obj.table.body.push([{text: 'Disciplina', bold: true, rowSpan: 2, lineHeight: 1, alignment: 'center'}, {text: 'Unid.\nResp.', bold: true, rowSpan: 2, lineHeight: 1}, {text: 'Pré-\nReq.', bold: true, rowSpan: 2, lineHeight: 1}, {text: 'C.H.\nSemestral', bold: true,colSpan: 2, alignment: 'center', lineHeight: 1}, '', {text: 'C.H.\nTotal', bold: true, rowSpan: 2, lineHeight: 1}, {text: 'Núc.', bold: true, rowSpan: 2, lineHeight: 1}, {text: 'Nat.', bold: true, rowSpan: 2, lineHeight: 1}]);
    obj.table.body.push([{text: '', lineHeight: 1}, {text: '', lineHeight: 1}, {text: '', lineHeight: 1}, {text: 'Teo.', bold: true, alignment: 'center', lineHeight: 1}, {text: 'Prat.', bold: true, alignment: 'center', lineHeight: 1}, {text: '', lineHeight: 1}, {text: '', lineHeight: 1}, {text: '', lineHeight: 1}]);

    courseData.estruturaCurricular.disciplinas.forEach(function (disciplina) {
        obj.table.body.push([{text: disciplina.nome, lineHeight: 1}, {text: disciplina.unidade.sigla, alignment: 'center', lineHeight: 1}, {text: disciplina.preRequisito == undefined || disciplina.preRequisito == '' ? '' : disciplina.preRequisito.id, lineHeight: 1}, {text: disciplina.cargaHorariaTeorica, alignment: 'center', lineHeight: 1}, {text: disciplina.cargaHorariaPratica, alignment: 'center', lineHeight: 1}, {text: disciplina.cargaHorariaTeorica + disciplina.cargaHorariaPratica, alignment: 'center', lineHeight: 1}, {text: disciplina.nucleo.code, alignment: 'center', lineHeight: 1}, {text: disciplina.natureza.code, alignment: 'center', lineHeight: 1}]);
    });

    obj.layout =  {
        hLineWidth: function (i, node) {
            return 0.1;
        },
        vLineWidth: function (i, node) {
            return 0.1;
        }
    }

    return obj;
}

function loadResumoCargaHoraria() {
    var obj = {};
    obj.style = 'table';
    obj.table = {};
    obj.table.widths = ["*", "auto","auto"];
    obj.table.body = [];

    obj.table.body.push([{text: 'Componentes Curriculares', bold: true, lineHeight: 1}, {text: 'Carga Horária', bold: true, lineHeight: 1}, {text: 'Percentual', bold: true, lineHeight: 1}]);

    var totalNC = 0;
    var totalNE = 0;
    var totalNL = 0;
    var totalNO = 0;
    var totalAC = courseData.estruturaCurricular.cargaHorariaAtividadesComplementares;
    var total = 0;
    courseData.estruturaCurricular.disciplinas.forEach(function (disciplina) {
        switch (disciplina.nucleo.code) {
            case "NC": {
                totalNC += disciplina.cargaHorariaTeorica + disciplina.cargaHorariaPratica;
                break;
            }
            case "NE": {
                if (disciplina.natureza.code == "OBR")
                    totalNE += disciplina.cargaHorariaTeorica + disciplina.cargaHorariaPratica;

                break;
            }
            case "NL": {
                totalNL += disciplina.cargaHorariaTeorica + disciplina.cargaHorariaPratica;
                break;
            }
        }

        switch (disciplina.natureza.code) {
            case "NAO OBR": {
                totalNO += disciplina.cargaHorariaTeorica + disciplina.cargaHorariaPratica;
                break;
            }
        }
    });

    total =  totalNC + totalNE + totalNL + totalNO + totalAC;

    obj.table.body.push([{text: 'Núcleo Comum (NC)', lineHeight: 1}, {text: totalNC, lineHeight: 1}, {text: ((totalNC/total)*100).toFixed(2) + '%', lineHeight: 1}]);
    obj.table.body.push([{text: 'Núcleo Específico Obrigatório', lineHeight: 1}, {text: totalNE, lineHeight: 1}, {text: ((totalNE/total)*100).toFixed(2) + '%', lineHeight: 1}]);
    obj.table.body.push([{text: 'Núcleo Livre', lineHeight: 1}, {text: totalNL, lineHeight: 1}, {text: ((totalNL/total)*100).toFixed(2) + '%', lineHeight: 1}]);
    obj.table.body.push([{text: 'Disciplinas Optativas', lineHeight: 1}, {text: totalNO, lineHeight: 1}, {text: ((totalNO/total)*100).toFixed(2) + '%', lineHeight: 1}]);
    obj.table.body.push([{text: 'Atividades Complementares', lineHeight: 1}, {text: totalAC, lineHeight: 1}, {text: ((totalAC/total)*100).toFixed(2) + '%', lineHeight: 1}]);
    obj.table.body.push([{text: 'Carga Horária Total', lineHeight: 1, bold: true}, {text: total, lineHeight: 1}, {text: '100%', lineHeight: 1}]);

    obj.layout =  {
        hLineWidth: function (i, node) {
            return 0.1;
        },
        vLineWidth: function (i, node) {
            return 0.1;
        }
    }

    return obj;
}