import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import * as S from './styles';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

function Header({ clickNotification }) {
    const [lateCount, setLateCount] = useState();

    async function lateVerify() {
        await api.get(`/task/filter/late/${isConnected}`)
        .then(response => {
            setLateCount(response.data.length);
        })
    }

    async function logout() {
        localStorage.removeItem('@todo/macaddress');
        window.location.reload();
    }

    useEffect(() => {
        lateVerify();
    }, [])

    function inAcount() {
        if (lateCount && isConnected) {
            return (
                <>
                    <span className="divider"></span>
                    <button onClick={clickNotification} id="notification">
                    <img src={bell} alt="Notificação"></img>
                    <span>{lateCount}</span>
                    </button>
                </>
            )
        }
    }

    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"></img>
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">INÍCIO</Link>
                <span className="divider"></span>
                <Link to="/task">NOVA TAREFA</Link>
                <span className="divider"></span>
                {
                    isConnected ?
                        <a onClick={logout}>SAIR</a>
                    : 
                        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
                }
                {
                    inAcount()
                }
            </S.RightSide>
        </S.Container>
    );
}

export default Header;