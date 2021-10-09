import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import * as S from './styles';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

function Home() {
    const [filterActived, setFilterActived] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [redirect, setRedirect] = useState(false);

    async function loadTasks() {
        await api.get(`/task/filter/${filterActived}/${isConnected}`)
        .then(response => {
            setTasks(response.data);
        })
    } 

    function notification() {
        setFilterActived('late')
    }

    useEffect(() => {
        loadTasks();

        !isConnected && setRedirect(true); 
    }, [filterActived , loadTasks])

    return (
        <S.Container>
            { redirect && <Redirect to="/qrcode" /> }
            <Header clickNotification={notification}/>
            <S.FilterArea>
                <button type="button" onClick={() => setFilterActived('all')}>
                <FilterCard title="Todos" actived={filterActived == 'all'}></FilterCard>
                </button>
                <button type="button" onClick={() => setFilterActived('today')}>
                <FilterCard title="Hoje" actived={filterActived == 'today'}></FilterCard>
                </button>
                <button type="button" onClick={() => setFilterActived('week')}>
                <FilterCard title="Semana" actived={filterActived == 'week'}></FilterCard>
                </button>
                <button type="button" onClick={() => setFilterActived('month')}>
                <FilterCard title="Mês" actived={filterActived == 'month'}></FilterCard>
                </button>
                <button type="button" onClick={() => setFilterActived('year')}>
                <FilterCard title="Ano" actived={filterActived == 'year'}></FilterCard>
                </button>
            </S.FilterArea>

            <S.Title>
                <h3>{filterActived === 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
            </S.Title>

            <S.Content>
                {
                    tasks.map(task => (
                        <Link to={`/task/${task._id}`}>
                            <TaskCard type={task.type} title={task.title} when={task.when} done={task.done} />
                        </Link>
                    ))
                }
            </S.Content>
            <Footer />
        </S.Container>
    );
}

export default Home;