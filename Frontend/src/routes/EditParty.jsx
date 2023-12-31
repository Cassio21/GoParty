import partyFetch from '../axios/config';

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useToast from '../hooks/useToast';

import './form.css';

const EditParty = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  //* Load Services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get('/services');

      // console.log(res.data);

      setServices(res.data);
      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };
    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.find((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices.push(filteredService);
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }
    setParty({ ...party, services: partyServices }) != undefined;
  };

  console.log(party);

  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);

      if (res.status === 201) {
        navigate(`/party/${id}`);
      }
    } catch (error) {
      useToast(error.response.data.msg, 'error');
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <p>Ajuste as informações do seu serviço.</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span> Modelo: </span>
          <input
            type="text"
            placeholder="Escreva o modelo do veículo"
            required
            onChange={(e) => setParty({ ...party, title: e.target.value })}
            value={party.title}
          />
        </label>

        <label>
          <span> Proprietário: </span>
          <input
            type="text"
            placeholder="Seu nome"
            required
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
          />
        </label>

        <label>
          <span> Descrição: </span>
          <textarea
            placeholder="Nos conte um pouco mais sobre o que deseja realizar"
            required
            onChange={(e) =>
              setParty({ ...party, description: e.target.value })
            }
            value={party.description}
          ></textarea>
        </label>

        <label>
          <span> Orçamento: </span>
          <input
            type="number"
            placeholder="Defina seu orçamento"
            required
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
          />
        </label>

        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem do seu veículo."
            required
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
          />
        </label>

        <div>
          <h2>Escolha os serviços:</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                      checked={
                        party.services.find(
                          (partyService) => partyService._id === service._id
                        ) || ''
                      }
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Editar serviço 🛠️" className="btn" />
      </form>
    </div>
  );
};

export default EditParty;
