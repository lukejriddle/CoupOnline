import { stringify } from 'flatted';
import socket from '../../Socket';

export function getUpdate(){
    socket.emit('getUpdate', stringify(''));
}

export function emitAction(val, targetOrCard){
    socket.emit('action', stringify({action: val, targetOrCard: targetOrCard}));
}

export function emitChallenge(){
    socket.emit('challenge', stringify(''));
}

export function emitLoseInfluence(val){
    socket.emit('loseInfluence', stringify(val));
}

export function emitExchange(vals){
    socket.emit('exchangeCards', stringify(vals));
}

export function newGame(winner){
    console.log(winner);
    socket.emit('startAnotherGame', winner);
}