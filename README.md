# loopback-playground

Playing around with loopback.io

## Acceptance criteria

- As a Scrum master
  - I want to be able to create a Room with a specific name and
    - choose a specific CardSet to use like Fibonacci, T-shirt sizes etc
    - easily share it with other participants using a url or a simple token
    - secure the Room with a PIN that all participants should use to join
    - lock the Room when everybody has joined
  - I want to be able to start Voting on a specific Story using the Cards from the chosen CardSet
- As a Scrum team participant
  - I want to join a Room by providing by Name so that scrume master and all other participant can understand who joined
  - I want to be able to add a Story with a title and an optinal description for the other to read and vote
  - I want to be notified about the result when Voting is complete and re-Vote after discussion when there is no Consensus
  - I want to be able to see a list for the unvoted Stories along with a list for the fimalized ones with the actual score

## Next steps

- Env related configuration - Done
- Read migration samples from json - Done
- [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) - [Debugging basics](https://nodejs.org/de/docs/guides/debugging-getting-started/) - Done
- Add custom logger, override for tests - Done
- Add Tests (Preferably TDD) - Done
- Use async more
- Setup ACL
- Use embedded documents for Cards in CarSets ("embedsOne")
