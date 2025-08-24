class TStop {
    constructor(name, lat, long, platName, trainName, color, ordernum, nextstop, previousstop) {
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.platName = platName;
        this.trainName = trainName;
        this.color = color;
        this.ordernum = ordernum;
        
        // These are objects
        this.next = nextstop;
        this.prev = previousstop;
    }

    isfirststop() {
        return this.prev === null;
    }
    
    islaststop() {
        return this.next === null;
    }
}



export { TStop };
