# SchemaTemplate
This provides prebuilt re-usable autovalue schema templates to be used with the meteor aldeed:collection2 package.

Automatically, and very quickly, include useful values in your collection schema such as the following :

 - CreatdAt date
 - UpdatedAt date
 - CreatedBy userId
 - UpdatedBy userId
 - history

This package require thes [aldeed:colection2](https://atmospherejs.com/aldeed/collection2) package and the standard meteor accounts system.



## Install
Simple install the package via atmosphere

```sh
meteor add pushplaybang:schematemplates
```




## Getting Started
includde the package, as well as the collection2 package. (You may have issues if you're not using the accounts package when included related schema templates)

```bash
meteor add aldeed:collection2
meteor add nona:schematemplate
```



### CreatdAt date
includes a timestamp for when the document was created.

```js
someSchema = new SimpleSchema([
  //...
  SchemaTemplate.createdAt,
  //...
]);
```

produces a field like this :
```js
"createdAt" : ISODate("2015-10-28T12:38:10.809Z"),
```



### UpdatedAt date
includes a timestamp for when the document was last updated

```js
someSchema = new SimpleSchema([
  //...
  SchemaTemplate.updatedAt,
  //...
]);
```

produces a field like this :
```js
"updatedAt" : ISODate("2015-10-29T19:16:28.222Z"),
```



### CreatedBy userId
includes the userId of the user who created the document
```js
someSchema = new SimpleSchema([
  //...
  SchemaTemplate.createdBy,
  //...
]);
```

produces a field like this :
```js
"updatedBy" : "uoEfdSMFPrgoNpTiS",
```



### UpdatedBy userId
includes the userId of the user who last updated the document

```js
someSchema = new SimpleSchema([
  //...
  SchemaTemplate.updatedBy,
  //...
]);
```

produces a field like this :
```js
"updatedBy" : "uoEfdSMFPrgoNpTiS",
```



### history
includes a history of changes, as an array of sub documents on the document being changed. This is configurable, allowing you to define which operations are recorded, include custom messages for each, as well as for which operations (such as `$push`) history is recorded.

This is only a good strategy for infrequent changes to a document, good examples may be the editing of a blog post, page template, issue ticket etc, where the array of history sub documents would not explode in size.  For more frequent activity, or history and separate collection should be used.

Each history sub document includes a date and a content object.  The content object contains the userId of the user who performed the action, and an object for each allowed field that was changed, includig the value it was changed to and the custom defined message.

Setup history in the following manner : 

```js
// define your  in a file scoped obj
var history = {
  // Specify the fields you care about recording activity on.
  fields : ['title', 'description', 'forTopic', 'againstTopic', 'closed'],
  messages : {

    // default messages
    title: 'updated the title',
    description: 'updated the description',

    // limited scope to specific operations
    forTopic: {
      message: 'voted for this topic',
      ops: ['$set', '$addToSet', '$push'],
    },

    // limited scope to specific operations
    againstTopic: {
      message: 'voted against this topic',
      ops: ['$set', '$addToSet', '$push'],
    },

    // boolean
    closed: {
      truthy: 'closed this topic', // true
      falsey: 'opened this topic' // false
    }
  }
};

// create the history schema template based on your config
history.schema = SchemaTemplate.history(history);

// include it in your schema definition
var someSchema = new SimpleSchema([
    //...
    history.schema,
    //...
]);
```

produces a an array of sub documents like this :
```js
[
//...
  {
    "date" : ISODate("2015-10-29T19:16:28.236Z"),
      "content" : {
        "userId" : "uoEfdSMFPrgoNpTiS",
        "forTopic" : {
        "val" : "uoEfdSMFPrgoNpTiS",
        "message" : "voted for this topic"
      }
    }
  },
//...
]
```



### Example 
Here is a complete example of setting this up :

```js

// define your collection (most likely in a common file)
App.Collections.Topics = new Mongo.Collection('topics');

// define your history config  in a file scoped obj
var history = {
  // Specify the fields you care about recording activity on.
  fields : ['title', 'description', 'forTopic', 'againstTopic', 'closed'],
  messages : {

    // default messages
    title: 'updated the title',
    description: 'updated the description',

    // limited scope to specific operations
    forTopic: {
      message: 'voted for this topic',
      ops: ['$set', '$addToSet', '$push'],
    },

    // limited scope to specific operations
    againstTopic: {
      message: 'voted against this topic',
      ops: ['$set', '$addToSet', '$push'],
    },

    // boolean
    closed: {
      truthy: 'closed this topic', // true
      falsey: 'opened this topic' // false
    }
  }
};

// create the history schema template based on your config
history.schema = SchemaTemplate.history(history);

// notice that you're passing in an array
App.Schema.TopicSchema = new SimpleSchema([
  SchemaTemplate.createdAt,
  SchemaTemplate.updatedAt,
  SchemaTemplate.createdBy,
  SchemaTemplate.updatedBy,
  history.schema,
  {
    title: {
      type: String,
      label: 'Topic Title',
      max: 200,
    },
    description: {
      type: String,
      label: 'Description',
      max: 2000,
    },
    forTopic: {
      type: [String],
      optional: true
    },
    againstTopic: {
      type: [String],
      optional: true
    },
    participants: {
      type: [String],
      optional: true
    },
    closed: {
      type: Boolean,
      optional: true
    }
  }
]);

App.Collections.Topics.attachSchema(App.Schema.TopicSchema);

```




____


### License [MIT](https://opensource.org/licenses/MIT)
Copyright (c) 2015 Paul van Zyl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
