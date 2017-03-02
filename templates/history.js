import SimpleSchema from 'simpl-schema';

SchemaTemplate.history = function(history) {
  if (!history || !history.fields || !history.messages)
    return false;

  var fields = history.fields;
  var messages = history.messages;

  var SchemaHistory = new SimpleSchema({
    history: {
      type: [Object],
      optional: true,
      autoValue() {
        var content = {}, i = fields.length, element, field, val, state;

        while (i--) {
          element = fields[i];
          field = this.field(element);
          val = field.value;

          if (!val)
            continue;

          /* The user that initiated the action */
          content.userId = content.userId ? content.userId : this.userId;

          content[element] = {};
          content[element].val = val;

          if (messages[element]) {
            content[element].message = '';

            if (typeof(val) === 'boolean') {
              state = val ? 'truthy' : 'falsey';

              if (messages[element][state])
                content[element].message = messages[element][state];

            } else if (typeof(messages[element]) ==='object' && val !== null) {

              if (messages[element].ops.indexOf(field.operator) !== -1) {
                content[element].message = messages[element].message;
              } else {
                delete content[element];
              }

            } else {
              content[element].message = messages[element];
            }
          }

          // reset
          element = null;
          val = null;
        }

        if (content) {
          if (this.isInsert) {
            return [{
              date: new Date(),
              content: content
            }];
          } else {
            return {
              $push: {
                date: new Date(),
                content: content
              }
            };
          }
        } else {
          this.unset();
        }
      }
    },

    'history.$.date': {
      type: Date,
      optional: true
    },

    'history.$.content': {
      type: Object,
      optional: true,
      blackbox: true
    },

  });

  return SchemaHistory;
};
