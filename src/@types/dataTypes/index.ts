import { User } from "../../../generated/prisma";

export interface BusinessUser extends User {
    business: {
        name: string;
        businessType: string;
    };
}
