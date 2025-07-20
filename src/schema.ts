export const typeDefs = `
  type Game{
     id:ID!
     title:String!
     platform:[String!]!
     reviews:[Review!]
  }
  
  type Author{
  id:ID!
  name:String!
  verified:Boolean!
  reviews:[Review!]
  }

  type Review{
  id:ID!
  rating:Int!
  content:String!
  game:Game!
  author:Author!
  }
  type Query{
    reviews:[Review]
    authors:[Author]
    games:[Game]
    review(id:ID!):Review
    game(id:ID!):Game
    author(id:ID!):Author
  }
  
  type Mutation{
   deleteGame(id:ID!):[Game]
   addGame(game:GameInput!):Game
   updateGame(id:ID!,game:EditGameInput!):Game
  }
   input GameInput{
   title:String!
     platform:[String!]!
   }
   input EditGameInput{
   title:String
   platform:[String!]
   }
    
`;
