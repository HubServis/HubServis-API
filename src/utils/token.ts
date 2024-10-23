import { sign } from "jsonwebtoken";

import { User } from "../entities/User";

//env's não carregaram pra mim ;(
import { config } from "dotenv";

config();

export class Token {
	sign(user: User | { id: string }) {
		return sign(
			{
				id: user.id,
			},
			process.env.SECRET_JWT,
			{ expiresIn: "4h" }
		);
	}
}
