import * as cdk from '@aws-cdk/core';
import { Table, TableProps, AttributeType } from '@aws-cdk/aws-dynamodb';
import { DynamoDBKeyConfig, AttributeType as PPAttributeType } from '@pp/common-aws';

const generateTableFromModel = <T>(
    stack: cdk.Stack, tableName: string, model: DynamoDBKeyConfig<T>, props: Partial<TableProps>): Table => {
  const table: Table = new Table(stack, tableName, generateTablePropsFromModel(
    tableName,
    model,
    props
  ));

  if (model.gsiList) {
    model.gsiList.forEach(gsi => {
      table.addGlobalSecondaryIndex({
        indexName: gsi.indexName,
        partitionKey: {
          name: gsi.hashKey.name as string,
          type: mapAttributeTypes(gsi.hashKey.type)
        },
        projectionType: gsi.projectionType,
        nonKeyAttributes: gsi.nonKeyAttributes
      })
    });
  }

  return table;
}

const generateTablePropsFromModel = <T>(tableName: string, model: DynamoDBKeyConfig<T>, props?: Partial<TableProps>): TableProps => {
  let outputProps = {
    tableName,
    partitionKey: {
      name: model.hashKey.name as string,
      type: mapAttributeTypes(model.hashKey.type)
    },
    ...model.rangeKey ? { 
      name: model.rangeKey.name as string,
      type: mapAttributeTypes(model.hashKey.type)
    } : {}
  };

  return {...props, ...outputProps};
}

const mapAttributeTypes = (type: PPAttributeType): AttributeType => {
  switch(type) {
    case PPAttributeType.STRING:
      return AttributeType.STRING;
    case PPAttributeType.NUMBER:
      return AttributeType.NUMBER;
    case PPAttributeType.BASE64:
      return AttributeType.BINARY;
  }
}

export const DynamoDBUtils = {
    generateTableFromModel,
    generateTablePropsFromModel
}