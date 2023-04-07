export class DateTime{

    constructor(timeStamp) {
        this.timeStamp = timeStamp;
        console.log('timestamp in dateTimeHelper: ', timeStamp);
    }

    getDateString() {
        const reversedDate = this.timeStamp.substring(0,10);
        const dateArray = reversedDate.split('-');
        const reversedDateArray = dateArray.reverse();
        return reversedDateArray.join('-');
    }

    getTimeString() {
        console.log('timeString in dateTimeHelper:  ',this.timeStamp.substring(11,19));
        return this.timeStamp.substring(11,19);

    }
}