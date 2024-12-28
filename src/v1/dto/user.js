import moment from "moment";

export class UserLogInDTO {
    constructor(user) {
        this._id = user._id ?? "";
        this.full_name = user.full_name ?? "";
        this.phone = user.phone ?? 0;
        this.email = user.email ?? "";
        this.created_at = user.created_at ?? 0;
        this.updated_at = user.updated_at ?? 0;
        if (user.access_token) {
            this.access_token = user.access_token ?? "";
        }
    }
}

export class UserProfileDTO {
    constructor(user) {
        this._id = user._id ?? "";
        this.full_name = user.full_name ?? "";
        this.phone = user.phone ?? 0;
        this.email = user.email ?? "";
        this.created_at = user.created_at ?? 0;
        this.updated_at = user.updated_at ?? 0;
    }
}

export class UsersListDTO {
    constructor(users) {
        return users.map(user => {
            return {
                _id: user._id ?? "",
                full_name: user.full_name ?? "",
                phone: user.phone ?? 0,
                email: user.email ?? "",
                created_at: user.created_at ?? 0,
                updated_at: user.updated_at ?? 0,
            }
        })
    }
}