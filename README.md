# API architecture

  Components
      ↓
  Custom React Query Hook
      ↓
  API Utility
      ↓
  Axios
      ↓
  Backend

# component architecture

  Component
      ↓
  useRepoTimelineQuery()
      ↓
  React Query
      ↓
  graphqlRequest()
      ↓
  Axios
      ↓
  POST /graphql
      ↓
  Mercurius

# Zustand stores

React Query

  Use for:

  Repository data
  Timeline data
  Heatmap data
  Contributor data
  Insights
  File history
  My repos
  Analysis job


Zustand

  Use for:

  Authentication
  Filters
  Timeline playback
  Selected file
  Drawer state
  Modal state
  Workspace UI


