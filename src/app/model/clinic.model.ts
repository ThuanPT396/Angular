export class Clinic {
    constructor(
        public username: string,
        public password: string,
        public fullName:string,
        public phoneNumber: number,
        public role: string,
        public isActive: string,
        public address: string,
        public clinicName: string,
        public email:string
    ) {}
}