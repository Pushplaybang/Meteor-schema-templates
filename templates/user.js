SchemaTemplate.createdBy = new SimpleSchema({
  createdBy: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId || Meteor.userId();
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId || Meteor.userId() };
      } else {
        this.unset();
      }
    }
  }
});

SchemaTemplate.updatedBy = new SimpleSchema({
  updatedBy: {
    type: String,
    autoValue: function() {
      if (this.isUpdate || this.isUpsert) {
        return this.userId;
      }
    },
    denyInsert: true,
    optional: true
  }
});