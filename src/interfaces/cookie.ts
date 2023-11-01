export interface ICookie {
	domain: string,
	cookieData: string | {
		token: string,
		userId: string,
		access: string[]
	},
	options: {
      maxAge: number,
      httpOnly: boolean,
      domain: string,
      sameSite: string,
      secure?: boolean,
      signed?: boolean,
      path: string,
	}
}

interface IRevalidateCookie {

}
