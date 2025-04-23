export type LoginRequestDto = {
    username: string
    password: string
}

export type LoginResponseDto = {
    id: string
    username: string
}

export type RegistrationRequestDto = {
    username: string
    password: string
}

export type RegistrationResponseDto = {
    id: string
    username: string
    password: string
}