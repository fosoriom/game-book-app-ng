import { Company } from "../../companies/interfaces/company.interface";
import { VideoConsole } from "../../video-consoles/interfaces/video-console.interface";

export interface VideoGame {
    id: string;
    name: string;
    url: string;
    releaseDate: string;
    favorite: boolean;
    taken: boolean;
    userId: string;
    videoConsoleId: string;
    videoConsole: VideoConsole;
}



