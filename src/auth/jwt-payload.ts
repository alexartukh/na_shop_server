// что лежит в токене (и в request.user после guard)
export interface JwtPayload {
    sub: number
    role: string
}
