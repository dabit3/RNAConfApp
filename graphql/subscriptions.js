// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTalk = `subscription OnCreateTalk {
  onCreateTalk {
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
export const onUpdateTalk = `subscription OnUpdateTalk {
  onUpdateTalk {
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
export const onDeleteTalk = `subscription OnDeleteTalk {
  onDeleteTalk {
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
export const onCreateDiscussion = `subscription OnCreateDiscussion(
  $talkId: ID!
  ) {
  onCreateDiscussion(talkId: $talkId) {
    
    talkId
    message
    
  }
}
`;
export const onUpdateDiscussion = `subscription OnUpdateDiscussion {
  onUpdateDiscussion {
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
export const onDeleteDiscussion = `subscription OnDeleteDiscussion {
  onDeleteDiscussion {
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
