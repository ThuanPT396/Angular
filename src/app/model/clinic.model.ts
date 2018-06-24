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
        public email:string,
        public accountSid:string,
        public authToken:string,
        public examinationDuration:string,
        public expiredLicense:string
    ) {}
}