import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Form = styled.div`
    width: 50%;
    margin-bottom: 70px;
`

export const TypeIcons = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    .inative {
        opacity: 0.5;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    img {
        width: 50px;
        height: 50px;
        margin: 10px;

        &:hover {
            transition: .5s;
            opacity: 0.5;
        }
    }
`

export const Input = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    span {
        color: #707070;
        margin-bottom: 5px 0;
    }

    input {
        font-size: 16px;
        padding: 15px;
        border: none;
        border-bottom: 1px solid #EE6B26;
    }
`

export const TextArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    span {
        color: #707070;
        margin: 5px 0;
    }

    textarea {
        font-size: 16px;
        border: 1px solid #EE6B26;
    }
`

export const Options = styled.div`
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        color: #EE6B26;
        font-weight: bold;
        font-size: 18px;
    }

    button {
        background: none;
        border: none;
        font-weight: bold;
        color: #20295F;
        font-size: 18px;
        cursor: pointer;

        &:hover {
            transition: .5s;
            opacity: 0.5;
        }
    }
`

export const Save = styled.div`
    width: 100%;
    margin-top: 20px;

    button {
        width: 100%;
        background: #EE6B26;
        border: none;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        padding: 20px;
        border-radius: 30px;
        cursor: pointer;

        &:hover {
            transition: .5s;
            opacity: 0.5;
        }
    }
`