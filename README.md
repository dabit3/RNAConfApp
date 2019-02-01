## RNAApp

ListDiscussions query (goes in schema in AppSync console):

```js
listDiscussions(talkId: ID!): ModelDiscussionConnection
```

ListDiscussions resolver (request mapping template):

```js
{
    "version" : "2017-02-28",
    "operation" : "Query",
    "index" : "gsi-TalkDiscussions",
    "query" : {
        "expression": "talkId = :talkId",
        "expressionValues" : {
            ":talkId" : $util.dynamodb.toDynamoDBJson($ctx.args.talkId)
        }
    }
}
```

ListDiscussions resolver (response mapping template):

```js
{
    "items": $util.toJson($ctx.result.items),
    "nextToken": $util.toJson($util.defaultIfNullOrBlank($context.result.nextToken, null))
}
```