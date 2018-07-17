import { Medicines } from "./medicines.model";
import { Disease } from "./disease.model";

export class Record {
    constructor(
        public appointmentID: string,
        public appointmentTime:Date,
        public no:number,
        public status:number,
        public remind:string,
        public medicines: Medicines[],
        public disease: Disease[],
        public presentDiseases: string,
        public symptoms:string[]
    ) { }
}