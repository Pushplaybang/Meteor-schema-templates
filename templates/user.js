import SimpleSchema from 'simpl-schema';

SchemaTemplate.createdBy = new SimpleSchema({
  createdBy: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return this.userId || Meteor.userId();
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId || Meteor.userId() };
      }

      this.unset();
    }
  }
});

SchemaTemplate.updatedBy = new SimpleSchema({
  updatedBy: {
    type: String,
    autoValue() {
      if (this.isUpdate || this.isUpsert) {
        return this.userId;
      }
    },
    denyInsert: true,
    optional: true
  }
});
