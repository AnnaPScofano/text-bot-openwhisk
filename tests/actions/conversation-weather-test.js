const action = require('../../actions/conversation-weather');
const assert = require('assert');
const nock = require('nock');

const workspaceId = 'fake-id';

describe('[action] Conversation', function () {

  beforeEach(function() {
    nock('https://gateway.watsonplatform.net:443')
      .post(`/conversation/api/v1/workspaces/${workspaceId}/message`)
      .query({
        'version':'2017-05-26'
      })
      .reply(200, {
        'fake-key': 'fake-value'
      });
  });

  it('should throw error if credentials are missing', function () {
    const params = {
      conversation: {
        input: {},
        context: {}
      }
    };
    return action.main(params).then(function() {
      assert.fail('Missing credentials error was not found');
    }).catch(function(error) {
      assert(error.message === 'params.CONVERSATION_USERNAME can not be null');
    });
  });

  it('should call conversation-weather when parameters are right', function () {
    const params = {
      CONVERSATION_USERNAME: 'foo',
      CONVERSATION_PASSWORD: 'bar',
      WORKSPACE_ID: workspaceId,
      conversation: {
        input: {
          text: 'Hi foo'
        },
        context: {
          city: {
            name: 'hello',
            number_of_states: null,
            alternate_name: '',
            states: {}
          },
          weather_conditions: {},
          system: {}
        }
      },
    };
    return action.main(params).then(function() {
      assert(true);
    }).catch(assert.ifError);
  });
});
