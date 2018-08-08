export class PhoneNumber{
    constructor(
        public phoneNumber: string,
        public bookingCount: number,
        public absent: number,
        public ratio: number,
        public isBlock: Boolean,
    ){}
    }