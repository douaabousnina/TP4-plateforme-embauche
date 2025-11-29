const API_BASE_URL = 'https://apilb.tridevs.net/api/';

export const API_URLS = {
    PERSONNES: `${API_BASE_URL}/personnes`,
    PERSONNE_BY_ID: (id: number) => `${API_BASE_URL}/personnes/${id}`,
}