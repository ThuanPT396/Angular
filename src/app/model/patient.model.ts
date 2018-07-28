export class Patient{
constructor(
    public patientID: number,
    public fullName: string,
    public phoneNumber: string,
    public secondPhoneNumber:string,
    public address: string,
    public yob:Date,
    public gender:number
){}
}