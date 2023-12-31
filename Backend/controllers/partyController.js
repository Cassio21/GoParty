const PartyModel = require('../models/Party.js');

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  console.log(budget, priceSum);

  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: 'Valor excedeu seu orçamento 😩' });
        return;
      }
      const response = await PartyModel.create(party);
      res.status(201).json({ response, msg: 'Serviço criado com sucesso! 🥳' });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: 'Serviço não encontrado 😓' });
        return;
      }
      res.json(party);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: 'Serviço não encontrado 😓' });
        return;
      }

      const deleteParty = await PartyModel.findOneAndDelete(id);

      res
        .status(200)
        .json({ deleteParty, msg: 'Serviço excluído com sucesso.' });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: 'Valor excedeu seu orçamento 😩' });
        return;
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!updatedParty) {
        res.status(404).json({ msg: 'Serviço não encontrado' });
        return;
      }
      res.status(201).json({ party, msg: 'Dados atualizados com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = partyController;
