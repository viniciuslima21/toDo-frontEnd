import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 70px;
    background: #20295F;
    display: flex;
    border-bottom: 5px solid #EE6B26;

`

export const LeftSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    margin-left: 25px;
    
    img {
        width: 100px;
        height: 40px;
    }
`

export const RightSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 25px;

    a, button {
        color: #fff;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
            color: #EE6B26;
            transition: .3s;
        }
    }

    #notification {
        img {
            width: 25px;
            height: 25px;
        }

        span {
            background: #fff;
            color: #EE6B26;
            padding: 3px 7px;
            border-radius: 50%;
            position: relative;
            top: -17px;
            right: 11px;
            border: 1px solid #20295F;
        }

        &:hover {
            opacity: 0.7;
            transition: .3s;
        }
    }

    .divider::after {
        content: "|";
        margin: 0 10px;
        color: #fff;
    }
`