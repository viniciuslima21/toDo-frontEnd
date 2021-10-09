import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import * as S from './styles';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import typeIcons from '../../utils/typeIcons';

function Task({ match }) {
    const [redirect, setRedirect] = useState(false);
    const [type, setType] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState(isConnected);

    async function loadTaskDetails() {
        if (match.params.id) {
            await api.get(`/task/${match.params.id}`)
            .then(response => {
            setType(response.data.type)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
            setHour(format(new Date(response.data.when), 'HH:mm'))
            setDone(response.data.done)
            })
            .catch(() => {
                setRedirect(true);
            })
        }
    }

    async function save() {
        if (!type)
            alert('Você precisa informar o tipo da tarefa!')
        else if (!title)
            alert('Você precisa informar o título da tarefa!')
        else if (!description)
            alert('Você precisa informar a descrição da tarefa!')
        else if (!date)
            alert('Você precisa informar a data da tarefa!')
        else if (!hour)
            alert('Você precisa informar a hora da tarefa!')
        else {
            if (match.params.id) {
                await api.put(`/task/${match.params.id}`, {
                    macaddress,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}:00.000`,
                    done
                })
                .then(() =>
                    setRedirect(true)
                )
                .catch(error => 
                    alert(error)
                )
            } else {
                await api.post('/task', {
                    macaddress,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}:00.000`,
                    done
                })
                .then(() =>
                    setRedirect(true)
                )
                .catch(error => 
                    alert(error)
                )
            }
        }
    }

    async function remove() {
        const res = window.confirm('Você realmente deseja excluir a tarefa?');

        if (res === true) {
            await api.delete(`/task/${match.params.id}`)
            .then(() => {
                setRedirect(true)
            })
        }
    }

    useEffect(() => {
        loadTaskDetails();

        !isConnected && setRedirect(true);
    }, [])

    return (
        <S.Container>
            {
                redirect && <Redirect to="/" />
            }
            <Header />
            <S.Form>
                <S.TypeIcons>
                    {
                        typeIcons.map((icon, i) => (
                            i > 0 && 
                            <button onClick={() => setType(i)}>
                                <img src={icon} alt="Tipo da tarefa" 
                                className={type && type != i && 'inative'} />
                            </button>
                        ))
                    }
                </S.TypeIcons>
                <S.Input>
                    <span>Título</span>
                    <input 
                        type="text" 
                        placeholder="Título da tarefa" 
                        onChange={e => setTitle(e.target.value)} 
                        value={title} 
                    />
                </S.Input>
                <S.TextArea>
                    <span>Descrição</span>
                    <textarea 
                        rows={5} 
                        placeholder="Detalhes da tarefa"
                        onChange={e => setDescription(e.target.value)} 
                        value={description} 
                    />
                </S.TextArea>
                <S.Input>
                    <span>Data</span>
                    <input 
                        type="date" 
                        onChange={e => setDate(e.target.value)} 
                        value={date} 
                    />
                </S.Input>
                <S.Input>
                    <span>Hora</span>
                    <input 
                        type="time" 
                        onChange={e => setHour(e.target.value)} 
                        value={hour} 
                        />
                </S.Input>
                <S.Options>
                    <div>
                        <input 
                            type="checkbox" 
                            checked={done} 
                            onChange={() => setDone(!done)} 
                        />
                        <span>CONCLUÍDO</span>
                    </div>
                    { match.params.id && <button type="button" onClick={remove}>EXCLUIR</button> }
                </S.Options>
                <S.Save>
                    <button type="button" onClick={save}>SALVAR</button>
                </S.Save>
            </S.Form>
            <Footer />
        </S.Container>
    );
}

export default Task;