import { VideoConsole } from "../../video-consoles/interfaces/video-console.interface";

export interface ConsoleAccesory {
    id:            string;
    name:          string;
    url:           string;
    releaseDate:   string;
    favorite:     boolean;
    taken:         boolean;
    userId:        string;
    videoConsoleId: string;
    videoConsole: VideoConsole;

}


