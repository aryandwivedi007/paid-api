export interface IApiModule {
    name: string;
    description?: string;
    pricePerRequest: number;
    isFree: boolean;
}
