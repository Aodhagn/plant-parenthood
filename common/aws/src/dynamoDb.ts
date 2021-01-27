import * as AWS from 'aws-sdk';
import { AttributeValue, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb';

const dynamodb = new AWS.DynamoDB();

export default class DynamoDB<T> {
    private readonly tableName: string;
    private readonly model: DynamoDBKeyConfig<T>;
    private readonly gsi: { [key: string]: DynamoDBIndex<T>};
    private readonly lsi: { [key: string]: DynamoDBIndex<T>};

    public constructor(tableName: string, model: DynamoDBKeyConfig<T>) {
        this.tableName = tableName;
        this.model = model;
        this.gsi = {};
        this.model.gsiList.forEach(gsi => {
            this.gsi[gsi.indexName] = new DynamoDBIndex(gsi.indexName, model);
        });
    }

    public async create(record: T) {
        await dynamodb.putItem({
            TableName: this.tableName,
            Item: addTypeDecoration(record)
        }).promise();
    }
}

export class DynamoDBIndex<T> {
    private readonly indexName: string;
    private readonly model: DynamoDBKeyConfig<T>;

    public constructor(indexName: string, model: DynamoDBKeyConfig<T>) {
        this.indexName = indexName;
        this.model = model;
    }


}

export interface DynamoDBKeyConfig<T> {
    readonly hashKey: Attribute<T>;
    readonly rangeKey?: Attribute<T>;
    readonly gsiList?: DynamoDBGSI<T>[];
    readonly lsiList?: DynamoDBLSI<T>[];
}

export interface DynamoDBGSI<T> {
    readonly indexName: string;
    readonly hashKey: Attribute<T>;
    readonly rangeKey?: Attribute<T>;
    readonly projectionType?: ProjectionType;
    readonly nonKeyAttributes?: string[];
}

export interface DynamoDBLSI<T> {
    readonly indexName: string;
    readonly rangeKey: Attribute<T>;
    readonly projectionType?: ProjectionType;
    readonly nonKeyAttributes?: string[];
}

export interface Attribute<T> {
    readonly name: keyof T,
    readonly type: AttributeType
}

export const addTypeDecoration = (input: { [key: string]: any }): { [key: string]: AttributeValue} => {
    let output = {};
    Object.keys(input).forEach(key => {
        output[key] = addTypeDecorationToProp(input[key]);
    });
    return output;
}

export const addTypeDecorationToProp = (input): AttributeValue => {
    if (typeof input === 'string') {
        return { S: input };
    }
    if (typeof input === 'number') {
        return { N: input.toString() };
    }
    if (typeof input === 'boolean') {
        return { BOOL: input };
    }
    if (!input) {
        return null;
    }
    if (Array.isArray(input)) {
        return { L: input.map(obj => addTypeDecoration(obj)) };
    }
    if (Object.keys(input).length) {
        const output = {};
        Object.keys(input).forEach(key => {
            output[key] = addTypeDecoration(input[key]);
        })
        return { M: output };
    }
}

export 

export const removeTypeDecoration = (input: { [key: string]: AttributeValue }) => {
    if (!input) {
        return null;
    }
    if (input.S) {
        return input.S;
    }
    if (input.N) {
        return parseFloat(input.N);
    }
    if (input.BOOL) {
        return input.BOOL;
    }
    if (input.L) {
        return input.L.map(obj => {
            return removeTypeDecoration(obj);
        });
    }
    if (input.M) {
        let output = {};
        Object.keys(input).forEach(key => {
            output[key] = removeTypeDecoration(input[key]);
        });
        return output;
    }
}

export enum AttributeType {
    BASE64 = 'B',
    NUMBER = 'N',
    STRING = 'S',
}

export enum ProjectionType {
    KEYS_ONLY = "KEYS_ONLY",
    INCLUDE = "INCLUDE",
    ALL = "ALL"
}