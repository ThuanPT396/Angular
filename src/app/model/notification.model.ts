export class MyNotification {
    constructor(
        public dateTimestamp: Date,
        public serverTimestamp: Date,
        public title: string,
        public message: string,
        public id: string        
    ) { }
}