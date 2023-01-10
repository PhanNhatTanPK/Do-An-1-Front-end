export interface Job {
    jid: number;
    quantity: string;
	language: string;
	time: string;
    request: string;
    note: string;
    description: string;
    company: {
		cid: number,
        company_name: string,
		company_address: string,
		img: string,
		email: string,
		phone: string 
	}
  }