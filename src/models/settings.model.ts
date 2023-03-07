export interface Settings {
  userData: {
    username: string;
  };
  mouseSettings: {
    mousePrecision: boolean;
    mouseSpeed: number;
  };
  autoLogin: {
    wu: boolean;
    bb: boolean;
    outlook: boolean;
    moodle: boolean;
  };
  websitesToOpen: string[];
  chromePaths?: string[]
}
