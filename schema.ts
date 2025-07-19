export const typeDefs = `
  type Game{
     id:ID!
     title:String!
     platform:[String!]!
  }
  
  type Author{
  id:ID!
  name:String!
  verified:Boolean!
  }

  type Review{
  id:ID!
  rating:Int!
  content:String!
  }
  type Query{
    reviews:[Review]
    authors:[Author]
    games:[Game]
  }
`;
