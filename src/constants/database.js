export const DB_TABLES = { SCHOOLS: 'schools' };

export const DB_FIELDS = {
    SCHOOLS: {
        ID: 'id',
        NAME: 'name',
        ADDRESS: 'address',
        LATITUDE: 'latitude',
        LONGITUDE: 'longitude'
    }
};

export const DB_ERRORS = {
    DUPLICATE_ENTRY: 'ER_DUP_ENTRY',
    CONNECTION_ERROR: 'ER_GET_CONNECTION_ERROR',
    SYNTAX_ERROR: 'ER_SYNTAX_ERROR'
};

export default { DB_TABLES, DB_FIELDS, DB_ERRORS };
