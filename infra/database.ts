export const database = new sst.aws.Dynamo("Dynamo", {
  fields: {
    pk: "string",
    sk: "string",
  },
  primaryIndex: {
    hashKey: "pk",
    rangeKey: "sk",
  },
});
