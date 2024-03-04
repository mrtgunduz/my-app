import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache()
});

const GET_CHARACTERS = gql`
  query GetCharacters {
    allPeople {
      people {
        name
      }
    }
  }
`;

function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Star Wars Characters:</h2>
      <ul>
        {data.allPeople.people.map(character => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Star Wars Characters</h1>
        <Characters />
      </div>
    </ApolloProvider>
  );
}

export default App;
