class RoomManager{
    constructor(){
        this.rooms = [];
    }

    addRoom(lobby){
        this.rooms.push(lobby);
    }

    removeRoom(roomCode){
        let index = this.rooms.findIndex(element => element.roomCode == roomCode);
        if(index > -1){
            this.rooms.splice(index, 1);
        }
    }

    getRooms(){
        return this.rooms;
    }

    findRoom(roomCode){
        return this.rooms.find(element => element.roomCode == roomCode);
    }
}

module.exports = RoomManager;