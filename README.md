
# Property & Tenant Katas

This is a project that operates on two CSVs, one containing information about tenants and the other properties.

For this task, I have tried to emphasise a scaleable architecture which shows that the work could easily be expanded upon, using the repository pattern and dependency injection.

### Layout

Each function in the services folder implements one of the tasks given.

The tests folder are integration tests using the CSV data, the repository and the service.

Unit tests are provided in the same folder where the code is written - the test file is appended with `spec.ts`.

Types and errors are in the domain folder.

## Tech Stack

- Node 21 or greater
- Typescript

## How to use
1. Install dependencies
``` bash
npm install
```

2. Run the tests
``` bash
npm t
```
  
## Decisions due to limitations / future considerations

Due to limits around time / this is a task and not a real project, some decisions were made:

### Testing
The tests use the CSV as test data as opposed to mock data; This was done so it was easier to verify correct answers to against other users with the csv and due to time constraints.

However, to prove the code is structured in a testable way I added a test for the first task's function with a stubbed service.

The CSV repositories also have some basic testing around them.

Given more time I would have tested some of the smaller utility methods in services as well.

Additionally, I used node's native test runner, which unfortunately is still experimental in some areas. I would have not done for actual code written in a professional environment.

With more unit testing I would have used sinon as well for better mocking and to spy on the use of services.

### Task 4
I originally wanted to create an API service that would be injected in to the postcode task and perform an actual look up.

### JSDoc
Given more time I would have used JSDocs to better annotate the code.


## Alternative Implementation

I was also considering loading the CSVs in to a sqlite or another database, as it felt like most of it could have been solved in SQL, especially joining the tenant and property a data and used models.
