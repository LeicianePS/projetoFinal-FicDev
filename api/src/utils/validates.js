class Validates {
    static validDate(date) {
        const dateFormated = new Date(date.split('/').reverse().join('-'))
        return dateFormated.toString() !== 'Invalid Date' && dateFormated <= new Date();
    }

    static validCNPJ(cnpj) {
        const regexCNPj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        return regexCNPj.test(cnpj);
    }

    static validHour(hour) {
        const hourFormated = hour.split(':');
        return hourFormated.length === 3 &&
            hourFormated[0] <= 24 &&
            hourFormated[0] >= 0 &&
            hourFormated[1] < 60 &&
            hourFormated[1] >= 0 &&
            hourFormated[2] < 60 &&
            hourFormated[2] >= 0;
    }

    static validTurn(turn) {
        return turn === 'M' || turn === 'V' || turn === 'N';
    }

    static validUnity(unity) {
        return unity === 'Grama' ||
            unity === 'Kilograma' ||
            unity === 'Mililitro' ||
            unity === 'Litro';
    }
}

module.exports = { Validates };
