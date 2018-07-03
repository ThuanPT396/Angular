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
        public isBlock: number,
        public BisBlock: Boolean) { }
}