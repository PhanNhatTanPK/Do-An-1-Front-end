export interface Report {
    id: number;
    workDate: string;
    work: string;
    time: string;
    user: {
        id: number,
        userCode: string,
        fullName: string,
        password: string,
        email: string,
        address: string,
        birthday: string,
        gender: string,
        phone: string,
        profile: string,
    }
  }