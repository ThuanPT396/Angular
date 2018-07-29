export class Appointment {
    constructor(
        public appointmentID: number,
        public patientID: number,
        public appointmentTime: Date,
        public no: number,
        public currentTime: Date,
        public status: number,
        public isCurrentAppointment: Boolean,
        public fullName: string,
        public phoneNumber: string,
        public secondPhoneNumber:string,
        public address:string,
        public gender:string,
        public yob:Date,
        public isBlock: Boolean,

        public createdRecord:Boolean,
    ) { }
}