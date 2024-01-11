const CarroService = require('../services/CarroService');


module.exports = {
   
    buscarTodos: async (req,res)=> {
        let json = {error:'',result:[]};

        let carros = await CarroService.buscarTodos();
        console.log(carros);
        for(let i in carros){
            json.result.push({
                id: carros[i].id,
                modelo: carros[i].modelo,
                placa: carros[i].placa
            })
        }
        res.json(json)
    },

    buscarPorId: async (req, res) => {
        let json = { error: '', result: {} };
    
        try {
            // Obtém o ID a partir dos parâmetros da requisição
            const id = req.params.id;
    
            // Verifica se o ID foi fornecido
            if (!id) {
                json.error = 'ID não informado';
                return res.status(400).json(json);
            }
    
            // Chama o serviço para buscar o carro pelo ID
            let carro = await CarroService.buscarPorId(id);
    
            // Verifica se o carro foi encontrado
            if (carro) {
                json.result = {
                    id: carro.id,
                    modelo: carro.modelo,
                    placa: carro.placa
                };
            } else {
                json.error = 'Carro não encontrado';
            }
    
        } catch (error) {
            json.error = 'Erro ao buscar carro';
            console.error(error);
        }
    
        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };
    
        try {
            let modelo = req.params.modelo;
            let placa = req.params.placa;
    
           
            let carro = await CarroService.inserir(modelo,placa);
            json.result = {
                id: carro.id,
                modelo: carro.modelo,
                placa: carro.placa
            }
    
    
        res.json(json);
       
    }catch (error) {
            json.error = 'Erro ao Inserir carro';
            console.error(error);
        }
    },


}
