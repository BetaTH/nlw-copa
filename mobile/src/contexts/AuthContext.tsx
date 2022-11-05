import { createContext, ReactNode } from 'react'

interface IUserProps {
  name: string;
  avatarUrl: string;
}

export interface IAuthContextDataProps {
  user: IUserProps;
  signIn: () => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {

  async function signIn() {
    console.log('Vamos Logar!')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: "Thielson",
        avatarUrl: 'https://github.com/BetaTH.png'
      }
    }}>
      {children}

    </AuthContext.Provider>
  )
}