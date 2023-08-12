import { IUserTypeDTO } from "../dto/UserType.dto";

export interface IAuthContextTypeDTO {
  user: IUserTypeDTO | null;
  setUser: (user: IUserTypeDTO | null) => void;
  login: (email: string, password: string) => Promise<IUserTypeDTO | boolean>;
};