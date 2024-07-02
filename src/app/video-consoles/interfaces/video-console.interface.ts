import { Company } from "../../companies/interfaces/company.interface";

export interface VideoConsole {
    id: string;
    name: string;
    url: string;
    releaseDate: string
    like: boolean;
    taken: boolean;
    userId: string;
    companyId: string
    company: Company;
}


