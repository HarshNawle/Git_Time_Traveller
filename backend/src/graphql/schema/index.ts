export const typeDefs = `#graphql
  type Query {
    health: String!
    analysisJob(jobId: ID!): AnalysisJob
    repoInsights(repoId: ID!): Repository
  }

  type Mutation {
    submitRepo(url: String!): Repository
    cancelAnalysisJob(jobId: ID!): Boolean!
  }

  type AnalysisJob {
    id: ID!
    repositoryId: ID!
    status: String!
    stage: String!
    errorCode: String
    errorMessage: String
    startedAt: String
    completedAt: String
    updatedAt: String!
  }

  type Repository {
    id: ID!
    sourceType: String!
    url: String
    owner: String
    name: String!
    defaultBranch: String
    commitCount: Int!
    fileCount: Int!
    createdAt: String!
    updatedAt: String!
  }
`;