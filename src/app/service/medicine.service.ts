import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Final } from "../Const";
import { BaseResponse } from "../model/BaseResponse.model";
import { Medicine } from "../model/medicine.model";
import { Disease } from "../model/disease.model";


@Injectable()
export class MedicineService{
    constructor(private http: HttpClient) { }
    // url = 'http://27.74.245.84:8080';
    url = `${Final.API_ENDPOINT}`;

    getMedicines() {
        return this
        .http
        .get<BaseResponse<Medicine[]>>(`${this.url}/medicine/getAllMedicines`);
    }
    getDiseases(){
        return this
        .http
        .get<BaseResponse<Disease[]>>(`${this.url}/disease/getAllDiseases`);
    }
}