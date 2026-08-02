export interface AuthResponse {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
};

export interface RefreshResponse {
    accessToken: string;
};

export interface VerifyTokenResponse {
  id: number;
  email: string;
};

export interface TokenStorage {
    accessToken: string | null;
};