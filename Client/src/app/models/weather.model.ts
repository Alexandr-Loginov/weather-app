export enum MainWeather {
    THUNDERSTORM = 'Thunderstorm',
    DRIZZLE = 'Drizzle',
    RAIN = 'Rain',
    SNOW = 'Snow',
    ATMOSPHERE = 'Atmosphere',
    CLEAR = 'Clear',
    CLOUDS = 'Clouds',
}

export interface ICoord {
    lon: number;
    lat: number;
}

export interface IWeathreItem {
    id: number;
    main: MainWeather;
    description: string;
    icon: string;
}

export interface IMainInfo {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface IWindInfo {
    speed: number;
    deg: number;
}

export interface ICloudsInfo {
    all?: number;
    value?: number;
    name?: string;
}

export interface ISystemInfo {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeather {
    coord: ICoord;
    weather: IWeathreItem[];
    base: string;
    main: IMainInfo;
    visibility: number;
    wind: IWindInfo;
    clouds: ICloudsInfo;
    dt: number;
    sys: ISystemInfo;
    id: number;
    name: string;
    cod: number;
}

export enum ResponseModes {
    JSON = '',
    XML = 'xml',
    HTML = 'html',
}

export enum Units {
    METRIC = 'metric',
    IMPERIAL = 'imperial',
}

export const Queries = {
    CITY: 'q',
    MODE: 'mode',
    ZIP: 'zip',
    APPID: 'appid',
    LANG: 'lang',
};

export enum MessageTypes {
    SEND = 'changeLocation',
    GET = 'weatherUpdate',
}

export interface IWeatherWrapper {
    date: string | Date;
    data: IWeather;
}
