import Realm from 'realm';

class UserInfo{}
UserInfo.schema = {
    name: 'UserInfo',
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string'
    }
};

let realm = new Realm({
    schema: [UserInfo],
    schemaVersion: 1,
    migration: (oldRealm, newRealm) => {}
});

export const save = (key, value)=>{
    realm.write(() => {
        try {
            realm.create('UserInfo', {
                key,
                value
            });
        } catch (e) {
            let obj = realm.objects('UserInfo').filtered(`key='${key}'`);
            obj[0].value = value;
        }
    });
};

export const get = (key) =>{
    let obj = realm.objects('UserInfo').filtered(`key='${key}'`);
    return obj[0] ? obj[0].value : undefined;
};

export const remove = (key) =>{
    realm.write(() => {
        let obj = realm.objects('UserInfo').filtered(`key='${key}'`);
        realm.delete(obj);
    });
};

export const USER_TOKEN = 'UserToken';
export const USER_ID = 'UserId';