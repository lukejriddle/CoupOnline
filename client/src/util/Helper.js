export function setUpBoard(others){
    let opponents = [];
    switch(others.length){
        case 1:
            opponents = [null, others[0], null, null, null];
            break;
        case 2:
            opponents = [null, others[1], null, others[0], null];
            break;
        case 3:
            opponents = [null, others[1], null, others[0], others[2]];
            break;
        case 4:
            opponents = [others[1], others[2], null, others[0], others[3]];
            break;
        case 5:
            opponents = [others[1], others[2], others[3], others[0], others[4]]
            break;
        default:
            console.log("[EXCEPTION] Game has too few/too many players. ::Game.js#setUpBoard::");    
    }
    return opponents;
}

/**
 * Arranges otherPlayers to be a list in turn order.
 * 
 * @param {Player} player
 * @param {List} otherPlayers - list of Players
 * @returns {List} arranged list
 */
export function arrange(player, otherPlayers){
    let index = otherPlayers.findIndex(element => element === player);
    let temp = otherPlayers.splice(index, otherPlayers.length - index);
    let res = temp.concat(otherPlayers);
    res.shift();
    return res;
}