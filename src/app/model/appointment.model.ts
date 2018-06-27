import { Patient } from "./patient.model";

export class Appointment {
    constructor(
        public appointmentId: number,
        public appointmentTime: string,
        public no: number,
        public patient: Patient,
        public currentTime: string,
        public status: string) { }
}