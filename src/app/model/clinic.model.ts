export class Clinic {
    constructor(
        public username: string,
        public password: string,
        public phoneNumber: number,
        public role: string,
        public isActive: string,
        public address: string,
        public clinicName: string,
    ) {}
}