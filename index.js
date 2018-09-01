class Garden {
    /**
     * 
     * @param {Array} layout Multidimensional array representing the garden layout
     */
    constructor(layout) {
        this.layout = layout;
        this.history = [];
        this.center = {};
    }

    findCenter() {
        let vertLength = this.layout.length;
        let horiLength = this.layout[0].length;


        if (vertLength % 2 == 0) {
            // You need to see which of the two vertical middles is higher 
            // we will need to calculate two horiMiddles twice if we have even vert and hori. 
            if (horiLength % 2 == 0) {
                // this is going to be four checks no matter what. 
                let squares = [];
                // [[1,0][0,0]] 0
                squares.push(this.layout[(vertLength - 2) / 2][(horiLength - 2) / 2]);
                // [[0,1][0,0]] 1
                squares.push(this.layout[(vertLength - 2) / 2][((horiLength - 2) / 2) + 1]);
                // [[0,0][1,0]] 2
                squares.push(this.layout[((vertLength - 2) / 2) + 1][(horiLength - 2) / 2]);
                // [[0,0][0,1]] 3
                squares.push(this.layout[((vertLength - 2) / 2) + 1][((horiLength - 2) / 2) + 1]);

                let tempCenter = squares.indexOf(Math.max(...squares));
                switch (tempCenter) {
                    case 0:
                        this.center.x = horiLength / 2;
                        this.center.y = vertLength / 2;
                        break;
                    case 1:
                        this.center.x = horiLength / 2 + 1;
                        this.center.y = vertLength / 2;
                        break;
                    case 2:
                        this.center.x = horiLength / 2;
                        this.center.y = vertLength / 2 + 1;
                        break;
                    case 3:
                        this.center.x = horiLength / 2 + 1;
                        this.center.y = vertLength / 2 + 1;
                        break;
                }
            } else {
                // vert is even but horizontal is not
                let horiPos = Math.floor(horiLength / 2) + 1;
                this.center.x = horiPos;
                let lowerVertPos = vertLength / 2 - 1;
                if (this.layout[lowerVertPos][horiPos] > this.layout[lowerVertPos + 1][horiPos]) {

                    this.center.y = lowerVertPos;
                } else {
                    this.center.y = lowerVertPos + 1;
                }
            }
        } else if (horiLength % 2 == 0) {

            // odd, even

            // this is going to be four checks no matter what. 
            let vertMid = Math.floor(vertLength) + 1;

            this.center.y = vertMid;

            let lowerHoriPos = horiLength / 2;
            if (this.layout[vertMid][lowerHoriPos] > this.layout[vertMid][lowerHoriPos + 1]) {

                this.center.x = lowerHoriPos;
            } else {
                this.center.x = lowerHoriPos + 1;
            }

        } else {
            this.center.x = Math.floor(horiLength / 2) + 1;
            this.center.y = Math.floor(vertLength / 2) + 1;
        }
    }

    // this will break if the array is only 2x2. 
    findNext() {
        // look left, right, up, down
        let leftLoc = {x: this.center.x - 1, y: this.center.y};
        let rightLoc = {x: this.center.x, y: this.center.y};
        let upLoc = {x: this.center.x, y: this.center.y - 1};
        let downLoc = {x: this.center.x, y: this.center.y + 1};

        let carArray = [this.layout[leftLoc.y][leftLoc.x] || 0, this.layout[rightLoc.y][rightLoc.x] || 0,
                        this.layout[upLoc.y][upLoc.x] || 0, this.layout[downLoc.y][downLoc.x] || 0];
        if(Math.max(...carArray) === 0) {
            console.log("bunny sleep")
            return
        }
        let nextLoc = carArray.indexOf(Math.max(...carArray));

        switch(nextLoc) {
            case 0: 
                return leftLoc;
            
            case 1: 
                return rightLoc;

            case 2: 
                return upLoc;
            
            case 3: 
                return downLoc;
            default: 
            return null;
        }
    }

    eatNext(location) {
        if(!location) {
            this.history.push('Bunny Sleeps');
            return;
        }
        this.eat(location)
    }

    eat(location) {
        // calling this on each eat. Probably shouldnt. 
        this.findCenter();
        if(!location) {
            location = this.center;
        }
        
        this.history.push(`Eats ${this.layout[location.y - 1][location.x - 1]}`);
        this.layout[location.y][location.x] = 0;
        this.eatNext(this.findNext())
        return this;
    }

    log() {
        console.table(this.history);
    }
}

let garden1 = new Garden([
    [5, 7, 8, 6, 3],
    [0, 0, 7, 0, 5],
    [4, 6, 3, 4, 1],
    [3, 1, 0, 5, 2]
]);

garden1.eat().log()