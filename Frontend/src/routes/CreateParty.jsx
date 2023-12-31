import partyFetch from '../axios/config';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useToast from '../hooks/useToast';

import './form.css';

const CreateParty = () => {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState('');
  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();

  //* Load Services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get('/services');

      // console.log(res.data);

      setServices(res.data);
    };
    loadServices();
  }, []);

  //? ADD or Remove Services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setPartyServices((services) => [...services, filteredService[0]]);
    } else {
      setPartyServices((services) => services.filter((s) => s._id !== value));
    }
    console.log(partyServices);
  };

  //? Create a new party
  const createParty = async (e) => {
    e.preventDefault();

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };

      const res = await partyFetch.post('/parties', party);

      if (res.status === 201) {
        navigate('/');

        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, 'error');
    }
  };

  return (
    <div className="form-page">
      <h2>
        Conte-nos o que precisa ser reparado, e teremos o prazer de cuidar disso
        para você. 🔩{' '}
      </h2>
      <p>Defina seu orçamento e escolha os serviços.</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span> Modelo: </span>
          <input
            type="text"
            placeholder="Escreva o modelo do veículo"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span> Proprietário: </span>
          <input
            type="text"
            placeholder="Seu nome"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>

        <label>
          <span> Descrição: </span>
          <textarea
            placeholder="Nos conte um pouco mais sobre o que deseja realizar"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        <label>
          <span> Orçamento: </span>
          <input
            type="number"
            placeholder="Defina seu orçamento"
            required
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
          />
        </label>

        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem do seu veículo."
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
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
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Criar serviço 📥" className="btn" />
      </form>
    </div>
  );
};

export default CreateParty;
