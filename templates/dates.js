SchemaTemplate.createdAt = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
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
    autoValue: function() {
      if (this.isUpdate || this.isUpsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});