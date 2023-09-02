## pg-graphql-typeorm 

The sole purpose of this code as of inception, is to generate typeorm + typegraphql models from a postgres database.

I followed [creating a cli with nodejs](https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89), [creating a cli with typescript](https://medium.com/rubber-ducking/creating-a-cli-with-typescript-1c5112ae101f), and [unit testing node cli apps](https://medium.com/@altshort/unit-testing-node-cli-apps-with-jest-2cd4adc599fb) to help create this so shout out to those authors. 


### Usage

```
yarn ftl -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities
```

### Usage with prettier (optional)

```
yarn ftl -d my_database -s schema_1,schema_2,schema_n -o ./where/toput/entities && yarn typeorm:format
```

Note: `typeorm:format` is just package.json script with `prettier --write ./src/generated/entities/*.ts`

I like to add a script to my package.json:

```
"scripts": {
...
  "build:entities": "yarn ftl -d my_database -s schema_1,schema_2,schema_n -o ./src/generated/entities && yarn typeorm:format"
}
```

### Todo

- [x] Allow configs. Loading configs works but haven't decided on to do with the configuration. E.g., exclude some tables from generation, or specific columns in a table or even some pattern type stuff.

Update in version 0.5.0 load config (.ftlrc.js in root project) to decide whether to create relationships for a certain field of a model.


### Compatibility

TypeORM: 0.2.32
TypeGraphql: 1.1.1

### Notes on development

This was originally called `superluminal`, but upon trying to publish i noticed that cool name was taken so i renamed. The `ftl` command will stay though ;)