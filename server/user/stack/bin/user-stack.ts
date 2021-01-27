#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { UserModelStack } from '../lib/user-model-stack';
import { AwsUtils } from '@pp/common-cdk'

const app = new cdk.App();
new UserModelStack(app, 'DevUserModelStack', { tags: { stage: } });
