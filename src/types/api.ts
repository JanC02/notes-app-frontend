export interface AuthResponse {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
};

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
};

export interface VerifyTokenResponse {
  id: AuthResponse['id'];
  email: AuthResponse['email'];
}