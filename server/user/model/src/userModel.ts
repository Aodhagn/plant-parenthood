import { DynamoDBKeyConfig, AttributeType, ProjectionType } from '@pp/common-aws';

export default interface UserModel {
    readonly id: UserId;
    readonly name: string;
    readonly displayName: string;
}

export type UserId = string;

export const UserDynamoDBModel: DynamoDBKeyConfig<UserModel> = {
    hashKey: {
        name: 'id',
        type: AttributeType.STRING
    },
    gsiList: [{
        indexName: 'UserNameIndex',
        hashKey: {
            name: 'name',
            type: AttributeType.STRING
        },
        projectionType: ProjectionType.KEYS_ONLY
    }]
};