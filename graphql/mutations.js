// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTalk = `mutation CreateTalk($input: CreateTalkInput!) {
  createTalk(input: $input) {
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
export const updateTalk = `mutation UpdateTalk($input: UpdateTalkInput!) {
  updateTalk(input: $input) {
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
export const deleteTalk = `mutation DeleteTalk($input: DeleteTalkInput!) {
  deleteTalk(input: $input) {
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
export const createDiscussion = `mutation CreateDiscussion($input: CreateDiscussionInput!) {
  createDiscussion(input: $input) {
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
export const updateDiscussion = `mutation UpdateDiscussion($input: UpdateDiscussionInput!) {
  updateDiscussion(input: $input) {
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
export const deleteDiscussion = `mutation DeleteDiscussion($input: DeleteDiscussionInput!) {
  deleteDiscussion(input: $input) {
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
