// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTalk = `query GetTalk($id: ID!) {
  getTalk(id: $id) {
    id
    name
    speakerName
    speakerBio
    time
    location
    summary
    discussions {
      items {
        id
        talkId
        message
        createdAt
      }
      nextToken
    }
  }
}
`;
export const listTalks = `query ListTalks(
  $filter: ModelTalkFilterInput
  $limit: Int
  $nextToken: String
) {
  listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      speakerName
      speakerBio
      time
      location
      summary
    }
    nextToken
  }
}
`;
export const getDiscussion = `query GetDiscussion($id: ID!) {
  getDiscussion(id: $id) {
    id
    talkId
    talk {
      id
      name
      speakerName
      speakerBio
      time
      location
      summary
      discussions {
        nextToken
      }
    }
    message
    createdAt
  }
}
`;
export const listDiscussions = `query ListDiscussions(
  $talkId: ID!
) {
  listDiscussions(talkId: $talkId) {
    items {
      id
      talkId
      message
      createdAt
    }
  }
}
`;
