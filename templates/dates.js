import SimpleSchema from 'simpl-schema';

SchemaTemplate.createdAt = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  }
});

SchemaTemplate.updatedAt = new SimpleSchema({
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate || this.isUpsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});
