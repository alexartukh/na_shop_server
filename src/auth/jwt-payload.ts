// что лежит в токене (payload) (и в request.user после guard)
export interface JwtPayload {
    sub: number
    role: string
}
