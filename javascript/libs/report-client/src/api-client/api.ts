/* tslint:disable */
/* eslint-disable */
/**
 * Reports Service
 * A report generation service for the Riot API.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ChampionReportDto
 */
export interface ChampionReportDto {
    /**
     * 
     * @type {string}
     * @memberof ChampionReportDto
     */
    'winRate': string;
    /**
     * 
     * @type {number}
     * @memberof ChampionReportDto
     */
    'wins': number;
    /**
     * 
     * @type {number}
     * @memberof ChampionReportDto
     */
    'totalGames': number;
    /**
     * 
     * @type {string}
     * @memberof ChampionReportDto
     */
    'championName': string;
}
/**
 * 
 * @export
 * @interface SummonerReportDto
 */
export interface SummonerReportDto {
    /**
     * 
     * @type {string}
     * @memberof SummonerReportDto
     */
    'winRate': string;
    /**
     * 
     * @type {number}
     * @memberof SummonerReportDto
     */
    'wins': number;
    /**
     * 
     * @type {number}
     * @memberof SummonerReportDto
     */
    'totalGames': number;
    /**
     * 
     * @type {string}
     * @memberof SummonerReportDto
     */
    'summonerName': string;
    /**
     * 
     * @type {Array<ChampionReportDto>}
     * @memberof SummonerReportDto
     */
    'championReports': Array<ChampionReportDto>;
    /**
     * 
     * @type {Array<object>}
     * @memberof SummonerReportDto
     */
    'leagues': Array<object>;
}
/**
 * 
 * @export
 * @interface UserReportDto
 */
export interface UserReportDto {
    /**
     * 
     * @type {string}
     * @memberof UserReportDto
     */
    'winRate': string;
    /**
     * 
     * @type {number}
     * @memberof UserReportDto
     */
    'wins': number;
    /**
     * 
     * @type {number}
     * @memberof UserReportDto
     */
    'totalGames': number;
    /**
     * 
     * @type {string}
     * @memberof UserReportDto
     */
    'userName': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserReportDto
     */
    'summoners': Array<string>;
    /**
     * 
     * @type {Array<ChampionReportDto>}
     * @memberof UserReportDto
     */
    'championReports': Array<ChampionReportDto>;
    /**
     * 
     * @type {object}
     * @memberof UserReportDto
     */
    'highestSoloDuoLeague'?: object;
    /**
     * 
     * @type {object}
     * @memberof UserReportDto
     */
    'highestFlexLeague'?: object;
}

/**
 * ServerReportApi - axios parameter creator
 * @export
 */
export const ServerReportApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        serverReportInfraControllerGet: async (timePeriod: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'timePeriod' is not null or undefined
            assertParamExists('serverReportInfraControllerGet', 'timePeriod', timePeriod)
            const localVarPath = `/server-report-infra/time-period/{timePeriod}`
                .replace(`{${"timePeriod"}}`, encodeURIComponent(String(timePeriod)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServerReportApi - functional programming interface
 * @export
 */
export const ServerReportApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServerReportApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async serverReportInfraControllerGet(timePeriod: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserReportDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.serverReportInfraControllerGet(timePeriod, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServerReportApi - factory interface
 * @export
 */
export const ServerReportApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServerReportApiFp(configuration)
    return {
        /**
         * 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        serverReportInfraControllerGet(timePeriod: string, options?: any): AxiosPromise<Array<UserReportDto>> {
            return localVarFp.serverReportInfraControllerGet(timePeriod, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ServerReportApi - object-oriented interface
 * @export
 * @class ServerReportApi
 * @extends {BaseAPI}
 */
export class ServerReportApi extends BaseAPI {
    /**
     * 
     * @param {string} timePeriod 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerReportApi
     */
    public serverReportInfraControllerGet(timePeriod: string, options?: AxiosRequestConfig) {
        return ServerReportApiFp(this.configuration).serverReportInfraControllerGet(timePeriod, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * SummonerReportApi - axios parameter creator
 * @export
 */
export const SummonerReportApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} summonerName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        summonerReportControllerGetSummonerReportByPeriod: async (summonerName: string, timePeriod: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'summonerName' is not null or undefined
            assertParamExists('summonerReportControllerGetSummonerReportByPeriod', 'summonerName', summonerName)
            // verify required parameter 'timePeriod' is not null or undefined
            assertParamExists('summonerReportControllerGetSummonerReportByPeriod', 'timePeriod', timePeriod)
            const localVarPath = `/summoner-report/{summonerName}/time-period/{timePeriod}`
                .replace(`{${"summonerName"}}`, encodeURIComponent(String(summonerName)))
                .replace(`{${"timePeriod"}}`, encodeURIComponent(String(timePeriod)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} summonerName 
         * @param {string} championName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        summonerReportControllerGetSummonerReportByPeriodAndChampion: async (summonerName: string, championName: string, timePeriod: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'summonerName' is not null or undefined
            assertParamExists('summonerReportControllerGetSummonerReportByPeriodAndChampion', 'summonerName', summonerName)
            // verify required parameter 'championName' is not null or undefined
            assertParamExists('summonerReportControllerGetSummonerReportByPeriodAndChampion', 'championName', championName)
            // verify required parameter 'timePeriod' is not null or undefined
            assertParamExists('summonerReportControllerGetSummonerReportByPeriodAndChampion', 'timePeriod', timePeriod)
            const localVarPath = `/summoner-report/{summonerName}/champion/{championName}/time-period/{timePeriod}`
                .replace(`{${"summonerName"}}`, encodeURIComponent(String(summonerName)))
                .replace(`{${"championName"}}`, encodeURIComponent(String(championName)))
                .replace(`{${"timePeriod"}}`, encodeURIComponent(String(timePeriod)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SummonerReportApi - functional programming interface
 * @export
 */
export const SummonerReportApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SummonerReportApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} summonerName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async summonerReportControllerGetSummonerReportByPeriod(summonerName: string, timePeriod: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SummonerReportDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.summonerReportControllerGetSummonerReportByPeriod(summonerName, timePeriod, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} summonerName 
         * @param {string} championName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName: string, championName: string, timePeriod: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ChampionReportDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName, championName, timePeriod, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SummonerReportApi - factory interface
 * @export
 */
export const SummonerReportApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SummonerReportApiFp(configuration)
    return {
        /**
         * 
         * @param {string} summonerName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        summonerReportControllerGetSummonerReportByPeriod(summonerName: string, timePeriod: string, options?: any): AxiosPromise<SummonerReportDto> {
            return localVarFp.summonerReportControllerGetSummonerReportByPeriod(summonerName, timePeriod, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} summonerName 
         * @param {string} championName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName: string, championName: string, timePeriod: string, options?: any): AxiosPromise<ChampionReportDto> {
            return localVarFp.summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName, championName, timePeriod, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SummonerReportApi - object-oriented interface
 * @export
 * @class SummonerReportApi
 * @extends {BaseAPI}
 */
export class SummonerReportApi extends BaseAPI {
    /**
     * 
     * @param {string} summonerName 
     * @param {string} timePeriod 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SummonerReportApi
     */
    public summonerReportControllerGetSummonerReportByPeriod(summonerName: string, timePeriod: string, options?: AxiosRequestConfig) {
        return SummonerReportApiFp(this.configuration).summonerReportControllerGetSummonerReportByPeriod(summonerName, timePeriod, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} summonerName 
     * @param {string} championName 
     * @param {string} timePeriod 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SummonerReportApi
     */
    public summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName: string, championName: string, timePeriod: string, options?: AxiosRequestConfig) {
        return SummonerReportApiFp(this.configuration).summonerReportControllerGetSummonerReportByPeriodAndChampion(summonerName, championName, timePeriod, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UserReportApi - axios parameter creator
 * @export
 */
export const UserReportApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} userName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userReportInfraControllerGet: async (userName: string, timePeriod: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userName' is not null or undefined
            assertParamExists('userReportInfraControllerGet', 'userName', userName)
            // verify required parameter 'timePeriod' is not null or undefined
            assertParamExists('userReportInfraControllerGet', 'timePeriod', timePeriod)
            const localVarPath = `/user-report/{userName}/time-period/{timePeriod}`
                .replace(`{${"userName"}}`, encodeURIComponent(String(userName)))
                .replace(`{${"timePeriod"}}`, encodeURIComponent(String(timePeriod)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserReportApi - functional programming interface
 * @export
 */
export const UserReportApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserReportApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} userName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userReportInfraControllerGet(userName: string, timePeriod: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserReportDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userReportInfraControllerGet(userName, timePeriod, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserReportApi - factory interface
 * @export
 */
export const UserReportApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserReportApiFp(configuration)
    return {
        /**
         * 
         * @param {string} userName 
         * @param {string} timePeriod 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userReportInfraControllerGet(userName: string, timePeriod: string, options?: any): AxiosPromise<UserReportDto> {
            return localVarFp.userReportInfraControllerGet(userName, timePeriod, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserReportApi - object-oriented interface
 * @export
 * @class UserReportApi
 * @extends {BaseAPI}
 */
export class UserReportApi extends BaseAPI {
    /**
     * 
     * @param {string} userName 
     * @param {string} timePeriod 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserReportApi
     */
    public userReportInfraControllerGet(userName: string, timePeriod: string, options?: AxiosRequestConfig) {
        return UserReportApiFp(this.configuration).userReportInfraControllerGet(userName, timePeriod, options).then((request) => request(this.axios, this.basePath));
    }
}


