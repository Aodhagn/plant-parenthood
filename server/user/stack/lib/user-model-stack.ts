import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { UserDynamoDBModel } from '@pp/user-model';
import { DynamoDBUtils } from '@pp/common-cdk';

export class UserModelStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log(props)

    const UserTable: dynamodb.Table = 
        DynamoDBUtils.generateTableFromModel(this, 'UserTable', UserDynamoDBModel, {
          billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
        });
  }
}
