export class User {
    constructor(
        public username: string,
        public password: string,
        public fullName: string,
        public phoneNumber: number,
        public role: string,
        public isActive: string,
        public email: string) { }
}