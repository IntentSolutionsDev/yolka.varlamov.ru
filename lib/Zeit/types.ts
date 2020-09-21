interface IZeitConfig {
  token: string;
  teamId: string;
}

interface IZeitUser {
  uid: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  platformVersion: number;
  billing: { [key: string]: any };
  bio: string;
  website: string;
  profiles: { [key: string]: any }[];
}

export { IZeitConfig, IZeitUser };
