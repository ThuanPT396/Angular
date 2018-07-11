export class Appointment {
    constructor(
        public appointmentId: number,
        public appointmentTime: Date,
        public no: number,
        public currentTime: Date,
        public status: string,
        public isCurrentAppointment: Boolean,
        public patientName: string,
        public phoneNumber: string,
        public address:string,
        public yob:Date,
        public isBlock: number,
        public BisBlock: Boolean,
    ) { }
}