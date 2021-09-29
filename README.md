# Roadie technical test

Welcome to this stage of your interview process! This should be the fun part of the recruitment pipeline. Finally getting hands dirty with Backstage codebase!

We expect this to take no more than 4 hours. Don't worry if you don't finish all the suggested features in that time frame.

Please work alone. Feel free to use Backstage documentation or other written resources, just like you would if you were doing this at work.

Do not be afraid to ask questions at any point in the process. You can do so by creating issues to this GitHub repository we have provided for you.

## Submitting your work

Please submit your work by committing to this repository. You can email us or create an issue into the repo when you are finished, and we will then start looking at your contribution.

## Evaluation criteria 

We evaluate your based on the commits you make to this repo and how you evolve your solution over time. To be able to do this, we expect you to commit regurarly in **intervals of no longer than 15 minutes**. Don't worry if the particular commit has temporarily broken something, it is more important for us that we see your thought process and approaches you take to solve particular problems than the actual final solution. Remember to write somewhat descriptive (but not too onerous) commit message as well.   

---

## Roadie Interview Assignment

We'd like you to create a hypothetical issue tracker plugin for [backstage](https://backstage.io/docs/).

We've provided a Backstage instance with a partially complete backend for this plugin within this repository. You will need to create the frontend plugin, integrate this with the backend and add a feature. You might need to enhance the backend plugin as well for it to return all needed data for you.

The API is structured as follows.

```
GET /projects
GET /projects/:id
GET /projects/:id/issues
GET /issues
GET /issues?projectId=
GET /issues/:id
```

For example:

```
curl http://localhost:7000/api/ticketing/projects/1/issues
[
  {
    "id": 1,
    "type": "bug|story|task?",
    "title": "Issue 1",
    "description": "asdf",
    "status": "open|resolved|inprogress",
    "assinged_to": "",
    "created_by": "",
    "created_at": "",
  },
]

```

## Getting started


Prerequisites:
You should have `node.js` and `yarn` installed on your machine. Along with git of course.

To get started, you'll need to:

- Install dependencies to the repository and generate typings
    ```
      # At your app root directory
      yarn 
      yarn tsc
    ```

- Create a plugin

    ```
    # At your app root directory
    yarn create-plugin <your-plugin-name>

    ```

- Start backstage

    ```
    # In separate shells or run one in background
    yarn workspace backend start
    yarn workspace app start

    ```

- At this point you should be able to navigate to [http://localhost:3000/](http://localhost:3000/)
- You should also be able to register a component with backstage through the catalog ([Instruction video](https://www.loom.com/share/1f695ce9dba34974882f2e9ba5583345))
    - Go to [http://localhost:3000/catalog](http://localhost:3000/catalog)
    - Click "Create Component"
    - Click "Register Existing Component"
    - Enter a link to a public catalog info file such as [https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml](https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml)

## Desired features of your plugin

Please implement the following features in your issue tracker.

- There is an InfoCard on the overview page which shows summary stats for the project
    - Open or in progress issues by type
    - Issues assigned to the current user ?

- Component entities in Backstage with the type 'service' should have an 'Issues' tab which displays a table of issues.
- The table should contain issues only for one project. The project ID should be read from an annotation on the entity.
- The table supports filtering issues by multiple fields at once.
- The user can click on an issue and view a page for that issue which includes any comments on that issue.
- The user can add comments to that issue.
- There must a meaningful test (full/high coverage is not expected)

## Helpful Backstage definitions

- An **Entity** is an item in the Backstage software catalog.
- There are different kinds of entities. A **Component** entity is a piece of source code. A **Resource** Entity is usually a Cloud resource like S3 or a Kubernetes cluster. An **API** Entity is a programmable interface. [More info here.](https://backstage.io/docs/features/software-catalog/system-model)
- Component Entities each have a page in the software catalog which is dedicated to it. For example, there is a [sample-service-1](https://demo.roadie.so/catalog/default/component/sample-service-1) entity in our demo deployment of Backstage.

## References

- [https://backstage.io/docs/getting-started/create-an-app](https://backstage.io/docs/getting-started/create-an-app)
- [https://backstage.io/docs/plugins/create-a-plugin](https://backstage.io/docs/plugins/create-a-plugin)
- [https://backstage.io/docs/overview/architecture-overview](https://backstage.io/docs/overview/architecture-overview)
- [https://backstage.io/docs/features/software-catalog/software-catalog-overview](https://backstage.io/docs/features/software-catalog/software-catalog-overview)
- [https://backstage.io/docs/features/software-catalog/system-model](https://backstage.io/docs/features/software-catalog/system-model)
- A catalog info file defining a service component with a project id annotation [https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml](https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml)
- A catalog info file defining a service component with a project id annotation [https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml](https://github.com/RoadieHQ/sample-service/blob/master/catalog-info-test-api.yaml)
- A quick demo of how to create a component in backstage [https://www.loom.com/share/1f695ce9dba34974882f2e9ba5583345](https://www.loom.com/share/1f695ce9dba34974882f2e9ba5583345)
