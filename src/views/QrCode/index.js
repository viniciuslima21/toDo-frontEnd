import React, { useState, useEffect } from 'react';
import Qr from 'qrcode.react';
import { Redirect } from 'react-router-dom';
import isConnected from '../../utils/isConnected';

import * as S from './styles';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {
    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);
    
    async function saveMac() {
        if (mac) {
            await localStorage.setItem('@todo/macaddress', mac)
            setRedirect(true);
            window.location.reload();
        } else {
            alert('Você precisa informar a númeração que apareceu no celular!');
        }
    }

    useEffect(() => {
        isConnected && setRedirect(true);
    })

    return(
        <S.Container>
            { redirect && <Redirect to="/" /> }
            <Header/>
            <S.Content>
                <h1>CAPTURE O QRCODE PELO APP</h1>
                <S.QrCodeArea>
                    <Qr value="11:11:11:11:11:11" size={350} />
                </S.QrCodeArea>
                <p>suas atividade serão sincronizada com a do seu celular.</p>
                <p>Macaddress para teste: 11:11:11:11:11:11</p>
                <S.ValidationCode>
                    <span>Digite a numeração que apareceu no celular</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac} />
                    <button type="button" onClick={saveMac}>SINCRONIZAR</button>
                </S.ValidationCode>
            </S.Content>
            <Footer />
        </S.Container>
    )
}

export default QrCode;