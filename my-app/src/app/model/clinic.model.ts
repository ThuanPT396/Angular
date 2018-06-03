export class Clinic {
    constructor(
        public userName: string,
        public password: string,
        public clinicName: string,
        public address: string,
        public phoneNumber: number,
        public startWorking: string,
        public endWorking: string,
        public roleId: string,
        public isActive: string
    ) {}
}