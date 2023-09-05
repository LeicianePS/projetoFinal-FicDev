require('../database');

const { NutricionistaModel } = require("../models/nutricionista-model");

const nutricionistas = [
    {
        nome: 'Marcela',
        crn: '1255993'
    },
    {
        nome: 'Marta',
        crn: '1251231151'
    },
    {
        nome: 'Paula',
        crn: '09595903123'
    },
    {
        nome: 'Mariana',
        crn: '9093912912351'
    },
    {
        nome: 'João',
        crn: '858130818239015'
    },
    {
        nome: 'Paulo',
        crn: '95193905901231'
    },
    {
        nome: 'Luiza',
        crn: '413191923151'
    },
    {
        nome: 'Luana',
        crn: '51923900510931'
    },
    {
        nome: 'Maria',
        crn: '034534592309323'
    },
    {
        nome: 'Rafaela',
        crn: '8812937897598123'
    },
    {
        nome: 'Gabriela',
        crn: '9813889019239'
    },
];

(async () => {
    try {
        await Promise.all([
            NutricionistaModel.bulkCreate(nutricionistas),
        ]);
        console.log('Banco de dados populado!')
    } catch (error) {
        console.error(error)
    }
})();