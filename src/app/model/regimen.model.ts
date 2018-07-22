import { Medicines } from "./medicines.model";

export class Regimen {
    constructor(
        public remindings: string[],
        public regimens: Medicines[]
    ) {}
}