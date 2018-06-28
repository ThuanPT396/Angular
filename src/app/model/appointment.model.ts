import { Patient } from "./patient.model";

export class Appointment {
    constructor(
        public appointmentId: number,
        public appointmentTime: string,
        public no: number,
        public currentTime: string,
        public status: string,
        public isCurrentAppointment: Boolean,
        public patientName: string,
        public phoneNumber: string,
        public isBlock: string) { }
}