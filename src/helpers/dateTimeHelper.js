export class DateTime{

    constructor(timeStamp) {
        this.timeStamp = timeStamp;
    }

    getDateString() {
        const reversedDate = this.timeStamp.substring(0,9);
        // reverse the notation:
        const dateArray = reversedDate.split('-');
        const reversedDateArray = dateArray.reverse();
        return reversedDateArray.join('-');
    }

    getTimeString() {
        return this.timeStamp.substring(11,19);
    }
}