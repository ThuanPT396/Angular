export class Appointment {
    constructor(
        public appointmentId: number,
        public patientID: number,
        public appointmentTime: Date,
        public no: number,
        public currentTime: Date,
        public status: string,
        public isCurrentAppointment: Boolean,
        public patientName: string,
        public phoneNumber: string,
        public address:string,
        public gender:string,
        public yob:Date,
        public isBlock: number,
        
        public BisBlock: Boolean,
    ) { }
}