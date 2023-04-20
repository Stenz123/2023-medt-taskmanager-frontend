export class LoginService {
    public static async login(email: string, password: string): Promise<boolean> {
        const response = await fetch("/api/auth/login.php", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });
        return response.ok;
    }

    public static async logout(): Promise<boolean> {
        console.log("logout")
        const response = await fetch("/api/auth/logout.php", {
            method: "POST"
        });
        return response.ok;
    }

    static async register(email: string, password: string, user: string) : Promise<boolean> {
        const response = await fetch("/api/auth/register.php", {
            method: "POST",
            body: JSON.stringify({
                username: user,
                email: email,
                password: password
            }),
        });
        return response.ok;
    }
}