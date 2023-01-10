import { User } from "./User";

export interface Intern {
    id: number,
    accept: boolean,
    classInfo: string,
    major: string,
    gpa: number,
    instructorName: string,
    instructorPosition: string, 
    instructorEmail: string,
    instructorPhone: string,    
    fieldOfIntern: string,
    userCode: string,     
    company:{
      cid: number,
      company_name: string,
      company_address: string,
      img: string,
      email: string,
      phone: string
    }
  }