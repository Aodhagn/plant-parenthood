import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ModelStack from '../lib/model-stack-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ModelStack.ModelStackStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
