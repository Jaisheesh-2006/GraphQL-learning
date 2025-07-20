//* The below import is to setup and configure the graphQL server(apollo)
import { ApolloServer } from "@apollo/server";
//* This import is necessary for start of apollo server.
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db.js";
//* types
import { typeDefs } from "./schema.js";
//* db
let { games, authors, reviews } = db;
//* resolvers
const resolvers = {
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
    review(__,args,_){
      return reviews.find((r)=>r.id===args.id)
    },
    game(__,args,_){
      return games.find((r)=>r.id===args.id)
    },
    author(__,args,_){
      return authors.find((r)=>r.id===args.id)
    },

  },
  //* The below resolvers are for nested parts
  Game:{
     reviews(parent){
      //* from parent, we get a game object
       return reviews.filter((r)=>r.game_id===parent.id)
     }
  },
  Author:{
     reviews(parent){
      //* from parent, we get a game object
       return reviews.filter((r)=>r.author_id===parent.id)
     }
  },
  Review:{
    author(parent){
      return authors.find((a)=>a.id===parent.author_id)
    },
    game(parent){
      return games.find((a)=>a.id===parent.game_id)
    },
  },
  Mutation:{
    deleteGame(_,args){
      games=games.filter((g)=>g.id!==args.id)
      return games
    },
    addGame(_,args){
      let game={
        ...args.game,
        id:Math.floor(Math.random()*10000).toString()
      }
      games.push(game)
      return game
    },
    updateGame(_,args){
      games=games.map((val)=>{
        if(val.id===args.id){
          return {...val,...args.game}
        }
        return val
      })
      return games.find((g)=>g.id===args.id)
    }

  }
};

//* server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

//* start server
const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT) }, //*process.env object is inferred as string
});

console.log("Server started succesfully at port ", process.env.PORT);
console.log("Server ready at ", url);
