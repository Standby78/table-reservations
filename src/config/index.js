export const authMeEndpoint = '/.auth/me';
export const getAllTablesEndpoint = process.env.GET_ALL_TABLES;
export const getAllUsersEndpoint = process.env.GET_ALL_USERS;
export const updateAllUsersEndpoint = process.env.UPDATE_ALL_USERS;
export const updateAllTablesEndpoint = process.env.UPDATE_ALL_TABLES;
export const updateTableEndpoint = process.env.UPDATE_TABLE;

const isDev = process.env.REACT_APP_ENV === 'development';
export const defaultUser = !isDev
    ? { userId: undefined, name: undefined, picture: undefined }
    : {
          userId: process.env.AUTHOR,
          name: process.env.NAME,
          picture: process.env.USER_PICTURE,
      };
