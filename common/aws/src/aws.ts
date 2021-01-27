enum Stage {
  DEV = 'dev',
  STAGING = 'stg',
  PROD = 'prod',
}

enum Region {
  OR = 'or',
  VA = 'va',
}

const RegionMap: {readonly [key: string]: Region} = {
  'us-west-2': Region.OR,
  'us-east-1': Region.VA,
}

const getRegionFromMap = (input: string): Region => {
  return RegionMap[input];
}

export const AwsUtils = {
  Stage,
  Region,
  getRegionFromMap,
};