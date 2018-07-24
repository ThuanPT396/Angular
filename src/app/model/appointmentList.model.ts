import { Appointment } from "./appointment.model";

export class AppointmentList {
    constructor(
        public currentTime: Date,
        public appointments: Appointment[],

    ) { }
}