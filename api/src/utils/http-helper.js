class HttpHelper {
    constructor(response) {
        this.response = response;
    }

    created(data) {
        return this.response.status(201).json(data);
    }

    ok(data) {
        return this.response.status(200).json(data);
    }

    badRequest(message) {
        return this.response.status(400).json({
            message: message,
            variant: "danger",
        });
    }

    unauthorized() {
        return this.response.status(401).json({
            error: 'Usuário não autorizado!'
        });
    }

    notFound(message) {
        return this.response.status(404).json({
            message: message,
            variant: "danger",
        });
    }

    internalError(error) {
        return this.response.status(500).json({
            message: `Erro interno, a operação não pode ser concluída`,
            variant: "danger",
        });
    }
}

module.exports = { HttpHelper }
